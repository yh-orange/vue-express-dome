# 脚手架创造之路一：构建脚手架底层能力

**手搭建议webpack，增加自己的理解和记忆**

## 1.开发环境和生产环境的定义

webpack对开发和生产环境的定义很清楚。

webpack在配置对象中提供了一个mode参数

mode:production/development两个结果

production:代表生产环境，当配置为此结果时，webpack会对所有的js和html进行压缩处理，并且将构建结果输出到指定文件结构。用于发布到生产服务器

development：代表开发环境，当配置为此结果时，webpack要配合webpack-dev-server插件来使用，此时会启动本地服务器，用来调试和开发前端项目的代码，还需要配合devtools来实现编译代码和开发代码的映射来保证调试的准确性

## 2.webpack搭建开发和生产环境

### 2.1创建一个生产和开发环境分开的结构

首先在案例中创建一个`p-cli`的目录，右键使用控制台打开。在命令行中输入

```sh
npm init
```

一路确认，填写初始文件。

然后我们安装基本插件:

1. webpack核心包

   ```sh
   npm i webpack -D
   ```

2. webpack-cli包

   ```sh
   npm i webpack-cli -D
   ```

然后我们在项目中创建三个文件

1. webpack.base.js (他代表webpack中公用部分的配置信息)
2. webpack.dev.js （他代表开发环境的配置文件部分，dev代表development）
3. webpack.prod.js （他代表生产环境的配置文件部分，prod代表production）

接下来创建两个文件夹并创建对应两个文件

1. public
   1. index.html
2. src
   1. index.js，这个文件内部可以随便用console输出点内容

### 2.2配置entry和output

安装html-webpack-plugin

```sh
npm i html-webpack-plugin -D
```



在webpack.base.js中输入如下代码

```js
const path = require('path')
//html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		publicPath:''//publicPath是生成的dist中的html文件中自动引入js和css文件时在最前面拼的一部分字符串
	},
	plugins:[//html处理插件
		new HtmlWebpackPlugin({
			template:'./public/index.html',//html模版文件位置
			filename:'index.html',//生成的html文件名，生成的html文件路径会整合base中配置的path生成到目标位置
      chunks:['index']//生成的index.html中自动引入的组件，这里设置的是entry中定义的key
		})
	]
}
```

### 2.3配置dev环境的基本配置

我们今天将webpack分成两个环境分别对应的就是dev和prod

dev环境就是本地的开发环境，prod就是构建的生产环境

base相当于dev和prod中共同部分的内容我们单独抽取成一个根文件

所以这里涉及到一个中间件webpack-merge

```sh
npm i webpack-merge -D
```

安装成功之后我们将webpack.dev.js文件做如下改造

```js
//webpack.dev.js
//引入webpack-merge用来合并配置到webpack.base.js中
const { merge } = require('webpack-merge');
//引入webpack.base.js
const base = require('./webpack.base.js')
const path = require('path')

//merge用法用来将配置内容合并到webpack.base.js中
//第一个参数是原始的webpack的配置json对象
//第二个参数是我们要合并的单独的配置对象
//他们最终会形成一个整体的大json
module.exports = merge(base,{
  //定义环境为开发环境
  mode:'development',
  //配置本地服务
	devServer:{
    //配置本地的静态资源文件夹，用来让这两个文件夹内部的文件可以通过访问http地址直接展示
		static:[
			path.resolve(__dirname,'dist'),//这里是构建目标路径
			path.resolve(__dirname,'public')//这里是public部分的内容
		],
		host:'localhost',//本地服务启动后的ip地址
		port:8080,//本地服务启动的端口号
    open:true,//启动时自动打开默认浏览器
	},
})
```

然后我们在package.json中定义启动命令.

> 注意：这里是通过webpack-cli命令去启动，并不是通过webpack来启动，才能实现在构建时结合本地服务器自动构建，并且在本地可访问。通过webpack-cli的方式启动本地服务是使用webpack5+webpack-cli4版本之后的配置方式，旧版本的使用方式请自行百度学习

