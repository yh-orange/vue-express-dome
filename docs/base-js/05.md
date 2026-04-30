# ES6 到 ES12 特性总结

## ES6
***

`ES6(es2015)`是一次比较重大的革新，比起过去的版本，改动比较大，仅对常用 `API` 及语法糖进行讲解

1. let 和 const

在`ES6`之前，`js`只有`var`一种声明方式,要实现`块级作用域`,常规操作是用`闭包`来防止变量泄露。但是在`ES6`之后，多了`let`和`const`两种方式。用`var`声明的变量没有块级作用域，而`let`和`const`都是块级作用域，这三个关键字的区别主要如下:

```js
{
  var a = 10;
  let b = 20;
  const c = 30;
}

a; // 10
b; // UncaughtReferenceError: b is not defined
c; // UncaughtReferenceError: c is not defined

let d = 40;
const e = 50;
d = 60;
d; // 60
e = 70; // Uncaught TypeError: Assignment to constant variable
```

|功能说明|var|let|const|
| - | - | - | - |
|变量提升       |   ✅   |	❌	| ❌ |
|全局变量       |   ✅   |	❌	| ❌ |
|重复声明       |   ✅   |	❌	| ❌ |
|重新赋值       |   ✅   |	✅	| ❌ |
|暂时性死区     |	❌   | 	✅	| ✅ |
|块级作用域     |	❌   |	✅	| ✅ |
|只声明不初始化 |	✅	 |  ✅	|❌  |

**引申: `let` 编译成 `ES5` 之后是如何保持块级作用域的?**

首先是常用的 ES6 写法:

```js
const result = [];
(function() {
  for (let i = 0; i < 5; i++) {
    result.push(function() {
      console.log(i);
    });
  }
})();
result.forEach(function(item) {
  item();
}); // => 0,1,2,3,4
```
经过`babel`转义后,这里提供一个[在线转化地址](https://es6console.com/)

```js
"use strict";

var result = [];
(function() {
  var _loop = function _loop(i) {
    result.push(function() {
      console.log(i);
    });
  };

  for (var i = 0; i < 5; i++) {
    _loop(i);
  }
})();
result.forEach(function(item) {
  item();
});
```

从上面的代码我们就可以看出，`let` 创建作用域的方式，其实就是`创建了一个函数`，`在函数内定义一个同名变量并于外部将这个变量传入其中`，以此达到创建作用域的目的。

**引申: let 变量无法声明提升是如何实现的?**

首先是一段熟悉的 ES6 代码:

```js
console.log(a); // undefined
var a = 1;

console.log(b); // VM233:4 Uncaught ReferenceError: b is not defined
let b = 2;
```

经过 `babel` 编译后的代码:

```js
"use strict";

console.log(a); // undefined
var a = 1;

console.log(b); // undefined
var b = 2;
```

按照 `babel` 编译后理论上 `b` 的输出值应该和 `a` 一样是一个 `undefined`,但是实际上它并不会编译通过,这个逻辑不是由 `babel` 来控制的,目前看来是浏览器内部 `JS` 执行引擎支持和实现的。

**引申: 上述说到的暂时性死区是个什么东西?**

>只要块级作用域内存在`let / const`命令，它所声明的`变量 / 常量`就“绑定”（`binding`）这个区域，不再受外部的影响。`ES6` 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域，凡是`在声明之前就使用这些变量`，就会报错。这种特性也被成为`暂时性死区`。

```js
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError: tmp is not defined
  let tmp;
}
```

再来看看`babel`编译后的代码:

```js
"use strict";

var tmp = 123;

if (true) {
  _tmp = "abc";
  var _tmp = undefined;
}
```

同样，这个特性也是被浏览器内部的 `JS` 执行引擎支持和实现的，`babel` 无法支持这种特性的编译，只能简单的将 `let` 编译成 `var`。

但是有意思的是，由于 `let` 在 `if` 块中是可以构建自己的独立作用域的，`babel` 将 `tmp` 这个变量换了个名字来模拟实现块级作用域的创建。

2. 类(`Class`)

在 `ES6` 之前构造类的方式都是与原型链相关的，在 `ES6` 出现了 `class` 关键字用来构造一个类。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  information() {
    return `my name is ${this.name}, I am ${this.age} years old`;
  }
}
```

3. 箭头函数

`es6` 之前的函数中`this`的指向都是跟函数运行时的执行环境有关的，使用箭头函数的时候 `this` 指向跟函数定义时的执行环境有关(`this是继承自父执行上下文`)。并且箭头函数语法更简洁，没有自己的 `this`，`arguments`，`super等`。

```js
// es5
var list = [1, 2, 3, 4, 5, 6, 7];
var newList = list.map(function(item) {
  return item * item;
});
// es6
const list = [1, 2, 3, 4, 5, 6, 7];
const newList = list.map((item) => item * item);

