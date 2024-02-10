/* fetch和xhr等内容看
computer_network --- URL.md */

/* xhr实现文件上传的进度监控 */
export function request(options = {}) {
  const { url, method = 'GET', onProgress, data = null } = options;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText);
      }
    });
    xhr.addEventListener('progress', (e) => {
      console.log(e.loaded, e.total);
      // loaded：已经加载
      // total：需要加载的总量
      onProgress && onProgress({
        loaded: e.loaded,
        total: e.total,
      });
    });
    xhr.open(method, url);
    xhr.send(data);
  })
}