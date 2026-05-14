// 可封装成 hooks / class
export function useWebSocket(token) {
  let ws = null;
  let heartTimer = null;
  const RECONNECT_DELAY = 3000;

  const connect = () => {
    ws = new WebSocket(`ws://${location.host}`);
    ws.onopen = () => ws.send(JSON.stringify({ type: 'auth', token }));
    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      console.log('ws消息', res);
    };
    ws.onclose = () => setTimeout(connect, RECONNECT_DELAY);
  };

  connect();
  return ws;
}