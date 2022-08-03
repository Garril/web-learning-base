// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

// 用 tuple封装 比 数组 好，的例子：
function useState(state: any) {

  let currentState = state
  
  const changeState = (newState: any) => {
    currentState = newState
  }

  // const arr: any[] = [currentState,changeState]
  // return arr
  // 这种拿到的 counter和 setCounter都是any类型

  // 用tuple，第一个参数是 any类型，第二个是 函数类型
  const tuple: [any, (newState: any) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)

const [title, setTitle] = useState("abc")

export {}
// 可以优化的点，counter和title，还是 any