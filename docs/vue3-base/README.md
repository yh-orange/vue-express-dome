# vue3 学习笔记

## vue3 基本信息介绍

1. **了解相关信息**
* `Vue.js 3.0` "`One Piece`" 正式版在今年9月份发布
* 2年多开发, 100+位贡献者, 2600+次提交, 600+次PR
* `Vue3`支持`vue2`的大多数特性
* 更好的支持Typescript
* 2022-2-7 `vue` 默认版本为3.0
   
2. **性能提升**
* 打包大小减少41%
* 初次渲染快55%, 更新渲染快133%
* 内存减少54%
* 使用`Proxy`代替 `defineProperty` 实现数据响应式
* 重写虚拟DOM的实现和 `Tree-Shaking`

3. **新增特性**

* `Composition (组合) API`

### 创建vue3项目的方法

```sh
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project
```

接下来步骤
* Please pick a preset - 选择 Manually select features
* Check the features needed for your project - 选择上 TypeScript ，特别注意点空格是选择，点回车是下一步
* Choose a version of Vue.js that you want to start the project with - 选择 3.x (Preview)
* Use class-style component syntax - 直接回车
* Use Babel alongside TypeScript - 直接回车
* Pick a linter / formatter config - 直接回车
* Use history mode for router? - 直接回车
* Pick a linter / formatter config - 直接回车
* Pick additional lint features - 直接回车
* Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
* Save this as a preset for future projects? - 直接回车

### 使用 vite 创建

