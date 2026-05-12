# node.js

## Nodejs 第一章（介绍）

概述

1. `Nodejs` 并不是`JavaScript`应用，也不是编程语言，因为编程语言使用的`JavaScript`,Nodejs 是 `JavaScript`的运行时。

2. `Nodejs` 是构建在 V8 引擎之上的，V8 引擎是由 C/C++编写的，因此我们的 JavaSCript 代码需要由 C/C++转化后再执行。

3. `NodeJs` 使用异步 I/O 和事件驱动的设计理念，可以高效地处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，使得开发人员可以编写高性能、可扩展的应用程序,异步 I/O 最终都是由 libuv 事件循环库去实现的。

4. `NodeJs` 使用 npm 作为包管理工具类似于 python 的 pip，或者是 java 的`Maven`，目前 npm 拥有上百万个模块。
   https://www.npmjs.com/

5. `Nodejs` 适合干一些 IO 密集型应用，不适合 CPU 密集型应用，nodejsIO 依靠 libuv 有很强的处理能力，而 CPU 因为 nodejs 单线程原因，容易造成 CPU 占用率高，如果非要做 CPU 密集型应用，可以使用 C++插件编写 或者 nodejs 提供的 cluster。(CPU 密集型指的是图像的处理 或者音频处理需要大量数据结构 + 算法)

#### Nodejs 应用场景

以下展示并不是所有东西都是 nodejs 编写而是运行环境可以配合 nodejs 或者依靠 nodejs 运行。

前端
`Vue` `Angular` `React` `nuxtjs` `nextjs`

**后端**
`serverLess`

web 应用 `epxress` `Nestjs` `koa`

`RPC 服务 gRPC`

爬虫 `Puppeteer` `cheerio`

BFF 层 网关层

及时性应用`socket.io`

**桌前端**
`electron`

`tauri`

`NWjs`

**移动端**
`weex`

`ionic`

`hybrid`

`React Native`

**基建端**
`webpack` `vite` `rollup` `gulp`

`less` `scss` `postCss`

`babel` `swc`

`inquire` `command` `shelljs`

**嵌入式**
`Ruff` `js`

**单元测试 **
`jest` `vitest` `e2e`

**CICD**
`Jenkins` `docker` `Husky` `miniprogram-ci`
**反向代理**
`http-proxy` `Any-proxy`

## Nodejs 第二章（安装）

安装[nodejs](https://gitcode.com/GitHub_Trending/no/nodejs.org?utm_source=highlight_word_gitcode&word=nodejs&isLogin=1&from_link=558922704c189bcd9e8adaeaa3a94e97)
访问官网

1. en https://nodejs.org/en

2. cn http://www.nodejs.com.cn/

:::warning
LTS 长期支持版
Current 尝鲜版
:::

选择自己的操作系统 `windows` `Mac` `Linux` `windows` 需要区分 64 位和 32 位 Mac 需要区分 64 位还是 ARM 芯片 Linux 同上。 其中 msi 和 pkg 可以直接安装较为简单

也可以自己下载压缩包配置

- 包管理器：pnpm（最快最好用）
- 镜像切换：nrm
- Node 版本管理：nvm
- 跨平台环境变量：cross-env
- 清理文件：rimraf
- 依赖更新：ncu

总结

- 日常管理依赖： `pnpm` > `yarn` > `npm`
- 切换镜像： `nrm`
- 管理 Node： `nvm` / `volta`
- 开发增强：`cross-env`、`rimraf`、`nodemon`

## Nodejs 第三章（Npm Package json）

### npm

`npm`（全称 `Node Package Manager`）是 Node.js 的包管理工具，它是一个基于命令行的工具，用于帮助开发者在自己的项目中安装、升级、移除和管理依赖项。
[npm](https://www.npmjs.com/)

- 类似于 `PHP` 的工具： `Composer` 。它是 PHP 的包管理器，可以用于下载、安装和管理 PHP 的依赖项，类似于 npm。
- 类似于 `Java` 的工具： `Maven` 。它是 Java 的构建工具和项目管理工具，可以自动化构建、测试和部署 Java 应用程序，类似于 npm 和 webpack 的功能。
- 类似于 `Python` 的工具： `pip` 。它是 Python 的包管理器，可以用于安装和管理 Python 的依赖项，类似于 npm。
- 类似于 `Rust` 的工具： `Cargo` 。它是 Rust 的包管理器和构建工具，可以用于下载、编译和管理 Rust 的依赖项，类似于 npm 和 Maven 的功能。

### npm 命令

- `npm init`：初始化一个新的 npm 项目，创建 package.json 文件。
- `npm install`：安装一个包或一组包，并且会在当前目录存放一个 node_modules。
- `npm install <package-name>`：安装指定的包。
- `npm install <package-name> --save`：安装指定的包，并将其添加到 package.json 文件中的依赖列表中。
- `npm install <package-name> --save-dev`：安装指定的包，并将其添加到 package.json 文件中的开发依赖列表中。
- `npm install -g <package-name>`：全局安装指定的包。
- `npm update <package-name>`：更新指定的包。
- `npm uninstall <package-name>`：卸载指定的包。
- `npm run <script-name>`：执行 package.json 文件中定义的脚本命令。
- `npm search <keyword>`：搜索 npm 库中包含指定关键字的包。
- `npm info <package-name>`：查看指定包的详细信息。
- `npm list`：列出当前项目中安装的所有包。
- `npm outdated`：列出当前项目中需要更新的包。
- `npm audit`：检查当前项目中的依赖项是否存在安全漏洞。
- `npm publish`：发布自己开发的包到 npm 库中。
- `npm login`：登录到 npm 账户。
- `npm logout`：注销当前 npm 账户。
- `npm link`: 将本地模块链接到全局的 `node_modules` 目录下
- `npm config list`: 用于列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）
- `npm get registry`: 用于获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址
- `npm set registry npm config set registry <registry-url>`: 命令，将 registry 配置项的值修改为指定的 `<registry-url>` 地址

### Package json

执行 `npm init` 便可以初始化一个`package.json`

- `name` ： 项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。
- `version` ：项目版本号，通常采用语义化版本号规范。
- `description` ：项目描述。
- `main` ：项目的主入口文件路径，通常是一个 JavaScript 文件。
- `keywords` ：项目的关键字列表，方便他人搜索和发现该项目。
- `author` ：项目作者的信息，包括姓名、邮箱、网址等。
- `license` ：项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 `MIT` 、 `Apache` 等）。
- `dependencies` ：项目所依赖的包的列表，这些包会在项目运行时自动安装。
- `devDependencies` ：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。
- `peerDependencies` ：项目的同级依赖，即项目所需要的模块被其他模块所依赖。
- `scripts` ：定义了一些脚本命令，比如启动项目、运行测试等。
- `repository` ：项目代码仓库的信息，包括类型、网址等。
- `bugs` ：项目的 bug 报告地址。
- `homepage` ：项目的官方网站地址或者文档地址。
  :::waning
  version 三段式版本号一般是 1.0.0 大版本号 次版本号 修订号，
  大版本号一般是有重大变化才会升级，
  次版本号一般是增加功能进行升级，
  修订号一般是修改 bug 进行升级
  :::
  :::warning
  npm install 安装模块的时候一般是扁平化安装的，但是有时候出现嵌套的情况是因为版本不同
  A 依赖 C1.0,
  B 依赖 C1.0,
  D 依赖 C2.0,
  此时 C 1.0 就会被放到 A B 的 node_moduels,
  C2.0 会被放入 D 模块下面的 node_moduels
  :::