// es5 function
var a = 11;
var obj = {
  a: 22,
  say: function() {
    console.log(this.a);
  },
};
obj.say(); // 22 this指向运行时的obj对象

// 箭头函数
var a = 11;
var obj = {
  a: 22,
  say: () => {
    console.log(this.a);
  },
};
obj.say(); // 11 箭头函数的this指向obj所在的环境
```
```js
var a = 11;
function test1() {
  this.a = 22;
  let b = function() {
    console.log(this.a);
  };
  b();
}
var x = new test1(); // 11

var a = 11;
function test2() {
  this.a = 22;
  let b = () => {
    console.log(this.a);
  };
  b();
}
var x = new test2(); // 22
```

:::tip TIP
       
简单来说就是,`箭头函数`的 `this` 指向定义时的上下文环境(继承自父执行上下文),`普通函数`的 `this` 指向运行的上下文环境。
:::

另外,箭头函数是不可以当构造函数的,也就是不能通过 `new` 操作符进行操作,否则会报错。

因为箭头函数本身没有自己的 `this`,也没有`arguments`对象,因此`call()`、`apply()`、`bind()`这些方法去改变 `this` 指向堆兼有函数也是无效的。

4. 函数默认参数

在 es6 之前，如果我们需要定义函数的初始参数，需要这么写:

```js
// es5
function config(data) {
  data = data || "data is empty";
  // 如果参数的布尔值为fasle的时候就有问题  config(0)
}
// es6
const config = (data = "data is empty") => {};
```

5. 模板字符串

在 `ES6` 之前，拼接字符串的话都需要`+`号

```js
var name = "kirs";
var age = 24;
var info = "my name is" + name + ", I am " + age + " years old";

// es6
const name = "kirs";
const age = 24;
const info = `my name is ${name}, I am ${age} years old`;
```

6. 解构赋值

我们通过解构赋值，可以将属性/值从对象/数组中取出，赋值给其他变量

1. **数组解构**
```js
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [bar, foo] = [1];
// 如果解构不成功，变量值等于undefined，上面例子中 foo 就等于undefined。


let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
//解构赋值允许指定默认值。

let [foo = true] = [];
foo // true
//在使用默认值的时候，应该注意undefined，因为undefined是不能赋值的。
let [x = 1] = [undefined];
x // 1
 
let [x = 1] = [null];
x // null
function f() {
  console.log('aaa');
}
 
let [x = f()] = [1];

```

2. **对象解构**
对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
 
let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

上面第一个例子中，bar 取到的值是bbb，并不没有取“第一个”foo，因为这里是不存在所谓的第一个的，第二个例子中就是因为找对象中找不到baz，所以baz的值等于undefined。这其实就算是解构失败了。

通过解构，我们可以很容易的把对象的方法复制给变量，

```js
const { log } = console;
log('hello') // hello
//如果我们想要使用自己自定义的方法名，不想用log怎么办呢？
const { log:minelog } = console;
minelog ('hello') // hello
```

想要变量名和属性名不一样，一定要用:这种方式。a:b的这种形式中，a必须是对应中的属性名，b就是自己定义的了，只要合法，写成a:a的形式也是可以的。前面一个是匹配的模式，冒号后的才是被赋值的变量。

对象的解构赋值同样是可以层层解构的，
```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
 
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

**当我们使用解构赋值的时候，要注意声明变量的作用域问题**

