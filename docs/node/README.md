## node的一些应用模块的介绍

## websocket 

* **为什么需要websocket**
因为 `HTTP` 协议有一个缺陷：通信只能先由客户端发起，然后服务器再作出响应，并不能由服务器主动向客户端推送消息。`HTTP` 是半双工协议
`WebSocket` 协议最大的特点是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。`WebSocket` 全双工通讯的网络技术

* **双向通信**

目前实现双向通信的方式有：轮询、长轮询、iframe、Websocket

    1.  轮询
    客户端和服务器之间会一直进行连接，每隔一段时间客户就会主动发送请求给服务器端询问一次。这种方式连接数会很多，而且每次发送请求都会有Http的Header头，会很耗流量。

```js
//服务端
let express = require('express');
let app = express();
app.use(express.static('www'));
app.get('/', (req,res) => {
    res.send(Date.now());
});
app.listen(3000);
```
```html
<!--客户端-->
<div id="root"></div>
<script>
setInterval(function () {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.querySelector('#root').innerHTML = xhr.responseText;
		}
	}
	xhr.send();
}, 1000);
```
    2. 长轮询（服务器推荐）
    长轮询是对轮询的改进版，客户端发送HTTP给服务器之后，看有没有新消息，如果没有新消息，就一直等待,当有新消息的时候，才会返回给客户端。在某种程度上减小了网络带宽问题。
    
```js
//服务器
let express = require('express');
let app = express();
app.use(express.static('www'));
app.get('/', (req, res) => {
  let timer = setInterval(() => {
    let seconds = new Date().getSeconds()
    if (seconds == 50) {
      res.send(Date.now())
      clearInterval(timer)
    }
  }, 1000)
})
app.listen(3000);
```

```html
<!--客户端-->
<div id="root"></div>
<script>
	(function send() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:3000', true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.querySelector('#root').innerHTML = xhr.responseText;
				send();
			}
		}
		xhr.send();
	})();
</script>
```
    3. **iframe**
    通过在HTML页面里嵌入一个隐藏的iframe,然后将这个iframe的src属性设为对一个长连接的请求,服务器端就能源源不断地往客户推送数据。

```js
//服务器
const express = require('express');
const app = express();
app.use(express.static('www'));
app.get('/',  (req, res) => {
	setInterval( () => {
		res.write(`
			<script type="text/javascript">
			parent.document.getElementById('root').innerHTML = "${Date.now()}";
			</script>
			`);
	}, 1000);
});
app.listen(3000);
```

```html
<!--客户端-->
<div id="root"></div>
<iframe src="/" style=" display:none" />
```

    4. **EventSource**
    EventSource 是服务器推送的一个网络事件接口。一个EventSource实例会对HTTP服务开启一个持久化的连接，以text/event-stream 格式发送事件, 会一直保持开启直到被要求关闭。
    与 WebSockets,不同的是，服务端推送是单向的。

```js
//服务器
/*服务器返回一定要按照必须的格式
//头信息
res.setHeader("content-type","text/event-stream")
//响应信息
res.send("event:类型\ndata:数据\n\n")*/
//----------------------
app.get('/ajax', (req, res) => {
  res.setHeader("content-type", "text/event-stream")
  setInterval(() => {
    let dt = Date.now()
    if (new Date().getSeconds() % 2 == 0) {
      res.write("event:message\ndata:" + dt + "\n\n")
    }
  }, 1000);
})
```

```html
//客户端
const es = new EventSource(url);
//接受服务器发送过来的数据
es.onmessage = ev=> ev.data
```
    5. **websocket**
    HTML5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议，它基于TCP传输协议，并复用HTTP的握手通道。
    websocket 优势在于，支持双向通信，实时性更强。较少的控制开销。连接创建后，客户端、服务端进行数据交换时，协议控制的数据包头部较小。
>安装：npm i -S ws
```js
# 服务器
const express = require('express')
const http = require('http')
const Ws = require('ws').Server
const app = express()
const server = http.createServer(app)
server.listen(3000)
app.use(express.static('www'))

let wsServer = new Ws({ server })
wsServer.on('connection', socket => {
  console.log('连接成功');
  // 监听客户端发过来的消息
  socket.on('message', msg => {
    console.log('客户端发送过来的消息：' + msg);
    // 服务器给客户端发送消息
    socket.send('服务器说：你好客户端')
  })
});
```
```html
<!--客户端-->
<script>
let ws = new WebSocket('ws://127.0.0.1:3000')
ws.onopen = () => {
  ws.send('hello server')
};
ws.onmessage = ev => {
  console.log(ev.data)
}
</script>
```
    6. **socket.io**
    Socket.IO是一个WebSocket库，包括了客户端的js和服务器端的nodejs，它会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化，而且支持的浏览器最低达IE5.5。
