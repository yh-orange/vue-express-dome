# ES6 到 ES12 特性总结

## ES6

> ES6(es2015)是一次比较重大的革新，比起过去的版本，改动比较大，仅对常用 API 及语法糖进行讲解

**1. let 和 const**

在`ES6`之前，`js`只有`var`一种声明方式,要实现块级作用域,常规操作是用`闭包`来防止变量泄露。但是在`ES6`之后，多了`let`和`const`两种方式。用`var`声明的变量没有块级作用域，而`let`和`const`都是`块级作用域`，这三个关键字的区别主要如下:

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

| 功能说明       | var | let | const |
| :------------- | :-: | :-: | :---: |
| 变量提升       | ✅  | ❌  |  ❌   |
| 全局变量       | ✅  | ❌  |  ❌   |
| 重复声明       | ✅  | ❌  |  ❌   |
| 重新赋值       | ✅  | ✅  |  ❌   |
| 暂时性死区     | ❌  | ✅  |  ✅   |
| 块级作用域     | ❌  | ✅  |  ✅   |
| 只声明不初始化 | ✅  | ✅  |  ❌   |

### 引申: let 编译成 ES5 之后是如何保持块级作用域的?

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

for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

for (let i = 0; i < 3; i++) {
  console.log(i);
  let i = 'abc';
  console.log(i);
}
// Uncaught ReferenceError: Cannot access 'i' before initialization

for (let i = 0; i < 3; i++) {
  console.log(i);
  // let i = 'abc';
  // console.log(i);
}
// 0
// 1
// 2
```

经过`babel`转义后,这里提供一个[在线转化地址](https://es6console.com/):

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

从上面的代码我们就可以看出，let 创建作用域的方式，其实就是`创建了一个函数，在函数内定义一个同名变量并于外部将这个变量传入其中`，以此达到创建作用域的目的。

### 引申: let 变量无法声明提升是如何实现的?

首先是一段熟悉的 ES6 代码:

```js
console.log(a); // undefined
var a = 1;

console.log(b); // VM233:4 Uncaught ReferenceError: b is not defined
let b = 2;
```

经过 babel 编译后的代码:

```js
"use strict";

console.log(a); // undefined
var a = 1;

console.log(b); // undefined
var b = 2;
```

按照`babel`编译后理论上 b 的输出值应该和 a 一样是一个`undefined`,但是实际上它并不会编译通过,这个逻辑不是由 babel 来控制的,目前看来是浏览器内部 JS 执行引擎支持和实现的。

### 引申: 上述说到的暂时性死区是个什么东西?

> 只要块级作用域内存在`let / const`命令，它所声明的`变量 / 常量`就“绑定”（binding）这个区域，不再受外部的影响。ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域，凡是`在声明之前就使用这些变量`，就会报错。这种特性也被成为`暂时性死区`。

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

同样，这个特性也是被浏览器内部的 JS 执行引擎支持和实现的，`babel` 无法支持这种特性的编译，只能简单的将 `let` 编译成 `var`。

但是有意思的是，由于 `let` 在 `if` 块中是可以构建自己的独立作用域的，`babel` 将 `tmp` 这个变量换了个名字来模拟实现块级作用域的创建。

**2. 类(Class)**

在 ES6 之前构造类的方式都是与原型链相关的，在 ES6 出现了`class`关键字用来构造一个类。

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

**3. 箭头函数**

es6 之前的函数中`this`的指向都是跟`函数运行时的执行环境`有关的，使用`箭头函数`的时候 this 指向跟`函数定义时的执行环境有关(this是继承自父执行上下文)`。并且箭头函数语法更简洁，没有自己的`this`，`arguments`，`super`等。

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

:::tip
简单来说就是,`箭头函数`的 this 指向定义时的上下文环境(继承自父执行上下文),`普通函数`的 this 指向运行的上下文环境。
:::

另外,箭头函数是不可以当构造函数的,也就是不能通过 new 操作符进行操作,否则会报错。

**因为箭头函数本身没有自己的 this,也没有`arguments`对象,因此`call()`、`apply()`、`bind()`这些方法去改变 this 指向堆兼有函数也是无效的。**

**4. 函数默认参数**

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

**5. 模板字符串**

在 ES6 之前，拼接字符串的话都需要`+`号

```js
var name = "kirs";
var age = 24;
var info = "my name is" + name + ", I am " + age + " years old";

