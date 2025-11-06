## Zustand 第一章(入门/安装)
`Zustand` 是德语单词，意思是“状态”。中文空耳 猝死丹特,基本上每一个框架都会有自己的状态管理工具，比如 `Vue 的 Vuex`，`React 的 Redux`，Zustand 自然也是一个状态管理工具。

那么对比 `Redux` ，等状态管理工具 `Zustand` 有什么优势呢
:::tip
redux 是老牌状态管理库，能完成各种基本功能，并且有着庞大的中间件生态来扩展额外功能,但 redux 经常被人诟病它的使用繁琐。
:::

* `轻量级` Zustand 的体积非常小，只有 1kb 左右。
* `简单易用` Zustand 不需要像Redux，去通过 `Provider` 包裹组件，Zustand提供了简洁的API，能够快速上手。
* `易于集成` Zustand 可以轻松的与React 和 Vue 等框架集成。(Zustand也有Vue版本)
* `扩拓展性` Zustand 提供了中间件的概念，可以通过插件的方式扩展功能，例如(持久化,异步操作，日志记录)等。
* `无副作用` Zustand 推荐使用 `immer` 库处理不可变性， 避免不必要的副作用。

### 安装
```bash
npm install zustand
```

* 案例比如说我们想全局管理一个金额，因为在我实际工作中就遇到到这种问题，一个金额涉及多个组件传来传去的，后来也改成了使用状态管理工具管理，非常不错。

