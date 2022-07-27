/* 单例模式
  定义 
    全局唯一访问对象，比如：window 
  应用场景
    缓存，全局状态管理等。
*/
//  例子：用单例模式实现请求缓存

// 首先mock，假设导入api，500ms后返回一个值
// import { api } from 'utils';
function api(url: string) {
  
  return "value"
}
// ========== 传统面向对象的思维 ---- 测试看 test_tradition.jpg  ===============
export class Request {
  static instance: Request;
  private cache: Record<string,string>;

  constructor() {
    this.cache = {};
  }

  static getInstance() {
    if(this.instance) {
      return this.instance;
    }
    this.instance = new Request();
    return this.instance;
  }

  public async request(url: string) {
    if(this.cache[url]) {
      return this.cache[url];
    }
    const response = await api(url);
    this.cache[url] = response;
    return response;
  }
}

// ========== JS的思维,不用class ---- 测试看 test_class.jpg   ===============
const cache: Record<string,string> = {};
export const request = async (url: string) => {
  if(cache[url]) {
    return cache[url];
  }
  const response = await api(url);
  cache[url] = response;
  return response;
}