class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + " eating~")
  }
  study() {

  }
  static happy() {
    console.log("happy");
  }
}

// babel转换 ---- babeljs.io
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) { // 比如处理32行的情况：
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]; // 拿到当前的method对应的对象，对当前方法函数进行设置
    // enumerable保持默认，configurable为true，如果有value，就为writable：true
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor); // 加到原型上
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps); // 传入的原型
  if (staticProps) _defineProperties(Constructor, staticProps); // 传入的是function Person
  return Constructor;
}

// /*#__PURE__*/ 纯函数
// webpack 压缩 tree-shaking
// 这个函数没副作用
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);
    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    { // 第二参数：类方法
      key: "eating",
      value: function eating() {
        console.log(this.name + " eating~");
      }
    }, {
      key: "study",
      value: function study() {}
    }],
    [{ // 第三参数：类静态方法
      key: "happy",
      value: function happy() {
        console.log("happy");
      }
    }]);

  return Person;
})();