>安装：npm i -S socket.io

```js
//服务端
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
server.listen(3000)
app.use(express.static('www'))

// 监听客户端的连接事件
io.on('connection', socket => {
  socket.on('message', msg => {
    console.log('接受到客户端发过来的消息：' + msg);
    socket.send('服务器说：' + msg)
  })
})
```

```html
<!--客户端-->
<script src="/socket/socket.io.js"></script>
<script>
let socket = io.connect('http://localhost:3000/')
socket.on('connect', () => {
  console.log('连接成功')
  socket.emit('message','hello')
});

socket.on('message', msg => {
  console.log(msg)
});

// 断开连接
socket.on('disconnect', () => {
  console.log('断开连接')
});
</script>

// 全局广播
io.emit('message','全局广播');
// 向除了自己外的所有人广播
socket.broadcast.emit('message', msg);
```
    7. **nodejs-websocket**
***
> nodejs-websocket [文档地址](https://www.npmjs.com/package/nodejs-websocket)

```js
// step1
// npm install nodejs-websocket --save

// step2
const ws = require("nodejs-websocket");
const AllUserData = new Array();
// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        console.log("Received "+str)
        AllUserData.push({
            'id':str,
            'ws':conn
        })
        conn.sendText(str.toUpperCase()+"!!!")
    })

    conn.on('connect', function(code) {
      console.log('开启连接', code)
    })

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        // 当用户退出的时候捕捉到退出的用户
        for (var i=0 in AllUserData) {
            if (AllUserData[i].ws == conn) {
                console.log(AllUserData[i])
            }
        }
    })
    
    conn.on('error', function(code) {
      console.log('异常关闭', code)
    })
}).listen(8001)
```

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
    <div id="btn">send</div>
    <script>
        // step3 frontend
        const socket = new WebSocket("ws://127.0.0.1:8001/text");
        socket.onopen = function() {
            console.log('WebSocket open'); //成功连接上Websocket
        };
        socket.onmessage = function(e) {
            console.log('message: ' + e.data); //打印出服务端返回过来的数据
        };
        socket.onerror = function(e) {
            console.log('error: ' + e); //打印出服务端返回过来的数据
        };
        // Call onopen directly if socket is already open
        if (socket.readyState == WebSocket.OPEN) socket.onopen();
        window.mySocket = socket;


        document.getElementById("btn").addEventListener('click', function() {
            socket.send('hhh send')
        });
    </script>
</body>

</html>
```

## 使用Koa上传图片到七牛云

```js
const path = require('path');
const os = require('os');
const fs = require('fs');
const moment = require('moment');

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
};

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
};

/**
 * 上传文件到本地
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile(ctx,filename) {
  let req = ctx.req
  let res = ctx.res
  
  //请求体格式不对 直接返回
  if (!/multipart\/form-data/i.test(req.headers['content-type'])) {
    return
  }
  let busboy = new Busboy({headers: req.headers})
  let fileType = filename || 'upload';
  //创建路径
  let filePath = path.join(
    __dirname,
    '../static',
    fileType,
    UtilDatetime.parseStampToFormat(null, 'YYYY/MM/DD')
  )
  let mkdirResult = mkdirsSync(filePath)
  
  return new Promise((resolve, reject) => {
    console.log('正在准备上传文件...')
    let result = {
      code: -1,
      success: false,
      message: '',
      data: null,
    }
    // 解析请求文件事件
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log('文件上传中...')
      let fileName = moment().format('YYYYMMDDHHmmSS') + Math.random().toString(16).substr(8) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function () {
        result.code = 1;
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `http://${ctx.host}/upload/${fileName}`,
          uploadTime:UtilDatetime.parseStampToFormat(null, 'YYYY-MM-DD')
        }
        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', function () {
      console.log('文件上传结束')
      result.message = "文件上传结束"
      resolve(result)
    })


    // 解析错误事件
    busboy.on('error', function (err) {
      console.log('文件上出错')
      reject(result)
    })
    //将流链接到busboy对象
    req.pipe(busboy);
  })
};

/**
 * 上传文件到七牛云存储 2018-07-13
 * @param  {object}  文件信息
 * @return {object}  上传结果
 */
function uploadToQiNiu(filePath, key) {
    const accessKey = qiniuConfig.accessKey // 你的七牛的accessKey 
    const secretKey = qiniuConfig.secretKey // 你的七牛的secretKey 
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
        scope: qiniuConfig.scope // 你的七牛存储对象 
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    const config = new qiniu.conf.Config()

    // 空间对应的机房 
    config.zone = qiniu.zone.Zone_z2
    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    console.log('正在上传到七牛云...')
    // 文件上传 
    return new Promise((resolved, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr)
            }
            if (respInfo && respInfo.statusCode == 200) {
                resolved(respBody)
                console.log('七牛云上传成功')
            }
        })
    })
};


