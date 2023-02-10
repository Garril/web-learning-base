// 自定义事件 Event 与 CustomEvent
/* 
Event
  event = new Event(typeArg, eventInit);
    typeArg
    是DOMString 类型，表示所创建事件的名称。

    eventInit可选
    是 EventInit 类型的字典，接受以下字段:
      "bubbles"，可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
      "cancelable"，可选，Boolean类型，默认值为 false， 表示该事件能否被取消。
      "composed"，可选，Boolean类型，默认值为 false，指示事件是否会在影子DOM根节点之外触发侦听器。
*/
window.addEventListener('custom', customHandler)
function customHandler(params) {
    // 打印事件对象 在5秒后 出现打印，可以看到我们自定义的参数
    console.log("params: ",params);
}

setTimeout(() => {
    // 创建自定义事件
    let event = new Event('custom');
    // 如果希望事件带参数，可以把参数放在事件对象上
    event.name = 'custom-name_test';
    event.detail = {
        age: 20
    }
    event.ppp = '这是一个锅'
    // dispatchEvent 返回一个 boolean 值
    let result = window.dispatchEvent(event)
    console.log("result: ",result);
    console.log("===============================");
}, 2000)

/* 
  CustomEvent
    event = new CustomEvent(typeArg, customEventInit);
      typeArg
      一个表示 event 名字的字符串

      customEventInit可选
      一个字典类型参数，有如下字段
        "detail", 可选的默认值是 null 的任意类型数据，是一个与 event 相关的值
        bubbles 一个布尔值，表示该事件能否冒泡。 来自 EventInit。注意：测试chrome默认为不冒泡。
        cancelable 一个布尔值，表示该事件是否可以取消。 来自 EventInit
*/
window.addEventListener('custom_event', customHandler)
function customHandler(params) {
    // 打印事件对象 在5秒后 出现打印，可以看到我们自定义的参数
    console.log("custom_event params:",params);
}
setTimeout(() => {
    // 创建事件对象
    let event = new CustomEvent('custom_event', {
        // 这里可直接传入 自定义的事件参数
        detail: {
            height: 100,
            widht: 100,
            rect: 10000
        }
    })
    // 同样 我们也可以直接在事件对象上绑定 参数
    event.name = 'custom_event_test'
    let res = window.dispatchEvent(event);
    console.log("custom_event res: ",res);
}, 2000)