## Nginx相关知识

> `nginx` 是一个高性能的 `HTTP` 和`反向代理服务器`，也是一个通用的 `TCP/UDP` 代理服务器,是众多大型网站的必用技术。

![nginx](/images/nginx.png)

**`nginx`在应用程序中的作用**

* 解决跨域
* 请求过滤
* 配置 gzip
* 负载均衡
* 静态资源服务器

## **正向代理与反向**

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

### 配置

* **实现效果访问`http://192.168.80.102:80`(Nginx首页),最终代理到`http://192.168.80.102:8080`(其他服务首页)**

>通过node启动一个本地服务，进行代理模拟

>在Nginx的配置文件中进行配置

    1. 新建一个server块，在server全局块中配置监听80端口
  
    2. 在location块中配置 / 路径请求代理到tomcat的地址
    下面三个配置的含义就是 ，当访问Linux的http://192.168.80.102:80这个地址时，由于配置Nginx监听的是80端口，所以会进入这个server块进行处理，然后看你的访问路径，根据location块配置的不同路径进入对应的处理，由于配置了/请求，所以进入/的location处理，然后配置了proxy_pass，所以进行代理到指定的路径。
    
     ```text
    server {
    #	监听端口80 即当访问服务器的端口是80时，进入这个server块处理
            listen       80;
    # server_name当配置了listen时不起作用        
            server_name  localhost;
    
    # location后面代表访问路径 当是/ 请求时 代理到tomcat的地址
            location / {
    # 使用 proxy_pass（固定写法）后面跟要代理服务器地址            
                proxy_pass http://192.168.80.102:8080;
            }
    }                
    ```
    经过测试，当输入http://192.168.80.102:80时，Nginx给我们代理到了我们启动的本地服务，所以显示了本地服务的页面，即配置成功
    
* **应用一访问的是/路径，给我们代理到指定的服务器**
    * 让 `Nginx` 监听9001端口
    * 我们实现当访问`http://192.168.80.102:9001/edu`(`Nginx` 地址)时，`Nginx` 给我们代理到`http://192.168.80.102:8081`，
    * 当访问`http://192.168.80.102:9001/vod`时，`Nginx` 给我们代理到`http://192.168.80.102:8082`

>通过node启动两个本地服务，进行代理模拟

>在Nginx的配置文件中进行配置

```text
server {
        # 监听9001端口
        listen       9001;
        # 进行路径匹配，匹配到edu代理到8081
        location ~/edu/ {
            proxy_pass http://192.168.80.102:8081;
        }
        # 进行路径匹配，匹配到vod代理到8082
        location ~/vod/ {
            proxy_pass http://192.168.80.102:8082;
        }
}
```
经过测试，访问成功！！!

:::tip TIP

`反向代理` 是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。

`反向代理` 对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。
:::

### nginx基本结构

![nginx基本结构](/images/base-js84.png)

```nginx
# 全局快
------------------------------------------------------------------------------
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

------------------------------------------------------------------------------

# events块
events {
    worker_connections  1024;
}

# http块 
http {
------------------------------------------------------------------------------# http全局块
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;        
------------------------------------------------------------------------------    
# server块
server {
# server全局块
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

# location块
        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
}
	
# 可以配置多个server块	

}
```

* `全局块`:就是配置文件从头开始到 `events` 块之间的内容，主要设置的是影响 `nginx` 服务器整体运行的配置指令比如 `worker_process`, 值越大，可以支持的并发处理量也越多，但是还是和服务器的硬件相关。

* `events块`: `events` 块涉及的指令主要影响 `Nginx` 服务器与用户的网络连接，常用的设置包括是否开启对多 `work_process` 下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 `word_process` 可以同时支持的最大连接数等。
上述例子就表示每个 `work_process` 支持的最大连接数为 1024.这部分的配置对 `Nginx` 的性能影响较大，在实际中应该灵活配置

* `http`：包括 `http` 全局块，以及多个 `server` 块。
    * **http全局块**
    `http` 全局块配置的指令包括文件引入、 `MIME-TYPE` 定义、日志自定义、连接超时时间、单链接请求数上限等。
    * **server模块**
        * 这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。
        * 每个 `http` 块可以包括多个 `server` 块，而每个 `server` 块就相当于一个虚拟主机
        * 而每个 `server` 块也分为全局 `server` 块，以及可以同时包含多个 `location` 块。
    * **location块**
        * 一个 `server` 块可以配置多个 `location` 块。
        * 主要作用是根据请求地址路径的匹配，匹配成功进行特定的处理
        * 这块的主要作用是基于 `Nginx` 服务器接收到的请求字符串（例如 `server_name/uri-string`），对虚拟主机名称（也可以是 `IP` 别名）之外的字符串（例如 前面的 `/uri-string`）进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。
    ```text
    # 表示如果请求路径是/就是用这个location块进行处理
    location / {
                root   html;
                index  index.html index.htm;
            }
    ```