module.exports = {
  uploadFile,
  uploadToQiNiu
};
```

实际使用的时候，前端上传类型需要是`form-data`。

```js
app.use(route.post('/upload', async function(ctx, next) {
 const serverPath = path.join(__dirname, './uploads/')
 // 获取上存图片
 const result = await uploadFile(ctx, {
  fileType: 'album',
  path: serverPath
 })
 const imgPath = path.join(serverPath, result.imgPath)
 // 上传到七牛
 const qiniu = await uploadToQiNiu(imgPath, result.imgKey)
 // 上存到七牛之后 删除原来的缓存图片
 removeTemImage(imgPath)
 ctx.body = {
  imgUrl: `http://xxxxx(你的外链或者解析后七牛的路径)/${qiniu.key}`
 }
}));
```

## Node定时任务的使用

在实际项目开发过程中，会遇到很多定时任务的工作。比如：定时导出某些数据、定时发送消息或邮件给用户、定时重置用户的某些任务等等。
`node`中也有很多用来执行定时任务的插件.

### node-schedule

```js
// npm install node-schedule

var schedule = require('node-schedule');

function scheduleCronstyle(){
    schedule.scheduleJob('30 * * * * *',function(){
        console.log('scheduleCronstyle:'+new Date());
    });
}

scheduleCronstyle();
// 取消定时任务
schedule.cancel();
```

```js
/** 
 *  通配符解释
    * *  *  *  *  *  *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │  |
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

    6个占位符从左到右分别代表：秒、分、时、日、月、周几

　　 '*'表示通配符，匹配任意，当秒是'*'时，表示任意秒数都触发，其它类推

    每分钟的第30秒触发： '30 * * * * *'

    每小时的1分30秒触发 ：'30 1 * * * *'

    每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

    每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

    2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

    每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 * 
*/
```

### 递归规则定时器

```js
var schedule = require('node-schedule');

function scheduleRecurrenceRule(){
    var rule = new schedule.RecurrenceRule();
    /**
     * rule = {
     *   dayOfWeek,
     *   month,
     *   dayOfMonth,
     *   hour
     *   minute,
     *   second
     * }
     **/
    schedule.scheduleJob(rule, function(){
        console.log('scheduleRecurrenceRule:' + new Date());
    });
}

scheduleRecurrenceRule();
```

### 对象文本语法定时器

```js
var schedule = require('node-schedule');

