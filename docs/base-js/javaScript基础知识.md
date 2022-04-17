`# `javaScript` 基础知识

## `script`标签

>目的：让 `JavaScript` 既能与 `HTML` 页面共存，又不影响那些页面在其他浏览器中的呈现效果。

常用属性
1. `async`(可选): 关键词：异步脚本，外部文件，立即下载；

当标签中包含这个属性时会立即下载脚本（外部文件），只对外部脚本文件有效，下载的同时可以进行页面的其他操作，下载完成后停止解析并执行，执行后继续进行解析，但不能保证执行顺序。

2. `defer`（可选）: 关键词：延迟脚本，外部文件，延迟加载；

当标签中包含这个属性时，脚本可以再等到页面完全被解析或显示之后执行，只对外部文件有效，如果同时存在两个带有`defer`的脚本，由于延迟的原因，前者将会优先于后者执行。

3. `charset`（可选）: 关键词：字符集

大多数浏览器已经忽略它的值了，所以很少有人使用。

4. `src`（可选）: 关键词：外部引用

指明要引用的外部脚本文件的地址。

5. `type`（可选）: 关键词：`MIME`（脚本语言的内容类型）

为保证最大限度的浏览器兼容，type的属性值主要时候用的依旧是`text/javascript`，如果没有写这个属性，其默认值仍然为`text/javascript`。

::: warning WARNING
  
  外部script脚本内不应该包含其他自定义的脚本，其他自定义的脚本内部的代码并不会被执行。
:::

## `noscript`标签

>`noscript`元素用来定义在脚本未被执行时的替代内容（文本）。

主要有以下两种情况:

* 浏览器不支持脚本；
* 浏览器支持脚本，但是JavaScript被禁用；

## `script`脚本解析顺序问题

按照传统的做法，所有`<script>`元素都应该放在页面的`<head>`元素中，例如:

```html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script type="text/javascript" src="example1.js"></script> 
 <script type="text/javascript" src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里放网站的内容 --> 
 </body> 
</html> 
```

这种做法目的是把外部文件(`CSS`和`JS`)放置在相同位置。可是这种做法会等到`<head>`元素中的`javascript`脚本全部下载、解析、执行完毕后，再开始解析页面的内容。

对于那些需要很多`javaScript`代码的页面来说，这无疑会导致浏览器在呈现页面时出现明显的延迟，而延迟期间的浏览器窗口中将是一片空白。

为了避免这个问题，现代`Web`应用程序一般都把`javaScript`引用放在`<body>`元素中页面内容的后面，如下例所示：

```html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 </head> 
 <body> 
 <!-- 这里放内容 --> 
 <script type="text/javascript" src="example1.js"></script> 
 <script type="text/javascript" src="example2.js"></script> 
 </body> 
</html> 
```

这样，在解析包含的`javaScript`代码之前，页面的内容将完全呈现在浏览器中。而用户也会因为浏览器窗口显示空白页面的时间缩短而感到打开页面的速度加快了。

## 严格模式与非严格模式

::: tip TIP
 [完整例子](https://www.jb51.net/article/174040.htm)
:::

`ECMAScript 5`引入了`严格模式(strict mode)`的概念。

严格模式是为`javaScript`定义了一种不同的解析与执行模型。

在严格模式下，`ECMAScript3`中的一些不确定的行为将得到处理，而且对某些不安全 的操作也会抛出错误。

*要在整个脚本中启用严格模式，可以在js文件顶部添加如下代码：*

```js
// js
"use strict"; 
```

*也可以指定函数在严格模式下执行*

```js
function doSomething(){ 
 "use strict"; 
 //函数体
} 
```

*严格模式对正常的 JavaScript语义做了一些更改：*

>1. 严格模式通过抛出错误来消除了一些原有静默错误。
>2. 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
>3. 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法。

*详细的区别*

1. 禁用`with`语法，使用将报错。因为解析`with`语法时作用域的情况会非常复杂，严重影响代码的解析与运行速度

2. 禁止删除变量与函数。`delete` 变量 `或delete` 函数都将报错。

3. 属性描述符（`propertyDescriptor`）相关:

4. 能改变属性描述符的方法有： `Object.defineProperty`、 `Object.defineProperties`、 `Reflect.defineProperty`、 `Reflect.defineProperties`、 `Object.freeze` 冻结对象的一切属性、 `Object.seal` 冻结对象的新增属性，即可以更改已存在的属性的值，和`writeable`有关，但是无法新增属性。

*能改变属性描述符的方法有：* `Object.defineProperty`、 `Object.defineProperties`、 `Reflect.defineProperty`、 `Reflect.defineProperties`、 `Object.freeze` 冻结对象的一切属性、 `Object.seal` 冻结对象的新增属性，即可以更改已存在的属性的值，和`writeable`有关，但是无法新增属性。

*获取一个属性描述符的方法有:* `Object.getOwnPropertyDescriptor`、 `Object.getOwnPropertyDecriptors`、 `Reflect.getOwnPropertyDescriptor`、 `Reflect.getOwnPropertyDescriptors`

~~-删除configurable = false的属性会报错~~

~~-给writable = false的属性赋值会报错~~

~~-给不允许扩展的object增加属性会报错~~

将`object`设置为不可扩展的方法有: `Object.freeze`、`Object.seal`、`Object.preventExtensions`、 `Reflect.freeze`、`Reflect.seal`、`Reflect.preventExtensions`

判断一个`object`是否允许扩展可以用 `Object.isExtensible`、`Reflect.isExtensible`

~~- 定义object时属性重名会报错~~
  
~~- 形参重复时会报错~~

~~- eval有独立作用域,eval不能作为变量名或函数名,类似关键字~~

~~- arguments是形参的副本（类似浅拷贝）,arguments不能作为变量名或函数名,类似关键字~~

~~- 禁用caller与callee~~

## var关键字与变量生命周期

```js
var message;
```
未赋值的变量初始值为 `undefined`。

```js
var message = "hi"; 
```

有一点必须注意，即用`var`操作符定义的变量将成为定义该变量的作用域中的局部变量。

也就是说，如果在函数中使用`var`定义一个变量，那么这个变量在函数退出后就会被销毁。

```js
function test(){ 
 var message = "hi"; // 局部变量
} 
test(); 
alert(message); // 错误！
```

这里，变量`message`是在函数中使用`var`定义的。当函数被调用时，就会创建该变量并为其赋值。而在此之后，这个变量又会立即被销毁，因此例子中的下一行代码就会导致错误。
var声明的变量在函数内部，函数会产生局部作用域，无法在外部字节访问。

不过，可以像下面这样省略`var`操作符，从而创建一个全局变量：
```js
function test(){ 
 message = "hi"; // 全局变量
} 
test(); 
alert(message); // "hi" 
```

*虽然省略`var`关键字声明变量会将变量声明为全局变量,但是并不推荐。因为在局部作用域中定义的全局变量很难维护。给未声明的变量赋值在严格模式下会抛出`ReferenceError`错误。*

## 变量提升

>在 `ECMAScript` 中有一个奇怪的语法规则： 变量提升。如果你使用了一个从未声明的变量，程序运行就会抛出错误。但是代码中如果使用 `var` 对其进行过声明,无论在声明前使用，还是在声明后使用，都不会报异常

```js
// 变量提升
console.log(name); // undefined

var name = "Jack";
console.log(name); // Jack
```

**如果你直接对一个未声明的变量进行赋值，就相当于在全局作用域声明了这样的一个变量，会造成无意的变量泄露。**

```js
// 变量泄露
function func() {
  age = 24;
}

func();

console.log(age); // 24
```

**造成这种现象的原因是: JavaScript解释器在对代码进行扫描的时候，会将全局作用域中声明的变量和函数先定义为全局符号，运行到具体声明处才进行赋值。**

```js
// 变量提升
console.log(name, typeof name); // '' string 是因为取的window里面的name属性 这个地方比较特殊 在node段打印出来是undefined

if (false) {
  var name = "Jack";
}

for (var i = 0; i < 3; i++) {
  var sum = i;
}
console.log(i); // 3
console.log(sum); // 2
```

上述的示例代码中，首先 `if` 条件判断语句为 `false`，`if` 内部的代码永远不会执行,但是从结果中我们可以看到第一句打印的语句并不会报错，`name` 变量还是被声明了。

而在后面的循环结构中，我们在 `for` 循环条件语句中声明了一个 `i` 变量，在循环体内部声明了 `sum` 变量，可是当 `sum` 循环结束后，`i` 变量依然存在，变成了全局的变量。

`sum` 同样也变成了全局的变量，这种所谓的变量提升会消耗一部分无用内存，并对之后的代码编写产生额外的风险。

## 数据类型

**`javascript` 有如下几种数据类型：**

### 基本数据类型

``` md
1. `undefined`
2. `null`
3. `number`
4. `string`
5. `boolean`
6. `symbol`(ES6中加入的变量类型)
7. `bigInt`(ES10中加入的变量类型)

