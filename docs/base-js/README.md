# 前端基础知识部分

## 文档对象模型

### 定义
`DOM` 是` Document Object Model`（文档对象模型）的缩写。

`DOM `是` W3C`（万维网联盟）的标准。

`DOM` 定义了访问 `HTML` 和 `XML` 文档的标准：

`DOM`是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。

`W3C DOM` 标准被分为 3 个不同的部分：

核心 `DOM` - 针对任何结构化文档的标准模型
* `XML` `DOM` - 针对 `XML` 文档的标准模型
* `HTML` `DOM` - 针对 `HTML` 文档的标准模型
* `!DOCTYPE html` 作用

### !DOCTYPE html 作用
`<!DOCTYPE>` 声明必须是 HTML 文档的第一行，位于 `<html>` 标签之前。

`HTML`版本有很多种，这个声明告诉浏览器采用 HTML5 标准网页声明来解析`html`文件。

---

### DTD 语法（文档类型定义）
DTD 的全称是 `Document Type Defination`，也就是文档类型定义。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。

---

### 严格模式和混杂模式
* `严格模式`下排版和 js 运作模式是以该浏览器支持的最高标准运行。

* `混杂模式`下浏览器向后兼容，模拟老浏览器，防止浏览器无法兼容页面。

---

### DOM 级别

* dom1级：如何映射基于 XML 的文档结构，以便简化对文档中任意部分的访问和操作。
* dom2级：在原来的基础上又扩充了鼠标和用户界面事件、范围、遍历(迭代 DOM 文档的方法)等细分模块，而且通过对象接口增加了对 CSS 的支持。
* dom3级：在 dom2 的基础上进一步引入了以统一方式加载和保存文档的方法——在 DOM 加载和保存(DOM Load and Save)模块中定义;新增了验证文档的方法——在 DOM 验证(DOM Validation)模块中定义。DOM3 级也对 DOM 核心进行了扩展，开始支持 XML 1.0 规范，涉及 XML Infoset、XPath 和 XML Base。

---

### 节点层次
```html
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```
可以将这个简单的`HTML`文档表示为一个层次结构:
![01](/images/base-js01.png)
节点之间的关系图:
![02](/images/base-js01.png)

### 节点操作
* appendChild():用于向指定节点末尾追加一个节点，如果传入到 appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。
```js
someNode.appendChild(newNode);
```
* insertBefore():在指定节点之间插入一个新的节点。
```js
someNode.insertBefore(newNode, exitNode);
```
* replaceChild():将一个节点替换成指定节点。
```js
someNode.replaceChild(newNode, exitNode);
```
* removeChild():移除某个指定节点。
``` js
someNode.removeChild(exitNode);
```
* cloneNode():复制某个节点。cloneNode()方法接受一个布尔值参数，表示是否执行深复制。
```js
someNode.cloneNode(false); // 只复制节点本身
someNode.cloneNode(true); // 复制节点及其整个子节点树
 ```
 ---
 
 
### 设置浏览器文档标题

```js
// 设置文档标题
document.title = "New page title";
```

---

### 查找元素

* `document.getElementById('id')`:如果页面中多个元素的 ID 值相同，`getElementById()`只返回文档中第一次出现的元素。
* `document.getElementsByTagName('a')`:返回文档中所有`<a>`元素。
* `document.getElementsByName('aa')`:返回文档中所有name为aa的元素。
* `document.anchors`:返回文档中所有带name特性的`<a>`元素。
* `document.forms`:返回文档中所有的`<form>`元素。
* `document.images`:返回文档中所有的`<img>`元素。
* `document.links`:返回文档中所有带href特性的`<a>`元素

---

### 创建元素
* `document.createElement('div')`:这个方法只接受一个参数，即要创建元素的标签名。
::: warning WARNING
在新元素上设置这些特性只是给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用 appendChild()、insertBefore()或 replaceChild()方法。
:::

```js
document.body.appendChild(div);
```
一旦将元素添加到文档树中，浏览器就会立即呈现该元素。此后，对这个元素所作的任何修改都会实时反映在浏览器中。

---

### 创建文本节点
`document.createTextNode()`:该方法接受一个参数——要插入节点中的文本。

```js
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
document.body.appendChild(element);
```

---

### 规范化文本节点

`DOM`文档中存在相邻的同胞文本节点很容易导致混乱，因为分不清哪个文本节点表示哪个字符串。另外，`DOM`文档中出现相邻文本节点的情况也不在少数，于是就催生了一个能够将相邻文本节点合并的方法。

这个方法是由 `Node` 类型定义的（因而在所有节点类型中都存在）`normalize()`。

::: tip TIP
   如果在一个包含两个或多个文本节点的父元素上调用 normalize()方法，则会将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值。来看一个例子:
:::
```js
let element = document.createElement("div");
element.className = "message";

let textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

let anotherTextNode = document.createTextNode("Yippee!");

element.appendChild(anotherTextNode);
document.body.appendChild(element);
alert(element.childNodes.length); //2
element.normalize();
alert(element.childNodes.length); //1
alert(element.firstChild.nodeValue); // "Hello world!Yippee!"
```

---

### DOM 操作技术

1. 动态脚本

使用`<script>`元素可以向页面中插入`JavaScript`代码，一种方式是通过其`src`特性包含外部文件，另一种方式就是用这个元素本身来包含代码。跟操作`HTML`元素一样，创建动态脚本也有两种方式：
* 插入外部文件。
* 直接插入`JavaScript`代码。

```js

function loadScript(url) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}
// 加载脚本代码
function loadScriptString(code) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  try {
    script.appendChild(document.createTextNode(code));
  } catch (ex) {
    script.text = code;
  }
  document.body.appendChild(script);
}
```

---

2. 动态样式

能够把`CSS`样式包含到`HTML`页面中的元素有两个。其中，`<link>`元素用于包含来自外部的文件，而`<style>`元素用于指定嵌入的样式。与动态脚本类似，所谓动态样式是指在页面刚加载时不存在的样式；动态样式是在页面加载完成后动态添加到页面中的。

