# VSCode 常用插件 

Visual Studio Code (简称 VS Code / VSC) 是一款免费开源的现代化轻量级代码编辑器，支持几乎所有主流的开发语言的语法高亮、智能代码补全、自定义热键、括号匹配、代码片段、代码对比 Diff、GIT 等特性，支持插件扩展，并针对网页开发和云端应用开发做了优化。软件跨平台支持 Win、Mac 以及 Linux。

[VSC中文网](http://www.vscode.org/)

vscode  作为一款逐渐火热的编辑器。它的特点免费、开源、多平台，以及集成git，代码调试，插件丰富等有点，被大家逐渐熟知和认可。

这里主要说一下前端常用插件。


## Auto Rename Tag
 　　自动重命名配对的HTML / XML标签
 
## bachground
 　　修改背景，设置编辑器界面的背景图片。但是好像现在会出错，具体设置内容在vsc找到插件看详细信息。
 
## Bootstrap 4 & Font awesome snippets
 　　bootstrap4和font awesome 快速引用和代码生成。
 
## Color-Highlight
 　　在编辑器中高亮显示颜色。
 
## Color Picker
 　　代码的颜色选择器。
 
## Css Peek
 　　能在源代码中的字符串中找到对应的css（类和ID）。显示在那个css文件里，还有在第几行。
 
## Csscomb
 　　css 、less、sass 的代码格式化。
 
## Debugger for Chrome
 　　js调试的插件，前端项目在Chrome中运行起来之后，可以直接在VSCode中打断点、查看输出、查看控制台，详细配置见插件说明。
 
## Document This
 　　为js文件生成文档的代码注释。
 
## ESLint
 　　检查Javascript编程时的语法错误。
 
## Git Easy
 　　增加了vscode中自带的git操作，安装后按F1调出控制台，输入git easy [options]完成git操作，代替git bash。
 
## Git History 
 　　查看git日志以及图表和详细信息。
 　　查看文件的历史记录（Git日志）或文件中的行历史（Git Blame）
 
## Guides
 　　代码的标签对齐线。
 
## HTML CSS Class Completion
 　　为基于工作空间上的CSS文件的HTML类属性提供CSS类名称提示。
 
## HTML Boilerplate
 　　提供生成标准HTML样板代码。
 
## HTML CSS support
 　　css 自动补齐
 
## HTML Snippets
 　　支持HTML5标签提示
 
## JavaScript (ES6) snippets
  　　支持JavaScript  ES6 语法
 
## jQuery Code Snippets
  　　jq代码段提示。
 
## JS-CSS-HTML  Formatter
 　　代码格式化。
 
## Lodash
 　　lodash 函数提示。
 
## Lorem ipsum
 　　快速填充文本
 
## Npm Intellisense
 　　在import语句中自动完成npm模块引入的代码插件。
 
## open in browser
 　　在浏览器中打开，安装后在左侧目录中右键点击会出现 open in browser 选项。
 
## Path Intellisense
 　　文件路径提示。
 
## Settings Sync
 　　编辑器设置同步，包括插件，配置等。
 
 　　详情点击=》https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
 
## VS Code CSS Comments
 　　css代码注释。
 
## vscode-browser-plugin
 　　在编辑器内预览HTML，
 
 　　通过开启端口(3000)监听当前打开项目的根目录，在编辑器内预览网站，省去了频繁切换浏览器、编辑器看页面效果，修改代码后自动刷新页面。
 
##  vscode-icons
 　　文件图标。
 
## Vue 2 Snippets
 　　　vue 代码提示，高亮。
 
 　　（ps：使用其他框架，直接搜就好，像是react，angular，就会出现相关的代码提示和语法支持常用插件）
 
## 主题插件：
### Material-theme；
### monokai-light;
### Monokai++;
### One Dark Theme;
 　　　个人审美不同，大家自己体会并选择。
 
 以上就是我的前端常用插件，有些插件的功能相互交叉重复，自己可以有选择的安装使用。
 
 ## vsc常用快捷键：
 
 ###同时打开多个窗口（查看多个项目）

* 打开一个新窗口： Ctrl+Shift+N
* 关闭窗口： Ctrl+Shift+W

### 同时打开多个编辑器（查看多个文件）
* 
* 新建文件 Ctrl+N
* 历史打开文件之间切换 Ctrl+Tab，Alt+Left，Alt+Right
* 切出一个新的编辑器（最多3个）Ctrl+\，也可以按住Ctrl鼠标点击Explorer里的文件名
* 左中右3个编辑器的快捷键Ctrl+1 Ctrl+2 Ctrl+3
* 3个编辑器之间循环切换 Ctrl+`
* 编辑器换位置，Ctrl+k然后按Left或Right
 
### 格式调整

* 代码行缩进Ctrl+[， Ctrl+]
* 折叠打开代码块 Ctrl+Shift+[， Ctrl+Shift+]
* Ctrl+C Ctrl+V如果不选中，默认复制或剪切一整行
* 代码格式化：Shift+Alt+F，或Ctrl+Shift+P后输入format code
* 修剪空格Ctrl+Shift+X
* 上下移动一行： Alt+Up 或 Alt+Down
* 向上向下复制一行： Shift+Alt+Up或Shift+Alt+Down
* 在当前行下边插入一行Ctrl+Enter
* 在当前行上方插入一行Ctrl+Shift+Enter
 
### 光标相关
 
* 移动到行首：Home
* 移动到行尾：End
* 移动到文件结尾：Ctrl+End
* 移动到文件开头：Ctrl+Home
* 移动到后半个括号 Ctrl+Shift+]
* 选中当前行Ctrl+i（双击）
* 选择从光标到行尾Shift+End
* 选择从行首到光标处Shift+Home
* 删除光标右侧的所有字Ctrl+Delete
* Shrink/expand selection： Shift+Alt+Left和Shift+Alt+Right
* Multi-Cursor：可以连续选择多处，然后一起修改，Alt+Click添加cursor或者Ctrl+Alt+Down 或 Ctrl+Alt+Up
* 同时选中所有匹配的Ctrl+Shift+L
* Ctrl+D下一个匹配的也被选中(被我自定义成删除当前行了，见下边Ctrl+Shift+K)
* 回退上一个光标操作Ctrl+U
 
### 重构代码
 
* 跳转到定义处：F12
* 定义处缩略图：只看一眼而不跳转过去Alt+F12
* 列出所有的引用：Shift+F12
* 同时修改本文件中所有匹配的：Ctrl+F12
* 重命名：比如要修改一个方法名，可以选中后按F2，输入新的名字，回车，会发现所有的文件都修改过了。
* 跳转到下一个Error或Warning：当有多个错误时可以按F8逐个跳转
* 查看diff 在explorer里选择文件右键 Set file to compare，然后需要对比的文件上右键选择Compare with 'file_name_you_chose'.
* 查找替换
 
### 查找 Ctrl+F
* 查找替换 Ctrl+H
* 整个文件夹中查找 Ctrl+Shift+F
* 显示相关
 
### 全屏：F11
* zoomIn/zoomOut：Ctrl + =/Ctrl + -
* 侧边栏显/隐：Ctrl+B
* 预览markdown Ctrl+Shift+V
### 其他
 
* 自动保存：File -> AutoSave ，或者Ctrl+Shift+P，输入 auto