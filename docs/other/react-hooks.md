## react hook篇

### useState
react数据的单向数据流，如果需要页面的数据联动，就需要用到 **useState** `useState` 是一个 `React Hook`，允许函数组件在内部管理状态。

**使用方法**
`useState` 接收一个参数，即状态的初始值，然后返回一个数组，其中包含两个元素：当前的状态值和一个更新该状态的函数

```ts
const [state, setState] = useState(initialState)
```
**注意事项**
`useState` 是一个 Hook，因此你只能在 `组件的顶层` 或自己的 `Hook` 中调用它。你不能在循环或条件语句中调用它。

在严格模式中，React 将 `两次调用初始化函数`，以 帮你找到意外的不纯性。这只是开发时的行为，不影响生产

**用法**
添加一个状态
```ts
const Card = () => {
  let [index, setIndex] = useState(0)
  let [name, setName] = useState('小满')
  let [arr, setArr] = useState([1, 2, 3])
}
```
按照惯例使用 数组解构 来命名状态变量，例如 [index, setIndex]。

* useState 返回一个只包含两个项的数组：
    1. 该状态变量 当前的 `state` ，最初设置为你提供的 初始化 `state` 。
    2. `set 函数`，它允许你在响应交互时将 `state` 更改为任何其他值。

* 要更新`屏幕上的内容`，请使用新状态调用 set 函数：
:::tip
调用 `set` 函数更新 `state` 将会`重新渲染组件`。
:::


完整版案例（复杂数据类型）
数组
在React中你需要将数组视为只读的，不可以直接修改原数组，例如：不可以调用 arr.push() arr.pop() 等方法。

下面是常见数组操作的参考表。当你操作 React state 中的数组时，你需要避免使用左列的方法，而首选右列的方法：

|避免使用 (会改变原始数组) | 推荐使用 (会返回一个新数组)|
|添加元素 push，unshift | concat，[…arr] 展开语法（例子）|
|删除元素 pop，shift，splice | filter，slice（例子）|
|替换元素 splice，arr[i] = … 赋值 | map（例子）|
|排序 reverse，sort | 先将数组复制一份（例子）|

```ts
//数组新增数据
// 创建一个新数组，包含了原始数组的所有元素，然后在末尾添加新元素，如果想在头部添加新元素，返过来即可。
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr([...arr,4]) //末尾新增 扩展运算符
    //setArr([0,...arr]) 头部新增 扩展运算符
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App

```
```ts
//数组删除数据
// 使用filter过滤掉不需要的元素即可。
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr(arr.filter((item) => item !== 1)) //删除指定元素
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```
```ts
//数组替换数据
// 使用map筛选出需要替换的元素，然后替换为新的元素，其他元素保持不变。
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr(arr.map(item => {
      return item == 2 ? 666 : item
    }))
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```
```ts
// 数组替换数据
// 使用map筛选出需要替换的元素，然后替换为新的元素，其他元素保持不变。
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr(arr.map(item => {
      return item == 2 ? 666 : item
    }))
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```
```ts
// 指定位置插入元素
// 案例在2后面插入2.5，通过slice，截取前面的元素，因为slice返回一个新的数组，然后在中间插入我们需要插入的元素，然后把末尾的元素也通过slice截取出来，拼接到后面。
// slice文档 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    let startIndex = 0
    let endIndex = 2;
    setArr(
      [
        ...arr.slice(startIndex, endIndex),
        2.5,
        ...arr.slice(endIndex)
      ]
    )
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```
```ts
// 排序旋转等
// 案例，创建一个新数组，然后通过sort排序。
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    let newList = [...arr].map(v => v + 1) //拷贝到新数组
    newList.sort((a, b) => b - a)
    //newList.reverse()旋转
    setArr(newList)
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```
**对象**
useState可以接受一个函数，可以在函数里面编写逻辑，初始化值，注意这个只会执行一次，更新的时候就不会执行了。

在使用setObject的时候，可以使用Object.assign合并对象 或者 … 合并对象，不能单独赋值，不然会覆盖原始对象。
```ts
import { useState } from "react"
function App() {
  let [obj, setObject] = useState(() => {
    const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    return {
      date,
      name: '小满',
      age: 25
    }
  })
  const heandleClick = () => {
    setObject({
      ...obj,
      name: '大满'
    })
    //setObject(Object.assign({}, obj, { age: 26 })) 第二种写法
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div>日期：{obj.date}</div>
      <div>姓名：{obj.name}</div>
      <div>年龄：{obj.age}</div>
    </>
  )
}
export default App
```