function scheduleObjectLiteralSyntax(){
    /*
     * dayOfWeek
     * month
     * dayOfMonth
     * hour
     * minute
     * second
     * /
    
    schedule.scheduleJob({hour: 16, minute: 11, dayOfWeek: 1}, function(){
        console.log('scheduleObjectLiteralSyntax:' + new Date());
    });
}

scheduleObjectLiteralSyntax();
```

## Koa2中间件实现原理解析

本文主要是针对koa2内部分中间件实现原理的剖析。先来看官方的一段代码:

```js
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

// 执行顺序 类似栈先进后出
// start--->Hello World--->X-Response-Time--->console.log(`${ctx.method} ${ctx.url} - ${rt}`);
```

### 实现 app.use
***

`app.use` ，从使用角度分析它的用意，其实就是注册中间件函数。因此，首先可以这样定义我们自己的 `Koa` 代码，新建一个 `koa.js` ，开始编写：
```js
class Koa {
    constructor() {
        this.middlewareList = []
    }

    // 核心方法
    use(fn) {
        this.middlewareList.push(fn)
        return this;
    }
}
```

* 首先定一个类，然后构造函数中初始化 `middelwareList` 数组，用以存储所有的中间件函数。

* `use`中接收中间件函数，然后放到 `middelwareList` 数组中，就算是注册完成。

* 最后 `return this` 是为了能实现链式操作，例如 `app.use(fn1).use(fn2).use(fn3)`。（这个和`jquery`中的链式实现思想是一致的。）

### 实现 app.listen
***

`app.listen(3000)` 启动服务监听，实质就是使用 `nodejs` 原生的 `http` 处理方式。代码如下：

```js
const http = require('http');

class Koa {
    constructor() {
        this.middlewareList = []
    }

    // 核心方法
    use(fn) {
        this.middlewareList.push(fn)
        return this
    }

	// 将 req res 组合成为 ctx
    createContext(req, res) {
        // 简单模拟 koa 的 ctx
        const ctx = {
            req,
            res,
            //...其他属性
        }
        return ctx
    }

	// 生成 http.createServer 需要的回调函数
	callback() {
        return (req, res) => {
            const ctx = this.createContext(req, res)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args);
    }
}
```

* `node.js` 原生的 `http.createServer` 需要传入一个回调函数，在 `callback()` 中返回。

* 示例代码中中间件函数的第一个参数都是 `ctx` ，其实可以简答理解为 `res` 和 `req` 的集合，通过 `createContext` 合并一下即可。

### compose 组合中间件
***

`Koa2` 中通过一个 `compose` 函数来组合中间件，以及实现了 `next` 机制。

```js
// 传入中间件列表
function compose(middlewareList) {
	// 返回一个函数，接收 ctx （即 res 和 req 的组合）和 next —— 记住了，下文要用
    return function (ctx, next) {
	    // 定义一个派发器，这里面就实现了 next 机制
        function dispatch(i) {
	        // 获取当前中间件
            const fn = middlewareList[i];
            try {
                return Promise.resolve(
	                // 通过 i + 1 获取下一个中间件，传递给 next 参数
                    fn(ctx, function next(){
                        return dispatch.bind(null, i + 1);
                    })
                )
            } catch (err) {
                return Promise.reject(err);
            }
        }
        // 开始派发第一个中间件
        return dispatch(0);
    }
}
```

* 第一，定义 `compose` 函数，并接收中间件列表。

* 第二，`compose` 函数中返回一个函数，该函数接收 `ctx` ，下文会用这个返回的函数。

* 第三，再往内部，定义了一个 `dispatch函数`，就是一个中间件的派发器，参数 i 就代表派发第几个中间件。执行 `dispatch(0)` 就是开发派发第一个中间件。

* 第四，派发器内部，通过 i 获取当前的中间件，然后执行。执行时传入的第一个参数是 ctx ，第二个参数是 dispatch.bind(null, i + 1) 即下一个中间件函数 —— 也正好对应到示例代码中中间件的 next 参数。

用 Promise.resolve 封装起来，是为了保证函数执行的结果必须是 Promise 类型。

### 完善 callbaclk
***

有了 `compose` 之后，`callback` 即可被完善起来,部分代码如下:
```js
// 处理中间件的 http 请求
handleRequest(ctx, middleWare) {
    // 这个 middleWare 就是 compose 函数返回的 fn
    // 执行 middleWare(ctx) 其实就是执行中间件函数，然后再用 Promise.resolve 封装并返回
    return middleWare(ctx)
}
  
callback() {
    const fn = compose(this.middlewareList)

    return (req, res) => {
        const ctx = this.createContext(req, res)
        return this.handleRequest(ctx, fn)
    }
}
```

### 完整代码
***

```js
const http = require('http');

// 组合中间件
function compose(middlewareList) {
    return function (ctx, next) {
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, function next(){
                        return dispatch.bind(null, i + 1);
                    })
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class Koa {
    constructor() {
        this.middlewareList = []
    }

    // 核心方法
    use(fn) {
        this.middlewareList.push(fn)
        return this
    }

    // 处理中间件的 http 请求
    handleRequest(ctx, middleWare) {
        // 这个 middleWare 就是 compose 函数返回的 fn
        // 执行 middleWare(ctx) 其实就是执行中间件函数，然后再用 Promise.resolve 封装并返回
        return middleWare(ctx)
    }

    // 将 req res 组合成为 ctx
    createContext(req, res) {
        // 简单模拟 koa 的 ctx ，不管细节了
        const ctx = {
            req,
            res
        }
        return ctx
    }

    callback() {
        const fn = compose(this.middlewareList)

        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args);
    }
}

module.exports = Koa;
```

## koa2中集成jwt认证

### 定义
***
>json web token 简称JWT，是基于JSON的一种开放标准。服务器和客户端可以通过JWT来建立一座通信的桥梁。

`JWT`主要分为三部分。`header(头部)`，`payload(载体)`， `signature(签名)`。

* `header: 头部`: 声明加密方式和声明类型

* `payload: 载体`: 存放JWT定义的一些声明（例如：过期时间，签发者等等），我们将用户的一些信息存放在这里（例如：用户名，用户ID等，千万不要存在用户密码等敏感信息）

* `signature: 签名`:

```text
signature = [header(加密方式)](base64编码(header) + '.' + base64编码(payload), [服务器的私钥])
```

最后将上面三个组成部分用'.'连接起来就构成了`JWT`：

```text
JWT = base64编码(header) + '.' + base64编码(payload) + '.' + signature
```

### 实现jwt认证
***

本示例是基于koa2实现的，默认你已安装koa2相关包。

1. 下载node-jsonwebtoken
```text
npm i jsonwebtoken  // 一个实现jwt的包
```
2. 下载koa/jwt
```text
npm i koa-jwt  //验证jwt的koa中间价
```
3. 修改app.js
```js
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwt demo'
const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(jwtKoa({secret}).unless({
    path: [/^\/api\/login/], // 数组中的路径不需要通过jwt验证
    path: [/^\/api\/register/],
}))

router
    .post('/api/login', async (ctx, next) => {
        const user = ctx.request.body
        if(user?.name) {
            let userToken = {
                name: user.name
            }
            const token = jwt.sign(userToken, secret, {expiresIn: '2h'})  // token签名 有效期为2小时
            ctx.body = {
                message: '获取token成功',
                code: 1,
                token
            }
        } else {
            ctx.body = {
                message: '参数错误',
                code: -1
            }
        }
    })
    .get('/api/userInfo', async (ctx) => {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
            ctx.body = {
                payload
            }
        } else {
            ctx.body = {
                message: 'token 错误',
                code: -1
            }
        }
    })
app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('app listening 3000...')
})
```

## async模块简介以及在mysql中的应用

### 定义
***
>async模块是node中的异步流程控制模块
 
### 安装
***
```text
npm install async
```
### 使用
***
`async`模块有几个常用的`api`。

1. series(tasks,[callback])
>多个函数从上到下依次执行,相互之间没有数据交互.

```js
const task1 = callback => {
	console.log("task1");
	callback(null,"task1");
}

const task2 = callback => {
	console.log("task2");
	callback(null,"task2");
}
    
const task3 = callback => {
	console.log("task3");
	callback(null,"task3");
}

async.series([task1,task2,task3],function(err, result){
	console.log("series");
	if (err) {
		console.log(err);
	}
	console.log(result);
})
/**
 * 1. task1
 * 2. task2
 * 3. task3
 * 4. series
 * 5. [ 'task1', 'task2', 'task3' ]
```
如果中途发生错误,则将错误传递到回调函数,并停止执行后面的函数

```js
// 修改 task2
const task2 = callback => {
	console.log("task2");
	callback(err,"task2");
}

/**
 * 1. task1
 * 2. task2
 * 3. series
 * 4. err
 * 5. [ 'task1', 'task2']
**/
```

2. `parallel(tasks,[callback])`

>多个函数并行执行,不会等待其他函数,最终把结果存在一个数据中去的，是有先后顺序的

```js
const task1 = callback => {
    console.log("task1", new Date().getTime());
    callback(null,"task1");
}
    
const task2 = callback => {
    console.log("task2", new Date().getTime());
    callback(null, "task2")
}
        
const task3 = callback => {
    console.log("task3", new Date().getTime());
    callback(null,"task3");
}
    
async.parallel([task1,task2,task3],function(err, result){
    console.log("parallel");
    if (err) {
        console.log(err);
    }
    console.log(result);
})

/**
 * 1. task1 1587045158058
 * 2. task2 1587045158060
 * 3. task3 1587045158060
 * 4. parallel
 * 5. [ 'task1', 'task2', 'task3' ]
**/
```

3. `waterfall(tasks,[callback]) :瀑布流`

>依次执行,前一个函数的输出为后一个函数的输入

```js
const task1 = callback => {
    console.log("task1", new Date().getTime());
    callback(null,"task1");
}
    
const task2 = (input, callback) => {
    console.log(input, "task2", new Date().getTime());
    callback(null, "task2")
}
        
const task3 = (input, callback) => {
    console.log(input, "task3", new Date().getTime());
    callback(null,"task3");
}
    
async.waterfall([task1,task2,task3],function(err, result){
    console.log("waterfall");
    if (err) {
        console.log(err);
    }
    console.log(result);
})
/**
 * 1. task1 1587045497048
 * 2. task1 task2 1587045497050
 * 2. task2 task3 1587045497050
 * 3. waterfall
 * 4. task3
**/
```

4. `parallelLimit(tasks,limit,[callback])`

>和`parallel`类似,只是`limit`参数限制了同时并发执行的个数,不再是无限并发

```js
const task1 = callback => {
  console.log("task1", new Date().getTime());
  setTimeout(()=>callback(null, "task1"), 1000);
}

const task2 = callback => {
  console.log("task2", new Date().getTime());
  setTimeout(()=>callback(null, "task2"), 2000);
}

const task3 = callback => {
  console.log("task3", new Date().getTime());
  setTimeout(()=>callback(null, "task3"), 3000);
}

console.time("parallelLimit执行");

async.parallelLimit([task1, task2, task3], 2, function (err, result) {
  console.log("parallelLimit");
  if (err) {
    console.log(err);
  }
  console.log(result);
  console.timeEnd("parallelLimit执行");
})
/**
 * 1. task1 1587045939489
 * 2. task2 1587045939491
 * 3. task3 1587045940491
 * 4. parallelLimit执行
 * 5. [ 'task1', 'task2', 'task3' ]
 * 6. parallelLimit执行: 4.015s
 **/
```

上面三个函数分别延迟1s、2s、3s执行，总共执行结果为4.015s。

我们设置了并行数量为2,首先执行函数1和2。

1s后函数1和2执行完成,这时函数3开始执行。

3s后函数3执行完毕，总共耗时4.015s。

5. `compose(fn1,fn2,fn3...)`

> 这个类似中间件，创建一个异步的集合函数,执行的顺序是倒序.前一个fn的输出是后一个fn的输入.有数据交互

```js
const task1 = (m, callback) => {
  console.log("task1", m);
  callback(null, m*2);
}

const task2 = (m, callback) => {
  console.log("task2", m);
  callback(null, m*3);
}

const task3 = (m, callback) => {
  console.log("task3", m);
  callback(null, m*4);
}

const _fn = async.compose(task3, task2, task1);

_fn(2, function (err, result) {
  console.log("compose");
  if (err) {
    console.log(err);
  }
  console.log(result);
})

/**
 * 1. task1 2
 * 2. task2 4
 * 3. task3 12
 * 4. compose
 * 5. 48
 **/
```

### 在mysql事务中使用
***

```js
// mysql.js
var db    = {};
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123456',
    database        : 'demo'
})

