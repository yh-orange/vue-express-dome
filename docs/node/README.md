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
