"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _inherits(subClass, superClass) {
  // 报错处理
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  // 兼容性处理
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  // _super函数
  return function _createSuperInternal() { // 之后_super.call(this,name,age)调用
    // name和age  <---- super(name,age)
    var Super = _getPrototypeOf(Derived); // Super = Student.__proto__ (就是class Person)
    var result;
    if (hasNativeReflectConstruct) {
      // NewTarget = 对象.__proto__.constructor --- Person.constructor
      var NewTarget = _getPrototypeOf(this).constructor;
      // result.__proto__.constructor = NewTarget
      result = Reflect.construct(Super, arguments, NewTarget);
      /* 
      Reflect.construct()的行为有点像 new操作符构造函数,相当于运行 new Super(...arguments)
      Super：被运行的目标构造函数
      arguments类数组：目标构造函数调用时的参数。
      NewTarget：作为result对象的原型对象的constructor属性
      */
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
  // _createSuper返回一个函数，这个函数返回 this
  // _createSuper函数中的this通过call传入，是将要new出来的Student实例对象


}
// self: Student实例对象， call: result --- super构造出实例
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    // Void是一个前缀关键字，它接受一个参数，并且总是返回 undefined。
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
// 兼容性检查和处理
function _isNativeReflectConstruct() {
  // Reflect.construct 相当于运行 new target(...args).
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// 兼容性处理后的 getPrototypeOf
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Person = /*#__PURE__*/ function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [{
    key: "running",
    value: function running() {
      console.log(this.name + " running~");
    }
  }], [{
    key: "staticMethod",
    value: function staticMethod() {}
  }]);

  return Person;
}();

var Student = /*#__PURE__*/ function (_Person) {
  _inherits(Student, _Person);

  var _super = _createSuper(Student);

  function Student(name, age, sno) {
    var _this;

    _classCallCheck(this, Student);

    _this = _super.call(this, name, age);
    _this.sno = sno;
    return _this;
  }

  _createClass(Student, [{
    key: "studying",
    value: function studying() {
      console.log(this.name + " studying~");
    }
  }]);

  return Student;
}(Person);