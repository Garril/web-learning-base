// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

// 泛型
function useState<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const info: [string, number] = ["abc", 18]
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)
const [title, setTitle] = useState("abc")
const [flag, setFlag] = useState(true)

/**
 * const foo = () => {} 
 * 这里的foo是一个函数
 * 
 * 那么这个foo的类型注解，怎么写？用function吗？
 * const foo：function = () => {}
 * 答案是 否
 * function是关键字，不能用
 * 
 * 正常做法应该是：
 * const foo: () => void = () => {}
 * 或者
 * const foo: (() => void) = () => {}
 * 没错，()=>void就是函数的类型注解
 * 但是都这样写，太麻烦
 * 
 * 所以开发中：
 * type MyFunction = () => void
 * 先定义type，然后后续直接用type
 * const foo: MyFunction = () => {}
 * 
 */
export {}