```json
#该方式已弃用
#"serve": "webpack-cli serve --config webpack.dev.js --color --progress --hot"
```

```sh
"serve":"webpack serve --config webpack.dev.js --color --progress --hot"
```



配置完启动命令，并确保所有相关插件已经安装完毕我们可以尝试启动本地服务

```sh
npm run serve
```

运行后如果打开了浏览器并且在控制台打印出了我们在index.js中随便打印的信息就说明配置成功

### 2.4配置prod环境

配置prod环境我们需要改造webpack.prod.js文件的内容如下

```js
//webpack.prod.js
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
//清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = merge(base,{
  //定义环境为生产环境
	mode:'production',
	plugins:[
		new CleanWebpackPlugin()
	]
})
```

所以这里我们需要安装一下clean-webpack-plugin

```sh
npm i clean-webpack-plugin -D
```

然后我们需要在package.json中添加构建指令

```js
"build": "webpack --config webpack.prod.js --color --progress"
```

添加完毕后我们执行

```sh
npm run build
```

完毕后我们可以查看项目目录中的dist文件夹查看是否生成了index.html以及index.js

### 2.5配置babel

与昨天的学习的babel配置方式一样首先需要安装babel-loader

```sh
npm i babel-loader -D
```

然后我们需要安装babel的核心库@babel/core,@babel/preset-env,core-js

```sh
npm i @babel/core -D
npm i @babel/preset-env -D
npm i core-js -s
```

我们也可以这样安装

```sh
npm i @babel/core @babel/preset-env -D
npm i core-js -s
```

然后我们需要在webpack.base.js中配置babel-loader

这里配置在base中是因为无论生产环境还是开发环境都需要对js进行解析并且编译

```js
//webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		publicPath:''
	},
	module:{
		rules:[
			{//配置babel-loader用来编译和解析js
				test:/\.js$/,
				use:{loader:'babel-loader'}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			filename:'index.html',
			chunks:['index']
		})
	]
}
```

这一步操作完毕之后我们还需要在项目中创建babel的核心配置文件

.babelrc文件

```json
{
	"presets":[
		[
			"@babel/preset-env", //应用@babel/preset-env解析js
			{
				"useBuiltIns": "usage", //使用动态解析语法，根据兼容性转义
				"corejs":3//使用core-js3版本的js库来对低版本浏览器做兼容
			}
		]
	]
}
```

然后我们需要定义该项目可以兼容浏览器的范围

创建.browserslistrc文件（webpack5版本配置browserslist之后会造成热更新失效的问题，有待官方解决）

```sh
> 0.25% 
last 2 versions
```

定义完成之后我们可以通过

```sh
npx browserslist
```

来查看当前项目可兼容浏览器的列表

browserlist配置说明

| 例子                       | 说明                                                    |
| :------------------------- | :------------------------------------------------------ |
| > 1%                       | 全球超过1%人使用的浏览器                                |
| > 5% in US                 | 指定国家使用率覆盖                                      |
| last 2 versions            | 所有浏览器兼容到最后两个版本根据 CanIUse.com 追踪的版本 |
| Firefox ESR                | 火狐最新版本                                            |
| Firefox > 20               | 指定浏览器的版本范围                                    |
| not ie <=8                 | 方向排除部分版本                                        |
| Firefox 12.1               | 指定浏览器的兼容到指定版本                              |
| unreleased versions        | 所有浏览器的beta测试版本                                |
| unreleased Chrome versions | 指定浏览器的测试版本                                    |
| since 2013                 | 2013年之后发布的所有版本                                |

完成之后我们可以在index.js中定义一些es6的map循环，Promise等来测试构建是否被转译



### 2.6样式的处理

我们在昨天学习了style-loader，css-loader以及其他的loader。所以今天我们直接开始进行样式的处理。

