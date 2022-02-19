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

### **setup**

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


### **ref**

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

### **reactive**

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

### **vue3和vue2响应式原理的区别**

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

### 自定义hook函数 295081

*使用Vue3的组合API封装的可复用的功能函数

*自定义hook的作用类似于vue2中的mixin技术

*自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

*需求1: 收集用户鼠标点击的页面坐标

dome如下

```js
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


