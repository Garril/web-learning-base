# Vue3

<hr>

## 01 Three Core Modules



### Reactivity Module (  响应式模块)

Use reactivity module to create reactive objects



### Compiler Module ( 编译器模块 )

how to take HTML templates and compile them into render functions



### Render Module ( 渲染模块 )

contains code for three different phases of rendering out a component （包含渲染组件的三阶段）

#### Render Phase

call the render function. get the return ( a virtual DOM node)

#### Mount Phase

takes the virtual DOM node 

and makes DOM JavaScript calls ( 调 Js api ) to create the web page

#### Patch Phase

( diff 算法 ) render(渲染器) takes the old virtual node, the new node,

compares the two and updates only the parts of the web page that have changed using DOM JS calls 



### Example

First of all，we have a component now. Then，the template compiler changes the html into a render function.

after getting render function, the reactive objects are  initialized using the reactivity module（ 初始化 ）

Next inside the render module, we enter the render phase.

This invokes the render function, get  a virtual DOM node.( 调render函数 拿v-dom )

( the render function references the reactive object --- 引用了响应式对象 )

Next in the mout phase. the mount function is called

using the virtual DOM node to create the web page

Lastly if any changes happen to our reactive object,which is being watched

the renderer invokes the render function again ( 渲染器会再次调用render function )

create a new virtual DOM node and take it with the old Vdom node into  patch function which makes updates to our web page



## 02 Virtual DOM

### Benefits

it completely decouples your component rendering logic   from the actual DOM

( 让组件渲染逻辑完全从真实DOM中解耦 )

让组件更直接的 reuse the runtime of the framework in other environments ( 在其他环境 重用渲染时 ) 

For example, Vue allows third-party develops ( 第三方开发 ) to create customized rendering solutions ( 自定义渲染解决方案 )

that target not just the broswer( 浏览器 ), but also ios、android

it's also possible to use the API to create a custom renderer that directly  renders to WebGL instead of DOM nodes.

( vue2 其实就有上述功能，但是没有正式记录 ，vue3 把 相关API 变成 一等公民)



v-dom  provides the ability to programmatically construct, inspect, clone and manipulate ( 以编程的方式构造、检查、克隆 以及操作 )

a desired DOM structure ( 所需的DOM结构 ) before actually returning it to the rendering engine.

you can do all of this, with the JavaScript.

this's important. Because in UI programming where the template syntax will be somewhat limiting.( 模板语法有一些限制 )

you need to have the full flexibility programming language to express the underlying logic. ( 表达潜在逻辑 )



### Render function

```js
// vue2
render(h) {
  // you can use h function to create vnodes( virtual DOM nodes )
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello')
}
```

```js
// vue3
import { h } from 'vue' // why? change to global import?
// when you want to split a large render function into small one
// you have to pass this h all the way through these split functions.
render() {
  // you don't need to think about whether this should be
  // bound as an attribute or a DOM property
  // because vue will intelligently figure out the best way to do it for you.
  return h('div', {
		id: 'foo',
    onClick: this.onClick
  }, 'hello')
}
```



## 03 Render function

```js
// vue3
import { h } from 'vue'
const App = {
  render() {
    return h('div', {
      id: 'hello'
    }, [
      h('span', 'world')
    ])
  }  
}
```

render function just like before, can return a object representation of the div. ( 就是vdom, div的JavaScript对象表示 )

the renderer（ 渲染器 ）will take this object and do the dom calls to bring it into the browser. ( 进行dom调用把他浏览器 )



### v-for / if / else /...

how to achieve v-if / v-else-if / v-else / v-for ?

```js
// vue3
import { h } from 'vue'
const App = {
  render() {
    // v-if = 'ok'  --- more can see 04 - structural directive
    return this.ok
    ? h('div', { id: 'hello' }, [ h('span', 'world') ])
    : this.otherCondition  // v-else-if
    	? h('p', 'other branch')
    	: h('p', 'else branch')
  }
}
// what about v-for?
import { h } from 'vue'
const App = {
  render() {
    // v-for = 'item in list'
    return this.list.map( item => {
      return h('div', { key: item.id }, item.text)
    })
  }
}
```



### Slots

```js
import { h } from 'vue'
const App = {
  render() {
	  // the default slot will be exposed in this $slots.default
		const slot = this.$slots.default && this.$slots.default()
    // this.$slots.default always is a function, unless cpn don't need slot. it weill be undefined
    // slot will be an array of vnodes.
  }
}


// with scoped slots（作用域插槽）we can pass props to a scope slot.
// how to achieve?
import { h } from 'vue'
const App = {
  render() {
		const slot = this.$slots.default
    ? this.$slots.default({ ... })  // just by passing an argument.
    : [] // guarante slot is an array.
	  
	  // you can return slot or h('div',slot) in your customized render function
    // in fact: you can filter it, map it and so on.
	  return slot.map(vnode => {
       return h('div',[vnode])                      
		})
  }
}
```



```html
<!-- when a stack cpn is a layout cpn.（堆栈效果的布局组件） -->
<Stack size="4">
	<div>hello</div>
  <Stack size="4">
    <div>world</div>
    <div>world</div>
	</Stack>
</Stack>


<!-- translate to html -->
<div class="stack">
  <div class="mt-4"> <!-- class to give some extra padding or margin -->
    <div>hello</div>
  </div>
  <div class="mt-4">
    <div class="stack">
      <div class="mt-4">
        <div>world</div>
      </div>
      <div class="mt-4">
        <div>world</div>
      </div>
    </div>
  </div>
</div> 
```

```js
import { h } from 'vue'
const Stack = {
  render() {
		const slot = this.$slots.default
    ? this.$slots.default({ ... })
    : []

    return h('div', { class: 'stack' }, slot.map(child => {
      return h('div', { class: `mt-${this.$props.size}` }, [
        child
      ])
    }))
  }
}
```



actually use to prove it

```html
<script src="https://unpkg.com/vue@next"></script>
<style>
  .mt-4 {
    margin: 1
  }
</style>

<div id="app"></div>

<script>
  const { h, createApp } = Vue
 
  const Stack = {
    render() {
      const slot = this.$slots.default
      ? this.$slots.default({ ... })
      : []

      return h('div', { class: 'stack' }, slot.map(child => {
        return h('div', { class: `mt-${this.$props.size}` }, [
          child
        ])
      }))
    }
  }
  const App = {
    components: {
      Stack
    },
    template: `
      <Stack size="4">
        <div>hello</div>
        <Stack size="4">
          <div>world</div>
          <div>world</div>
        </Stack>
      </Stack>    `
  }
  createApp(App).mount('#app')
</script>
```



## 04 Compiler & Renderer API

### hints / patch flag

Compiler generated hints ( 编译器生成提示 ) to help the runtime be more efficient. ( 高效 )

```html
<div>
  <div id="foo" @click="onClick">hello</div>
</div>
```

![image-20230305185025096](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230305185025096.png)

```js
// After Vue3 Template Explorer
// website: https://template-explorer.vuejs.org/

import { createElementVNode as _createElementVNode, openBlock as _openBlock, 
        createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["onClick"]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createElementVNode("div", {
      id: "foo",
      onClick: _ctx.onClick
    }, "hello", 8 /* PROPS */, _hoisted_1)
  ]))
}
/*
	Vue3 相比于 Vue2，虚拟DOM上增加 patchFlag 字段。
	1 代表节点为动态文本节点，那在 diff 过程中，只需比对文本对容，无需关注 class、style等。
	除此之外，发现所有的静态节点（HOISTED 为 -1），都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。
*/
// "8"  is something called a patch flag (补丁标志). it's generated by compiler (编译器生成)
// it saying this node has props, dynamic props (动态props) needs to be patched. (需被修补)
// and "_hoisted_1" --- onClick is which needs to be patched
```

why we need patch flag?

```js
{
  id: "foo",
  onClick: _ctx.onClick
}
```

the whole object will have to diffed   as a whole   if we don't use patch flag.

even though from the template we can see that ( id="foo" ) is in fact static, which will never change.

so with vue3 Compiler, the patch mark ("8") combined with the array here ( ["onClick"] )

provides enough information for the runtime to know. ( 为运行时提供足够的信息 )

