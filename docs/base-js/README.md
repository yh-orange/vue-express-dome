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
![npm1](/images/base-js01.jpg)
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

---

:::warn WARNING
需要注意的是，必须将<link>元素添加到<head>而不是<body>元素，才能保证在所有浏览器中的行为一致。
:::