//获取连接
db.getConnection = function(callback){
	pool.getConnection(function(err, connection) {
		if (err) {
			callback(null);
			return;
		}
		callback(connection);
	});
} 
module.exports = db;
```
在model中使用
```js
var db = require('./mysql.js');
var async = require('async');

// 事务执行
db.getConnection(function(connection){
  connection.beginTransaction(function(err) {
    if (err) { 
      console.log(err);
      return;
    }

    var task1 = function(callback){
      connection.query(`insert into user (name) values('a')`, function(err, result) {
        if (err) {
          console.log(err);
          callback(err,null);
          return;
        }
        console.log('第一次插入成功!');
        callback(null,result);
      })
    }

    var task2 = function(callback){
      connection.query(`insert into user (name) values('b')`, function(err, result) {
        if (err) {
          console.log(err);
          callback(err,null);
          return;
        }
        console.log('第二次插入成功!');
        callback(null,result);
      })
    }

    var task3 = function(callback){
      connection.query(`insert into user (name) values('c')`, function(err, result) {
        if (err) {
          console.log(err);
          callback(err,null);
          return;
        }
        console.log('第三次插入成功!');
        callback(null,result);
      })
    }

    async.series([task1, task2, task3],function(err,result){
      if (err) {
        console.log(err);
        //回滚
        connection.rollback(function() {
          console.log('出现错误,回滚!');
          //释放资源
          connection.release();
        });
        return;
      }
      //提交
      connection.commit(function(err) {
        if (err) {
          console.log(err);
          return;
        }
          
        console.log('成功,提交!');
        //释放资源
        connection.release();
      });
    })
  });
});
```
:::tip TIP

在使用 `async` 处理事务的时候经常用到的是 `series` 和 `waterfall` 两种模式。
:::

## 异步调用python脚本

`node.js`提供了`child_process`用于调用外部程序.
```js
child_process.exec(command[, options][, callback])
```

## Egg.js入门到精通

### 基础知识
***

>`Egg.js`是由`koa`扩展而来的,添加了多进程的支持,并且参考了 `Ruby On Rails` 的设计哲学,已约定优先的配置。

* `app/router.js`: 路由映射配置;
* `app/controller`: 存放控制器的目录,用来处理跳转相关的逻辑;
* `app/service`: 用来存放业务逻辑;
* app/middleware: 存放中间件的目录;
* app/public: 存放静态文件的目录;
* app/extends: 扩展框架目录,比如在ctx上添加一些变量方法等;
* config: 配置目录、中间件的配置项、环境配置变量等;
* test: 测试文件目录;
* app.js: 可以在该文件内添加启动钩子;

### 实现egg-core
***

`Egg.js` 能够保持这些约定，得益于`egg-core`中的各种`loader`，比如`context_loader`、`file_loader`

1. **初始化项目**
```text
mkdir egg-core && cd egg-core && npm init -y
```

2. 安装依赖
```text
npm i koa globby
```
    * egg.js
```js
const {
    resolve,
    join,
    parse
} = require('path');
const globby = require('globby');

