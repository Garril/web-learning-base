# node

<hr/>

## 全局对象

### `__dirname、__filename`

分别为  文件目录（`D:\xxx\yyy`） 和 文件路径`(D:\xxx\yyy\n.png)`

`Buffer`: 类型化数组（继承自 `uint8Array`）`=》` 1字节8位，计算机存储基本单位。

使用、输出时可能需要使用十六进制表示

### `process`

```css
process有蛮多属性和方法的：
cwd()：获取node执行时，命令行所在的路径，与代码在哪里无关。是一个绝对路径。
	process.cwd();

exit(): 强制退出node进程，比如一些定时器，还没到时，直接不进行。
	process.exit(0);

argv: 获取命令中的所有参数。
    index.js脚本内容如下： console.log(process.argv);
    执行脚本：node index.js abc eee 
    你可以看到 输出一个数组，数组长度为4。分别为：node命令的绝对路径（看系统环境变量） 、 index.js的绝对路径、abc、eee

platform: 获取 node运行的平台版本。
    console.log(process.platform);
    输出win32，代表的是支持32位或者以上的api。指编程时的平台版本


kill(pid):杀死系统进程

env: 获取操作系统的环境变量
	process.env
```

## `require`

后缀名自动补全，`js、json、node、mjs`顺序去找。

只提供文件夹名字，不提供文件名，则自动寻找目录中的`index.js`

脚本入口文件名 ： `package.json中的main字段`。`node_modules`中的文件则看他自己的`package.json -- main`



`require.resolve('/src') 没有加载模块，但是可以获得要执行的脚本的 绝对路径`

```js
function require(modulePath) {
    // 1、根据加载顺序、路径补齐规则，将 modulePath 转化为 绝对路径： absolutePath
    // 2、判断是否有缓存：require.cache[absolutePath]
    // 3、没有缓存就加载，读取文件内容
    // 4、将内容，包裹在函数中
    function __temp(module,exports,require,__dirname,__filename) {
        // 看__temp的参数，这也是为什么，模块中可以使用这些变量，尽管他们不是在global中的属性。
        // ....
    }
    // 5、创建 module 对象
    module.exports = {};
    const exports = module.exports;
    
   // 6、调用函数
   __temp.call(module.exports,module,exports,require,module.id,module.filename);
    
    // 7、return
    return module.exports;
}

// 正常情况下: this == module.exports == exports
// 如果代码为：
exports.c = 3;
module.exports = { a: 1, b: 2 };
this.m = 5;
// 那么输出this：
{ a: 1, b: 2 }
```



## `module`

`id`: 执行的脚本的绝对路径。如果是最外层脚本的入口文件则是一个点

`path`: 表示是在那个模块输出的

`exports`：导出相关的

`parent`: 哪个模块正在使用此模块（又是个`module`对象）

.....



## `commonjs 和 es-module`

默认下和推荐都是 `commonjs`，他 和`es module` 在**同一个`js`文件下**不能混用。但是同一个项目内不同文件，`一个js一个mjs`，可以，只要导入的时候用的是`import`

`node需要是一个函数环境，而es推出的es module 不是，webpack全都转换为函数环境所以没什么影响`。

想用 `es`模块的话，可以 文件后缀名为 `.mjs 或 package.json`中`type 设置为 module`。运行`es module`的时候，需要加上标记`--experimental-modules`

比如：`node --experimental-modules index.mjs`

注意：`import 导入文件，后缀加上，没自动补`



## `import`

```js
import("./a.mjs").then(res=> {...})
```



## 内置模块

` os`操作系统相关，`path`路径相关，操作系统的单词分隔符 /，语句分隔符; 也有对应方法。

###  较为常用的

```js
const path = require('path');
path.basename("xxx/yyy/a.html"); // a.html
path.basename("xxx/yyy/a.html",".html"); // a
path.dirname("xxx/yyy/a.js"); // xxx/yyy
path.extname("xxx/yyy/a.js"); // .js

// 路径拼接
path.join("a","b","c.js");  // a\b\c.js
path.join("a","b","../","c.js");  // a\c.js

// 获取相对目录
path.relative('/data/a/bbb/ccc','/data/a/ddd/eee'); // ..\..\ddd\eee
// 拼接路径，得到绝对路径
path.resolve("/a.js"); 
path.resolve("./a.js"); 
// 注意，拼接是：看执行的命令行的路径，读取后拼接。也就是process.cwd()。而不是先找a.js的位置，再去拼接
// 所以一般为:
path.resolve(__dirname,"./a.js"); 
```

