
## `html+css+js` 基本介绍



[原文](https://blog.csdn.net/qq_63525426/article/details/130472285)

### **前言**
`HTML`（全称为“超文本标记语言”）是一种用于创建Web页面的标记语言。它是Web开发的基础，允许开发者定义页面的结构、内容和样式。`HTML`使用一些标记或“标签”来描述文本和媒体内容的结构和格式，这些标签可以指示网页浏览器如何显示内容，包括标题、段落、列表、超链接、图像、音频、视频等等。`HTML`还可以与其他Web技术（`如CSS和JavaScript`）结合使用，以实现更复杂和交互性的Web应用程序。这篇文章只是介绍`HTML`的基础标签的使用。

**`HTML`是什么**
* `HTML`是`HyperText Markup Language`的简写，表示超文本标记语言
* `HTML`并不是一个种编程语言，而是一种标签语言
* `HTML`的文档也叫`web`页面
* `HTML`使用标记标签来描述网页

`HTML`文档由`HTML`标签构成，每个标签可以包含一些内容或其他标签，这些标签可以帮助浏览器解析文档内容并显示出来。例如，**`<html>`标签表示整个HTML文档**，**`<head>`标签包含文档的元数据（如标题和引用的样式表）**，而<**`body`>标签包含实际的页面内容**。

`HTML`标签可以包含一些属性，这些属性可以提供有关标签的更多信息。例如，`<img>`标签可以使用src属性指定图像的URL，`<a>`标签可以使用`href属性指定链接的URL`。

接下来将详细了解具体的标签使用。

### HTML结构
认识`HTML`标签
`HTML`代码是由标签组成的

例如
`<body>hello world </body>`
1. <body> </body>就是一对完整的标签，一对标签需要一个起始标签和一个结束标签，结束标签开头是一个 / 来表示这对标签的结束，例如：</body>。
2. 在开始标签和结束标签之中的内容，就是这个标签需要具体展示的内容 hello world。
3. 大多数标签都是上述这种双标签的结构，只有少数标签是单标签，单标签后面会介绍。
4. 我们还可以给这个标签设置一个唯一的id，id相当于给这个标签设置一个唯一的身份标识
`<body id = "my_id"> hello world </body>`


*`HTML`文件的基本完整结构*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
* html标签是整个html文档的最顶层标签/根标签
* head标签则是写这个html文档的属性的标签
* title标签则是显示这个文档的标题标签
* body标签中的内容则是需要显示在页面上的内容
 **细节解释:** 
* `<!DOCTYPE html>` 称为 DTD (文档类型定义), 描述当前的文件是一个 HTML5 的文件。
*` <html lang="en">`其中 lang 属性表示当前页面是一个 "英语页面". 这里暂时不用管. (有些浏览器会根据此处的声明提示是否进行自动翻译)。
* `<meta charset="UTF-8"> `描述页面的字符编码方式. 没有这一行可能会导致中文乱码。
* `<meta name="viewport" content="width=device-width, initial-scale=1.0">`name="viewport" 其中 viewport 指的是设备的屏幕上能用来显示我们的网页的那一块区域，content="width=device-width, initial-scale=1.0" 在设置可视区和设备宽度等宽, 并设置初始缩放为不缩放. (这个属性对于移动端开发更重要一些)。


**快速生成代码框架**
在vscode中，新建一个html文件后，在文件顶部输入一个 ！之后，按回车，就会生成html的代码框架。

或者新建文件之后，在文件顶部输入 `html:5` 之后，按回车，也能生成html代码框架。

###  HTML常见标签

* 注释标签 <!-- -->

```html
<body>
    hello world    <!-- 我是注释 -->
</body>
```

*标题标签 `h1-h6`*
```html
<h1>测试标题标签</h1>
<h2>测试标题标签</h2>
<h3>测试标题标签</h3>
<h4>测试标题标签</h4>
<h5>测试标题标签</h5>
<h6>测试标题标签</h6>
```
***
*段落标签` <p> </p> `*
在`html`中输入换行之后不会真的换行，而是产生一个空格。
在`html`中输入多个空格之后，在网页上显示的时候不会有多个空格，而是只有一个空格。
在`html`中，如果需要有一段特别长的文字，但是这段文字在网页上显示的时候并没有产生段落，而是全在一起。这样可读性就会很差。
***
我们使用段落标签就会解决上述问题：`<p> </p>`
我们可以在需要产生段落的地方添加`<p></p>` 是内容产生段落。
产生段落之后，上面的段落和下面的段落之后有很大的空隙。
***
*换行标签 <br>*
br是break的缩写，表示换行。
<br>是一个单标签。
使用<br>换行之后，不会想段落标签那样产生很大的空隙。
***
*格式化标签*
* 加粗 strong 标签 和 b 标签
* 倾斜 em 标签 和 i 标签
* 删除线 del 标签 和 s 标签
* 下划线 ins 标签 和 u 标签
```html
    <Strong>加粗</Strong>
    <b>加粗</b>
 
    <em>倾斜</em>
    <i>倾斜</i>
 
    <del>删除线</del>
    <s>删除线</s>
    
    <ins>下划线</ins>
    <u>下划线</u>
```
***
*图片标签 img*
img标签必须带有src的属性，表示这个图片的路径。

相对路径 绝对路径
`<img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="" title="这是百度的图片">`
***
* 超链接标签 a
` <a href="https://www.baidu.com">点击进入百度</a>`

href是必须要有的，表示点击后跳转到那个页面。

   ` <a href="https://www.baidu.com" target="_blank">点击进入百度</a>`
   
 target表示用新的标签页打开。如果上述的默认，则是在当前标签页打开。
 
外部链接
外部链接表示此链接是引用外部网站的链接。
`<a href="https://www.baidu.com" target="_blank">点击进入百度</a>`
内部链接
网页内部页面之间的链接，可以直接写相对路径。

我们在当前html1文件的同一个目录下再创建一个html2文件,然后在html2文件里面就可以写其他的网页，当我们点击这个内部之间的链接时，就会跳转到html2.html这个网页上。
`<!-- 我是html1 -->
 <a href="html2.html">点我跳转到html2.html</a>`
 
空链接
使用#在href中占位
`<a href="#">空链接</a>`

下载链接
href中写的路径是一个文件，点击就可以进行下载这个文件，（文件可以是zip格式）。
当我们点击下载的时候，浏览器就会自动下载这个文件。
`<a href="OIP.zip">点击下载</a>`

网页元素链接
可以给图片等任何元素添加链接，当我们点击这个图片时，就会跳转到我们href中所写的地址上去。
```html
<a href="https://www.baidu.com" target="_blank">
        <img src="OIP.png" title="点击跳转到百度">
    </a>
```

描点链接
我们可以给标签给具体的id值，然后在href中填入对应的id的值，就可以进行描点链接跳转.
```html
    <a href="#1">跳转到1</a>
    <a href="#2">跳转到2</a>
    <p id="1">
        abc <br>
        def <br>
    </p>
    <p></p>
    <p></p>
    <p id="2">
        hhh <br>
        mooo <br>
    </p>
```

无语义标签  div  span
就是两个盒子. 用于网页布局
div 是独占一行的, 是一个大盒子.
span 不独占一行, 是一个小盒子
```html
<div>
        <span>天暗星</span>
        <span>天暗星</span>
        <span>天暗星</span>
        </div>
        <div>
        <span>天罡星</span>
        <span>天罡星</span>
        <span>天罡星</span>
        </div>
        <div>
        <span>天罪星</span>
        <span>天罪星</span>
        <span>天罪星</span>
        </div>
```

## CSS 基础介绍
### 一基础认知
**1.1：css的介绍**
css：层叠样式表

css作用：给页面中的HTML标签设置样式

**1.2css语法规则**
写在哪里

css写在style标签中，style标签一般写在head标签里面，title标签下面
样式：

选择器{

属性名:属性值;

}

**1.3css初体验**
常见属性：

color：文字颜色

font-size:字体大小

background-color:背景颜色

width:宽度

height：高度
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        p{
            color: red;
            font-size: 30px;
            background: skyblue;
            width: 300px;
            height: 50px;
        }
    </style>
</head>
<body>
<p>hello world</p>
</body>
</html>
```

注意点：

1. css标点符号都是英文转态下的
2. 每一个样式键对写完后，都需要写分号

**2.1：css引入方式**
* 内嵌式：css写在style标签中，通常约定写在head标签中，作用于小案例
* 外联式：css写在一个单独的.css文件中，需要通过link标签在网页中引入，作用于项目中
* 行内式：css写在标签的style属性中，之后配合js使用

### 二：基础选择器
### **1.1：选择器的作用**
选择页面中对应的标签，方面后续设置样式

**1：标签选择器**
结构：标签名{

​ css属性名:属性值;

}

作用：通过标签名，找到页面中所有这类标签，设置样式

注意点：

* 标签选择器选择的是一类标签，而不是单独一个
* 标签选择器无论嵌套关系有多深，都能找到对应标签
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        p{
            color: red;
        }
        div{
            color:blue;
        }
    </style>
</head>
<body>
    <p>我是一个p标签</p>
    <p>我也是一个p标签</p>
<div>我是一个div标签</div>
<div>我也是一个div标签</div>
<div>
    <div>
        <div>
            <div>
                <p>躲猫猫</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
```

### **2：类选择器**
结果：

.类名{

​ css属性名:属性值;

}

作用：通过类名，找到页面中所有带有这个类名的标签，设置样式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .red{
            color: red;
        }
        .big{
            font-size: 30px;
        }
        .yellow{
            color: yellow;
        }
        .pink{
            color: pink;
        }
    </style>
</head>
<body>
<p class="red big">小红</p>
<p class="yellow">小黄</p>
<p class="pink">小粉</p>
<p class="red">我也要变红</p>
</body>
</html>
```
注意点：

* 所有标签上都有class属性，class属性是属性值称为类名
* 类名可以由数字、字母、下划线、中划线组成，但不能以数字或者中划线开头
* 一个标签可以同时有过个类名，类名之间以空格隔开
* 类名可以重复，一个类选择器可以同时选中多个标签

*3：id选择器*
结构：#id属性值{

​ css属性名:属性值;

}

作用：通过id选择器，找到页面中带有这个id属性值的标签，设置样式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #red{
            color: red;
        }
        #green{
            color: green;
        }
    </style>
</head>
<body>
<p id="red">红果果</p>
<p id="green">绿泡泡</p>
</body>
</html>
```
注意点

* 所有标签都有id属性
* id属性类似于身份证号码，在一个页面中是唯一的，不可重复的！
* 一个标签上只能有一个id属性
* 一个id选择器只能选中一个标签

**注意点**
所有标签都有id属性
id属性类似于身份证号码，在一个页面中是唯一的，不可重复的！
一个标签上只能有一个id属性
一个id选择器只能选中一个标签
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .common{
            color: red;
            font-size: 30px;
        }
    </style>
</head>
<body>
<p class="common">我要变大，变红</p>
<div class="common">我也要变大，变红</div>
</body>
</html>
```
**4：通配符选择器**
结构：
*{
​ css属性名:属性值;
}

作用：找到页面中所有的标签，设置样式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            color: indianred;
        }
    </style>
</head>
<body>
<p>小花</p>
<h1>我是标题1</h1>
<span>我是span标签</span>
<div>我是div选择器</div>
</body>
</html>
```
注意点

开发中使用极少，只有在特殊情况下才会用到

在基础小页面中可能会用于去除标签默认的`margin`和`padding`

### **三：字体与文本样式**
1：字体大小
属性名：font-size
取值：数字+px（像素点）

注意点：

谷歌浏览器默认文字大小是16px
单位要设置，否则无效

2：字体粗细
属性名：font-weight
取值：
关键字：
正常：normal
加粗：bold
纯数字：100到900的整百数
正常：400；
加粗：700
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <style>
    .boldone{
      font-weight: bold;
    }
    .bold01{
        font-weight: 700;
    }
  </style>
</head>
<body>
<p class="boldone">我是一个p标签</p>
<p class="bold01">我也是一个p标签</p>
</body>
</html>
```
注意点：

不是所有字体都提供了九种粗细，因此部分取值页面中无变化

实际开发中以：正常，加粗二种取值使用最多

3：字体样式（是否倾斜）
属性名：font-style

取值：

正常：normal
倾斜：italic
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .italic{
            font-style: italic;
        }
    </style>
</head>
<body>
<p class="italic">我是一个p标签</p>
</body>
</html>
```

**4:常见字体系列**
**无衬线字体（sans-serif）**
特点：文字笔画粗细均匀，并且首位无修饰

常见：网页中大多采用无衬线字体

**衬线字体（serif）**
特点：文字笔画粗细不匀，并且首尾有笔锋修饰
场景：报刊书籍中应用广泛

**等宽字体（monospace）**
特点：每个字母后文字的宽度相等
场景：一般用于程序的编写，有利于代码的阅读和编写

**5：字体系列**
属性名：font-family

常见取值：具体字体1，具体字体2，具体字体3，字体系列

渲染规则：
1. 从左往右按照顺序查找，如果电脑中未安装该字体，则显示下一个字体
2. 如果都不支持，会根据操作系统，显示最后系列的默认字体

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <style>
    p{
        font-family:苹方,微软雅黑,sans-serif;
    }
  </style>
</head>
<body>
<p>我是一个p标签</p>
</body>
</html>
```
macOs:苹方

Windows：微软雅黑

注意点：

* 如果字体名称中存在多个单词，推荐使用引号包裹
* 最后一项字体系列不需要引号包裹
* 网页开发中，尽量使用系统常见自带字体，保证不同用户浏览网页都可以正确显示

**6：样式的层叠问题**
问题：给一个标签设置了多个相同的样式，此时浏览器如何渲染
结果：最下面的样式会生效，就近原则，因为浏览器是从上往下解析的。

**7：字体font相关属性的连写**
属性名：font
取值：font：style weight size family
顺序要求 ：swsf（稍微舒服）
省略要求：只能省略前二个，省略了相当于设置了默认值

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <style>
    p{
      font: italic bold 30px 隶书,楷书,sans-serif ;
    }
  </style>
</head>
<body>
<p>我是一个p标签</p>
</body>
</html>
```
注意点：如果需要同时设置单独和连写形式

要么把单独的样式写在连写的下面

要不吧单独的样式写在连写的里面

### 四：字体和文本样式
**1：文本缩进**
属性名：text-indent

取值：

* 数字+px
* 数字+em（推荐，1em=当前标签的font-size的大小）
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        p
            text-indent: 2em;
        }
    </style>
