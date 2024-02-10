/* 
  DNS解析到ip后就会存你设备中
  但是首次进入你的页面，DNS解析比较耗时间，且如果你刚好页面内还有很多的内容需要加载
  域名解析省略不了，后面的资源加载可以想办法

  比如拿到html了，解析
  找到script中的其他域名的js，本机没缓存，又会进行这个域名的DNS解析
  这个时候就会必须等待你的script拿到，才会继续进行解析html
  图片、css文件等都是这个流程。

  会发现如果要加载一个资源前都要去进行一次DNS解析，就很耗时间
  解决方法：
    让浏览器异步，提前解析其他用到的域名（提到html开头，异步，不影响html解析）

  做法：
    html文件的head标签内
    <head>
      <link rel="dns-prefetch" href="....">
      <link rel="dns-prefetch" href="....">
      ...
      ...
    </head>
  把解析用到的域名放到一个link里面

  框架内：
    写rollup插件
    或者node处理打包结果    
*/
const fs = require('fs');
const { parse } = require('node-html-parser');
const { glob } = require('glob');
const urlRegex = require('url-regex');

const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set();

// 遍历dist目录下的所有html、js、css文件
async function searchDomain() {
  const files = await glob('dist/**/*.{html,css,js}');
  for (const file of files) {
    // 读文件内容
    const source = fs.readFileSync(file, 'utf8');
    // 拿到所有url地址
    const matches = source.match(urlRegex({ strict: true }));
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern);
        if (match && match[1]) {
          urls.add(match[1]);
        }
      })
    }
  }
}

async function insertLinks() {
  const files = await glob('dist/**/*.html');
  const links = [...urls].map(url => {
    return `<link rel="dns-prefetch" href="${url}" />`
  }).join('\n');

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    // 可以在脱离浏览器的情况下，解析html字符串为一个个节点，最后节点加入
    const root = parse(html);
    const head = root.querySelector('head');
    head.insertAdjacentHTML('afterbegin', links);
    fs.writeFileSync(file, root.toString());
  }
}

async function main() {
  await searchDomain();
  // 在head标签中添加预取连接
  await insertLinks();
}
// 打包运行下这个js
// build: vite build && node ./scripts/xx.js
main();