这里有一点需要注意，再区分了生产和开发环境之后。我们的css样式处理也要分两种情况，在开发环境中由于启动项目是通过webpack-cli启动的本地服务器，所以css样式在开发的过程中不需要抽取到单独文件中，这里我们在dev环境中只需要使用postcss以及普通样式loader来处理就可以，在prod文件中需要对css样式文件进行单独的解析

所以我们现在首先安装style-loader，css-loader，postcss-loader，sass-loader，sass来处理样式

可以使用如下方式

```sh
npm i style-loader css-loader postcss-loader sass-loader  sass -D
```

样式的处理和js不同，样式在开发和生产环境的要求是不同的，我们在开发环境中由于启动本地服务实时编写代码并且调试，所以不需要将css抽取到外部，而是整合到js中即可，发布到生产环境时需要将css抽取到外部，所以两个处理是有差异的

所以安装成功之后我们首先处理dev文件，在webpack.dev.js中使用loader解析样式文件

```js
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js')
const path = require('path')
module.exports = merge(base,{
	mode:'development',
	devServer:{
		contentBase:[
			path.resolve(__dirname,'dist'),
			path.resolve(__dirname,'public')
		],
		host:'localhost',
		port:8080,
		open:true,
		openPage:''
	},
	module:{
		rules:[
			{ //用来编译css代码
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{ //用来编译sass代码
				test:/\.scss$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	}
})
```

然后我们需要在项目中定义postcss的配置文件，这里需要安装

postcss-preset-env，postcss,cssnano三个插件

```sh
npm i postcss-preset-env postcss cssnano -D
```

然后我们定义postcss.config.js文件

```js
//postcss.config.js
module.exports = {
	plugins: {
		'postcss-preset-env': {},//处理兼容性
		'cssnano':{}//压缩样式
	}
}
```

完毕之后我们通过

```sh
npm run dev
```

来启动项目，并且在src中创建index.scss文件，内容如下

```sass
/*index.scss*/
.test{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.item{
		width: 100px;
		height: 100px;
		background-color: #333;
	}
}
```

然后我们在public/index.html中书写如下代码

```html
<!--index.html-->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div class="test">
			我是一个测试元素
			<div class="item">
				
			</div>
			<div class="item">
				
			</div>
		</div>
	</body>
</html>

```

然后在index.js中通过import引入index.scss文件

然后我们查看首页的样式，可以右键查看控制台的查看器来看定义的样式是否增加了兼容性前缀，如果补全了前缀说明我们的postcss已经根据browserslist进行了兼容处理。

到这里dev环境的css样式处理已经完成了。

接下来我们需要处理prod环境的样式处理。在生产环境中样式不光要做兼容性处理还需要将css部分的代码抽取到css文件中，这里就需要使用mini-css-extract-plugin来实现了

```sh
npm i mini-css-extract-plugin -D
```

然后我们需要在webpack.prod.js中做如下改造

```js
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//引入抽取css样式插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(base,{
	mode:'production',
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
    //配置样式抽取插件，生成的css文件名称为[name],[name]为entry中定义的key
		new MiniCssExtractPlugin({
			filename:'[name].css'
		})
	]
})
```

然后我们运行

```sh
npm run build
```

查看生成的dist文件夹是否生成了css的样式文件。

### 2.7处理source-map

#### 2.7.1什么是source-map

由于在webpack环境中进行代码开发时实际运行在浏览器中的代码是通过babel解析后的混淆过的并且处理过兼容性的js代码，这样我们在开发环境中调试开发时如果有代码报错，那么浏览器返回给我们的错误信息会与我们在src中编写的代码从行数到函数名称全部无法对应，这样就造成了调试困难。webpack提供的source-map就是相当于在构建后的代码和源代码中间做了一个简单的映射用来在出现语法错误时可以还原到源代码的结构提示错误的位置和内容。

#### 2.7.2如何配置source-map

在生产环境中我们需要在webpack.prod.js中增加一个属性devtool

```json
{
  devtool:'source-map'//独立配置源码映射
}
```

在开发环境中我们需要在webpack.dev.js中增加一个同样的devtool

```json
{
  devtool:'inline-source-map'//内联配置源码映射
}
```