[官方稳定](https://v3.cn.vuejs.org/guide/installation.html)

* `vite` 是一个由原生 `ESM` 驱动的 `Web` 开发构建工具。在开发环境下基于浏览器原生 `ES imports` 开发，

* 它做到了 **本地快速开发启动** , 在生产环境下基于 Rollup 打包。

* 快速的冷启动，不需要等待打包操作；
* 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
* 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

::: tip 兼容性注意
    Vite 需要 Node.js 版本 >= 12.0.0。
:::

```sh(1)
#先全局安装vite
npm init vite@latest
然后通过命令行
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue
或者

npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
    
```

查看 `create-vite` 以获取每个模板的更多细节：`vanilla`，`vanilla-ts`，`vue`，`vue-ts`，`react`，`react-ts`，`preact`，`preact-ts`，`lit`，`lit-ts`，`svelte`，`svelte-ts`

## Composition API(常用部分)

[官方文档](​https://composition-api.vuejs.org/zh/api.html)

### setup

* 新的`option`, 所有的组合API函数都在此使用, 只在初始化时执行一次
* 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

* **`setup`执行的时机**

1. 在`beforeCreate`之前执行(一次), 此时组件对象还没有创建
2. `this`是`undefined`, 不能通过`this`来访问`data/computed/methods/props`
3. 其实所有的`composition API`相关回调函数中也都不可以

* **`setup`的返回值**
1. 一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
2. 返回对象中的属性会与 `data` 函数返回对象的属性合并成为组件对象的属性
3. 返回对象中的方法会与 `methods` 中的方法合并成功组件对象的方法
4. 如果有重名, `setup` 优先
* **注意:**
* 一般不要混合使用: `methods` 中可以访问 `setup` 提供的属性和方法, 但在 `setup` 方法中不能访问 `data` 和 `methods`
* `setup` 不能是一个 `async` 函数: 因为返回值不再是 `return` 的对象, 而是 `promise`, 模板看不到 `return` 对象中的属性数据

* **setup的参数**

1. `setup(props, context)` / `setup(props, {attrs, slots, emit})`
2. `props`: 包含 `props` 配置声明且传入了的所有属性的对象
3. `attrs`: 包含没有在props配置中声明的属性的对象, 相当于 `this.$attrs`
4. `slots`: 包含所有传入的插槽内容的对象, 相当于 `this.$slots`
5. `emit`: 用来分发自定义事件的函数, 相当于 `this.$emit`

### ref

1. 作用: 定义一个数据的响应式
2.语法: `const xxx = ref(initValue)`:
* 创建一个包含响应式数据的引用(`reference`)对象
* js中操作数据: `xxx.value`
* 模板中操作数据: 不需要.`value`
3. 一般用来定义一个基本类型的响应式数据

```vue
<template>
  <h2>{{count}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
import {
  ref
} from 'vue'
export default {

  /* 在Vue3中依然可以使用data和methods配置, 但建议使用其新语法实现 */
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   update () {
  //     this.count++
  //   }
  // }

  /* 使用vue3的composition API */
  setup () {

    // 定义响应式数据 ref对象
    const count = ref(1);
    console.log(count);

    // 更新响应式数据的函数
    function update () {
      // alert('update')
      count.value = count.value + 1
    }

    return {
      count,
      update
    }
  }
}
</script>
```


4. 利用ref函数获取组件中的标签元素
   
   功能需求: 让输入框自动获取焦点
```vue
<template>
  <h2>App</h2>
  <input type="text">---
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
/* 
ref获取元素: 利用ref函数获取组件中的标签元素
功能需求: 让输入框自动获取焦点
*/
export default {
  setup() {
    const inputRef = ref<HTMLElement|null>(null)

    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef
    }
  },
}
</script>
```

### reactive

* 作用: 定义多个数据的响应式
* `const proxy = reactive(obj):` 接收一个普通对象然后返回该普通对象的响应式代理器对象
* 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
* 内部基于 `ES6` 的 `Proxy` 实现，通过代理对象操作源对象内部数据都是响应式的

```vue
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
/* 
reactive: 
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
import {
  reactive,
} from 'vue'
export default {
  setup () {
    /* 
    定义响应式数据对象
    */
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    console.log(state, state.wife)

    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }

    return {
      state,
      update,
    }
  }
}
</script>
```

### vue3和vue2响应式原理的区别

**vue2的响应式**
1. 核心:
* 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
* 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
```js
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```
2. 问题
* 对象直接新添加的属性或删除已有属性, 界面不会自动更新
* 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}


**Vue3的响应式**

1. 核心:
* 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
* 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
* 文档:
1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
2. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Refle2t

```js
new Proxy(data, {
	// 拦截读取属性值
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})

proxy.name = 'tom'   
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy 与 Reflect</title>
</head>
<body>
  <script>
    
    const user = {
      name: "John",
      age: 12
    };

    /* 
    proxyUser是代理对象, user是被代理对象
    后面所有的操作都是通过代理对象来操作被代理对象内部属性
    */
    const proxyUser = new Proxy(user, {

      get(target, prop) {
        console.log('劫持get()', prop)
        return Reflect.get(target, prop)
      },

      set(target, prop, val) {
        console.log('劫持set()', prop, val)
        return Reflect.set(target, prop, val); // (2)
      },

      deleteProperty (target, prop) {
        console.log('劫持delete属性', prop)
        return Reflect.deleteProperty(target, prop)
      }
    });
    // 读取属性值
    console.log(proxyUser===user)
    console.log(proxyUser.name, proxyUser.age)
    // 设置属性值
    proxyUser.name = 'bob'
    proxyUser.age = 13
    console.log(user)
    // 添加属性
    proxyUser.sex = '男'
    console.log(user)
    // 删除属性
    delete proxyUser.sex
    console.log(user)
  </script>
</body>
</html>
```

### 计算属性和监视

**`computed`函数:**

* 与computed配置功能一致
* 只有getter
* 有getter和setter

**`watch`函数**

* 与watch配置功能一致
* 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
* 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
* 通过配置deep为true, 来指定深度监视

**`watchEffect`函数**

* 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
* 默认初始时就会执行第一次, 从而可以收集需要监视的数据
* 监视数据发生变化时回调

```vue
<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏:<input
      type="text"
      placeholder="请输入姓氏"
      v-model="user.firstName"
    /><br />
    名字:<input
      type="text"
      placeholder="请输入名字"
      v-model="user.lastName"
    /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName2" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName3" /><br />
  </fieldset>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watch,
  ref,
  watchEffect,
} from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    // 定义一个响应式对象
    const user = reactive({
      // 姓氏
      firstName: '东方',
      // 名字
      lastName: '不败',
    })
    // 通过计算属性的方式,实现第一个姓名的显示
    // vue3中的计算属性
    // 计算属性的函数中如果只传入一个回调函数,表示的是get

    // 第一个姓名:
    // 返回的是一个Ref类型的对象
    /*
    * 计算属性的两种用法，一种是函数，一种是使get，set方法
    * */
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName
    })
    // const fullName2 = user.firstName + '_' + user.lastName;
    // 第二个姓名:
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        // console.log('=====',val)
        const names = val.split('_')
        user.firstName = names[0]
        user.lastName = names[1]
      },
    })

    // 第三个姓名:
    const fullName3 = ref('')
    // 监视----监视指定的数据
    watch(
      user,
      ({ firstName, lastName }) => {
        fullName3.value = firstName + '_' + lastName
      },
      { immediate: true, deep: true }
    )
    // immediate 默认会执行一次watch,deep 深度监视

    // 监视,不需要配置immediate,本身默认就会进行监视,(默认执行一次)
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })

    // 监视fullName3的数据,改变firstName和lastName
    watchEffect(() => {
      const names = fullName3.value.split('_')
      user.firstName = names[0]
      user.lastName = names[1]
    })

    // watch---可以监视多个数据的
    // watch([user.firstName,user.lastName,fullName3],()=>{
    //   // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
    //   console.log('====')
    // })
    // 当我们使用watch监视非响应式的数据的时候,代码需要改一下
    watch([()=>user.firstName, ()=>user.lastName,fullName3], () => {
      // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
      console.log('====')
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    }
  },
})
</script>
```

### 生命周期

![vue2-lifecycle](/images/lifecycle2.png)

---

![vue2-lifecycle](/images/lifecycle3.png)


* **与 `2.x 版本`生命周期相对应的`组合式 API`**

`beforeCreate` -> 使用 `setup()`
`created` -> 使用 `setup()`
`beforeMount` -> `onBeforeMount`
`mounted` -> `onMounted`
`beforeUpdate` -> `onBeforeUpdate`
`updated` -> `onUpdated`
`beforeDestroy` -> `onBeforeUnmount`
`destroyed` -> `onUnmounted`
`errorCaptured` -> `onErrorCaptured`
新增的钩子函数

`组合式 API` 还提供了以下调试钩子函数：

`onRenderTracked`
`onRenderTriggered`

```vue
<template>
<div class="about">
  <h2>msg: {{msg}}</h2>
  <hr>
  <button @click="update">更新</button>
</div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate,
  onBeforeUnmount
} from "vue"

export default {
  beforeCreate () {
    console.log('beforeCreate()')
  },

  created () {
    console.log('created')
  },

  beforeMount () {
    console.log('beforeMount')
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('beforeUpdate')
  },

  updated () {
    console.log('updated')
  },

  beforeUnmount () {
    console.log('beforeUnmount')
  },

  unmounted () {
     console.log('unmounted')
  },
  

  setup() {
    
    const msg = ref('abc')

    const update = () => {
      msg.value += '--'
    }

    onBeforeMount(() => {
      console.log('--onBeforeMount')
    })

    onMounted(() => {
      console.log('--onMounted')
    })

    onBeforeUpdate(() => {
      console.log('--onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('--onUpdated')
    })

    onBeforeUnmount(() => {
      console.log('--onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('--onUnmounted')
    })
    
    return {
      msg,
      update
    }
  }
}
</script>

```

```vue
<template>
  <h2>App</h2>
  <button @click="isShow=!isShow">切换</button>
  <hr>
  <Child v-if="isShow"/>
</template>

<script lang="ts">
import Child from './Child.vue'
export default {

  data () {
    return {
      isShow: true
    }
  },

  components: {
    Child
  }
}
</script>
```

### 自定义hook函数

*使用Vue3的组合API封装的可复用的功能函数

*自定义hook的作用类似于vue2中的mixin技术

*自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

*需求1: 收集用户鼠标点击的页面坐标

dome如下

```vue
import { ref, onMounted, onUnmounted } from 'vue'
/* 
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition () {
  // 初始化坐标数据
  const x = ref(-1)
  const y = ref(-1)

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return {x, y}
}
```

```vue
<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>
</div>
</template>

<script>

import {
  ref
} from "vue"
/* 
在组件中引入并使用自定义hook
自定义hook的作用类似于vue2中的mixin技术
自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
*/
import useMousePosition from './hooks/useMousePosition'

export default {
  setup() {

    const {x, y} = useMousePosition()

    return {
      x,
      y,
    }
  }
}
</script> 
```

### `toRefs`

把一个响应式对象转换成普通对象，该普通对象的每个 `property` 都是一个 `ref`

应用: 当从合成函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

问题: `reactive` 对象取出的所有属性值都是非响应式的

解决: 利用 `toRefs` 可以将一个响应式 `reactive` 对象的所有原始属性转换为响应式的 `ref` 属性

结构或者按需引入会导致对象接触响应式，所以在暴露的时候使用 `toRefs` 可以使引入的数据变成响应式，方便数据的处理。


```vue
<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name:{{ state.name }}</h3>
  <h3>age:{{ state.age }}</h3> -->

  <h3>name:{{ name }}</h3>
  <h3>age:{{ age }}</h3>

  <h3>name2:{{ name2 }}</h3>
  <h3>age2:{{ age2 }}</h3>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

function useFeatureX() {
  const state = reactive({
    name2: '自来也',
    age2: 47,
  });
  return {
    ...toRefs(state),
  }
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '自来也',
      age: 47,
    });
    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
    // const state2 = toRefs(state)
    const { name, age } = toRefs(state);
    // console.log(state2)
    // 定时器,更新数据,(如果数据变化了,界面也会随之变化,肯定是响应式的数据)
    setTimeout(() => {
      // state.name += '=='
      // state2.name.value+='==='
      name.value += '===';
      console.log('======');
    }, 1000)

    const { name2, age2 } = useFeatureX()
    return {
      // state,
      // 下面的方式不行啊
      // ...state // 不是响应式的数据了---->{name:'自来也',age:47}
      // ...state2  toRefs返回来的对象
      name,
      age,
      name2,
      age2,
    }
  },
})
</script>
```

## `Composition API`(不常用部分)

###  `shallowReactive` 与 `shallowRef`

* shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)