we can know that the only prop could potentially ( 可能 ) change is onClick.

we can skip the object enumeration on this props. Just check specific ( 特定的具体的 ) things by adding kind of like hints.

( compiler generated hints )



### Performance improvement

but when you don't really ever intend to change the event handler.

let open the cacheHandlers ( this option is turned on by default in vue3 )

```js
import { createElementVNode as _createElementVNode, openBlock as _openBlock, 
        createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createElementVNode("div", {
      id: "foo",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClick && _ctx.onClick(...args))) // change
    }, "hello") // change
  ]))
}
// we're using JS to cache the event handler.
// we turn it into an inline function ( 内联函数 ) and cache it on the first render.
// on subsequent renders (后续渲染) we will always be using the same inline handler here.
	  (...args) => (_ctx.onClick && _ctx.onClick(...args))

// But why we can't see patch flag and the array of props?
// we'll always be passing it the same function, but the function inside 
// will then access (访问) _ctx.onClick which guarantees（保证）that it's always the latest function
// so the vnode( _createElementVNode(....)), it don't need to be patched at all.
// event handler(onClick) is cached already. when it's called, it'll always point to the latest onClick!
```

now we can say that the vnode is static and can be skipped entirely during the patch process.

this is important  because on components, if we're adding the event handlers to a components

one of the most common cases were " we cause child components to unnecessarily re-render when you use an inline event handler"

```html
<div>
  <Foo id="foo" @click="()=>foo()">i have child components</Foo>
  <Foo id="foo" @click="foo(123)">i have child components</Foo>
</div>
<!--
	both of all the @click function is inline handler.
  it will cause the child component to re-render when the parent component re-renders.
-->
```

in react, we have useMemo/useCallback, allows developers to manually (手动主动) cache an event handler like this.

so that to prevent child components from re-rendering.

but in vue3 with templates, we can do that automatically for the user



### a block and  a vnode

<img src="https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230201161139508.png" alt="image-20230201161139508" style="zoom: 50%;" />

the "1" is html, then it translate to render function "2".

"3" is what render function "2" creates(  the structure JavaScript create -- js结构 )

the job of renderer, on updates, this structure will have two snapshots ( 快照 ) of virtual DOM trees like itself.

( actually we need to think about props..... as the second params )

the renderer don't know what has changed actually if we don't provide more hints to it.

```html
<div>
  <div>
    <span>hello</span>
  </div>
</div>
<!-- this tree is in fact static, it's being hoisted (提升) -->
```

```html
<div>
  <div>
    <div></div>
    <div></div>    
    <span>{{ message }}</span>
    <!-- we make this span part dynamic(动态) 
				and make the whole tree can't be hoisted
				because it contains something dynamic inside.
		-->
  </div>
</div>
<!-- we can see that the only thing will change is the span 
	but without any compiler generated hints,the virtual DOM renderer sees just the js tree.
	it doesn't have any idea about which part may change.
	so the job of the compiler is to providing this information.
	having information, the runtime can skip a lot of unnecessary work and jump to span.
-->
```

and the way we do this is with blocks.

 we turn the root of the template into what we call a block

```js
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", null, null, -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createElementVNode("div", null, null, -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [   // _openBlock() call here!
    _createElementVNode("div", null, [
      _hoisted_1,
      _hoisted_2,
      _createElementVNode("span", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
      
      // "1" is the patch flag, sign this node is dynamic and should be tracked (跟踪)
      
    ]) 
  ]))
}
// when the current block is open / _openBlock is called
// all the expressions/children will be evaluated
// after the span node was tarcked, it will be added to the cur open block as a dynamic node. 
// afer the whole call, the root div will have an extra property called dynamic children (an dynamic node array)
// and it will contain only the span node.
```

no matter how complex the dom tree is, the block will only be tracking (只跟踪 ) the dynamic nodes in a **flat array ( 扁平 )**

the block will tells us what might change.

we let the compiler to encode that information for us directly ( 直接为我们编码信息 ) in generated vdom tree.



### structural directive ( 结构指令 )

just like v-if , it may alter ( 改变 ) the node structure.

```html
<div>
  <div></div>
  <div v-if="ok">
    <span>{{ message }}</span>
  </div>
</div>
```

for the whole root block, it can't make safe assumptions ( 假设 ) about this anymore.

So instead, we make this  whole if section  a block of itself. ( 将 if 整个变为一个块)

And this block is tracked, as a dynamic child of its parent block. ( 块中块 )

```js
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", null, null, -1 /* HOISTED */)
const _hoisted_2 = { key: 0 }

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    (_ctx.ok)
      ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _createElementVNode("span", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
        // “1” means the only thing you need to check is its text content.
        // you dont need to worry about its props.
        ]))
      : _createCommentVNode("v-if", true)
  ]))
}
```



### h and mount function

```js
function h(tag, props, children) { 
	return {
    tag, props, children
  }
}
function mount(vnode, container) { 
// storing the corresponding real DOM element back on to vnode itself ( 存储相应的实际DOM元素到vnode本身--为了patch )
  // string might be specially handled here, because the vnode that might be passed in is string (tag: undefined)
	const el = vnode.el = document.createElement(vnode.tag)
  // props
  if(vnode.props) { // object
    for(const key in vnode.props) {
      const value = vnode.props[key]
      // check whether it should be set as a property or an attribute or is an event listener
      // but there we just assume (假设) everything is an attribute
      el.setAttribute(key, value)
    }
  }
  // children
  if(vnode.children) { // array --- notice: if([])==> true
    if(typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(child => {
				mount(child, el)
      })
    }
  }
  container.appendChild(el)
}


const vdom = h('div', { class: 'red' }, [
  h('span', null, ['hello']),
  h('span', null, 'world')
])

mount(vdom, document.getElementById('app'))
```

we had the original component rendered.( 渲染了原始组件 )

it rendered the template once ( 它/这个过程  渲染了一次模板 ) 

changed that into the vdom which it had stored, then a reactive property got updated,

so it triggered a re-render. regenerated another representation vdom ( 重生成另一种表现形式vdom )

and now we have both vdom  we need to compare the two

### patch

```js
// ... there is h and mount function code.

function patch(n1, n2) {
  // n1: the old virtual DOM, the previous snapshot
  // n2: the new virtual DOM, the new snapshot -- what we want the screen to update to
  if(n1.tag == n2.tag) {
    const el = n2.el = n1.el
    // props
		const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for(const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(newValue !== oldValue) {
        el.setAttribute(key, newValue)
      }
    }
    for(const key in oldProps) {
      if(!(key in newProps)) {
        el.removeAttribute(key)
      }
    }
    /* 
    	with the compiler,giving us more hints, 
    	it's possible to entirely skip this whole part ( props ).
    	we know that this element contains only static props, 
    	we don't need to check about anything. even is the children part as followed.
    	at the same time, the block optimizations ( 块优化 )
    	essentially avoid having to call patch function( 基本上避免了必须要 ) on the most of the nodes
    */
    
    // children
    const oldChildren = n1.children
    const newChildren = n2.children
    if(typeof newChildren === 'string') {
      if(typeof oldChildren === 'string') {
        if(newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else { // oldChildren is an array
        el.textContent = newChildren // direct delete other nodes
      }
    } else { // newChildren is an array
      if(typeof oldChildren === 'string') {
        el.innerHTML = ""
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else { // oldChildren is an array
        
        // there is diff!
        
      }
    }
  } else {
    // replace
  }
}

const vdom = h('div', { class: 'red' }, [
  h('span', null, ['hello']),
  h('span', null, 'world')
])
const vdom2 = h('div', { class: 'green' }, [
  h('span', null, 'changed')
])

patch(vdom, vdom2) // we want dom to reflect the updated state.
```



### diff

when we patch, the newChildren and the oldChildren are arrays.

we need diff.  there are two modes (  模式 ) of diffing away children.

The first mode is what we call keyed mode. ( 键模式 )

**example:**  now we use the v-for

```html
<div v-for="item in list" :key="item.id" />
```

then, the final rendered result internally ( 最终的内部渲染结果 )

```js
[
  { tage: 'div', key: 0 },
  { tage: 'div', key: 1 },
  { tage: 'div', key: 2 }
]
```

