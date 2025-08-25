# React

## React入门认识

### 基本介绍
**react的特点**
1. 组件化： `React` 通过将 UI 分解为独立的、可重用的组件，使得代码更易于管理和维护。每个组件只关注于自身的逻辑和视图。

2. 声明式编程： `React` 采用声明式的编程风格，开发者只需描述 UI 应该是什么样子的，而不需要手动操作 DOM。`React` 会根据数据的变化自动更新 UI。

3. `虚拟 DOM`： `React` 使用虚拟 `DOM（Virtual DOM）`来优化 UI 的更新过程。当数据发生变化时，`React` 会创建一个新的虚拟 DOM，然后将其与之前的虚拟 DOM 进行比较，找出最小的变化，并将这些变化应用到实际的 DOM 中，从而提高性能。

4. 单向数据流： `React` 采用单向数据流（也称为单向数据绑定），这意味着数据在组件之间通过 `props` 进行传递，使得数据的流动更加清晰和可预测。

5. 生态系统： `React` 有一个庞大且活跃的社区，提供了大量的第三方库和工具，如 `React Router`（用于路由管理）、`Redux`（用于状态管理）等，帮助开发者构建复杂的应用。

**前置知识**
你必须学会以下知识才能使用 React:

* `JavaScript(es6+)`
* `HTML`
* `CSS`
* `TypeScript(基本使用) Typescript教程`
* `Npm包管理器`

**React市场情况**
npm官网统计(不包含镜像) 2024-9-4

* react 18.3.1 周下载量 `22,538,510`
* vue 3.4.31 周下载量 `4,699,312`
* Angular 18.1.0 周下载量 `3,216,414`
* jQuery 3.7.10 周下载量 `10,210,940`
* solid 1.8.18 周下载量 `288,278`