</head>
<body>
<p>啦啦啦我是卖报的小画家，滴滴滴，我是敲代码的小笨蛋</p>
</body>
</html>
```
**2:文本水平对齐方式**
属性名：text-align

取值

left：左对齐

center：局中对齐

right：右对齐
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
    .box{
        width: 400px;
        height: 400px;
        background-color: skyblue;
        text-align: center;
    }
</style>
<body>
<div class="box">
 我是一行文本
</div>
</body>
</html>
```
注意点：

如果需要让文本水平局中，text-align属性给文本所在标签（文本的父元素）设置
**3：文本修饰**
属性名：text-decoration

取值：

undeline：下划线（常用）

line-through：删除线（不常用）

overline：上划线（几乎不用）

none：无装饰线（常用）

注意点：

开发中会使用text-decoration:none;清除下划线

4:水平局中方法总结

text-align:center能让那些元素水平局中

1：文本

2：span标签，a标签

3：input标签，img标签
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
    .box{
        width: 400px;
        height: 400px;
        text-align: center;
    }
    .none{
       text-decoration: none;
    }
</style>
<body>
<div class="box">
    <img src="../resources/image/img.png" alt="">
    <br>
    Xiaomi 12 Pro
    <br>
    全新骁龙八|2k AMOLED屏幕
    <br>
    <a href="https://www.mi.com/mi12pro" class="none">4999起</a>