* shallowRef: 只处理了value的响应式, 不进行对象的reactive处理

* 什么时候用浅响应式呢?

1. 一般情况下使用ref和reactive即可
2. 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
3. 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

```vue
<template>
  <h2>App</h2>

  <h3>m1: {{m1}}</h3>
  <h3>m2: {{m2}}</h3>
  <h3>m3: {{m3}}</h3>
  <h3>m4: {{m4}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, ref, shallowReactive, shallowRef } from 'vue'
/* 
shallowReactive与shallowRef
  shallowReactive: 只处理了对象内最外层属性的响应式(也就是浅响应式)
  shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
总结:
  reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
  什么时候用浅响应式呢?
    一般情况下使用ref和reactive即可,
    如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
    如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
*/

export default {

  setup () {

    const m1 = reactive({a: 1, b: {c: 2}})
    const m2 = shallowReactive({a: 1, b: {c: 2}})

    const m3 = ref({a: 1, b: {c: 2}})
    const m4 = shallowRef({a: 1, b: {c: 2}})

    const update = () => {
      // m1.b.c += 1
      // m2.b.c += 1

      // m3.value.a += 1
      m4.value.a += 1
    }

    return {
      m1,
      m2,
      m3,
      m4,
      update,
    }
  }
}
</script>
```