它们两个的区别就是生产环境会对每一个js文件生成一个.map后缀的映射文件，而开发环境映射内容会直接构建在js代码中

### 2.8路径解析处理

我们可以通过昨天学习的resolve属性来配置项目的引用。

由于生产和开发环境都需要通过import来引用依赖文件，所以我们直接将resolve配置到webpack.base.js中

```js
//webpack.base.j追加如下代码
module.exports = {
  resolve:{
    //配置免后缀的文件类型
    extensions:['.js','.jsx','.vue','.css','.less','.scss'],
    //为全路径配置缩写@
		alias:{
			'@':path.resolve(__dirname,'src')
		}
  }
}
```

完成如下配置之后我们在src下创建css文件夹，在css文件夹内部创建test.scss文件

并且将index.scss的内容复制到里面

然后删除index.scss

之后我们将index.js中的代码引用改成

```js
import '@/css/test'
```

这样我们分别运行生产环境和开发环境来验证test样式是否可以正常的加载

### 2.9文件处理

我们现在已经成功的进行了webpack的脚手架的基本功能的设置。不过还有一个比较重要的环节我们没有处理，这个就是当我们在脚手架中使用图片或者其他文件的时候我们需要对文件和图片进行引入。下面我们来做一个实验。

在src下创建assets文件夹，在其中随便放一个图片.

然后我们思考如果在src中引用图片并通过js动态设置到网页中，我们必须确保图片在浏览器中可以直接访问所以我们先做一个简单的小实验

在index.html中创建一个id为img的img标签

然后我们在index.js中

```js
document.querySelector('#img').src = assets中的图片路径
```

查看浏览器中是否能展示图片。

运行结果我们发现在浏览器中无法直接访问src中的图片

因为我们在项目运行的时候所有的浏览器可访问到的文件夹只有dist和public

本地服务启动时本地的dist没有实体文件只有public可以存放静态资源

不过如果我们一定要使用src中的图片就需要引用一个新的loader

```sh
npm i file-loader -D
```



```js
{ //在webpack.base.js中增加file-loader用来解析文件
  test:/\.(png|jpg|jpeg|gif)$/,
    use:[
      {loader:'file-loader'}
    ]
}
```

以上操作完成之后我们在index.js中做如下操作

```js
import img from '@/assets/p1.png'
console.log(img)
document.querySelector('#img').src = img
```

我们可以输出img对象，发现他就是一串乱码名称的图片，并且我们可以直接将他拼在浏览器localhost:8080/的后面尝试是否可以访问

file-loader主要解决的问题就是将src中的文件类型的数据动态的追加到dev-server的内存中这样在本地的开发环境就可以直接的访问到图片了，并且在打包构建之后通过import引入的图片也会构建到生成的dist文件夹中。

**可能会遇到的问题：这里生成的dist文件目录中的图片在通过js渲染可能会访问不到，这是由于file-loader在处理打包构建时还需要其他的一些配置，这里我们不需要学习这么细，等到使用vue的时候可以直接将他混入源代码中，所以这里就暂时不处理构建之后图片无法访问的问题**

以上就是在webpack中构建生产环境和开发环境的方法。

今天的课程到这里就告一段落，接下来的时间大家可以从头到尾自己操作一遍熟悉一下webpack的环境搭建。

## 1搭建地基包

地基包就是我们在上一节课中实现的基本的生产和开发环境分离的环境

首先打开案例中的vue-cli文件夹，今天我们在昨天实现的基本webpack环境基础上实现vue的cli的基本功能

打开之后先运行，进行本地服务的启动

```sh
npm install
npm run dev
```

然后尝试运行，进行本地项目的构建

```sh
npm run build
```

然后我们将项目按照@vue/cli的结构进行改造

## 2构建本地脚手架项目结构

首先清空src中的内容，然后创建main.js文件

```js
//main.js
console.log('main.js')
```

然后找到webpack.base.js。将entry中的内容改成如下内容

