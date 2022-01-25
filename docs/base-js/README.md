# 前端积累

## 文档对象模型

### 定义
`DOM` 是` Document Object Model`（文档对象模型）的缩写。

`DOM `是` W3C`（万维网联盟）的标准。

`DOM` 定义了访问 `HTML` 和 `XML` 文档的标准：

`DOM`是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。

`W3C DOM` 标准被分为 3 个不同的部分：

核心 DOM - 针对任何结构化文档的标准模型
* XML DOM - 针对 XML 文档的标准模型
* HTML DOM - 针对 HTML 文档的标准模型
* !DOCTYPE html 作用

---
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
![npm1](/images/base-js01.png)
节点之间的关系图:
![npm2](/images/base-js01.png)

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

#### 动态脚本

使用`<script>`元素可以向页面中插入`JavaScript`代码，一种方式是通过其`src`特性包含外部文件，另一种方式就是用这个元素本身来包含代码。跟操作`HTML`元素一样，创建动态脚本也有两种方式：
* 插入外部文件。
* 直接插入JavaScript代码。

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

#### 动态样式

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

#### 选择符 API
Selectors API Level 1 的核心是两个方法：querySelector()和 querySelectorAll()。

* querySelector()方法:接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。
::: tip TIP
 通过 Document类型调用 querySelector()方法时，会在文档元素的范围内查找匹配的元素。
 而通过 Element 类型调用 querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。
:::

* querySelectorAll()方法:接收的参数与 querySelector()方法一样，都是一个CSS选择符，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是NodeList的实例。
Selectors API Level 2 规范为 Element类型新增了一个方法matchesSelector()。

* matchesSelector()方法:接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回true；否则，返回 false。
::: tip TIP
 我们需要注意，getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，
 这几个 API 的性能高于 querySelector。而 getElementsByName、getElementsByTagName、getElementsByClassName 
 获取的集合并非数组，而是一个能够动态更新的集合。
 
 浏览器内部是有高速的索引机制，来动态更新这样的集合的。
 但是,尽管 querySelector 系列的 API 非常强大，我们还是应该尽量使用 getElement 系列的 API。
:::
### HTML5 扩充
#### 与类相关的扩充

* `getElementsByClassName()`方法:接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的`NodeList`。传入多个类名时，类名的先后顺序不重要。

* `classList` 属性

HTML5 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加`classList`属性。

这个`classList`属性是新集合类型`DOMTokenList` 的实例。与其他 `DOM` 集合类似，`DOMTokenList` 有一个表示自己包含多少元素的 `length` 属性，而要取得每个元素可以使用`item()`方法，也可以使用方括号语法。此外，这个新类型还定义如下方法。

```markdown

1. getElementsByClassName()方法:接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的NodeList。传入多个类名时，类名的先后顺序不重要。
2. classList 属性
3. HTML5 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加classList属性。
4. 这个classList属性是新集合类型DOMTokenList 的实例。与其他 DOM 集合类似，DOMTokenList 有一个表示自己包含多少元素的 length 属性，而要取得每个元素可以使用item()方法，也可以使用方括号语法。此外，这个新类型还定义如下方法。
```
#### 焦点管理

* focus()方法
* document.hasFocus()方法，这个方法用于确定文档是否获得了焦点。

#### HTMLDocument 的变化

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

#### 字符集属性

`HTML5`新增了几个与文档字符集有关的属性。其中，`charset` 属性表示文档中实际使用的字符集，
也可以用来指定新字符集。默认情况下，这个属性的值为"`UTF-16`"，
但可以通过`<meta>`元素、响应头部或直接设置 `charset` 属性修改这个值。

#### scrollIntoView()方法

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


#### 文档模式

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

#### 滚动

* `scrollIntoViewIfNeeded(alignCenter)`:只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的 `alignCenter` 参数设置为 `true`，则表示尽量将元素显示在视口中部（垂直方向）。

* `scrollByLines(lineCount)`：将元素的内容滚动指定的行高，`lineCount` 值可以是正值，也可以是负值。

* `scrollByPages(pageCount)`：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。

::: warning WARNING
 希望大家要注意的是，`scrollIntoView()`和 `scrollIntoViewIfNeeded()`的作用对象是元素的容器，而 `scrollByLines()`和 `scrollByPages()`影响的则是元素自身。
:::


---

### DOM2 和 DOM3

`DOM1` 级主要定义的是 `HTML` 和 `XML` 文档的底层结构。 `DOM2` 和 `DOM3` 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的 `XML` 特性。

#### 计算的样式

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

#### 偏移量 外边距

* `offsetHeight`:元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。
* `offsetWidth`：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
* `offsetLeft`：元素的左外边框至包含元素的左内边框之间的像素距离。
* `offsetTop`：元素的上外边框至包含元素的上内边框之间的像素距离。

其中，`offsetLeft` 和 `offsetTop` 属性与包含元素有关，包含元素的引用保存在 `offsetParent` 属性中。

![offsetParent](/images/base-js04.png)

#### 客户区大小 内边距

* clientWidth:是元素内容区宽度加上左右内边距宽度。
* clientHeight:元素内容区高度加上上下内边距高度。

![内边距](/images/base-js05.png)

#### 滚动大小

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