module.exports = app => {
    const AppPath = resolve(__dirname, 'app');
    const context = app["context"];

    const fileAbsolutePath = {
        config: join(AppPath, 'config'),
        middleware: join(AppPath, 'middleware'),
        service: join(AppPath, 'service')
    };

    Object.keys(fileAbsolutePath).forEach(v => {
        const path = fileAbsolutePath[v];
        const prop = v;
        const files = globby.sync('**/*.js', {
            cwd: path
        });
        if (prop !== 'middleware') {
            context[prop] = {};
        }


        files.forEach(file => {
            const fileName = parse(file).name;
            const content = require(join(path, file));
            // middleware处理
            if (prop === 'middleware') {
                if (fileName in context['config']) {
                    const plugin = content(context['config'][fileName]);
                    app.use(plugin);
                }
                return;
            }
            // 配置文件处理
            if (prop === 'config' && content) {
                context[prop] = Object.assign({}, context[prop], content);
                return;
            }
            // 挂载service
            context[prop][fileName] = content;
        });
    });
}
```
    * index.js
```js
const Koa = require('koa');
const init = require('./egg');

const app = new Koa();

init(app);

app.use(async (ctx, next) => {
    console.log(ctx.service);
    console.log(ctx.config);
    ctx.type = 'application/json';
    ctx.body = ctx.service.user.getUser();
});