```

### 复杂数据类型

对象 `object`

在将一个值赋给变量时，解析器必须确定这个值是基本类型值还是引用类型值。

基本数据类型：`Undefined`、`Null`、`Boolean`、`Number` 、`String`、`Symbol`、`BigInt` 是按值访问的，因为可以操作保存在变量中的实际的值。

:::tip TIP
       
`原始值`和`引用值`的区别在于存储的位置与访问的方式不同。

* `原始类型`的值是存储在栈中的简单数据。
* `引用类型`的值是保存在`内存(堆内存`)中的对象。
与其他语言不同，`JavaScript` 不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。

当复制保存着对象的某个变量时，操作的是`对象的引用`。

但在为对象添加属性时，操作的是实际的对象。
:::

:::warning WARNING
只能给`引用类型值`动态地添加属性，以便将来使用。

变量在内存中存储的方式
:::

### 变量在内存中存储的方式

在 `JavaScript` 中，每一个变量在内存中都需要一个空间来存储，内存空间又被分为两种:

栈内存。

* 堆内存。

* 栈内存

**栈内存**

* 先进后出，后进先出(栈的概念是弹压,就像子弹壳装弹,一粒一粒压进去,但是打出来的时候是从上面打出来的,最先压进去的最后弹出来,如果进去顺序是123,打出来顺序是321,这就是后进先出。)
* 存储的值大小固定
* 空间较小
* 可以直接操作其保存的变量，运行效率高
* 由系统自动分配存储空间
* `JavaScript` **中的原始类型的值被直接存储在`栈`中，在变量定义时，`栈`就为其分配好了内存空间。**

**堆内存**

* 先进先出
* 存储的值大小不定，可动态调整
* 空间较大，运行效率低
* 无法直接操作其内部存储，使用引用地址读取
* 通过代码进行分配空间

相对于原始数据类型，我们习惯把对象称为引用类型，引用类型的值实际存储在`堆内存`中，它在`栈`中只存储了一个固定长度的地址，这个地址指向`堆内存`中的值。

```js
const str = "Hello World";
const obj1 = { id: 1, title: "Hello World" };
const obj2 = () => console.log("obj2");
const obj3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
```

![堆栈关系](/images/base-js13.png)

### 复制基本类型

如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

```js
let num1 = 5;
let num2 = num1;
```

在此，`num1` 中保存的值是 5。当使用 `num1` 的值来初始化 `num2` 时，`num2` 中也保存了值 5。

但 `num2` 中的 5 与 `num1` 中的 5 是完全独立的，该值只是 `num1` 中 5 的一个副本

**此后，这两个变量可以参与任何操作而不会相互影响。**

*复制前*

|属性名|属性值|
|-|-|
|num1|5(Number 类型)|

*复制后*

|属性名|属性值|
|-|-|
|num2|5(Number 类型)|
|num1|5(Number 类型)|

### 复制引用类型

当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中。

不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际上将引用同一个对象。

因此，改变其中一个变量，就会影响另一个变量，如下面的例子所示：

```js
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "Nicholas";
alert(obj2.name); //"Nicholas"
```
首先，变量 `obj1` 保存了一个对象的新实例。然后，这个值被复制到了 `obj2` 中；

换句话说，`obj1` 和 `obj2` 都指向同一个对象。这样，当为 `obj1` 添加 `name` 属性后，可以通过 `obj2` 来访问这个属性， 因为这两个变量引用的都是同一个对象。

![复制引用类型](/images/base-js14.png)

### 变量类型检测

* 如果想检验变量是否是基础类型的话，推荐的方式是typeof操作符。
* 如果我们想要知道一个对象是什么类型的对象，推荐使用instanceof来判断。
* 通用的方式，我们可以使用Object.prototype.toString.call()来检测变量具体是什么类型。

### 变量之间比较

```js
// 当我们在对两个变量进行比较时，不同类型的变量的表现是不同的：
const name = "ConardLi";
const name2 = "ConardLi";
console.log(name === name2); // true
const obj = { name: "ConardLi" };
const obj2 = { name: "ConardLi" };
console.log(obj === obj2); // false
```

::: tip TIP
        
通过上述变量类型在内存中的存储方式,我们知道基础变量类型之间存储在栈中,两者的比较只会去比较两者的类型和值是否一致，如果一致就返回了 `true`。

对应引用类型 `obj`、`obj2` 我们知道他们在栈中存储了一个指向堆中数据的指针,两个数据的值虽然是一样的,但是在栈中存储的指针的地址是不一致的,所以两者并不相等。
:::

### 值传递和引用传递

```js
let name = "Lucy";
const changeName = (name) => {
  name = "Jack";
};

changeName(name);
console.log(name); // Lucy
```

上述代码的执行结果,`name` 仍然是 `Lucy`,说明函数参数传递的是变量的值，即值传递,改变这个局部变量不会对外部变量产生影响。

```js
let obj = {
  name: "Lucy",
};
function changeValue(obj) {
  obj.name = "Jack";
}
changeValue(obj);
console.log(obj.name); // Jack
```

上述代码的执行结果 `name` 变成了 `Jack`。但是，是不是参数是引用类型就是引用传递呢？

:::warning WARNING
           
`ECMAScript` 中所有的函数的参数都是按值传递的。
:::

当函数参数是`引用类型`时，我们同样将参数复制了一个副本到局部变量，只不过复制的这个副本是指向堆内存中的地址而已，我们在函数内部对对象的属性进行操作，实际上和外部变量指向堆内存中的值相同，但是这并不代表着引用传递，下面我们再看一个例子：

```js
let obj = {};
function changeValue(obj) {
  obj.name = "Lucy";
  obj = { name: "Jack" };
}
changeValue(obj);
console.log(obj.name); // Lucy
```
因此可见，函数参数传递的并不是变量的引用，而是变量拷贝的副本，当变量是原始类型时，这个副本就是值本身，当变量是引用类型时，这个副本是指向堆内存的地址。

### 引用类型与基本类型生命周期

* 使用 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。
* 自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

**这意味着我们不能在运行时为基本类型值添加属性和方法。** 来看下面的例子：

```js
let s1 = "some text";
s1.color = "red";
alert(s1.color); //undefined
```

在此，第二行代码试图为字符串 `s1` 添加一个 `color` 属性。但是，当第三行代码再次访问 `s1` 时，其 `color` 属性不见了。

问题的原因就是第二行创建的 `String` 对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的 `String` 对象，而该对象没有 `color` 属性。

## null、underfined、void 0

> 我们首先要明白的是,`javascript` 中变量只声明不赋值的话默认就是 `undefined`。

`undefined` 表示未定义,它的类型只有一个就是 `undefined`。

`undefined` 值是派生自 `null` 值的，因此` ECMA-262` 规定对它们的相等性测试要返回 `true`。

**对于尚未声明过的变量，只能使用 `typeof` 操作符检测其数据类型(对未经声明的变量调用 `delete` 不会导致错误，但这样做没什么实际意义，在严格模式下确实会导致错误)。**

```js
null == undefined; // true
null === undefined; // false

let a;
typeof a; // undefined

function func() {
  console.log(1111);
}

const fn = func();
console.log(fn); // 没有返回值的函数 返回的值也是undefined
```

如前所述，无论在什么情况下都没有必要把一个变量的值显式地设置为 `undefined`，可是同样的规则对 `null` 却不适用。

::: tip TIP
        
换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。

这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。
:::

### void 0 与 undefined

在 `js` 中 `undefined` 是一个变量而并非是一个关键字所以可能存在无意中被篡改的问题,在这种情况下我们可以使用 `void 0` 来代替 `undefined` 的值。

或者我们想要返回一个 `undefined` 的计算值的时候。

```js
function getYear() {
  return 2020;
}

console.log(getYear());
// Output: 2020

console.log(void getYear());
// Output: undefined

// Useful use case
button.onclick = () => void getYear();
```

## 数值转换

**由于保存浮点数值需要的内存空间是保存整数值的两倍，因此 `ECMAScript` 会不失时机地将浮点数值转换为整数值。**

有 3 个函数可以把非数值转换为数值：`Number()`、`parseInt()`和 `parseFloat()`。

第一个函数，即转型函数`Number()`可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。

### `Number()`函数的转换规则如下

* 如果是 `Boolean` 值 `true` 和 `false` 将分别被转换为 1 和 0。
* 如果是数字值，只是简单的传入和返回。
* 如果是 `null` 值，返回 `0`。
* 如果是 `undefined`，返回 `NaN`。
* 如果是字符串，遵循下列规则：
* 如果字符串中只包含数字，则将其转换为十进制数值，即"1"会变成 1，"123"会变成 123，而"011"会变成 11（注意：前导的零被忽略了）；
* 如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽略前导零）；
* 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值；
* 如果字符串是空的（不包含任何字符），则将其转换为 0；
* 如果字符串中包含除上述格式之外的字符，则将其转换为 `NaN`。
* 如果是对象，则调用对象的`valueOf()`方法，然后依照前面的规则转换返回的值。如果转换的结果是 `NaN`，则调用对象的`toString()`方法，然后再次依照前面的规则转换返回的字符串值。

### `parseInt()`转换规则

`parseInt()`函数在转换字符串时，更多的是看其是否符合数值模式。

它会忽略字符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号，`parseInt()`就会返回`NaN`；

也就是说，用`parseInt()`转换空字符串会返回`NaN`。

```js
parseInt(""); //NaN
Number(""); //0
```

如果第一个字符是数字字符，`parseInt()`会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。

例如，"1234blue"会被转换为 1234，因为"blue"会被完全忽略。类似地，"22.5"会被转换为 22，因为小数点并不是有效的数字字符。

```js
let num1 = parseInt("1234blue"); // 1234
let num2 = parseInt(""); // NaN
let num3 = parseInt("0xA"); // 10（十六进制数）
let num4 = parseInt(22.5); // 22
let num5 = parseInt("070"); // 56（八进制数）
let num6 = parseInt("70"); // 70（十进制数）
let num7 = parseInt("0xf"); // 15（十六进制数）
```

为了消除在使用`parseInt()`函数时可能导致的上述困惑，可以为这个函数提供第二个参数：转换时使用的基数（即多少进制）。

如果知道要解析的值是十六进制格式的字符串，那么指定基数 `16` 作为第二个参数，可以保证得到正确的结果，例如：

```js
let num = parseInt("0xAF", 16); //175
```

### `parseFloat()`转换规则

与 `parseInt()`函数类似，`parseFloat()`也是从第一个字符开始解析每个字符。而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。

也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。

举例来说，"22.34.5"将会被转换为 22.34。

由于`parseFloat()`只解析十进制值，因此它没有用第二个参数指定基数的用法。

```js
let num1 = parseFloat("1234blue"); //1234 （整数）
let num2 = parseFloat("0xA"); //0
let num3 = parseFloat("22.5"); //22.5
let num4 = parseFloat("22.34.5"); //22.34
let num5 = parseFloat("0908.5"); //908.5
let num6 = parseFloat("3.125e7"); //31250000
```

### + - 运算符转换规则的区别

**+操作符在 js 中比较特殊，执行+操作符时：**

1. 当一侧为`String`类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
2. 当一侧为`Number`类型，另一侧为原始类型，则将原始类型转换为 `Number` 类型。
3. 当一侧为`Number`类型，另一侧为引用类型，将引用类型和 `Number` 类型转换成字符串后拼接。

**-操作符在 js 中比较特殊，执行-操作符时：**

1. 如果执行减法运算的两个操作数中有字符串类型，且其中的字符串可以转化为数字，则会将其转化为数字之后再进行运算。
2. 如果其中有字符串且不能转化为数字，则计算结果为 `NaN`。

```js
// +
"10" - 5; // 5
"10" - "3"; // 7
"s" - 3; // NaN
"10" - "a"; // NaN
// -
1 < 2; // true
1 > 2; // false
1 == 2; // false
```

### >、< 比较运算符的规则

比较运算符常用于数值类型的变量进行比较的时候使用，例如:

```js
1 < 2; // true
1 > 2; // false
1 == 2; // false
```
除了用于数值型变量比较外，还可以用于字符串类型进行比较，比较的时候遵循如下的规则:

>逐字比较字符码的大小，如果字符码相同就比较下一个字符，直到比较出结果或者比较完所有的字符。如果是非数字的字符串和数字进行比较，返回值永远是 false。

```js
"a" > "b"; // false
"a" < "b"; // true
"s" == "s"; // true
"abc" < "abd"; // true
"13" > "3"; // false
"13" > 3; // true
"a" > 0; // false
```
数字的字符型比较也遵循上述的原则，如果其中一个是数值(Number)类型则会隐式转化后比较。

### == === 运算法比较规则
在进行相等比较运算的时候，不同的数据类型比较遵循以下几条原则:

1. 布尔值比较运算前会被转换成数值，`true` 转化为 1，`false` 转化为 0；
2. 描述数字的字符串与数字进行比较前会被转化成数字。
3. 对象和字符串进行比较前，会将对象转换成字符串"[object object]"。
4. `null` 值和 `undefined` 值进行相等比较，结果返回为 `true`。
5. `NaN` 与 `NaN` 比较返回都是 `false`。

```js
true == 1; // true
2 == true; // false
false == 0; // true
"11" == 1; // false
const obj = {};
obj == "[object object]"; // true
1 != 2; // true
null == undefined; // true
!1 == true; // false
NaN == NaN; //false
```

=== 与 == 的区别不仅仅会比较值，还会比较数据类型,全部一直才返回`true`。

### && 、 || 、!逻辑运算符

* &&
>逻辑与运算符进行运算时只有两个操作数都为 true 的时候返回结果才是 true，否则返回 false。不过运算后的最终结果不一定是布尔值，转化规则如下:

1. 在两个对象间进行运算时，结果将返回第二个对象。
2. 在进行运算的两个数中，如果一个操作数为 `null`，则结果为 `null`。
3. 在进行运算的两个数中，如果一个操作数为 `NaN`，则结果为 `NaN`。
4. 在进行运算的两个数中，如果一个操作数为 `undefined`，则结果为 `undefined`。

```js
const obj = { name: "jack" };
{} && obj; // { name: "jack" };
null && true; // null
NaN && true; // NaN
undefined && false; // undefined
undefined && true; // undefined
```
* ||
>逻辑或运算符只要满足运算中的数值某一个为 true 即可返回 true，否则返回 false。

1. 如果有一个操作数为对象:

* 当对象为第 1 个操作数时，结果为对象本身。
* 当对象为第 2 个操作数时，如果第 1 个操作数为 false，则结果为对象本身，如果第 1 个操作数为 ture，则结果为 true。

```js
const obj = {};
obj || false; // {}
true || obj; // true
{} || obj; // {}
```


* !
>逻辑非运算符会将输入的值进行 Boolean 的转化。

1. 如果操作数是对象，则返回 `false`。
2. 如果操作数为 0，则返回 `true`。
3. 如果操作数为非 0 数字，则返回 `false`。
4. 如果操作数是 `null`，则返回 `true`。
5. 如果操作数是 `NaN`，则返回 `true`。
6. 如果操作数是 `undefined`，则返回 `true`。

```js
const obj = {};
!obj; // false
!0; // true
!1; // false
!null; // true
!NaN; // true
!undefined; // true
```

### 补充部分

1. **NaN**

`NaN`和其他任何类型比较永远返回`false`(包括和他自己)。

```js
NaN == NaN; // false
```

2. Boolean

`Boolean`和其他任何类型比较，`Boolean`首先被转换为`Number`类型。

true == 1; // true
true == "2"; // false
true == ["1"]; // true
true == ["2"]; // false

:::tip TIP

这也是为什么 `undefined`、`null` 和布尔值比较返回 `false` 的原因。

`false` 首先被转换成 0。

```js
undefined == false; // false
null == false; // false
```
:::

3. `String` 和 `Number`

`String` 和 `Number` 比较，先将 `String` 转换为 `Number` 类型。

```js
123 == "123"; // true
"" == 0; // true
```

4. `null` 和 `undefined`
`null` == `undefined` 比较结果是 `true`，除此之外，`null`、`undefined` 和其他任何结果的比较值都为 `false`。

```js
null == undefined; // true
null == ""; // false
null == 0; // false
null == false; // false
undefined == ""; // false
undefined == 0; // false
undefined == false; // false
```

5. 原始类型和引用类型
当原始类型和引用类型做比较时，对象类型会依照 `ToPrimitive` 规则转换为原始类型:

```js
"[object Object]" == {}; // true
"1,2,3" == [1, 2, 3]; // true
```

::: tip TIP
        
这里有一个常见的面试题:

```js
[] == ![]; // true

```
!的优先级高于==，![]首先会被转换为 false，然后根据上面第三点，false 转换成 Number 类型 0，左侧[]转换为 0，两侧比较相等。
:::

同理:
```js
([null] == false[undefined]) == // true
  false; // true
```

:::tip TIP
       
       一道有意思的面试题：
       
       如何让：a == 1 && a == 2 && a == 3?
       
   ```js
    // 解法1
       const a = {
         value: [3, 2, 1],
         valueOf: function() {
           return this.value.pop();
         },
       };
       // 解法2
       const a = {
         i: 1,
         toString: function() {
           return a.i++;
         },
       };
       // 解法3
       let val = 0;
       
       Object.defineProperty(window, "a", {
         get: function() {
           return ++val;
         },
       });
```
:::

## 数值类型转换

### 装箱和拆箱
* 装箱转换：把基本类型转换为对应的包装类型。
* 拆箱操作：把引用类型转换为基本类型。

**原始类型不能扩展属性和方法，那么我们是如何使用原始类型调用方法的呢？**

每当我们操作一个基础类型时，后台就会自动创建一个包装类型的对象，从而让我们能够调用一些方法和属性，例如下面的代码：

```js
const name = "Linda";
const name2 = name.substring(2);
```

上述代码的执行过程:

1. 创建一个String的包装类型实例.
2. 在实例上调用substring方法.
3. 销毁实例.

也就是说，我们使用基本类型调用方法，就会自动进行 `装箱` 和 `拆箱` 操作，相同的，我们使用 `Number` 和 `Boolean` 类型时，也会发生这个过程。

::: tip TIP

从引用类型到基本类型转换(拆箱)的过程中，会遵循 `ECMAScript` 规范规定的 `toPrimitive` 原则，一般会调用引用类型的 `valueOf` 和 `toString` 方法，我们也可以直接重写 `toPeimitive` 方法。
:::

一般转换成不同类型的值遵循的原则不同，例如：

* 引用类型转换为 `Number` 类型，先调用 `valueOf`，再调用 `toString`。
* 引用类型转换为 `String` 类型，先调用 `toString`，再调用 `valueOf`。

::: warning WARNING
            
若 `valueOf` 和 `toString` 都不存在，或者没有返回基本类型，则抛出 `TypeError` 异常。
:::

```js
const obj = {
  valueOf: () => { console.log('valueOf'); return 123; },
  toString: () => { console.log('toString'); return 'Linda'; },
};
console.log(obj - 1);   // valueOf 122
console.log(`Hello ${obj}`); // toString  Hello Linda

const obj2 = {
  [Symbol.toPrimitive]: () => { console.log('toPrimitive'); return 123; },
};
console.log(obj2 - 1);   // valueOf   122

const obj3 = {
  valueOf: () => { console.log('valueOf'); return {}; },
  toString: () => { console.log('toString'); return {}; },
};
console.log(obj3 - 1);  
// valueOf  
// toString
// TypeError
```

除了程序中的自动拆箱和自动装箱，我们还可以手动进行拆箱和装箱操作。我们可以直接调用包装类型的 `valueOf` 或 `toString`，实现拆箱操作。

```js
const num = new Number("123");  
console.log( typeof num.valueOf() ); // number
console.log( typeof num.toString() ); // string
```

## 连续赋值的问题

关于 `javascript` 连续赋值问题,我们先来看一段代码:

```js
let a = {n : 1};
let b = a;
a.x = a = {n: 2};       
console.log(a.x)  // undefined
console.log(b.x)  // {n:2}
console.log(a === b.x)  // true
```

首先`let a = {n : 1};`定义了一个引用类型变量`a`,在栈中存储了一个变量`a`的内存地址,在堆(内存)中开辟了一个空间存放对应的值`{n:1}`。

其次`let b = a;`在栈中写入了`b`,并将`a`指向堆中的地址索引赋值给了`b`。但是并没有开辟新的存储空间。

接下来执行`a.x = a = {n:2};`这段代码的执行顺序遵循如下原则:

`“.”的优先级高于“=”`  , 所以先计算a.x`，也就是在`a`中添加属性 `x`(此时这个`x`是`undefined`).`a-->{n:1,x:undefined}`)

这也是为什么直接引用一个未定义的变量会报错，但是直接引用一个对象的不存在的成员时，会返回 `undefined`。 

然后依循`从右往左`的复制运算顺序执行 `a = {n:2}`这时候，`a`指向的对象发生了改变，变成了新对象`{n:2}`。(可能你在这会有疑惑（重点），之前`a`不是指向了`{n:1,x:undefined}`吗，赋值不会影响他吗？原因是因为在执行（`a.x=`）的时候已经被挂起来等待赋值了，即使`a`发生了指向的变化，但也不再影响此刻的（`a.x`）了，因为已经对（`a.x`）进行了指向的确定，只不过他现在正在等待被赋值。`a`被重新赋值，此时`a`的指向也就变化了）
此时变成了 `a-->{n:2}，b-->{n:1,x:undefined} `

继续执行`a`.`x=a`相当于`a.x = {n: 2}`，由于在第三步时`a.x`已经被创建，并且等待赋值，所以`x = {n: 2}` 。
（`a.x`由于一直等待赋值一直被挂起，也就是一直保持着`{n:1,x:undefined}`对象`x`属性的访问，对象`{n:1,x:undefined}`由于一直有一个`b`的指向，所以不会被`JS`的垃圾回收机制给回收，赋值后对象变为了`{n:1,x:{n:2}}` ）

```js
let a = {n : 1};  
a.x = a = {n: 2};       
console.log(a.x)  // undefined
```

::: tip TIP
        
总结:

基础类型的存储是存在栈中的,引用类型的存储是在栈中存储堆的索引,在堆中开辟空间存储变量的值。

当访问一个对象的属性的时候,如果属性不存在会被赋值为 `undefined`。

当进行连续赋值的时候,.属性访问优先级会大于=赋值,且当成员等待赋值的时候,锁定的赋值目标是成员，而非对象。

对象重新赋值时，并非是修改原堆内存的值，而是重新分配堆内存，栈内存中的指针会做相应修改。

如果原堆内存有多个栈内存指向它，由于引用还存在，原堆内存的数据不会消失。如果堆内存再无其它引用，则会被`JS`的垃圾回收机制回收。对象的成员对象也一样。
:::

## toString 方法介绍

**要把一个值转换为一个字符串有两种方式。**

1. 第一种是使用几乎每个值都有的 `toString()`方法
2. 还可以使用转型函数 `String()`，这个函数能够将任何类型的值转换为字符串。

`数值`、`布尔值`、`对象` 和 `字符串值` 都有`toString()`方法。但`null`和 `undefined` 值没有这个方法。

多数情况下，调用`toString()`方法不必传递参数。但是，在调用数值的`toString()`方法时，可以传递一个参数：输出数值的基数。

```js
let num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```

**`String()`函数遵循下列转换规则：**
如果值有`toString()`方法，则调用该方法（没有参数）并返回相应的结果；
如果值是`null`，则返回`null`；
如果值是`undefined`，则返回`undefined`。

```js
let value1 = 10;
let value2 = true;
let value3 = null;
let value4;
alert(String(value1)); // "10"
alert(String(value2)); // "true"
alert(String(value3)); // "null"
alert(String(value4)); // "undefined"
```

::: tip TIP
        
`toString()`方法与`String()`方法的一个区别就是转换`null`与`undefiend`类型时的区别。

`String()`方法可以执行,`toString()`方法则会报错。
:::

**引申: 字符串是否有最大长度?**

`String` 用于表示文本数据。`String` 有个最大长度是 `2^53 - 1`,有趣的是这个所谓的最大长度,并不是我们理解中的字符数。

因为 `String` 的意义并非字符串,二是字符串的 `UTF16` 编码,我们字符串的操作 `charAt`、`charCodeAt`、`length` 等方法针对的都是 `UTF16` 编码。所以,字符串的最大长度,实际上是受字符串的编码长度影响的。

然而,现在字符集国际标准,字符是以 `Unicode` 的方式表示的,每一个 Unicode 的码表示一个字符,理论上 `Unicode` 的范围是无限的。

试题: `12.toString()`输出结果是什么?为什么?

```js
// Uncaught SyntaxError: Invalid or unexpected token
12.toString();

// 12
12 .toString();

// 12
12..toString();

// Uncaught SyntaxError: Invalid or unexpected token
12...toString();
```

`12.` 会被当作省略了小数点后面部分的数字，而单独看成一个整体,所以我们要想让点单独成为一个 `token`，就要加入空格。

**使用小技巧**

::: tip TIP
在 `Javascript` 中,可以使用反斜杠进行字符串的折行编写，有些时候这样做可以使你的代码看起来更加漂亮，示例如下:

```js
// 使用反斜杠进行字符串的折行
var text =
  "啊哈哈哈哈\
  你猜我是谁?\
  猜对了我就给你一颗糖\
";
```
:::

## `Object` 类型

对象可以通过执行`new`操作符后跟要创建的对象类型的名称来创建。

而创建`Object`类型的实例并为其添加属性和（或）方法，就可以创建自定义对象，如下所示：

```js
let o = new Object(); 
```

`Object` 的每个实例都具有下列属性和方法:

* `constructor`：保存着用于创建当前对象的函数。对于前面的例子而言，就是`Object()`。

* `hasOwnProperty(propertyName)`：用于检查给定的属性在当前对象实例中（而不是在实例的原型中)是否存在。 其中，作为参数的属性`propertyName`必须以字符串形式指定（例如：`o.hasOwnProperty("name")`)。