```js

function loadStyles(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

function loadStyleString(css) {
  var style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
```
::: warning 
需要注意的是，必须将`<link>`元素添加到`<head>`而不是`<body>`元素，才能保证在所有浏览器中的行为一致。
:::

### DOM 扩展

1. 选择符 API
Selectors API Level 1 的核心是两个方法：`querySelector`()和 `querySelectorAll`()。

* `querySelector`()方法:接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。
::: tip TIP
 通过 `Document` 类型调用 `querySelector`()方法时，会在文档元素的范围内查找匹配的元素。
 而通过 `Element` 类型调用 `querySelector`()方法时，只会在该元素后代元素的范围内查找匹配的元素。
:::

* `querySelectorAll`()方法:接收的参数与 `querySelector`()方法一样，都是一个CSS选择符，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是NodeList的实例。
`Selectors API Level 2` 规范为 `Element` 类型新增了一个方法 `matchesSelector`()。

* matchesSelector()方法:接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回true；否则，返回 `false`。
::: tip TIP
 我们需要注意，`getElementById`、`getElementsByName`、`getElementsByTagName`、`getElementsByClassName`，
 这几个 `API` 的性能高于 `querySelector`。而 `getElementsByName`、`getElementsByTagName`、`getElementsByClassName` 
 获取的集合并非数组，而是一个能够动态更新的集合。
 
 浏览器内部是有高速的索引机制，来动态更新这样的集合的。
 但是,尽管 `querySelector` 系列的 API 非常强大，我们还是应该尽量使用 `getElement` 系列的 `API`。
:::

### HTML5 扩充

1. 与类相关的扩充

* `getElementsByClassName()`方法:接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的`NodeList`。传入多个类名时，类名的先后顺序不重要。

* `classList` 属性

HTML5 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加`classList`属性。

这个`classList`属性是新集合类型`DOMTokenList` 的实例。与其他 `DOM` 集合类似，`DOMTokenList` 有一个表示自己包含多少元素的 `length` 属性，而要取得每个元素可以使用`item()`方法，也可以使用方括号语法。此外，这个新类型还定义如下方法。

```markdown

1. `getElementsByClassName`()方法:接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的 `NodeList`。传入多个类名时，类名的先后顺序不重要。
2. `classList` 属性
3. `HTML5` 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加 `classList` 属性。
4. 这个 `classList` 属性是新集合类型 `DOMTokenList` 的实例。与其他 `DOM` 集合类似，`DOMTokenList` 有一个表示自己包含多少元素的 `length` 属性，而要取得每个元素可以使用`item()`方法，也可以使用方括号语法。此外，这个新类型还定义如下方法。
```
2. 焦点管理

* `focus`()方法
* `document.hasFocus`()方法，这个方法用于确定文档是否获得了焦点。

3. HTMLDocument 的变化

* `readyState` 属性 `Document` 的 `readyState` 属性有两个可能的值：
1. `loading`，正在加载文档；
2. `complete`，已经加载完文档。

使用 `document.readyState` 的最恰当方式，就是通过它来实现一个指示文档已经加载完成的指示器。

```js

if (document.readyState == "complete") {
  // 执行操作
}
```

* 兼容模式 自从 `IE6` 开始区分渲染页面的模式是标准的还是混杂的，检测页面的兼容模式就成为浏览器的必要功能。`IE` 为此给 `document` 添加了一个名为 `compatMode` 的属性，这个属性就是为了告诉开发人员浏览器采用了哪种渲染模式。

::: tip TIP
 在标准模式下，`document.compatMode` 的值等于"`CSS1Compat`"，而在混杂模式下，`document.compatMode` 的值等于"`BackCompat`"。
:::

```js
if (document.compatMode == "CSS1Compat") {
  alert("Standards mode");
} else {
  alert("Quirks mode");
}
```

* `head` 属性

`HTML5` 新增了 `document.head` 属性，引用文档的`<head>`元素。

```js
let head = document.head || document.getElementsByTagName("head")[0];
```

4. 字符集属性

`HTML5`新增了几个与文档字符集有关的属性。其中，`charset` 属性表示文档中实际使用的字符集，
也可以用来指定新字符集。默认情况下，这个属性的值为"`UTF-16`"，
但可以通过`<meta>`元素、响应头部或直接设置 `charset` 属性修改这个值。

5. scrollIntoView()方法

::: tip TIP
  scrollIntoView()可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。
  
  * 如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。
  
  * 如果传入false 作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口顶部平齐。）不过顶部不一定平齐。
:::
` dome` 如下

```html
<html>
	<head>
		<title>HTML5_ScrollInToView方法</title>
		<meta  charset="utf-8">
		<script type="text/javascript">
			window.onload = function(){
				/*
					如果滚动页面也是DOM没有解决的一个问题。为了解决这个问题，浏览器实现了一下方法，
				以方便开发人员如何更好的控制页面的滚动。在各种专有方法中，HTML5选择了scrollIntoView()
				作为标准方法。
					scrollIntoView()可以在所有的HTML元素上调用，通过滚动浏览器窗口或某个容器元素，
				调用元素就可以出现在视窗中。如果给该方法传入true作为参数，或者不传入任何参数，那么
				窗口滚动之后会让调动元素顶部和视窗顶部尽可能齐平。如果传入false作为参数，调用元素
				会尽可能全部出现在视口中（可能的话，调用元素的底部会与视口的顶部齐平。）不过顶部
				不一定齐平，例如：
				//让元素可见
				document.forms[0].scrollIntoView();
				当页面发生变化时，一般会用这个方法来吸引用户注意力。实际上，为某个元素设置焦点也
				会导致浏览器滚动显示获得焦点的元素。
					支持该方法的浏览器有 IE、Firefox、Safari和Opera。
				*/
				
				
				document.querySelector("#roll1").onclick = function(){
					document.querySelector("#roll_top").scrollIntoView(false);
				}
				document.querySelector("#roll2").onclick = function(){
					document.querySelector("#roll_top").scrollIntoView(true);
				}
			}
		</script> 
		<style type="text/css">
			#myDiv{
				height:900px;
				background-color:gray;
				
			}
			#roll_top{
				height:900px;
				background-color:green;
				color:#FFF;
				font-size:50px;
				position:relative;
			}
			#bottom{
				position:absolute;
				display:block;
				left;0;bottom:0;
			}
		</style>
	</head>
	<body>
		<button id="roll1">scrollIntoView(false)</button>
		<button id="roll2">scrollIntoView(true)</button>
		<div id="myDiv"></div>
		<div id="roll_top">
			scrollIntoView(ture)元素上边框与视窗顶部齐平
			<span id="bottom">scrollIntoView(false)元素下边框与视窗底部齐平</span>
		</div> 
	</body>
</html>
```