**安装环境准备**
1. node.js
    [下载地址：](https://nodejs.org/en) 建议安装18以上版本，或者使用nvm管理node版本
2. [vsocde编辑器(如果安装过了请略过|或者喜欢其他编辑器) (https://code.visualstudio.com/)](https://code.visualstudio.com/)
3. vscode插件安装 可选 (`Simple React Snippets`)


### 开发环境搭建
```sh
npm init vite
```
* 执行完成之后会让你输入项目名称 例如 `react-demo`
* 接下来会让你选择一个框架 这时候选择 `react`
* 然后选择 `TypeScript + SWC` 如果你不会ts就选择js

**目录介绍**
* public 公共目录
* src
    * assets 静态资源
    * App.css 根组件样式
    * App.tsx 根组件
    * index.css 全局css文件
    * main.tsx 全局tsx文件
    * vite-env.d.ts 声明文件
* .eslintrc.cjs eslint配置文件
* .gitignore git忽略文件
* index.html 入口文件index.html
* package.json 项目依赖模块文件
* tsconfig.json ts配置文件
* tsconfig.node.json vite-ts配置文件
* vite.config.ts vite配置文件

**FAQ:**
* **public公共目录和assets静态资源有什么区别?**
答：public目录的资源编译之后会存放到根目录，而静态资源assets是会随着项目一起打包的，public则不会被编译。

* 为什么main.tsx的`document.getElementById('root')!`要加一个!
答：因为`document.getElementById('root')`返回可能为空，这时候就会报错。!是非空断言，告诉编辑器这个表达式不会为空。

**命令介绍(package.json)**
```json
"dev": "vite",//启动开发模式项目
"build": "tsc && vite build", //打包构建生产包
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",//代码检查
"preview": "vite preview" //预览模式
```
eslint命令详解
```sh
eslint .：对当前目录（以及子目录）中的文件运行 ESLint。
--ext ts,tsx：指定要检查的文件扩展名为 .ts 和 .tsx，即 TypeScript 和 TypeScript React 文件。
--report-unused-disable-directives：报告未使用的 eslint-disable 指令。这可以帮助你清理不再需要的 ESLint 禁用指令。
--max-warnings 0：将警告数量限制为 0。如果有任何警告，ESLint 将返回非零退出代码，这通常用于在 CI/CD 环境中确保代码库没有任何警告。
```

### tsx语法入门
**FAQ**
* `tsx`跟`jsx`有什么区别
答: 基本没有没有区别只是在`jsx`语法上增加了类型。

* `jsx`是什么？
答：jsx是js的语法扩展，允许在js中编写html代码。

例如：`const fn = () => <div>小满是谁？没听说过</div>`

**语法编写**
* 使用`tsx`绑定变量`{value}`(绑定class需要用className)
```js
function App() {
  const num: number = 333
  const fn = () => 'test'
  return (
    <>
      {'11' /** 字符串用法 */}
      {num /** 变量用法 */}
      {fn() /** 函数用法 */}
      {new Date().getTime() /** 日期用法 */}
    </>
  )
}
//绑定class(className) id 属性等等 都是一样的
function App() {
  const value:string = 'A'
  return (
    <>
      <div data-index={value} className={value} id={value}>{value}</div>
    </>
  )
}
//绑定多个class(className)
function App() {
  const a:string = 'A'
  return (
    <>
      <div className={`${a} class2`}>{value}</div>
    </>
  )
}
//绑定样式style
function App() {
  const styles = { color: 'red' }
  return (
    <>
      <div style={styles}>test</div>
    </>
  )
}
```


* 使用tsx绑定事件`on[Click]{fn}`小驼峰 其他事件也是一样的
```js
function App() {
  const value: string = '小满'
  const clickTap = (params: string) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```


* tsx如何使用泛型
正常写泛型语法会跟tsx语法冲突，他会把泛型理解成是一个元素，解决方案后面加一个,即可
```js
function App() {
  const value: string = '小满'
  const clickTap = <T,>(params: T) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```

* tsx如何渲染html代码片段(`dangerouslySetInnerHTML`)
`dangerouslySetInnerHTML` 的值是一个对象，该对象包含一个名为 `__html` 的属性，且值为你想要插入的 `HTML` 字符串
```js
function App() {
  const value: string = '<section style="color:red">小满</section>'
  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  )
}
```

* tsx如何遍历dom元素
使用map遍历返回html标签即可
```js
function App() {
  const arr: string[] = ["小满","中满","大满"]
  return (
    <>
        {
            arr.map((item) => {
                return <div>{item}</div>
            })
        }
    </>
  )
}
```

* tsx如何编写条件语句

使用三元表达式就可以了
```js
function App() {
  const flag:boolean = true
  return (
    <>
        {
           flag ? <div>真的</div> : <div>假的</div>
        }
    </>
  )
}
```

* tsx注意事项
{}插值语句内不允许编写`switch if` 变量声明 或者直接放入`对象本体`

下面展示错误用法正确用法对比
```js
//错误用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj}
    </>
  )
}
//正确用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj.name}
      {JSON.stringify(obj)}
    </>
  )
}
```

```js
//错误用法
function App() {
  const flag:boolean = true
  return (
    <>
       {
        if(flag){
          <p>1</p>
        }else{
          <p>2</p>
        }
       }
    </>
  )
}
//正确用法
function App() {
  const flag:boolean = true
  return (
    <>
       {
        flag ? <div>1</div> : <div>2</div>
       }
    </>
  )
}
```

### Babel
**什么是Babel?**
`Babel` 是一个 `JavaScript 编译器`,提供了`JavaScript`的编译过程，能够将源代码转换为目标代码。

`AST -> Transform -> Generate`

[官网](https://babeljs.io/)

[查看AST](https://astexplorer.net/)

[Babel所有的包](https://babeljs.io/docs/babel-traverse)

**核心功能**
* 语法转换：将新版本的 `JavaScript` 语法转换为旧版本的语法
* Polyfill：通过引入额外的代码，使新功能在旧浏览器中可用
* JSX: 将JSX语法转换成普通的`JavaScript`语法
* 插件: 为Babel提供自定义功能

**案例**
1. 语法转换：将新版本的 `JavaScript` 语法转换为旧版本的语法
```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
test.js 测试用例
```js
//语法
const a = (params = 2) => 1 + params;
const b = [1, 2, 3]
const c = [...b, 4, 5]
class Babel {

}
new Babel()
//API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x % 2 === 0)
const y = Object.assign({}, { name: 1 })
```
index.js 核心转换代码
```js
//记得设置package.json的type为module
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
const result = Babel.transform(file, {
    presets: [presetEnv]
})
console.log(result.code)
```
编译之后的代码
```js
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var a = function a() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return 1 + params;
};
var b = [1, 2, 3];
var c = [].concat(b, [4, 5]);
var Babel = /*#__PURE__*/_createClass(function Babel() {
  _classCallCheck(this, Babel);
});
new Babel();
```

如何支持新特性例如 `Object.assign` `Array.prototype.find` 等
```sh
npm i core-js -D
```
index.js 增强编译
```js
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
const result = Babel.transform(file, {
    //usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
    //corejs 3 是corejs的版本
    presets: [
        [presetEnv, { useBuiltIns: "usage", corejs: 3 }]
    ]
})
console.log(result.code)
```
转换之后的代码
```js
"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; } 
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
//语法
var a = function a() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return 1 + params;
};
var b = [1, 2, 3];
var c = [].concat(b, [4, 5]);
var Babel = /*#__PURE__*/_createClass(function Babel() {
  _classCallCheck(this, Babel);
});
new Babel();
//API
var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
var y = Object.assign({}, {
  name: 1
});
```

2. `jsx` 代码转换 `react`
测试用例 `test.jsx`
```js
import react from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
    return <div>小满是谁？？？？？</div>
}

createRoot(document.getElementById('root')).render(<App />)
```
编写代码 只需要增加一个预设即可 `@babel/preset-react`
```sh
npm install @babel/preset-react -D
```

```js
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
import react from '@babel/preset-react'
const file = fs.readFileSync('./test.jsx', 'utf8')
const result = Babel.transform(file, {
    presets: [
        [presetEnv, { useBuiltIns: "usage", corejs: 3 }],
        react
    ]
})
console.log(result.code)
```
转换的结果`其实也就是调用了React.createElement去创建元素`
```js
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  return /*#__PURE__*/React.createElement("div", null, "\u5C0F\u6EE1\u662F\u8C01\uFF1F\uFF1F\uFF1F\uFF1F\uFF1F");
};
(0, _client.createRoot)(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null)); 
```

3. 编写`Babel插件`
```js
import Babel from '@babel/core'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
//babel会注入一个types对象里面包含了各种ast节点的方法
const transformFunction = ({ types: t }) => {
    return {
        name: 'babel-transform-function',
        //visitor 是一个对象，它包含了一组方法，这些方法对应于 AST 中的不同节点类型。每当 Babel 遇到某种类型的节点时，都会调用 visitor 中对应的方法。
        visitor: {
            //匹配 箭头函数 当然也可以匹配别的东西 这儿只是案例
            ArrowFunctionExpression(path) {
                const node = path.node
                const arrowFunction = t.functionExpression(
                    null, //node.id 是一个 Identifier 节点，表示函数名
                    node.params, //node.params 是一个数组，表示函数的参数
                    // BlockStatement 是 JavaScript 抽象语法树（AST）中的一种节点类型，表示一个由大括号 {} 包围的语句块。它是函数体、循环体、条件分支（如 if 语句）等代码块的基础结构
                    t.blockStatement([t.returnStatement(node.body)]),  //node.body 是函数的主体，通常是一个 BlockStatement 节点
                    node.async //node.async 是一个布尔值，表示函数是否是异步的 (async 函数)
                )
                path.replaceWith(arrowFunction) //替换当前节点
            }
        }
    }
}
const result = Babel.transform(file, {
    plugins: [
        transformFunction
    ]
})
console.log(result.code)
```
转换之后的结果
```js
//语法
const a = function (params = 2) {
  return 1 + params;
};
const b = [1, 2, 3];
const c = [...b, 4, 5];
class Babel {}
new Babel();
//API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
const y = Object.assign({}, {
  name: 1
});
```

### swc
**什么是swc?**
SWC 既可用于编译，也可用于打包。对于编译，它使用现代 JavaScript 功能获取 JavaScript / TypeScript 文件并输出所有主流浏览器支持的有效代码。
`SWC在单线程上比 Babel 快 20 倍，在四核上快 70 倍。`

简单点来说`swc`实现了和`babel`一样的功能，但是它比`babel`快。

**FAQ为什么快?**

编译型
`Rust` 是一种编译型语言，在编译时将代码转化为机器码（**底层的 CPU 指令**）。这种机器码在执行时非常高效，几乎不需要额外的开销。

解释型
**JavaScript 是一种解释型语言**，通常在浏览器或 **Node.js** 环境中通过解释器运行。尽管现代的 `JavaScript` 引擎（如 V8 引擎）使用了 JIT（即时编译）技术来提高性能，
但解释型语言本质上还是需要更多的运行时开销。

[v8编译原理](https://juejin.cn/post/7291135064843304994#heading-0)
[swc官网](https://swc.rs/)

**核心功能**
1. JavaScript/TypeScript 转换 可以将现代 JavaScript（ES6+）和 TypeScript 代码转换为兼容旧版 JavaScript 环境的代码。这包括语法转换（如箭头函数、解构赋值等）以及一些 polyfill 的处理
2. 模块打包 SWC 提供了基础的打包功能，可以将多个模块捆绑成一个单独的文件
3. SWC 支持代码压缩和优化功能，类似于 Terser。它可以对 JavaScript 代码进行压缩，去除不必要的空白、注释，并对代码进行优化以减小文件大小，提高加载速度
4. SWC 原生支持 TypeScript，可以将 TypeScript 编译为 JavaScript
5. SWC 支持 React 和 JSX 语法，可以将 JSX 转换为标准的 JavaScript 代码。它还支持一些现代的 React 特性

**案例**
1. 语法转换：将新版本的 `JavaScript` 语法转换为旧版本的语法
转换前
```js
//语法
const a = (params = 2) => 1 + params;
const b = [1, 2, 3]
const c = [...b, 4, 5]
class Babel {

}
new Babel()
//API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x % 2 === 0)
const y = Object.assign({}, { name: 1 })
```
swc 转换代码
```js
import swc from '@swc/core'

const result = swc.transformFileSync('./test.js', {
   jsc: {
       target: "es5", //代码转换es5
       parser: {
           syntax: 'ecmascript'
       }
   }
})
console.log(result.code)
```
转换后结果
```js
//语法
function _array_like_to_array(arr, len) {
   if (len == null || len > arr.length) len = arr.length;
   for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
   return arr2;
}
function _array_without_holes(arr) {
   if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
       throw new TypeError("Cannot call a class as a function");
   }
}
function _iterable_to_array(iter) {
   if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
   throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
   return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
   if (!o) return;
   if (typeof o === "string") return _array_like_to_array(o, minLen);
   var n = Object.prototype.toString.call(o).slice(8, -1);
   if (n === "Object" && o.constructor) n = o.constructor.name;
   if (n === "Map" || n === "Set") return Array.from(n);
   if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var a = function() {
   var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
   return 1 + params;
};
var b = [
   1,
   2,
   3
];
var c = _to_consumable_array(b).concat([
   4,
   5
]);
var Babel = function Babel() {
   "use strict";
   _class_call_check(this, Babel);
};
new Babel();
//API
var x = [
   1,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10
].filter(function(x) {
   return x % 2 === 0;
});
var y = Object.assign({}, {
   name: 1
});
```
**`swc转换用时 default: 8.088ms`**
**`Babel转换用时 default: 417.59ms`**

2. swc转换react jsx语法
test.jsx
```jsx
import react from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
    return <div>小满是谁？？？？？</div>
}