**useState更新机制**
**异步机制**
useState set函数是异步更新的来看下面的案例：
```ts
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1)
    console.log(index,'index') //0
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App
```

此时index应该打印1，但是还是0，因为我们正常编写的代码是同步的，所以会先执行，而set函数是异步的所以后执行，这么做是为了性能优化，因为我们要的是结果而不是过程。

内部机制
当我们多次以相同的操作更新状态时，React 会进行比较，如果值相同，则会屏蔽后续的更新行为。自带防抖的功能，防止频繁的更新。

案例：
```ts
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    console.log(index,'index')
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App
```

结果是1并不是3，因为 `setIndex(index + 1)` 的值是一样的，后续操作被屏蔽掉了，阻止了更新。

为了解决这个问题，你可以向setIndex 传递一个更新函数，而不是一个状态。
```ts
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index => index + 1) //1
    setIndex(index => index + 1) //2
    setIndex(index => index + 1) //3
  }
  return (
    <>
      <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>

    </>
  )
}
export default App
```
1. index => index + 1 将接收 0 作为待定状态，并返回 1 作为下一个状态。
2. index => index + 1 将接收 1 作为待定状态，并返回 2 作为下一个状态。
3. index => index + 1 将接收 2 作为待定状态，并返回 3 作为下一个状态。
现在没有其他排队的更新，因此 React 最终将存储 3 作为当前状态。

按照惯例，通常将待定状态参数命名为状态变量名称的第一个字母，例如 prevIndex 或者其他你觉得更清楚的名称。

### useReducer
`useReducer` 是React提供的一个高级Hook,没有它我们也可以正常开发，但是 `useReducer` 可以使我们的代码具有更好的可读性，可维护性。

`useReducer` 跟 `useState` 一样的都是帮我们管理组件的状态的，但是呢与 `useState` 不同的是 `useReducer` 是集中式的管理状态的
```ts
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```
**参数:**
1. `reducer` 是一个处理函数，用于更新状态, reducer 里面包含了两个参数，第一个参数是 state，第二个参数是 `action` 。 `reducer` 会返回一个新的 `state`。

2. `initialArg` 是 `state` 的`初始值`。

3. `init` 是一个可选的函数，用于初始化 `state` ，如果编写了init函数，则默认值使用init函数的返回值，否则使用initialArg。

**返回值:**
useReducer 返回一个由两个值组成的数组：

当前的 state。初次渲染时，它是 init(initialArg) 或 initialArg （如果没有 init 函数）。
dispatch 函数。用于更新 state 并触发组件的重新渲染。

```ts
import { useReducer } from 'react';
//根据旧状态进行处理 oldState，处理完成之后返回新状态 newState
//reducer 只有被dispatch的时候才会被调用 刚进入页面的时候是不会执行的
//oldState 任然是只读的
function reducer(oldState, action) {
  // ...
  return newState;
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42,name:'小满' });
  // ...
```

**计数器案例**
初始状态 (initialState):
```ts
const initialState = { count: 0 };
```
这里定义了一个初始状态对象，包含一个 count 属性，初始值为 0。

reducer 函数:
```ts
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```
* reducer 是一个用来根据不同的 action 来更新状态的纯函数。
* 它接收当前状态 (state) 和一个动作对象 (action)，根据 action.type 来决定如何更新 state。
* 如果 action.type 是 ‘increment’，则 count 增加 1；如果是 ‘decrement’，则 count 减少 1。
* 如果 action.type 不匹配任何已定义的情况，则抛出一个错误。
App 组件:
```ts
const App = () =>  {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
export default App;
```
* 当点击 “-” 按钮时，调用 dispatch({ type: ‘decrement’ })，使 count 减少。
* 当点击 “+” 按钮时，调用 dispatch({ type: ‘increment’ })，使 count 增加。

### useSyncExternalStore
useSyncExternalStore 是 React 18 引入的一个 Hook，用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。这对于需要跟踪外部状态的应用非常有用。
场景
1. 订阅外部 store 例如(redux,Zustand德语)
2. 订阅浏览器API 例如(online,storage,location)等
3. 抽离逻辑，编写自定义hooks
4. 服务端渲染支持
**案例**
1. 订阅浏览器Api 实现自定义hook(useStorage)
我们实现一个useStorage Hook，用于订阅 localStorage 数据。这样做的好处是，我们可以确保组件在 localStorage 数据发生变化时，自动更新同步。