6. 文档模式

要强制浏览器以某种模式渲染页面，可以使用 `HTTP` 头部信息 `X-UA-Compatible`，或通过等价的`<meta>`标签来设置：

```html

 <meta http-equiv="X-UA-Compatible" content="IE=IEVersion" />
```

`contains()方法`

在实际开发中，经常需要知道某个节点是不是另一个节点的后代。

```js
alert(document.documentElement.contains(document.body)); //true
```
::: tip TIP
        
 使用 DOM Level 3的compareDocumentPosition()方法也能够确定节点间的关系。
:::

![base-js](/images/base-js03.png)

7. 滚动

* `scrollIntoViewIfNeeded(alignCenter)`:只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的 `alignCenter` 参数设置为 `true`，则表示尽量将元素显示在视口中部（垂直方向）。

* `scrollByLines(lineCount)`：将元素的内容滚动指定的行高，`lineCount` 值可以是正值，也可以是负值。

* `scrollByPages(pageCount)`：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。

::: warning WARNING
 希望大家要注意的是，`scrollIntoView()`和 `scrollIntoViewIfNeeded()`的作用对象是元素的容器，而 `scrollByLines()`和 `scrollByPages()`影响的则是元素自身。
:::


---

### DOM2 和 DOM3

`DOM1` 级主要定义的是 `HTML` 和 `XML` 文档的底层结构。 `DOM2` 和 `DOM3` 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的 `XML` 特性。

1. 计算的样式

虽然 `style` 对象能够提供支持 `style` 特性的任何元素的样式信息，但它不包含那些从其他样式表层叠而来并影响到当前元素的样式信息。

`“DOM2 级样式”`增强了 `document.defaultView`，提供了`getComputedStyle()`方法。

::: warning
 getComputedStyles(el,null):要取得计算样式的元素和一个伪元素字符串（例如`:after`）。如果不需要伪元素信息，第二个参数可以是 `null`。
:::

```javascript
/**
 * @param {HTMLElement}  ele HTML元素
 * @param {CSSAttr}  attr 伪元素字符串
 *
 * @return CSSStyleDeclaration 对象（与 style 属性的类型一样,包含元素的计算属性)
 */
function getStyle(ele, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[attr];
  }
  return ele.currentStyle[attr];
}
```

### 元素大小

1. 偏移量 外边距

* `offsetHeight`:元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。
* `offsetWidth`：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
* `offsetLeft`：元素的左外边框至包含元素的左内边框之间的像素距离。
* `offsetTop`：元素的上外边框至包含元素的上内边框之间的像素距离。

其中，`offsetLeft` 和 `offsetTop` 属性与包含元素有关，包含元素的引用保存在 `offsetParent` 属性中。

![offsetParent](/images/base-js04.png)

2. 客户区大小 内边距
* clientWidth:是元素内容区宽度加上左右内边距宽度。
* clientHeight:元素内容区高度加上上下内边距高度。

![内边距](/images/base-js05.png)

3. 滚动大小

* `scrollHeight`：在没有滚动条的情况下，元素内容的总高度。
* `scrollWidth`：在没有滚动条的情况下，元素内容的总宽度。
* `scrollLeft`：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
* `scrollTop`：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。

### 确定元素大小

每个元素都提供了一个 `getBoundingClientRect()`方法。

这个方法返回一个矩形对象，包含 8 个属性：`left`、`top`、`right` 、 `bottom`、`width`、`height`、`x`、`y`。这些属性给出了元素在页面中相对于视口的位置。

```js
el.getBoundingClientRect();
```

### `DOM` 事件
::: tip 
`javaScript` 与 `HTML` 之间的交互是通过事件实现的。事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。
:::

1. 事件流

* `事件冒泡`: 事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（`document`）。

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Event Bubbling Example</title>
  </head>

  <body>
    <div id="myDiv">Click Me</div>
  </body>
</html>
```

如果你单击了页面中的`<div>`元素，那么这个 cl`ick 事件会按照如下顺序传播：

![06](/images/base-js06.png)

* `事件捕获` ：事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。*事件捕获的用意在于在事件到达预定目标之前捕获它*。

![07](/images/base-js07.png)

2. 捕获和冒泡

我们都知道捕获过程是从外向内，冒泡过程是从内向外,那么为什么需要事件捕获和冒泡呢?

这里引用一个故事:

我们现代的 `UI` 系统，都源自 `WIMP` 系统。`WIMP` 即 `Window Icon Menu Pointer` 四个要素，它最初由施乐公司研发，后来被微软和苹果两家公司应用在了自己的操作系统上。

`WIMP` 是由 `Alan Kay` 主导设计的，这位巨匠，同时也是面向对象之父和 `Smalltalk` 语言之父。

乔布斯曾经受邀参观施乐，他见到当时的 `WIMP` 界面，认为非常惊艳，不久后就领导苹果研究了新一代麦金塔系统。

后来，在某次当面对话中，乔布斯指责比尔盖茨抄袭了 `WIMP` 的设计，盖茨淡定地回答：“史蒂夫，我觉得应该用另一种方式看待这个问题。这就像我们有个叫施乐的有钱邻居，当我闯进去想偷走电视时，却发现你已经这么干了。”