createRoot(document.getElementById('root')).render(<App />)
```
转换代码
```js
import swc from '@swc/core'
console.time()
const result = swc.transformFileSync('./test.jsx', {
    jsc: {
        target: "es5", //代码转换es5
        parser: {
            syntax: 'ecmascript',
            jsx: true
        },
        transform:{
            react: {
                runtime: 'automatic'
            }
        }
    }
})
console.log(result.code)
console.timeEnd()
```
结果
```js
import { jsx as _jsx } from "react/jsx-runtime";
import react from 'react';
import { createRoot } from 'react-dom/client';
var App = function() {
    return /*#__PURE__*/ _jsx("div", {
        children: "小满是谁？？？？？"
    });
};
createRoot(document.getElementById('root')).render(/*#__PURE__*/ _jsx(App, {}));
```

**`swc转换用时 default: 4.251ms`**
**`Babel转换用时 default: 80.613ms`**

3.swc简易打包
截止 2024-9-4日 目前该功能鸡肋 不推荐使用 了解即可
目前 swc 打包只能支持 cjs 未来才能支持esm 比较鸡肋 其次就是参数只能 entry output 暂无其他参数

创建配置文件`spack.config.js`
编写以下代码执行 `npx spack` 打包
```js
const { config } = require('@swc/core/spack')
const path = require('path')
module.exports = config({
    entry: {
        web: path.join(__dirname, './test.js') //入口
    },
    output: {
        path: path.join(__dirname, './dist'), //出口
        name: 'test.js'
    }
})
```

### 实现vdom，fiber，diff
**虚拟DOM (Virtual DOM)**
Virtual DOM 就是用 JavaScript 对象去描述一个 DOM结构，虚拟DOM 不是直接操作浏览器的 真实DOM，而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中。
**优点**
* 性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，显著提高了性能。

* 跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，比如浏览器的 DOM 或者移动端(`React Native`)的原生 UI。
![](/images/dom-tree.png)
**实现简易虚拟DOM**
```js
const App = () => {
  return (<div id="2">
      <span>小满zs</span>
  </div>)
}
```
上面这段代码会通过babel或者swc转换成
```js
const App = () => {
  return React.createElement('div', { id: 2 }, 
    React.createElement('span', null, '小满zs')
  );
};
```
接着我们就来实现 `React.createElement`

**React.createElement**
1. 用于生成虚拟 DOM 树，返回一个包含 type（元素类型）和 props（属性和子元素）的对象。
    * `children` 可以是文本或其他虚拟 DOM 对象。
    * `React.createTextElement:`

2. 用于处理文本节点，将字符串封装成虚拟 DOM 对象。
    * `React.render:`

3. 将虚拟 DOM 转化为实际 DOM 元素。
    * 使用递归的方式渲染所有子元素。
    * 最后将生成的 DOM 节点插入到指定的容器中

```js
const React = {
    createElement(type, props = {}, ...children) {
        return {
            type,
            props: {
                ...props,
                children: children.map(child =>
                    typeof child === 'object'
                        ? child // 如果子元素是对象（嵌套元素），返回对象
                        : this.createTextElement(child) // 否则将字符串转换为文本元素
                )
            }
        };
    },

    createTextElement(text) {
        // 文本是没有props children什么的 这样做只是为了结构统一方便遍历
        return {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: []
            }
        };
    }
};
```
**React Fiber**
**Fiber** 是 React 16 引入的一种新的协调引擎，用于解决和优化 React 应对复杂 UI 渲染时的性能问题

**Fiber 的作用**
为了解决React15在大组件更新时产生的卡顿现象，React团队提出了 Fiber 架构，并在 React16 发布，将 同步递归无法中断的更新 重构为 异步的可中断更新

它实现了4个具体目标

1. 可中断的渲染：Fiber 允许将大的渲染任务拆分成多个小的工作单元（Unit of Work），使得 React 可以在空闲时间执行这些小任务。当浏览器需要处理更高优先级的任务时（如用户输入、动画），可以暂停渲染，先处理这些任务，然后再恢复未完成的渲染工作。

2. 优先级调度：在 Fiber 架构下，React 可以根据不同任务的优先级决定何时更新哪些部分。React 会优先更新用户可感知的部分（如动画、用户输入），而低优先级的任务（如数据加载后的界面更新）可以延后执行。

3. 双缓存树（Fiber Tree）：Fiber 架构中有两棵 Fiber 树——current fiber tree（当前正在渲染的 Fiber 树）和 work in progress fiber tree（正在处理的 Fiber 树）。React 使用这两棵树来保存更新前后的状态，从而更高效地进行比较和更新。

4. 任务切片：在浏览器的空闲时间内（利用 requestIdleCallback思想），React 可以将渲染任务拆分成多个小片段，逐步完成 Fiber 树的构建，避免一次性完成所有渲染任务导致的阻塞。

**双缓存**
react内部有两颗树维护着两个状态：一个是`fiber tree`，一个是`work in progress fiber tree`

`fiber tree`:表示当前正在渲染的fiber树
`work in progress fiber tree`:表示更新过程中新生成的fiber树，也就是渲染的下一次UI状态

举个例子:

当我们用 canvas 绘制动画时，每一帧绘制前都会调用 ctx.clearRect 清除上一帧的画面，如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。


**深入理解任务切片**
要先理解切片得先理解浏览器一帧做些什么
* **浏览器一帧做些什么**
1. 处理时间的回调click…事件
2. 处理计时器的回调
3. 开始帧
4. 执行 `requestAnimationFrame` 动画的回调
5. 计算机页面布局计算 合并到主线程
6. 绘制
7. 如果此时还有空闲时间，执行 `requestIdleCallback` 

**例如要更新10000条dom数据**
我们可以分成三个小任务进行更新

并且把每一段任务插入 `requestIdleCallback` 如图
![](/images/task.png)

**diff算法**
比如有A B C D四个节点
那么首先react会把这个节点变成链表结构也就是
```txt
root
  |