actually, the change of div/data list, just like shuffle the list.  these divs will move aroud.( 四处走 ) like:

```js
[
  { tage: 'div', key: 1 },
  { tage: 'div', key: 2 },
  { tage: 'div', key: 0 }
]
```

the key is essentially the only thing ( key是唯一的 ), telling us about the identity of  this item in the list.



**！！！ assume that nothing is keyed ！！！**

for two items at the same index ( 同一索引的两个项 )，we'll just compare them if they're not of the same type.

we just replace it.

```js
function patch() {
  if(n1.tag == n2.tag) {
    // ..............
    // ..............
    
    // patch's diff ( oldChildren and newChildren are arrays )
    const commonLength = Math.min(oldChildren.length, newChildren.length)
    for(let i = 0; i < commonLength; i++) {
      patch( oldChildren[i], newChildren[i] );
    }
    if(newChildren.length > oldChildren.length) {
      newChildren.slice(oldChildren.length).forEach(child => { // slice don't change array, return the result
        mount(child, el)
      })
    } else if(newChildren.length < oldChildren.length) {
      oldChildren.slice(newChildren.length).forEach(child => {
        el.removeChild(child.el)
      })      
    }
    // ..............    
    // ..............
  }
}
```



## 05 Reactivity

dependency tracking itself has some run time cost ( 依赖跟踪本身有一些运行时开销 )

in the book-keeping ( 在记录状态中 ).The challenge is finding a good granularity ( 粒度 ) when we're tracking dependencies.

An example of that is you can track dependencies for every single binding inside your template ( 对于模板中的每一个绑定 )

and update them individually ( 单独的 ), or you can track the whole template 

as a single side effect  and then find some efficient different algorithm.



in practice we find that tracking dependency at the component level is in general 

more efficient  than having a single tracker for every single binding. ( 每个绑定都有修改器 )

### simple implementation

```js
let activeEffect

class Dep {
  constructor(value) {
    this.subscribers = new Set()
    this._value = value
  }
  get value() {
    this.depend()
    return this._value
  }
  set value(newVal) {
    this._value = newVal
    this.notify()
  }
  depend() {
    if( activeEffect ) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
	activeEffect = effect
  // there we assume the effect function is one sync operation ( 假设effect为同步操作 )  
  effect()
  activeEffect = null
}


const ok = new Dep(true)
const dep = new Dep('hello')
watchEffect(() => {
	if(ok.value) {
    console.log(dep.value);
  } else {
    console.log('false branch')
  }
})
dep.value = 'changed'

/* you can find that after we add ok ( class Dep instance object )
	the object dep has limited.
	we run the js in the browser, look at the output:
	
	hello
	changed
	
	and then we change 'ok.value' to 'false'
	output: false branch
	keep on, we change 'dep.value' to 'foo'
	output: false branch
	
	we can notice that it doesn't matter how the 'dep.value' changed, after 'ok.value' is 'false'
	we need to remove dependencies.
	So require us to clean up the dependencies before each effect to be run again 
	so that it recollects its dependencies in fresh. ( 重新收集全新的依赖关系 )
*/
```



### Reactive API

#### achieve reactive

```js
/*
vue2用的Object.defineProperty：无法监听对象或数组新增、删除的元素。
其相应解决方案：
	针对常用 数组原型 方法push、pop、shift、unshift、splice、sort、reverse进行了hack处理；
	提供 Vue.set 监听对象/数组新增属性。
	对象的新增/删除响应，还可以new个新对象，新增则合并新属性和旧对象、删除则将删除属性后的对象深拷贝给新对象。
*/

// firstly let's copy something before
let activeEffect

class Dep {
  constructor() {
    // there is no value,we'll get value from object.
    this.subscribers = new Set()
  }
  depend() {
    if( activeEffect ) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
	activeEffect = effect
  effect()
  activeEffect = null
}
// copy over.....

// reactive api
function reactive_vue2(raw) { // vue2
  Object.keys(raw).forEach(key => {
    const dep = new Dep()
    let value = raw[key]
    Object.defineProperty(raw, key , {
      get() {
        dep.depend()
        return value
      },
      set(newVal) {
        value = newVal
        dep.notify()
      }
    })
  })
  return raw
}
/*  the disadvantage of this 'reactive_vue2' is:
when you add additional properties, you've got to add them in especially 
because adding a property doesn't giving them getters and setters automatically.
we can only convert keys ( 转换 ) that's already on the object
there is no way in es5 to automatically detect new property additions.
*/
const targetMap = new WeakMap()

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if( !depsMap ) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if( !dep ) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

const reactiveHandlers = {
  get(target, key, receiver) {
		const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
		const dep = getDep(target, key)
    const res = Reflect.set(target, key, value, receiver)
    dep.notify()
    return res
  },
  // we can have other traps
  has() {
    // track operations like: xxx in state
  },
  ownKey() {
    // track operations like: Object.keys(state)
  }
}
function reactive_vue3(raw) { // vue3
  return new Proxy(raw, reactiveHandlers)
}
/* you can see that the object state doesn't have property 'msg'
but even though the property doesn't exist
if you add it,init it for object 'state'
the get and set traps still triggered for that property.
this is why with the proxy based implementation ( 实现 )
the reactivity is on the object, not on the object properties.
*/

const state = reactive_vue3({
  count: 0
})
watchEffect(() => {
  console.log(state.count)
})
state.count++
```

#### cleanup

there we don't think of that the activeEffect has its own set of deps

this is a two way relationship ( 双向关系 ) between the dep and the effect.

an effect can have multiple deps, a dep as the subscribers ( 订阅者 ) can have multiple effects.

it's a many-to-many relationship ( 多对多 )

so we need to keep track of that only because we need to do the cleanup ( 清理工作 )

![image-20230206224556032](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230206224556032.png)

when you trigger something, we're going through the same depsmap and dep thing

when a colllection is cleared, you have to trigger all the effects associated with it.

（ let effect function has property：deps。and effect.deps <Array> save the dep who collect the effect. 

  when i changed a property，the effect function will be called by proxy-notify()。or

  when i wanted to add the effect into some class-dep-set -------> because in watchEffect function,effect will be called right now.

 I need to cell clearUpDep function. it can map the effect.deps<Array> and then）

```js
effect.deps.map(dep => {
  if(dep.has(effect))	{
    dep.delete(effect)
  }
})
```



### ref

let's look at its solution.

First,we need to understand what object accessors are ( 对象访问器 )

alse sometimes referred to as computed properties. ( 也被称为 计算属性 --- 指 JS 的，而不是vue的计算属性 )

Object Accessors are functions that get or set a value (  待商榷，类似 let obj = {  [foo]: 'bar'  } 的东西 ).

```js
let user = {
  firstName: 'John',
  lastName: 'Pollack',
  // like this get and set
  get fullname() {
    return `${this.firstName} ${this.lastName}`
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ')
  }
}
```

#### achieve ref

now let's try to achieve the function ref

```js
// this's how vue3 does. ( the gist 要旨、核心 )
function ref(raw) {
  const r = {
    get value() {
      track(r, 'value') // 监听 r.value，收集依赖
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value') // r.value 对应的依赖函数 遍历调用
    }
  }
  return r
}
```

#### why not reactive

but why not achieve like this:

```js
function ref(initialValue) {
  return reactive({ value: initialValue })
}
// this's not how Vue3 achieve ref
```

Because the first thingh is a ref, by definition, should only expose a single property ( value )

But if you use reactive, technically ( 技术上说 ) you can attach new properties to it,

and that kind of defeats the purpose of a ref. ( 违背了ref的目的 )

refs should only serve the purpose of wrapping an inner value, it should not be treated  as a generic reactive object.

The other thing is ,we have isRef check

the return ref object actually has some special thing,so that we know it is actually a ref instead of a reactive object.

Finally, is performance concerning here ( 考虑性能问题 ) 

because reactive does a lot more than just what we were doing in the ref.

when you try to create a reactive object, we have to check whether it was, 

already has a corresponding on the reactive copy of it. ( 对应(符合)的响应式副本 )

for example, check if it has a read-only copy ( 副本 ) of it.

There is a lot of extra work you have to go through when you're creating reactive object