```js
// 错误的写法
let x;
{x} = {x: 1};
 
// 正确的写法
let x;
({x} = {x: 1});
```

数组中是一个特殊的对象，所以

```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

3. **字符串解构**

字符串本身也是一个对象，有时候，可以当成一个数组解构

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

有时候，当做一个对象解构
个人理解，解构都可以当做一个对象处理，只要解构的对象有某些属性或者方法就可以使用。

```js
let {length : len} = 'hello';
len // 5
```

在使用解构赋值中，我们要注意圆括号()的使用，建议有可能的话尽量避免在模式中使用圆括号。

7. **模块化**
优点：
* 代码封装，避免全局污染
* 具有唯一标识
* 暴露部分数据或者api方法供外部使用
* 模块使用方便快捷

***
**常见的模块化规范**
* `CommonJS`
* `AMD`
* `CMD`
* `ES6的Modules`

### **`ES6` 模块化**
`ES6` 模块化规范是浏览器端与服务器端通用的模块化开发规范。它的出现极大的降低了前端开发者的模块化学习成本，开发者不需再额外学习 `AMD`、`CMD` 或 `CommonJS` 等模块化规范。
`ES6` 模块化规范中定义：

* 每个 js 文件都是一个独立的模块
* 导入其它模块成员使用 `import` 关键字
* 向外共享模块成员使用 `export` 关键字


**在 node.js 中体验 ES6 模块化**
node.js 中默认仅支持 CommonJS 模块化规范，若想基于 node.js 体验与学习 ES6 的模块化语法，可以按照如下两个步骤进行配置：

1. 确保安装了 `v14.15.1` 或更高版本的 `node.js`
2. 在 `package.json` 的根节点中添加 `"type": "module"` 节点
3. `webpack` 中配置 `Babel`

**ES6 模块化的基本语法**
ES6 的模块化主要包含如下3种用法：

1. **默认导出与默认导入**
* 默认导出
默认导出的语法： `export default` 默认导出的成员

```js
let n1 = 10
let n2 = 20  //外界访问不到n2
function show() {}

export default { //向外共享n1和show两个成员
  n1,
  show
}
```

* 默认导入
默认导入的语法： `import` `接收名称` `from` `模块标识符`

```js
import m1 from './01.默认导出.js'

//打印输出的结果为：
//{ n1 : 10, show : [Function: show]}
console.log(m1)
```

* 默认导出的注意事项
每个模块中，只允许使用唯一的一次 `export default`，否则会报错
* 默认导入的注意事项
默认导入时的接收名称可以任意名称，只要是合法的成员名称即可(不能以数字开头)

2. **按需导出与按需导入**

* **按需导出**
按需导出的语法： `export` 按需导出的成员

```js
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say() {}

export default {
  a: 20
}
```

* **按需导入**
按需导入的语法： `import { s1 } from '模块标识符'`

```js
import info, { s1, s2 as str2, say } from './03.按需导出.js'

console.log(s1) //aaa
console.log(str2) //ccc
console.log(say) //[Function: say]

console.log(info) //{ a: 20 }
```

* 按需导出与按需导入的注意事项

① 每个模块中可以使用多次按需导出

② 按需导入的成员名称必须和按需导出的名称保持一致

③ 按需导入时，可以使用 `as` 关键字进行重命名

④ 按需导入可以和默认导入一起使用

3. 直接导入并执行模块中的代码

如果只想单纯地执行某个模块中的代码，并不需要得到模块中向外共享的成员。此时，可以直接导入并执行模块代码，示例代码如下：

```js
//在当前模块05.直接运行模块中的代码.js中执行一个for循环操作
for (let i = 0; i < 3; i++) {
  console.log(i)
}

// ---------------------分割线------------------------

//直接导入并执行模块代码，不需要得到模块向外共享的成员
import './05.直接运行模块中的代码.js'
//输出 0 1 2
```

8. **扩展操作符(`Spread operator`)**

```js
//在当前模块05.直接运行模块中的代码.js中执行一个for循环操作
for (let i = 0; i < 3; i++) {
  console.log(i)
}