但是不论如何，苹果和微软的数十代操作系统，极大地发展了这个体系，才有了我们今天的 UI 界面。

回归到之前的问题上:

实际上点击事件来自触摸屏或者鼠标，鼠标点击并没有位置信息，但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。

::: tip TIP
 那么，把这个坐标转换为具体的元素上事件的过程，就是捕获过程了。而冒泡过程，则是符合人类理解逻辑的：当你按电视机开关时，你也按到了电视机。
 
 所以我们可以认为，捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑。
:::

参考例子如下：

```html
<body>
  <input id="i" />
</body>
```
```js
document.body.addEventListener(
  "mousedown",
  () => {
    console.log("key1");
  },
  true
);

document.getElementById("i").addEventListener(
  "mousedown",
  () => {
    console.log("key2");
  },
  true
);

document.body.addEventListener(
  "mousedown",
  () => {
    console.log("key11");
  },
  false
);

document.getElementById("i").addEventListener(
  "mousedown",
  () => {
    console.log("key22");
  },
  false
);

// key1 key2 key22 key11
```
在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

::: tip TIP
 在我们实际监听事件时，我建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。
:::

理解了冒泡和捕获的过程，我们再看监听事件的 API，就非常容易理解了。

addEventListener 有三个参数：

* 事件名称；
* 事件处理函数；
* 捕获还是冒泡。

事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象，看下例子：

```js
let o = {
  handleEvent: (event) => console.log(event),
};
document.body.addEventListener("keydown", o, false);
```

第三个参数不一定是 bool 值，也可以是个对象，它提供了更多选项。

* once：只执行一次。
* passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
* useCapture：是否捕获（否则冒泡）。

实际使用，在现代浏览器中，还可以不传第三个参数，我建议默认不传第三个参数，因为我认为冒泡是符合正常的人类心智模型的，大部分业务开发者不需要关心捕获过程。除非你是组件或者库的使用者，那就总是需要关心冒泡和捕获了。

3. 自定义事件

除了来自输入设备的事件，还可以自定义事件，实际上事件也是一种非常好的代码架构，但是 DOM API 中的事件并不能用于普通对象，所以很遗憾，我们只能在 DOM 元素上使用自定义事件。

dome 如下代码

```js 
var evt = new Event("look", { bubbles: true, cancelable: false });
document.dispatchEvent(evt);
```

这里使用 Event 构造器来创造了一个新的事件，然后调用 dispatchEvent 来在特定元素上触发。

我们可以给这个 Event 添加自定义属性、方法。

::: warning WARNING
 注意，这里旧的自定义事件方法（使用 `document.createEvent` 和 `initEvent`）已经被废弃。
:::

4. DOM 事件流

`DOM2` 级事件规定的事件流包括三个阶段：`事件捕获阶段`、`处于目标阶段`和`事件冒泡阶段`。

1. 首先发生的是事件捕获，为截获事件提供了机会。
2. 然后是实际的目标接收到事件。
3. 最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。

![08](/images/base-js08.png)

::: tip TIP
 
 在 `DOM` 事件流中，实际的目标（`<div>`元素）在捕获阶段不会接收到事件。
 
 这意味着在捕获阶段，事件从 `document` 到`<html>`再到`<body>`后就停止了。
 
 下一个阶段是“处于目标”阶段，于是事件在`<div>`上发生，并在事件处理中被看成冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。
:::

### DOM 事件处理程序

事件就是用户或浏览器自身执行的某种动作。诸如 `click`、`load` 和 `mouseover`，都是事件的名字。而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。

1. DOM0 级事件处理程

通过JavaScript指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。

```js
let btn = document.getElementById("myBtn");
btn.onclick = function() {
  alert("Clicked");
};
```

在此，我们通过文档对象取得了一个按钮的引用，然后为它指定了onclick事件处理程序。*但要注意，在这些代码运行以前不会指定事件处理程序，因此如果这些代码在页面中位于按钮后面，就有可能在一段时间内怎么单击都没有反应。*

::: tip TIP
 
 使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行；换句话说，程序中的 this 引用当前元素。来看一个例子:
:::

```js
let btn = document.getElementById("myBtn");
btn.onclick = function() {
  alert(this.id); //"myBtn"
};
```

::: tip TIP
        
        DOM0 级添加的事件处理程序会在事件流的冒泡阶段被处理。
        
        也可以删除通过 DOM0级方法指定的事件处理程序，只要像下面这样将事件处理程序属性的值设置为null即可：
 :::

```js
btn.onclick = null; // 删除事件处理程序
```

2. DOM2 级事件处理程序

“`DOM2 级事件`”定义了两个方法，用于处理指定和删除事件处理程序的操作：`addEventListener()`和 `removeEventListener()`。

所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：

1. 要处理的事件名
2. 事件处理程序的函数
3. 一个布尔值。

::: tip TIP
        
 最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。
:::

```js
/**
 * eventName
 * handler
 * capture | bind
 */
var btn = document.getElementById("myBtn");
btn.addEventListener(
  "click",
  function() {
    alert(this.id);
  },
  false
);
```

上面的代码为一个按钮添加了 `onclick` 事件处理程序，而且该事件会在冒泡阶段被触发。

::: tip TIP

与 `DOM0` 级方法一样，这里添加的事件处理程序也是在其依附的元素的作用域中运行。

使用 `DOM2` 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。
:::

```js
var btn = document.getElementById("myBtn");
btn.addEventListener(
  "click",
  function() {
    alert(this.id);
  },
  false
);

btn.addEventListener(
  "click",
  function() {
    alert("Hello world!");
  },
  false
);
```

::: warning WARNING
            
 通过 `addEventListener()`添加的事件处理程序只能使用 `removeEventListener()`来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过 `addEventListener()`添加的匿名函数将无法移除，如下面的例子所示:
:::