child
  ↓
A -> B -> C -> D
```
然后我们更新了节点 A C B E

那么diff算法
1. {A B C D} 他会从map里面去找能够复用的节点也就是 A C B 进行复用
2. 如果{A B C D} 这个结构没有出现E那么说明是新增了创建新的fiber结构
3. 如果{A B C D} 旧节点存在 { A C B E} 新节点没有存在那么说明是删除了
![](/images/diff.png)

**代码实现 vDom Fiber Diff 完整版**
```js
//vdom
const React = {
    createElement(type, props = {}, ...children) {
        return {
            type,
            props: {
                ...props,
                children: children.map(child =>
                    typeof child === 'object'
                        ? child
                        : React.createTextElement(child)
                ),
            },
        };
    },

    createTextElement(text) {
        return {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: [],
            },
        };
    },
};


// const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, '小满zs'));

// console.log(vdom)


//Fiber 是 React 16 引入的一种新的协调引擎
let nextUnitOfWork = null; // 下一个工作单元
let currentRoot = null; // 当前 Fiber 树的根
let wipRoot = null; // 正在工作的 Fiber 树
let deletions = null; // 存储需要删除的 Fiber

// Fiber 渲染入口
function render(element, container) {
    //wipRoot 表示“正在进行的工作根”，它是 Fiber 架构中渲染任务的起点
    wipRoot = {
        dom: container, //渲染目标的 DOM 容器
        props: {
            children: [element], //要渲染的元素（例如 React 元素）
        },
        alternate: currentRoot,
        //alternate 是 React Fiber 树中的一个关键概念，用于双缓冲机制（双缓冲 Fiber Tree）。currentRoot 是之前已经渲染过的 Fiber 树的根，wipRoot 是新一轮更新的根 Fiber 节点。
        //它们通过 alternate 属性相互关联
        //旧的fiber树
    };
    nextUnitOfWork = wipRoot;
    //nextUnitOfWork 是下一个要执行的工作单元（即 Fiber 节点）。在这里，将其设置为 wipRoot，表示渲染工作从根节点开始
    deletions = [];
    //专门用于存放在更新过程中需要删除的节点。在 Fiber 更新机制中，如果某些节点不再需要，就会将它们放入 deletions，
    //最后在 commitRoot 阶段将它们从 DOM 中删除
}

