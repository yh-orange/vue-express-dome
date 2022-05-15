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

* 根据 `URL` 名称过滤，精准匹配 `URL`，不匹配的 `URL` 全部重定向到主页:

```nginx
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

* 根据请求类型过滤:

```nginx
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
    return 403;
}

if ( !-f $request_filename ){
    rewrite (.*) /index.js;
}
```

### 配置Gzip压缩

`GZIP`是规定的三种标准 `HTTP 压缩格式`之一。目前绝大多数的网站都在使用`GZIP`传输 `HTML`、`CSS`、`JavaScript` 等资源文件。

对于文本文件，`GZip` 的效果非常明显，开启后传输所需流量大约会降至 `1/4 ~ 1/3`。

并不是每个浏览器都支持`gzip`的，如何知道客户端是否支持`gzip`呢，请求头中的`Accept-Encoding`来标识对压缩的支持。

![请求头配置](/images/base-js85.png)

```nginx
gzip                    on; // 开启或者关闭gzip模块 默认为off
gzip_http_version       1.1;// 启用 `GZip` 所需的`HTTP`最低版本 默认值为HTTP/1.1
gzip_comp_level         5; // 压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗 cpu） 默认值为 1 压缩级别取值为1-9
gzip_min_length         1000;// 设置允许压缩的页面最小字节数，Content-Length小于该值的请求将不会被压缩 默认值:0  当设置的值较小时，压缩后的长度可能比原文件大，建议设置1000以上
gzip_types              text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml; // 要采用 gzip 压缩的文件类型 (MIME类型)  默认值:text/html(默认不压缩js/css)
```

**负载均衡**

>负载均衡就是用来帮助我们将众多的客户端请求合理的分配到各个服务器，以达到服务端资源的充分利用和更少的请求时间。

**Upstream 指定后端服务器地址列表**

```nginx
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**在 `server` 中拦截响应请求，并将请求转发到 `Upstream` 中配置的服务器列表。**

```nginx
server {
    server_name  fe.server.com;
    listen 80;
    location /api {
        proxy_pass http://balanceServer;
    }
}
```

上面的配置只是指定了 `nginx` 需要转发的服务端列表，并没有指定分配策略。

**- 轮询策略**
默认情况下采用的策略，将所有客户端请求轮询分配给服务端。

这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户

**- 最小连接数策略**

将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。

