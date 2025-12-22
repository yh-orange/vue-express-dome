# 网络模块

## OSI七层网络参考模型
7. **应用层**

应用层就是我们使用最多的一层，例如ajax调用接口发送http请求，再比如域名系统DNS，邮件协议SMTP，webSocket长连接，SSH协议
6. **表示层**

表示层主要做了几件重要的事情 安全，压缩，也是程序在网络中的一个翻译官。

1. 安全 在你的数据发送之前进行加密，在接受者的表示层进行解密。

2. 表示层还会对图片文件等格式进行解码和编码 例如 `JPEG`、`ASCll` 图片是人类能读懂的计算机需要转换成计算机能读懂的编码。

5. **会话层**

会话层，是在发送方和接收方之间进行通信时创建、维持、之后终止或断开连接的地方，与电话通话有点相似。

会话层定义了一种机制，允许发送方和接收方启动或停止请求会话，以及当双方发生拥塞时仍然能保持对话。

会话层包含了一种称为**检查点（Checkpoint）** 的机制来维持可靠会话。检查点定义了一个最接近成功通信的点，并且定义了当发生内容丢失或损坏时需要回滚以便恢复丢失或损坏数据的点，即**断点下载**的原理

4. **传输层**

传输层主要就是定义我们的端口号，以及控流，和校验。

并且拥有两个熟知的协议 TCP UDP

TCP 是面向连接的协议并且TCP是可靠的

因为TCP会进行三次握手四次挥手所以是可靠的，但是这样会降低速度

UDP 具有较好的实时性 效率比TCP高

UDP是没有三次握手四次挥手的，故此不稳定，但是速度快 常用于直播，游戏

3. **网络层**
网络层是最复杂的一层，在这一层就定义了我们的IP，220.xxx.xxx.xxx。

该层控制数据链路层与传输层之间的信息转发，建立、维持和终止网络的连接。具体地说，数据链路层的数据在这一层被转换为数据包，然后通过路径选择、分段组合、顺序、进/出路由等控制，将信息从一个网络设备传送到另一个网络设备

1. 寻址：对网络层而言使用IP地址来唯一标识互联网上的设备，网络层依靠IP地址进行相互通信（类似于数据链路层的MAC地址）

2. 路由：在同一个网络中的内部通信并不需要网络层设备，仅仅靠数据链路层就可以完成相互通信，对于不同的网络之间相互通信则必须借助路由器等三层设备。

我们的路由器就是在第三层工作的

在数据链路层的时候说过了如果所有的使用互联网的用户在同一个网段中，会产生广播风暴，所以要将用户进行划分，让他们在不同的网段中，自己在自己的小网段中广播。而互联网就是这无数的子网络构成的一个巨型网络。

在网络层中引入了一套新的地址，让我们能够区分不同的网段。这套地址就叫做“网络地址”，简称“网址”。

于是，”网络层”出现以后，每台计算机有了两种地址，一种是MAC地址，另一种是网络地址。两种地址之间没有任何联系，MAC地址是绑定在网卡上的，网络地址则是管理员分配的，它们只是随机组合在一起。

网络地址帮助我们确定计算机所在的子网络，MAC地址则将数据包送到该子网络中的目标网卡。因此，从逻辑上可以推断，必定是先处理网络地址，然后再处理MAC地址。

这一层中有一个规定网络地址的协议，叫做IP协议，它所定义的地址，就被称为IP地址。目前，广泛采用的是IP协议第四版，简称IPv4。这个版本规定，网络地址由32个二进制位组成。因为IPv4的地址已经不够用了，所以现在推广IPv6，

2. **数据链路层**

建立逻辑连接、进行硬件地址寻址、差错校验等功能。（由底层网络定义协议）
将比特组合成字节进而组合成帧，用MAC地址访问介质，错误发现但不能纠正。

MAC地址：每个网卡的唯一标识
有了Mac地址之后就可以知道谁是接收者，谁是发送者，并且知道了数据的内容并且进行了分组。

那么他如何进行传播数据，他是进行广播的方式进行传输,在局域网内所有的计算机都能收到消息

1. **物理层**

物理层是直接和物理介质打交道的。

物理层的设备 网卡，网线，集线器，中继器，调制解调器

**物理层信道**