// es6
const name = "kirs";
const age = 24;
const info = `my name is ${name}, I am ${age} years old`;
```

**6. 解构赋值**

我们通过解构赋值，可以将属性/值从对象/数组中取出，赋值给其他变量

```js
// es5
var a = 10;
var b = 20;
var temp = a;
a = b;
b = temp;
// es6
let a = 10;
let b = ((20)[(a, b)] = [b, a]);
```

**7. 模块化**

在 ES6 之前，js 并没有模块化的该你啊。也只有社区定制的类似 Commonjs 和 AMD 之类的规则

```js
// circle.js
const { PI } = Math;
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;

// index.js
const circle = require("./circle.js");
console.log(`半径为2的圆面积是${circle.area(2)}`);

// circle.js
const { PI } = Math;
export const area = (r) => PI * r ** 2;
export const circumference = (r) => 2 * PI * r;

// index.js
import { area } from "./circle.js";
console.log(`半径为2的圆面积是${area(2)}`);
```

**8.扩展操作符(Spread operator)**

扩展操作符可以在调用函数/数组构造时，将表达式或者字符串在语法层面展开；还可以在构造字面量对象时，将对象表达式按照`key-value`方式展开。

```js
function sum(x, y, z) {
  return x + y + z;
}
var list = [5, 6, 7];
var total = sum.apply(null, list);

// es6
const sum = (x, y, z) => x + y + z;
const list = [5, 6, 7];
const total = sum(...list);
```

:::warning
扩展运算符只能适用于那鞋布置了迭代器的对象(字符串，数组等)
:::

```js
const obj = {
  id: 112233,
};
const array = [...obj]; // TypeError: obj is not iterable
```

**9. 对象简写属性**

在 ES6 之前对某个同名元素进行变量赋值需要重写一遍，而在 ES6 之后可以简写

```js
var cat = "Tom";
var mouse = "Jerry";

var obj = {
  cat: cat,
  mouse: mouse,
};
// es6

const cat = "Tom";
const mouse = "Jerry";

const obj = {
  cat,
  mouse,
};
```

**10. Promise**

`Promise`是 ES6 提供的一种异步解决方案，比回调函数更加清晰明了。

`Promise`总共有 3 种状态:

1. 等待中(pending)
2. 完成了(resolved)
3. 拒绝了(rejected)

:::warning
`Promise`一旦从等待状态变成了其他状态就永远不能改变状态了
:::

```js
new Promise((resolve, reject) => {
  resolve("success");
  // 无效
  reject("reject");
});
```

:::tip
当我们在构造`Promise`的时候,构造函数内部的代码是立即执行的。
:::

```js
new Promise((resolve, reject) => {
  console.log("new promise");
  resolve("success");
});
console.log("finish");
// new promise -> finish
```

`Promise`实现了链式调用，也就是说每次调用`then`之后返回的都是一个`Promise`，并且是一个全新的`Promise`，原因是因为状态不可变。如果你在`then`中使用了`return`，那么`return`的值会被`Promise.resolve()`包裹。

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res); // 1
    return 2; // Promise.resolve(2)
  })
  .then((res) => {
    console.log(res); // 2
  });
```

**11. for...of 语句**

`for...of`语句在可迭代对象(`array`, `Map`, `Set`, `String`, `TypedArray`, `arguments`对象等)上创建一个迭代循环，调用自定义迭代钩子并为每个不同属性的值执行语句。

```js
const array1 = ["a", "b", "c"];

for (const element of array1) {
  console.log(element);
  // a b c
}
```

**12. Symbol**

`Symbol`是 ES6 出现的一种基本数据类型,`symbol()`函数会返回`symbol`类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法暴露全局的 symbol 注册，且类似于内建对象类。

每个`Symbol()`返回的`symbol`值都是唯一的。当参数为对象时，将调用对象的 toString()方法。

:::tip
一个`symbol`值能作为对象属性的标识符；这是该数据类型仅有的目的。
:::

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol("foo");
const symbol4 = Symbol("foo");
const symbol5 = Symbol({ name: "Lucy" }); // Symbol([object Object])

console.log(typeof symbol1); // "symbol"
console.log(symbol3.toString()); // "Symbol('foo')"
console.log(symbol3 === sumbol4); // false
```

**如果我们想创造两个相等的 Symbol 变量，可以使用`Symbol.for(key)`。**

> `Symbol.for(key)`使用给定的 key 搜索现有的 symbol，如果找到则返回该 symbol。否则将使用给定的 key 在全局 symbol 注册表中创建一个新的 symbol。

```js
const symbol1 = Symbol.for("foo");
const symbol2 = Symbol.for("foo");