### `net`模块

首先补充： `http`请求是建立在`TCP/IP`协议上（三次握手、请求、四次挥手）

为了一次握手后，可以在挥手前，传输较多的东西，少点握手开销，可以用 `Connection: keep-alive`保持长连接。（主动挂掉可能是客户端，也可能是服务端，即使使用了长连接，`http`还是一次请求一次连接）



`net`模块的作用是：实现 进程间的通信 `IPC` / 网络通信 `TCP/IP`

网络通信 `TCP/IP`： 与`http`请求不一样，他不需要每次重新请求，也没有说，只能你发一次响应一次。他是建立通道，之后客户端服务器两端，随时可以主动的发生n次数据。

下面 模拟`http`协议，利用`socket`，跟远程进行交互

#### 客户端

```js
const net = require('net');
// net.createConnection(options[,connectListener]);
const socket = net.createConnection({
    host: 'localhost', // 主机，注意，无协议
    port: 80
},() => {
    console.log('连接成功');
});
// 获取响应字符串的消息头和消息体
let receive = null;
function parseResponse(response) {
    const index = response.indexOf("\r\n\r\n");
    const head = response.substring(0,index);
    const body = response.substring(index + 2).trimStart();
 	const headParts = head.split("\r\n");
	const headArr = headParts.slice(1).map(str => {
        return str.split(":").map(s=>s.trim());
    })
    const header = headArr.reduce((a,b) => {
       	a[b[0]] = b[1];
        return a;
    },{});
    return {
        header,
        body
    }
}
function isOver() {
    // 需要接受的消息体的总字节数
    const contentLen = +receive.header["Content-Length"];
    const curReceiveLen = Buffer.from(receive.body,"utf-8").byteLength;
    return (contentLen <= curReceiveLen);
}

// socket负责向网络端口，输送内容
// 向流写入数据，监听流响应数据
socket.on("data",chunk => {
    const response = chunk.toString("utf-8");
    if(!receive) {
        receive = parseResponse(response);
        if(isOver()) {
            socket.end();
        }
        return;
    }
    receive.body += response;
    if(isOver()) {
        socket.end();
        return;
    }
    // 看服务器的响应结果，不是长连接，就可以挂断，socket.end();
    // Content-Length,是消息体的总字节数，chunk是一段一段来，直接结束，拿到结果不全。
})
// socket.write('test'); // 服务器发送的字符串，需要是满足http协议的字符串
socket.write(`GET / HTTP/1.1
Host: localhost
Connection: keep-alive

`);
/* HTTP协议格式：
请求行
请求头

请求体 */

// 空两行表示请求体为空，不然服务器在等内容，不会响应。
// TCP/IP可以传任何东西，但是在HTTP协议下的话，需要按照一定格式
socket.on("close", () => {
    console.log("结束了");
})
```

#### 服务器

```js
const net = require('net');
const socket = net.createServer();
server.listen(8088); // port
server.on('listening',() => { }); // 服务器开始监听端口后触发
// 有一个客户端连接到服务器了，开始通话了触发
server.on('connection',socket => { 
    console.log('客户端连接到服务器'); 
    socket.on('data',chunk => {
	    console.log(chunk.toString("utf-8"));
        // socket.write('hello world'); // 也需要满足HTTP响应格式
        socket.write(`HTTP/1.1 200 OK
        Content-Type: text/plain
        
        <!DOCTYPE html>
        <html lang="en">
        	.....页面内容，略......
       	</html>
        `);
        socket.end(); // 服务器断开
    })
    socket.on('end',() => {
        console.log('连接关闭');
    })
});

// 图片
const filename = path.resolve(__dirname,'./pic.png');
const bodyBuffer = await fs.promises.readFile(filename);
const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`,"utf-8");
const result = Buffer.concat([headBuffer,bodyBuffer]);
socket.write(result);
socket.end();