app.listen(4000);
```

**app**
* config
* middleware
* service

### 使用egg-init
***

1. **安装egg-init**
    `npm i egg-init -g`
2. **初始化项目**
    `egg-init my-first-egg-project --type=simple`
3. 安装并运行
```text
cd my-first-egg-proje && npm install
npm run dev
```

### egg-init的原理
***
模板类的脚手架的原理就是从网络或者本地下载模板，然后进行模板变量替换，替换完成后放在用户想要的位置就可已了。这个用户想要的位置可以通过命令行来指定，所以通常还是需要一个命令行解析工具。

官方的`egg-init`复制文件与模板替换功能是通过`mem-fs`、`mem-fs-editor`来实现内存中的复制和修改的，而命令行解析是通过`yargs`来实现的。

## 爬虫利器 `Puppeteer` 实战

>Puppeteer是一个Node.js库,用于操控浏览器的爬虫神器，支持调用 Chrome 的 API 来操纵 Web，相比较Selenium或是PhantomJs,它最大的特点就是它的操作 Dom 可以完全在内存中进行模拟既在 V8 引擎中处理而不打开浏览器。
 
### 使用场景
***

* 对网页截屏生成 PDF、图片等
* 爬取 SPA 应用，并生成预渲染内容（即“SSR” 服务端渲染）
* 可以从网站抓取内容
* 自动化表单提交、UI 测试、键盘输入等
* 帮你创建一个最新的自动化测试环境（chrome），可以直接在此运行测试用例
* 捕获站点的时间线，以便追踪你的网站，帮助分析网站性能问题
* 测试 Chrome 的扩展程序

### 安装
***
```js
npm i puppeteer
# yarn add puppeteer
```

:::tip TIP

由于封网，直接下载 Chromium 可能会失败，可以先阻止下载 Chromium 然后再手动下载它.

而且Node.js 的版本不能低于 v7.6.0，因为需要支持 async、await语法。
```text
# 安装命令
npm i puppeteer --save

# 错误信息
ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.

# 设置环境变量跳过下载 Chromium
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1

# 或者可以这样干，只下载模块而不build
npm i --save puppeteer --ignore-scripts

# 成功安装模块
+ puppeteer@5.2.1
added 1 package in 1.77s
```
:::

手动下载 `Chromium`，下载完后将压缩包解压，会有个 `Chromium.app`，将其放在自定义路径下，正常安装包后 `Chromium.app` 会在 `.local-chromium`中。

* **场景一：使用 Puppeteer进行屏幕截图**
***
    相关知识点:
    
    * `puppeteer.launch` 启动浏览器实例
    * `browser.newPage()` 创建一个新页面
    * `page.goto` 进入指定网页
    * `page.screenshot` 进行截图
    * `browser.close()` 关闭 `Chromium` 及其所有页面
```js
const puppeteer = require("puppeteer");
const path = require('path');
console.log(path.resolve(__dirname, 'local-chromium'));
console.log(puppeteer.executablePath());
(async() => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        // executablePath: puppeteer.executablePath(),
        //设置超时时间，若此值为0，则禁用超时
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 是否运行浏览器无头模式(boolean) 关闭headless模式, 不会打开浏览器
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com");
    await page.screenshot({
        path: "baidu.png",
        type: "png",
        // quality: 100, 只对jpg有效
        fullPage: true,
        // 指定区域截图，clip和fullPage两者只能设置一个
        // clip: {
        //     x: 0,
        //     y: 0,
        //     width: 1000,
        //     height: 40
        // }
    });
    await browser.close();
})();
```
执行完以上代码，我们就可以在当前路径找到一张 `baidu.png`.

* **场景二：自动测试页面性能**
***

`Web Performance` 接口允许页面中的 `JavaScript` 代码可以通过具体的函数测量当前网页页面或者 `Web` 应用的性能。为能在页面执行 `JavaScript` 从而来检测页面性能。

相关知识点:

    * `page.evaluate(pageFunction[, ...args])` 在浏览器中执行此函数，返回一个 `Promise` 对象。

```js
const puppeteer = require("puppeteer");