console.log(symbol1 === symbol2);
```
:::warning
这里需要注意一点,我们需要使用 Symbol()函数创建 symbol 变量，并非使用构造函数，使用 new 操作符会直接报错。

```js
new Symbol(); // Uncaught TypeError: Symbol is not a constructor
```

当使用 Symbol 作为对象属性时，可以保证对象不会出现重名属性，调用`for...in`不能将其枚举出来，另外调用`Object.getOwnPropertyNames`、`Object.keys()`也不能获取 Symbol 属性。

```js
var obj = {
  name: "Lucy",
  [Symbol("name")]: "jack",
};
Object.getOwnPropertyNames(obj); // ["name"]
Object.keys(obj); // ["name"]
for (var i in obj) {
  console.log(i); // name
}
Object.getOwnPropertySymbols(obj); // [Symbol(name)]
```

:::


**如何取到用symbol定义的key呢**
首先我们常见的用for循环是无法拿到symbol定义的属性名的
```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```
如何能拿到
```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```
**`Symbol.iterator`** 迭代器 和 生成器 **`for of`**
支持遍历大部分类型迭代器 `arr` `nodeList` `argumetns` `set` `map` 等但是不包括对象 `object`
```ts
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }

// 测试用例
interface Item {
    age: number,
    name: string
}
 
const array: Array<Item> = [{ age: 123, name: "1" }, { age: 123, name: "2" }, { age: 123, name: "3" }]
 
type mapTypes = string | number
const map:Map<mapTypes,mapTypes> = new Map()
 
map.set('1','王爷')
map.set('2','陆北')
 
const obj = {
    aaa:123,
    bbb:456
}
 
let set:Set<number> = new Set([1,2,3,4,5,6])
// let it:Iterator<Item> = array[Symbol.iterator]()
const gen = (erg:any): void => {
    let it: Iterator<any> = erg[Symbol.iterator]()
    let next:any= { done: false }
    while (!next.done) {
        next =  it.next()
        if (!next.done) {
            console.log(next.value)
        }
    }
}
gen(array)
```
我们平时开发中不会手动调用 `iterator` 应为 他是有语法糖的就是`for of`  记住 `for of` 是不能循环对象的应为对象没有 `iterator`  
那我们可以自己实现一个迭代器让对象支持`for of`
```ts
const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...obj])
 
for (let val of obj) {
   console.log(val);
   
}
```

以下为这些symbols的列表：

**Symbol.hasInstance**
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

**Symbol.isConcatSpreadable**
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

**Symbol.iterator**
方法，被for-of语句调用。返回对象的默认迭代器。

**Symbol.match**
方法，被String.prototype.match调用。正则表达式用来匹配字符串。

**Symbol.replace**
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

**Symbol.search**
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

**Symbol.species**
函数值，为一个构造函数。用来创建派生对象。

**Symbol.split**
方法，被String.prototype.split调用。正则表达式来用分割字符串。

**Symbol.toPrimitive**
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

**Symbol.toStringTag**
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

**Symbol.unscopables**
对象，它自己拥有的属性会被with作用域排除在外。








**Symbol 的应用场景**:

- 防止 XSS:

在`React`的`ReactElement`对象中，有一个`$$typeof`属性，它是一个 Symbol 类型的变量：

```js
const REACT_ELEMENT_TYPE =
  (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) ||
  0xeac7;
