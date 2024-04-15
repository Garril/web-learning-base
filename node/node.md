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