// 创建 Fiber 节点
function createFiber(element, parent) {
    return {
        type: element.type,
        props: element.props,
        parent,
        dom: null, // 关联的 DOM 节点
        child: null, // 子节点
        sibling: null, // 兄弟节点
        alternate: null, // 对应的前一次 Fiber 节点
        effectTag: null, // 'PLACEMENT', 'UPDATE', 'DELETION'
    };
}


// 创建 DOM 节点
function createDom(fiber) {
    const dom =
        fiber.type === 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);
    return dom;
}

// 更新 DOM 节点属性
function updateDom(dom, prevProps, nextProps) {
    // 移除旧属性
    Object.keys(prevProps)
        .filter(name => name !== 'children')
        .forEach(name => {
            dom[name] = '';
        });

    // 添加新属性
    Object.keys(nextProps)
        .filter(name => name !== 'children')
        .filter(name => prevProps[name] !== nextProps[name])
        .forEach(name => {
            dom[name] = nextProps[name];
        });
}

// Fiber 调度器
// 实现将耗时任务拆分成多个小的工作单元
function workLoop(deadline) {
    //deadline 表示浏览器空闲时间
    let shouldYield = false;
    //是一个标志，用来指示是否需要让出控制权给浏览器。如果时间快用完了，则设为 true，以便及时暂停任务，避免阻塞主线程

    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        //performUnitOfWork 是一个函数，它处理当前的工作单元，并返回下一个要执行的工作单元。每次循环会更新 nextUnitOfWork 为下一个工作单元
        shouldYield = deadline.timeRemaining() < 1;
        //使用 deadline.timeRemaining() 来检查剩余的空闲时间。如果时间少于 1 毫秒，就设置 shouldYield 为 true，表示没有空闲时间了，就让出控制权
    }

    if (!nextUnitOfWork && wipRoot) {
        //当没有下一个工作单元时（nextUnitOfWork 为 null），并且有一个待提交的“工作根”（wipRoot），就会调用 commitRoot() 将最终的结果应用到 DOM 中
        commitRoot();
    }

    requestIdleCallback(workLoop);
    //使用 requestIdleCallback 来安排下一个空闲时间段继续执行 workLoop，让任务在浏览器空闲时继续进行
}
//requestIdleCallback 浏览器绘制一帧16ms 空闲的时间去执行的函数 浏览器自动执行 
//浏览器一帧做些什么
//1.处理时间的回调click...事件
//2.处理计时器的回调
//3.开始帧
//4.执行requestAnimationFrame 动画的回调
//5.计算机页面布局计算 合并到主线程
//6.绘制
//7.如果此时还有空闲时间，执行requestIdleCallback
requestIdleCallback(workLoop);

