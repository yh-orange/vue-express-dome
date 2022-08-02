# 随笔

## ts 封装 axios 

最近在学习用vite+vue3+typescript+element-plus 搭建基础的前端框架，在封装axios遇到很多问题，后综合网上的dome，进行结合，不足之处，请指出，我也不会改哈哈哈(虚心受教)~
 
1. 第一步，先安装 `axios` 和 `qs`

```markdown

npm i axios -S 或者 yarn add axios -S
npm i qs -D 或者 yarn add qs -D
```

[点击查看axios配置说明](https://www.axios-http.cn/docs/req_config)

** `axios` 优点 ** 
* 从 `node.js` 创建 `http` 请求
* 在浏览器中创建 `XMLHttpRequest`
* 支持` Promise API`
* 提供了一些并发请求的接口
* 支持拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换 `JSON` 数据
* 客户端支持防御` CSRF/XSRF`
 
 简单用法
 
 ```typescript
// api->axios.ts:
 import axios from 'axios';
 let instance = axios.create({
     baseURL: 'http://localhost:8080',
 });
 export default instance;
 
 
// api->index.ts: 
interface type { // 定于的数据类型
  method: string;
  data: object;
  config?: object
}
import instance from "./axios";
export const loginHandle = (options: type) => {
    return instance({
        url: "/loginHandle",
        method: options.method,
        data: options.data,
    })
};
export default {
    loginHandle
};

// 在vue中基本使用如下
const options = {
   method: 'post',
   data: {
      user_name: 'admin',
      password: 'admin',
   }
}
loginHandle(options);
```

以上为最基础的使用，但是为了应对对种情况，所以需要重新封装
1、实例化的时候添加相对应的配置，比如自定义请求头，设置基础url,默认请求方式

2、使用`axios`已经封号的请求拦截和相应拦截，针对post请求，修改请求头的`Content-Type`,或者添加`Authorization`传递或者判断是否处于等于状态进行重定向处理

3、结合跟业务约定好的错误码，将错误进行显示

4、 使用`axios`封装好的`CancelToken`，进行请求取消处理，避免同一个请求并发的情况，相当于节流的处理

5、将get,post,put等请求二次封装，方便调用的时候传参

话不多说，上代码

```typescript
// service.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import qs from "qs"
import { ElMessage } from "element-plus"
import { stringify } from 'querystring'

const showStatus = (status: number) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
    // 联调
    // baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
    // baseURL: "/api",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    // 是否跨站点访问控制请求
    withCredentials: true,
    timeout: 30 * 1000,
    transformRequest: [(data) => {
        data = JSON.stringify(data)
        return data
    }],
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]

})

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
            pending.set(url, cancel)
        }
    })
}
/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url)
        cancel(url)
        pending.delete(url)
    }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url)
    }
    pending.clear()
}

// 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    let token = localStorage.getItem('token')
    if (token) {
        (config.headers as AxiosRequestHeaders)['Authorization'] = `${token}`;
    }
    if (config.method === 'POST') {
        (config.headers as AxiosRequestHeaders)['Content-Type'] = 'application/x-www-from-urlencoded;';
    }
    return config
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {

    removePending(response) // 在请求结束后，移除本次请求
    const status = response.status
    let message = ''
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        message = showStatus(status)
        if (typeof response.data === 'string') {
            response.data = { message }
        } else {
            response.data.message = message
        }
    }

    return response
}, (error) => {
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        // handle error code
        // 错误抛到业务代码
        error.data = {}
        error.data.message = '请求超时或服务器异常，请检查网络或联系管理员！'
        ElMessage.error(error.data.message)
    }
    return Promise.reject(error)
})

export default service
```

```typescript
// axios.ts
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
interface axiosConfig {
    method: string;
    url: string;
    data: object;
    config?: object;
}
import service from './service';
const axios = ({
    method,
    url,
    data,
    config
}: axiosConfig) => {
    method = method.toLowerCase();
    if (method == 'post') {
        return service.post(url, data, { ...config })
    } else if (method == 'get') {
        return service.get(url, {
            params: data,
            ...config
        })
    } else if (method == 'delete') {
        return service.delete(url, {
            params: data,
            ...config
        })
    } else if (method == 'put') {
        return service.put(url, data, { ...config })
    } else {
        console.error('未知的method' + method)
        return false
    }
}

export default axios;
```

使用方式如下
```typescript
// @ts-ignore
import axios from "../http/axios"
//请求示例
export interface registerData {
    username: string,
    password: string,
    captchaCode: string,
}
// login
export const login = (data: registerData) => {
    return axios({
        url: "/apis/login",
        method: "post",
        data,
        config: {
            headers: {
                'Content-Type': 'application/x-www-from-urlencoded;',
            },
            timeout: 10000
        }
    })
};

export const logout = (data: any) => {
    return axios({
        url: "/apis/logout",
        method: "get",
        data,
        config: {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8;',
            },
            timeout: 10000
        }
    })
};
```

额外提一个点，我在用 `express`做后台不能通过 `req.body`获取到前端传递过来的参数
```js
app.use(express.json());
app.use(express.urlencoded({extended: false}));
```
使用上述方式修改也无效。后面找到一个办法进行数据接收post方法传递的数据
```js
let data = '';
    req.on('data', function(chunk) {
        data += chunk
    })
    req.on('end', function() {
        data = JSON.parse(data)
        // chuckHandler(data) 正常情况下处理数据部分
    })
```

## 与操作目录相关的 `Linux` 命令

1. `cd`
`cd`，`change directory`，切换当前工作目录。

除指定目录外，还有以下特殊目录。

    * .: 当前工作目录。

    * ..: 父级工作目录。

    * /: 根目录。

    * ~: home 目录，即当前的用户目录，同时也可用环境变量 `$HOME` 表示。假设当前用户为 `shanyue`，则 ~ 目录为 `/Users/shanyue` (mac系统)。

另外，`cd -` 为进入上一次的工作目录，如同 `git checout -` 切回上次的分支一样。
除 `cd` 外，有一个拥有强大功能切换目录的小工具 `autojump`

2. `pwd`
`pwd`，`print working directory`，打印当前工作目录。

```text
# 打印当前路径，该目录为 react 源码内容
$ pwd
/Users/shanyue/Documents/react
```

3. `ls`
`ls`，列出某个工作目录的内容。

`ls` 单指令不会列出以 . 开头的文件，比如 `.git`、 `.babelrc`、`.eslintrc` 均不会默认显示。「而使用 `-a`，将会把所有文件列出。」

在日常工作中，常使用 `ls -lah` 列出工作目录内容。

```text
# -l: 使用长列表格式
# -a: 列出所有文件，包括以 . 开头的文件
# -h: 以可读的形式表示文件体积，比如 100M
$ ls -lah
total 2176
```

4. `tree`

`tree`，以树状图的形式列出文件。

该命令需要手动下载。

```text
# macos
$ brew install tree

# centos
$ yum install tree
```

## 如何统一前端项目的 Node 版本和包管理器？

* 开发环境
    1. Node.js
    2. Package Manager （npm、yarn、pnpm）
    
* 常见问题 
成员机器 `Node.js` 版本不统一：守旧派用 `12.x`、保守用 `14.x`、激进用 `17.x`。项目能否正常跑起来全凭天意，在没有 `CICD` 流水线加持本地 `npm run build` 的场景下线上风险可想而知。

有人习惯用 `npm`、有人习惯用 `yarn`, 代码库里面经常会存在 `package-lock.json`、`yarn.lock` 文件同时存在的情况。更痛的点还是各种奇奇怪怪问题排查起来没有头绪。

我们要做的就是将问题掐死在源头：锁定 `Node.js` 版本和包管理器

### 锁定项目 Node 版本

通过在 `package.json`中指定 `engines` 字段，可限定项目使用的 `node` 版本。下面配置仅允许用户使用 14 或者 16的版本。更多的配置可以参考 ` package.json` | `npm Docs` 、`semver`

```json
  "engines": {
    "node": "14.x || 16.x"
  },
```
配置之后你会发现，该字段只对 `yarn` 生效。那如何对 `npm` 也生效呢？在项目根目录下的 `.npmrc` 文件中增加如下配置
```.npmrc
// .npmrc
engine-strict = true
```
以上配置完成后，`npm install` 试试吧，错误的 `Node.js` 将直接退出

### 锁定包管理器

利用 `only-allo`w 工具包、`npm scripts` 快速实现锁定。

步骤一：在项目中 `npm install -D only-allow`

步骤二：在 `package.json` 文件中进行配置 `scripts.preinstall` ， 允许输入的值 `only-allow npm`、`only-allow pnpm`、`only-allow yarn`

```json
"scripts": {
    "preinstall": "only-allow npm",
    ...
}
```
以上配置完成后，可以再乱用 （`yarn`、`npm`、`pnpm`） 试试

## 文件系统中的目录与切换操作命令

**cd**

`cd`，`change directory`，切换当前工作目录。

除指定目录外，还有以下特殊目录。

* .: 当前工作目录。

* ..: 父级工作目录。

* /: 根目录。

* ~: `home目录`，即当前的用户目录，同时也可用环境变量 `$HOME` 表示。假设当前用户为 `shanyue`，则 ~ 目录为 `/Users/shanyue` (`mac系统`)。

另外，cd - 为进入上一次的工作目录，如同 git checout - 切回上次的分支一样。

**pwd**

`pwd`，`print working directory`，打印当前工作目录。

```text
PS C:\Users\HC0500017> pwd

Path
----
C:\Users\HC0500017
```

**ls**
ls，列出某个工作目录的内容。

ls 单指令不会列出以 . 开头的文件，比如 .git、 .babelrc、.eslintrc 均不会默认显示。「而使用 -a，将会把所有文件列出。」

在日常工作中，常使用 ls -lah 列出工作目录内容。

**exa**

一个 ls 的替代品，拥有更友好的色彩更丰富的输出，同时支持更丰富的选项。

```text
# 支持查看 git 情况
$ exa -lah --git
```

**tree**

tree，以树状图的形式列出文件。

该命令需要手动下载。

```text
# macos
$ brew install tree

# centos
$ yum install tree
```

* 可通过 -L 指定层级，平常工作可使用以下指令。

* 同时，也可以使用更高级的 exa -T 打印树状文件。

# 如何创建.gitignore文件

为什么要创建`.gitignore`文件?

因为`.gitignore`可以排除提交时携带的不必要文件，比如Java中的.class文件。同时还可以排除其他不想提交或者提交没这个必要的文件等等。

创建步骤如下:

1.打开`git bash`

2.进入对应的目录，确保与`.git`在同一目录下

3.执行 `touch .gitignore`

4.编辑`.gitignore`文件 将提交需要排除的文件夹放入`.gitignore`文件中

# .gitignore文件不生效

```text
# 清除缓存文件
git rm -r --cached .
git add .
git commit -m ".gitignore重写缓存成功"
git push

```
**原理解读**
`.gitignore`文件只会在第一次提交项目的时候写入缓存，也就是说如果你第一次提交项目时候忘记写`.gitignore`文件，后来再补上是没有用的，`.gitignore`文件是不生效的。因为在缓存中已经标记该项目不存在`ignore`文件了（`boolean`）

所以我们使用`git rm -r --cached` .去清除所有的缓存。然后再次提交代码就可以了，这样`.gitignore`文件就会生效了。

# windows10下安装和配置nodejs环境

## 下载安装node.js

* 官方下载地址:下载最新LTS windows版本: 16.15.0 (includes npm 8.5.5)  [Node.js](https://nodejs.org/en/) ,如下图

* 安装可以更改安装路径(我的是默认地址`C:\Program Files\`这个地方有隐藏坑，晚点详说) 
 
* 其余的都是选择 下一步, 安装

 测试是否安装 成功

打开开始菜单中输入cmd，打开cmd命令窗口，分别输入如下命令

```text
node -v

npm -v

```
**查看npm全局安装的包**
`npm list -g --depth 0`
**卸载npm全局安装的包**
```text
# 例如要卸载 jshint 这个包
npm uninstall -g xxxx
```

## 配置环境变量

配置全局安装的模块路径和缓存路径（不一定是安装路径）
本文是在安装目录的`nodejs`文件夹下,创建 `node_global`
本文是在安装目录的`nodejs`文件夹下,创建 `node_cache`

路径的配置命令
```text
npm config set prefix "C:\Program Files\nodejs\node_global"
npm config set cache "C:\Program Files\nodejs\node_cache"
```

### 配置环境变量
进入 “我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”

选择 系统变量 创建 NODE_PATH 变量

变量名：`NODE_PATH`
变量值：`C:\Program Files\nodejs\node_modules`(安装的路径，`node_modules` 文件夹 安装后就会有的)
* 在 系统变量 中 选择 `Path` 添加如下属性：

* 把前半部分的 `nodejs` 路径换成自己的 `nodejs` 的路径

### 测试安装

全局安装最常用的 `express` 模块 进行测试
```text
npm install express -g
```

如果报错
[环境变量报错](/images/informal-essay.png)

有两种处理方法
* 方法一
则表示nodejs的安装目录无权限，根据错误日志的信息，定位到安装目录下，我的安装目录为C:\Program Files\nodejs鼠标右键找到属性->安全 ->编辑，如图：


[环境变量报错2](/images/informal-essay1.png)

点击确定，再次执行对应命令，解决问题。 

* 方法二  
修改缓存和全局的文件夹配置的位置

将node.js复制到一个盘里面，然后修改配置
路径的配置命令
```text
npm config set prefix "E:\ProgramFiles\nodejs\node_global"
npm config set cache "E:\ProgramFiles\nodejs\node_cache"
```

并且修改环境变量
[环境变量报错2](/images/informal-essay2.png)
[环境变量报错3](/images/informal-essay2.png)

# NPM镜像源查看和切换

全局切换镜像源：
`npm config set registry http://registry.npm.taobao.org`
查看镜像源使用状态：
`npm get registry`
全局切换官方镜像源：
`npm config set registry http://www.npmjs.org`


## 使用nrm查看和切换镜像

1. 首先通过npm安装nrm：

```text
npm install -g nrm
```

2. 通过nrm查看和切换镜像源（命令）：nrm ls
注意：下面的 * 表示当当前正在使用的源，
```text
* npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```
3. 如果想要使用某一个，直接use，比如我要使用淘宝镜像的源：
```text
nrm use taobao
```

# JavaScript中,{}+{}等于多少?

**JavaScript-wat**
在 `JavaScript` 中,加法的规则其实很简单,只有两种情况:你只能把数字和数字相加,或者字符串和字符串相加,所有其他类型的值都会被自动转换成这两种类型的值. 为了能够弄明白这种隐式转换是如何进行的,我们首先需要搞懂一些基础知识.注意:在下面的文章中提到某一章节的时候(比如§9.1),指的都是ECMA-262语言规范([ECMAScript 5.1](https://262.ecma-international.org/5.1/))中的章节.

让我们快速的复习一下.在JavaScript中,一共有两种类型的值:原始值(`primitives`)和对象值(`objects`).原始值有:`undefined`, `null`, `布尔值(booleans)`, `数字(numbers)`,还有`字符串(strings)`.其他的所有值都是对象类型的值,包括数组(`arrays`)和函数(`functions`).

## **类型转换**
加法运算符会触发三种类型转换:将值转换为原始值,转换为数字,转换为字符串,这刚好对应了`JavaScript引擎`内部的三种抽象操作:`ToPrimitive()`,`ToNumber()`,`ToString()`

1. * 通过`ToPrimitive()`将值转换为原始值
    
`JavaScript引擎`内部的抽象操作`ToPrimitive()`有着这样的签名:    `ToPrimitive(input, PreferredType?)`
可选参数 `PreferredType` 可以是 `Number` 或者 `String` ,它只代表了一个转换的偏好,转换结果不一定必须是这个参数所指的类型,但转换结果一定是一个原始值.如果 `PreferredType` 被标志为 `Number` ,则会进行下面的操作来转换输入的值 ([§9.1](https://262.ecma-international.org/5.1/#sec-9.1)):
    1. 如果输入的值已经是个原始值,则直接返回它.
    2. 否则,如果输入的值是一个对象.则调用该对象的`valueOf()`方法.如果`valueOf()`方法的返回值是一个原始值,则返回这个原始值.
    3. 否则,调用这个对象的 `toString()` 方法.如果`toString()`方法的返回值是一个原始值,则返回这个原始值.
    4. 否则,抛出 `TypeError` 异常.
    
如果`PreferredType`被标志为`String`,则转换操作的第二步和第三步的顺序会调换.如果没有`PreferredType`这个参数,则`PreferredType`的值会按照这样的规则来自动设置:`Date类型`的对象会被设置为`String`,其它类型的值会被设置为`Number`.

2. 通过`ToNumber()`将值转换为数字
下面的表格解释了ToNumber()是如何将原始值转换成数字的

|参数|结果|
| - | - |
|undefined |	NaN|
|null |	+0|
|布尔值 |	true被转换为1,false转换为+0|
|数字 |	无需转换|
|字符串 |	由字符串解析为数字.例如,"324"被转换为324|

如果输入的值是一个对象,则会首先会调用`ToPrimitive(obj, Number)`将该对象转换为原始值,然后在调用`ToNumber()`将这个原始值转换为数字.

3. 通过`ToString()`将值转换为字符串
下面的表格解释了`ToString()`是如何将原始值转换成字符串的
|参数 | 结果|
| - | - |
|undefined | "undefined"|
|null | "null"|
|布尔值 | "true"  或者 "false"|
|数字 | 数字作为字符串,比如. "1.765"|
|字符串 | 无需转换|
如果输入的值是一个对象,则会首先会调用`ToPrimitive(obj, String)`将该对象转换为原始值,然后再调用`ToString()`将这个原始值转换为字符串.

4. 实践一下
下面的对象可以让你看到引擎内部的转换过程.
```js
var obj = {
    valueOf: function () {
        console.log("valueOf");
        return {}; // 没有返回原始值
    },
    toString: function () {
        console.log("toString");
        return {}; // 没有返回原始值
    }
}
```
`Number`作为一个函数被调用(而不是作为构造函数调用)时,会在引擎内部调用`ToNumber()`操作:
```text
> Number(obj)
valueOf
toString
TypeError: Cannot convert object to primitive value 
```

## **加法**

有下面这样的一个加法操作.   `value1 + value2`
在计算这个表达式时,内部的操作步骤是这样的
1. 将两个操作数转换为原始值 (下面是数学表示法,不是JavaScript代码):
    ```
    prim1 := ToPrimitive(value1)
    prim2 := ToPrimitive(value2)
    ```
    `PreferredType` 被省略,因此`Date`类型的值采用`String`,其他类型的值采用Number.
2. 如果prim1或者prim2中的任意一个为字符串,则将另外一个也转换成字符串,然后返回两个字符串连接操作后的结果.
3. 否则,将prim1和prim2都转换为数字类型,返回他们的和.

**预料到的结果**
两个空数组相加时,结果是我们所预料的:
```text
> [] + []
''
```
[]会被转换成一个原始值,首先尝试valueOf()方法,返回数组本身(this):
```text
> var arr = [];
> arr.valueOf() === arr
true
```
这样的结果不是原始值,所以再调用`toString()`方法,返回一个空字符串(是一个原始值).因此,`[] + []`的结果实际上是两个空字符串的连接.
将一个空数组和一个空对象相加,结果也符合我们的预期:
```text
> [] + {}
'[object Object]'
```
类似的,空对象转换成字符串是这样的.
```text
> String({})
'[object Object]'
```
所以最终的结果是 "" 和 "[object Object]" 两个字符串的连接.

下面是更多的对象转换为原始值的例子,你能搞懂吗:
```text
> 5 + new Number(7)
12
> 6 + { valueOf: function () { return 2 } }
8
> "abc" + { toString: function () { return "def" } }
'abcdef'
```

**意想不到的结果**
如果加号前面的第一个操作数是个空对象字面量,则结果会出乎我们的意料(下面的代码在Firefox控制台中运行):
```text
>+ {}
NaN
```
这是怎么一回事?原因就是JavaScript引擎将第一个{}解释成了一个空的代码块并忽略了它.NaN其实是后面的表达式+{}计算的结果 (加号以及后面的{}).这里的加号并不是代表加法的二元运算符,而是一个一元运算符,作用是将它后面的操作数转换成数字,和Number()函数完全一样.例如:
```text
> +"3.65"
3.65
```
转换的步骤是这样的:
```text
+{}
Number({})
Number({}.toString())  // 因为{}.valueOf()不是原始值
Number("[object Object]")
NaN
```
为什么第一个{}会被解析成代码块呢?原因是,整个输入被解析成了一个语句,如果一个语句是以左大括号开始的,则这对大括号会被解析成一个代码块.所以,你也可以通过强制把输入解析成一个表达式来修复这样的计算结果:
```text
> ({} + {})
'[object Object][object Object]'
```
另外,一个函数或方法的参数也会被解析成一个表达式:
```text
> console.log({} + {})
[object Object][object Object]
```
经过前面的这一番讲解,对于下面这样的计算结果,你也应该不会感到吃惊了:
```text
> {} + []
0
```
在解释一次,上面的输入被解析成了一个代码块后跟一个表达式+[].转换的步骤是这样的:
```text
+[]
Number([])
Number([].toString())  // 因为[].valueOf()不是原始值
Number("")
0
```
有趣的是,`Node.js`的[REPL](http://ww1.cnodejs.net/)在解析类似的输入时,与Firefox和Chrome(和Node.js一样使用V8引擎)的解析结果不同.下面的输入会被解析成一个表达式,结果更符合我们的预料:
```text
> {} + {}
'[object Object][object Object]'
> {} + []
'[object Object]'
```
下面是 `SpiderMonkey` 和 `nodejs` 中的结果对比.

## 其他
在大多数情况下,想要弄明白JavaScript中的+号是如何工作的并不难:你只能将数字和数字相加或者字符串和字符串相加.对象值会被转换成原始值后再进行计算.如果你想连接多个数组,需要使用数组的 `concat` 方法:
```text
> [1, 2].concat([3, 4])
[ 1, 2, 3, 4 ]
```
`JavaScript`中没有内置的方法来“连接" (合并)多个对象.你可以使用一个`JavaScript`库,比如 [Underscore](http://underscorejs.org/):
```text
> var o1 = {eeny:1, meeny:2};
> var o2 = {miny:3, moe: 4};
> _.extend(o1, o2)
{ eeny: 1,
  meeny: 2,
  miny: 3,
  moe: 4 }
```
注意:和`Array.prototype.concat()`方法不同,`extend()`方法会修改它的第一个参数,而不是返回合并后的对象:
```text
> o1
{ eeny: 1,
  meeny: 2,
  miny: 3,
  moe: 4 }
> o2
{ miny: 3, moe: 4 }
```
如果你想了解更多有趣的关于运算符的知识,你可以阅读一下[“Fake operator overloading in JavaScript”](https://2ality.com/2011/12/fake-operator-overloading.html)(已墙).

## 参考
[JavaScript values: not everything is an object](https://2ality.com/2011/03/javascript-values-not-everything-is.html)

# js中的双问号和“?.“的含义和使用
？？ 表示：只有左侧的值为null或undefined的时候才使用右侧的值。

？. 表示：可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每           个引用是否有效。操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(null 或者           undefined) 的情况下不会引起错误，该表达式短路返回值

？.的个人理解 打个比方就是判断对象的某个属性是否存在，如果存在那么就返回整个属性的值，否则返回undefined
```js
const obj = {
      name: 'ceshi',
      detail: {
        cat: 'huahua'
      }
    }
    const name = obj.dog ?. name;
    console.log(name) // undefined
    // 两者的结合使用
     const cat = obj.detail ?. cat ?? 'default name'
        console.log(cat) // huahua
```