```

`ReactElement.isValidElement`函数用来判断一个 React 组件是否是有效的，下面是它的具体实现。

```js
ReactElement.isValidElement = function(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
};
```

**`React`渲染时会把没有`$$typeof`标识，以及规则校验不通过的组件过滤掉。**

如果你的服务器有一个漏洞，允许用户存储任意 JSON 对象， 而客户端代码需要一个字符串，这可能会成为一个问题：

```js
// JSON
let expectedTextButGotJSON = {
  type: "div",
  props: {
    dangerouslySetInnerHTML: {
      __html: "/* put your exploit here */",
    },
  },
};
let message = { text: expectedTextButGotJSON };
<p>{message.text}</p>;
```

而`JSON`中不能存储`Symbol`类型的变量，这就是`防止XSS`的一种手段。

- 私有属性

借助`Symbol`类型的不可枚举，我们可以在类中模拟私有属性，控制变量读写：

```js
const privateField = Symbol();
class myClass {
  constructor() {
    this[privateField] = "ConardLi";
  }
  getField() {
    return this[privateField];
  }
  setField(val) {
    this[privateField] = val;
  }
}
```

- 防止属性污染

在某些情况下，我们可能要为对象添加一个属性，此时就有可能造成属性覆盖，用 Symbol 作为对象属性可以保证永远不会出现同名属性。

例如我们模拟实现一个 call 方法：

```js
Function.prototype.myCall = function(context) {
  if (typeof this !== "function") {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const args = [...arguments].slice(1);
  const result = context[fn](...args);
  delete context[fn];
  return result;
};
```

**我们需要在某个对象上临时调用一个方法，又不能造成属性污染，Symbol 是一个很好的选择。**

**13. 迭代器与生成器**

迭代器(Iterator)是一种迭代的机制，为各种不同的数据结构提供一种统一的访问方式。任何数据结构只要内部有 Iterator 接口，就可以完成依次迭代的操作。

一旦创建，迭代器对象可以勇敢重复调用`next()`显示地迭代，从而获取该对象每一级的值，直到迭代完，返回`{value: undefined, done:true}`

生成器函数使用`function*`语法编写，最初调用的时候，生成器不执行任何的代码，而是返回一种成为`Generator`的迭代器。通过调用生成器的下一个方法消耗值时，`Generator`函数将执行，直到遇到`yield`关键字。

:::tip
可以根据需要多次调用该函数，并且每次都返回一个新的`Generator`，但每个`Generator`只能迭代一次
:::

```js
function* makeRangeInterator(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

const a = makeRangeInterator(1, 10, 2);
a.next(); // {value: 1, done: false}
a.next(); // {value: 3, done: false}
a.next(); // {value: 5, done: false}
a.next(); // {value: 7, done: false}
a.next(); // {value: 9, done: false}
a.next(); // {value: undefined, done: true}
```

**14. Set 与 WeakSet**

`Set`对象允许你存储任何类型的唯一值，无论是原始值还是对象引用。

可以通过 Set 进行数组去重.

```js
const arr = [1, 1, 2, 3, 4, 5, 6, 4];
const newArr = [...new Set(arr)]; // 1,2,3,4,5,6
```

`WeakSet`结构与`Set`结构类似，但是有如下两点区别:

1. `WeakSet`对象只能存放对象引用，不能存放值，而`Set`结构都可以.
2. `WeakSet`对象中存储的对象值都是被弱引用的，如果没有其他的变量或属性引用这个对象值，则这个对象值会被当成垃圾回收掉。正因为这样，`WeakSet`对象是无法被枚举的，没有办法拿到它所包含的所有元素。

```js
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo); // false 对象foo没有被添加

ws.delete(window);
ws.has(window); // false

wx.clear(); // 清空整个WeakSet对象
```

**15. Map 与 WeakMap**

`Map`对象保存的是建/值对的集合，任何值(对象或者原始值)都可以作为一个键或者一个值。

```js
var myMap = new Map();
myMap.set(NaN, "not a number");

myMap.get(NaN); // not a number

var otherNaN = Number("foo");
myMap.get(otherNaN); // not a number
```

`WeakMap`对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值是可以任意的。

```js
var wm1 = new WeakMap(),
    wm2 = new WeakMap(),
    wm3 = new WeakMap(),

var o1 = {},
    o2 = function(){},
    o3 = window;

wm1.set(o1, 37);
wm1.set(o2, "aa");
wm2.set(o1, o2);
wm2.set(o3, undefined);
wm2.set(wm1, wm2);
wm1.get(o2) // aa
wm2.get(o2) // undefined
wm2.get(o3) // undefined

wm1.has(o2) // true
wm2.has(o2) // false
wm2.has(o3) // true

wm3.set(o1, 37);
wm3.get(o1) // 37
wm3.clear()
wm3.get(o1) // undefined,w3为空

wm1.has(o1) // true
wm1.delete(o1)
wm1.has(o1) // false
```

**16. Proxy 与 Reflect**

`Proxy`对象用于定义基本操作的自定义行为(如属性查找，赋值，枚举，函数调用等)。

`Reflect`是一个内置的对象，它提供拦截`javascript`操作的方法。这些方法与`Proxy`的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。`Proxy`与`Reflect`是非常完美的配合。

```js
const observe = (data, callback) => {
  return new Proxy(data, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value, proxy) {
      callback(key, value);
      target[key] = value;
      return Reflect.set(target, key, value, proxy);
    },
  });
};
const FooBar = {
  open: false,
};
const FooBarObserver = observe(FooBar, (property, value) => {
  property === "open" && value
    ? console.log("FooBar is open")
    : console.log("FooBar is closed");
});

console.log(FooBarObserver.open); // false
FooBarObserver.open = true; // true
```

:::warning
如果对象带有`configurable:false` 或者`writable: false`属性,则代理失效。
:::

**17. Regex 对象的扩展**

**18. Math 对象的扩展**

- `Number.parseInt()` 返回转化值的整数部分
- `Number.parseFloat()` 返回转换值的浮点数部分
- `Number.isFinite()` 是否为有限数值
- `Number.isNaN()` 是否为 NaN
- `Number.isinteger()` 是否为整数
- `Math.trunc()` 返回数值整数部分
- `Math.sign()` 返回数值类型(正数 1、负数-1、零 0)
- `Math.imul(x,y)` 返回两个数值相乘

**19. Array 对象的扩展**

- `Array.from()` 转化具有`Iterator`接口的数据结构为真正的数组,返回新数组

```js
Array.from("foo"); // ["f", "o", "o"]
```

- `Array.of()` 转化一组值为真正的数组，返回新数组

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```