1. 有线信道
明线
明线是指平行架设在电线杆上的架空线路。它本身是导电裸线或带绝缘层的导线。虽然它的传输损耗低，但是由于易受天气和环境的影响，对外界噪声干扰比较敏感，已经逐渐被电缆取代。 

**对称电缆**
对称电缆是由多对双绞线组成的线缆
**同轴电缆**
同轴线缆的应用范围极为广泛，同轴电缆能以低损耗的方式传输模拟信号和数字信号，适用于各种应用，其中常见的有电视广播系统、长途电话传输系统、计算机系统之间的短距离跳线以及局域网互联等
**光纤**
光导纤维是由玻璃或塑料制成的纤维，利用光在这些纤维中以全反射原理传输的光传导工具（全反射现象是光的折射的特殊现象，只有光从光密介质射向光疏介质并且入射角大于等于临界角时全反射 现象才会发生）
2. 无线信道
以辐射无线电波为传输方式无线信道主要有地波传输，天波传输和视距传输 例如：卫星通讯，电台广播
在这一层通过以上的方式，会获取他们对应的传送信号，电压，转换成010101010101但是数据还未组织，仅作为原始的电气电压处理单位为bit

## TCP 三次握手和四次挥手
什么是面向连接，面向连接就是数据通讯的时候需要进行三次握手，断开通信的时候进行四次挥手
1. `seq（sequence number）`，序列号随机生成的

2. `ack（acknowledgement number）`确认号 ack = seq + 1

3. `ACK （acknowledgement）`确定序列号有效

4. `SYN（synchronous）`发起新连接

5. `FIN （FINISH）`完成


具体步骤讲解

三次握手很像对讲机通话，一个发送，一个接受，也可以反之。

## 重学Ajax

### 概述
Ajax（Asynchronous JavaScript And XML）即异步 JavaScript 和 XML，是一组用于在网页上进行异步数据交换的Web开发技术，可以在不刷新整个页面的情况下向服务器发起请求并获取数据，
然后将数据插入到网页中的某个位置。这种技术能够实现增量式更新页面，提高用户交互体验，减少响应时间和带宽的消耗。

使用 Ajax 技术，可以通过 JavaScript 和 XMLHttpRequest 对象来向服务器获取数据。
在Ajax请求的过程中，可以通过定义回调函数来对请求的结果进行处理，回调函数会在请求完成后执行，通过这种方式可以更新页面内容或者响应用户操作。

**Ajax 可以用来实现以下功能：**
* 异步更新页面内容（如搜索建议、聊天框等）
* 在页面中特定区域显示动态数据
* 提交表单数据而无需刷新整个页面
* 与服务器进行交互，不会导致页面跳转或刷新

**Ajax 的主要优点包括：**
* 提高用户体验：通过减少页面的重载和刷新，使得网站变得更加灵活和动态。
* 减轻服务器负载：通过使用 Ajax，可以有效减少服务器接收到的请求次数和需要响应的数据量，从而减轻服务器的负担。
* 提高响应速度：使用 Ajax 可以异步获取数据并更新页面，从而提高响应速度。
* 增加交互性：通过使用 Ajax，可以使得页面变得更加动态和交互性。

**然而也需要注意一些问题：**
* Ajax 对搜索引擎优化(Seo)劣势较大，对于需要SEO的项目需要谨慎选择使用Ajax技术。
* 在使用 Ajax 时，需要考虑数据安全性和网络安全性问题，并采取相应的措施加以防范。
* 不合适的使用 Ajax，可能会造成降低网站质量和效率的问题，所以需要根据实际需求来决定是否采用该技术。

[**文档**](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Network_requests)

**核心API**
1. 需要创建xhr实例 通过 XMLHttpRequest 使用 XMLHttpRequest 可以通过 JavaScript 发起HTTP请求，接收来自服务器的响应，并动态地更新网页中的内容。这种异步通信方式不会阻塞用户界面，有利于增强用户体验。

2. 我们需要使用 open() 方法打开一个请求，该方法会初始化一个请求，但并不会发送请求。它有三个必填参数以及一个可选参数

    * method：请求的 HTTP 方法，例如 GET、POST 等。
    * url：请求的 URL 地址。
    * async：是否异步处理请求，默认为 true，即异步请求。

