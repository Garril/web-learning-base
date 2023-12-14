/* 跨标签页通信方案
  Broadcast Channel
  Service Worker
  LocalStorage window.onstorage 监听
  Shared Worker、IndexDB、cookie 定时器轮询（setInterval）
  window.open、window.postMessage
  WebSocket
*/

const channel = new BroadcastChannel("my-broadcast");

export function sendMsg(type, content) {
  channel.postMessage({
    type,
    content,
  });
}
export function listenMsg(callback) {
  const handler = (e) => {
    callback && callback(e.data); ``
  }
  channel.addEventListener('message', handler);
  return () => {
    channel.removeEventListener('message', handler);
  }
}