* `isPrototypeOf(object)`：用于检查传入的对象是否是传入对象的原型。

* `propertyIsEnumerable(propertyName)`：用于检查给定的属性是否能够使用`for-in`语句来枚举。与 `hasOwnProperty()`方法一样，作为参数的属性名必须以字符串形式指定。

* `toLocaleString()`：返回对象的字符串表示，该字符串与执行环境的地区对应。

* `toString()`：返回对象的字符串表示。

* `valueOf()`：返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值相同。

由于在`ECMAScript`中`Object`是所有对象的基础，因此所有对象都具有这些基本的属性和方法。

### 创建`object`类型的方式

1. new + Object构造函数。
2. 对象字面量方法。

```js
// new + constructor
let person = new Object(); // //与 var person = {} 相同
person.name = "Nicholas"; 
person.age = 29;

// 对象字面量
let person = { 
 name : "Nicholas", 
 age : 29 
};
```

**Object.create(null)**
```js
// 当我们使用Object.create(null)创建的对象不是Object的子类

const a = {};
const b = Object.create(null);

a == b // false

typeof a;// object
typeof b;// object

a instanceof Object;// true
b instanceof Object;// false

a.toString();// [object Object]
b.toString();// VM274:1 Uncaught TypeError: b.toString is not a function
```

### `javascript` 对象的特征

`JavaScript` 对象的本质有如下几个特点:

对象具有唯一标识性: 即使完全相同的两个对象,也并非同一个对象。

对象有状态: 对象具有状态,同一对象可能处于不同的状态之下。

对象具有行为: 即对象的状态,可能因为它的行为产生变迁。

### 对象具有唯一标识性

一般而言,各种语言的对象唯一标识性都是用内存地址来实现的，对象具有唯一的内存地址，所以具有唯一的标识。

在`javascript`中对象其实是互不相等的,如下这个示例, O1 和 O2乍看起来是两个一模一样的对象,但是结果是不相等的。

```js
var o1 = { a: 1};
var o2 = { a: 1};

o1 == o2 // false
```

### 对象有状态和行为

在`javascript`中，将状态和行为统一抽象为属性。将函数设计成一种特殊对象，所以`Javascript`中的行为和状态都能用属性来抽象。

```js
let obg = {
    a: 1,
    f(){
        console.log(this.a);
    }
}
```

## `Array`类型

除了 `Object` 之外，`Array` 类型恐怕是 `ECMAScript` 中最常用的类型了。

**创建Array类型的方式**

1. `new` + `Array` 构造函数。
2. 用数组字面量表示法。

```js
let colors = new Array(3);
let colors = ["red", "blue", "green"];
```

数组的项数保存在其 `length` 属性中，这个属性始终会返回 0 或更大的值.

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
let names = []; // 创建一个空数组
alert(colors.length); //3 
alert(names.length); //0
```

数组的 `length` 属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移 除项或向数组中添加新项。请看下面的例子：

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2; 
alert(colors[2]); // undefined 
```

这个例子中的数组 `colors` 一开始有 3 个值。将其 `length` 属性设置为 2 会移除最后一项），结果再访问 `colors[2]`就会显示 `undefined` 了。

如果将其 `length` 属性设置为大于数组项数的值，则新增的每一项都会取得 `undefined` 值，如下所示：

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 4; 
alert(colors[3]);// undefined
```

### 数组常用方法

1. `push()`向数组的末尾添加一个或多个元素，返回新的数组长度。原数组改变。
2. `pop()` 删除并返回数组的最后一个元素，若该数组为空，则返回 `undefined`。原数组改变。
3. `unshift()`向数组的开头添加一个或多个元素，返回新的数组长度。原数组改变。
4. `shift()`删除数组的第一项，并返回第一个元素的值。若该数组为空，则返回 `undefined`。原数组改变。
5. `concat(arr1,arr2...)`，合并两个或多个数组，生成一个新的数组。原数组不变。
6. `join(type)` 将数组的每一项用指定字符连接返回一个字符串。默认连接字符为逗号。原数组不变。
7. `reverse()`将数组倒序，返回倒序后的数组，原数组改变。
8. `sort()`，对数组元素进行排序,返回排序后的数组。按照字符串UniCode码排序，原数组改变。从小到大 a-b，从到到小 b-a。
9. `map(currentItem,index,array)`，原数组的每一项执行函数后，返回一个新的数组。原数组不变。
10. `slice(start,end)`从`start`开始，`end`之前结束，不到`end`；如果不给`end`值，从`start`开始到数组结束。`start`可以给负值，-1表示数组最后位置，-2表示倒数第二个，以此类推，顾前不顾后。原数组不变。
11. `splice(index,howmany,arr1,arr2...)` 删除元素并添加元素，从  `index` 位置开始删除  `howmany` 个元素，并将`arr1、arr2...`数据从`index`位置依次插入。`howmany` 为0时，则不删除元素。原数组改变。
12. `forEach(item,callback)`，用于调用数组的每个元素，并将元素传递给回调函数。原数组不变。
13. `filter(function)`，过滤数组中，符合条件的元素并返回一个新的数组。原数组不变。
14. `every(function)`，对数组中的每一项进行判断，若都符合则返回true，否则返回false。原数组不变。
15. `some(function)`，对数组中的每一项进行判断，若都不符合则返回false，否则返回true。原数组不变。
16. `reduce(prev,cur,index,array)`，`reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。原数组不变。

## 或与非 || && ！

逻辑非操作符也可以用于将一个值转换为与其对应的布尔值。而同时使用两个逻辑非操作符，实际上就会模拟`Boolean()`转型函数的行为。

其中，第一个逻辑非操作会基于无论什么操作数返回一个布尔值，而第二个逻辑非操作则对该布尔值求反，于是就得到了这个值真正对应的布尔值。

```js
alert(!!"blue"); // true 
alert(!!0); // false 
alert(!!NaN); // false 
alert(!!""); // false 
alert(!!12345); // true 
null == undefined; // true
null === undefined; // false
```

## `try.catch` 简单介绍

`dome`如下
```js
function foo (){
    try {
        return 0;
    }catch(err){
        console.error(err);
    }finally{
        console.log('finally');
    }
}

// finally return 0;
console.log(foo());
```

```js
function foo (){
    try {
        return 0;
    }catch(err){
        console.error(err);
    }finally{
        return 'finally';
    }
}

// finally 
console.log(foo());
```

上述代码的执行结果是: `finally` 中的 `return` 覆盖了 `try` 中的 `return`。在一个函数中执行了两次 `return`,这已经超出了很多人的常识,也是其他语言中不会出现的一种行为。 

产生上述执行结果的实质原因是背后运行的`Completion Record`机制。

**Completion Record机制**


表示一个语句执行完成之后的结果,它有3个字段:

1. `type`: 表示完成的类型,有 `break`、`continue`、`return`、`throw` 和 `normal` 几种类型。

2. `value`: 表示语句的返回值,如果语句没有返回值,则是 `empty`。

3. `target`: 表示语句的目标,通常是一个 `javascript` 标签。

`Javascript` 正是依靠语句的`CompletionRecord`类型才可以在语句的复杂嵌套结构中 ,实现各种控制。

![base-js15](/images/base-js15.png)

**普通语句**

这些语句在执行时,从前到后顺次执行,没有任何分支或者重复执行逻辑。

普通语句执行完成后,会得到`type`为`normal`的`Completion Record`, `javascript` 引擎遇到这样的记录就会执行下一条语句。

这些语句中只有表达式语句会产生 `value` ,从引擎的角度,这个 `value` 并没有什么用处,这就像我们在 `Chrome` 的控制台调式工具中输入一个表达式是可以得到结果的,但是在表达式前面加上 `var`,就变成了 `undefined`。这也说明了 `Chrome` 控制台输出的是语句的 `Completion Record` 的`value`值。

**语句块**


语句块就是拿大括号括起来的一组语句,它是一种语句的复合结构,可以嵌套。

在使用语句块的时候,我们需要注意的是语句块内部的`Completion Recordtype`如果不是`normal`的话,就会打断语句块后续的执行。

**控制型语句**
控制型语句带有 `if`、`switch` 关键字,它们会对不同类型的`Completion Record`产生反应。

![base-js16.png](/images/base-js16.png)
通过这个表我们发现,因为 `finally` 中的内容必须保证执行,所以`try/catch`执行完毕,即使得到的结果是非`normal`类型的完成记录,也必须要执行 `finally`。

而当 `finally` 执行也得到了了非 `normal` 的记录,则会是 `finally` 中的记录作为整个 `try` 结构的结果。

**带标签的语句**


前文阐述了一些 `type` 在语句中的作用,接下来涉及到 `target`。

实际上,任何 `javascript` 语句是可以加标签的,在语句前面加冒号即可:

```js
firstStatement: let a = 1;
```
大部分的时候,这个东西类似于注释,没有任何作用。唯一有作用的时候是: 与完成记录类型中的`target`相配合,用于跳出多层循环。

```js
outer: while(true){
    inner: while(true){
        break outer;
    }
}

console.log('finished');
```

`break/continue` 语句如果后跟了关键字,会产生带`target`的完成记录。一旦完成记录带了`target`,那么只有拥有对应`label`的循环语句会消费它。

::: tip TIP
        
总结:

因为 `Javascript` 语句存在嵌套关系,所以只需过程实际上主要在一个树形结构上进行,树形结构的每一个节点执行后产生`Completion Record`,根据语句的结构和`Completion Record`,`Javascript` 实现了各种分支合跳出逻辑。
:::

  
## `with` 语句

`with` 语句的作用是将代码的作用域设置到一个特定的对象中。

> with (expression) statement;

定义 with 语句的目的主要是为了简化多次编写同一个对象的工作，如下面的例子所示:

```js
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;
```

上面几行代码都包含`location`对象。如果使用`with`语句，可以把上面的代码改写成如下所示:

```js
with(location){
    let qs = search.substring(1);
    let hostName = hostname;
    let url = href;
}
```
在这个重写后的例子中，使用 `with` 语句关联了 `location` 对象。

这意味着在 `with` 语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询 `location` 对象中是否有同名的属性。如果发现了同名属性，则以 `location` 对象属性的值作为变量的值。

::: warning WARNING

严格模式下不允许使用with语句，否则将视为语法错误。
:::

## 执行环境和作用域

>执行环境（`execution context`，为简单起见，有时也称为“环境”）是 `JavaScript` 中最为重要的一个概念。
执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（`variable object`），
环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

**执行环境**

1. `全局执行环境`:
   这是默认或者说是最基础的执行上下文，一个程序中只会存在一个全局上下文，它在整个 `javascript` 脚本的生命周期内都会存在于执行堆栈的最底部不会被栈弹出销毁。全局上下文会生成一个全局对象（以浏览器环境为例，这个全局对象是 `window`），并且将 `this` 值绑定到这个全局对象上。
   
2. `函数执行环境`:
每当一个函数被调用时，都会创建一个新的函数执行上下文（不管这个函数是不是被重复调用的）。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。

3. `Eval 函数执行上下文`:
执行在 `eval` 函数内部的代码也会有它属于自己的执行上下文，但由于并不经常使用 eval，所以在这里不做分析。

::: tip TIP
        
* 当函数运行的时候，会生成一个叫做 “执行上下文” 的东西，也可以叫做执行环境，它用于保存函数运行时需要的一些信息,它是一个栈结构数据，全局上下文永远在该栈的最底部，每当一个函数执行生成了新的上下文，该上下文对象就会被压入栈，但是上下文栈有容量限制，如果超出容量就会栈溢出。

* 执行上下文内部存储了包括：变量对象、作用域链、this 指向 这些函数运行时的必须数据。

* 变量对象构建的过程中会触发变量和函数的声明提升。

* 函数内部代码执行时，会先访问本地的变量对象去尝试获取变量，找不到的话就会攀爬作用域链层层寻找，找到目标变量则返回，找不到则 undefined。

```js
// 示例代码
var name = "Jack";
function func() {
  console.log(name); // 访问全局作用域
}

function func2() {
  var name = "啊哈哈";
  console.log(name); // 访问函数内部作用域
}

func(); // Jack
func2(); // 啊哈哈
```

* 一个函数能够访问到的上层作用域，在函数创建的时候就已经被确定且保存在函数的 `[[scope]]` 属性里，和函数拿到哪里去执行没有关系。

* 一个函数调用时的 this 指向，取决于它的调用者，通常有以下几种方式可以改变函数的 `this` 值：`对象调用`、`call`、`bind`、`apply`。

* 在 Web 浏览器中，全局执行环境被认为是 `window` 对象，因此所有全局变量和函数都是作为 `window` 对象的属性和方法创建的。

* 某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁(**全局执行环境直到应用程序退出——例如关闭网页或浏览器时才会被销毁**)。
:::

### 作用域链

当代码在一个环境中执行时，会创建变量对象的一个`作用域链（scope chain）`。

>作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。

如果这个环境是函数，则将其活动对象（`activation object`）作为变量对象。活动对象在最开始时只包含一个变量，即 `arguments` 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延 续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。

### 延长作用域

虽然执行环境的类型总共只有两种——全局和局部（函数），但还是有其他办法来延长作用域链。这么说是因为有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。

1. `try-catch` 语句的 `catch` 块；
2. `with` 语句。

### 词法作用域

词法作用域（`Lexical Scopes`）是 `javascript` 中使用的作用域类型，词法作用域 也可以被叫做 `静态作用域`，与之相对的还有 `动态作用域`。那么 `javascript` 使用的 `词法作用域` 和 `动态作用域` 的区别是什么呢？看下面这段代码：

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();

// 结果是: 1
```

**这个关键的问题就是 `javascript` 中的作用域类型——`词法作用域`。**

::: tip TIP

词法作用域，就意味着函数被定义的时候，它的作用域就已经确定了，和拿到哪里执行没有关系，因此词法作用域也被称为 静态作用域。
:::

如果是动态作用域类型，那么上面的代码运行结果应该是 bar 作用域中的 2 。也许你会好奇什么语言是动态作用域？bash 就是动态作用域，感兴趣的小伙伴可以了解一下。

### 块级作用域

什么是块级作用域呢？简单来说，花括号内 {...} 的区域就是块级作用域区域。

很多语言本身都是支持块级作用域的。上面我们说，`javascript` 中大部分情况下，只有两种作用域类型：`全局作用域` 和 `函数作用域`，那么 `javascript` 中有没有块级作用域呢？来看下面的代码：

```js
if (true) {
  var a = 1;
}

console.log(a); // 结果:1
```
运行后会发现，结果还是 1，花括号内定义并赋值的 a 变量跑到全局了。这足以说明，`javascript` 不是原生支持块级作用域的。

::: tip TIP
        
但是 ES6 标准提出了使用 let 和 const 代替 var 关键字，来创建块级作用域。也就是说，上述代码改成如下方式，块级作用域是有效的：
```js
if (true) {
  let a = 1;
}

console.log(a); // ReferenceError
```
:::

### 创建作用域

在 javascript 中，我们有几种创建 / 改变作用域的手段：

1. 定义函数，创建函数作用（推荐）：
```js
function foo() {
  // 创建了一个 foo 的函数作用域
}
```
2. 使用 let 和 const 创建块级作用域（推荐）：
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i); // ReferenceError
```
3. try catch 创建作用域（不推荐）,err 仅存在于 catch 子句中：
```js
try {
  undefined(); // 强制产生异常
} catch (err) {
  console.log(err); // TypeError: undefined is not a function
}

console.log(err); // ReferenceError: `err` not found
```
4. 使用 eval “欺骗” 词法作用域（不推荐）：
```js
function foo(str, a) {
  eval(str);
  console.log(a, b);
}

var b = 2;

foo("var b = 3;", 1); // 1 3
```

5. 使用 `with` 欺骗词法作用域（不推荐）：
```js
function foo(obj) {
  with (obj) {
    a = 2;
  }
}

var o1 = {
  a: 3,
};

var o2 = {
  b: 3,
};

foo(o1);
console.log(o1.a); // 2

foo(o2);
console.log(o2.a); // undefined
console.log(a); // 2 -- 全局作用域被泄漏了！
```

### 作用域的应用场景

作用域的一个常见运用场景之一，就是 `模块化`。

>由于 `javascript` 并未原生支持模块化导致了很多令人口吐芬芳的问题，比如全局作用域污染和变量名冲突，代码结构臃肿且复用性不高。在正式的模块化方案出台之前，开发者为了解决这类问题，想到了使用函数作用域来创建模块的方案。

```js
function module1() {
  var a = 1;
  console.log(a);
}

function module2() {
  var a = 2;
  console.log(a);
}

module1(); // => 1
module2(); // => 2
```

