## Nginx相关知识

> `nginx` 是一个高性能的 `HTTP` 和`反向代理服务器`，也是一个通用的 `TCP/UDP` 代理服务器,是众多大型网站的必用技术。

**`nginx`在应用程序中的作用**

* 解决跨域
* 请求过滤
* 配置 gzip
* 负载均衡
* 静态资源服务器

**正向代理与反向**

>`代理`是在服务器和客户端之间假设的一层服务器，`代理`将接收客户端的请求并将它转发给服务器，然后将服务端的响应转发给客户端。

![正向代理与反向图文说明](/images/base-js83.png)

**正向代理**

>一个位于客户端和原始服务器 (`origin server`) 之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标 (原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。

:::tip TIP

`正向代理` 是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。

`正向代理` 对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。
:::

**反向代理**

>是指以代理服务器来接受 `internet` 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 `internet` 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

:::tip TIP

`反向代理` 是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。

`反向代理` 对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。
:::

### nginx基本结构

![正向代理与反向图文说明](/images/base-js83.png)

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        location  path {
            ...
        }
    }

    server {
        location  path {
            ...
        }
    }
}

```

* `main`:`nginx` 的全局配置，对全局生效。
* `events`: 配置影响 `nginx` 服务器或与用户的网络连接。
* `http`：可以嵌套多个 `server`，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
* `server`：配置虚拟主机的相关参数，一个 `http` 中可以有多个 `server`。
* `location`：配置请求的路由，以及各种页面的处理情况。
* `upstream`：配置后端服务器具体地址，负载均衡配置不可或缺的部分。

### nginx内置变量

|变量名|功能|
| - | - |
|`$host`|	请求信息中的 `Host`，如果请求中没有 `Host` 行，则等于设置的服务器名。|
|`$request_method`|	客户端请求类型如 `GET`、`POST` 等。|
|`$args`|请求中的参数。|
|`$content_length`|请求头中的`Content-length`字段。|
|`$http_user_agent`|客户端的`agent`信息。|
|`$http_cookie`|客户端的`cookie`信息。|
|`$remote_addr`|客户端的`IP地址`。|
|`$remote_port`|客户端的端口。|
|`$server_protocol`|请求使用的协议如`HTTP/1.1`。|
|`$server_addr`|服务器地址。|
|`$server_name`|服务器名称。|
|`$server_port`|服务器端口。|

### **解决跨域**

**跨域的定义**

>同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。通常不允许不同源间的读操作。

**同源的定义**

>如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。

**nginx 解决跨域的原理**

>nginx对服务端转发的请求不会触发浏览器的同源策略。

* 前端 `server` 的域名为：`fe.server.com`
* 后端服务的域名为：`dev.server.com`

前端`fe.server.com`发出对`dev.server.com`的请求一定会出现跨域。

我们只需要启动一个 `nginx` 服务器，将`server_name`设置为`fe.server.com`, 然后设置相应的 `location` 以拦截前端需要跨域的请求，最后将请求代理回`dev.server.com`。如下面的配置：

```nginx
server {
    listen  80;
    server_name  fe.server.com;
    location / {
        proxy_pass dev.server.com;
    }
}
```

**nginx请求过滤**

* 根据状态码过滤:
```nginx
error_page 500 501 502 503 504 506 /50x.html;
location = /50x.html {
    # 将根路径改编为存放 html 的路径。
    root /root/static/html;
}
```
