where as if we are using an object literal ( 对象字面量 ) here  to create the ref ,it's just must more performant.( 更节约性能 )

#### source code

```js
export function ref<T extends object>(value: T): ToRef<T>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>

// ref 函数： 接收一个任意类型的值作为它的 value 参数，并返回一个 Ref 类型的值。  
export function ref(value?: unknown) {
  // 函数体内直接返回了 createRef 函数的返回值。
  return createRef(value)
}

// Ref类型
export interface Ref<T = any> {
  value: T
  [RefSymbol]: true
  _shallow?: boolean
}
/* 
	Ref 类型 有一个 value 属性，以及有一个私有的 symbol key，
   还有一个标识是否为 shallowRef 的_shallow 布尔类型的属性
*/

// createRef函数
function createRef(rawValue: unknown, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

#### RefImpl

```js
class RefImpl<T> {
  private _value: T // 私有变量 _value 用来存储 ref 的最新的值；
  public readonly __v_isRef = true // 公共的只读变量

  constructor(private _rawValue: T, public readonly _shallow: boolean) {
    // 私有的 _rawValue 变量，存放 ref 的旧值
    // 如果是 shallow (默认false) 浅层响应，则直接将 _value 置为 _rawValue，
    // 否则通过 convert 处理 _rawValue
    this._value = _shallow ? _rawValue : convert(_rawValue)
  }

  get value() {
    // 读取 value 前，先通过 track 收集 value 依赖
    track(toRaw(this), TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newVal) {
    // 如果需要更新
    if (hasChanged(toRaw(newVal), this._rawValue)) {
      // 更新 _rawValue 与 _value
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      // 通过 trigger 派发 value 更新
      trigger(toRaw(this), TriggerOpTypes.SET, 'value', newVal)
    }
  }
}
/* 
	公共的只读变量 __v_isRef 是用来标识该对象是一个 ref 响应式对象的标记
	与在讲述 reactive api 时的 ReactiveFlag 相同。
	
	在 conver 函数的内部，其实就是判断传入的参数是否是一个对象，
	如果是一个对象则通过 reactive api 创建一个代理对象并返回，
	否则直接返回原参数
*/
```



### computed

```js
let product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0
effect(() => {
  salePrice.value =  product.price * 0.9
})
effect(() => {
  total = salePrice.value * product.quantity
})
```

use `computed` is better

```js
let product = reactive({ price: 5, quantity: 2 })
let salePrice = computed(() => {
  return product.price * 0.9
})
let total = computed(() => {
  return salePrice.value * product.quantity
})
```

how would we define this computed method ?

computed properties or computed values are reactive and have a single value like ref.

```js
function computed(getter) {
  // Create a reactive reference called result
  let result = ref() 
  // Run the getter in an effect() which sets the result.value
  effect(() => {
    result.value = getter()
  })
  // return the result
  return result
}
// you should do some cache.
```

#### source code

函数签名

```ts
/* 
  在 computed 函数的重载中，代码第一行接收 getter 类型的参数，并返回 ComputedRef 类型
  接受 getter 函数，并以 getter 函数的返回值返回一个  不可变的响应式 ref 对象。
*/
export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>

// computed 函数接受一个 options 对象，并返回一个可写的 ComputedRef 类型，创建一个  可写的 ref 对象。
export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>

// 函数重载的最宽泛情况，参数名已经体现了这一点：getterOrOptions。
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
)
```

可以通过上面几种，得出： computed返回的是一个响应式ref对象，可能是不可变的，可能是可写的

类型定义

```ts
export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
}

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}

export type ComputedGetter<T> = (ctx?: any) => T
export type ComputedSetter<T> = (v: T) => void

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}
// Ref类型
export interface Ref<T = any> {
  value: T
  [RefSymbol]: true
  _shallow?: boolean
}
```

`WritableComputedRef 以及 ComputedRef` 都是扩展自 `Ref` 类型的，
进一步证实： `computed ` 返回的是一个 `ref` 类型的响应式对象。

函数实现

```ts
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  // 如果 参数 getterOrOptions 是一个函数
  if (isFunction(getterOrOptions)) {
    // 那么这个函数必然就是 getter，将函数赋值给 getter
    getter = getterOrOptions
    // 这种场景下如果在 DEV 环境下访问 setter 则报出警告
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    // 这个判断里，说明参数是一个 options，则取 get、set 赋值即可(看做带有 get、set 属性的对象处理)
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  
  // 返回一个 ComputedRefImpl 类的实例对象
  return new ComputedRefImpl(
    getter,
    setter,
    isFunction(getterOrOptions) || !getterOrOptions.set
  ) as any
}
```

#### ComputedRefImpl

函数签名

```ts
// 与 RefImpl Class 类似，但构造函数中的逻辑有点区别
class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true

  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true;
  public readonly [ReactiveFlags.IS_READONLY]: boolean
}
```

跟 `RefImpl `类相比，增加了` _dirty `私有成员变量，一个 `effect `的只读副作用函数变量，以及增加了一个` __v_isReadonly `标记

函数实现（构造器）

```ts
constructor(
  getter: ComputedGetter<T>,
  private readonly _setter: ComputedSetter<T>,
  isReadonly: boolean // Computed(...)传入是否为函数，或者不是对象访问器，不是options，没有set方法
) {
  this.effect = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (!this._dirty) {
        this._dirty = true
        trigger(toRaw(this), TriggerOpTypes.SET, 'value')
      }
    }
  })

  this[ReactiveFlags.IS_READONLY] = isReadonly
}
```

构造函数中，会为 `getter `创建一个副作用函数，并且在副作用选项中设置为延迟执行，并且增加了调度器。

在调度器中会判断` this._dirty`标记是否为 `false`，如果是的话，将 `this._dirty `置为` true`，并且利用` trigger `派发更新

`get 和 set` 函数

```ts
get value() {
  // 这个 computed ref 有可能是被其他代理对象包裹的
  const self = toRaw(this)
  if (self._dirty) {
    // getter 时执行副作用函数，派发更新，这样能更新依赖的值
    self._value = this.effect()
    self._dirty = false
  }
  // 调用 track 收集依赖
  track(self, TrackOpTypes.GET, 'value')
  // 返回最新的值
  return self._value
}