// 检测页面url
const url = "https://www.baidu.com";
// 检测次数
const times = 5;
const record = [];

(async () => {
  for (let i = 0; i < times; i++) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    // 等待保证页面加载完成
    await page.waitFor(5000);

    // 获取页面的 window.performance 属性
    const timing = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    record.push(calculate(timing));
    await browser.close();
  }

  let whiteScreenTime = 0,
    requestTime = 0;

  for (let item of record) {
    whiteScreenTime += item.whiteScreenTime;
    requestTime += item.requestTime;
  }

  // 检测计算结果
  const result = [];
  result.push(url);
  result.push(`页面平均白屏时间为：${whiteScreenTime / times} ms`);
  result.push(`页面平均请求时间为：${requestTime / times} ms`);
  console.log(result);

  function calculate(timing) {
    const result = {};
    // 白屏时间
    result.whiteScreenTime = timing.responseStart - timing.navigationStart;
    // 请求时间
    result.requestTime = timing.responseEnd - timing.responseStart;
    return result;
  }
})();
```

* **场景三：搞定滑动解锁**
***

许多网站中都存在着滑动验证码认证,我们可以使用Puppeteer进行模拟。

相关知识点:

    * `CanvasRenderingContext2D.getImageData()` 返回一个 `ImageData` 对象，用来描述 `canvas` 区域隐含的像素数据
    
    * `page.\$(selector)` 此方法在页面内执行 `document.querySelector`
    
    * `page.mouse.down([options])` 触发一个 `mousedown` 事件
    
    * `page.mouse.move([options])` 触发一个 `mousemove` 事件
    
    * `page.mouse.up([options])` 触发一个 `mouseup` 事件

```js
const puppeteer = require('puppeteer');

(asyncfunction run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 600
    }
  });
  page = await browser.newPage();
  // 1.打开 bilibili 登录页面
  await page.goto('https://passport.bilibili.com/login');
  await page.waitFor(3000);

  // 3.输入账号密码
  await page.type('input#login-username','你的账号', { delay: 50 });
  await page.type('input#login-passwd','你的密码', { delay: 50 });

  // 4.点登陆按钮
  await page.click('.btn.btn-login');

  // 保证滑动弹窗加载出
  await page.waitFor(3000);

  // 获取像素差较大的最左侧横坐标
  const diffX = await page.evaluate(() => {
    const fullbg = document.querySelector('.geetest_canvas_fullbg'); // 完成图片
    const bg = document.querySelector('.geetest_canvas_bg'); // 带缺口图片
    const diffPixel = 40; // 像素差

    // 滑动解锁的背景图片的尺寸为 260*160
    // 拼图右侧离背景最左侧距离为 46px，故从 47px 的位置开始检测
    for(let i = 47; i < 260; i++) {
      for(let j = 1; j < 160; j++) {
        const fullbgData = fullbg.getContext("2d").getImageData(i, j, 1, 1).data;
        const bgData = bg.getContext("2d").getImageData(i, j, 1, 1).data;
        const red = Math.abs(fullbgData[0] - bgData[0]);
        const green = Math.abs(fullbgData[1] - bgData[1]);
        const blue = Math.abs(fullbgData[2] - bgData[2]);
        // 若找到两张图片在同样像素点中，red、green、blue 有一个值相差较大，即可视为缺口图片中缺口的最左侧横坐标位置
        if(red > diffPixel || green > diffPixel || blue > diffPixel) {
          return i;
        }
      }
    }
  });

  // 获取滑动按钮在页面中的坐标
  const dragButton = await page.$('.geetest_slider_button');
  const box = await dragButton.boundingBox();
  // 获取滑动按钮中心点位置
  const x = box.x + (box.width / 2);
  const y = box.y + (box.height / 2);

  // 鼠标滑动至滑动按钮中心点
  await page.mouse.move(x, y);
  // 按下鼠标
  await page.mouse.down();
  // 慢慢滑动至缺口位置,因起始位置有约 7px 的偏差，故终点值为 x + diffX - 7
  for (let i = x; i < x + diffX - 7; i = i + 5) {
    // 滑动鼠标
    await page.mouse.move(i, y);
  }
  // 假装有个停顿，看起来更像是人为操作
  await page.waitFor(200);
  // 放开鼠标
  await page.mouse.up();

  await page.waitFor(5000);
  await browser.close();
})();
```

* **场景四：爬取页面(静态)**
***

```js
const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main() {
    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();

        await page.goto('https://www.antdu.net/', { waitUntil: 'networkidle0' });
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);

        console.log(data);

        fs.appendFile('dome.html', data, function(err) {
            if (err) { console.log(err); } else {
                console.log('写入成功');
            }
        })

        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
```










