- `Array.copyWithin(target, start, end)` 把指定位置的成员复制到其他位置，返回原数组

```js
const arr1 = [1, 2, 3, 4, 5];
arr1.copyWithin(0, 3, 4);
//  [4, 2, 3, 4, 5]
```

- `Array.find()` 返回第一个符合条件的成员

```js
const arr = [5, 12, 18, 130];
arr.find((item) => item > 10); // 12
```

- `Array.findIndex()` 返回第一个符合条件的成员的索引值

```js
const arr = [5, 12, 18, 130];
arr.findIndex((item) => item > 10); // 1
```

- `Array.fill(value, start, end)` 根据指定的值填充整个数组

```js
const arr = [1, 2, 3, 4];
arr.fill(1); // [1, 1, 1, 1]
```

- `Array.keys()` 返回以索引值为遍历器的对象

```js
const arr = [1, 2, 3, 4];
const iterator = arr.keys();

for (const key of iterator) {
  console.log(key); // 0 1 2 3
}
```

- `Array.values()` 返回以属性值为遍历器的对象

```js
const arr = [1, 2, 3, 4];
const iterator = arr.values();

for (const key of iterator) {
  console.log(key); // 1 2 3 4
}
```

- `Array.entries()` 返回以索引值和属性值为遍历器的对象

```js
const arr = [1, 2, 3, 4];
const iterator = arr.entries();

console.log(iterator.next().value); // [0: 1]
console.log(iterator.next().value); // [1: 2]
```

### 引申: const 声明变量的规则是怎么样的?

我们已经知道了`const`在声明变量的时候就必须要进行赋值,一但 `const` 变量被定义，后面就不能对其进行修改。

:::warning
这里还需要注意的一点是:

`const` 实际保证的是常量空间存储的数据不可被改变，而常量对应的值可以被改变。比如说我们定义了一个对象:

```js
const student = {
    name: 'jack',
    age: 24
};

// 我们可以对值进行修改
student.age = 25；
student.gender = 'male';

// 但是我们不可以改变其存储的地址 下面的语法就会报错
student = {
    name: 'jack',
    age: 25,
    gender: 'male',
};
```

:::

## ES7

### 1.`Array.prototype.includes()`

用来判断一个数组是否包含一个指定的值。根据情况，如果包含则返回`true`，否则返回`false`。

```js
const arr = [1, 2, 3];
arr.includes(1); // true
arr.includes(4); // false
```

### 2.幂运算符\*\*

`幂运算符**`具有与`Math.pow()`一样的功能。

```js
console.log(2 ** 10); // 1024
console.log(Math.pow(2, 10)); // 1024
```

## ES8

### 1. `async`与`await`

`async`与`await`能够解决`promise`嵌套过多带来的问题，可以简化代码，让异步代码看起来像同步代码

```js
// promise
fetch("coffee.jpg")
  .then((res) => res.blob())
  .then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((err) => {
    console.log("error: " + err.message);
  });
// async和await

async function myFetch() {
  let response = await fetch("coffee.jpg");
  let myBlob = await response.blob();

  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
}

myFetch();
```

### 2.`Object.values()`

返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用`for...in`循环的顺序相同 ( 区别在于 `for-in` 循环枚举原型链中的属性 )。

```js
const object1 = {
  a: "somestring",
  b: 42,
  c: false,
};
console.log(Object.values(object1)); // ["somestring", 42, false]
```

### 3.`Object.entries()`

返回一个给定对象自身可枚举属性的键值对数组。

```js
const object1 = {
  a: "somestring",
  b: 42,
};

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// "a: somestring"
// "b: 42"
```

### 4.`padStart()`

用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。

```js
const str1 = "5";
console.log(str1.padStart(2, "0")); // "05"

const fullNumber = "2034399002125581";
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, "*");
console.log(maskedNumber); // "************5581"
```

### 5.`padEnd()`

用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

```js
const str1 = "Breaded Mushrooms";
console.log(str1.padEnd(25, ".")); // "Breaded Mushrooms........"
const str2 = "200";
console.log(str2.padEnd(5)); // "200  "
```

### `Object.getOwnPropertyDescriptors()`

用来获取一个对象的所有自身属性的描述符。

