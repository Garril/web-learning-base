/* 
  定义
    复制已有的对象来创建新对象
  应用
    JS中对象创建的基本模式

  用原型模式创建线上订阅中的用户 
    --- 浏览器-发布订阅模式中，是new User()，这里不同
*/
const baseUser: User = {
  name: "",
  status: "offline",
  followers: [],
  subscribe(user, notify) {
    user.followers.push({ user,notify });
  },
  online() {
    this.status = "online";
    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  },
};
export const createUser = (name: string) => {
  const user: User = Object.create(baseUser);
  user.name = name;
  user.followers = [];
  return user;
}

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
    user.followers.push({user,notify});
  }
  online() {
    this.status = "online";
    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  }
}