3. onreadystatechange 一个回调函数，在每次状态发生变化时被调用。

    * readyState 0：未初始化，XMLHttpRequest 对象已经创建，但未调用 open 方法。
    * readyState 1：已打开，open 方法已经被调用，但 send 方法未被调用。
    * readyState 2：已发送，send 方法已经被调用，请求已经被服务器接收。
    * readyState 3：正在接收，服务器正在处理请求并返回数据。
    * readyState 4：完成，服务器已经完成了数据传输。

4. send 向后端传递参数 例如 xhe.send(params)

### 案例
**发送一个get 请求**
在 XMLHttpRequest 对象中，onload 事件是指在 AJAX 请求成功完成后所触发的事件。当异步请求成功返回响应时，该事件会被调用，可以在该事件中处理服务器返回的数据。

使用 XMLHttpRequest 对象时，在调用 send() 方法发送请求后，会监听readystatechange 事件，该事件会在请求过程中多次触发，它有多个状态，其中，当该对象 readyState 状态码值为4时表示已经获取到服务器的响应信息。但是只有当 HTTP 状态码为 200（OK）时，响应才是有效的。此时，你可以通过响应结果来更新页面，反之则应该进行错误处理。

使用 onload 事件可以更加直接地判断 AJAX 请求是否成功，只有在响应成功（即获得正确的 HTTP 状态码）时才会触发，并且无需判断服务器响应的状态码。可以在 onload 事件中处理服务器返回的数据，并根据需要更新网页内容。

```JavaScript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/txt')
xhr.onload = function() {
  if (xhr.status === 200) {
        document.querySelector('#result').innerText = xhr.responseText;
    }
    else {
       console.log('Request failed.  Returned status of ' + xhr.status);
   }
};
xhr.send(null);
 ```

 发送post 请求 json
 ```JavaScript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/api/post')
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
        document.querySelector('#result').innerText = xhr.responseText;
    }
    else {
       console.log('Request failed.  Returned status of ' + xhr.status);
   }
};
xhr.send(JSON.stringify({name: 'zhangsan', age: 18}));
 ```
发送post 请求 application/x-www-form-urlencoded
```JavaScript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/api/post')
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
  if (xhr.status === 200) {
        document.querySelector('#result').innerText = xhr.responseText;
    }
    else {
       console.log('Request failed.  Returned status of ' + xhr.status);
   }
};
xhr.send('name=zhangsan&age=18');
 ```

上传图片 multipart/form-data
浏览器会自动设置请求头为 multipart/form-data
```JavaScript
document.querySelector('#file').addEventListener('change', function () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/upload')
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector('#result').innerText = xhr.responseText;
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
 
    let file = this.files[0];
    let formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
});
 ```
### 中断请求 和 设置超时时间
中断请求只需要调用 `xhr.abort()`; 即可

并且会有一个中断的回调
```JavaScript
xhr.addEventListener('abort', function (event) { console.log('我被中断了'); });
```

超时时间可以设置timeout 参数`xhr.timeout = 3000;`同样有一个超时回调
```JavaScript
xhr.addEventListener('timeout', function (event) { console.log('超时啦'); });
```

### 获取进度
可以监听 `progress`

在监听器中，我们通过 `event.loaded` 和 `event.total` 属性获取已上传数据量和总数据量，并计算上传进度，最后将进度显示在页面上
```JavaScript
xhr.addEventListener('progress', function (event) {
document.querySelector('#progress').innerText = `${(event.loaded / event.total * 100).toFixed(2)}%`;
});
 ```

## 重学fetch
### 概述
`Fetch`是一种网络通信协议，用于在客户端和服务器之间传输数据。该协议使用HTTP请求和响应进行通信，与传统的`AJAX`方式相比，`Fetch`更加简单易用，并提供了许多现代化的功能。

使用`Fetch`可以方便地向服务器发送请求，并将响应返回给客户端。你可以使用`Fetch`获取文本、JSON、图像和文件等数据，并进行各种处理。`Fetch`还支持流式传输和取消请求等高级功能，使得处理大型数据集和长时间运行的操作变得更加简单和可靠。