上面的代码中，构建了 `module1` 和 `module2` 两个代表模块的函数，两个函数内分别定义了一个同名变量 `a` ，由于函数作用域的隔离性质，这两个变量被保存在不同的作用域中（不嵌套），`JS` 引擎在执行这两个函数时会去不同的作用域中读取，并且外部作用域无法访问到函数内部的 `a` 变量。这样一来就巧妙地解决了 `全局作用域污染` 和 `变量名冲突` 的问题；并且，由于函数的包裹写法，这种方式看起来封装性好多了。

然而上面的函数声明式写法，看起来还是有些冗余，更重要的是，`module1` 和 `module2` 的函数名本身就已经对全局作用域造成了污染。我们使用匿名函数来继续改写：

```js
// module1.js
(function() {
  var a = 1;
  console.log(a);
})();

// module2.js
(function() {
  var a = 2;
  console.log(a);
})();
```

将函数声明改写成立即调用函数表达式（`Immediately Invoked Function Expression` 简写 `IIFE`），封装性更好，代码也更简洁，解决了模块名污染全局作用域的问题。

::: tip TIP
        
函数声明和函数表达式，最简单的区分方法，就是看是不是 function 关键字开头：是 function 开头的就是函数声明，否则就是函数表达式。
:::

上面的代码采用了 `IIFE` 的写法，已经进化很多了，我们可以再把它强化一下，强化成后浪版，赋予它判断外部环境的权利——选择的权力。

```js
(function (global) {
  if (global...) {
    // is browser
  } else if (global...) {
    // is nodejs
  }
})(window);
```

## 垃圾回收机制

`JavaScript` 具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。

这种垃圾收集机制的原理其实很简单:找出那些不再继续使用的变量，然后释放其占用的内存。为此，垃圾收集器会按照固定的时间间隔(或代码执行中预定的收集时间)，周期性地执行这一操作。

**分类：**

1. 标记清除(mark-and-sweep).
2. 引用计数(reference counting)

### `标记清除`

`JavaScript` 中最常用的垃圾收集方式是标记清除。

当变量进入环境(例如，在函数中声明一个变量)时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

### `引用计数`

引用计数的含义是跟踪记录每个值被引用的次数。

当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。 如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。

当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为0的值所占用的内存。

```js
function problem(){ 
    let objectA = new Object(); 
    let objectB = new Object(); 
    objectA.someOtherObject = objectB; 
    objectB.anotherObject = objectA; 
}
```

在这个例子中，`objectA` 和 `objectB` 通过各自的属性相互引用；也就是说，这两个对象的引用次数都是2。

在采用标记清除策略的实现中，由于函数执行之后，这两个对象都离开了作用域，因此这种 相互引用不是个问题。

但在采用引用计数策略的实现中，当函数执行完毕后，`objectA` 和 `objectB` 还 将继续存在，因为它们的引用次数永远不会是0。假如这个函数被重复多次调用，就会导致大量内存得不到回收。

### 管理内存

确保占用最少的内存可以让页面获得更好的性能。

而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 `null` 来释放其引用——这个做法叫做解除引用（`dereferencing`）。

```js
function createPerson(name){
    let localPerson = new Object();
    localPerson.name = name;
 }
let globalPerson = createPerson("Nicholas"); 
// 手工解除 globalPerson 的引用
globalPerson = null;
```

:::tip TIP

解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。
:::

## `RegExp` 正则表达式

* `g`: 表示全局(`global`)模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止。
* `i`:表示不区分大小写(`case-insensitive`)模式，即在确定匹配项时忽略模式与字符串的大小写;
* `m`:表示多行(`multiline`)模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

### 常用正则表达式字符含义

* `\` : 在非特殊字符之前的反斜杠表示下一个字符是特殊字符，不能按照字面理解。
>例如，前面没有 "" 的 "b" 通常匹配小写字母 "b"，即字符会被作为字面理解，无论它出现在哪里。但如果前面加了 ""，它将不再匹配任何字符，而是表示一个字符边界。在特殊字符之前的反斜杠表示下一个字符不是特殊字符，应该按照字面理解。

* `^`: 匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。
>例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。

* `$`: 匹配输入的结束。如果多行标示被设置为 true，那么也匹配换行符前的位置。
>例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。

* `*`: 匹配前一个表达式 0 次或多次。等价于 {0,}。
>例如，/bo*/ 会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中不会匹配任何内容。

* `+`: 匹配前面一个表达式 1 次或者多次。等价于 {1,}。
>例如，/a+/ 会匹配 "candy" 中的 'a' 和 "caaaaaaandy" 中所有的 'a'，但是在 "cndy" 中不会匹配任何内容。

* `?`: 匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。
> 例如，/e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。

:::tip TIP

如果紧跟在任何量词 `*`、`+`、`?` 或 `{}` 的后面，将会使量词变为非贪婪（匹配尽量少的字符）,和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。

例如，对 "123abc" 使用 /\d+/ 将会匹配 "123"，而使用 /\d+?/ 则只会匹配到 "1"。
:::

* `.`: （小数点）默认匹配除换行符之外的任何单个字符。
>例如，/.n/ 将会匹配 "nay, an apple is on the tree" 中的 'an' 和 'on'，但是不会匹配 'nay'。如果 s ("dotAll") 标志位被设为 true，它也会匹配换行符。

* `(x)`: 像下面的例子展示的那样，它会匹配 'x' 并且记住匹配项。其中括号被称为`捕获括号`。

>模式`/(foo) (bar) \1 \2/ 中的 '(foo)' 和 '(bar)'`匹配并记住字符串 `foo bar foo bar`中前两个单词。 模式中的 \1 和 \2 表示第一个和第二个被捕获括号匹配的子字符串，即 foo 和 bar，匹配了原字符串中的后两个单词。 注意 `\1、\2、...、\n`是用在正则表达式的匹配环节。 而在正则表达式的替换环节，则要使用像 `$1、$2、...、$n` 这样的语法， 例如，`'bar foo'.replace(/(...) (...)/, '$2 $1')`。$& 表示整个用于匹配的原字符串。

* `x(?=y)`: 匹配'x'仅仅当'x'后面跟着'y'.这种叫做先行断言。

>例如，/Jack(?=Sprat)/会匹配到'Jack'仅仅当它后面跟着'Sprat'。 /Jack(?=Sprat|Frost)/匹配‘Jack’仅仅当它后面跟着'Sprat'或者是‘Frost’。但是‘Sprat’和‘Frost’都不是匹配结果的一部分。

* `(?<=y)x`: 匹配'x'仅仅当'x'前面是'y'.这种叫做后行断言。

> 例如，/(?<=Jack)Sprat/会匹配到' Sprat '仅仅当它前面是' Jack '。/(?<=Jack|Tom)Sprat/匹配‘ Sprat ’仅仅当它前面是'Jack'或者是‘Tom’。但是‘Jack’和‘Tom’都不是匹配结果的一部分。

* `x(?!y)`: 仅仅当'x'后面不跟着'y'时匹配'x'，这被称为正向否定查找。

> 例如，仅仅当这个数字后面没有跟小数点的时候，/\d+(?!.)/ 匹配一个数字。正则表达式/\d+(?!.)/.exec("3.141")匹配‘141’而不是‘3.141’

* `(?<!y)x`: 仅仅当'x'前面不是'y'时匹配'x'，这被称为反向否定查找。

>例如, 仅仅当这个数字前面没有负号的时候，/(?<!-)\d+/ 匹配一个数字。/(?<!-)\d+/.exec('3') 匹配到 "3"./(?<!-)\d+/.exec('-3') 因为这个数字前有负号，所以没有匹配到。

* `x|y`: 匹配‘x’或者‘y’。

>例如，/green|red/匹配“green apple”中的‘green’和“red apple”中的‘red’

* `{n}`:n 是一个正整数，匹配了前面一个字符刚好出现了 n 次。

> 比如， /a{2}/ 不会匹配“candy”中的'a',但是会匹配“caandy”中所有的 a，以及“caaandy”中的前两个'a'。

* `{n,}`: n是一个正整数，匹配前一个字符至少出现了n次。

> 例如, /a{2,}/ 匹配 "aa", "aaaa" 和 "aaaaa" 但是不匹配 "a"。

* `{n,m}`: n 和 m 都是整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略。

>例如，/a{1, 3}/ 并不匹配“cndy”中的任意字符，匹配“candy”中的a，匹配“caandy”中的前两个a，也匹配“caaaaaaandy”中的前三个a。注意，当匹配”caaaaaaandy“时，匹配的值是“aaa”，即使原始的字符串中有更多的a。

* `\d`: 匹配一个数字。等价于[0-9]。

>例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'。

* `\D`: 匹配一个非数字字符。等价于[^0-9]。

>例如， /\D/ 或者 /[^0-9]/ 匹配"B2 is the suite number."中的'B' 。

* `\n*: 匹配一个换行符 (U+000A)。

* `\f` : 匹配一个换页符 (U+000C)。

* `\r`: 匹配一个回车符 (U+000D)。

* `\s`: 匹配一个空白字符，包括空格、制表符、换页符和换行符。

>例如, /\s\w*/ 匹配"foo bar."中的' bar'。

* `\S`: 匹配一个非空白字符。

> 例如，/\S\w*/ 匹配"foo bar."中的'foo'。

* `\t`: 匹配一个水平制表符 (U+0009)。

* `\v`: 匹配一个垂直制表符 (U+000B)。

* `\w`: 匹配一个单字字符（字母、数字或者下划线）。等价于[A-Za-z0-9_]。

>例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。

* `\W`: 匹配一个非单字字符。等价于 [^A-Za-z0-9_]。

>例如, /\W/ 或者 /[^A-Za-z0-9_]/ 匹配 "50%." 中的 '%'。

* `\b`: 匹配一个零宽单词边界，即\w和\W之间的位置，或字符串首位与\w或\w与字符串末尾的位置。

>例如, /\b/ 匹配 "aa bb"中的 空格。

* `\B`: 匹配一个零宽非单词边界。

>例如, /\B/ 匹配 "aa bb"中的 空格。

**常用方法与描述**
| 方法 | 描述 |
| --- | --- |
|`exec`|	一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。|
|`test`|	一个在字符串中测试是否匹配的RegExp方法，它返回 true或 false。|
|`match`|	一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。|
|`matchAll`|	一个在字符串中执行查找所有匹配的String方法，它返回一个迭代器（iterator）。|
|`search`|	一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。|
|`replace`|	一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。|
|`split`|	一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的String 方法。|

## 函数

函数是 `javascript` 中相当重要的一部分,我们通过以下几个方面来理解他。

### 函数中的参数

`ECMAScript` 函数的参数与大多数其他语言中函数的参数有所不同。`ECMAScript` 函数不介意传递进来多少个参数，也不在乎传进来参数是什么数据类型。

也就是说，即便你定义的函数只接收两个参数，在调用这个函数时也未必一定要传递两个参数。可以传递一个、三个甚至不传递参数，而解析器永远不会有什么怨言。

之所以会这样，原因是 `ECMAScript` 中的参数在内部是用一个数组来表示的。

函数接收到的始终都是这个数组，而不关心数组中包含哪些参数。如果这个数组中不包含任何元素，无所谓；如果包含多个元素，也没有问题。

::: tip TIP
        
实际上，在函数体内可以通过 `arguments` 对象来访问这个参数数组，从而获取传递给函数的每一个参数。
:::

::: warning WARNING

由于大量使用 `with` 语句会导致性能下降，同时也会给调试代码造成困难，因此在开发大型应用程序时，不建议使用 `with` 语句。
::: 
           
### 函数中的属性

在函数的内部，有两个特殊的对象: `arguments` 和 `this`。

`arguments` 是一个类数组对象，包含着传入函数中的所有参数,有一个 `callee` 的属性，该属性是一个指针，指向拥有这个 `arguments` 对象的函数。

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1); // 指向了factorial
  }
}
```
每个函数都包含两个属性：`length` 和 `prototype`。

其中，`length` 属性表示函数希望接收的命名参数的个数，如下面的例子所示:

```js
function sayName(name) {
  alert(name);
}
function sum(num1, num2) {
  return num1 + num2;
}
function sayHi() {
  alert("hi");
}
alert(sayName.length); //1
alert(sum.length); //2
alert(sayHi.length); //0
```
::: tip TIP

在 `ECMAScript5` 中，`prototype` 属性是不可枚举的，因此使用 `for-in` 无法发现。 函数是对象，函数名是指针。
:::

### `apply` 与 `call`

每个函数都包含两个非继承而来的方法:`apply()`和 `call()`。

>这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。

::: tip TIP

使用 `call()`（或 `apply()`）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。
:::

* `apply()`方法接收两个参数:一个是在其中运行函数的作用域，另一个是参数数组。第二个参数可以是 `Array` 的实例，也可以是 `arguments` 对象。例如:
```js
function sum(num1, num2) {
  return num1 + num2;
}
function callSum1(num1, num2) {
  return sum.apply(this, arguments);
}
function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]);
}
alert(callSum1(10, 10)); // 20
alert(callSum2(10, 10)); // 20
```

* `call()`方法与` apply()`方法的作用相同，它们的区别仅在于接收参数的方式不同。对于 `call()`方法而言，第一个参数是 `this` 值没有变化，变化的是传递给函数的参数必须逐个列举出来。

```js
function sum(num1, num2) {
  return num1 + num2;
}
function callSum(num1, num2) {
  return sum.call(this, num1, num2);
}
alert(callSum(10, 10)); // 20
```

### 函数声明与函数表达式

关于函数声明，它最重要的一个特征就是函数声明提升，意思是执行代码之前先读取函数声明。这意味着可以把函数声明放在调用它的语句之后。

```js
// 函数声明
function hello(type) {
  return "hello world";
}

// 函数表达式
hello(); // VM1155:1 Uncaught ReferenceError: Cannot access 'hello' before initialization

// 变量赋值语句
const hello = function() {
  return "hello world";
};
```
::: tip TIP

函数声明与函数表达式的区别：

函数声明存在变量提升，可以先使用再声明。函数表达式必须先定义再使用。

函数表达式中，创建的函数叫做匿名函数，因为 `function` 关键字后面没有标识符。
:::

### 匿名函数与具名函数

* `匿名函数`，顾名思义就是没有名字的函数。上面的函数表达式中的创建，实际上是创建一个匿名函数，并将匿名函数赋值给变量 `hello`,调用 `hello` 来进行函数的调用，调用的方式就是在变量 `hello` 后面加上一对括号()。
这是一种常见的匿名函数调用方式,我们再来看看另外一种调用方式:

```js
(function(x, y) {
  return x + y;
})(2, 3); // 5