set value(newValue: T) {
  // 执行 setter 函数
  this._setter(newValue)
}
```

在 computed 中，通过 getter 函数获取值时，

会先执行副作用函数，并将副作用函数的返回值赋值给 _value，并将 _dirty 的值赋值给 false，

这就可以保证如果 computed 中的依赖没有发生变化，则副作用函数不会再次执行，

那么在 getter 时获取到的 _dirty 始终是 false，也不需要再次执行副作用函数，节约开销。

之后通过 track 收集依赖，并返回 _value 的值，而在 setter 中，只是执行我们传入的 setter 逻辑，

至此 computed api 已经实现。



### Proxy

when we use proxy instead of Object.defineProperty, the so-called reactive conversion ( 所谓的响应式转化 ) can be made lazy

in vue2, when we do the conversion, we have to be eager ( 尽快 ) 

beacuse when you iterate passing the object to vue2's  reactive equivalent,

we have to iterate through all the keys and convert them on the spot ( 当场转化 )

so that later on, when they're accessed ( 被访问 ), they're already converted.

However with Vue3, the proxy, when you call reactive on an object, all we're doing is returning a proxy object.

the nested objects are only converted as needed ( 仅在需要时转换嵌套对象 )





## 06 Mini vue

just copy something before to combine them.

### h function

```js
function h(tag, props, children) { 
	return {
    tag, props, children
  }
}
```

### mount function

```js
function mount(vnode, container) { 
	const el = vnode.el = document.createElement(vnode.tag)
  // props
  if(vnode.props) { // object
    for(const key in vnode.props) {
      const value = vnode.props[key]
      // event listener
      if(key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
	      el.setAttribute(key, value)
      }
    }
  }
  // children
  if(vnode.children) { // array --- notice: if([])==> true
    if(typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(child => {
				mount(child, el)
      })
    }
  }
  container.appendChild(el)
}
```

### patch function

```js
function patch(n1, n2) {
  // n1: the old virtual DOM, the previous snapshot
  // n2: the new virtual DOM, the new snapshot -- what we want the screen to update to
  if(n1.tag == n2.tag) {
    const el = n2.el = n1.el
    // props
		const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for(const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(newValue !== oldValue) {
        el.setAttribute(key, newValue)
      }
    }
    for(const key in oldProps) {
      if(!(key in newProps)) {
        el.removeAttribute(key)
      }
    }
    // children
    const oldChildren = n1.children
    const newChildren = n2.children
    if(typeof newChildren === 'string') {
      if(typeof oldChildren === 'string') {
        if(newChildren !== oldChildren) {
          el.textContent = newChildren
          /*
	          区别：
              innerText 依赖于显示的检测，如果是style、script标签内的内容，拿不到，且span中不给换行
	              （innerText不会返回隐藏元素（span）的文本，比如display:none, 而textContent会 ）
	              
              textContent 依赖于标签的检测，有换行，且所有标签都可以看到（textContent 属性表示一个节点及其后代的文本内容）
              
              innerHTML 返回 HTML 文本。通常，为了在元素中检索或写入文本，人们使用innerHTML。
              但是，textContent通常具有更好的性能，因为文本不会被解析为HTML。此外，使用textContent可以防止 XSS 攻击。
              
	          注意：
              innerText的操作一定会引起浏览器回流，那么是比较耗性能的。
              虽说textContent并非一定不会触发回流，但他也是在特定情况下
              （所赋值的内容超出了容器尺寸，影响到了页面整体布局）才会触发回流，一般只是触发浏览器的重绘。
            加css磨平 innerText和textContent的性能区别：
              #container{
                  white-space: pre;
              } 
            textContent 是 Node、Element 对象的属性；
            innerHTML 是 Element 对象的属性；
            innerText 是 HTMLElement 对象的属性；
          */
        }
      } else { // oldChildren is an array
        el.textContent = newChildren
      }
    } else { // newChildren is an array
      if(typeof oldChildren === 'string') {
        el.innerHTML = ""
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else { // oldChildren is an array
        // diff
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for(let i = 0; i < commonLength; i++) {
          patch( oldChildren[i], newChildren[i] );
        }
        if(newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach(child => {
            mount(child, el)
          })
        } else if(newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach(child => {
            el.removeChild(child.el)
          })      
        }   
      }
    }
  } else {
    // replace
  }
}
```

### reactivity

```js
let activeEffect

class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if( activeEffect ) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
	activeEffect = effect
  effect()
  activeEffect = null
}

const targetMap = new WeakMap()

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if( !depsMap ) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if( !dep ) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

const reactiveHandlers = {
  get(target, key, receiver) {
		const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
		const dep = getDep(target, key)
    const res = Reflect.set(target, key, value, receiver)
    dep.notify()
    return res
  },
  // we can have other traps
  has() {
    // track operations like: xxx in state
  },
  ownKey() {
    // track operations like: Object.keys(state)
  }
}
function reactive_vue3(obj) { // vue3
  return new Proxy(obj, reactiveHandlers)
}
```

### final framework API

```js
// use the function before to build mini vue
const App = {
  data: reactive_vue3({
    count: 0
  }),
  render() {
    /* in vue3 allow us to code:
    
    	"return h('div',this.data.count)"
    	
    	because we have the convenience to first drop the props object ( 首先忽略props )
    	if it doesn't have any.
    	And second is if it's a number, 
    	it will just converts it into a string implicitly for you.( 暗地为你转换 )
    	
    	if you want to go a bit further ( 更深入 )
    	we can build a mini compiler that sort of allows you to write templates instead of render functions.
    */
    return h('div', {
      onClick: () => {
        this.data.count++
      }
    }, String(this.data.count))
  }
}
function mountApp(component, container) {
  let isMounted = false
  let preVdom
  watchEffect(() => {
    if( !isMounted ) {
      preVdom = component.render()
      mount(preVdom, container)
      isMounted = true
    } else {
      const newVdom = component.render()
      patch(preVdom, newVdom)
      preVdom = newVdom
    }
  })
}
// html: <div id="app"></div>
mountApp(App, document.getElementById('app'))
```



## 07 Composition API

`Composition API = Reactivity API + Lifecycle hooks`

reactive and watchEffect  function we had achieved   

are probably the two fundamental ( 最基本的 ) API in the actual reactivity API of vue3.

the full reactivity API comes with a few more methods. For example, ref

ref is very similar to the dep that we built in the first section of the reactivity exercise.

 you can think of a ref as a container that holds inner value,

at the same time it' s able to track its dependencies. ( 跟踪它的依赖关系 )

So it' s kind of like a dep instance that holds its own value in some way.



### setup

```css
当 setup 函数返回对象时，对象中的数据或方法可以在 template 中被使用。
当 setup 函数返回函数时，函数会被作为 render 函数。

但是这种 setup 函数的形式并不好，因为所有的逻辑都集中在 setup 函数中，很容易出现一个巨大的 setup 函数，
所以 vue 3.2 的时候，新增了一个 script setup 的语法糖，尝试解决这个问题。
目前来看 script setup 的呈现还是非常不错的。
```

everything of composition API happens inside a new hook called setup.

```js
export default {
  setup(props, context) {
		context.attrs;
		context.slots;
		context.parent;
		context.root;
		context.emit;
  } 
}
```

`why we use 'setup'?`

because this ( the whole setup function ) can be used alongside the existing options ( 在现有options之上 )

this is purely additive ( 绝对附加性 )

 if you have  an existing component that's written using the options API

you can just add a setup hook.

 And then you can use a external library ( 外部库 ) that's using composition API  inside a component that's using the options API

they just work side by side ( options and composition API 并肩工作 )

```js
import { reactive, watchEffect, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({ count: 0 })
    watchEffect(() => console.log(state.count))
    onMounted(() => console.log('mounted!'))
    return {
      state,
      increment: () => { state.count++ }
    }
  }
}
```

everything the setup function return 

will be exposed in your template and it will also be exposed on 'this', for all the other options.

( what the setup return is what we define as the Template Render Context ------ 定义的模板渲染上下文 )



`what is the relationship between setup and beforeCreate/created ?`

Setup will be the new first hook to be called, even before 'beforeCreate'. 

call the setup is the first thing we do when a component instance is created.

( it's called before everything, all the other options are resolved 在其他options处理之前 ) 

if you alse have data or computed, those are resolved after setup. so you won't be able to use them in setup.

this's intentional ( 故意的 ), because we want to sort of separate setup as something sort of isolated from you options. ( 孤立 )



one thing to note is you don't have access to use 'this' in the setup function ( 无权访问this )

this's also intentional ( 故意的 ), because most of the functionalities ( 功能 ) that's exposed on 'this'

so you can see `reactive/watchEffect/onMounted` without 'this.' before them ( but import firstly )



### what's watchEffect?

@vue/reactivity is an internal packgae ( 内部包 ), we just happen to expose some of its API

 but some of the API of @vue/reactivity are considered lower-level or advanced ( 底层的或者进阶的 )

which we don't even expose through vue. if you are a super advanced user, you can use the reactivity package alone

to build an alternative system on top of it. ( 在此基础上建立一个替代系统 )

But that'not part of the API contract ( 合同 ) that we expose through vue itself.

 **So for vue, watchEffect is a wrapper ( 包装器 ) on top of the raw effect ( 在原始的effect之上 )** 

 example：

```js
// i have ignored other things. just focus on watchEffect
export default {
  setup() {
  	watchEffect(() => console.log(state.count)) // we call it a watcher
    /*
    	this watcher is automatically associated with this component instance.
    	so when this component instance is unmounted ( 被卸载 )
    	this effect will automatically be stopped
    */
	}
}
```



### what about watch?

```js
// what's the difference between watch and watchEffect? 