[zustand](https://github.com/message163/react-course/tree/zustand)

```ts
import { create } from "zustand";
// 定义一个接口，用于描述状态管理器的状态和操作
interface PriceStore {
    price: number;
    incrementPrice: () => void;
    decrementPrice: () => void;
    resetPrice: () => void;
    getPrice: () => number;
}
// 创建一个状态管理器，使用 create 函数，传入一个函数，返回一个对象
/**
 * 
 * @param set 用于更新状态
 * @param get 用于获取状态
 * @returns 返回一个对象，对象中的方法可以用于更新状态
 */
const usePriceStore = create<PriceStore>((set, get) => ({
    price: 0, // 初始状态
    incrementPrice: () => set((state) => ({ price: state.price + 1 })), // 更新状态
    decrementPrice: () => set((state) => ({ price: state.price - 1 })), // 更新状态
    resetPrice: () => set({ price: 0 }), // 重置状态
    getPrice: () => get().price, // 获取状态
}));

export default usePriceStore;
```

* 在组件中使用
```ts
import usePriceStore from './store/price';
export const App = () => {  
    //直接解构使用即可 把他当做一个hook使用
    const { price, incrementPrice, decrementPrice, resetPrice, getPrice } = usePriceStore();
    return (
        <div>
            <p>价格: {price}</p>
            <button onClick={incrementPrice}>增加</button>
            <button onClick={decrementPrice}>减少</button>
            <button onClick={resetPrice}>重置</button>
            <button onClick={getPrice}>获取</button>
        </div>
    )
}
```

* zustand的set函数会帮我们合并第一层状态，回想一下 `useState`
```ts
import { useState } from 'react'

const [state, setState] = useState({
     name: '张三',
     age: 18,
     price: 0,
})

setState((state) => ({
    ...state, // 合并第一层状态 这个操作在zustand中会自动完成所以我们就不需要写这行代码了
    price: state.price + 1, // 更新状态
}))
```

## Zustand 第二章(状态处理)

首先创建一个葫芦娃，葫芦娃有七个娃，每个娃都有自己的状态，我们可以通过updateGourd来更新葫芦娃的状态，这样就实现了一个深层次的demo

```ts
import { create } from 'zustand'

interface User {
    gourd: {
        oneChild: string,
        twoChild: string,
        threeChild: string,
        fourChild: string,
        fiveChild: string,
        sixChild: string,
        sevenChild: string,
    },
    updateGourd: () => void
}
const useUserStore = create<User>(((set) => ({
    //创建葫芦娃
    gourd: {
        oneChild: '大娃',
        twoChild: '二娃',
        threeChild: '三娃',
        fourChild: '四娃',
        fiveChild: '五娃',
        sixChild: '六娃',
        sevenChild: '七娃',
    },
    updateGourd: () => set((state) => ({
        gourd: {
            //...state.gourd, 先不进行状态合并  // [!code highlight] 
            oneChild: '大娃-超进化',
        }
    }))
})))

export default useUserStore;
```

我们会发现如果不进行状态合并，其他的状态是会丢失的，所以深层次的状态处理需要进行状态合并，但是如果代码过多，每次都需要合并状态也挺烦的，所以我们可以通过`immer`中间件处理这个问题

### 使用immer中间件
**安装**
```bash
npm install immer
```
**原始immer的用法**

需要导出produce，然后它的第一个参数是原始值，第二个参数是一个回调函数，回调函数中的参数是draft，也就是原始值的拷贝，然后我们就可以直接修改draft了，最后返回新的值
```ts
import { produce } from 'immer'

const data = {
  user: {
    name: '张三',
    age: 18
  }
}

const newData = produce(data, draft => {
  draft.user.age = 20
})

console.log(newData,data) 
//{ user: { name: '张三', age: 20 } } 
//{ user: { name: '张三', age: 18 } }
```
**`immer`在`Zustand`中的使用方法**

引入注意是从`zustand/middleware/immer`引入，而不是 `immer`
```ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
```
1. 首先从 `zustand` 中间件引入 `immer`
2. 然后注意结构`create()(immer())`这里是两个括号而不是放在`create`里面了

```ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
interface User {
    gourd: {
        oneChild: string,
        twoChild: string,
        threeChild: string,
        fourChild: string,
        fiveChild: string,
        sixChild: string,
        sevenChild: string,
    },
    updateGourd: () => void
}
//注意结构发生了变化！！！
const useUserStore = create<User>()(immer(((set) => ({
    //创建葫芦娃
    gourd: {
        oneChild: '大娃',
        twoChild: '二娃',
        threeChild: '三娃',
        fourChild: '四娃',
        fiveChild: '五娃',
        sixChild: '六娃',
        sevenChild: '七娃',
    },
    updateGourd: () => set((state) => {
        state.gourd.oneChild = '大娃-超进化' //这儿不需要状态合并了需要修改什么值直接改就行了
        state.gourd.twoChild = '二娃-谁来了'
        state.gourd.threeChild = '三娃-我来了'
    })
}))))

export default useUserStore;
```

### immer原理剖析
`immer.js` 通过 `Proxy` 代理对象的所有操作，实现不可变数据的更新。当对数据进行修改时， `immer` 会创建一个被修改对象的副本，并在副本上进行修改，最后返回修改后的新对象，而原始对象保持不变。这种机制确保了数据的不可变性，同时提供了直观的修改方式。

**immer 的核心原理基于以下两个概念：**
1. 写时复制 (Copy-on-Write)
    * 无修改时：直接返回原对象
    * 有修改时：创建新对象

2. 惰性代理 (Lazy Proxy)
    * 按需创建代理
    * 通过 Proxy 拦截操作
    * 延迟代理创建

**简化实现**
```ts
type Draft<T> = {
  -readonly [P in keyof T]: T[P];
};

function produce<T>(base: T, recipe: (draft: Draft<T>) => void): T {
  // 用于存储修改过的对象
  const modified: Record<string, any> = {};
  
  const handler = {
    get(target: any, prop: string) {
      // 如果这个对象已经被修改过，返回修改后的对象
      if (prop in modified) {
        return modified[prop];
      }
      
      // 如果访问的是对象，则递归创建代理
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler);
      }
      return target[prop];
    },
    set(target: any, prop: string, value: any) {
      // 记录修改
      modified[prop] = value;
      return true;
    }
  };

  // 创建代理对象
  const proxy = new Proxy(base, handler);
  
  // 执行修改函数
  recipe(proxy);
  
  // 如果没有修改，直接返回原对象
  if (Object.keys(modified).length === 0) {
    return base;
  }
  
  // 创建新对象，只复制修改过的属性
  return JSON.parse(JSON.stringify(proxy))
}

// 使用示例
const state = {
  user: {
    name: '张三',
    age: 25
  }
};

const newState = produce(state, draft => {
  draft.user.name = '李四';
  draft.user.age = 26;
});

console.log(state);     // { user: { name: '张三', age: 25 } }
console.log(newState);  // { user: { name: '李四', age: 26 } }
```

## Zustand 第三章(状态简化)

### 状态简化
回忆一下我们在使用 `zustand` 时，是这样引入状态的(如下),通过`解构的方式`引入状态，但是这样引入会引发一个问题，例如A组件用到了 `hobby.basketball` 状态，而B组件 没有用到 `hobby.basketball` 状态，但是更新`hobby.basketball`这个状态的时候，A组件和B组件都会重新渲染，这样就导致了不必要的重渲染，因为B组件并没有用到`hobby.basketball`这个状态。
```ts
const { name, age, hobby, setHobbyRap, setHobbyBasketball } = useUserStore()
return (
    <div className="left">
        <h1>A组件</h1>
        <div>
            <h3>{name}</h3>
            <div>年龄：<span>{age}</span></div>
            <div>爱好1：<span>{hobby.sing}</span></div>
            <div>爱好2：<span>{hobby.dance}</span></div>
            <div>爱好3：<span>{hobby.rap}</span></div>
            <div>爱好4：<span>{hobby.basketball}</span></div>
            <button onClick={() => setHobbyRap('只因你太美')}>改变爱好rap</button>
            <button onClick={() => setHobbyBasketball('篮球')}>改变爱好basketball</button>
        </div>
    </div>
)
```
### 状态选择器
所以为了规避这个问题，我们可以使用状态选择器，状态选择器可以让我们只选择我们需要的部分状态，这样就不会引发不必要的重渲染。

```ts
const name = useUserStore((state) => state.name)
const age = useUserStore((state) => state.age)
const rap = useUserStore((state) => state.hobby.rap)
const basketball = useUserStore((state) => state.hobby.basketball)
```

### useShallow
你以为这样就结束了? 并没有，你可以想一下如果一个属性很多，例如100个，那我们写起来岂不是要疯了，但是你用解构的话他又会造成不必要的重渲染，真是生与死轮回不止，这时候我们就可以使用 `useShallow` 来避免这个问题。
:::warning
useShallow 只检查顶层对象的引用是否变化，如果顶层对象的引用没有变化（即使其内部属性或子对象发生了变化，但这些变化不影响顶层对象的引用），使用 useShallow 的组件将不会重新渲染
:::

```ts
import { useShallow } from 'zustand/react/shallow';
const { rap, name } = useUserStore(useShallow((state) => ({
    rap: state.hobby.rap,
    name: state.name
})))
```

**代码获取**
```ts
// store/user.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
interface User {
    name: string,
    age: number,
    hobby: {
        sing: string,
        dance: string,
        rap: string,
        basketball: string,
    }
    setHobbyRap: (rap: string) => void,
    setHobbyBasketball: (basketball: string) => void
}
const useUserStore = create<User>()(immer((set) => ({
    name: '坤坤',
    age: 18,
    hobby: {
        sing: '坤式唱腔',
        dance: '坤式舞步',
        rap: '坤式rap',
        basketball: '坤式篮球'
    },
    setHobbyRap: (rap: string) =>set((state) => {
        state.hobby.rap = rap
    }),
    setHobbyBasketball: (basketball: string) => set((state) => {
        state.hobby.basketball = basketball
    })
})))

export default useUserStore;
```
```ts
// A component
import '../index.css'
import useUserStore from '../../store/user';
export default function Left() {
    console.log('A组件渲染')
    const { name, age, hobby, setHobbyRap, setHobbyBasketball } = useUserStore()
    return (
        <div className="left">
            <h1>A组件</h1>
            <div>
                <h3>{name}</h3>
                <div>年龄：<span>{age}</span></div>
                <div>爱好1：<span>{hobby.sing}</span></div>
                <div>爱好2：<span>{hobby.dance}</span></div>
                <div>爱好3：<span>{hobby.rap}</span></div>
                <div>爱好4：<span>{hobby.basketball}</span></div>
                <button onClick={() => setHobbyRap('只因你太美')}>改变爱好rap</button>
                <button onClick={() => setHobbyBasketball('篮球')}>改变爱好basketball</button>
            </div>
        </div>
    )
}
```

```ts
// B component
import '../index.css'
import useUserStore from '../../store/user';
import { useShallow } from 'zustand/react/shallow';
export default function Right() {
    console.log('B组件渲染')
    const { rap, name } = useUserStore(useShallow((state) => ({
        rap: state.hobby.rap,
        name: state.name
    })))
    return (
        <div className="right">
            <h1>B组件</h1>
            <div>
                <div>姓名：<span>{name}</span></div>
                <div>rap：<span>{rap}</span></div>
            </div>
        </div>
    )
}
```
```css
/* css */
.left {
    width: 50%;
    height: 100%;
    border: 1px solid rgb(19, 204, 148);
    height: 300px;
    margin:30px;
    padding: 20px;
    border-radius: 10px;
}


.right {
    width: 50%;
    height: 100%;
    border: 1px solid rgb(214, 35, 35);
    height: 300px;
    margin:30px;
    padding: 20px;
    border-radius: 10px;
}


.left button {
    margin: 10px;
    padding: 10px;
}

.right button {
    margin: 10px;
    padding: 10px;
}


```


## Zustand 第四章(中间件)

**中间件**
zustand 的中间件是用于在状态管理过程中添加额外逻辑的工具。它们可以用于日志记录、性能监控、数据持久化、异步操作等。

**自定义编写中间件**
我们实现一个简易的日志中间件，了解其中间件的实现原理, zustand的中间件是一个高阶函数，你问我有多高，三四楼那么高啦
```ts
const logger = (config) => (set, get, api) => config((...args) => {
    console.log(api)
    console.log('before', get())
    set(...args)
    console.log('after', get())
}, get, api)
```
参数解释：

1. config (外层函数参数)
    * 类型：函数 (set, get, api) => StoreApi
    * 作用：原始创建 store 的配置函数，由用户传入。中间件需要包装这个函数。

2. set (内层函数参数)
    * 类型：函数 (partialState) => void
    * 作用：原始的状态更新函数，用于修改 store 的状态。

3. get (内层函数参数)
    * 类型：函数 () => State
    * 作用：获取当前 store 的状态值。

4. api (内层函数参数)
    * 类型：对象 StoreApi
    * 作用：包含 store 的完整 API（如 setState, getState, subscribe, destroy 等方法）。

### 使用示例
```ts
const useUserStore = create<User>()(immer(logger((set) => ({
    name: '坤坤',
    age: 18,
    hobby: {
        sing: '坤式唱腔',
        dance: '坤式舞步',
        rap: '坤式rap',
        basketball: '坤式篮球'
    },
    setHobbyRap: (rap: string) => set((state) => {
        state.hobby.rap = rap
    }),
    setHobbyBasketball: (basketball: string) => set((state) => {
        state.hobby.basketball = basketball
    })
}))))
```

### devtools
devtools 是 zustand 提供的一个用于调试的工具，它可以帮助我们更好地管理状态。

1.  需要安装浏览器插件 `Redux DevTools` [下载地址](https://chromewebstore.google.com/search/redux?hl=zh-cn)

2. 在浏览器中打开 `Redux DevTools` 插件，并连接到当前页面
```ts
const useUserStore = create<User>()(
//因为immer会修改state所以devtools必须放在immer后面
    immer(
        devtools((set) => ({
            name: '坤坤',
            age: 18,
            hobby: {
                sing: '坤式唱腔',
                dance: '坤式舞步',
                rap: '坤式rap',
                basketball: '坤式篮球'
            },
            setHobbyRap: (rap: string) => set((state) => {
                state.hobby.rap = rap
            }),
            setHobbyBasketball: (basketball: string) => set((state) => {
                state.hobby.basketball = basketball
            })
        }),
            {
                enabled: true, // 是否开启devtools
                name: '用户信息', // 仓库名称
            }
        )
    )
)
```

### persist
persist 是 zustand 提供的一个用于持久化状态的工具，它可以帮助我们更好地管理状态，默认是存储在 localStorage 中，可以指定存储方式
```ts
const useUserStore = create<User>()(
    immer(
        persist((set) => ({
            name: '坤坤',
            age: 18,
            hobby: {
                sing: '坤式唱腔',
                dance: '坤式舞步',
                rap: '坤式rap',
                basketball: '坤式篮球'
            },
            setHobbyRap: (rap: string) => set((state) => {
                state.hobby.rap = rap
            }),
            setHobbyBasketball: (basketball: string) => set((state) => {
                state.hobby.basketball = basketball
            })
        }),
            {
                name: 'user', // 仓库名称(唯一)
                storage: createJSONStorage(() => localStorage), // 存储方式 可选 localStorage sessionStorage IndexedDB 默认localStorage
                partialize: (state) => ({
                    name: state.name,
                    age: state.age,
                    hobby: state.hobby
                }) // 部分状态持久化
            }
        )
    )
)
```
清空缓存Api, 在页面中添加一个按钮，点击按钮清空缓存,在增加persist中间件之后会自动增加一个clearStorage方法,用于清空缓存
```ts
import useUserStore from '../../store/user';
const App = () => {
    const clear = () => {
        useUserStore.persist.clearStorage()
    }
    return <div onClick={clear}>清空缓存</div>
}
```

## Zustand 第五章(订阅)
**订阅**
`zustand` 的 `subscribe` ，可以订阅一个状态，当状态变化时，会触发回调函数。

**订阅一个状态**
只要store 的 state 发生变化，就会触发回调函数，`另外就是这个订阅可以在组件内部订阅，也可以在组件外部订阅`,如果在组件内部订阅需要放到`useEffect`中,防止重复订阅。
```ts
const store = create((set) => ({
  count: 0,
}));
//外部订阅
store.subscribe((state) => {
  console.log(state.count);
});
//组件内部订阅
useEffect(() => {
  store.subscribe((state) => {
    console.log(state.count);
  });
}, []);
```

**案例**
比如我们需要观察年龄的变化，大于等于26 就提示可以结婚了，小于26 就提示还不能结婚，如果使用选择器的写法，age每次更新都会重新渲染组件，这样就会导致组件的频繁渲染。
```ts
const store = create((set) => ({
  age: 0,
}));
//组件里面 age 每次更新都会重新渲染组件 
const { age } = useStore(useShallow((state) => ({
  age: state.age,
})));
```

性能优化，采用订阅的模式，age 变化的时候，会调用回调函数，但是不会重新渲染组件。

```ts
const store = create((set) => ({
  age: 0,
}));

const [status,setStatus] = useState('单身')
//只会更新一次组件
useStore.subscribe((state) => {
  if(state.age >= 26){
    setStatus('结婚')
  }else{
    setStatus('单身')
  }
});
return <div>{status}</div>
```
持续优化，目前的订阅只要是store内部任意的state发生变化，都会触发回调函数，我们希望只订阅age的变化，可以使用中间件 `subscribeWithSelector` 订阅单个状态。
```ts
const store = create(subscribeWithSelector((set) => ({
  age: 0,
  name: '张三',
})));
const [status,setStatus] = useState('单身')
//订阅age的变化 并且组件渲染一次
useStore.subscribe(state => state.age, (age,prevAge) => {
   if(age >= 26){
    setStatus('结婚')
   }else{
    setStatus('单身')
   }
});
```
### 补充用法
1. `subscribe` 会返回一个取消订阅的函数，可以手动取消订阅。
```ts
const unSubscribe = useStore.subscribe((state) => {
  console.log(state.age);
});
unSubscribe(); //取消订阅
```

2. 当你使用了 `subscribeWithSelector` 中间件的时候会多出来第三个参数 `options`
    * `equalityFn` 比较函数
    * `fireImmediately` 是否立即触发
```ts
const unSubscribe = useStore.subscribe(state => state.age, (age,prevAge) => {
  console.log(age,prevAge);
}, {
  equalityFn: (a, b) => a === b, // 默认是浅比较，如果需要深比较，可以传入一个比较函数
  fireImmediately: true, // 默认是false，如果需要立即触发，可以传入true
});
```






