// 执行一个工作单元
function performUnitOfWork(fiber) {
    // 如果没有 DOM 节点，为当前 Fiber 创建 DOM 节点
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    //确保每个 Fiber 节点都在内存中有一个对应的 DOM 节点准备好，以便后续在提交阶段更新到实际的 DOM 树中

    // 创建子节点的 Fiber
    // const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, '小满zs'));
    // 子节点在children中
    const elements = fiber.props.children;
    reconcileChildren(fiber, elements);

    // 返回下一个工作单元（child, sibling, or parent）
    if (fiber.child) {
        return fiber.child;
    }

    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
    return null;
}

// Diff 算法: 将子节点与之前的 Fiber 树进行比较
function reconcileChildren(wipFiber, elements) {
    let index = 0;//
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child; // 旧的 Fiber 树
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        // 比较旧 Fiber 和新元素
        const sameType = oldFiber && element && element.type === oldFiber.type

        //如果是同类型的节点，复用
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            };

        }

        //如果新节点存在，但类型不同，新增fiber节点
        if (element && !sameType) {
            newFiber = createFiber(element, wipFiber);
            newFiber.effectTag = 'PLACEMENT';
        }

        //如果旧节点存在，但新节点不存在，删除旧节点
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        //移动旧fiber指针到下一个兄弟节点
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        // 将新fiber节点插入到DOM树中
        if (index === 0) {
            //将第一个子节点设置为父节点的子节点
            wipFiber.child = newFiber;
        } else if (element) {
            //将后续子节点作为前一个兄弟节点的兄弟
            prevSibling.sibling = newFiber;
        }

        //更新兄弟节点
        prevSibling = newFiber;
        index++;
    }
}