* `upstream`：配置后端服务器具体地址，负载均衡配置不可或缺的部分。

`访问http://192.168.80.102:80/edu/test.html，Nginx将请求分配到8081和8082两台tomcat服务器上。`
>启用两个服务，通过Nginx分配到两个服务器上面
```text
# 在http块中的全局块中配置
# upstream固定写法 后面的myserver可以自定义
upstream myserver{
    server 192.168.80.102:8081;
    server 192.168.80.102:8082;
}

# server配置
    server {
      # 监听80端口
        listen 80;   
    	#location块
        location / {
# 反向代理到上面的两台服务器 写上自定义的名称
        proxy_pass http://myserver;
        }
    }
```

```text
start nginx
nginx -t                         # 查看nginx状态
nginx -s reload            # 重新载入配置文件
nginx -s reopen           # 重启 Nginx
nginx -s stop               # 停止 Nginx
```

## location 匹配规则
[location 匹配规则](https://www.cnblogs.com/duhuo/p/8323812.html)
## nginx内置变量

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

## **解决跨域**

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

## 配置Gzip压缩

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

## 负载均衡

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
# 在http块中的全局块中配置
# upstream固定写法 后面的myserver可以自定义
upstream myserver{
    server 192.168.80.102:8081;
    server 192.168.80.102:8082;
}

# server配置
    server {
      # 监听80端口
        listen 80;   
    	#location块
        location / {
# 反向代理到上面的两台服务器 写上自定义的名称
        proxy_pass http://myserver;
        }
    }

```

上面的配置只是指定了 `nginx` 需要转发的服务端列表，并没有指定分配策略。

**轮询策略**
默认情况下采用的策略，将所有客户端请求轮询分配给服务端。

这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户
每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 掉，能自动剔除

**最小连接数策略**

将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。

```nginx
upstream myserver {
    least_conn;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**- 最快响应时间策略**

依赖于 `NGINX Plus`，优先分配给响应时间最短的服务器。

```nginx
upstream myserver {
    fair;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

**`weight` 权重**
`weight` 代表权重默认为 1,权重越高被分配的客户端越多
```nginx
upstream myserver { 
	server 192.168.80.102:8081 weight=1 ;
	server 192.168.80.102:8082 weight=2 ;
}
server {  
    listen       80;  
    location / {
    proxy_pass http://myserver; 
}
```

**客户端 `ip_hash` 绑定**

来自同一个 `ip`的请求永远只分配一台服务器，有效解决了动态网页存在的 `session` 共享问题。

```nginx
upstream myserver {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```
**fair**
按后端服务器的响应时间来分配请求，响应时间短的优先分配。
```nginx
#配置负载均衡的服务器和端口
upstream myserver {   
	server 192.168.80.102:8081;
	server 192.168.80.102:8082;
    fair;
}
server {  
    listen       80;   
    location / {
    proxy_pass http://myserver; 
    }    
}
```

***
## 动静分离

### 概述
* 将静态资源 `css` `html` `js` 等和动态资源(`jsp servlet`)进行分开部署，**我们可以将静态资源直接部署在专门的服务器上，也可以直接放在反向代理服务器上(`Nginx`)所在在的服务器上** 然后动态资源还是部署在服务器上，`如tomcat`。
* 然后请求来的时候，静态资源从专门的静态资源服务器获取，动态资源还是转发到后端服务器上。

![静态资源代理](/images/nginx3.png)

### 配置

准备工作：在node服务中设置静态文件目录，并在目录下创建两个文件夹，分别是www和image，在www目录下创建一个okc.html,在image目录下放一张ttt.jpg

```nginx
server {
        listen       80;
    # 当访问路径带了www时，进入这个location处理，去/staticResource目录下对应的www目录     去找okc.html
 #  即最终实现访问到这个路径
  #  http://192.168.80.102:80/staticResource/www/okc.html
        location /www/{
            root   /staticResource/;
            index  index.html index.htm;
        }
    # 跟上面一样
        location /image/{
            root  /staticResource/;
      }   
}  
```

直接用 `Nginx` 当服务器使用访问
```nginx
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为 10 小时          
}
```
匹配以`png|gif|jpg|jpeg`为结尾的请求，并将请求转发到本地路径，`root`中指定的路径即 `nginx` 本地路径。同时也可以进行一些缓存的设置。

