### `readonly` 与 `shallowReadonly`

* `readonly`
1. 深度只读数据
2. 获取一个对象 (响应式或纯对象) 或 `ref` 并返回原始代理的只读代理。
3. 只读代理是深层的：访问的任何嵌套 `property` 也是只读的。

* `shallowReadonly`
1. 浅只读数据
2. 创建一个代理，使其自身的 `property` 为只读，但不执行嵌套对象的深度只读转换

**应用场景:**
在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

* 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```vue
<template>
  <h2>App</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, readonly, shallowReadonly } from 'vue'
/*
`readonly`: 深度只读数据
  获取一个对象 (响应式或纯对象) 或 `ref` 并返回原始代理的只读代理。
  只读代理是深层的：访问的任何嵌套 `property` 也是只读的。
`shallowReadonly`: 浅只读数据
  创建一个代理，使其自身的 `property` 为只读，但不执行嵌套对象的深度只读转换 
应用场景: 
  在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
*/

export default {

  setup () {

    const state = reactive({
      a: 1,
      b: {
        c: 2
      }
    })

    // const rState1 = readonly(state)
    const rState2 = shallowReadonly(state)

    const update = () => {
      // rState1.a++ // error
      // rState1.b.c++ // error

      // rState2.a++ // error
      rState2.b.c++
    }
    // 如果用ref 使用的话需要.value 修改数据的时候不再是浅层数据了，所以可以修改 ，只对 reactive 有影响
    return {
      state,
      update
    }
  }
}
</script>
```

### `toRaw` 与 `markRaw`

* `toRaw`
1. 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
2. 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
* `markRaw`
1.标记一个对象，使其永远不会转换为代理。返回对象本身

**应用场景:**
* 有些值不应被设置为响应式的，例如复杂的第三方类实例或 `Vue` 组件对象。
* 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

```vue
<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 得到reactive代理对象的目标数据对象
*/
import {
  markRaw,
  reactive, toRaw,
} from 'vue'
export default {
  setup () {
    const state = reactive<any>({
      name: 'tom',
      age: 25,
    })

    const testToRaw = () => {
      const user = toRaw(state)
      user.age++  // 界面不会更新

    }

    const testMarkRaw = () => {
      const likes = ['a', 'b']
      // state.likes = likes
      state.likes = markRaw(likes) // likes数组就不再是响应式的了
      setTimeout(() => {
        state.likes[0] += '--'
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  }
}
</script>
```

### `toef`

* 为源响应式对象上的某个属性创建一个 `ref` 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
* 区别`ref`: 拷贝了一份新的数据值单独操作, 更新时相互不影响
* 应用: 当要将 某个 `prop` 的 `ref` 传递给复合函数时，`toRef` 很有用