```

访问`localhost:8088`，有两个输出，因为最开始和服务器连接的时候，会发一个测试连接，测试有没有连通。

一个客户端可能有多个连接，因为如果不使用长连接，每次请求都是生成和断开，



### `http`模块

#### `socket`使用的简化

直接使用`net`模块很麻烦，`http`模块建立在`net`模块之上。无需手动管理`socket`，无需手动组装消息格式。

```js
const http = require('http');
const request = http.request(url,{
    method: "GET",
    headers: { }
},resp => {
   console.log(resp);
   // resp.statusCode
   // resp.headers
   let res = "";
   resp.on('data',chunk => {
       res += chunk.toString("utf-8");
       console.log(chunk);
   })
   resp.on("end",() => {
       console.log(res);
   })
});
// 返回的request对象是一个可写流。
request.write('hello world'); // 自动组装为消息体
request.end();
```

#### 服务器

```js
/*参数对象
	客户端：请求发送ClientRequest对象，响应发送IncomingMessage对象
	服务器：请求发送IncomingMessage对象，响应发送ServerResponse对象
*/
const http = require('http');
const url = require('url');
const handleReq = (req) => {
    const urlObj = url.parse(req.url)
	console.log('有请求来了，客户端地址信息: ',urlObj);
	console.log('请求头: ',req.headers);
    
    let body = "";
    req.on("data",chunk => {
        body += chunk.toString("utf-8");
    });
    req.on("end",chunk => {
        console.log(body);
    })
}
const server = http.createServer((req,res) => {
    handleReq(req);
    res.statusCode = 404;
    res.setHeader("a","1");
    res.write("hello world"); // 无需构建消息体
    res.end();
});
server.listen(8888);
server.on('listening',() => {
    console.log('server listen 8888 ok...');
})

```

#### 静态资源

在项目的`public`文件夹中有静态资源，当请求地址`http://localhost:8888/index.html`会响应`public/index.html`文件给他。`public`是直接交给浏览器处理，`node`不会去运行他，但是对应的会去读他。

像`vscode`插件，有一个`Open with Live Server` 插件，就是本地搭了一个静态资源服务器。

自己实现一个：

```js
const http = require('http');
const path = require("path");
const URL = require("url");
const fs = require("fs");

async function exists(filename) {
    try {
        return await fs.promises.stat(filename);
    } catch {
        return null;
    }
}
// 得到要处理的文件内容
async function getFileInfo(url) {
    const urlObj = URL.parse(url);
    let filename = path.resolve(__dirname,"public",urlObj.pathname.substr(1)); 
    // 第一个左斜杠记得 substr 删了
    let stat = await exists(filename);
    if(!stat) {
		return null;
    } else if(stat.isDirectory()) {
        filename = path.resolve(__dirname,'public',urlObj.pathname.substr(1),'index.html');
        stat = await exists(filename);
        if(!stat) {
			return null;
        } else {
			return await fs.promises.readFile(filename);
        }
    } else {
		return await fs.promises.readFile(filename);
    }
}
async function handler(req,res) {
    const info = await getFileInfo(req.url);
    if(info) {
       res.write(info);
    } else {
        res.statusCode = 404;
        res.write("Resource is not exist");
    }
    // res.write("Hello!");
    res.end();
}
const server = http.createServer(handler);
server.on("listening",() => {
    console.log("server listen 8888");
});
server.listen(8888);
```



### 补充`util`的

```js
// 统一格式为callback，但是之前写的为promise，转换：
const util = require("util");
async function delayFn(duration = 1000) {
    return new Promise((resolve,reject) => {  
    	setTimeout(()=> { resolve(duration); },duration);
    });
}
const delayCallBack = util.callbackify(delayFn);
delayCallBack(500,(err,res) => {
    console.log(res);
})
// util.promisify相反，具体看文档
```

### fs

**除了 require 中写的路径是相对于文件的，其余的都是相对，执行命令行路径的**

比如：`fs.readFile('./myfile.txt',(err,content) => { }); 相对执行命令的命令行的路径去找文件`

