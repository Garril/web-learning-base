/* 发布订阅模式
  定义 
    一种订阅机制，可在被订阅对象发生变化时通知订阅者
  应用场景
    邮件订阅，上线订阅等
  button.addEventListener("click",doSomething);

  用发布订阅模式实现用户上线订阅
*/
type Notify = (user: User) => void;

export class User {
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