```js
const object1 = {
  property1: 42,
};

const descriptors1 = Object.getOwnPropertyDescriptors(object1);

console.log(descriptors1.property1.writable); // true

console.log(descriptors1.property1.value); // 42

// 浅拷贝一个对象
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

// 创建子类
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
};
function subclass() {}
subclass.prototype = Object.create(
  superclass.prototype,
  Object.getOwnPropertyDescriptors({
    // 在这里定义方法和属性
  })
);
```

## ES9

### 1.`for await...of`

`for await...of` 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 `String`，`Array`，`Array-like` 对象（比如`arguments` 或者`NodeList`)，`TypedArray`，`Map`， `Set`和自定义的异步或者同步可迭代对象。其会调用自定义迭代钩子，并为每个不同属性的值执行语句。

```js
async function* asyncGenerator() {
  var i = 0;
  while (i < 3) {
    yield i++;
  }
}

(async function() {
  for await (num of asyncGenerator()) {
    console.log(num);
  }
})();
// 0
// 1
// 2
```

### 2.正则表达式反向(lookbehind)断言

在 ES9 之前，`JavaScript` 正则表达式，只支持正向断言。正向断言的意思是：当前位置后面的字符串应该满足断言，但是并不捕获。例子如下：

```js
"fishHeadfishTail".match(/fish(?=Head)/g); // ["fish"]
```

### 3.正则表达式 Unicode 转义

### 4.正则表达式 s/dotAll 模式

### 5.正则表达式命名捕获组

### 6.对象扩展操作符

ES6 中添加了数组的扩展操作符，让我们在操作数组时更加简便，美中不足的是并不支持对象扩展操作符，但是在 ES9 开始，这一功能也得到了支持，例如：

```js
var obj1 = { foo: "bar", x: 42 };
var obj2 = { foo: "baz", y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }
```

### 7.`Promise.prototype.finally()`

`finally()`方法会返回一个`Promise`，当`promise`的状态变更，不管是变成`rejected`或者`fulfilled`，最终都会执行`finally()`的回调。

```js
fetch(url)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("结束");
  });
```

## ES10

### 1.`Array.prototype.flat()` / `flatMap()`

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

`flatMap()`与 `map()` 方法和深度为 1 的 `flat()` 几乎相同.，不过它会首先使用映射函数映射每个元素，然后将结果压缩成一个新数组，这样效率会更高。

```js
var arr1 = [1, 2, 3, 4];

arr1.map((x) => [x * 2]); // [[2], [4], [6], [8]]

arr1.flatMap((x) => [x * 2]); // [2, 4, 6, 8]

// 深度为1
arr1.flatMap((x) => [[x * 2]]); // [[2], [4], [6], [8]]
```

`flatMap(`)可以代替`reduce()` 与 `concat()`，例子如下：

```js
var arr = [1, 2, 3, 4];
arr.flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6, 4, 8]
// 等价于
arr.reduce((acc, x) => acc.concat([x, x * 2]), []); // [1, 2, 2, 4, 3, 6, 4, 8]
```

但这是非常低效的，在每次迭代中，它创建一个必须被垃圾收集的新临时数组，并且它将元素从当前的累加器数组复制到一个新的数组中，而不是将新的元素添加到现有的数组中。

### 2.String.prototype.trimStart() / trimLeft() / trimEnd() / trimRight()

在 ES5 中，我们可以通过`trim()`来去掉字符首尾的空格，但是却无法只去掉单边的，但是在 ES10 之后，我们可以实现这个功能。

```js
const Str = "   Hello world!  ";
console.log(Str); // '   Hello world!  '
console.log(Str.trimStart()); // 'Hello world!  '
console.log(Str.trimLeft()); // 'Hello world!  '
console.log(Str.trimEnd()); // '   Hello world!'
console.log(Str.trimRight()); // '   Hello world!'
```

:::warning
不过这里有一点要注意的是，`trimStart()`跟`trimEnd()`才是标准方法，`trimLeft()`跟`trimRight()`只是别名。
:::

### 3.`Object.fromEntries()`

把键值对列表转换为一个对象，它是`Object.entries()`的反函数。

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj); // Object { foo: "bar", baz: 42 }
```

### 4.`String.prototype.matchAll`

`matchAll()` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。并且返回一个不可重启的迭代器。例子如下：

```js
var regexp = /t(e)(st(\d?))/g
var str = 'test1test2'