```nginx
upstream balanceServer {
    least_conn;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**- 最快响应时间策略**

依赖于 `NGINX Plus`，优先分配给响应时间最短的服务器。

```nginx
upstream balanceServer {
    fair;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**- 客户端 ip 绑定**

来自同一个 `ip`的请求永远只分配一台服务器，有效解决了动态网页存在的 `session` 共享问题。

```nginx
upstream balanceServer {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**静态资源服务器**

```nginx
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为 10 小时          
}
```
匹配以`png|gif|jpg|jpeg`为结尾的请求，并将请求转发到本地路径，`root`中指定的路径即 `nginx` 本地路径。同时也可以进行一些缓存的设置。

## 腾讯云服务器nginx配置https

本文档指导您如何在 Nginx 服务器中安装 SSL 证书。

:::tip TIP

* 本文档以证书名称 `www.domain.com` 为例。
* `Nginx` 版本以` nginx/1.16.0` 为例。
* 当前服务器的操作系统为 `CentOS 7`，由于操作系统的版本不同，详细操作步骤略有区别。
:::

**前提条件**
***

* 已准备文件远程拷贝软件，例如 `WinSCP`（建议从官方网站获取最新版本）。
* 已准备远程登录工具，例如 `PuTTY` 或者 `Xshell`（建议从官方网站获取最新版本）。
* 已在当前服务器中安装配置 `Nginx` 服务。
* 安装 `SSL` 证书前需准备的数据如下：
|名称|说明|
| - | - |
|服务器的IP地址|服务器的 IP 地址，用于 PC 连接到服务器。|
|用户名|登录服务器的用户名。|
|密码|登录服务器的密码。|

:::tip TIP

在腾讯云官网购买的云服务器，您可以登录云[服务器控制台](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fcvm) 获取服务器 IP 地址、用户名及密码。
:::
       
**操作步骤**
***

**证书安装**

1. 已在 SSL 证书管理控制台 中下载并解压缩`www.domain.com` 证书文件包到本地目录。 解压缩后，可获得相关类型的证书文件。其中包含 `Nginx` 文件夹和 `CSR` 文件：
    * 文件夹名称：`Nginx`
    * 文件夹内容：
        1_www.domain.com_bundle.crt 证书文件
        2_www.domain.com.key 私钥文件
    * CSR 文件内容： www.domain.com.csr 文件

:::tip TIP
`CSR` 文件是申请证书时由您上传或系统在线生成的，提供给 CA 机构。安装时可忽略该文件。
:::

2. 用 “WinSCP”（即本地与远程计算机间的复制文件工具）登录 Nginx 服务器。

3. 将已获取到的 1_www.domain.com_bundle.crt 证书文件和 2_www.domain.com.key 私钥文件从本地目录拷贝到 Nginx 服务器的 /usr/local/nginx/conf 目录（此处为默认安装目录，请根据实际情况操作）下。

:::tip TIP

若无 `/usr/local/nginx/conf` 目录，可通过执行 `mkdir -p /usr/local/nginx/conf` 命令行创建。
:::

4. 远程登录 `Nginx` 服务器。例如，使用 `“PuTTY”` 工具 登录。

5. 编辑 `Nginx` 根目录下的` conf/nginx.conf` 文件。修改内容如下：

:::tip TIP

* 此操作可通过执行 `vim /usr/local/nginx/conf/nginx.conf` 命令行编辑该文件。
-由于版本问题，配置文件可能存在不同的写法。例如：`Nginx` 版本为 `nginx/1.15.0` 以上请使用 `listen 443 ssl` 代替 `listen 443` 和 `ssl on`。
:::

```nginx
server {
    #SSL 访问端口号为 443
    listen 443 ssl; 
    #填写绑定证书的域名
    server_name www.domain.com; 
    #证书文件名称
    ssl_certificate 1_www.domain.com_bundle.crt; 
    #私钥文件名称
    ssl_certificate_key 2_www.domain.com.key; 
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
    ssl_prefer_server_ciphers on;
    location / {
       #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
        root /var/www/www.domain.com; 
        index  index.html index.htm;
    }
}
```

6. 在 `Nginx` 根目录下，通过执行以下命令验证配置文件问题。

```text
./sbin/nginx -t
```

* 若存在，请您重新配置或者根据提示修改存在问题。
* 若不存在，请执行 步骤7。

7. 重启 `Nginx`，即可使用 `https://www.domain.com` 进行访问。

**HTTP 自动跳转 HTTPS 的安全配置（可选）**

若您不了解通过 `HTTPS` 访问网站的方式，可以通过配置服务器，让其自动将 `HTTP` 的请求重定向到 `HTTPS`。您可以通过以下操作设置：

1. 根据实际需求，选择以下配置方式：

    * 在页面中添加 JS 脚本。
    * 在后端程序中添加重定向。
    * 通过 Web 服务器实现跳转。
    * Nginx 支持 rewrite 功能。若您在编译时没有去掉 pcre，您可在 HTTP 的 server 中增加 return 301 https://$host$request_uri;，即可将默认80端口的请求重定向为 HTTPS。修改如下内容：

```nginx

server {
    listen 443 ssl;
    #填写绑定证书的域名
    server_name www.domain.com; 
    #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
    root /var/www/www.domain.com; 
    index index.html index.htm;   
    #证书文件名称
    ssl_certificate  1_www.domain.com_bundle.crt; 
    #私钥文件名称
    ssl_certificate_key 2_www.domain.com.key; 
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
    index index.html index.htm;
    }
    }
    server {
    listen 80;
    #填写绑定证书的域名
    server_name www.domain.com; 
    #把http的域名请求转成https
    return 301 https://$host$request_uri; 
}
```

2. 若修改完成，重启 `Nginx`。即可使用 `http://www.domain.com` 进行访问。