```js
let btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
 	alert(this.id);
});
//这里省略了其他代码
btn.removeEventListener("click", function(){ // 没有用！
 	alert(this.id);
}, false);
```

`event` 对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。不过，所有事件都会有下表列出的成员。

![09](/images/base-js09.png)

::: tip TIP
        
在事件处理程序内部，对象 `this` 始终等于 `currentTarget` 的值，而 `target` 则只包含事件的实际目标。

如果直接将事件处理程序指定给了目标元素，则 `this`、`currentTarget` 和 `target` 包含相同的值
:::

```js
let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
  alert(event.currentTarget === this); // true
  alert(event.target === this); // true
};
```

如果事件处理程序存在于按钮的父节点中（例如 `document.body`），那么这些值是不相同的。

```js
document.body.onclick = function(event) {
  alert(event.currentTarget === document.body); //true
  alert(this === document.body); //true
  alert(event.target === document.getElementById("myBtn")); //true
};
```

当单击这个例子中的按钮时，`this` 和 `currentTarget` 都等于 `document.body`，因为事件处理程序是注册到这个元素上的。然而，`target` 元素却等于按钮元素，因为它是 `click` 事件真正的目标。

::: tip TIP
        
 简单的理解就是 `currentTarget` 保存着事件的真实注册者，`target` 保存着事件触发的目标。
:::

*要阻止特定事件的默认行为，可以使用 `preventDefault()`方法。另外，`stopPropagation()`方法用于立即停止事件在 DOM 层次中的传播，即取消进一步的事件捕获或冒泡*

::: tip TIP

事件对象的 `eventPhase` 属性，可以用来确定事件当前正位于事件流的哪个阶段。
:::

* 如果是在捕获阶段调用的事件处理程序，那么eventPhase 等于 1；
* 如果事件处理程序处于目标对象上，则 eventPhase 等于 2；
* 如果是在冒泡阶段调用的事件处理程序，eventPhase 等于 3。

::: warning WARNING
            
 这里要注意的是，尽管“处于目标”发生在冒泡阶段，但 `eventPhase` 仍然一直等于 2。
:::

```javascript
let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
  alert(event.eventPhase); // 2
};
document.body.addEventListener(
  "click",
  function(event) {
    alert(event.eventPhase); // 1
  },
  true
);
document.body.onclick = function(event) {
  alert(event.eventPhase); // 3
};

// 1————>2————>3
```

### 事件类型

`Web` 浏览器中可能发生的事件有很多类型。如前所述，不同的事件类型具有不同的信息，而`“DOM3级事件”`规定了以下几类事件。

* `UI（User Interface，用户界面）事件`，当用户与页面上的元素交互时触发；
* `焦点事件`，当元素获得或失去焦点时触发；
* `鼠标事件`，当用户通过鼠标在页面上执行操作时触发；
* `滚轮事件`，当使用鼠标滚轮（或类似设备）时触发；
* `文本事件`，当在文档中输入文本时触发；
* `键盘事件`，当用户通过键盘在页面上执行操作时触发；
* `合成事件`，当为 `IME（Input Method Editor，输入法编辑器）`输入字符时触发；
* `变动（mutation）事件`，当底层 `DOM` 结构发生变化时触发。


1. UI 事件
* `load`：当页面完全加载后在 `window` 上面触发，当所有框架都加载完毕时在框架集上面触发,当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面触发。

* `unload`：当页面完全卸载后在 `window` 上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在`<object>`元素上面触发。只要用户从一个页面切换到另一个页面，就会发生 `unload` 事件。

* `abort`：在用户停止下载过程时，如果嵌入的内容没有加载完，则在`<object>`元素上面触发。
* 
* `error`：当发生 `JavaScript` 错误时在 `window` 上面触发，当无法加载图像时在`<img>`元素上面触发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发。

* `select`：当用户选择文本框（`<input>`或`<texterea>`）中的一或多个字符时触发。

* `resize`：当窗口或框架的大小变化时在 `window` 或框架上面触发。

* `scroll`：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>` 元素中包含所加载页面的滚动条。


2. 键盘事件

![10](/images/base-js10.png)
![11](/images/base-js10.png)

3. H5新增事件

1. `HTML5` 新增了 `hashchange` 事件，以便在 `URL` 的参数列表（及 `URL` 中`“#”`号后面的所有字符串）发生变化时通知开发人员。

```js
EventUtil.addHandler(window, "hashchange", function(event) {
  alert("Current hash: " + location.hash);
  alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
});
```
2. `orientationchange` 事件

苹果公司为移动 `Safari` 中添加了 `orientationchange` 事件，以便开发人员能够确定用户何时将设备由横向查看模式切换为纵向查看模式。

移动 `Safari` 的 `window.orientation` 属性中可能包含 如下值：

* 0 表示肖像模式，
* 90 表示向左旋转的横向模式（“主屏幕”按钮在右侧），
* -90 表示向右旋转的横向模式（“主屏幕”按钮在左侧）。
* 180 表示 iPhone 头朝下；

![12](/images/base-js12.png)

3. `deviceorientation` 事件

`deviceorientation` 事件的意图是告诉开发人员设备在空间中朝向哪儿，而不是如何移动。

* 触摸事件
* `touchstart`：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
* `touchmove`：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动。
* `touchend`：当手指从屏幕上移开时触发。
* `touchcancel`：当系统停止跟踪触摸时触发。
上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在 DOM 规范中定义，但它们却是以兼容 DOM 的方式实现的。

除了常见的 `DOM` 属性外，触摸事件还包含下列三个用于跟踪触摸的属性。

* `touches`：表示当前跟踪的触摸操作的 `Touch` 对象的数组。
* `targetTouchs`：特定于事件目标的 `Touch` 对象的数组。
* `changeTouches`：表示自上次触摸以来发生了什么改变的 `Touch` 对象的数组。