str.match(regexp) // ['test1', 'test2']
str.matchAll(regexp) // RegExpStringIterator {}
[...str.matchAll(regexp)] // [['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4], ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]]
```

### 5.BigInt

`BigInt` 是一种内置对象，它提供了一种方法来表示大于 `2^53 - 1` 的整数。这原本是 Javascript 中可以用 Number 表示的最大数字。

BigInt 可以表示任意大的整数。可以用在一个整数字面量后面加 `n` 的方式定义一个 BigInt ，如：10n，或者调用函数 BigInt()。
在以往的版本中，我们有以下的弊端：

```js
// 大于2的53次方的整数，无法保持精度
2 ** 53 === 2 ** 53 + 1;
// 超过2的1024次方的数值，无法表示
2 ** 1024; // Infinity
```

:::tip
`BigInt` 和 `Number`不是严格相等的，但是宽松相等的。
:::

### 6.globalThis

`globalThis`属性包含类似于全局对象 `this`值。所以在全局环境下，我们有：

```js
globalThis === this; // true
```

## ES11

### 1.Promise.allSettled

在之前使用`Promise.all`的时候,如果其中某个任务出现异常(`reject`)，所有任务都会挂掉，`Promise`直接进入 `reject` 状态。

当我们在一个页面中并发请求 3 块区域的数据的时候，如果其中一个接口挂了，这将导致页面的数据全都无法渲染出来，这是我们无法接受的。

```js
Promise.all([
  Promise.reject({
    code: 500,
    msg: "服务异常",
  }),
  Promise.resolve({
    code: 200,
    list: [],
  }),
  Promise.resolve({
    code: 200,
    list: [],
  }),
])
  .then((res) => {
    // 如果其中一个任务是 reject，则不会执行到这个回调。
    doSomething(res);
  })
  .catch((error) => {
    // 本例中会执行到这个回调
    // error: {code: 500, msg: "服务异常"}
  });
```

我们想要的是在执行并发任务中，无论一个任务正常或者异常，都会返回对应的的状态（`fulfilled` 或者 `rejected`）与结果（`业务value` 或者 `拒因 reason`）。在 `then` 里面通过 `filter` 来过滤出想要的业务逻辑结果，这就能最大限度的保障业务当前状态的可访问性，而 `Promise.allSettled` 就是解决这问题的。

```js
Promise.allSettled([
    Promise.reject({code: 500, msg:'服务异常'}),
    Promise.resolve({ code: 200, list: []}),
    Promise.resolve({code: 200, list: []})])
]).then((res) => {
    /*
        0: {status: "rejected", reason: {…}}
        1: {status: "fulfilled", value: {…}}
        2: {status: "fulfilled", value: {…}}
    */
    // 其他业务过滤掉 rejected 状态，尽可能多的保证页面区域数据渲染
    RenderContent(res.filter((el) => {
        return el.status !== 'rejected';
    }));
});
```

### 2.可选链（Optional chaining）

`可选链`可让我们在查询具有多层级的对象时，不再需要进行冗余的各种前置校验。

```js
// 假设有一个user对象
const name = props && props.user && props.user.info && props.user.info.name;

// 使用可选链
const name = props?.user?.info?.name;
```

:::tip
可选链中的 `?` 表示如果问号左边表达式有值, 就会继续查询问号后面的字段。

项目中需要支持的话 需要配置`babel`转换

```
npm install @babel/plugin-proposal-optional-chaining --dev
```

:::

### 3.空值合并运算符（Nullish coalescing Operator）

当我们查询某个属性时，经常会遇到，如果没有该属性就会设置一个默认的值:

```js
const level = (user.data && user.data.level) || "暂无等级";
```

如果说用户的等级本身就是 0 级的话，在上述的情况下就会被转化为"暂无等级"。

```js
// 使用空值合并
const level = `${user?.data?.level}级` ?? "暂无等级";
```

## ES12

- 2021.02.20

ES2021 也就是 2021 年的 ECMAScript 版本。ES2021 并没有像 ES2015 那样提出很多新特性，但却合并了一些有用的特性。

以下是 ES2021 的新特性概览：

- String.prototype.replaceAll
- Promise.any
- WeakRef
- 逻辑赋值运算符
- 数字分隔符

### String.protype.replaceAll

在 ES2021 之前，要替换掉一个字符串中的所有指定字符，我们可以这么做：

```js
const fruits = "🍎+🍐+🍓+";
const fruitsWithBanana = fruits.replace(/\+/g, "🍌");
console.log(fruitsWithBanana); //🍎🍌🍐🍌🍓🍌
```

ES2021 则提出了`replaceAll`方法，并将其挂载在 String 的原型上，可以这么用：

```js
const fruits = "🍎+🍐+🍓+";
const fruitsWithBanana = fruits.replaceAll("+", "🍌");
console.log(fruitsWithBanana); //🍎🍌🍐🍌🍓🍌
```

### Promise.any

`Promise.any`方法和`Promise.race`类似——只要给定的迭代中的一个 promise 成功，就采用第一个 promise 的值作为它的返回值，但与`Promise.race`的不同之处在于——它会等到所有 `promise` 都失败之后，才返回失败的值：

```js
const myFetch = (url) =>
  setTimeout(() => fetch(url), Math.floor(Math.random() * 3000));