import { reactive, watchEffect, onMounted, watch } from 'vue' // import watch
export default {
  setup() {
    const state = reactive({ count: 0 })
    /* 
  	  watchEffect directly takes a function and it will run it immediately
	    and rerun it whenever anything it touched upon changes.( 有任何变化就重新运行 )
	    watchEffect can not be lazy.
    */
    watchEffect(() => console.log(state.count))
    /*
    	watch you need to first define a source ( the source can be a function that returns something )
    	then you'll have a callback, receives new and old value.
    	yes, you can we have see new and old value, we can compare and know whether value changed or not.
    	but if the first argument was a computed data and oldValue === newValue, callback won't be called.
			watch ( default: lazy --- callback will not be called immediately )
			
			watchEffect doesn't have such a compare ( like you have a intermediate value -- 中间值 )
    	so anything it access during the procession of function called ( 在函数调用过程中访问的任何东西 )
    	will trigger the whole effect to rerun.
    */
    watch(() => state.count, (count, oldCount) => { // exactly the same as vue2 API
      state.anotherProperty // this access inside the callback, it won't be tracked as a dependency. 
    })
    
    onMounted(() => console.log('mounted!'))
    return {
      state,
      increment: () => { state.count++ }
    }
  }
}
```

### The use of watch

```js
import { reactive, watchEffect, watch, ref, computed } from 'vue'
export default {
  setup() {
		// it doesn't make sense to watch a plain number ( watch普通的数字，无意义 )
    const state = reactive({ count: 0 })
    watch(state.count, (count, oldCount) => { .... }) // (x)
    watch(() => state.count, (count, oldCount) => { .... }) // (√)
    
		// but if we use ref ( ref is a reactive value )
    const count_ref = ref(0)
    watch(count_ref, (count, oldCount) => { .... }) // (√)
    
    // add computed ( computed returns is also a ref, we call it 'computed ref' )
    const count_computed = computed(() => state.count + 1)
    watch(count_computed, (count, oldCount) => { .... }) // (√)
    
    // watch many
    watch([count_ref, count_computed], ([ref, computed],[oldRef, oldComputed]) => { .... }) // (√)
    
    return {
      state,
      increment: () => { state.count++ }
    }
  }
}
```



### The use of watchEffect

now we need a component that props receives 'id'. 

when 'id' changed, we need to fetch new data

```js
export default {
  props: ['id'],
  created() {
    this.fetchData(this.id)
  },
  watch: {
    id: 'fetchData'
  },
  methods: {
    fetchData(id) {
      // ....
    }
  }
}
```

we can see that we need `created、watch、methods` three options to achieve.

but with watchEffect you can achieve more easily.

```js
// props in fact is a proxy too. you can think of props as a reactive object
export default {
  props: ['id'],
	setup(props) {
    const fetchedData = ref(null)
    watchEffect(() => {
      fetch(`url${props.id}`).then(res => res.json()).then(data => {
        fetchedData.value = data
      })
    })
  }
}
// the whole operation relied on 'props.id' ( 依赖于 )
// whenever the incoming props have changed, the arrow function inside watchEffect will re-run
```

### (add) onMounted

```js
// you can let life-cycle function become reusable ( 可复用 )
function useFeature() {
  onMounted(() => console.log('mounted!'))
}
export default {
  setup() {
  	useFeature()
    // ....
	}
}
```

### (add) ref

```js
// A ref takes an inner value and returns a reactive and mutable ref object. ( 可变的 )
// the ref object has a single property.value
export default {
  template: `{{ count }}`, // not 'count.value', just 'count'
	setup(props) {
    return {
      // everything once returned to the render context,
      // all the refs will be automatically unwrapped. (自动展开)
      count: ref(0),
      state
    }
  }
}
```



### (add) reactive

```js
import { reactive, computed } from 'vue'
export default {
  setup(props, context) {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length;
      })
    });
    function increaseCapacity() {
      event.capacity++;
    }
    return {
			event, increaseCapacity
    };
  }
}
// now if we want to use the property of event, such as: capacity or spacesLeft
// in template, we must code like: event.capacity and event.spacesLeft
// we can't ignore "event."
// but if we want to do it, we need do some change like this:
// take our reactive object and split each object up into its own reactive references
import { reactive, computed, toRefs } from 'vue'
export default {
  setup(props, context) {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length;
      })
    });
    function increaseCapacity() {
      event.capacity++;
    }
    return {
			...toRefs(event), increaseCapacity
    };
  }
}
// toRefs is going to convert my reactive object ( 改变我的反应对象 ) 
// into a plain ( 普通 ) object, where each property is a Reactive Reference ( 引用/参考 )
// pointing to the property on the original object.( 指向原始对象上的属性 )


// remember that: the next is not the right solution of this problem.
return { ...event, increaseCapacity }
return { event.capacity, event.attending, event.spacesLeft, increaseCapacity }
// because splitting apart the event object ( 拆分事件对象 ) is going to remove its reactivity.( 消除了响应式 )
```



## 08 Logic Reuse

```js
export function useFeatureA() {
  const foo = ref(0)
  const plusone = computed(() => foo.value + 1)
  function increment() { ... }
  watchEffect(() => { ... })
  return {
    foo, plusone
  }
}
export function setup(props) {
  const { foo, plusone } = useFeatureA()
  const { bar } = useFeatureB()
  const { baz } = useFeatureC()
  return {
    foo, plusone, bar, baz
  }
}
export default {
  template: `{{ event.count }}`,
  props: ["id"],
  setup()
}
/* in options API, you have the extends. because options API are just the group of options,
  you can just merge them automatically, that kind of works.
  so with setup with composition API,  we can export the setup function.
  in another component, they can just call this component setup function and useFeatureA function.
  you've essentially achieved logic extension. ( 实现了逻辑拓展 )
*/
```

logic reuse with Composition API is objectively better ( 客观上更好 )than something like mixins. 



if you're building something you might need to reuse it across multiple components.

or it's just a piece of logic but that's relatively self-contained ( 相对独立的逻辑 ) 

### example

now we have a little demo: get x and y, when the mouse move.

and make it reusable.



#### common

```html
<script src="https://unpkg.com/vue@next"></script>
<div id="app"></div>
<script>
const { createApp } = Vue
const App = {
  template: `{{ x }} {{ y }}`,
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    update(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.update)    
  }
}
createApp(App).mount('#app')
</script>
```



#### mixin

```html
<script src="https://unpkg.com/vue@next"></script>
<div id="app"></div>
<script>
const { createApp } = Vue

const MouseMixin = {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    update(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.update)    
  }  
}

const App = {
  template: `{{ x }} {{ y }}`,
  mixins: [MouseMixin]
}
createApp(App).mount('#app')
</script>
```

we can see that we have achieve the require ( to make some logics in the component reusable )

but the problem arises ( 出现 ) with mixins when you have more than one mixin.

if you have anthoer mixin 

```js
const App = {
  template: `{{ x }} {{ y }}`,
  mixins: [MouseMixin, anotherMixin]
}
```

or you have more than two,three mixins each injecting different names

it is only a matter of time you start to kind of get confused as to which property  ( 有点搞不清是哪个属性 )

anthoer promble is whenever you extract a mixin ( 提取 )

you kind of have to worry about namespace collisions.( 命名空间冲突 )

Like, when you extract it out ( 提取 ), you have to think about " should i rename this update function"

So it's  obviously that we should look for the better way instead of using mixin.



#### About React

as for the React, they remove mixin essentially ( 根本上、本质上 )

the solution they came up with is something called " higher-order components" ( 高阶组件 )

means instead of mixing everything into the consumer component ( 消费组件 )

(而是) you will inject whatever you need via props ( 通过props )

```html
<script src="https://unpkg.com/vue@next"></script>
<div id="app"></div>
<script>
const { createApp, h } = Vue

function withMouse(inner) {
  // receive inner component and return another component that wraps the inner component
  // and inside the wrap component, we should inject the desired data into the inner component
  return {
    data() {
      return {
        x: 0,
        y: 0
      }
    },
    methods: {
      update(e) {
        this.x = e.pageX
        this.y = e.pageY
      }
    },
    mounted() {
      window.addEventListener('mousemove', this.update)
    },
    unmounted() {
      window.removeEventListener('mousemove', this.update)    
    }      
    render() {
       return h(inner, {
         x: this.x,
         y: this.y
       })
    }
  }
}
const App = withMouse({
  props: ['x', 'y'],
  template: `{{ x }} {{ y }}`
})