一般都是 ` path.resolve`搭配使用

```js
const fullPath = path.resolve(__dirname,'./myfile.txt');
fs.readFile(fullPath,(err,content) => {
    console.log(content); // Buffer数组，转16进制了--2^4。两16进制8位 ==> 1字节
    console.log(content.toString('utf-8'));
});
// or
fs.readFile(fullPath,"utf-8",(err,content) => {
    console.log(content); // 编码转换后的字符串
});

// 同步
const content = fs.readFileSync(filePath,"utf-8");

// 返回promise
fs.promises.readFile(filePath,"utf-8").then();
// or
await fs.promises.readFile(filePath,"utf-8");

// 写，对应为writeFile，其余差不多
const buffer = Buffer.from("abcdef","utf-8");
fs.promises.writeFile(filePath,"abc"); // 默认utf-8，覆盖
fs.promises.writeFile(filePath,buffer,{
    flag: "a"
}); // a -> append,追加内容
// 文件不存在就新建
```

判断文件是 目录或者 是文件

```js
const stat = await fs.promises.stat(fullPath);
stat.isDirectory(); // 是否为目录
stat.isFile(); // 是否为文件
```

```js

// 读取子文件目录
const pathes = await fs.promises.readdir(fullPath); // 得到一个数组，为目录下的每一个子文件名，文件夹则无后缀

// mkdir 创建目录
await fs.promises.mkdir(fullPath);

// 判断文件是否存在、可读
async function exists(fileName) {
    try {
        await fs.promises.stat(fileName);
        return true;
    } catch(err) {
        if(err.code == 'ENOENT') {
            return false;
        }
        console.dir(err);
        return false;
    }
}
const res = await exists(dirName);
```



### 封装`File -- ` 文件操作相关

```js
class File {
	constructor(filename,name,ext,isFile,size,createTime,updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    // 获取文件信息
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename,name,ext,isFile,size,createTime,updateTime);
    }
    // 获取文件内容
	async getContent(isBuffer = false) {
        if(this.isFile) {
            if(isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename,"utf-8");
            }
        }
        return null;
    }
    // 获取子目录文件
    async getChildren() {
        if(this.isFile) {
            return [];
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const resPath = path.resolve(this.filename,name);
            return File.getFile(resPath);
        })
	    return Promise.all(children);
    }
}
async function readDir(dirname) {
    const file = File.getFile(dirname);
    return await file.getChildren();
}

async function test() {
    const filename = path.resolve(__dirname,'./test.png');
    //或者文件 const filename = path.resolve(__dirname,'./myfiles');
    const file = await File.getFile(filename);
    console.log(file);
    console.log(await file.getChildren());
}
```



## 流

磁盘和内存的空间大小差别大，需要从磁盘到内存，像流一样，一部分一部分的过去处理。

文件流：指内存数据和磁盘文件数据之间的流动

文件流的创建：`fs.createReadStream(path[,options])。 path：读取的文件路径。options：可选配置 。返回：Readable的子类ReadStream`

`options: {  encoding: 编码方式, start: 起始字节,  end: 结束字节, highWaterMark: 每次读取的字节数量 / 文字数量-- 需要看编码方式, autoClose: true 读取后自动关闭，避免开太多或者读写删除冲突 }`



文件流创建后，返回 ` ReadStream `子类，可以`on`监听蛮多方法`open、error等，看文档`

**注意：**只有注册了 `data`事件，他才会开始去读。而且只有`data`事件会多次触发，每次回调收到的参数为读取到的那一部分新的。



写：`createWriteStream`

```js
// utf-8： 中文3字节，英文1字节
const ws = fs.createWriteStream(filename,{
    encoding: "utf-8",
    highWaterMark: 3
});
const flag = ws.write("abc"); // true
// 如果是
const flag = ws.write("啊"); // false
```

![image-20240416020511419](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240416020511419.png)

### 背压问题

![image-20240416021743947](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240416021743947.png)

```js
上图方法二：rs.on('data')、 ws.on('drain')、 rs.on('close')
可以替换为：
rs.pipe(ws); // 用管道串起来，读取流要写到其他地方，就可以用管道，解决背压问题
```

