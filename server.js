const WebSocket = require('ws');
console.log(111111);

// 创建 WebSocket 服务，监听 8080 端口
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket 服务已启动：ws://localhost:8080');

// 监听客户端连接
wss.on('connection', (ws) => {
  console.log('客户端已连接');

  // 给客户端发欢迎消息
  ws.send(JSON.stringify({ type: 'msg', data: '服务端：欢迎连接长连接' }));

  // 接收客户端消息
  ws.on('message', (data) => {
    console.log('收到客户端消息：', data);

    // 原样回复（可做业务逻辑）
    ws.send(JSON.stringify({
      type: 'reply',
      data: `服务端收到：${data}`
    }));
  });

  // 连接关闭
  ws.on('close', () => {
    console.log('客户端断开连接');
  });

  // 错误监听
  ws.on('error', (err) => {
    console.error('连接错误：', err);
  });
});