::: tip TIP
 在触摸屏幕上的元素时，这些事件（包括鼠标事件）发生的顺序如下：
 `touchstart`
 `mouseover`
 `mousemove`（一次）
 `mousedown`
 `mouseup`
 `click`
 `touchend`
:::

手势事件

iOS 2.0 中的 `Safari` 还引入了一组手势事件。当两个手指触摸屏幕时就会产生手势，手势通常会改变显示项的大小，或者旋转显示项。有三个手势事件，分别介绍如下：

* `gesturestart`：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
* `gesturechange`：当触摸屏幕的任何一个手指的位置发生变化时触发。
* `gestureend`：当任何一个手指从屏幕上面移开时触发。
  只有两个手指都触摸到事件的接收容器时才会触发这些事件。在一个元素上设置事件处理程序，意味着两个手指必须同时位于该元素的范围之内，才能触发手势事件（这个元素就是目标）。

  由于这些`事件冒泡`，所以将事件处理程序放在文档上也可以处理所有手势事件。此时，事件的目标就是两个手指都位于其范围内的那个元素。

  触摸事件和手势事件之间存在某种关系。当一个手指放在屏幕上时，会触发 `touchstart` 事件。如果另一个手指又放在了屏幕上，则会先触发 `gesturestart` 事件，随后触发基于该手指的 `touchstart` 事件。如果一个或两个手指在屏幕上滑动，将会触发 `gesturechange` 事件。但只要有一个手指移开，就会触发 `gestureend` 事件，紧接着又会触发基于该手指的 `touchend` 事件。

### 事件委托

::: tip TIP
 对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
:::

::: warning WARNING
 在使用事件时，需要考虑如下一些内存与性能方面的问题。
 
 有必要限制一个页面中事件处理程序的数量，数量太多会导致占用大量内存，而且也会让用户感觉页面反应不够灵敏。
 建立在事件冒泡机制之上的事件委托技术，可以有效地减少事件处理程序的数量。
 建议在浏览器卸载页面之前移除页面中的所有事件处理程序。
:::

### CSSOM

我们通常创建样式表也都是使用 `HTML` 标签来做到的，我们用 `style` 标签和 `link` 标签创建样式表，例如：

```html
<style title="Hello">
  a {
    color: red;
  }
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D" />
```
我们创建好样式表后，还有可能要对它进行一些操作。如果我们以 `DOM` 的角度去理解的话，这些标签在 `DOM` 中是一个节点，它们有节点的内容、属性，这两个标签中，`CSS` 代码有的在属性、有的在子节点。这两个标签也遵循 `DOM` 节点的操作规则，所以可以使用 `DOM API` 去访问。

但是，这样做的后果是我们需要去写很多分支逻辑，并且，要想解析 `CSS` 代码结构也不是一件简单的事情，所以，这种情况下，我们直接使用 `CSSOM API` 去操作它们生成的样式表，这是一个更好的选择。

我们首先了解一下 `CSSOM API` 的基本用法，一般来说，我们需要先获取文档中所有的样式表：

```js
document.styleSheets;
```

`document` 的 `styleSheets` 属性表示文档中的所有样式表，这是一个只读的列表，我们可以用方括号运算符下标访问样式表，也可以使用 `item` 方法来访问，它有 `length` 属性表示文档中的样式表数量。

样式表只能使用 `style` 标签或者 `link` 标签创建,我们虽然无法用 `CSSOM API` 来创建样式表，但是我们可以修改样式表中的内容。

```js
document.styleSheets[0].insertRule("p { color:pink; }", 0);
document.styleSheets[0].removeRule(0);
```

更进一步，我们可以获取样式表中特定的规则（Rule），并且对它进行一定的操作，具体来说，就是使用它的 cssRules 属性来实现：

```js
document.styleSheets[0].cssRules;
```
此外，`CSSOM` 还提供了一个非常重要的方法，来获取一个元素最终经过 `CSS` 计算得到的属性：

```js
window.getComputedStyle(elt, pseudoElt);
```
其中第一个参数就是我们要获取属性的元素，第二个参数是可选的，用于选择伪元素。

## 浏览器对象 BOM

### 定义

各个浏览器厂商针对`DOM`标准实现的用来获取或设置浏览器的属性、行为的一个对象。

BOM是由哪些对象组成？

* `window` : BOM中最顶层对象
* `screen` ：屏幕对象
* `location`： 地址栏对象
* `history`：历史记录对象
* `navigator`： 导航对象
* `document` ： 文档对象
* `frames` :框架集

### window对象

BOM的核心对象是 `window`，它表示浏览器的一个实例。

在浏览器中，`window` 对象有双重角色，它既是通过 `JavaScript` 访问浏览器窗口的一个接口，又是 `ECMAScript` 规定的 `Global` 对象。

这意味着在网页中定义的任何一个对象、变量和函数，都以 `window` 作为其 `Global` 对象，因此有权访问 `parseInt()` 等方法。

1. 全局作用域

全局变量不能通过 `delete` 操作符删除，而直接在 `window` 对象上的定义的属性可以。

```js
let age = 29; 
window.color = "red"; 
//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 false 
delete window.age; 
//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 true 
delete window.color; //returns true 
alert(window.age); // 29 
alert(window.color); // undefined
```

2. 窗口位置

```javascript
let leftPos = (typeof window.screenLeft == "number") ? 
 window.screenLeft : window.screenX; 
let topPos = (typeof window.screenTop == "number") ? 
 window.screenTop : window.screenY;
```
3. 窗口大小

```js
let pageWidth = window.innerWidth, pageHeight = window.innerHeight; 
if (typeof pageWidth != "number"){ 
    if (document.compatMode == "CSS1Compat"){ 
        pageWidth = document.documentElement.clientWidth; 
        pageHeight = document.documentElement.clientHeight; 
    } else { 
        pageWidth = document.body.clientWidth; 
        pageHeight = document.body.clientHeight; 
    } 
}
```
::: tip TIP
        
另外，使用 `resizeTo()`和 `resizeBy()`方法可以调整浏览器窗口的大小。

