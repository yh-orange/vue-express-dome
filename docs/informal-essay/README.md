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