```js
//entry做如下修改
entry:{
  main:'./src/main.js'
},
//plugins做如下修改
plugins:[
  new HtmlWebpackPlugin({
    template:'./public/index.html',
    filename:'index.html',
    chunks:['main']
  })
]
```

然后分别运行开发环境，和构建命令测试是否能正常运行和构建项目

## 3.安装Vue依赖库

首先用命令行打开当前项目的目录，并且安装vue

```sh
npm i vue -s
```

安装完毕之后我们改造public中的index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div id="app"></div>
	</body>
</html>

```

然后我们在src下创建一个App.vue

```vue
<template>
	<div>
		app.vue
	</div>
</template>

<script>
</script>

<style>
</style>

```

然后我们改在main.js中做如下改造

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
new Vue({
	render:(h) => h(App) 
}).$mount('#app')
```

然后运行项目会发现页面空白并且控制台会提示如下错误

```sh
Uncaught Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> <template>
| 	<div>
| 		app.vue
    at Object../src/App.vue (main.bundle.js:8456)
    at __webpack_require__ (bootstrap:18)
    at Object../src/main.js (main.bundle.js:8436)
    at __webpack_require__ (bootstrap:18)
    at startup:3
    at startup:4
```

当前错误是因为我们的webpack地基框架中并没有解析vue文件的插件导致App.vue无法正确加载。

所以下一步的操作是让vue文件能正常读取。

这里需要使用的就是vue-loader，vue-template-compiler 

```sh
npm i vue-loader -D
```

```sh
npm i vue-template-compiler -D
```

然后我们改造webpack.base.js的配置

```js
// webpack.base.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

以上操作完成之后我们来实际运行一下项目

```sh
npm run dev
```

并且打包构建一下

```sh
npm run build
```

发现vue文件已经可以解析

到此为止vue的处理部分已经完成

## 4VueRouter的安装

接下来我们要把项目的页面管理框架VueRouter插入

首先安装VueRouter

```sh
npm i vue-router -s
```

然后我们在项目src下创建views文件夹，并且创建Index.vue如下

```vue
<template>
	<div>
		我是index.vue
	</div>
</template>

<script>
</script>

<style>
</style>

```

我们在src下创建router文件夹，并且在router文件夹内创建index.js文件

```js
//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)
const routes = [
	{
		path:'/',
		name:'Index',
		component:Index
	}
]
const router = new VueRouter({
	routes
})
export default router
```

完毕之后我们在改造main.js

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
//引入路由配置
import router from './router'
new Vue({
  //将路由整合到vue中
	router,
	render:(h) => h(App) 
}).$mount('#app')
```

完毕之后我们在src中创建一个Test.vue文件并且初始化为以下内容

```vue
<template>
	<div>
		Test
	</div>
</template>

<script>
</script>

<style>
</style>

```

并且将该文件注册到router/index.js中这里我们采用异步的方式

```js
//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)
const routes = [
	{
		path:'/',
		name:'Index',
		component:Index
	},
	{
		path:'/test',
		name:'Test',
		component:() => {
			return import(
				/*webpackChunkName:"test"*/
				'../views/Test.vue'
			)
		}
	}
]
const router = new VueRouter({
	routes
})
export default router
```

启动项目查看内容，发现页面并没有跳转到index和test

我们需要改造App.vue让路由能正确的加载所以

将App.vue改造成如下

```vue
<template>
  <div >
    {{str}}
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
  data(){
    return {
      str:'hello1'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
```

然后我们启动查看页面，是否正常访问

之后我们运行

```sh
npm run build
```

查看dist目录会发现多生成一个test.bundle.js

这个文件是通过异步引入vue页面之后生成的

这么做有一个非常大的好处就是当我们项目的页面非常多的时候可以通过异步引入的方式将路由按照自定义的webpackChunkName将他们单独拆分成多个包，这样打包后的js文件就不会将所有的源代码都放到一个main.bundle.js中所以这么做可以实现vue项目的首屏幕加载速度的优化。



-------------------------

完毕之后我们在index中通过router-link跳转到Test.vue