这两个方法都接收两个参数，其中 `resizeTo()` 接收浏览器窗口的新宽度和新高度，而`resizeBy()`接收新窗口与原窗口的宽度和高度之差。
:::

4. 导航和打开窗口

使用 `window.open()`方法既可以导航到一个特定的`url`，也可以打开一个新的浏览器窗口。

>window.open(url,name,features,replace);

5. 间歇调用和超时调用

`JavaScript` 是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。前者是在指定的时间过后执行代码，而后者则是每隔指定的时间就执行一次代码。
```javascript
setTimeout(function() { 
	alert("Hello world!"); 
}, 1000);
```
*第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。*

`JavaScript` 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就有一个`JavaScript`任务队列。这些任务会按照将它们添加到队列的顺序执行。

*`setTimeout()`的第二个参数告诉 `JavaScript` 再过多长时间把当前任务添加到队列中。*

如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。

调用 `setTimeout()`之后，该方法会返回一个数值 ID，表示超时调用。

这个超时调用`ID`是计划执行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用`clearTimeout()`方法并将相应的超时调用ID作为参数传递给它，如下所示:

```javascript
// 设置超时调用
let timeoutId = setTimeout(function() { 
	alert("Hello world!"); 
}, 1000); 
// 注意：把它取消
clearTimeout(timeoutId);
```

间歇调用与超时调用类似，只不过它会按照指定的时间间隔重复执行代码，直至间歇调用被取消或者页面被卸载。

```javascript
let num = 0; 
let max = 10; 
let intervalId = null; 
function incrementNumber() { 
	num++; 
 	// 如果执行次数达到了 max 设定的值，则取消后续尚未执行的调用
	 if (num == max) { 
	 	clearInterval(intervalId); 
	 	alert("Done"); 
	 } 
} 
intervalId = setInterval(incrementNumber, 500);
```

在这个例子中，变量 `num` 每半秒钟递增一次，当递增到最大值时就会取消先前设定的间歇调用。这个模式也可以使用超时调用来实现，如下所示:

```javascript
let num = 0; 
let max = 10; 
function incrementNumber() { 
    num++; 
    // 如果执行次数未达到 max 设定的值，则设置另一次超时调用
    if (num < max) { 
 	    setTimeout(incrementNumber, 500); 
    } else { 
 	    alert("Done"); 
    } 
} 
setTimeout(incrementNumber, 500);
```
::: tip TIP
        
在使用超时调用时，没有必要跟踪超时调用`ID`，因为每次执行代码之后，如果不再设置另一次超时调用，调用就会自行停止。

一般认为，使用超时调用来模拟`间歇调用`的是一种最佳模式。在开发环境下，很少使用真正的`间歇调用`，原因是后一个间歇调用可能会在前一个`间歇调`用结束之前启动。而像前面示例中那样使用`超时调用`，则完全可以避免这一点。

另外使用定时器的时候需要慎重，注意及时清理，避免内存溢出。
:::

### location 对象
`location` 是最有用的 `BOM` 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。

假设我们有如下一个url:

>http://localhost:8000/#/user/login?a=1&b=2

| 属性 | 例子 | 描述|
| --- | --- | --- |
|origin|	http://localhost:8000|	返回主机等信息|
|protocol|	http|	返回当前地址的协议类型 http 、 https|
|host|	localhost:8000|	返回当前的域名及端口号|
|hostname|	localhost	|返回当前的域名|
|port|	8000	|返回当前地址的端口号|
|pathname|	/	|返回当前页面所在目录路径|
|search|	""	|返回当前地址所带的参数如果没有返回空字符串|
|hash|	#/user/login?a=1&b=2	|返回当前地址所包含的hash值，如果没有hash值则返回空字符串|
|href|	http://localhost:8000/#/user/login?a=1&b=2	|返回当前地址的完整url|

跳转操作

* window.location = url
* window.location.href = url
* window.location.assign(url)
* window.location.replace(url) // 无法返回上个页面
* window.location.reload(); // 重新加载（有可能从缓存中加载）
* window.location.reload(true); // 重新加载（从服务器重新加载）

### navigator 对象

Navigator 对象包含有关浏览器的信息。

:boom: 注意： 没有应用于 navigator 对象的公开标准，不过所有浏览器都支持该对象。
*Navigator 对象属性*
|属性|描述|
|---|---|
|appCodeName|	返回浏览器的代码名。|
|appMinorVersion|	返回浏览器的次级版本。|
|appName|	返回浏览器的名称。|
|appVersion|	返回浏览器的平台和版本信息。|
|browserLanguage|	返回当前浏览器的语言。|
|cookieEnabled|	返回指明浏览器中是否启用 cookie 的布尔值。|
|cpuClass|	返回浏览器系统的 CPU 等级。|
|onLine|	返回指明系统是否处于脱机模式的布尔值。|
|platform|	返回运行浏览器的操作系统平台。|
|systemLanguage|	返回 OS 使用的默认语言。|
|userAgent|	返回由客户机发送服务器的 user-agent 头部的值。|
|userLanguage|	返回 OS 的自然语言设置。|

*Navigator 对象方法*
|方法|描述|
|---|---|
|javaEnabled()|	规定浏览器是否启用 Java。|
|taintEnabled()|	规定浏览器是否启用数据污点 (data tainting)。|


*Navigator 对象描述*
`Navigator` 对象包含的属性描述了正在使用的浏览器。可以使用这些属性进行平台专用的配置。

虽然这个对象的名称显而易见的是 `Netscape` 的 `Navigator` 浏览器，但其他实现了 `JavaScript` 的浏览器也支持这个对象。

Navigator 对象的实例是唯一的，可以用 `Window` 对象的 `navigator` 属性来引用它。

### history对象

history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。

history.back();// 回退一页
history.forword();// 前进一页
history.go(number | url) // 跳转指定页数或者页面
history.length // 保存着历史记录的数量

### 客户端检测

*在可能的情况下，要尽量使用`typeof`进行能力检测。*