createApp(App).mount('#app')
</script>
```

we no longer need to worry about namespace collision,

because the wrapper component now has its own namespace.

but when Multiple higher-order components wrapping one another. ( 多个高阶组件互相包装 )

you may end up with a ton of other props as well

```js
const App = withOthers(withAnother(withMouse({
  props: ['x', 'y','d','....'],
  template: `{{ x }} {{ y }}`
})))
```

now we don't know which property comes from which higher-order component.

it's also possible for "withAnother"  and "withMouse" to try to inject the same prop.

that is something fundamentally you can't avoid. ( 根本上 )

So there is a new pattern called "render props" in React ecosystem ( 生态系统 )

and in Vue ecosystem, we have a close equivalent ( 相似的例子 ) called " scoped slots "



#### Slot

```js
const Mouse = {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    update(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.update)    
  }
  render() {
    // passing the encapsulated state via slot props.( 通过slot props传递封装的状态 )
    return this.$slots.default && this.$slots.default({
      x: this.x,
      y: this.y
    })
  }
	/*
		The "this.$slots.default && this.$slots.default({ ... })" before just the same as doing:
        unmounted() { ... }
        template: `<slot :x="x" :y="y"/>`
        render() { ... }
	*/
}

const App = {
	components: { Mouse },
  template: `
  <Mouse v-slot="{x, y}">
  	{{ x }} {{ y }}
  </Mouse>
  `
}
```

the benefit of this, compared to a higher-order component is that:

if we have multiple of these types of components

```js
const App = {
	components: { Mouse },
  template: `
  <Mouse v-slot="{x, y}">
  	<Foo v-slot="{foo}">
	  	{{ x }} {{ y }} {{ foo }}
  	</Foo>
  </Mouse>
  `
}
```

we're now very explicit ( 清楚的 ) about which property was injected by which utility component.

and you can rename the "x y foo"

```js
const App = {
	components: { Mouse },
  template: `
  <Mouse v-slot="{x, y}">
  	<Foo v-slot="{ x: foo }">
	  	{{ x }} {{ y }} {{ foo }}
  	</Foo>
  </Mouse>
  `
}
```

we solved the unclear source of injection ( 注入来源不明的问题 )

and the namespace collision problem ( 命名空间冲突问题 )

The only downside with this approach ( 这种方法的缺点 )  is that 

we are creating multiple component instances for the sake of logic, extraction, and reuse ( 为了逻辑、提取和重用 )

even though we solve two big problems, we pay the extra cost.

now let's try to do it with Composition API



#### Composition API

```html
<script src="https://unpkg.com/vue@next"></script>
<div id="app"></div>
<script>
const { createApp, h, ref, onMounted, onUnmounted } = Vue

function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return {
    x, y
  }
}

const App = {
  setup() {
    const { x, y } = useMouse()
    // const { x: foo } = useAnother() --- you can rename
    const foo = ref('foo')
    return {
      x, y, foo
    }
  },
  template: `{{ x }} {{ y }}`
}

createApp(App).mount('#app')
</script>
```

why not setup return " useMouse " ？

Because you may have other properties locally ( 本地有其他属性 ), just like "foo"

but the new problem is that if we have too many properties need to be manually destructured ( 太多属性要被手动解构出来 )

and return everything here can be kind of verbose ( 冗长) -----> `use script setup`

one final benefit of Composition API is mixins  can be extremely hard to type properly in type systems ( 很难正确地类型推导 ).

in Composition API, everything is just function calls. 

so with proper type definition ( 正确的类型定义) which we provide

everything is automatically inferred in 90% of the cases. ( 在90%的情况下，一切都是自动推断出来的 )



## 09 Practice

### useFetch

```html
<script src="https://unpkg.com/vue@next"></script>

<div id="app">
  <div v-if="isPending">loading...</div>
	<div v-else-if="data">{{ data }}</div>
  <div v-else-if="error">Something went wrong: {{ error.message }}</div>
</div>

<script>
const { createApp, ref } = Vue

function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isPending = ref(true)
  
  fetch(url).
  	then(res => res.json()).
  	then(_data => {
			setTimeout(() => {
        data.value = _data
        isPending.value = false
      },1000)
	  })
  	.catch(err => {
  		error.value = err
    	isPending.value = false
	  })
  /* Why not use reactive just like:
  	"const state = reactive({ ... })"
  	and return the state.
  	
  	Because in setup function, user want to destructure ( 解构 ) like:
  	"const { data, error, isPending } = ...."
  	and then keep their reactive to return { data, error, isPending }.
  	
  	if you used reactive, in setup function, the value we get by destructure won't keep reactive.
  	and they won't keep connection to the state logic which in you composition function (" useFetch ")
  	
  	we can solve it by using toRefs like:
  	"return toRefs(state)"
  	so I prefer to choose use ref but reactive.
  */
  return {
    data,
    error,
    isPending
  }
}

const App = {
  setup() {
    const { data, error, isPending } = useFetch(`https://jsonplaceholder.typicode.com/todos/1`)
    /*
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      }
    */
		return {
      data,
      error,
      isPending
    }
  }
}

createApp(App).mount('#app')
</script>
```



### byID

```js
<script src="https://unpkg.com/vue@next"></script>

<div id="app"></div>

<script>
const { createApp, ref, watchEffect } = Vue

function useFetch(getUrl) {
  const data = ref(null)
  const error = ref(null)
  const isPending = ref(true)
  
	watchEffect(() => {
    isPending.value = true
    data.value = null
    error.value = null
    
    fetch(getUrl())
      .then(res => res.json())
      .then(_data => {
        setTimeout(() => {
          data.value = _data
          isPending.value = false
        },1000)
      })
      .catch(err => {
        error.value = err
        isPending.value = false
      })    
  })
  
  return {
    data,
    error,
    isPending
  }
}

function usePost(getId) {
  return useFetch(() => `https://jsonplaceholder.typicode.com/todos/${getId()}` )
}

const Post = {
  template: `
    <div v-if="isPending">loading...</div>
    <div v-else-if="data">{{ data }}</div>
    <div v-else-if="error">Something went wrong: {{ error.message }}</div>  
  `,
  props: ["id"],
  setup(props) {
    const { data, error, isPending } = usePost(() => props.id)
    // useFetch can track props.id and know when should itself re-run. so pass a function
		return {
      data,
      error,
      isPending
    }
  }
}
const App = {
  components: { Post },
  data() {
    return {
      id: 1
    }
  },
  template: `
  	<button @click="id++">change ID</button>
  	<Post :id="id"/>
  `
}
createApp(App).mount('#app')
</script>
```



## 10 About Component

```tsx
import { defineComponent, withModifiers, ref } from 'vue'
/*
the best way to code a cpn in tsx (don't need to think about the this or the methods in context):
	 export default defineComponent({ 
	 		setup(props,ctx) { 
	 			return "render()" like: "() => { return <div......></div>  }"
	 		} 
	 })
better than:
	 export default defineComponent({ 
	 		render(){
	 			return <div></div> 
	 		}   
	 })
better than:
	 export defalut () => <div></div>
*/
export default defineComponent({
  setup(props, ctx) {
    const count = ref(0)
    const inc = () => {
      count.value++
    }
    return () => {
      return <div onClick={ withModifiers( inc, ['self'] ) }>test.value</div> // remember: ref in tsx needed adding .value
      // only click this div will trigger the inc function
      // won't trigger other function in catch or bubble stage.
    }
  }
})
```



## 11 About vue2 and vue3

### 1、生命周期

![image-20230305185210946](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230305185210946.png)

```css
Tips： setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显式地去定义。
```

### 2、多根节点

```css
Vue3 支持多个根节点，也就是 fragment。即以下多根节点的写法是被允许的。
```

### 3、CompositionApi 

```css
略，具体看07 Composition和08逻辑复用
```

### 4、异步组件

```vue
<tempalte>
  <suspense>
    <template #default>
      <List />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>
<!-- 在 List 组件（有可能是异步组件，也有可能是组件内部处理逻辑或查找操作过多导致加载过慢等）未加载完成前，
显示 Loading...（即 fallback 插槽内容），加载完成时显示自身（即 default 插槽内容）。-->
```

### 5、Teleport

```vue
<button @click="dialogVisible = true">显示弹窗</button>
<teleport to="body">
  <div class="dialog" v-if="dialogVisible">
    我是弹窗，我直接移动到了body标签下
  </div>