`Fetch API`也是`Javascript`中常用的API之一，它提供了一组方法和属性，可以在浏览器端与服务器进行通信。通过`Fetch API`，你可以轻松地使用`Fetch协议`进行数据传输，并对请求和响应进行操作和处理。

### fetch 对比 xhr
`fetch` 和` XMLHttpRequest`（XHR）都是前端与服务器进行数据交互的常用方式，它们各有优缺点，下面是它们的比较

1. API 设计和使用方式
`fetch` 的 API 设计更加现代化、简洁和易于使用，使用起来更加直观和方便。相比之下，XHR 的 API 设计比较繁琐，需要进行多个参数的配置和回调函数的处理。

2. 支持的请求方法
`fetch` API 默认只支持 GET 和 POST 请求方法，而 XHR 则支持所有标准的 HTTP 请求方法。

3. 请求头部
在 `fetch` 中设置请求头部的方式更加清晰和直接，可以通过 Headers 对象进行设置，而 XHR 的方式相对较为繁琐。

4. 请求体
在发送 POST 请求时，`fetch` API 要求将请求体数据作为参数传递给 fetch 方法中的 options 对象，而 XHR 可以直接在 send() 方法中设置请求体数据。

5. 支持的数据类型
在解析响应数据时， `fetch` API 提供了多种方法，包括 `.json()`, `.blob()`, `.arrayBuffer()` 等，而 XHR 只支持文本和二进制数据两种数据类型。

6. 跨域请求
在进行跨域请求时， `fetch` API 提供了一种简单而强大的解决方案——使用 CORS（跨域资源共享）头部实现跨域请求，而 XHR 则使用了一个叫做 `XMLHttpRequest Level 2` 的规范，在代码编写上相对较为繁琐。

总的来说，`fetch` API 与 XHR 各有优缺点，具体选择哪种方式还需要根据具体情况进行考虑。平时开发中使用较多的是 `fetch` ，因为它使用方便、API 简洁、语法清晰，同时也支持了大多数常用的功能，可以有效地简化前端开发流程。

### fetch 发送请求

### fetch 返回格式
1. text(): 将响应体解析为纯文本字符串并返回。
2. json(): 将响应体解析为JSON格式并返回一个JavaScript对象。
3. blob(): 将响应体解析为二进制数据并返回一个Blob对象。
4. arrayBuffer(): 将响应体解析为二进制数据并返回一个ArrayBuffer对象。
5. formData(): 将响应体解析为FormData对象。

1. **get请求**
```JavaScript
fetch('http://localhost:3000/api/txt').then(res => {
    console.log(res);
    return res.text()
}).then(res => {
    console.log(res);
})
```
2. **post请求**
```JavaScript
fetch('http://localhost:3000/api/post',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name:'zhangsan',
        age:18
    })
}).then(res => {
    console.log(res);
    return res.json()
}).then(res => {
    console.log(res);
})
```
3. **中断请求**
使用 `AbortController` 的 `abort` 方法中断
```JavaScript
const abort = new AbortController()
fetch('http://localhost:3000/api/post',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    signal:abort.signal,
    body:JSON.stringify({
        name:'zhangsan',
        age:18
    })
}).then(res => {
    console.log(res);
    return res.json()
}).then(res => {
    console.log(res);
})

document.querySelector('#stop').addEventListener('click', () => {
        console.log('stop');
        abort.abort()
})
```
4. **获取进度**
使用`data.clone()`方法复制了响应对象`data`，然后使用`getReader()`方法获取数据流中的reader对象，接着通过读取数据流并计算已加载字节数，实现了一个基于原生`JavaScript`的进度条功能。
```JavaScript
const btn = document.querySelector('#send')
const sendFetch = async () => {
    const data = await fetch('http://localhost:3000/api/txt',{
        signal:abort.signal
    })
    //fetch 实现进度条
    const response = data.clone()
    const reader = data.body.getReader()
    const contentLength = data.headers.get('Content-Length')
    let loaded = 0
    while (true) {
        const { done, value } = await reader.read()
        if (done) {
            break
        }
        loaded += value?.length || 0;
        const progress = document.querySelector('#progress')
        progress.innerHTML = (loaded / contentLength * 100).toFixed(2) + '%'
    }
    const text = await response.text()
    console.log(text);
}
btn.addEventListener('click', sendFetch)
```



















































