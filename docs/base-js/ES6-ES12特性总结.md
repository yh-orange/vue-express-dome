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