</div>
</body>
</html>
```
总结：
文本缩进：text-indent：数字+px/数字+em

文本水平：text-align:left/center/right

文本修饰：text-decoration:underline/none

水平局中方法总结：

如果需要div，p，h等大盒子水平局中

可以通过margin:0 auto;实现
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .father{
            width: 400px;
            height: 400px;
            background-color:skyblue;
        }
        .son{
            width:150px;
            height:150px;
            background-color:orange;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>
</body>
</html>
```
注意点：

如果需要让div，p，h（大盒子）水平局中，直接给当前元素本身设置即可

margin：0 auto 一般针对于固定宽度的盒子，如果大盒子没有设置宽度，此时会默认占满父元素的宽度

**4：行高**
作用：控制行间距

属性名：line-height

取值：

数字加px
倍数（当前标签font-size的倍数）
应用:

让单行文本垂直局中可以设置line-height：文本父元素的高度
网页精准布局时，会设置line-height：1 可以取消上下间距
注意点：

如果先写行高在设置别的会被覆盖

font：style weight size/line-height family;

**5：颜色表示方法**
关键字表现法
* rgb表示法：rgb（red，green，blue），每项取值为0-255
* rgba表示法，a表示透明度，取值0-1,0是完全透明，1完全不透明
* 十六进制表示法

