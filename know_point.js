/* 
知识点：
  1、section元素代表文档中的“节”或“段”，“段”可以是指一篇文章里按照主题的分段；
  “节”可以是指一个页面里的分组

  2、article元素最容易跟section和div容易混淆，其实article代表一个在文档，
  页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。譬如论坛的帖子，
  博客上的文章，一篇用户的评论，一个互动的widget小工具（是特殊的section）

  3、nav元素代表页面的导航链接区域。用于定义页面的主要导航部分。
  
  4、通常包含h1-h6元素或hgroup，作为整个页面或者一个内容块的标题。
  也可以包裹一节的目录部分，一个搜索框，一个nav，或者任何相关logo。

  5、rem 是基于 html 元素的字体大小来决定，
  而 em 则根据使用它的元素的大小决定,一般被称为相对长度单位,
  是根据它父元素的字体大小来计算的，一般默认情况下：16px = 1em
  （rem是css3新增的一个相对长度单位，它的出现是为了解决em的缺点，
    em可以说是相对于父级元素的字体大小，当父级元素字体大小改变时，又得重新计算。）

  6、super相关
  不能单独引用super关键字，要么用它调用构造函数，要么用它引用静态方法
    （除非是两个对象，用 Object.setPrototypeOf() 设置好了原型）
  调用super()会调用父类构造函数，并将返回的实例赋值给this
  super可以在派生类构造函数使用，也可以在静态方法中使用
  super() 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入

    （应该关注方法可以调用的时机，而不是什么时候加载的。加载完不等于就能调用了，
      普通方法加载后还需要创建对象才能调用，而静态方法则不需要，
      静态方法的可以调用早于对象的创建，所以不能使用this关键字。）

  一、class中extends后，在其constructor中，需要先调super，再用this.xxx赋值自己属性，不然报错
  ( 在派生的类中，在你可以使用'this'之前，必须先调用 super() )
    
  二、可以调用父类的静态方法，比如下面的logNbSides
    ( 但是，要求子类的方法，也是静态方法 )
    class Square extends Rectangle {
      constructor() {}
      static logDescription() {
        return super.logNbSides() + ' which are all equal';
      }
    }
  
  三、删除父类的方法会报错
    delete super.foo;
  
  四、当使用 Object.defineProperty 定义一个属性为不可写时，super将不能重写这个属性的值。
    class X {
      constructor() {
        Object.defineProperty(this, 'prop', {
          configurable: true,
          writable: false,
          value: 1
        });
      }
    }

    class Y extends X {
      constructor() {
        super();
      }
      foo() {
        super.prop = 2;   // Cannot overwrite the value.
      }
    }

  五、两个对象各定义了一个方法。在第二个对象中，我们使用super调用了第一个对象中的方法。 
    当然，这需要我们先利用 Object.setPrototypeOf() 设置obj2的原型为obj1
    var obj1 = {
      method1() {
        console.log("method 1");
      }
    }

    var obj2 = {
      method2() {
        super.method1();
      }
    }

    Object.setPrototypeOf(obj2, obj1);
    obj2.method2(); // logs "method 1"    


  7、location对象
    URL： 'https://www.w3school.com.cn/tiy/t.asp/?f=hdom_loc_search#content'
    location.href:  'https://www.w3school.com.cn/tiy/t.asp/?f=hdom_loc_search#content'  （ url ）
    location.hash:  '#content'    （ 末尾 #和后面的内容）
    location.host:  'www.w3school.com.cn' （ 无http/https协议的origin ---域名）
    location.search:  '?f=hdom_loc_search'  （ ？后面的，包括问号 ）
    location.origin:  'https://www.w3school.com.cn'   ( 从http。。。到.cn/.com )
    window.loaction.reload()网页刷新

  8、this的描述
    对于标准函数中的this：this引用的是把函数当成方法调用的上下文对象。
      标准函数中的this指向是当我们调用函数的时候确定的，
      调用方式的不同决定了this的指向不同，一般指向我们的调用者。

    对于箭头函数中的this：this引用的是定义箭头函数的上下文。箭头函数不会创建自己的this，
      所以它没有自己的this，它只会在自己作用域的上一层继承this。
      所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

*/