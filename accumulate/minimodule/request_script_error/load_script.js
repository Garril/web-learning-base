/* 
在加载脚本失败的情况下，如何重试？

<script src="https://xxx.com/x.js"></script>
监听脚本加载错误可以这样：
<script onerror="console.log('error')" src="https://xxx.com/x.js"></script>
但是在工程化环境，应该是由工具自动打包去加载脚本

一、确定触发时间
  1、在加载脚本之前，设置事件，监听后续的报错
  <script>
    window.addEventListener('error', () => {
      console.log('error');
    })
  </script>
  <script src="https://xxx.com/x.js"></script>

  2、但是由于script脚本标签
  不像js的throw，他不会冒泡，被页面的error事件捕获。
  所以需要解决：不能在冒泡阶段，而应该在捕获阶段

  window.addEventListener('error', () => {
    console.log('error');
  },true)

  3、window去监听error，会监听到太多方面的错误
  css、脚本加载失败、图片加载失败、js内部throw的错误
  如果只需要处理脚本加载的失败，如何处理？

  依据参数e

  window.addEventListener('error', (e) => {
    if(e.target.tagName !== 'SCRIPT' || e instanceof ErrorEvent) {
      return;
    }
    console.log('error',e);
  },true)


二、如何重试?
一般都是换个域名重试。
*/
// 域名列表
const domains = ['a.com', 'b.com', 'c.com'];

// 建立加载的js和域名的映射关系：
const retry = {};
// 加 true。需要在捕获阶段就拿到事件，因为error不冒泡。
window.addEventListener('error', (e) => {
  // js、图片加载、script加载都会报错，需要筛选
  // script错误是Event对象，其他的是ErrorEvent对象。
  const tag = e.target;
  if (tag.tagName == 'SCRIPT' && !(e instanceof ErrorEvent)) {
    console.log('script load fail...');
    const url = new URL(tag.src); // 获取script标签内的src
    if (!retryInfo[url.pathname]) {
      retryInfo[url.pathname] = {
        times: 0,
        nextIndex: 0
      }
    }
    const info = retryInfo[url.pathname];
    const script = document.createElement('script');
    url.host = domains[info.nextIndex];
    // 可能多个script都触发了重加载，但是，这里是没有阻塞的，可能script加载顺序不行
    document.write(`<script src="${url.toString()}"> \<\/script>`); // 会阻塞后续代码
    // script.src = url.toString();
    document.body.insertBefore(script, tag);
    info.times++;
    info.nextIndex = (info.nextIndex + 1) % domains.length;
  }
}, true)