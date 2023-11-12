

## 冻结对象

```js
this.freezeData = Object.freeze(this.getData());
this.normalData = this.getData();
// 前者会少了proxy封装监听，且没法子改变属性值

// 原生方法的使用
Object.freeze(obj); // 会改变原先obj,冻结他的属性值的改变，且return 改变后的obj
```



## 函数式组件

函数式组件

```vue
<template functional>
	<h1>Function: {{props.count}}</h1>
</template>
<script>
	export default {
        functional:true,
        props:{
            count: Number,
        }
    }
</script>
<style></style>
```

对比普通`vue`组件

```vue
<template>
	<h1>Normal: {{props.count}}</h1>
</template>
<script>
	export default {
        props:{
            count: Number,
        }
    }
</script>
<style></style>
```

函数式组件不会去创建组件实例，减少了时间和内存的两方面的消耗，单纯只是渲染。

假设在`app`组件中引用了上面两个组件，在`app`组件中设置`window.vm=this;`

通过打印`this`可以看到，`app`组件对象中的`$children`对象数组中，只有普通`vue`组件的，没有函数式组件

可以在`_vnode`属性中找到，但是都是被解析为`h1`



## 计算属性 

略


## `v-show / v-if`

略

## 非实时绑定的表单项

使用

```vue
<template>
	<input type="text" @keypress.enter="addTodo" class="todo-content" placeholder="please input something..."/>
</template>
```

或者（`v-model`监听变为`change`--- 当输入框的值和上一次的值不同，并且输入框失去焦点，就会触发`change`事件）

```vue
<template>
	<input type="text" @keypress.enter="addTodo" class="todo-content" placeholder="please input something..." v-model.lazy="todoContent" />
</template>
```

别（这里`v-model`监听变为`input`）

```vue
<template>
	<input type="text" @keypress.enter="addTodo" class="todo-content" placeholder="please input something..." v-model="todoContent" />
</template>
```



## 判断数据变化的逻辑

```js
function hasChanged(x,y) {
    if(x === y) {
        return x === 0 && 1/x !== 1/y;
	} else {
        return x === x || y === y;
    }
}
// +0 === -0   true
// 1/+0 === 1/-0   false
// NaN === NaN   false
```



## 延迟装载 `(defer)`

浏览器执行`js`构造页面，但一开始要渲染的组件太多，执行脚本时间太长，且执行后要渲染的元素过多，从而导致页面白屏。

解释：组件多，且组件渲染要的性能消耗很大。他默认下，一次性去画完（要等渲染完成后再去画）因为将来要画的东西太多了，主线程一直在忙，还没把控制移交给画的线程，画的那一帧一直往后推。

`=》` 延迟装载组件，让组件按照指定的先后顺序依次一个个的渲染出来。

思路：利用`requestAnimationFrame`事件分批渲染内容

### `defer.js`

```js
export default function(maxFrameCount) {
    return {
        data() {
			return {
		        frameCount: 0
            };
	    },
        mounted() {
            const refreshFrameCount = () => {
            	requestAnimationFrame(() => {
                    this.frameCount++;
                    if(this.frameCount < maxFrameCount) {
                        refreshFrameCount();
                    }
                });
		   };
            refreshFrameCount();
        },
        methods: {
            defer(showInFrameCount) {
                return this.frameCount >= showInFrameCount;
            }
		}
    }
}
```

### `app.vue`

```vue
<template>
	<div class="block" v-for="n in 21">
        <template v-if="defer(n)">
        	<heavy-comp></heavy-comp>
		</template>
    </div>
</template>
<script>
import HeavyComp from './components/HeavyComp.vue';
import defer from './mixin/defer';
export default {
	mixins: [defer(21)],
    components: { HeavyComp },
}
</script>
```

### 理解

```vue
<heavy-comp v-if="defer(1)"></heavy-comp>
<heavy-comp v-if="defer(2)"></heavy-comp>
<heavy-comp v-if="defer(3)"></heavy-comp>
<script>
	// 上面相当于在第一次第二次第三次渲染的时候画出来，不然v-if是return一个false，不显示。
</script>
```