// ---------------------分割线------------------------

//直接导入并执行模块代码，不需要得到模块向外共享的成员
import './05.直接运行模块中的代码.js'
//输出 0 1 2
```

### **CommonJS**

**概述**
一个文件代表一个模块，有自己的`作用域`。模块中定义的`变量`、`函数`、`类`，都是私有的，通过`暴露变量`和`api`方法给外部使用。

`Node` 采用了`CommonJS`模块规范，但并非完全按照`CommonJS`规范实现，而是对模块规范进行了一定的取舍，同时也增加了少许自身需要的特性。

**`CommonJS`特点**

* 所有代码都运行在模块作用域，不会污染全局作用域。

* 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

* 模块加载的顺序，按照其在代码中出现的顺序。

* 运行时同步加载

**CommonJS基本用法**
* 模块定义和导出
`moduleA` 模块中将 `increase` 和 `getValue` 方法挂载到 上下文的 `module.exports` 对象上
```js
// moduleA.js
let count = 0;

module.exports.increase = () => {
  count++;
};

module.exports.getValue = () => {
  return count;
}
```
* 模块引入
`require`命令用于加载模块文件，如果没有发现指定模块，会报错。

可以在一个文件中引入模块并导出另一个模块。
`moduleB` 模块中 `require` 了 `moduleA`，并 `return` 挂载了 `increase` 和 `getValue` 方法的`module.exports`对象；这个对象经过结构赋值，最终被 `moduleB` 中的 `increase` 和 `getValue` 变量接收。
```js
// moduleB.js

// 如果参数字符串以“./”或者“../”开头，则表示加载的是一个相对路径的文件
const { getValue, increase } = require('./moduleA');

increase();
let count = getValue();
console.log(count);

module.exports.add = (val) => {
  return val + count;
}
```

* 模块标识
模块标识就是`require`(`moduleName`)函数的参数 `moduleName`，参数需符合规范：

1. 必须是字符串
2. 如果是第三方模块，则`moduleName`为模块名
3. 如果是自定义模块，`moduleName` 为模块文件路径; 可以是相对路径或者绝对路径
4. 可以省略后缀名

`CommonJS` 模块规范的意义在于将变量和方法等限制在私有的作用域中，每个模块具有独立的空间，它们互不干扰，同时支持导入和导出来衔接上下游模块。

`CommonJS`模块的加载机制
一个模块除了自己的函数作用域之外，最外层还有一个模块作用域，`module`代表这个模块，是一个对象，`exports`是`module`的属性，是对外暴露的接口。

`require`也在这个模块的上下文中，用来引入外部模块，其实就是加载其他模块的`module.exports`属性。

接下来分析下`CommonJS`模块的大致加载流程

```js
function loadModule(filename, module, require, __filename, __dirname) {
  const wrappedSrc = `(function (module, exports, require, __filename, __dirname) { 
    ${fs.readFileSync(filename, "utf8")} // 使用的是fs.readFileSync，同步读取
    })(module, module.exports, require, __filename, __dirname)`;
  eval(wrappedSrc);
}

```

这里只是为了概述加载的流程，很多边界及安全问题都不予考虑，如：

这里我们只是简单的使用 `eval`来我们的`JS`代码，实际上这种方式会有很多安全问题，所以真实代码中应该使用 `vm`来实现。

源代码中还有额外两个参数： `__filename` 和 `__dirname`，这就是为什么我们在写代码的时候可以直接使用这两个变量的原因。

**`require`实现**

```js
function require(moduleName) {
  // 通过require.resolve解析补全模块路径，得到一个绝对路径字符串
  const id = require.resolve(moduleName);
  // 先查询下该id路径是否已经缓存到require.cache中，如果已经缓存过了，则直接读缓存
  if (require.cache[id]) {
    return require.cache[id].exports;
  }
  // module 元数据
  const module = {
    exports: {},
    id,
  };
  // 新加载模块后，将模块路径添加到缓存中，方便后续通过id路径直接读缓存
  require.cache[id] = module;
  // 加载模块
  // loadModule(id, module, require);
  // 直接将上面loadModule方法整合进来
  (function (filename, module, require) {
    (function (module, exports, require) {
      fs.readFileSync(filename, "utf8");
    })(module, module.exports, require);
  })(id, module, require);

  // 返回 module.exports 
  return module.exports;
}