在浏览器环境下测试任何对象的某个特性是否存在，要使用下面这个函数：

```javascript
// 作者：Peter Michaux 
function isHostMethod(object, property) { 
	let t = typeof object[property]; 
 	return t === 'function' || (!!( t === 'object' && object[property])) || t == 'unknown'; 
}

// 可以像下面这样使用这个函数：
result = isHostMethod(xhr, "open"); //true 
result = isHostMethod(xhr, "foo"); //false
```

### 有趣的userAgent

>"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"

基于 `WebKit` 的所有浏览器都将自己标识为 `Mozilla 5.0`，与基于 `Gecko` 的浏览器完全一样。

1. 用户代理字符串检测技术

```javascript
export function OS() {
  const u = navigator.userAgent
  // 移动终端浏览器版本信息
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('UCBrowser') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    chrome: u.indexOf('Chrome') > -1,
    ali: u.indexOf('Alipay') > -1,
    qq: u.match(/\sQQ/i), // 是否QQ
    safari: u.indexOf('Safari') > -1,
  }
}
```

### Web Components

`Web Components API`是右 `Google` 一直在推行的一种实现组件的方式,相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小,但是实际书写上和可维护性也不是特别的好。
不太使用。
`dome` 如下
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<user-card
  image="https://semantic-ui.com/images/avatar2/large/kristy.png"
  name="User Name"
  email="yourmail@some-email.com"
></user-card>
  
<template id="userCardTemplate">
  <style>
   :host {
     display: flex;
     align-items: center;
     width: 450px;
     height: 180px;
     background-color: #d4d4d4;
     border: 1px solid #d5d5d5;
     box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
     border-radius: 3px;
     overflow: hidden;
     padding: 10px;
     box-sizing: border-box;
     font-family: 'Poppins', sans-serif;
   }
   .image {
     flex: 0 0 auto;
     width: 160px;
     height: 160px;
     vertical-align: middle;
     border-radius: 5px;
   }
   .container {
     box-sizing: border-box;
     padding: 20px;
     height: 160px;
   }
   .container > .name {
     font-size: 20px;
     font-weight: 600;
     line-height: 1;
     margin: 0;
     margin-bottom: 5px;
   }
   .container > .email {
     font-size: 12px;
     opacity: 0.75;
     line-height: 1;
     margin: 0;
     margin-bottom: 15px;
   }
   .container > .button {
     padding: 10px 25px;
     font-size: 12px;
     border-radius: 5px;
     text-transform: uppercase;
   }
  </style>
  
  <img class="image">
  <div class="container">
    <p class="name"></p>
    <p class="email"></p>
    <button class="button">Follow John</button>
  </div>
</template>

</body>
</html>
```
```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );
    
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
  }
}
window.customElements.define('user-card', UserCard);
```

常见坑如下
1. 组件内部事件的回调
比如，一个弹窗组件（`<my-dialog></my-dialog>`）中的确定按钮，那么它的事件是如何触发的呢？
```javascript
class myDialog extends HTMLElement {
  // ...
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="dialog">
        <div class="dialog-content">
          <div class="dialog-body">
            弹窗内容
          </div>

          <button id="okBtn">确定</button>
        </div>
      </div>
    `;

    shadowRoot.querySelector('#okBtn').addEventListener('click', () => {
      // 组件内部定义事件
      this.dispatchEvent(new CustomEvent('okBtnFn'));
    });
  }
}

customElements.define('my-dialog', myDialog);
```
现在方案是 `custom` `element` 内部自定义事件 `new CustomEvent()`，外部用 `addEventListener` 监听。这样的写法是很丑陋的，仿佛又回到了原生 `JS` 写应用的时代。

```html
<my-dialog></my-dialog>

<script> export default {
    created() {
      document.addEventListener('okBtnFn', function(){
        // 点击弹窗按钮，触发回调事件
      });
    }
  } </script>
```

2. 组件样式覆盖

对于开发者来说，难免会遇到需要调整组件内部样式的时候。无论你是使用antd、vant还是使用其它组件库，但 WC 的 CSS 防污染机制导致你很难修改内部样式。这需要你付出一些代价来变相的修改内部样式.

3. 组件内部资源相对路径问题

就目前来说，任何直接基于 Custom Element v1, Template 和 HTML Import 的组件都无法做到完全资源独立 —— 在不知道使用方环境且不给使用方增加额外限制的情况下使用内部封装的任何资源文件。比如如果你有一个自定义 icon 组件：

```javascript
class MyIcon extends HTMLElement {
    static get observedAttributes() { return ['name','size','color'] }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 1024 1024">
                <use id="use"></use>
            </svg>
        `
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'name' && this.shadowRoot){
            // 如果使用的项目中，根目录没有 icon.svg 文件，那就 gg
            this.use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./icon.svg#icon-${newValue}`);
        }
    }
}

customElements.define('my-icon', MyIcon);
```
如果使用的项目中，根目录没有 icon.svg 文件，那就 gg。如果你在这里使用 cdn 路径，就会出现跨域问题。

4. form表单类组件 value 获取问题

5. 其他
缺少数据绑定和状态管理也是 WC 存在的缺陷，此处不再赘述。


* WC 指在丰富 HTML 的 DOM 特性，让 HTML 拥有更强大的复用能力
* WC 可以直接当做原生标签，在任何前端框架和无框架中运行
* 结合当下的主流技术栈来说，WC 当前主要问题在于复杂的组件中，数据通信和事件传递存在一定使用成本
* 兼容问题，比如可以覆盖内部样式的 :part 方法


## `javaScript` 基础知识

### `script`标签

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

### `noscript`标签

>`noscript`元素用来定义在脚本未被执行时的替代内容（文本）。

主要有以下两种情况:

* 浏览器不支持脚本；
* 浏览器支持脚本，但是JavaScript被禁用；

### `script`脚本解析顺序问题

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

### 严格模式与非严格模式

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

### var关键字与变量生命周期

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



[[toc]]




