### 五：案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .box{
            width: 800px;
            background-color: wheat;
            margin: 0 auto;
        }
        .box01{
            text-align: center;
        }
        .s1{
            color:#87ceeb;
        }
        .link{
            text-decoration: none;
        }
        p{
            text-indent:2em;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="box01">
        <h1 >
    如何提升自己感知快乐的能力
        </h1>
        <span>2022年03月08日21:24</span>
        <span class="s1">新浪科技</span>
        <a href="#" class="link">收藏文本</a>
    </div>
    <p>责任心一直是一个备受推崇和肯定的品质，不过一项研究发现，人们的尽责性与生活满意度呈显着负相关（Taher et al., 2013），也就是说，责任心越强的人，会越容易不快乐。另一项研究写道，尽责性强的人容易不快乐，可能是因为ta们更执着于想通过自己的力量来改变一些事情，因此当ta们遇到无法依靠个人力量克服的挫折（比如社会问题），会更无助和绝望（Boyce, 2010）。此外，尽责性高的人会更需要从他人给到的正面反馈中获得满足感，而尽责性较低的人正好相反，ta们不是懒惰，只是生活态度较为悠闲、随性，不太追逐世俗的“成功”，只要ta们觉得自己做得还不错，就会感到快乐。所以，我们并不是要鼓励大家做一个尽责性低的人，只是尽责性高的小伙伴可以试着像尽责性较低的人一样，多多关注和给予自己对自己的认可。

    </p>
    <p>生活中我们很少用“耐心”这个词来夸奖一个人，但其实耐心是一个很珍贵的品质，它指的是一个人在面对挫折、逆境或苦难时保持冷静等待的倾向或能力（Schnitker, 2012）。忙碌的我们为了节约时间，可能很久都没体会过耐心的感觉了，而这其实会将我们的情绪逐渐拉向快乐的对立面。一项研究就从对待人际关系的耐心、面对困境的耐心以及对待日常烦恼的耐心三个维度出发，研究了耐心与个人幸福感（包括孤独感、希望感和生活满意度）的关系（Schnitker, 2012）。研究显示，耐心是维持一段良好关系的关键因素，对待人际关系越有耐心的人，越不容易感到孤独。其次，耐心的人在面对挫折时更具备保持冷静应对的能力，ta们更相信自己能等到度过困难的那一天，因此有耐心的人会保有更强的希望感，这会极大地减轻我们在困境中的负面情绪。

    </p>
    <p>宜人性（Agreeableness）是心理学上的“五大人格”之一。宜人性高的人通常会更有亲和力、更友好、更富有同情心；相对的，宜人性较低的人会给人更理性、批判性更强的感觉。研究发现，宜人性越高的人，越容易感到快乐。这确实是因为，宜人性高的人通常来说会更受欢迎，拥有更和谐的人际关系（Simon, 2010）。但好的人际关系所带来的快乐，不仅仅是因为我们的人际环境变得更融洽了，研究者认为，好的人际关系更重要的价值是，更容易获得他人的理解，提升我们与他人沟通的效率，从而更好地交换信息。尤其是在工作中，宜人性高的人，更能获得同事的理解，与他人达成高效的合作。这将会大大提升ta们对工作的满意度。作为一个社畜，工作不闹心，生活自然是更开心啦。

        </p>
    <p>每个人对于自己的思想和感情的接纳程度是各不相同的。一项心理测量研究表明，“接纳”这个人格特质与幸福感有很高的相关性（Catalino et al., 2017）。研究发现，接纳特质高的人每天所感受到的负面情绪会相对更少，因为ta们会更少地进行反刍——不会沉浸在自己的消极情绪以及已发生的糟糕结果中。同时，接纳特质更高的人也会更少地批判自己的想法和感受，当负面情绪出现时，一些人会认为这种体验是不好的或不应该出现的，而接纳特质高的人则允许自己有这些负面的感觉，不会去过度地批判自己。可想而知，一个更少内耗的人，自然更容易感受到生活中点点滴滴的快乐。
</p>
</div>
</body>
</html>
```

## js 基础介绍

### 一、JS介绍
`JavaScript` （简称JS），是一门跨平台、面向对象的脚本语言（弱类型语言），而Java语言也是跨平台的、面向对象的语言，只不过Java是编译语言，是需要编译成字节码文件才能运行的；`JavaScript` 是脚本语言，不需要编译，由浏览器直接解析并执行。

`JavaScript` 是在1995年由Netscape(网景)公司的Brendan Eich发明的（据说这位大神利用10天完成了JS的设计），最初将其脚本语言命名为LiveScript，后来Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为JavaScript。但实际上它的语法风格与 Self 及 Scheme 较为接近。

:::tip
ECMAScript与JavaScript 的关系？
:::

发展初期，JavaScript的标准并未确定，同期有Netscape的JavaScript，微软的JScript和CEnvi的ScriptEase三足鼎立。1996 年 11 月，`JavaScript` 的创造者 `Netscape` 公司，决定将 `JavaScript` 提交给标准化组织 ECMA（欧洲计算机联合协会），希望这种语言能够成为国际标准。次年，ECMA组织 发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准（就是让浏览器支持这个脚本），并将这种语言称为 `ECMAScript`，这个版本就是 1.0 版。

因此，`ECMAScript` 和 `JavaScript` 的关系是，前者是一套规范，后者是前者的一种实现（另外ECMAScript方言不仅有JavaScript还有 Jscript 和 ActionScript等等），目前最新版是ES6（`ECMAScript 6.0` 是 `JavaScript` 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标是使 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言）。

:::tip
ES6 与 ECMAScript 2015 的关系
:::

ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。它与 ES6 是什么关系呢？

2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了。因此，ES6 这个词的原意就是指 JavaScript 语言的下一个版本。

ES6 的第一个版本，在 2015 年 6 月发布，正式名称是《ECMAScript 2015 标准》（简称 ES2015）。

2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1版，因为两者的差异非常小，基本上是同一个标准。根据计划，2017 年 6 月发布 ES2017 标准。

因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 标准，例如 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。我们常提到的ES6，一般是指 ES2015 标准，但有时也是泛指 “下一代 JavaScript 语言”。

:::tip
ES6和ES5区别：
:::

es6代码简洁，es5代码复杂。
es6对浏览器兼容性很差，es5对浏览器兼容性很友好。

### 二、JS的引入方式
内部脚本：将JS脚本通过`<script>`标签定义在HTML页面中。（可以在页面的任何位置，且可以写多个）
外部脚本：将 JS代码定义在外部 JS文件中，然后通过`<script>`标签的src属性引入到 `HTML`页面中。
注：引用外部JS文件的`<script>`标签里不能再写自定义的`javaScript`代码（不会被执行）。

一般把脚本置于 `<body>` 元素的底部，可改善显示速度，因为浏览器在加载页面的时候会从上往下进行加载并解析。 我们应该让用户先看到页面内容，然后再展示动态的效果。

### 三、JS基本语法
**1、书面语法**
* 区分大小写：与 `Java` 一样，变量名、函数名以及其他一切东西都是区分大小写的。

* 每行结尾的分号;，可有可无。

* 如果一行上写多个语句时，必须加分号用来区分多个语句。

* js两种有注释：

    * 单行注释：// 。
    * 多行注释：/* 注释内容 */。
    
**2、输出语句**
* `window.alert()` ：将内容写入警告框，`window`.可以省略不写。
* `document.write()`：将内容写入`HTML`文档并输出。
* `console.log()`：将内容写入浏览器控制台。
`chrome`控制台改成中文：点击设置—语言改成中文。
**3、变量**
`JavaScript` 中用 var 关键字（variable 的缩写）来声明变量。

变量的定义格式：var 变量名=数据值;

`JavaScript` 是一门弱类型语言，变量可以存放不同类型的值；
```js
var a="hello js";
var b=1024;
var c=false;
var d=[true,"a",20.4,123];

var dog={ //自定义对象
    name:"旺财",
    age:3,
    eat:function(){
        console.log("旺财在睡觉");
    }
}; 

```
（1）使用var关键字声明变量：

作用域：全局变量。
变量可以重复定义。
```js
var a=12;
var a="hello";
```

（2）使用let关键字声明变量：（es6中新增的定义变量方式）

* 作用域：局部变量。
* 变量不能重复定义。
```js
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

（3）使用const关键字声明常量：(只读变量)

```text
// 定义常量
const PI = 3.1415926;
PI=3;
console.log(PI); // 常量声明之后不允许改变

//const NAME;
//console.log(NAME); // 常量一但声明必须初始化，否则会报错
```

**4、 数据类型**
JavaScript中数据类型分为两类：原始类型 和 引用类型 。

**原始类型（Primitive）：**

* `number`：数字（整数、小数、NaN(Not a Number)）。
* `String`：字符、字符串（单双引号都可以）。
* `boolean`：布尔。（表示的值有：true和false）
* `null`：对象为空。
* `undefined`：当声明的变量还未被初始化时，该变量的默认值是undefined。
* `BigInt和Symbol`。
**引用类型（Reference）：Object（Array、Function）。**


可以使用typeof运算符获取该变量的数据类型。
```text
// number
var age = 20;
var price = 99.8;
console.log(age + "\t" + typeof age)
console.log(price + "\t" + typeof price)


//string
var ch = 'a';
var name = 'tom';
var addr = "北京";
console.log(ch + "\t" + typeof ch)
console.log(name + "\t" + typeof name)
console.log(addr + "\t" + typeof addr)

// boolean
var flag1 = true;
var flag2 = false;
console.log(flag1 + "\t" + typeof flag1)
console.log(flag2 + "\t" + typeof flag2)

//null
var obj = null;
console.log(obj + "\t" + typeof obj)

//undefined
var a;
console.log(a + "\t" + typeof a)
```
***5、运算符***
JavaScript提供了如下的运算符，大多数都是与Java中的运算符类似的。

一元运算符：++ 、--。
算术运算符：+ 、- 、* 、/ 、% 。
赋值运算符：= 、+= 、-= 、*= 、/= 、%= 。
关系运算符：> 、< 、>= 、<= 、!= 、==（等于）、===（等值等型）、!==（不等值或不等型）。
逻辑运算符：&& (逻辑与) 、|| (逻辑或) 、! (逻辑非)。
三元运算符：条件表达式 ? 值1 : 值2。

==和===区别：

==：
判断类型是否一样，如果不一样，则进行类型转换。

再去比较其值。

===：(js 中的全等于)
判断类型是否一样，如果不一样，直接返回false。
再去比较其值。
```js
var age1 = 20;
var age2 = "20";

alert(age1 == age2);// true
alert(age1 === age2);// false
```

**6、类型转换**
1、其他类型转number类型：

string转number类型：按照字符串的字面值转为数字，如果字面值不是数字，则转为NaN。
将string转number有两种方式：
使用 + 正号运算符。 例如 var str =+"20"; //20
使用patseInt()函数。 （建议使用patseInt()函数进行转换）
boolean转number类型：true转为1，false转为0。

2、其他类型转boolean类型：

number 类型转换为 boolean 类型：0和NaN转为false，其他的数字转为true。
string 类型转换为 boolean 类型：空字符串转为false，其他的字符串转为true。
null 类型转换为 boolean 类型是 false。
undefined 转换为 boolean 类型是 false。
使用场景：

在 JavaScript 中使用字符串前，一般都会先判断字符串不为null，并且不是空字符才会做其他的一些操作，JavaScript也有类型的操作，代码如下：
```js
var str = "abc";

//健壮性判断
if(str != null && str.length > 0){
    alert("转为true");
}else {
    alert("转为false");
}
```
但是由于 JavaScript 会自动进行类型转换，所以上述的判断可以进行简化，代码如下：
```js
var str = "abc";

//健壮性判断
if(str){
    alert("转为true");
}else {
    alert("转为false");
}
```

**7、流程控制语句**
JavaScript 中提供了和 Java 一样的流程控制语句：if 、switch、for、while、do-while。

*if 语句：*
```js
var count = 3;
if (count == 3) {
    alert(count);
}
```
*switch 语句：*
```js
var num = 5;
switch (num) {
    case 1:
        alert("星期一");
        break;
    case 2:
        alert("星期二");
        break;
    case 3:
        alert("星期三");
        break;
    case 4:
        alert("星期四");
        break;
    case 5:
        alert("星期五");
        break;
    case 6:
        alert("星期六");
        break;
    case 7:
        alert("星期日");
        break;
    default:
        alert("输入的星期有误");
        break;
}
```
*for 循环语句:*
```js
var sum = 0;
for (let i = 1; i <= 10; i++) { //建议for循环小括号中定义的变量使用let(局部变量)
    sum += i;
}
alert(sum);
```
*while 循环语句：*
```js
var sum = 0;
var i = 1;
while (i <= 10) {
    sum += i;
    i++;
}
alert(sum);
```
*do-while 循环语句：*
```js
var sum = 0;
var i = 1;
do {
    sum += i;
    i++;
}
while (i <= 10);
alert(sum);
```

**8、函数**
* 函数：就是被设计为执行特定任务的代码块。（类似Java中的方法）
* JavaScript 函数通过 function 关键词进行定义。

**8.1、函数定义**
函数定义格式有两种：

第一种方式：
```text
function 函数名(参数1,参数2,..){
    要执行的代码
}
```
第二种方式：
```text
var 函数名 = function(参数列表){
    要执行的代码
}
```
**注意：因为JavaScript是弱类型语言，所以他的形参不需要数据类型（因为每个参数前面加上 var关键字 也没有任何意义，不能表达具体类型），返回值也不需要定义类型，可以在函数内部直接使用 return关键字 返回即可。**
```js
function add(x,y){
    return a+b;
}
```
**8.2、 函数的调用**
函数调用语法格式如下：`函数名称(实际参数列表);`

实例
```text
function add(x,y){
    return x+y;
}

var sum = add(11,22,33);
console.log(sum);//33

// 将数据11传递给变量x,将数据22传递给变量y,而数据33没有变量接收
```
**注意：**
* 在JavaScript中，函数调用可以传递任意个参数。
* 如果实参的个数大于形参的个数，会取到形参的个数。
* 如果实参的个数小于形参的个数 ，多于的形参定义为undefined，最终的结果就是 NaN。

### 四、JS常用对象
在JS中提供了很多对象供使用者来使用。

JS中常用的对象总共分三类：

* 基本对象：Array、Boolean、Date、Math、Number、String、RegExp（正则）、Global。
* BOM对象：Window、Navigator、Screen、History、Location。
* DOM对象：Document、Element、Attribute、Text、Comment等等。

**1、Array对象**
:::tip
JS中Array对象用于定义数组。
:::
**1.1 数组的定义**
数组的有两种定义格式：

第一种方式：`var 变量名 = new Array(元素列表); `

第二种方式：`var 变量名 = [元素列表];`

*1.2 数组的访问*
```js
// 取值
数组名[索引];

// 赋值
数组名[索引]=数据;
```

*1.3 数组的特点*
JavaScript 是弱类型，所以可以存储任意的类型的数据。
```js
// 变长
var arr = [1,2,3];
arr[10] = "helloworld";
alert(arr[10]); // helloworld
alert(arr[9]);  //undefined
```
JavaScript中数组长度是可变的，如果索引位置的元素没有赋值，那么该元素默认值是undefined（例如 索引3到索引9位置的元素值为undefined）。

**1.4 数组的属性**
* **constructor**：返回对创建此对象的数组函数的引用。（返回数组的构造函数）
* **length**： 设置或返回数组中元素的数量。
* **prototype**： 允许您向数组添加属性和方法。

```js
// 静态初始化一个数组
var arr = ["hello","js",123,true];
//获取数组对象的构造函数
console.log(arr.constructor);  //ƒ Array() { [native code] }
// 遍历数组
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```
在 JavaScript中，`constructor` 属性用于返回该对象的构造函数。其返回值是对函数的引用，而不是函数的名称：

* 对于JS中的数组，constructor 属性返回：`function Array() { [native code] }`。
* 对于JS中的对象，constructor 属性返回：function Object() { [native code] }。

**1.5 数组的函数**
|方法|描述||
|concat()	连接两个或更多的数组，并返回结果。|
|join()	将数组的所有元素连接成一个字符串。|
|pop()	删除数组的最后一个元素，并返回该元素。|
|push()	将新元素添加到数组的末尾，并返回新的长度。|
|reverse()	反转数组中元素的顺序。|
|shift()	删除数组的第一个元素，并返回该元素。|
|slice()	选择数组的一部分，并返回新数组。|
|toSource()	返回该对象的源代码。|
|sort()	对数组的元素进行排序。|
|toString()	把数组转成字符串，并返回结果。|
|toLocaleString()	把数组转成本地数组，并返回结果。|
|unshift()	将新元素添加到数组的开头，并返回新的长度。|
|valueOf()	返回数组对象的原始值。|
|splice()	删除元素，并向数组添加新元素。|

* push()：向数组的末尾添加元素。
* splice()：删除元素。
    * 参数1：索引。表示从哪个索引位置删除。
    * 参数2：个数。表示删除几个元素。

**2、String对象**
创建String对象有两种方式：
方式一：
```js
var 变量名 = new String("helloworld"); 
```
方式二：
```js
var 变量名 = "helloworld";
```
String对象常用属性：
* String对象通过 length 属性获取字符串长度。

String对象常用函数：
* charAt()，返回指定索引处的字符。
* indexOf()，检索字符串。
* trim()，去除字符串两端的空格。

**3、自定义对象**
JavaScript中的所有事物都是对象：字符串、数值、数组、函数…，此外他允许自定义对象。（ 对象只是一种特殊的数据。对象拥有属性和方法）

自定义对象格式如下：
```js
var 对象名称 = {
    属性名称1:属性值1,
    属性名称2:属性值2,
    ...,
    函数名称:function (形参列表){},
	...
};
```
调用自定义对象的属性：`对象名.属性名`

调用自定义对象的函数：`对象名.函数名()`

示例：自定义对象的声明与使用
```js
// 定义一个student对象
var student = {
    // 定义两个属性,属性名为name和age
    name: "jack",
    age: 18,
    // 定义一个方法,方法名为eat
    eat: function () {
        console.log(this.name + "在干饭~")
    }
}

// 调用属性
console.log(student.name);//jack
console.log(student.age);//18
student.eat();//jack在干饭~
```

### 五、BOM（浏览器对象模型）
**1、BOM概述**
BOM(Browser Object Model)：浏览器对象模型。也就是 JavaScript 将浏览器的各个组成部分封装为对象。

我们要操作浏览器的各个组成部分就可以通过操作 BOM 中的对象来实现。比如：将浏览器地址栏中的地址改为 `http://www.baidu.com` ，可以使用 `Location` 对象的 `href` 属性实现，` location.href = "http://baidu.com"`;

BOM 中包含了如下几个对象：

* `Window`：浏览器窗口对象。
* `Navigator`：浏览器对象。
* `Screen`：屏幕对象。
* `History`：历史记录对象。
* `Location`：地址栏对象。

BOM 中常用的对象有Window(浏览器窗口对象)、History(历史记录对象)、Location(地址栏对象)。

**2、Window对象**

window 对象是 JavaScript 对浏览器的窗口进行封装的对象。

**2.1 获取window对象**
window对象不需要创建，直接使用即可 。

调用window对象中的属性和方法时`window.` 可以省略，比如我们之前使用的 `alert()` 函数，其实就是 `window` 对象的函数。

在调用时有如下两种写法：
```js
// 显示使用window对象调用
window.alert("hello");
// 隐士调用（省略windows.）
alert("hello");
```

**2.2 window对象属性**
window对象提供了获取其他 BOM 组成对象的属性：

* `history`：对History对象的只读引用。
* `location`：用于窗口或框架的Location对象。
* `Navigator`：对Navigator对象的只读引用。
* `Screen`：对Screen对象的只读引用。
* `document`：获取文档对象。

也就是说，我们想使用 `Location` 对象的话，通过 `window` 对象便可以获取；如 `window.location`，而 `window`. 可以省略，简化写法 `location` 来获取 `Location` 对象。

**2.3 window对象函数**
window对象常用函数：

* `alert()`：显示带有一段消息和一个确认按钮的警告框。
```js
alert("hello");
```
* `confirm()`：显示带有一段消息以及确认按钮和取消按钮的对话框。
```js
// confirm()，点击确定按钮，返回true，点击取消按钮，返回false
var flag = confirm("确认删除？");

alert(flag);
```
* `setTimeout(function,毫秒值)` : 在一定的时间间隔后执行一个function，只执行一次。
```js
setTimeout(function (){
//修改浏览器地址栏的地址
location.href="http://www.baidu.com";
},3000);
```
* `setInterval(function,毫秒值)` :在一定的时间间隔后执行一个function，循环执行。
```js
setInterval(function (){
   console.log(new Date());
},1000);
```

**3、History对象**
`History对象是 JavaScript 对历史记录进行封装的对象。`
1、获取History对象：

使用 `window.history` 获取，其中 `window`.可以省略。
`window.history.方法();`
`history.方法();`
1
2

2、History对象的函数：

back()：加载history列表中的前一个URL。
forward()：加载history列表中的下一个URL。

当我们点击向左的箭头，就跳转到前一个访问的页面，这就是 back() 函数的作用；当我们点击向右的箭头，就跳转到下一个访问的页面，这就是 forward() 函数的作用。


**4、Location对象**
**4.1 获取Location对象**
使用 `window.location` 获取，其中 `window.` 可以省略
```js
window.location.方法();
location.方法();
```
4.2 Location对象属性
Location对象常用属性：

* href：设置或返回完整的URL地址。

示例：跳转到百度
`location.href = "https://www.baidu.com";`

### 六、DOM（文档对象模型）

**1、DOM概述**
DOM(Document Object Model)：文档对象模型。也就是 JavaScript 将 HTML 文档的各个组成部分封装为对象。

DOM 其实我们并不陌生，之前在学习 XML 就接触过，只不过 XML 文档中的标签需要我们写代码解析，而 HTML 文档是通过浏览器解析。

**DOM 中包含了如下几个对象：**

* Document：整个文档对象。
* Element：元素对象。
* Attribute：属性对象。
* Text：文本对象。
* Comment：注释对象。
[html+js+css](/images/html+css+js01.png)
JavaScript 通过 DOM， 就能够对 HTML文档进行操作了。

* 改变 HTML 元素的内容。
* 改变 HTML 元素的样式（CSS）。
* 对 HTML DOM 事件作出反应。
* 添加和删除 HTML 元素。


:::tip 
DOM相关概念
:::
DOM 是 W3C（万维网联盟）定义了访问 HTML 和 XML 文档的标准。该标准被分为 3 个不同的部分：

1、核心 DOM：针对任何结构化文档的标准模型。 XML 和 HTML 通用的标准。

    * Document：整个文档对象。
    * Element：元素对象。
    * Attribute：属性对象。
    * Text：文本对象。
    * Comment：注释对象。

2、XML DOM： 针对 XML 文档的标准模型。

3、HTML DOM： 针对 HTML 文档的标准模型。

HTML DOM是在核心 DOM 基础上，对 HTML 中的每个标签都封装成了不同的对象。

例如：`<img>` 标签在浏览器加载到内存中时会被封装成 `Image` 对象，同时该对象也是 `Element` 对象。

例如：`<input type='button'>` 标签在浏览器加载到内存中时会被封装成 `Button` 对象，同时该对象也是 `Element` 对象。

**2、获取 Element对象**
HTML 中的 Element 对象可以通过 Document 对象获取，而 Document 对象是通过 window 对象获取。

document对象中提供了以下获取 element元素对象的函数：

* `getElementById()`：根据id属性值获取，返回单个Element对象。
* `getElementsByTagName()`：根据标签名称获取，返回Element对象数组。
* `getElementsByName()`：根据name属性值获取，返回Element对象数组。
* `getElementsByClassName()`：根据class属性值获取，返回Element对象数组。

### 七、事件监听
:::tip
事件：某些组件被执行了某些操作后，会触发某些代码的执行。例如 登录页面切换验证码等等。
:::

**1、事件的绑定**
JavaScript 提供了两种事件绑定方式：

第一种方式：通过 HTML标签中的事件属性onclick进行绑定。
```html
//为按钮配置单击事件,绑定的函数式btn()。
//当点击这个按钮时会调用btn()函数
<input type="button" onclick='btn()'/>
<script>
     function btn(){
        alert("我被点了");
    }                             
</script>                             
```
第二种方式：通过 DOM 元素属性绑定。
```html
<input type="button" id="bt1">

<script>
    // 通过id值获取对应的元素对象
    var btn = document.getElementById("bt1");   
    // 将onclick作为该对象的属性，并且绑定匿名函数。该函数是在事件触发后自动执行
    btn.onclick=function(){
        alert("我被点击了");
    }
</script>      
```
**2、常见事件**
js中常见的事件属性如下：

* click：鼠标单击事件。
* blur：元素失去焦点。
* focus：元素获得焦点。
* load：某个页面或图像被完成加载。
* submit：当表单提交时触发该事件。
* mouseover：鼠标被移到某元素之上。
* onmouseout：鼠标从某元素移开。

示例：onsubmit的使用

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        // onload加载事件：当页面加载完毕后,会执行这部分js代码
        window.onload=function (){
            document.getElementById("register").onsubmit=function (){
                //onsubmit 返回true，则表单会被提交，返回false，则表单不提交
                return true;
            }
        }

    </script>

</head>
<body>

<form id="register" action="#" >
    <input type="text" name="username" />
    <input type="submit" value="提交">
</form>

<script>
    //onsubmit 返回true，则表单会被提交，返回false，则表单不提交

    document.getElementById("register").onsubmit=function (){
        //onsubmit 返回true，表示表单会被提交
                 //返回false，表示表单不提交
        return true;
    }
</script>
</body>
</html>
```
