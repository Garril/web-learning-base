type ThisType = { name: string };

function eating(this: ThisType, message: string) {
  console.log(this.name + " eating", message);
}

const info = {
  name: "why",
  eating: eating,
};

// 隐式绑定
/**
 * 在ts里，你把eating在外部function定义，然后赋值到info对象方法上
 * 通过info.eating去调用，但是！ 他不会像js一样，直接给你隐式绑定，而是报错
 * 因此，在function定义的时候，要显示的去写上this参数，说明是需要this的
 */
info.eating("哈哈哈");

// 显示绑定
eating.call({name: "kobe"}, "呵呵呵")
eating.apply({name: "james"}, ["嘿嘿嘿"])

export {};
