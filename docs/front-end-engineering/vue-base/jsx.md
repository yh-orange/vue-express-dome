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

## 常用指令

1. **元素聚焦**
当你需要在页面加载完成后自动聚焦到某个输入框或者按钮时，可以使用自定义指令来实现。

```js
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});
```

2. **文本输入格式化**
例如，自动将用户输入的数字转换为货币格式，或者在用户输入时自动添加特定的前缀或后缀。
```js
Vue.directive('currency', {
  bind(el, binding) {
    el.value = parseFloat(el.value).toFixed(binding.value || 2);
  },
  update(el, binding) {
    el.value = parseFloat(el.value).toFixed(binding.value || 2);
  }
});
```

3. **元素高亮显示**
用于高亮显示某些元素，比如搜索结果或用户选中的项。
```js
Vue.directive('highlight', {
  bind(el, binding) {
    el.style.backgroundColor = binding.value ? 'yellow' : '';
  }
});
```

4. **懒加载图片**
实现图片的懒加载，当图片进入视口时才加载。
```js
Vue.directive('lazyload', {
  bind(el, binding) {
    function check() {
      if (isElementInViewport(el)) {
        if (el.getAttribute('data-src')) {
          el.src = el.getAttribute('data-src');
          el.removeAttribute('data-src');
        }
      } else {
        setTimeout(check, 500); // 每500ms检查一次
      }
    }
    check(); // 初始检查
  }
});
// 其中isElementInViewport是一个辅助函数，用于判断元素是否在视口内。
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// function isElementInViewport(el) {
//     return new Promise((resolve) => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     resolve(true);
//                 }
//             });
//             observer.disconnect(); // 断开观察器连接，防止内存泄漏
//         });
//         observer.observe(el);
//     });
// }
```
5.  元素拖拽
创建可拖拽的元素。这需要处理多个事件，包括 `mousedown`、`mousemove和mouseup`。
```js
Vue.directive('draggable', {
  bind(el) {
    let offset = { x: 0, y: 0 }; // 初始偏移量
    function mouseDownHandler(e) {
      const startX = e.clientX; // 获取鼠标点击时的X坐标
      const startY = e.clientY; // 获取鼠标点击时的Y坐标
      document.addEventListener('mousemove', mouseMoveHandler); // 添加鼠标移动事件监听器
      document.addEventListener('mouseup', mouseUpHandler); // 添加鼠标松开事件监听器
      offset.x = startX - el.offsetLeft; // 计算初始偏移量X
      offset.y = startY - el.offsetTop; // 计算初始偏移量Y
    }
    
    function mouseMoveHandler(e) {
      el.style.left = `${e.clientX - offset.x}px`; // 设置元素的新位置X坐标
      el.style.top = `${e.clientY - offset.y}px`; // 设置元素的新位置Y坐标
    }
    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler); // 移除鼠标移动事件监听器
      document.removeEventListener('mouseup', mouseUpHandler); // 移除鼠标松开事件监听器
    }
    el.addEventListener('mousedown', mouseDownHandler); // 在元素上添加鼠标按下事件监听器
  }
});
```

6. 全局事件监听器（如键盘事件）的封装管理
在某些应用中，你可能需要在多个组件中监听键盘事件。通过自定义指令封装这部分逻辑，可以减少代码重复并提高代码的可维护性。例如，创建一个监听Esc键关闭模态框的指令。

通过这些场景，你可以看到自定义指令在Vue中的灵活性和强大功能，它们能够帮助你更好地组织和封装DOM操作和逻辑，从而提高开发效率和代码质量。