const promises = [
  myFetch("/endpoint-1"),
  myFetch("/endpoint-2"),
  myFetch("/endpoint-3"),
];
// 使用 .then .catch
Promise.any(promises) // 任何一个 promise 成功。
  .then(console.log) // 比如 ‘3’
  .catch(console.error); // 所有的 promise 都失败了
// 使用 async-await
try {
  const first = await Promise.any(promises); // 任何一个 promise 成功返回。
  console.log(first);
} catch (error) {
  // 所有的 promise 都失败了
  console.log(error);
}
```

### WeakRef

WeakRef 提案主要包含两个新功能：

- 可以通过`WeakRef`类来给某个对象创建一个弱引用
- 可以通过`FinalizationRegistry`类，在某个对象被垃圾回收之后，执行一些自定义方法

上述两个新功能可以同时使用，也可以单独使用，取决于你的需求。一个 WeakRef 对象包含一个对于某个对象的弱引用，被称为*目标*或*引用*。

通过弱引用一个对象，可以让该对象在没有其它引用的情况下被垃圾回收机制回收。WeakRef 主要用来**缓存**和**映射**一些大型对象，当你希望某个对象在不被其它地方引用的情况下及时地被垃圾回收，那么你就可以使用它。

```js
function toogle(element) {
  const weakElement = new WeakRef(element);
  let intervalId = null;

  function toggle() {
    const el = weakElement.deref();
    if (!el) {
      return clearInterval(intervalId);
    }
    const decoration = weakElement.style.textDecoration;
    const style = decoration === "none" ? "underline" : "none";
    decoration = style;
  }
  intervalId = setInterval(toggle, 1000);
}
const element = document.getElementById("link");
toogle(element);
setTimeout(() => element.remove(), 10000);
```

`FinalizationRegistry`接收一个注册器回调函数，可以利用该注册器为指定对象注册一个事件监听器，当这个对象被垃圾回收之后，会触发监听的事件，具体步骤如下。首先，创建一个注册器：

```js
const registry = new FinalizationRegistry((heldValue) => {
  // ....
});
```

接着注册一个指定对象，同时也可以给注册器回调传递一些参数：

```js
registry.register(theObject, "some value");
```

### 逻辑赋值运算符

逻辑赋值运算符结合了逻辑运算符和赋值表达式。逻辑赋值运算符有两种：

- 或等于（||=）
- 且等于（&&=）

```js
// 或等于
|   a   |   b   | a ||= b | a (运算后) |
| true  | true  |   true  |        true         |
| true  | false |   true  |        true         |
| false | true  |   true  |        true         |
| false | false |   false |        false        |
a ||= b
// 等同于:
a || (a = b);

// 且等于
|   a   |   b   | a &&= b | a (运算后) |
| true  | true  |   true  |        true         |
| true  | false |   false |        false        |
| false | true  |   false |        false        |
| false | false |   false |        false        |
a &&= b
// 等同于:
a && (a = b);
```

### 数字分隔符

通过这个功能，我们利用 “（\_，U+005F）” 分隔符来将数字分组，提高数字的可读性：

```js
1_000_000_000; // 十亿
101_475_938.38; // 亿万

const amount = 12345_00; // 12,345
const amount = 123_4500; // 123.45 (保留 4 位小数)
const amount = 1_234_500; // 1,234,500

0.000_001; // 百万分之一
1e10_000; // 10^10000

const binary_literals = 0b1010_0001_1000_0101;
const hex_literals = 0xa0_b0_c0;
const bigInt_literals = 1_000_000_000_000n;
const octal_literal = 0o1234_5670;
```

## 零碎记录

**字符串的遍历器接口**
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
除了遍历字符串，这个遍历器最大的优点是可以识别大于`0xFFFF`的码点，传统的`for`循环无法识别这样的码点。
```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```
上面代码中，字符串`text`只有一个字符，但是`for`循环会认为它包含两个字符（都不可打印），而`for...of`循环会正确识别出这一个字符。

**实例方法：padStart()，padEnd()**
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
上面代码中，padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```
如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
```js
'abc'.padStart(10, '0123456789')
// '0123456abc'
```
如果省略第二个参数，默认使用空格补全长度。
```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```
`padStart()`的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
另一个用途是提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

**trimStart()，trimEnd()**
ES2019 对字符串实例新增了`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```