</teleport>
```

### 6、*响应式原理**`reactivite`**

```css
略，具体看05 Reactivity
在vue2
  我们在 data 中声明了一个对象 person ，但是在后期为 person 增加了新的属性，那么这个新的属性就会失去响应性。
  想要解决这个问题其实也非常的简单，可以通过 Vue.$set 方法来增加 指定对象指定属性的响应性。
  但是这样的一种方式，在 Vue 的自动响应性机制中是不合理。
在vue3
  Vue 引入了反射和代理的概念，所谓反射指的是 Reflect，所谓代理指的是 Proxy。
  我们可以利用 Proxy 直接代理一个普通对象，得到一个 proxy 实例 的代理对象。
  在 vue3 中，这个过程通过 reactive 这个方法进行实现。

  ！！！但是 proxy 只能实现代理复杂数据类型，所以 vue 额外提供了 ref 方法，用来处理简单数据类型的响应性。！！！

  ref 本质上并没有进行数据的监听，而是构建了一个 RefImpl 的类，通过 set 和 get 标记了 value 函数，以此来进行的实现。
  所以 ref 必须要通过 .value 进行触发，之所以要这么做本质是调用 value 方法。

```

### 7、虚拟DOM

```css
Vue3 相比于 Vue2，虚拟DOM上增加 patchFlag 字段
具体看04 Compiler & Renderer API
```

### 8、 事件缓存

```css
Vue3 的cacheHandler可在第一次渲染后缓存我们的事件。
相比于 Vue2 无需每次渲染都传递一个新函数。加一个 click 事件。
具体可以看04 Compiler & Renderer API --- 内联函数 和 指向问题
```

### 9、Diff算法优化

```css
搬运 Vue3 patchChildren 源码。结合上文与源码，
patchFlag 帮助：diff 时 区分静态节点，以及不同类型的动态节点。
一定程度地减少节点本身及其属性的比对。
```

#### patchChildren

```js
function patchChildren(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
  // 获取新老孩子节点
  const c1 = n1 && n1.children
  const c2 = n2.children
  const prevShapeFlag = n1 ? n1.shapeFlag : 0
  const { patchFlag, shapeFlag } = n2
  
  // 处理 patchFlag 大于 0 
  if(patchFlag > 0) {
    if(patchFlag && PatchFlags.KEYED_FRAGMENT) {
      // 存在 key
      patchKeyedChildren()
      return
    } els if(patchFlag && PatchFlags.UNKEYED_FRAGMENT) {
      // 不存在 key
      patchUnkeyedChildren()
      return
    }
  }
  
  // 匹配是文本节点（静态）：移除老节点，设置文本节点
  if(shapeFlag && ShapeFlags.TEXT_CHILDREN) {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
    }
    if (c2 !== c1) {
      hostSetElementText(container, c2 as string)
    }
  } else {
    // 匹配新老 Vnode 是数组，则全量比较；否则移除当前所有的节点
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense,...)
      } else {
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
      }
    } else {
      
      if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '')
      } 
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(c2 as VNodeArrayChildren, container,anchor,parentComponent,...)
      }
    }
  }
}
```

#### patchUnkeyedChildren 

```js
function patchUnkeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
  c1 = c1 || EMPTY_ARR
  c2 = c2 || EMPTY_ARR
  const oldLength = c1.length
  const newLength = c2.length
  const commonLength = Math.min(oldLength, newLength)
  let i
  for(i = 0; i < commonLength; i++) {
    // 如果新 Vnode 已经挂载，则直接 clone 一份，否则新建一个节点
    const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i] as Vnode)) : normalizeVnode(c2[i])
    patch()
  }
  if(oldLength > newLength) {
    // 移除多余的节点
    unmountedChildren()
  } else {
    // 创建新的节点
    mountChildren()
  }
 
}
```

### 10、打包优化

```css
Tree-shaking：模块打包 webpack、rollup 等中的概念。
	移除 JavaScript 上下文中未引用的代码。
	主要依赖于 import 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。
```

以 nextTick 为例子，在 Vue2 中，全局API暴露在Vue实例上，即使未使用，也无法通过 tree-shaking 进行消除。

```js
import Vue from 'vue';
Vue.nextTick(() => {
  // 一些和DOM有关的东西
});
```

Vue3 中针对全局和内部的API进行了重构，并考虑到 tree-shaking 的支持。

因此，全局API现在只能作为ES模块构建的命名导出进行访问。

```js
import { nextTick } from 'vue';   // 显式导入
 
nextTick(() => {
  // 一些和DOM有关的东西
});
```

通过这一更改，只要模块绑定器支持 tree-shaking，则Vue应用程序中未使用的 api 将从最终的捆绑包中消除，获得最佳文件大小

```css
受此更改影响的全局API如下所示。
  Vue.nextTick
  Vue.observable （用 Vue.reactive 替换）
  Vue.version
  Vue.compile （仅全构建）
  Vue.set （仅兼容构建）
  Vue.delete （仅兼容构建）

内部API 也有诸如 transition、v-model 等标签 或者 指令 被命名导出。
只有在程序真正使用才会被捆绑打包。Vue3 将所有运行功能打包也只有约22.5kb，比 Vue2 轻量很多
```

### 11、TypeScript支持

Vue3 由 TypeScript 重写，相对于 Vue2 有更好的 TypeScript 支持

```css
Vue2 Options API 中 option 是个简单对象，而 TypeScript 是一种类型系统，面向对象的语法，不是特别匹配。

Vue2 需要vue-class-component强化vue原生组件，也需要vue-property-decorator增加更多结合Vue特性的装饰器，写法比较繁琐。
```

### 12、*运行时**`runtime`**

所谓的运行时，大多数时候指的是 `renderer 渲染器`

```css
！！！渲染器 本质上是一个对象，内部主要三个方法 render、hydrate、createApp ！！！
其中 render 主要处理渲染逻辑，
hydrate 主要处理服务端渲染逻辑，
而 createApp 就是创建 vue 实例的方法。

这里咱们主要来说 render 渲染函数：
	vue3 中为了保证宿主环境与渲染逻辑的分离，把所有与宿主环境相关的逻辑进行了抽离，通过接口的形式进行传递。
	这样做的目的其实是为了：“ 解绑宿主环境与渲染逻辑，以保证 vue 在非浏览器端的宿主环境下可以正常渲染 ”
```

### 13、*编辑器 **`compiler`**

vue 中的 compiler 其实是一个 DSL（特定领域下专用语言编辑器） 

其目的是为了 **把 template 模板 编译成 render 函数。** 

```css
逻辑主要是分成了三大步： parse、transform 和 generate。
	其中 parse 的作用是为了把 template 转化为 AST（抽象语法树），
	transform 可以把 AST（抽象语法树） 转化为 JavaScript AST，
	最后由 generate 把 JavaScript AST 通过转化为 render 函数。
转化的过程中会涉及到一些稍微复杂的概念，比如 有限自动状态机......
```

<hr/>

## 12 TypeScript

### interface and type

一、`interface 和 type` 都可以描述对象

```ts
interface IPerson {
  name: string
  age: number
}
type IPerson = {
  name: string
  age: number
}
```

但是`type`还可以

```ts
type strOrNumType = string | number
const strOrNum: strOrNumType = 0
```

二、`interface 和 type` 都可以进行类型拓展

```ts
// interface
interface Person {
  name: string
}
interface Student extends Person { 
	sno: string
}

// type
type Person = {
  name: string
}
type Student = Person & {
  sno: string
}
```

但是名字相同的 `interface`定义，会合并，而`type`报错，比如

```ts
interface Person {
  name: string
}
interface Person {
 	age: string 
}
```

最终 `Person interface有 name 和 age`

在实际应用中，我们可以利用`interface`的这个特性，自由的拓展第三方库的类型

比如`Vue Router`中，我们可以要利用`routes`数组中的对象的`meta`的xx属性去实现面包屑，但是类型检测到不应该有`meta`的对应属性（这里是`title`)

```typescript
const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '面包屑显示标题--主页'
      }
    }
  ]
})
```

```ts
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
```

三、实际选择

`interface`用于描述对象的结构

`type`用于描述类型之间的关系