// 提交更新到 DOM
function commitRoot() {
    deletions.forEach(commitWork); // 删除需要删除的 Fiber 节点
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

// 提交单个 Fiber 节点
function commitWork(fiber) {
    if (!fiber) {
        return;
    }

    const domParent = fiber.parent.dom;

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        domParent.removeChild(fiber.dom);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

//测试

// render(React.createElement('h1', null, 'hello world'), document.getElementById('root'));

// 测试用例diff

render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 11')), document.getElementById('root'));

render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 22')), document.getElementById('root'));
```

### 调度器
**requestidlecallback**
它提供了一种机制，允许开发者在浏览器空闲时运行低优先级的任务，而不会影响关键任务和动画的性能。

**requestidlecallback 执行阶段**
1. 处理事件的回调click…事件
2. 处理计时器的回调
3. 开始帧
4. 执行 `requestAnimationFrame` 动画的回调
5. 计算机页面布局计算 合并到主线程
6. 绘制
7. 如果此时还有空闲时间，执行 `requestIdleCallback`

**requestidlecallback 基本用法**
requestidlecallback 接受一个回调函数 `callback` 并且在回调函数中会注入参数 `deadline`

deadline有两个值:

* `deadline.timeRemaining()` 返回是否还有空闲时间(毫秒)
* `deadline.didTimeout` 返回是否因为超时被强制执行(布尔值)

options:

* `{ timeout: 1000 }` 指定回调的最大等待时间（以毫秒为单位）。如果在指定的 timeout 时间内没有空闲时间，回调会强制执行，避免任务无限期推迟
这个案例模拟了在浏览器空闲时，渲染`1000条dom`元素，非常流畅
```js
const total = 1000; // 定义需要生成的函数数量，即1000个任务
const arr = [];    // 存储任务函数的数组

// 生成1000个函数并将其添加到数组中
function generateArr() {
    for (let i = 0; i < total; i++) {
        // 每个函数的作用是将一个 <div> 元素插入到页面的 body 中
        arr.push(function() {
            document.body.innerHTML += `<div>${i + 1}</div>`; // 将当前索引 + 1 作为内容
        });
    }
}
generateArr(); // 调用函数生成任务数组

// 用于调度和执行任务的函数
function workLoop(deadline) {
    // 检查当前空闲时间是否大于1毫秒，并且任务数组中还有任务未执行
    if (deadline.timeRemaining() > 1 && arr.length > 0) {
        const fn = arr.shift(); // 从任务数组中取出第一个函数
        fn(); // 执行该函数，即插入对应的 <div> 元素到页面中
    }
    // 再次使用 requestIdleCallback 调度下一个空闲时间执行任务
    requestIdleCallback(workLoop);
}

// 开始调度任务，在浏览器空闲时执行 workLoop
requestIdleCallback(workLoop,{ timeout: 1000});
```

**面试官可能会问的问题**
**为什么React不用原生requestIdleCallback实现呢？**
1.`兼容性差` `Safari` 并不支持(如下附图)

2. `控制精细度` React 要根据组件优先级、更新的紧急程度等信息，更精确地安排渲染的工作

3. `执行时机`requestIdleCallback(callback) 回调函数的执行间隔是 50ms（W3C规定），也就是 20FPS，1秒内执行20次，间隔较长。

4. `差异性` 每个浏览器实现该API的方式不同，导致执行时机有差异有的快有的慢

![](https://caniuse.com/?search=requestIdleCallback)

**requestIdleCallback替代方案是什么?**
**`MessageChannel`**

选择 `MessageChannel` 的原因，是首先异步得是个宏任务，因为宏任务中会在下次事件循环中执行，不会阻塞当前页面的更新。`MessageChannel` 是一个宏任务。

没选常见的 `setTimeout`，是因为 `MessageChannel` 能较快执行，在 0～1ms 内触发，像 setTimeout 即便设置 timeout 为 0 还是需要 4～5ms。相同时间下，MessageChannel 能够完成更多的任务。

**嵌套超时**
正如 `HTML` 标准中规定的那样，**一旦对 setTimeout 的嵌套调用被安排了 5 次，浏览器将强制执行 4 毫秒的最小超时**。

这可以在下面的例子中看到，在这个例子中，我们嵌套了对 setTimeout 的调用，延迟为 0 毫秒，并记录每次调用处理程序时的延迟。前四次，延迟约为 0 毫秒，之后约为 4 毫秒：

**MessageChannel基本用法**
MessageChanne设计初衷是为了方便 我们在不同的上下文之间进行通讯，例如web Worker,iframe
它提供了两个端口（port1 和 port2），通过这些端口，消息可以在两个独立的线程之间双向传递


**实现react简易版调度器**
React调度器给每一个任务分配了优先级

1. `ImmediatePriority` : 立即执行的优先级，级别最高
2. `UserBlockingPriority` : 用户阻塞级别的优先级
3. `NormalPriority` : 正常的优先级
4. `LowPriority` : 低优先级
5. `IdlePriority` : 最低阶的优先级
同时还给每个任务设置了过期时间，过期时间越短，优先级越高

声明 `taskQueue` 为数组，存储每个任务的信息，包括优先级，过期时间，回调函数

声明 `isPerformingWork` 为布尔值，表示当前是否在执行任务

声明 `port` 为 `MessageChannel` ，用于发送和接收消息

然后将任务添加到队列里面，并且添加进去的时候还需要根据优先级进行排序，然后调用 `workLoop` 执行任务
```js

const ImmediatePriority = 1; // 立即执行的优先级, 级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2; // 用户阻塞级别的优先级, [滚动，拖拽这些]
const NormalPriority = 3; // 正常的优先级 [redner 列表 动画 网络请求]
const LowPriority = 4; // 低优先级  [分析统计]
const IdlePriority = 5;// 最低阶的优先级, 可以被闲置的那种 [console.log]

// 获取当前时间
function getCurrentTime() {
    return performance.now();
}

class SimpleScheduler {
    constructor() {
        this.taskQueue = []; // 任务队列
        this.isPerformingWork = false; // 当前是否在执行任务

        // 使用 MessageChannel 处理任务调度
        const channel = new MessageChannel();
        this.port = channel.port2;
        channel.port1.onmessage = this.performWorkUntilDeadline.bind(this);
    }

    // 调度任务
    scheduleCallback(priorityLevel, callback) {
        const curTime = getCurrentTime();
        let timeout;
        // 根据优先级设置超时时间
        switch (priorityLevel) {
            case ImmediatePriority:
                timeout = -1;
                break;
            case UserBlockingPriority:
                timeout = 250;
                break;
            case LowPriority:
                timeout = 10000;
                break;
            case IdlePriority:
                timeout = 1073741823;
                break;
            case NormalPriority:
            default:
                timeout = 5000;
                break;
        }

        const task = {
            callback,
            priorityLevel,
            expirationTime: curTime + timeout // 直接根据当前时间加上超时时间
        };

        this.push(this.taskQueue, task); // 将任务加入队列
        this.schedulePerformWorkUntilDeadline();
    }

    // 通过 MessageChannel 调度执行任务
    schedulePerformWorkUntilDeadline() {
        if (!this.isPerformingWork) {
            this.isPerformingWork = true;
            this.port.postMessage(null); // 触发 MessageChannel 调度
        }
    }

    // 执行任务
    performWorkUntilDeadline() {
        this.isPerformingWork = true;
        this.workLoop();
        this.isPerformingWork = false;
    }

    // 任务循环
    workLoop() {
        let curTask = this.peek(this.taskQueue);
        while (curTask) {
            const callback = curTask.callback;
            if (typeof callback === 'function') {
                callback(); // 执行任务
            }
            this.pop(this.taskQueue); // 移除已完成任务
            curTask = this.peek(this.taskQueue); // 获取下一个任务
        }
    }

    // 获取队列中的任务
    peek(queue) {
        return queue[0] || null;
    }

    // 向队列中添加任务
    push(queue, task) {
        queue.push(task);
        queue.sort((a, b) => a.expirationTime - b.expirationTime); // 根据优先级排序，优先级高的在前 从小到大
    }

    // 从队列中移除任务
    pop(queue) {
        return queue.shift();
    }
}

// 测试
const scheduler = new SimpleScheduler();

scheduler.scheduleCallback(LowPriority, () => {
    console.log('Task 1: Low Priority');
});

scheduler.scheduleCallback(ImmediatePriority, () => {
    console.log('Task 2: Immediate Priority');
});

scheduler.scheduleCallback(IdlePriority, () => {
    console.log('Task 3: Idle Priority');
});

scheduler.scheduleCallback(UserBlockingPriority, () => {
    console.log('Task 4: User Blocking Priority');
});

scheduler.scheduleCallback(NormalPriority, () => {
    console.log('Task 5: Normal Priority');
});
```

### 初识组件














































































































































