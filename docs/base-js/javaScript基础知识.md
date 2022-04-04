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








