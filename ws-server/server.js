const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);

// 配置
const PORT = 8080;
const HEARTBEAT_INTERVAL = 30000; // 心跳间隔30s
const HEARTBEAT_TIMEOUT = 60000; // 超时60s踢下线

// 静态资源
app.use(express.static('./'));

// 存储在线客户端 { token: ws实例 }
const clients = new Map();

// 创建WS服务，复用http服务端口
const wss = new WebSocket.Server({ server });

// 消息格式统一
function sendMsg(ws, type, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, data, time: Date.now() }));
  }
}

// 广播给所有人（排除自己）
function broadcast(senderToken, type, data) {
  clients.forEach((ws, token) => {
    if (token !== senderToken && ws.readyState === WebSocket.OPEN) {
      sendMsg(ws, type, data);
    }
  });
}

// 连接建立
wss.on('connection', (ws, req) => {
  let token = null;
  let lastHeartbeat = Date.now();

  console.log('新客户端尝试连接');

  // 1. 鉴权：第一次消息必须传token
  ws.once('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type !== 'auth' || !msg.token) {
        sendMsg(ws, 'error', '未携带token，连接拒绝');
        ws.close(4001, '未认证');
        return;
      }
      token = msg.token;
      // 简单校验（实际查数据库/redis）
      if (token !== 'user123') {
        sendMsg(ws, 'error', 'token无效');
        ws.close(4002, '认证失败');
        return;
      }

      // 下线旧连接，防止重复登录
      if (clients.has(token)) {
        clients.get(token).close(4003, '异地登录');
      }
      clients.set(token, ws);
      sendMsg(ws, 'success', '认证成功，已建立长连接');
      console.log(`用户${token}上线，在线人数：${clients.size}`);

      // 2. 监听正常消息
      ws.on('message', (data) => {
        try {
          const res = JSON.parse(data);
          lastHeartbeat = Date.now(); // 收到任意消息重置心跳

          switch (res.type) {
            case 'heartbeat':
              sendMsg(ws, 'heartbeat', 'pong');
              break;
            case 'chat':
              // 广播给所有人
              broadcast(token, 'chat', { from: token, content: res.content });
              break;
            case 'private':
              // 一对一私聊
              const targetWs = clients.get(res.to);
              if (targetWs) sendMsg(targetWs, 'private', { from: token, content: res.content });
              break;
            default:
              sendMsg(ws, 'error', '未知消息类型');
          }
        } catch (e) {
          sendMsg(ws, 'error', '消息格式错误');
        }
      });

      // 3. 心跳超时检测
      const heartbeatTimer = setInterval(() => {
        if (Date.now() - lastHeartbeat > HEARTBEAT_TIMEOUT) {
          ws.close(4004, '心跳超时断开');
        }
      }, HEARTBEAT_INTERVAL);

      // 4. 连接关闭
      ws.on('close', (code, reason) => {
        clearInterval(heartbeatTimer);
        clients.delete(token);
        console.log(`用户${token}下线，原因：${reason}，在线人数：${clients.size}`);
      });

      // 5. 错误处理
      ws.on('error', (err) => {
        clearInterval(heartbeatTimer);
        clients.delete(token);
        console.error('连接异常：', err);
      });
    } catch (e) {
      ws.close(4000, '连接异常');
    }
  });
});

server.listen(PORT, () => {
  console.log(`服务启动：http://localhost:${PORT}`);
  console.log(`WS地址：ws://localhost:${PORT}`);
});