实现代码

我们将创建一个 useStorage Hook，能够存储数据到 localStorage，并在不同浏览器标签页之间同步这些状态。此 Hook 接收一个键值参数用于存储数据的键名，还可以接收一个默认值用于在无数据时的初始化。

在 hooks/useStorage.ts 中定义 useStorage Hook：
```ts
import { useSyncExternalStore } from "react"

/**
 * 
 * @param key 存储到localStorage 的key
 * @param defaultValue 默认值
 */
export const useStorage = (key: any, defaultValue?: any) => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', (e) => {
            console.log('触发了', e)
            callback()
        })
        return () => window.removeEventListener('storage', callback)
    }
    //从localStorage中获取数据 如果读不到返回默认值
    const getSnapshot = () => {
        return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null) || defaultValue
    }
    //修改数据
    const setStorage = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new StorageEvent('storage')) //手动触发storage事件
    }
    //返回数据
    const res = useSyncExternalStore(subscribe, getSnapshot)

    return [res, setStorage]
}
```
在 App.tsx 中，我们可以直接使用 useStorage，来实现一个简单的计数器。值会存储在 localStorage 中，并且在刷新或其他标签页修改数据时自动更新。
```ts
import { useStorage } from "./hooks/useStorage"
const App = () => {
  const [val, setVal] = useStorage('data', 1)
  return (<>
    <h3>{val}</h3>
    <button onClick={() => setVal(val + 1)}>设置val</button>
  </>)
}

export default App
```
效果演示

1. 值的持久化：点击按钮增加 val，页面刷新后依然会保留最新值。
2. 跨标签页同步：在多个标签页打开该应用时，任意一个标签页修改 val，其他标签页会实时更新，保持同步状态。

2. 订阅history实现路由跳转
实现一个简易的useHistory Hook，获取浏览器url信息 + 参数
```ts
import { useSyncExternalStore } from "react"
export const useHistory = () => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('popstate', callback)
        window.addEventListener('hashchange', callback)
        return () => {
            window.removeEventListener('popstate', callback)
            window.removeEventListener('hashchange', callback)
        }
    }
    const getSnapshot = () => {
        return window.location.href
    }
    const push = (path: string) => {
        window.history.pushState(null, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    const replace = (path: string) => {
        window.history.replaceState(null, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    const res = useSyncExternalStore(subscribe, getSnapshot)
    return [res, push, replace] as const
}
```
使用 useHistory Hook

让我们在组件中使用这个 useHistory Hook，实现基本的前进、后退操作以及程序化导航。
```ts
import { useHistory } from "./hooks/useHistory"
const App = () => {
  const [history, push, replace] = useHistory()
  return (<>
    <div>当前url:{history}</div>
    <button onClick={() => { push('/aaa') }}>跳转</button>
    <button onClick={() => { replace('/bbb') }}>替换</button>
  </>)
}

export default App
```
效果演示

* history：这是 useHistory 返回的当前路径值。每次 URL 变化时，useSyncExternalStore 会自动触发更新，使 history 始终保持最新路径。

* push 和 replace：点击“跳转”按钮调用 push(“/aaa”)，会将 /aaa 推入历史记录；点击“替换”按钮调用 replace(“/bbb”)，则会将当前路径替换为 /bbb。

**注意事项**
如果 `getSnapshot` 返回值不同于上一次，React 会重新渲染组件。这就是为什么，如果总是返回一个不同的值，会进入到一个无限循环，并产生这个报错。

`Uncaught (in promise) Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.`

```ts
function getSnapshot() {
  return myStore.todos; //object
}
```
这种写法每次返回了对象的引用，即使这个对象没有改变，React 也会重新渲染组件。

如果你的 store 数据是可变的， `getSnapshot` 函数应当返回一个它的不可变快照。这意味着 确实 需要创建新对象，但不是每次调用都如此。而是应当保存最后一次计算得到的快照，并且在 store 中的数据不变的情况下，返回与上一次相同的快照。如何决定可变数据发生了改变则取决于你的可变 store。

```ts
function getSnapshot() {
  if (myStore.todos !== lastTodos) {
    // 只有在 todos 真的发生变化时，才更新快照
    lastSnapshot = { todos: myStore.todos.slice() };
    lastTodos = myStore.todos;
  }
  return lastSnapshot;
}
```




