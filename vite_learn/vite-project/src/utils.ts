export const add = (a:number, b:number): number => a + b;
// multi没用到，build的时候会tree sharking（vite默认开启），抛弃掉。
// 为了明显的查看结果，打包前，要到vite.config.ts中设置关掉自动的压缩功能
// dist的assets的js，可以看到没有const mulxxxx的情况
export const multi = (a:number, b:number): number => a * b;