new Function("x", "y", "return x+y")(2, 3); // 5
```

上述的例子中运用到了一个知识点,在 `javascript` 中，是没有块级作用域这种说法的，以上代码的这种方式就是模仿了块级作用域(通常成为私有作用域)，语法如下所示：

```js
(function() {
  //这里是块级作用域
})();
```

上述代码定义并立即调用了一个匿名函数。经函数声明包含在一对圆括号中，表示它实际上是一个函数表达式。而紧随其后的另一对圆括号会立即调用这个函数。然而要注意一点:

```js
function(){

}();
```

上面的代码是错误的，因为 `javascript` 将 `function` 关键字当作一个函数声明的开始，而函数声明后面不能加圆括号，如果你不显示告诉编译器，它会默认生成一个缺少名字的 `function`，并且抛出一个语法错误，因为 `function` 声明需要一个名字。

有趣的是，即便你为上面那个错误的代码加上一个名字，他也会提示语法错误，只不过和上面的原因不一样。提示为：`Uncaught SyntaxError: Unexpected token (`。


::: tip TIP

在一个表达式后面加上括号()，该表达式会立即执行，但是在一个语句后面加上括号()，是完全不一样的意思，只是分组操作符。
:::

```js
function test(){
   alert('测试是否弹窗')
}()
// SyntaxError: Unexpected token )
// 报错因为分组操作符需要包含表达式

function test(){
    alert('测试是否弹窗')
}(1)
// (1) => 等价于 1
// 相当于test方法后面个跟了一个无关系的表达式子:(1)
```

所以上面代码要是想要得到想要的弹窗提示，就必须要实现赋值，如:

```js
let a = function() {
  alert("测试是否弹窗");
}();
// 弹窗提示成功 a 被复制成自动用函数的返回值
```

::: tip TIP

a= 这个片段告诉了编译器这个是一个函数表达式，而不是函数的声明。因为函数表达式后面可以跟圆括号。
:::``````````````````

因此下面两段代码是等价的:
```js
var aa = function(x) {
  alert(x);
}(5)//弹窗显示：5

(function(x) {
    alert(x);
  }
)(5); //弹窗显示：5
```

从上面对于函数和匿名函数的了解，我们引申出来了一个概念，即自执行函数。那为什么 `a =function(){}()` 这种表示方法可以让编译器认为这个是一个函数表达式而不是一个函数的声明？

### 自执行匿名函数

从上面对于函数和匿名函数的了解，我们引申出来了一个概念，即自执行函数。那为什么 `a =function(){}()` 这种表示方法可以让编译器认为这个是一个函数表达式而不是一个函数的声明？


>自执行函数，即定义和调用合为一体。我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，因此在执行完后很快就会被释放，关键是这种机制不会污染全局对象。

我们来看看常用的自执行函数方式:
```js
// 推荐使用这个
(function() {
  /* code */
})()
```

由于 `括弧()`和 JS 的 `&& ||` 或 `，`逗号等操作符是在函数表达式和函数声明上消除歧义的,所以一旦解析器知道其中一个已经是表达式了，其它的也都默认为表达式了。

```js
let i = (function() {
  return 10;
})();

true &&
  (function() {
    /* code */
  })();

0,
  (function() {
    /* code */
  })();
```
如果你不在意返回值，或者不怕难以阅读,你甚至可以在 `function` 前面加一元操作符号:

```js
!(function() {
  /* code */
})();
~(function() {
  /* code */
})();
-(function() {
  /* code */
})();
+(function() {
  /* code */
})();
```

还有一个情况，使用 new 关键字,也可以用，但不确定执行效率:
```js
new (function() {
  /* code */
})();
new (function() {
  /* code */
})(); // 如果需要传递参数，只需要加上括弧()
```

### 闭包

>闭包是指一个绑定了执行环境的函数。(或者说是函数内部定义的函数，被返回了出去并在外部调用。)

创建闭包的常见方式，就是在一个函数内部创建另一个函数。

```js
function foo() {
  let a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

let baz = foo();

baz(); // 这就形成了一个闭包
```

我们可以简单剖析一下上面代码的运行流程：

1. 编译阶段，变量和函数被声明，作用域即被确定。
2. 运行函数 `foo()`，此时会创建一个 `foo` 函数的执行上下文，执行上下文内部存储了 `foo` 中声明的所有变量函数信息。
3. 函数 `foo` 运行完毕，将内部函数 `bar` 的引用赋值给外部的变量 `baz` ，此时 `baz` 指针指向的还是 `bar` ，因此哪怕它位于 `foo` 作用域之外，它还是能够获取到 `foo` 的内部变量。
4. `baz` 在外部被执行，`baz` 的内部可执行代码 `console.log` 向作用域请求获取 `a` 变量，本地作用域没有找到，继续请求父级作用域，找到了 `foo` 中的 `a` 变量，返回给 `console.log`，打印出 `2`。

闭包的执行看起来像是开发者使用的一个小小的 “作弊手段” —— **绕过了作用域的监管机制，从外部也能获取到内部作用域的信息。** 闭包的这一特性极大地丰富了开发人员的编码方式，也提供了很多有效的运用场景。

### 闭包的应用场景

> 闭包的应用，大多数是在需要维护内部变量的场景下。
  
**单例模式**

单例模式是一种常见的涉及模式，它保证了一个类只有一个实例。实现方法一般是先判断实例是否存在，如果存在就直接返回，否则就创建了再返回。单例模式的好处就是避免了重复实例化带来的内存开销：

```js
// 单例模式
function Singleton() {
  this.data = "singleton";
}

Singleton.getInstance = (function() {
  let instance;

  return function() {
    if (instance) {
      return instance;
    } else {
      instance = new Singleton();
      return instance;
    }
  };
})();

let sa = Singleton.getInstance();
let sb = Singleton.getInstance();
console.log(sa === sb); // true
console.log(sa.data); // 'singleton'
```

**模拟私有属性**
`javascript` 没有 `java` 中那种 `public private` 的访问权限控制，对象中的所用方法和属性均可以访问，这就造成了安全隐患，内部的属性任何开发者都可以随意修改。虽然语言层面不支持私有属性的创建，但是我们可以用闭包的手段来模拟出私有属性：

```js
// 模拟私有属性
function getGeneratorFunc() {
  let _name = "John";
  let _age = 22;

  return function() {
    return {
      getName: function() {
        return _name;
      },
      getAge: function() {
        return _age;
      },
    };
  };
}

let obj = getGeneratorFunc()();
obj.getName(); // John
obj.getAge(); // 22
obj._age; // undefined
```

**柯里化**
柯里化（currying），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

```js
Function.prototype.bind = function(context = window) {
  if (typeof this !== "function") throw new Error("Error");
  let selfFunc = this;
  let args = [...arguments].slice(1);

  return function F() {
    // 因为返回了一个函数，可以 new F()，所以需要判断
    if (this instanceof F) {
      return new selfFunc(...args, arguments);
    } else {
      // bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以需要将两边的参数拼接起来
      return selfFunc.apply(context, args.concat(arguments));
    }
  };
};
```

柯里化的优势之一就是 参数的复用，它可以在传入参数的基础上生成另一个全新的函数，来看下面这个类型判断函数：
function typeOf(value) {
  return function(obj) {
    s;
    const map = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regExp",
      "[object Undefined]": "undefined",
      "[object Null]": "null",
      "[object Object]": "object",
    };
    return map[Object.prototype.toString.call(obj)] === value;
  };
}

var isNumber = typeOf("number");
var isFunction = typeOf("function");
var isRegExp = typeOf("regExp");

isNumber(0); // => true
isFunction(function() {}); // true
isRegExp({}); // => false

### 闭包的问题

**内存泄露**

```js
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();

baz(); // 这就形成了一个闭包
```
乍一看，好像没什么问题，然而，它却有可能导致 内存泄露。

我们知道，`javascript` 内部的垃圾回收机制用的是引用计数收集：即当内存中的一个变量被引用一次，计数就加一。垃圾回收机制会以固定的时间轮询这些变量，将计数为 0 的变量标记为失效变量并将之清除从而释放内存。

上述代码中，理论上来说， `foo` 函数作用域隔绝了外部环境，所有变量引用都在函数内部完成，`foo` 运行完成以后，内部的变量就应该被销毁，内存被回收。然而闭包导致了全局作用域始终存在一个 `baz` 的变量在引用着 `foo` 内部的 `bar` 函数，这就意味着 `foo` 内部定义的 `bar` 函数引用数始终为 1，垃圾运行机制就无法把它销毁。更糟糕的是，`bar` 有可能还要使用到父作用域 `foo` 中的变量信息，那它们自然也不能被销毁... JS 引擎无法判断你什么时候还会调用闭包函数，只能一直让这些数据占用着内存。

:: tip TIP

这种由于闭包使用过度而导致的内存占用无法释放的情况，我们称之为：内存泄露。
:::

### 内存泄露

>内存泄露 是指当一块内存不再被应用程序使用的时候，由于某种原因，这块内存没有返还给操作系统或者内存池的现象。内存泄漏可能会导致应用程序卡顿或者崩溃

* 造成内存泄露的原因有很多，除了闭包以外，还有 **全局变量的无意创建**。开发者的本意是想将变量作为局部变量使用，然而忘记写 `var` 导致变量被泄露到全局中：

```js
function foo() {
  b = 2;
  console.log(b);
}

foo(); // 2

console.log(b); // 2
```

* 具体来说，如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素将无法被销毁。来看下面的例子:

```js
function assignHandler() {
  var element = document.getElementById("someElement");
  var id = element.id;
  element.onclick = function() {
    alert(id);
  };
  element = null;
}
```
在上面的代码中，通过把`element.id`的一个副本保存在一个变量中，并且在闭包中引用该变量消除了循环引用。但仅仅做到这一步，还是不能解决内存泄漏的问题。

::: tip TIP

必须要记住：闭包会引用包含函数的整个活动对象，而其中包含着 `element`。即使闭包不直接引用 `element`，包含函数的活动对象中也 仍然会保存一个引用。因此，有必要把 `element` 变量设置为 `null`。这样就能够解除对 `DOM` 对象的引用，顺利地减少其引用数，确保正常回收其占用的内存
:::


* 还有 `DOM` 的事件绑定，移除 `DOM` 元素前如果忘记了注销掉其中绑定的事件方法，也会造成内存泄露：

```js
const wrapDOM = document.getElementById("wrap");
wrapDOM.onclick = function(e) {
  console.log(e);
};

// some codes ...

// remove wrapDOM
wrapDOM.parentNode.removeChild(wrapDOM);
```

### 内存泄露的排查手段

我们借助谷歌的开发者工具， `Chrome` 浏览器，`F12` 打开开发者工具来看看如何排查。

**Performance**
![base-js17](/images/base-js17.png)
![base-js18](/images/base-js18.png)

点击这个按钮启动记录，然后切换到网页进行操作，录制完成后点击 stop 按钮，开发者工具会从录制时刻开始记录当前应用的各项数据情况。

![base-js19](/images/base-js19.png)

选中`JS Heap`，下面展现出来的一条蓝线，就是代表了这段记录过程中，`JS` 堆内存信息的变化情况。

有大佬说，根据这条蓝线就可以判断是否存在内存泄漏的情况：`如果这条蓝线一直成上升趋势，那基本就是内存泄漏了。`其实我觉得这么讲有失偏颇，`JS` 堆内存占用率上升并不一定就是内存泄漏，只能说明有很多未被释放的内存而已，至于这些内存是否真的在使用，还是说确实是内存泄漏，还需要进一步排查。

![base-js20](/images/base-js20.png)

`memory`

借助开发者工具的 `Memory` 选项，可以更精确地定位内存使用情况。

![base-js21](/images/base-js21.png)
![base-js22](/images/base-js22.png)

当生成了第一个快照的时候，开发者工具窗口已经显示了很详细的内存占用情况。

**字段说明:**
| 字段 | 描述 |
| - | - |
|Constructor|	占用内存的资源类型|
|Distance|	当前对象到根的引用层级距离|
|Shallow Size|	对象所占内存（不包含内部引用的其它对象所占的内存）(单位：字节)|
|Retained Size|	对象所占总内存（包含内部引用的其它对象所占的内存）(单位：字节)|

将每项展开可以查看更详细的数据信息。

我们再次切回网页，继续操作几次，然后再次生成一个快照。


![base-js22](/images/base-js23.png)
![base-js24](/images/base-js24.png)
![base-js25](/images/base-js25.png)


这边需要特别注意这个 `#Delta` ，如果是正值，就代表新生成的内存多，释放的内存少。其中的闭包项，如果是正值，就说明存在内存泄漏。


![base-js26](/images/base-js26.png)


下面我们到代码里找一个内存泄漏的问题：

![base-js27](/images/base-js27.png)

![base-js28](/images/base-js28.png)

### 内存泄露的解决方案

1. 使用严格模式，避免不经意间的全局变量泄露：

```js
"use strict";

function foo() {
  b = 2;
}

foo(); // ReferenceError: b is not defined
```

2. 关注 `DOM` 生命周期，在销毁阶段记得解绑相关事件：

```js
document.body.onclick = function(e) {
  if (isWrapDOM) {
    // ...
  } else {
    // ...
  }
}
```

3. 避免过度使用闭包。

### 执行上下文

`javascript` 标准把一段代码(包括函数),执行所需的所有信息定义为`执行上下文`,并且为函数规定了用来保存定义时上下文的私有属性[Environment]。

**以下是在 `ES2018` 中的定义:**

* `lexical environment`: 词法环境,当前变量或者 this 值时使用。

* `variable environment`: 变量环境,当声明变量时使用。

* `code environment state`: 用于恢复代码执行位置。

* `Function`: 执行的任务是函数时使用,表示正在执行的函数。

* `ScriptOrModule`: 执行的任务是脚本或者模块时使用,表示正在被执行的代码。

* `Realm`: 使用的基础库和内置对象实例。

* `Generator`: 仅生成器上下文有这个属性,表示当前生成器。

当一个函数执行时,会创建一条新的执行环境,记录的外层词法(`outer lexical environment`)会被设置成函数的[Environment]。

上述的这个动作就是切换上下文。

### 关于 `this` 对象

在闭包中使用`this`对象也可能会导致一些问题。我们知道,`this`对象是在运行时基于函数的执行环境绑定的：在全局函数中，`this`等于`window`，而当函数被作为某个对象的方法调用时，`this`等于那个对象。

**不过，匿名函数的执行环境具有全局性，因此其 `this` 对象通常指向 `window`。**

但有时候由于编写闭包的方式不同，这一点可能不会那么明显。

```js
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function() {
    return function() {
      return this.name;
    };
  },
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
```

### 模仿块级作用域

**早期的 `JavaScript` 没有块级作用域的概念。** 这意味着在块语句中定义的变量，实际上是在包含函数中而非语句中创建的，来看下面的例子:

```js
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    alert(i);
  }
  alert(i); // 计数
}
```

这个函数中定义了一个 `for` 循环，而变量`i`的初始值被设置为 0。

在`JavaScrip`中，变量i是定义在 `ouputNumbers()`的活动对象中的，因此从它有定义开始，就可以在函数内部随处访问它。即使像下面这样错误地重新声明同一个变量，也不会改变它的值。

```js
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    alert(i);
  }
  var i; //重新声明变量
  alert(i); //计数
}
outputNumbers(10); // 0 1 2 3 4 5 6 7 8 9 10
```

::: tip TIP

匿名函数可以用来模仿块级作用域并避免这个问题。用作块级作用域（通常称为私有作用域）的匿名函数的语法如下所示:
:::
```js
(function() {
  //这里是块级作用域
})();
```

无论在什么地方，只要临时需要一些变量，就可以使用私有作用域，例如：

```js
function outputNumbers(count) {
  (function() {
    for (var i = 0; i < count; i++) {
      alert(i);
    }
  })();
  alert(i); // 导致一个错误！
}
```

**引申: 为什么有的地方会出现以下这种在函数前面加上;的代码?**
在此之前先看下面这段代码:

```js
(function() {
  console.log(1111);
})();

(function() {
  console.log(2222);
})();
```

如果上一行代码不写分号的话,括号就会被解释为上一行代码最末的函数调用,产生完全不符合预期,并且难以调式的行为,加号等运算符也有类似的问题。所以一些推荐不加分号的代码风格规范,会要求在括号前面加上分号。

```js
(function() {
  console.log(1111);
})();
```
因此也就产生了上述的这种代码风格,当然一种更加推荐的做法是使用`void`关键字。

```js
void (function() {
  console.log(1111);
})();
```

这样既能有效的避免了语法的问题,同时,语义上`void运算符`表示忽略后面表达式的值,变成了`undefined`,我们确认也不关心`IIFE`的返回值,所以语义也更为合理。

### 私有变量

严格来讲，`JavaScript` 中没有私有成员的概念；所有对象属性都是公有的。不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。

私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。来看下面的例子：

```js
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
```

我们把有权访问私有变量和私有函数的公有方法称为特权方法（`privileged method`）。

```js
function MyObject() {
  // 私有变量和私有函数
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 特权方法
  this.publicMethod = function() {
    privateVariable++;
    return privateFunction();
  };
}
```

这个模式在构造函数内部定义了所有私有变量和函数。然后，又继续创建了能够访问这些私有成员的特权方法。能够在构造函数中定义特权方法，是因为特权方法作为闭包有权访问在构造函数中定义的所有变量和函数。

对这个例子而言，变量 `privateVariable` 和函数 `privateFunction()`只能通过特权方法 `publicMethod()` 来访问。

在创建 `MyObject` 的实例后，除了使用 `publicMethod()`这一个途径外，没有任何办法可以直接访问 `privateVariable` 和 `privateFunction()`。

**利用私有和特权成员，可以隐藏那些不应该被直接修改的数据，例如：**

```js
function Person(name) {
  this.getName = function() {
    return name;
  };
  this.setName = function(value) {
    name = value;
  };
}

var person = new Person("Nicholas");
alert(person.getName()); // "Nicholas"
person.setName("Greg");
alert(person.getName()); // "Greg"
```

### 总结

1. `javascript` 语言层面只原生支持两种作用域类型：`全局作用域` 和 `函数作用域` 。全局作用域程序运行就有，函数作用域只有定义函数的时候才有，它们之间是包含的关系。

2. 作用域之间是可以嵌套的，我们把这种嵌套关系称为 `作用域链`。

3. 可执行代码在作用域中查询变量时，只能查询 `本地作用域` 及 `上层作用域`，不能查找内部的函数作用域。JS 引擎搜索变量时，会先询问本地作用域，找到即返回，找不到再去询问上层作用域...层层往上，直到全局作用域。

4. `javascript` 中使用的是 词法作用域，因此函数作用域的范围在函数定义时就已经被确定，和函数在哪执行没有关系。

**当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理如下:**

* 在后台执行环境中，闭包的作用域链包含着`它自己的作用域`、`包含函数的作用域`和`全局作用域`。

* 通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。

* 但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。

* **使用闭包`可以在 JavaScript 中模仿块级作用域（JavaScript 本身没有块级作用域的概念），`要点如下:**
 - 创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。 
 - 结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了包含作用域（即外部作用域）中的变量。

* **闭包还可以用于在对象中创建私有变量，相关概念和要点如下。**
 - 即使 `JavaScript` 中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。 
 - 有权访问私有变量的公有方法叫做特权方法。 
 - 可以使用`构造函数模式`、`原型模式来实现自定义类型的特权方法`，`也可以使用模块模式`、`增强的模块模式`来实现单例的特权方法。
 
 `JavaScript` 中的`函数表达式`和`闭包`都是极其有用的特性，利用它们可以实现很多功能。
 
 不过，因为创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。
 
 ## url编码方式
 
 url编码方式主要有两种：
 
 1. `encodeURI()`主要用于整个 URI（例如，http://www.wrox.com/illegal value.htm）。
 2. `encodeURIComponent()`主要用于对 URI 中的某一段（例如前面 URI 中的 illegal value.htm）。
 
 ::: tip TIP

`encodeURI()`不会对本身属于 `URI` 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号； `encodeURIComponent()`则会对它发现的任何非标准字符进行编码。 对应解码方式为`decodeURI()`与`decodeURIComponent()`。
:::

```js
var uri = "http://www.wrox.com/illegal value.htm#start"; 
// "http://www.wrox.com/illegal%20value.htm#start" 
alert(encodeURI(uri)); 
alert(decodeURI(uri)); // 解码 

// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start" 
alert(encodeURIComponent(uri));
alert(decodeURIComponent(uri)); // 解码 
```

## Math对象

### 常用方法

* `min()`和` max()`方法

```js
var values = [1, 2, 3, 4, 5, 6, 7, 8]; 
var max = Math.max.apply(Math, values);
var min = Math.min.apply(Math, values);
```

* `Math.ceil()`执行向上舍入，即它总是将数值向上舍入为最接近的整数；

* `Math.floor()`执行向下舍入，即它总是将数值向下舍入为最接近的整数；

* `Math.round()`执行标准舍入，即它总是将数值四舍五入为最接近的整数。

* `Math.random()`返回大于等于0小于1的一个随机数。

* `Math.abs(num)`返回`num`的绝对值。

* `Math.pow(num,power)` 返回 `num` 的 `power` 次幂。 // 可以用来解决小数精度丢失的问题或者是去小数点位数的处理

```js
// 返回指定区间的数
function selectFrom(lowerValue, upperValue) { 
    let choices = upperValue - lowerValue + 1; 
    return Math.floor(Math.random() * choices + lowerValue); 
} 
const num = selectFrom(2, 10); 
alert(num); // 介于 2 和 10 之间（包括 2 和 10）的一个数值
```

## 面向对象编程(oop重点)

面向对象编程(`Object Orient Programming`)简称`OOP`，是一种编程技术。

`JavaScript` 本身并没有类的概念，js中创建自定义对象的最简单方式就是创建一个 `Object` 的实例，然后再为它添加属性和方法，如下所示：

```js
var person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
person.job = "Software Engineer"; 
person.sayName = function(){ 
    alert(this.name); 
};
```

早期的 `JavaScript` 开发人员经常使用这个模式创建新对象。几年后，对象字面量成为创建这种对象的首选模式。前面的例子用对象字面量语法可以写成这样：

```js
var person = { 
 name: "Nicholas", 
 age: 29, 
 job: "Software Engineer", 
 sayName: function(){ 
 	alert(this.name); 
 } 
};
```
*`ECMAScript`中有两种属性：`数据属性`和`访问器属性`*

### 数据属性

**数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性：**

1. `Configurable`：表示能否通过`delete`删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。直接在对象上定义的属性，它们的这个特性默认值为 `true`。
2. `Enumerable`: 表示能否通过 `for-in` 循环返回属性。直接在对象上定义的属性，它们的这个特性默认值为 `true`。
3. `Writable`：表示能否修改属性的值。直接在对象上定义的属性，它们的这个特性默认值为 `true`。
4. `Value`:包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 `undefined`。

:::warning WARNING

要修改属性默认的特性，必须使用 `ECMAScript5` 的`Object.defineProperty()`方法。
:::

这个方法接收三个参数：`属性所在的对象`、`属性的名字`和`一个描述符对象`。

其中，描述符对象的属性必须是：`configurable`、`enumerable`、`writable` 和 `value`。设置其中的一或多个值，可以修改对应的特性值。

```js
var person = {}; 
Object.defineProperty(person, "name", { 
 writable: false, 
 value: "Nicholas" 
}); 
alert(person.name); // "Nicholas" 
person.name = "Greg"; 
alert(person.name); // "Nicholas"
```

### 访问器属性

**访问器属性不包含数据值；它们包含一对儿 `getter` 和 `setter` 函数（不过，这两个函数都不是必需的）。**

访问器属性有如下4个特性:

1. `Configurable`：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true。
2. `Enumerable`：表示能否通过 `for-in` 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 `true`。
3. `Get`：在读取属性时调用的函数。默认值为 `undefined`。
4. `Set`：在写入属性时调用的函数。默认值为 `undefined`。

::: warning WARNING

访问器属性不能直接定义，必须使用`Object.defineProperty()`来定义。
:::

```js
var book = { 
    _year: 2004, 
    edition: 1 
}; 
Object.defineProperty(book, "year", { 
    get: function(){ 
 	    return this._year; 
    }, 
    set: function(newValue){ 
	    if (newValue > 2004) { 
		    this._year = newValue; 
		    this.edition += newValue - 2004; 
	    } 
    } 
}); 
book.year = 2005; 
alert(book.edition); //2
```

### 读取属性的特性

使用 `ECMAScript5` 的 `Object.getOwnPropertyDescriptor()`方法，可以取得给定属性的描述符。

这个方法接收两个参数：`属性所在的对象` 和 `要读取其描述符的属性名称`,返回值是一个对象。

::: tip TIP

如果是访问器属性，这个对象的属性有 `configurable`、`enumerable`、`get` 和 `set`。

如果是数据属性，这个对象的属性有 `configurable`、`enumerable`、`writable` 和 `value`。
:::
```js
var book = {}; 
Object.defineProperties(book, { 
    _year: { 
 	    value: 2004 
    }, 
    edition: { 
 	    value: 1 
    }, 
    year: { 
	    get: function(){ 
	 	    return this._year; 
	    }, 
	    set: function(newValue){ 
		    if (newValue > 2004) { 
		        this._year = newValue; 
		        this.edition += newValue - 2004; 
            } 
        }
    }
}); 

var descriptor = Object.getOwnPropertyDescriptor(book, "_year"); 
alert(descriptor.value); // 2004 
alert(descriptor.configurable); // false
alert(typeof descriptor.get); // "undefined" 

var descriptor = Object.getOwnPropertyDescriptor(book, "year"); 
alert(descriptor.value); // undefined 
alert(descriptor.enumerable); // false 
alert(typeof descriptor.get); // "function"
```

### 设计模式

1. **工厂模式**

`工厂模式`是软件工程领域一种广为人知的设计模式，`这种模式抽象了创建具体对象的过程`。

考虑到在`ECMAScript`中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节，如下面的例子所示：

```js
function createPerson(){
    var o = new Object(); 
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function(){ 
        alert(this.name); 
    }; 
    return o; 
} 
var person1 = createPerson("Nicholas", 29, "Software Engineer"); 
var person2 = createPerson("Greg", 27, "Doctor");
```

:::tip TIP
       
工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）,随着 `JavaScript` 的发展，又一个新模式出现了。
:::

2. **构造函数模式**

像 `Object` 和 `Array` 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。例如，可以使用`构造函数模式`将前面的例子重写如下:

```js
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = function(){ 
 	    alert(this.name); 
    }; 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor");
```
要创建 `Person` 的新实例，必须使用 `new` 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：


>1. 创建一个新对象；
>2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
>3. 执行构造函数中的代码（为这个新对象添加属性）；
>4. 返回新对象。

构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，**就是每个方法都要在每个实例上重新创建一遍**。

在前面的例子中，`person1` 和 `person2` 都有一个名为 `sayName()` 的方法，但那两个方法不是同一个 `Function` 的实例。不要忘了——`ECMAScript` 中的`函数是对象`，因此每定义一个函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义:

```js
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = new Function("alert(this.name)"); // 与声明函数在逻辑上是等价的
}
```

从这个角度上来看构造函数，更容易明白每个 `Person` 实例都包含一个不同的 `Function` 实例（以显示 `name` 属性）的本质。 说明白些，以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 `Function` 新实例的机制仍然是相同的。因此，不同实例上的同名函数是不相等的，以下代码可以证明这一点。

```js
alert(person1.sayName == person2.sayName); // false
```

然而，创建两个完成同样任务的`Function`实例的确没有必要；况且有 `this` 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。

因此，大可像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。

```js
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = sayName; 
} 
function sayName(){ 
    alert(this.name); 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor");
```

在这个例子中，我们把 `sayName()`函数的定义转移到了构造函数外部。而在构造函数内部，我们将 `sayName` 属性设置成等于全局 `sayName` 函数。这样一来，由于 `sayName` 包含的是一个指向函数的指针，因此 `person1` 和 `person2` 对象就共享了在全局作用域中定义的同一个 `sayName()`函数。

这样做确实解决了两个函数做同一件事的问题，可是新问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。

好在，这些问题可以通过使用`原型模式`来解决。

3. **原型模式**

我们创建的每个函数都有一个 `prototype（原型）`属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

如果按照字面意思来理解，那么 `prototype` 就是 **通过调用构造函数而创建的那个对象实例的原型对象**。

**使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法**。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，如下面的例子所示:

```js
function Person(){ } 

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){ 
 alert(this.name); 
}; 

var person1 = new Person(); 
person1.sayName(); // "Nicholas" 
var person2 = new Person();
person2.sayName(); // "Nicholas" 
alert(person1.sayName == person2.sayName); // true
```

**理解原型对象**

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个`prototype`属性，这个属性**指向函数的原型对象**。

在默认情况下，所有原型对象都会自动获得一个 `constructor（构造函数）`属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。

就拿前面的例子来说，`Person.prototype.constructor` 指向 `Person`。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法。

创建了自定义的构造函数之后，其原型对象默认只会取得 `constructor` 属性；至于其他方法，则都是从 `Object` 继承而来的。

当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性`__proto__`），指向构造函数的原型对象。

![base-hs29](/images/base-js29.png)

::: tip TIP
        
虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。
:::

如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那就会优先去实例里面的该属性，该属性将会屏蔽原型中的那个属性。来看下面的例子:

```js
function Person(){ } 

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){ 
    alert(this.name); 
}; 

var person1 = new Person();
var person2 = new Person(); 
person1.name = "Greg"; 

alert(person1.name); // "Greg"——来自实例
alert(person2.name); // "Nicholas"——来自原型
```

当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。

即使将这个属性设置为 `null`，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。

不过，使用 `delete` 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，如下所示:

```js
function Person(){ } 

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){ 
 alert(this.name); 
}; 

var person1 = new Person(); 
var person2 = new Person(); 
person1.name = "Greg"; 
alert(person1.name); // "Greg"——来自实例
alert(person2.name); // "Nicholas"——来自原型

delete person1.name; 
alert(person1.name); // "Nicholas"——来自原型
```

:::tip TIP
       
使用 `hasOwnProperty()`方法可以检测一个属性是存在于实例中，还是存在于原型中。

这个方法（不要忘了它是从 `Object` 继承来的）只在给定属性存在于对象实例中时，才会返回 `true`。
:::

```js
function Person(){} 

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){
 alert(this.name); 
}; 

var person1 = new Person(); 
var person2 = new Person(); 

alert(person1.hasOwnProperty("name")); // false 
person1.name = "Greg"; 
alert(person1.name); // "Greg"——来自实例
alert(person1.hasOwnProperty("name")); // true 
alert(person2.name); // "Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); // false 

delete person1.name; 

alert(person1.name); // "Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); // false
```

:::tip TIP

要取得原型属性的描述符，必须直接在原型对象上调用` Object.getOwnPropertyDescriptor()`方法。

同时使用 `hasOwnProperty()`方法和 `in` 操作符，就可以确定该属性到底是存在于对象中，还是存在于原型中。
:::
[补充说明][https://blog.csdn.net/ItDaChuang/article/details/120631851]
```js
// 判断该属性是否是原型上的属性
function hasPrototypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object); 
}
```

::: tip TIP

在使用 `for-in` 循环时，返回的是所有能够通过对象访问的、可枚举的（`enumerated`）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性（`即将Enumerable标记为false的属性`）的实例属性也会在`for-in`循环中返回。

要取得对象上所有可枚举的实例属性，可以使用`Object.keys()`方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。
:::
[https://blog.csdn.net/ItDaChuang/article/details/120631851]: https://blog.csdn.net/ItDaChuang/article/details/120631851

```js
function Person(){} 

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){ 
 alert(this.name); 
}; 

var keys = Object.keys(Person.prototype); 
alert(keys); // "name,age,job,sayName" 

var p1 = new Person(); 
p1.name = "Rob"; 
p1.age = 31; 
var p1keys = Object.keys(p1); 
alert(p1keys); // "name,age"
```

:::tip TIP

如果你想要得到所有实例属性，无论它是否可枚举，都可以使`Object.getOwnPropertyNames()`方法。
:::

```js
var keys = Object.getOwnPropertyNames(Person.prototype); 
alert(keys); // "constructor,name,age,job,sayName"
```

::: warning WARNING

注意结果中包含了不可枚举的`constructor`属性。`Object.keys()`和 `Object.getOwnPropertyNames()`方法都可以用来替代`for-in` 循环。
:::

**原型对象的问题**

原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。

原型模式的最大问题是由其共享的本性所导致的。原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了,比如直接修改原型链上的数据，因为数据共享会导致其他实例的数据也一起变化。来看下面的例子：

```js
function Person(){ } 

Person.prototype = { 
    constructor: Person, 
    name : "Nicholas", 
    age : 29, 
    job : "Software Engineer", 
    friends : ["Shelby", "Court"], 
    sayName : function () { 
 	    alert(this.name); 
    } 
}; 

var person1 = new Person(); 
var person2 = new Person(); 
person1.friends.push("Van"); 
alert(person1.friends); // "Shelby,Court,Van" 
alert(person2.friends); // "Shelby,Court,Van" 
alert(person1.friends === person2.friends); // true
```

`Person.prototype` 对象有一个名为 `friends` 的属性，该属性包含一个字符串数组。 然后，创建了 `Person` 的两个实例。 修改了 `person1.friends` 引用的数组，向数组中添加了一个字符串。 由于 `friends` 数组存在于 `Person.prototype` 而非 `person1` 中，所以刚刚提到的修改也会通过` person2.friends`（与 `person1.friends` 指向同一个数组）反映出来。

假如我们的初衷就是像这样在所有实例中共享一个数组，那么对这个结果我没有话可说。可是，实例一般都是要有属于自己的全部属性的。而这个问题正是我们很少看到有人单独使用原型模式的原因所在。

4. **组合使用构造函数模式和原型模式**

**创建自定义类型的最常见方式，就是`组合使用构造函数模式与原型模式`。**

* 构造函数模式用于定义实例属性，
* 原型模式用于定义方法和共享的属性。

结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。下面的代码重写了前面的例子:

```js
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.friends = ["Shelby", "Court"]; 
} 

Person.prototype = { 
    constructor : Person, 
    sayName : function(){ 
        alert(this.name); 
    } 
} 

var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor"); 
person1.friends.push("Van"); 

alert(person1.friends); // "Shelby,Count,Van" 
alert(person2.friends); // "Shelby,Count" 
alert(person1.friends === person2.friends); // false 
alert(person1.sayName === person2.sayName); // true
```

5. 寄生构造函数模式

这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象； 但从表面上看，这个函数又很像是典型的构造函数。下面是一个例子:

```js
function Person(name, age, job){ 
    var o = new Object(); 
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function(){ 
        alert(this.name); 
    }; 
    return o; 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); // "Nicholas"
```

### 继承

许多OO语言都支持两种继承方式：`接口继承` 和 `实现继承`。

**接口继承只继承方法签名，而实现继承则继承实际的方法。**

**如前所述，由于函数没有签名，在 `ECMAScript` 中无法实现接口继承。`ECMAScript` 只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

1. **原型链继承**

>其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？

显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

```js
// parent
function SuperType(){ 
    this.property = true; 
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
}
// children
function SubType(){
	this.subproperty = false; 
}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
	return this.subproperty;
}

var instance = new SubType()
alert(instance.getSuperValue()); // true
alert(instance.getSubValue()); // false
alert(instance instanceof SuperType); // true
alert(instance.constructor); // SuperType

```

实际上，不是`SubType`的原型的`constructor`属性被重写了，而是`SubType`的原型指向了另一个对象——`SuperType`的原型，而这个原型对象的 `constructor` 属性指向的是 `SuperType`。

关系图如下:

![base-js30](/images/base-js30.png)

事实上，前面例子中展示的原型链还少一环。我们知道，所有引用类型默认都继承了 `Object`，而这个继承也是通过原型链实现的。大家要记住，**所有函数的默认原型都是 `Object` 的实例**，因此默认原型都会包含一个内部指针，指向`Object.prototype`。这也正是所有自定义类型都会继承`toString()`、`valueOf()`等默认方法的根本原因。所以，我们说上面例子展示的原型链中还应该包括另外一个继承层次。


![base-js31](/images/base-js31.png)

还有一点需要提醒读者，**即在通过原型链实现继承时，不能使用对象字面量创建原型方法**。因为这样做就会重写原型链，如下面的例子所示:

```js
function SuperType(){ 
    this.property = true; 
} 
SuperType.prototype.getSuperValue = function(){ 
    return this.property; 
}; 
function SubType(){ 
    this.subproperty = false; 
} 
//继承了 SuperType 
SubType.prototype = new SuperType(); 
//使用字面量添加新方法，会导致上一行代码无效
SubType.prototype = { 
 getSubValue : function (){ 
    return this.subproperty; 
 }, 
 someOtherMethod : function (){ 
    return false; 
 } 
}; 
var instance = new SubType(); 
alert(instance.getSuperValue()); //error!
```

:::warning WARNING

原型链虽然很强大，可以用它来实现继承，但它也存在一些问题。

其中，最主要的问题来自包含引用类型值的原型。想必大家还记得，我们前面介绍过包含引用类型值的原型属性会被所有实例共享。

而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了。
:::

```js
function SuperType(){ 
    this.colors = ["red", "blue", "green"];
} 
function SubType(){ } 
// 继承了 SuperType 
SubType.prototype = new SuperType(); 
var instance1 = new SubType(); 
instance1.colors.push("black"); 
alert(instance1.colors); //"red,blue,green,black" 
var instance2 = new SubType(); 
alert(instance2.colors); //"red,blue,green,black"
```

原型链的第二个问题是：**在创建子类型的实例时，不能向超类型的构造函数中传递参数**。

实际上应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。有鉴于此，再加上前面刚刚讨论过的由于原型中包含引用类型值所带来的问题，实践中很少会单独使用原型链。

2. **借用构造函数继承**

>这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。

别忘了，函数只不过是在特定环境中执行代码的对象，因此通过使用 apply()和 call()方法也可以在（将来）新创建的对象上执行构造函数，如下所示：

```js
function SuperType(){ 
 this.colors = ["red", "blue", "green"]; 
} 
function SubType(){ 
 //继承了 SuperType 
 SuperType.call(this); 
} 
var instance1 = new SubType(); 
instance1.colors.push("black"); 
alert(instance1.colors); //"red,blue,green,black" 
var instance2 = new SubType(); 
alert(instance2.colors); //"red,blue,green"
```

通过使用 `call()`方法（或 `apply()`方法也可以）修改this指向实例本身，避免公用原型数据，我们实际上是在（未来将要）新创建的 `SubType` 实例的环境下调用了 `SuperType` 构造函数。

**这样一来，就会在新 `SubType` 对象上执行 `SuperType()`函数中定义的所有对象初始化代码。结果，`SubType` 的每个实例就都会具有自己的 `colors` 属性的副本了。**

**传递参数**

相对于原型链而言，借用构造函数有一个很大的优势，**即可以在子类型构造函数中向超类型构造函数传递参数**。看下面这个例子:

```js
function SuperType(name){ 
    this.name = name; 
} 
function SubType(name, age){ 
    // 继承了 SuperType，同时还传递了参数
    SuperType.call(this, name); 
    // 实例属性
    this.age = age; 
} 
var instance = new SubType('yh', 18); 
alert(instance.name); //"Nicholas"; 
alert(instance.age); //29
```

**借用构造函数的问题**

如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。考虑到这些问题，借用构造函数的技术也是很少单独使用的。

3. **组合继承**

`组合继承（combination inheritance）`，有时候也叫做`伪经典继承`，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。

>其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。下面来看一个例子:

```js
function SuperType(name){ 
	this.name = name; 
	this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function(){ 
	alert(this.name);
}
function SubType(name, age){
	// 继承属性
	SuperType.call(this,name)
	this.age = age
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
}

var instance1 = new SubType("Nicholas", 29); 
instance1.colors.push("black"); 
alert(instance1.colors); //"red,blue,green,black" 
instance1.sayName(); //"Nicholas"; 
instance1.sayAge(); //29 
var instance2 = new SubType("Greg", 27); 
alert(instance2.colors); //"red,blue,green" 
instance2.sayName(); //"Greg"; 
instance2.sayAge(); //27
```

:::tip TIP

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为JavaScript中最常用的继承模式。
:::

4. **原型式继承**

>这种方法并没有使用严格意义上的构造函数。他的想法是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function object(o){ 
	function F(){} 
	F.prototype = o; 
	return new F(); 
}
```

在`object()`函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲，`object()`对传入其中的对象执行了一次浅复制。来看下面的例子:

```js
var person = {
	name : "Nicholas",
	frineds: ["Shelby", "court", "Van"]
}

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);// "Shelby,Court,Van,Rob,Barbie"
```

:::tip TIP

`Object.create()`方法规范化了原型式继承。

这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，`Object.create()`与 `object()`方法的行为相同。
:::
       
5. **寄生式继承**

>寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```js
function createAnother(original){
	var clone = Object.create(original);
	clone.sayHi = function(){
		alert("Hi");
	}
	return clone
}
```

在这个例子中，`createAnother()`函数接收了一个参数，也就是将要作为新对象基础的对象。然后，把这个对象（`original`）传递给 `object()`函数，将返回的结果赋值给 `clone`。再为 `clone` 对象添加一个新方法 `sayHi()`，最后返回 `clone` 对象。可以像下面这样来使用 `createAnother()`函数：
       
```js
var person = { 
    name: "Nicholas", 
    friends: ["Shelby", "Court", "Van"] 
}; 
var anotherPerson = createAnother(person); 
anotherPerson.sayHi(); //"hi"
```

6. **寄生组合式继承** 

前面说过，组合继承是 `JavaScript` 最常用的继承模式；不过，它也有自己的不足。

组合继承最大的问题就是**无论什么情况下，都会调用两次超类型构造函数**：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。没错，子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。

>所谓`寄生组合式继承`，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型

```js
function inheritPrototype(subType, superType){ 
    var prototype = Object.create(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}

function SuperType(name){ 
    this.name = name; 
    this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function(){ 
    alert(this.name); 
}; 
function SubType(name, age){ 
    SuperType.call(this, name); 
    this.age = age; 
} 
inheritPrototype(SubType, SuperType); 
SubType.prototype.sayAge = function(){ 
    alert(this.age); 
};
let person = new SubType('yh', 18);
console.log(person)
```

这个例子的高效率体现在它只调用了一次`SuperType`构造函数，并且因此避免了在 `SubType.prototype` 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用`instanceof`和 `isPrototypeOf()`。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

## 原型链

`JavaScript` 中没有类的概念的，主要通过原型链来实现继承。通常情况下，继承意味着复制操作，然而 `JavaScript` 默认并不会复制对象的属性，相反，`JavaScript` 只是在两个对象之间创建一个关联（原型对象指针），这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

### 原型
***

>当我们 `new` 了一个新的对象实例，明明什么都没有做，就直接可以访问 `toString` 、`valueOf` 等原生方法。那么这些方法是从哪里来的呢？答案就是`原型`。

![base-js32](/images/base-js32.png)

在控制台打印一个空对象时，我们可以看到，有很多方法，已经`“初始化”`挂载在内置的 `__proto__` 对象上了。

这个内置的 `__proto__` 是一个**指向原型对象的指针**，它会在创建一个新的引用类型对象时（显示或者隐式）自动创建，并挂载到新实例上。

当我们尝试访问实例对象上的某一属性或者方法时，如果实例对象上有该属性或者方法时，就返回实例属性或者方法。

如果没有，就去 `__proto__` 指向的原型对象上查找对应的属性或者方法。这就是为什么我们尝试访问空对象的 `toString` 和 `valueOf` 等方法依旧能访问到的原因，`JavaScript` `正是以这种方式为基础来实现继承的`。

### 构造函数
****

如果说实例的 `__proto__` 只是一个指向原型对象的指针，那就说明在此之前原型对象就已经创建了，那么原型对象是什么时候被创建的呢？这就要引入`构造函数`的概念。

其实构造函数也就只是一个普通的函数而已，如果这个函数可以使用 `new` 关键字来创建它的实例对象，那么我们就把这种函数称为 构造函数。

原型对象正是在构造函数被声明时一同创建的。构造函数被申明时，原型对象也一同完成创建，然后挂载到构造函数的 `prototype` 属性上：

![base-js33](/images/base-js33.png)

原型对象被创建时，会自动生成一个 `constructor` 属性，指向创建它的构造函数。这样它俩的关系就被紧密地关联起来了。

:::tip TIP

细心的话，你可能会发现，原型对象也有自己的 `__proto__` ，这也不奇怪，毕竟万物皆对象嘛。

原型对象的 `__proto__` 指向的是 `Object.prototype`。那么 `Object.prototype.__proto__` 存不存在呢？其实是不存在的，打印的话会发现是 `null` 。这也证明了 `Object` 是 `JavaScript` 中数据类型的起源。
:::

我们可以用一张图来表示这个关系：

![base-js34](/images/base-js34.png)

### 原型链
***

说完了原型，就可以来说说原型链了，如果理解了原型机制，原型链就很好解释了。其实上面一张图上，那条被 `__proto__` 链接起来的链式关系，就称为**原型链**。

原型链的作用：原型链如此的重要的原因就在于它决定了 `JavaScript` 中继承的实现方式。当我们访问一个属性时，查找机制如下：

* 访问对象实例属性，有则返回，没有就通过 `__proto__` 去它的原型对象查找。

* 原型对象找到即返回，找不到，继续通过原型对象的 `__proto__` 查找。

* 一层一层一直找到 `Object.prototype` ，如果找到目标属性即返回，找不到就返回 `undefined`，不会再往下找，因为在往下找 `__proto__` 就是 `null` 了。

通过上面的解释，对于构造函数生成的实例，我们应该能了解它的原型对象了。`JavaScript` 中万物皆对象，那么构造函数肯定也是个对象，是对象就有 `__proto__` ，那么构造函数的 `__proto__` 是什么？

通过上面的解释，对于构造函数生成的实例，我们应该能了解它的原型对象了。`JavaScript` 中万物皆对象，那么构造函数肯定也是个对象，是对象就有 `__proto__` ，那么构造函数的 `__proto__` 是什么？

```js
function Person () {}
Person.prototype === Function.prototype // false
Person.__proto__  === Function.__proto__ // true
```

这里需要注意的是: `Function.__proto__ === Function.prototype`。

```js
String.__proto__ === Function.prototype
// true
Number.__proto__ === Function.prototype
// true
Boolean.__proto__ === Function.prototype
// true
Array.__proto__ === Function.prototype
// true
Function.__proto__ === Function.prototype
// true
```

至于为什么 `Function.__proto__` 等于 `Function.prototype` 有这么几种说法：

1. 为了保持与其他函数保持一致。
2. 为了说明一种关系，比如证明所有的函数都是 `Function` 的实例。
3. 函数都是可以调用 `call`、`bind` 这些内置 `API` 的，这么写可以很好的保证函数实例能够使用这些 `API`。

::: warning WARNING
            
**关于原型、原型链和构造函数有几点需要注意**：

*  `__proto__` 是非标准属性，如果要访问一个对象的原型，建议使用 `ES6` 新增的 `Reflect.getPrototypeOf` 或者 `Object.getPrototypeOf()` 方法，而不是直接 `obj.__proto__`，因为非标准属性意味着未来可能直接会修改或者移除该属性。同理，当改变一个对象的原型时，最好也使用 `ES6` 提供的 `Reflect.setPrototypeOf` 或 `Object.setPrototypeOf`。
```md
let target = {};
let newProto = {};
Reflect.getPrototypeOf(target) === newProto; // false
Reflect.setPrototypeOf(target, newProto);
Reflect.getPrototypeOf(target) === newProto; // true
```
* 函数都会有 `prototype` ，除了 `Function.prototype.bind()` 之外。

* 对象都会有 `__proto__` ，除了 `Object.prototype` 之外（其实它也是有的，之不过是 `null`）。

* 所有函数都由 `Function` 创建而来，也就是说他们的` __proto__` 都等于 `Function.prototype`。

* `Function.prototype` 等于 `Function.__proto__` 。
:::

### 原型污染
***

>原型污染是指：攻击者通过某种手段修改 `JavaScript` 对象的原型。

举个例子,如果我们把 `Object.prototype.toString` 改成这样：

```js
Object.prototype.toString = function() {
  alert("Hello World");
};
let obj = {};
obj.toString();
```

那么当我们运行这段代码的时候浏览器就会弹出一个 `alert`，对象原生的 `toString` 方法被改写了，所有对象当调用 `toString` 时都会受到影响。

你可能会说，怎么可能有人傻到在源码里写这种代码，这不是搬起石头砸自己的脚么？没错，没人会在源码里这么写，但是攻击者可能会通过表单或者修改请求内容等方式使用原型污染发起攻击，来看下面一种情况：

```js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const isObject = (obj) => obj && obj.constructor && obj.constructor === Object;

function merge(a, b) {
  for (var attr in b) {
    if (isObject(a[attr]) && isObject(b[attr])) {
      merge(a[attr], b[attr]);
    } else {
      a[attr] = b[attr];
    }
  }
  return a;
}

function clone(a) {
  return merge({}, a);
}

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
const admin = {};

// App
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "views")));
app.post("/signup", (req, res) => {
  var body = JSON.parse(JSON.stringify(req.body));
  var copybody = clone(body);
  if (copybody.name) {
    res.cookie("name", copybody.name).json({
      done: "cookie set",
    });
  } else {
    res.json({
      error: "cookie not set",
    });
  }
});
app.get("/getFlag", (req, res) => {
  var аdmin = JSON.parse(JSON.stringify(req.cookies));
  if (admin.аdmin == 1) {
    res.send("hackim19{}");
  } else {
    res.send("You are not authorized");
  }
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

如果服务器中有上述的代码片段，攻击者只要将 `cookie` 设置成{`__proto__: {admin: 1}`} 就能完成系统的侵入。

### 原型污染的解决方案
***

在看原型污染的解决方案之前，我们可以看下 `lodash` 团队之前解决原型污染问题的手法：

![base-js35](/images/base-js35.png)
***
![base-js36](/images/base-js36.png)

代码很简单，只要是碰到有 `constructor` 或者 `__proto__` 这样的敏感词汇，就直接退出执行了。这当然是一种防止原型污染的有效手段，当然我们还有其他手段：

1. 使用 `Object.create(null)`， 方法创建一个原型为 `null` 的新对象，这样无论对 原型做怎样的扩展都不会生效：

```js
const obj = Object.create(null);
obj.__proto__ = { hack: "污染原型的属性" };
console.log(obj); // => {}
console.log(obj.hack); // => undefined
```

2. 使用 `Object.freeze(obj)` 冻结指定对象，使之不能被修改属性，成为不可扩展对象：

```js
Object.freeze(Object.prototype);

Object.prototype.toString = "evil";

console.log(Object.prototype.toString);
// => ƒ toString() { [native code] }
```

3. 建立 `JSON schema` ，在解析用户输入内容时，通过 `JSON schema` 过滤敏感键名。
4. 规避不安全的递归性合并。这一点类似 `lodash` 修复手段，完善了合并操作的安全性，对敏感键名跳过处理。

## form表单脚本
***

###表单的基础知识

在 `HTML` 中，表单是由`<form>`元素来表示的，而在 `JavaScript` 中，表单对应的则是 `HTMLFormElement类型`。`HTMLFormElement` 继承了 `HTMLElement`，因而与其他 `HTML` 元素具有相同的默认属性。不过，`HTMLFormElement` 也有它自己下列独有的属性和方法。

* `acceptCharset`：服务器能够处理的字符集；等价于 `HTML` 中的 `accept-charset` 特性。
* `action`：接受请求的 `URL`；等价于 `HTML` 中的 `action` 特性。
* `length`：表单中控件的数量。
* `method`：要发送的 `HTTP` 请求类型，通常是`get`或`post`；等价于 `HTML` 的 `method` 特性。
* `name`：表单的名称；等价于 `HTML` 的 `name` 特性。
* `reset()`：将所有表单域重置为默认值。
* `submit()`：提交表单。
* `target`：用于发送请求和接收响应的窗口名称；等价于 `HTML` 的 `target` 特性。

### 提交表单

用户单击提交按钮或图像按钮时，就会提交表单。使用`<input>`或`<button>`都可以定义提交按钮，只要将其 `type` 特性的值设置为 `submit` 即可，而图像按钮则是通过将 `<input>的type` 特性值设置为`image`来定义的。因此，只要我们单击以下代码生成的按钮，就可以提交表单。

```html
<!-- 通用提交按钮 --> 
<input type="submit" value="Submit Form"> 
<!-- 自定义提交按钮 --> 
<button type="submit">Submit Form</button> 
<!-- 图像按钮 --> 
<input type="image" src="graphic.gif">
```
或者使用
```js
// 提交表单
form.submit();
```

:::warning WARNING

提交表单时可能出现的最大问题，就是重复提交表单。在第一次提交表单后，如果长时间没有反应，用户可能会变得不耐烦。这时候，他们也许会反复单击提交按钮。结果往往很麻烦（因为服务器要处理重复的请求），或者会造成错误（如果用户是下订单，那么可能会多订好几份）。
:::

**解决这一问题的办法有两个:**

在第一次提交表单后就禁用提交按钮
利用 `onsubmit` 事件处理程序取消后续的表单提交操作。

### 重置表单

在用户单击重置按钮时，表单会被重置。使用 `type` 特性值为`reset`的`<input>`或`<button>`都可以创建重置按钮，如下面的例子所示：

```html
<!-- 通用重置按钮 --> 
<input type="reset" value="Reset Form"> 
<!-- 自定义重置按钮 --> 
<button type="reset">Reset Form</button>
```
与提交表单一样，也可以通过 JavaScript 来重置表单，如下面的例子所示:
```js
// 重置表单
form.reset();
```

### 操作富文本

与富文本编辑器交互的主要方式，就是使用 `document.execCommand()`。这个方法可以对文档执行预定义的命令，而且可以应用大多数格式。

![base-js38](/images/base-js38.png)
![base-js37](/images/base-js37.png)

## canvans绘图

:::tip TIP

要使用`<canvas>`元素，必须先设置其 `width` 和 `height` 属性，指定可以绘图的区域大小。
:::

```html
<canvas 
	id="drawing" 
	width=" 200" 
	height="200"
>A drawing of something.</canvas>
```

### 检测是否支持canvas绘制

```js
const drawing = document.getElementById("drawing");
	if(drawing && drawing.getContext){
    	const context = drawing.getContext("2d");
        console.log(context)
    }
```

### 图像导出

使用 `toDataURL()`方法，可以导出在`<canvas>`元素上绘制的图像。

```js
var drawing = document.getElementById("drawing"); 
// 确定浏览器支持<canvas>元素
if (drawing.getContext){ 
    // 取得图像的数据 URI 
    var imgURI = drawing.toDataURL("image/png"); 
    // 显示图像
    var image = document.createElement("img"); 
    image.src = imgURI; 
    document.body.appendChild(image); 
}
```

::: tip TIP

默认情况下，浏览器会将图像编码为 PNG 格式（除非另行指定）。
:::        
        
### 2D 上下文

使用 2D 绘图上下文提供的方法，可以绘制简单的 2D 图形，比如矩形、弧线和路径。2D 上下文的坐标开始于`<canvas>`元素的左上角，原点坐标是`(0,0)`。所有坐标值都基于这个原点计算，`x` 值越大表示越靠右，`y` 值越大表示越靠下。默认情况下，`width` 和 `height` 表示水平和垂直两个方向上可用的像素数目。

**填充和描边**

* 填充:fillStyle。
* 描边:strokeStyle。

**绘制矩形**

`fillRect()`、`strokeRect()`和 `clearRect()`。

这三个方法都能接收 4 个参数：**矩形的 x 坐标**、**矩形的 y 坐标**、**矩形宽度**和**矩形高度**。这些参数的单位都是像素。

### 绘制路径

>2D 绘制上下文支持很多在画布上绘制路径的方法。通过路径可以创造出复杂的形状和线条。要绘制路径，首先必须调用 `beginPath()`方法，表示要开始绘制新路径。然后，再通过调用下列方法来实际地绘制路径。

* 绘制圆`arc(x, y, radius, startAngle, endAngle, counterclockwise)`：`以(x,y)`为圆心绘制一条弧线，弧线半径为 `radius`，起始和结束角度（用弧度表示）分别为 `startAngle` 和 `endAngle`。最后一个参数表示 `startAngle` 和 `endAngle` 是否按逆时针方向计算，值为 `false` 表示按顺时针方向计算
```js
    context.beginPath();
    context.arc(100, 100, 50, (0 * Math.PI) / 180, (360 * Math.PI) / 180, true);
    context.closePath();
    context.stroke();
```

* 绘制弧线`arcTo(x1, y1, x2, y2, radius)`：从上一点开始绘制一条弧线，到`(x2,y2)`为止，并且以给定的半径 `radius` 穿过`(x1,y1)`。

* 绘制贝塞尔曲线`bezierCurveTo(c1x, c1y, c2x, c2y, x, y)`：从上一点开始绘制一条曲线，到`(x,y)`为止，并且以`(c1x,c1y)`和`(c2x,c2y)`为控制点。

* `lineTo(x, y)`：从上一点开始绘制一条直线，到`(x,y)`为止。

* `moveTo(x, y)`：将绘图游标移动到(x,y)，不画线。

* `quadraticCurveTo(cx, cy, x, y)`：从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cx,cy)作为控制点。

* `rect(x, y, width, height)`：从点`(x,y)`开始绘制一个矩形，宽度和高度分别由 `width` 和 `height` 指定。这个方法绘制的是矩形路径，而不是 `strokeRect()` 和 `fillRect()` 所绘制的独立的形状。

创建了路径后，接下来有几种可能的选择。

如果想绘制一条连接到路径起点的线条，可以调用 `closePath()`。

如果路径已经完成，你想用 `fillStyle` 填充它，可以调用 `fill()` 方法。

另外，还可以调用 `stroke()`方法对路径描边，描边使用的是 `strokeStyle`。

最后还可以调用 `clip()`，这个方法可以在路径上创建一个剪切区域。

::: tip TIP

由于路径的使用很频繁，所以就有了一个名为 `isPointInPath()` 的方法。

这个方法接收 `x` 和 `y` 坐标作为参数，用于在路径被关闭之前确定画布上的某一点是否位于路径上.
:::

```js
if (context.isPointInPath(100, 100)){ 
    alert("Point (100, 100) is in the path."); 
}
```

**绘制文本**

绘制文本主要有两个方法：`fillText()`和 `strokeText()`。

这两个方法都可以接收 4 个参数：要绘制的文本字符串、`x` 坐标、`y` 坐标和可选的最大像素宽度。而且，这两个方法都以下列 3 个属性为基础：

* `font`：表示文本样式、大小及字体，用 CSS 中指定字体的格式来指定，例如"10px Arial"。
* `textAlign`：表示文本对齐方式，"`start`"、"end"、"`left`"、"`right`"和"`center`"。建议使用"`start`"和"`end`"，不要使用"`left`"和"`right`"，因为前两者的意思更稳妥，能同时适合从左到右和从右到左显示（阅读）的语言。
* `textBaseline`：表示文本的基线,"`top`"、"`hanging`"、"`middle`"、"`alphabetic`"、 "`ideographic`"和"`bottom`"。

**变换**

通过上下文的变换，可以把处理后的图像绘制到画布上。2D 绘制上下文支持各种基本的绘制变换。创建绘制上下文时，会以默认值初始化变换矩阵，在默认的变换矩阵下，所有处理都按描述直接绘制。为绘制上下文应用变换，会导致使用不同的变换矩阵应用处理，从而产生不同的结果。

* `rotate(angle)`：围绕原点旋转图像 `angle` 弧度。
* `scale(scaleX, scaleY)`：缩放图像，在 `x` 方向乘以 `scaleX`，在 `y` 方向乘以 `scaleY`。`scaleX和` `scaleY` 的默认值都是 `1.0`。
* `translate(x, y)`：将坐标原点移动到`(x,y)`。执行这个变换之后，坐标(`0,0`)会变成之前由(`x,y`)表示的点。
* `transform(m1_1, m1_2, m2_1, m2_2, dx, dy)`：直接修改变换矩阵，方式是乘以如下矩阵。 `m1_1 m1_2 dx m2_1 m2_2 dy 0 0 1`
* `setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)`：将变换矩阵重置为默认状态，然后 再调用 `transform()`。

**绘制图像**

2D 绘图上下文内置了对图像的支持。如果你想把一幅图像绘制到画布上，可以使用 `drawImage()`方法。

```js
// simple
var image = document.images[0]; 
context.drawImage(image, 10, 10);

// img startPoint endPoint width height
context.drawImage(image, 50, 10, 20, 30);

// img startPoint endPoint width height targetX targetY targetWidth targetHeight
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);
```

**阴影**

2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。

* `shadowColor`：用 `CSS` 颜色格式表示的阴影颜色，默认为黑色。
* `shadowOffsetX`：形状或路径 `x` 轴方向的阴影偏移量，默认为 0。
* `shadowOffsetY`：形状或路径 `y` 轴方向的阴影偏移量，默认为 0。
* `shadowBlur`：模糊的像素数，默认 0，即不模糊。

这些属性都可以通过 `context` 对象来修改。只要在绘制前为它们设置适当的值，就能自动产生阴影。例如：

```js
var context = drawing.getContext("2d"); 
// 设置阴影
context.shadowOffsetX = 5; 
context.shadowOffsetY = 5; 
context.shadowBlur = 4; 
context.shadowColor = "rgba(0, 0, 0, 0.5)"; 
// 绘制红色矩形
context.fillStyle = "#ff0000"; 
context.fillRect(10, 10, 50, 50); 
// 绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```

**渐变**

渐变由 `CanvasGradient` 实例表示，很容易通过 2D 上下文来创建和修改。要创建一个新的线性渐变，可以调用 `createLinearGradient()` 方法。

这个方法接收 4 个参数：起点的 x 坐标、起点的 y 坐标、终点的 x 坐标、终点的 y 坐标。调用这个方法后，它就会创建一个指定大小的渐变，并返回 `CanvasGradient` 对象的实例。

创建了渐变对象后，下一步就是使用 `addColorStop()` 方法来指定色标。

这个方法接收两个参数：色标位置和 `CSS` 颜色值。色标位置是一个 0（开始的颜色）到 1（结束的颜色）之间的数字。例如：

```js
var gradient = context.createLinearGradient(0, 0, 0, 400); 
gradient.addColorStop(0, "white"); 
gradient.addColorStop(0.5, "skyblue"); 
gradient.addColorStop(1, "black");
context.fillStyle=gradient;
context.fillRect(800, 0, 400, 400)
```

## WebGL

### 类型化数组
***

`WebGL` 涉及的复杂计算需要提前知道数值的精度，而标准的 `JavaScript` 数值无法满足需要。为此，`WebGL` 引入了一个概念，叫类型化数组（`typed arrays`）。类型化数组也是数组，只不过其元素被设置为特定类型的值。

类型化数组的核心就是一个名为 `ArrayBuffer` 的类型。每个 `ArrayBuffer` 对象表示的只是内存中指定的字节数，但不会指定这些字节用于保存什么类型的数据。**通过 `ArrayBuffer` 所能做的，就是为了将来使用而分配一定数量的字节。** 例如，下面这行代码会在内存中分配 `20B`。

```js
// 内存中分配20B
var buffer = new ArrayBuffer(20);
```

### WebGL上下文

```js
var drawing = document.getElementById("drawing"); 
//确定浏览器支持<canvas>元素
if (drawing.getContext){ 
var gl = drawing.getContext("webgl"); 
	if (gl){ 
 		// 使用 WebGL 
 	} 
}
```

## HTML5 脚本编程

### 跨文档消息传递

**跨文档消息传送（`cross-document messaging`），有时候简称为 `XDM`，指的是在来自不同域的页面间传递消息。**
   
例如，`www.wrox.com`域中的页面与位于一个内嵌框架中的 `p2p.wrox.com` 域中的页面通信。

在 `XDM` 机制出现之前，要稳妥地实现这种通信需要花很多工夫。`XDM` 把这种机制规范化，让我们能既稳妥又简单地实现跨文档通信。

`XDM` 的核心是 `postMessage()`方法。在 `HTML5` 规范中，除了 `XDM` 部分之外的其他部分也会提到这个方法名，但都是为了同一个目的：**向另一个地方传递数据。对于 `XDM` 而言，“另一个地方”指的是包含在当前页面中的`<iframe>`元素，或者由当前页面弹出的窗口。**

::: tip TIP

`postMessage()`方法接收两个参数：一条消息和一个表示消息接收方来自哪个域的字符串。第二个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方。来看下面的例子。
:::

```js
// 注意：所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性
var iframeWindow = document.getElementById("myframe").contentWindow; 
iframeWindow.postMessage("A secret", "http://www.wrox.com");
```

接收到 `XDM` 消息时，会触发 `window` 对象的 `message` 事件。

这个事件是以异步形式触发的，因此从发送消息到接收消息（触发接收窗口的 `message` 事件）可能要经过一段时间的延迟。触发 `message` 事件后，传递给 `onmessage` 处理程序的事件对象包含以下三方面的重要信息。

* `data`：作为 `postMessage()` 第一个参数传入的字符串数据。
* `origin`：发送消息的文档所在的域，例如`"http://www.wrox.com"`。
* `source`：发送消息的文档的 `window` 对象的代理。这个代理对象主要用于在发送上一条消息的窗口中调用 `postMessage()`方法。如果发送消息的窗口来自同一个域，那这个对象就是 `window`。

## CORS 跨域处理

`CROS`(跨域资源共享)是一种基于 `HTTP` 头的机制，该机制通过允许服务器标示除了它自己以外的其它 `origin（域，协议和端口）`，这样浏览器可以访问加载这些资源。

跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的`预检`请求。在预检中，浏览器发送的头中标示有 `HTTP` 方法和真实请求中会用到的头。

跨源资源共享标准新增了一组 `HTTP` 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 `HTTP` 请求方法（特别是 `GET` 以外的 `HTTP` 请求，或者搭配某些 `MIME` 类型的 `POST` 请求），浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求（`preflight request`），从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 `HTTP` 请求。

在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 `Cookies` 和 `HTTP` 认证相关数据）。

`CORS` 请求失败会产生错误，但是为了安全，在 `JavaScript` 代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。

由于浏览器同源策略的限制，非同源下的请求，都会产生跨域问题。

>同源策略即：同一协议，同一域名，同一端口号。当其中一个不满足时，我们的请求即会发生跨域问题。

1. 采用 `jsonp` 请求

不知道大家有没有注意，不管是我们的 `script` 标签的`src`还是`img`标签的`src`，或者说`link`标签的`href`他们没有被通源策略所限制，比如我们有可能使用一个网络上的图片，就可以请求得到。

`jsonp` 就是使用通源策略这一“`漏洞”`，实现的跨域请求（这也是`jsonp`跨域只能用`get`请求的原因所在）。

```js

<button id="btn">点击</button>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  <script>
    $('#btn').click(function(){
		var frame = document.createElement('script');
		frame.src = 'http://localhost:3000/article-list?name=leo&age=30&callback=func';
		$('body').append(frame);
	});

	function func(res){
		alert(res.message+res.name+'你已经'+res.age+'岁了');
	}
```

这里可以看到，我们声明了一个`func`函数，但没有执行，你可以想一下，如果服务端接口到`get`请求，返回的是`func({message:'hello'})`，这样的话在服务端不就可以把数据通过函数执行传参的方式实现数据传递了吗。

服务端代码

```js
router.get('/article-list', (req, res) => {
  console.log(req.query, '123');
  let data = {
    message: 'success!',
    name: req.query.name,
    age: req.query.age
  }
  data = JSON.stringify(data)
  res.end('func(' + data + ')');
```

::: warning WARNING

需要注意的是，`callback` 参数定义的方法是需要前后端定义好的，具体什么名字，商讨好就可以了。

其实 `jsonp` 的整个过程就类似于前端声明好一个函数，后端返回执行函数。执行函数参数中携带所需的数据，整个过程实际非常简单易懂。
:::

2. document.domain

这种方式常用于 `iframe` 通信，用在`主域名相同子域名不同的跨域访问中`。

`http://a.frame.com` 和 `http://b.frame.com` 他们的主域名都是 `frame.com`。

这两个域名中的文件可以用这种方式进行访问，通过在两个域中具体的文件中设置`document.domain="frame.com"`就可达到跨域访问的目的。

3. window.name

常用于 `iframe` 中。

`window` 的 `name` 属性有个特征：在一个窗口(`window`)的生命周期内,窗口载入的所有的页面都是共享一个`window.name`的，每个页面对`window.name`都有读写的权限，`window.name`是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

4. window.postMessage

`window.postMessages`是`HTML5`中实现跨域访问的一种新方式，可以使用它来向其它的`window`对象发送消息，无论这个`window`对象是属于同源或不同源。

该方式的使用还是十分简单的，给要发送数据的页面中的`window`对象调用一个`postMessage(message,targetOrigin)`方法即可。

该方法的第一个参数`message`为要发送的消息，类型只能为`字符串`；

第二个参数 `targetOrigin` 用来限定接收消息的那个 `window` 对象所在的域，如果不想限定域，直接使用通配符 '*' 。

再让接收数据页面的 `window` 对象监听自身的 `message` 事件来获取传过来的消息，消息内容储存在该事件对象的 `data` 属性中。

5. CORS(Cross-Origin Resource Sharing)

`CORS` 是官方推荐解决跨域问题的方案。

`CORS` 使用一些 `HTTP` 头信息——包括请求和返回——为了让工作继续开展下去，你必须了解一下的一些头信息：

* `Access-Control-Allow-Origin`

这个头部信息由服务器返回，用来明确指定那些客户端的域名允许访问这个资源。它的值可以是： 

1. ` *` —— 允许任意域名 
2.一个完整的域名名字（比如：`https://example.com`）

* `Access-Control-Allow-Credentials`

这个头部信息只会在服务器支持通过 `cookies` 传递验证信息的返回数据里。它的值只有一个就是 `true`。

跨站点带验证信息时，服务器必须要争取设置这个值，服务器才能获取到用户的 `cookie`。

* `Access-Control-Allow-Headers`

提供一个逗号分隔的列表表示服务器支持的请求数据类型。

假如你使用自定义头部(比如：`x-authentication-token` 服务器需要在返回`OPTIONS`请求时，要把这个值放到这个头部里，否则请求会被阻止)。

* `Access-Control-Expose-Headers`

相似的，这个返回信息里包含了一组头部信息，这些信息表示那些客户端可以使用。其他没有在里面的头部信息将会被限制。

* `Access-Control-Allow-Methods`
一个逗号分隔的列表，表明服务器支持的请求类型（比如：`GET`, `POST`）

6. 配置代理服务器。

可以配置`nginx`服务器,服务器与服务器之间访问是不跨域的。