我们接下来在Test.vue中定义一些样式

```vue
<template>
	<div class="test">
		Test
	</div>
</template>

<script>
</script>

<style lang="scss">
	.test{
		display: flex;
		color: red;
	}
</style>

```

然后我们运行

```sh
npm run build
```

来进行构建以下项目，先运行index.html看一下效果。然后我们看一下构建出来的文件结构。这里的test.bundle就是Test.vue解析出来的代码，并且通过import（）异步引入的组件我们能够自动拆分到新的文件中，这个就是webpack的功能。

到此我们的脚手架主要功能就完成了。下一步我们可以加入js压缩插件

和public中的静态资源转移构建插件来实现更多的功能

### 关于prefetch

结合文档学习：https://webpack.docschina.org/guides/code-splitting/#splitchunksplugin

## 5.个性化功能

### 5.1gzip压缩代码

引入compression-webpack-plugin组件来实现对vue项目的代码进一步压缩

```sh
npm i compression-webpack-plugin -D
```

安装成功之后我们在webpack.prod.js中引入这个插件

```js
const CompressionPlugin = require("compression-webpack-plugin")
plugins:[
  new CompressionPlugin({
    algorithm: "gzip",
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240,
    minRatio: 0.8
  })
]
```

完成之后我们打包构建这个项目

```sh
npm run build
```

查看构建的代码如果有超过10kb的代码就会被压缩成.gz为后缀的压缩包

这样将项目放到服务器上之后访问项目时如果哪个文件有gz的压缩包就会优先加载gz文件下载到本地再解压这样就能提升加载速度。

### 5.2public中的静态资源处理

我们在项目中有可能会引用public中的静态资源。

所以我们先启动项目

然后改造Index.vue，这里需要在对应的public文件夹中创建imgs文件夹并且放入一个名为bg1.png的图片然后在src中创建一个名为assets的文件夹放入bg.png图片

```vue
<template>
	<div>
		我是index.vue
		<router-link to="/test">跳转到test</router-link>
		<img style="display: block;" width="200" :src="src" alt="">
		<img width="200" height="200" src="imgs/bg1.png" alt="">
	</div>
</template>

<script>
	import img from '../assets/bg.png'
	export default{
		data(){
			return {
				src:img
			}
		}
	}
</script>

<style>
</style>

```

这里是两种引入静态资源的方式，直接在img上编写路径是通过public文件夹引入图片，通过import的方式是在src中引入图片，我们现在运行

``` sh
npm run build
```

然后我们打开dist中的index.html文件查看内容，发现只有一张图片展示

这是因为我们在public中使用的图片地址是在html标签上直接写的webpack并不知道我们依赖了这张图片所以没有将他输出到dist中，所以这里我们需要通过copy-webpack-plugin这个插件来实现将public的内容合并到dist中这样所有的静态资源在构建之后才能正常使用

```sh
npm i copy-webpack-plugin -D
```

然后改造webpack.prod.js

```js
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
module.exports = merge(base,{
	mode:'production',
	devtool:'source-map',
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename:'[name].css'
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.js$|\.html$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new CopyPlugin({
			patterns: [
				{ 
					from: path.resolve(__dirname,'public'),
					to: path.resolve(__dirname,'dist')
				},
			],
			options: {
				concurrency: 100,
			},
		})
	]
})
```

然后运行

```sh
npm run build
```

我们查看结果，dist文件夹中集成了public中创建的imgs文件夹，这样静态资源就可以全部使用了。

以上就是我们模拟vue脚手架的常用功能。

### 5.3 依赖图谱展示

依赖图谱展示需要使用的插件为`webpack-bundle-analyzer`

需要在webpack的配置文件中加入如下代码

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
```

```javascript
plugins:[
  new BundleAnalyzerPlugin()
]
```

他的文档地址如下：https://www.npmjs.com/package/webpack-bundle-analyzer

使用后可以通过他来可视化追踪构建项目的依赖图谱和各个组件间的依赖关系


