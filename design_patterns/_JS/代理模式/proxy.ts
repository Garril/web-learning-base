/* 
  定义
    可自定义控制 对 原对象 的访问方式，
    并且允许在更新前后做一些额外的处理
  应用
    监控，代理工具，前端框架实现等
*/
// 使用代理模式实现用户状态订阅
// 依据功能单一原则，用proxy对User类定义中方法做优化：

// User类定义
type Notify = (user: User) => void;

class User {
  name: string;
  status: "offline" | "online";
  followers: { user: User; notify: Notify}[];

  constructor(name: string) {
    this.name = name;
    this.status = "offline";
    this.followers = [];
  }
  subscribe(user: User, notify: Notify) {
    user.followers.push({ user,notify });
  }
  online() {
    this.status = "online";
    // 之后做重构这里不好维护，既上线，又通知，
    // 后面可能还有一堆事情
    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  }
}
// 优化后：
export const createProxyUser = (name: string) => {
  const user = new User(name);

  const proxyUser = new Proxy(user, {
    set: (target, prop: keyof User, value) => {
      target[prop] = value;
      if(prop === 'status') {
        notifyStatusHandlers(target, value);
      }
      return true;
    },
  });

  const notifyStatusHandlers = (user: User, status: "online" | "offline") => {
    if(status === "online") {
      user.followers.forEach(({ notify }) => {
        notify(user);
      });
    }
  };
  
  return proxyUser;
}