require.cache = {};
require.resolve = (moduleName) => {
  /* 解析补全模块路径，得到一个绝对路径字符串 */
  return '绝对路径字符串';
};
```

上面的模块加载时，将`module.exports`对象传入内部自执行函数中，模块内部将数据或者方法挂载到`module.exports`对象上，最后返回这个`module.exports`对象。

**`require.resolve`加载策略**

作用就是把传递进来的路径进行补全得到一个绝对路径的字符串。

```js
function require(moduleName) {
  ......
  // 返回 module.exports 
  return module.exports;
}
require.resolve = (moduleName) => {
  /* 解析补全模块路径，得到一个绝对路径字符串 */
  return '绝对路径字符串';
};
```

在实际项目中，我们经常使用的方式有：

* 导入自己写的模块文件
* 导入`nodejs`提供的核心模块
* 导入`node_modules`里的包模块
* 我们可以简单地概括下加载策略：

首先判断是否为核心模块，在`nodejs`自身提供的模块列表中进行查找，如果是就直接返回
判断参数 `moduleName` 是否以./或者…/开头，如果是就统一转换成绝对路径进行加载后返回
如果前两步都没找到，就当做是包模块，去最近的`node_moudles`目录中查找
由于`moduleName`是可以省略后缀名的，所以应该遵循一个后缀名判断规则，不同后缀名判断的优先级顺序如下：

如果`moduleName`是带有后缀名的文件，则直接返回；
如果`moduleName`是不带后缀名的路径，则按照一下顺序加载

```markdown
1. moduleName.js
2. moduleName.json
3. moduleName.node
4. moduleName/index.js
5. moduleName/index.json
6. moduleName/index.node
```
如果是加载的是包模块的话，就会按照包模块中`package.json`文件的`main`字段属性的值来加载

`Nodejs`的模块化实现
`Nodejs`模块在实现中并非完全按照`CommonJS`来，进行了取舍，增加了一些自身的的特性。

`Nodejs`中一个文件是一个模块: `module`, 一个模块就是一个 `Module` 的实例

`Nodejs` 中 `Module` 构造函数：

```js
function Module(id, parent){
  this.id = id;
  this.exports = {};
  this.parent = parent;
  if(parent && parent.children) {
    parent.children.push(this);
  }
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

//实例化一个模块
var module = new Module(filename, parent);
```
其中`id`是`模块id`，`exports` 是这个模块要暴露出来的`api`接口，`parent` 是`父级模块`，`loaded` 表示这个模块是否加载完成。
***
**`ES6` 模块与 `CommonJS` 模块的差异**

1. `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。

2. `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的引用。

`CommonJS` 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 `ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

`ES6` 模块的运行机制与 `CommonJS` 不一样。`JS` 引擎对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，`ES6` 的 `import` 有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

3. **AMD**
### **AMD**
`AMD(Asynchronous Module Definition)`，异步模块定义：主要用于浏览器，由于该规范不是原生`js`支持的，使用 `AMD` 规范进行开发的时候需要引入第三方的库函数，也就是流行的`RequireJS` `RequireJS`是`AMD`规范的一种实现。其实也可以说`AMD`是`RequireJS`在推广过程中对模块定义的规范化产出。

`AMD`是一个异步模块加载规范，它与`CommonJS`的主要区别就是异步加载，允许指定回调函数。模块加载过程中即使`require`的模块还没有获取到，也不会影响后面代码的执行。

由于`Node.js`主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以`CommonJS`规范会比较适用。但是，浏览器环境，要从服务器端下载模块文件，这时就必须采用异步加载，因此浏览器端一般采用`AMD`规范。此外`AMD`规范比`CommonJS`规范在浏览器端实现要早。

**`AMD`规范基本语法**
`RequireJS`定义了一个 `define` 函数，用来定义模块
```js
define([id], [dependencies], factory)
```
**参数：**

* `id`：可选，字符串类型，定义模块标识，如果没有提供参数，默认为文件名
* `dependencies`：可选，字符串数组，即当前模块所依赖的其他模块，`AMD` 推崇依赖前置
* `factory`：必需，工厂方法，初始化模块需要执行的函数或对象。如果为函数，它只被执行一次。如果是对象，此对象会作为模块的输出值块定义和导出

```js
// 定义没有依赖的独立模块
// module1.js
define({
  increase: function() {},
  getValue: function() {},
});  

// 或者
define(function(){
  return {
    increase: function() {},
    getValue: function() {},
  }
});  
// 定义有依赖的模块
// module2.js
define(['jQuery', 'tool'], function($, tool){
  return {
    clone: $.extend,
    getType: function() {
      return tool.getType();
    }
  }
});
// 定义具名模块
define('module1', ['jQuery', 'tool'], function($, tool){
  return {
    clone: $.extend,
    getType: function() {
      return tool.getType();
    }
  }
});
// 引入使用模块
require(['module1', 'module2'], function(m1, m2){
  m1.getValue();
  m2.getType();
})
```
`require()`函数加载依赖模块是异步加载，这样浏览器就不会失去响应

**`AMD` 规范和 `CommonJS` 规范对比**
* `CommonJS` 一般用于服务端，`AMD` 一般用于浏览器客户端
* `CommonJS` 和 `AMD` 都是运行时加载

 **什么是运行时加载？**
`CommonJS` 和 `AMD` 模块都只能在运行时确定模块之间的依赖关系
`require` 一个模块的时候，模块会先被执行，并返回一个对象，并且这个对象是整体加载的
小结：`AMD` 模块定义的方法能够清晰地显示依赖关系，不会污染全局环境。`AMD` 模式可以用于浏览器环境，允许异步加载模块，也可以根据需要动态加载模块。

### **CMD**

`CMD(Common Module Definition)`，通用模块定义，它解决的问题和`AMD`规范是一样的，只不过在模块定义方式和模块加载时机上不同，`CMD`也需要额外的引入第三方的库文件，`SeaJS CMD `是 `SeaJS` 在推广过程中对模块定义的规范化产出。

`CMD`规范基本语法
`define` 是一个全局函数，用来定义模块
```js
define([id], [dependencies], factory)
```
参数：

* `id`：可选，字符串类型，定义模块标识，如果没有提供参数，默认为文件名
* `dependencies`：可选，字符串数组，即当前模块所依赖的其他模块，`CMD` 推崇依赖就近
* `factory`：必需，工厂方法，初始化模块需要执行的函数或对象。如果为函数，它只被执行一次。如果是对象，此对象会作为模块的输出值
模块定义和导出

除了给 `exports` 对象增加成员，还可以使用 `return` 直接向外提供接口

```js
// 定义没有依赖的模块
define(function(require, exports, module) {
  module.exports = {
    count: 1,
    increase: function() {},
    getValue: function() {}
  };
})

// 或者
define(function(require, exports, module) {
  return {
    count: 1,
    increase: function() {},
    getValue: function() {}
  };
})
// 定义有依赖的模块
define(function(require, exports, module){
  // 引入依赖模块(同步)
  const module1 = require('./module1');

  // 引入依赖模块(异步)
  require.async('./tool', function (tool) {
    tool.getType();
  })

  // 暴露模块
  module.exports = {
    value: 1
  };
})
// 引入使用模块
define(function (require) {
  var m1 = require('./module1');
  var m2 = require('./module2');

  m1.getValue();
  m2.getType();
})
```

**总结**
`CommonJS` 规范主要用于服务端编程，加载模块是同步的；在浏览器环境中，同步加载会导致阻塞，所以不适合这个规范，因此有了 `AMD` 和 `CMD` 规范。

`AMD` 规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，`AMD` 规范开发成本高，代码的阅读和书写比较困难。

`CMD` 规范与 `AMD` 规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在 `Node.js` 中运行。

`ES6` 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 `CommonJS` 和 `AMD` 规范，成为浏览器和服务器通用的模块解决方案。

## 扩展操作符(Spread operator)