```vue
<template>
  <h2>toRef的使用及特点:</h2>
  <h3>state:{{ state }}</h3>
  <h3>age:{{ age }}</h3>
  <h3>money:{{ money }}</h3>
  <hr />
  <button @click="update">更新数据</button>

  <hr />
  <Child :age="age" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  components: {
    Child,
  },
  setup() {
    const state = reactive({
      age: 5,
      money: 100,
    })
    // 把响应式数据state对象中的某个属性age变成了ref对象了
    const age = toRef(state, 'age')
    // 把响应式对象中的某个属性使用ref进行包装,变成了一个ref对象
    const money = ref(state.money)
    console.log(age)
    console.log(money)
    const update = () => {
      // 更新数据的
      // console.log('测试')
      state.age += 2
      // age.value += 3 // 不会响应式变化
      // money.value += 10
    }
    return {
      state,
      age,
      money,
      update,
    }
  },
})
</script>
```

```vue
<template>
  <h2>Child</h2>
  <h3>{{foo}}</h3>
  <h3>{{length}}</h3>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue'

const component = defineComponent({
  props: {
    foo: {
      type: Number,
      require: true
    }
  },

  setup (props, context) {
    const length = useFeatureX(toRef(props, 'foo'))

    return {
      length
    }
  }
})

function useFeatureX(foo: Ref) {
  const lenth = computed(() => foo.value.length)

  return lenth
}

export default component
</script>

```

#### ` customRef`

* 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
* 需求: 使用 customRef 实现 debounce 的示例

```vue
<template>
  <h2>App</h2>
  <input v-model="keyword" placeholder="搜索关键字"/>
  <p>{{keyword}}</p>
</template>

<script lang="ts">
/*
customRef:
  创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

需求: 
  使用 customRef 实现 debounce 的示例
*/

import {
  ref,
  customRef
} from 'vue'

export default {

  setup () {
    const keyword = useDebouncedRef('', 500)
    console.log(keyword)
    return {
      keyword
    }
  },
}

/* 
实现函数防抖的自定义ref
*/
function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: number
  return customRef((track, trigger) => {
    return {
      get() {
        // 告诉Vue追踪数据
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          // 告诉Vue去触发界面更新
          trigger()
        }, delay)
      }
    }
  })
}

</script>
```

### `provide` 与 `inject`

* `provide` 和 `inject` 提供依赖注入，功能类似 `2.x` 的 `provide/inject`

* 实现跨层级组件(祖孙)间通信

```vue
<template>
  <h1>父组件</h1>
  <p>当前颜色: {{color}}</p>
  <button @click="color='red'">红</button>
  <button @click="color='yellow'">黄</button>
  <button @click="color='blue'">蓝</button>
  
  <hr>
  <Son />
</template>

<script lang="ts">
import { provide, ref } from 'vue'
/* 
- provide` 和 `inject` 提供依赖注入，功能类似 2.x 的 `provide/inject
- 实现跨层级组件(祖孙)间通信
*/

import Son from './Son.vue'
export default {
  name: 'ProvideInject',
  components: {
    Son
  },
  setup() {
    
    const color = ref('red')

    provide('color', color)

    return {
      color
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <h2>子组件</h2>
    <hr>
    <GrandSon />
  </div>
</template>

<script lang="ts">
import GrandSon from './GrandSon.vue'
export default {
  components: {
    GrandSon
  },
}
</script>
```

```vue
<template>
  <h3 :style="{color}">孙子组件: {{color}}</h3>
  
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
  setup() {
    const color = inject('color')

    return {
      color
    }
  }
}
</script>
```

### 响应式数据的判断

* `isRef`: 检查一个值是否为一个 `ref` 对象
* `isReactive`: 检查一个对象是否是由 `reactive` 创建的响应式代理
* `isReadonly`: 检查一个对象是否是由 `readonly` 创建的只读代理
* `isProxy`: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

```vue
<template>
  <h2>响应式数据的判断</h2>
</template>
<script lang="ts">
import { defineComponent, isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref } from 'vue'
export default defineComponent({
  name:'App',
    // isRef: 检查一个值是否为一个 ref 对象
    // isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
    // isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
    // isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

    setup(){
      // isRef: 检查一个值是否为一个 ref 对象
      console.log(isRef(ref({})))
      // isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
      console.log(isReactive(reactive({})))
      // isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
      console.log(isReadonly(readonly({})))
      // isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
      console.log(isProxy(readonly({})))
      console.log(isProxy(reactive({})))

      return{}
    }
 
})
</script>
```


