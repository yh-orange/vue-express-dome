# 在Vue 中使用 JSX 语法

Vue 中构建`虚拟DOM`可以直接使用渲染函数构建虚拟Dom，正常情况下用 `render` 函数的参数 `createElement` 方法构建 `虚拟Dom` 的语法比较繁琐，更方便的是用更接近于模板的JSX语法。

我的vue脚手架是vue cli4，如果在新建项目时安装了babel,则自动安装了编译JSX需要的babel插件
babel.config.js
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```
这种情况下，render()支持JSX语法。

**JSX是什么**
`JSX`(`Javascript XML`)是`React`发明的一种`JavaScript的语法扩展`，允许 HTML 与 JavaScript 的混写；JSX本身也是一个表达式，在编译后，JSX表达式会变成普通的JavaScript对象。

`JSX语法`不能被浏览器识别，需要 `Babel` 转义成普通的`JavaScript对象`。

**JSX语法规则**
1. 在JSX中可以在大括号{}里任意使用JavaScript表达式
2. 必须包含一个根节点
3. 标签必须正确嵌套，标签必须关闭，允许单标签，属性名会自动转为小写
4. 注释的写法
注释需要包含在{}里
```text
{/* **** */}
```

**使用JSX构建虚拟Dom**
`render函数`使用`JSX`构建`虚拟Dom`

`render函数`中`this`指向当前实例
`render函数`的参数 `createElement`，`JSX` 中要用简写h。
`return的内容`就是`虚拟dom`.使用的语法是`JSX语法`，它看起来和上例中的模板很像，语法规则中的最重要的一点就是要在大括号{}里使用J`avaScript表达式`
```jsx harmony
export default {
  data () {
    return { message: 'Hello Vue!' }
  },
  render: function (h) {
    return (
      <div>
        <p>Hello {this.message}</p>
      </div>
    )
  }
}
```

**插值表达式**
JSX不支持模板语法中的插值表达式，在JSX直接用{}包裹js表达式

**JSX中引用组件**
只需要将组件导入，无需在 `components` 选项中声明
```jsx harmony
import MyHeader from './MyHeader'
export default {
  render(){
    return (
      <MyHeader>用户登录</MyHeader>
    )
  }
}
```

**属性的写法**
跟普通的 HTML一样,动态属性要用{}包裹
```jsx harmony
<div>
  <p id="a" class={'b'}>{this.message}</p>
</div>
```

**指令**
常见的指令
```jsx harmony
render(){
   return (
     <div>
      {/* v-model */}
       <input vModel={this.newTodoText} />
       {/* v-model 以及修饰符 */}
       <input vModel_trim={this.newTodoText} />
       {/* v-on 监听事件 */}
       <input vOn:click={this.newTodoText} />
       {/* v-on 监听事件以及修饰符 */}
       <input vOn:click_stop_prevent={this.newTodoText} />
       {/* v-html */}
       <p domPropsInnerHTML={html} />
     </div>
   )
 }
```

**事件绑定**
以下方式都可以，在使用不同的babel转义时，写法可能不同
```jsx harmony
<button vOn:click={this.handleClick}>确定</button>
<button onClick={this.handleClick}>确定</button>
<button on-click={this.handleClick}>确定</button>
```

**插槽**
子组件
```jsx harmony
render () {
   return (
     <div class="header">
       {this.$slots.title}
       {this.$slots.default}
     </div>
   )
 }
```
相当于模板
```vue
<template>
  <div class="header">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>
```
父组件
```jsx harmony
render () {
   return (
     <MyHeader>
       <h1 slot="title">具名插槽</h1>
       <p>默认插槽的内容</p>
     </MyHeader>
   )
 }
```

**循环语句**
```jsx harmony
render () {
    return (
      <ul>
        <li>1.a</li>
        <li>2.b</li>
        <li>3.c</li>
      </ul>
    )
  }
```
上面的代码通过循环语句实现：
```jsx harmony
render () {
  const todos = ['a', 'b', 'c']
  return (
    <ul>
      {
        todos.map((item,index)=> {
          return <li>{index}.{item}</li>
        })
      }
    </ul>
  )
}
```

**条件语句**
* 三元表达式
```jsx harmony
render () {
  const condition = true
  return (
    <div>
      {
        condition
          ? <span>1</span>
          : <span>0</span>
      }
    </div>
  )
}
```

* if - else
```jsx harmony
render () {
  const condition = true
  let content = ''
  if (condition) {
    content = <span>1</span>
  } else {
    content = <span>0</span>
  }
  return (
    <div>
      {content}
    </div>
  )
}
```

**函数式组件**
[官方文档](https://github.com/vuejs/jsx-vue2#installation)
