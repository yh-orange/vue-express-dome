# node.js

## Nodejs 第一章（介绍）

概述

1. `Nodejs` 并不是`JavaScript`应用，也不是编程语言，因为编程语言使用的`JavaScript`,Nodejs 是 `JavaScript`的运行时。

2. `Nodejs` 是构建在 V8 引擎之上的，V8 引擎是由 C/C++编写的，因此我们的 JavaSCript 代码需要由 C/C++转化后再执行。

3. `NodeJs` 使用异步 I/O 和事件驱动的设计理念，可以高效地处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，使得开发人员可以编写高性能、可扩展的应用程序,异步 I/O 最终都是由 libuv 事件循环库去实现的。

4. `NodeJs` 使用 npm 作为包管理工具类似于 python 的 pip，或者是 java 的`Maven`，目前 npm 拥有上百万个模块。
   https://www.npmjs.com/

5. `Nodejs` 适合干一些 IO 密集型应用，不适合 CPU 密集型应用，nodejsIO 依靠 libuv 有很强的处理能力，而 CPU 因为 nodejs 单线程原因，容易造成 CPU 占用率高，如果非要做 CPU 密集型应用，可以使用 C++插件编写 或者 nodejs 提供的 cluster。(CPU 密集型指的是图像的处理 或者音频处理需要大量数据结构 + 算法)

### Nodejs 应用场景

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

::: warning
version 三段式版本号一般是 1.0.0 大版本号 次版本号 修订号，
大版本号一般是有重大变化才会升级，
次版本号一般是增加功能进行升级，
修订号一般是修改 bug 进行升级
:::

> npm install 安装模块的时候一般是扁平化安装的，但是有时候出现嵌套的情况是因为版本不同

> A 依赖 C1.0,

> B 依赖 C1.0,

> D 依赖 C2.0,

> 此时 C 1.0 就会被放到 A B 的 node_moduels,

> C2.0 会被放入 D 模块下面的 node_moduels

## Nodejs 第四章（Npm install 原理）

### 在执行 npm install 的时候发生了什么？

> 首先安装的依赖都会存放在根目录的 node_modules,默认采用扁平化的方式安装，并且排序规则.bin 第一个然后@系列，再然后按照首字母排序 abcd 等，并且使用的算法是广度优先遍历，在遍历依赖树时，npm 会首先处理项目根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有依赖都被处理完毕。在处理每个依赖时，npm 会检查该依赖的版本号是否符合依赖树中其他依赖的版本要求，如果不符合，则会尝试安装适合的版本

### 扁平化？

扁平化只是理想状态如下
**安装某个二级模块时，若发现第一层级有相同名称，相同版本的模块，便直接复用那个模块**

因为 A 模块下的 C 模块被安装到了第一级，这使得 B 模块能够复用处在同一级下；且名称，版本，均相同的 C 模块

**非理想状态下**
因为 B 和 A 所要求的依赖模块不同，（B 下要求是 v2.0 的 C，A 下要求是 v1.0 的 C ）所以 B 不能像 2 中那样复用 A 下的 C v1.0 模块 所以如果这种情况还是会出现模块冗余的情况，他就会给 B 继续搞一层`node_modules`，就是非扁平化了。

### npm install 后续流程

![01](/images/node01.png)
具体过程看图就可以了很详细

至于 npmrc 可以配置什么给大家一个 demo 参考

```sh
registry=http://registry.npmjs.org/
# 定义npm的registry，即npm的包下载源

proxy=http://proxy.example.com:8080/
# 定义npm的代理服务器，用于访问网络

https-proxy=http://proxy.example.com:8080/
# 定义npm的https代理服务器，用于访问网络

strict-ssl=true
# 是否在SSL证书验证错误时退出

cafile=/path/to/cafile.pem
# 定义自定义CA证书文件的路径

user-agent=npm/{npm-version} node/{node-version} {platform}
# 自定义请求头中的User-Agent

save=true
# 安装包时是否自动保存到package.json的dependencies中

save-dev=true
# 安装包时是否自动保存到package.json的devDependencies中

save-exact=true
# 安装包时是否精确保存版本号

engine-strict=true
# 是否在安装时检查依赖的node和npm版本是否符合要求

scripts-prepend-node-path=true
# 是否在运行脚本时自动将node的路径添加到PATH环境变量中
```

### package-lock.json 的作用

很多朋友只知道这个东西可以锁定版本记录依赖树详细信息

version 该参数指定了当前包的版本号
resolved 该参数指定了当前包的下载地址
integrity 用于验证包的完整性
dev 该参数指定了当前包是一个开发依赖包
bin 该参数指定了当前包中可执行文件的路径和名称
engines 该参数指定了当前包所依赖的 Node.js 版本范围
知识点来了，package-lock.json 帮我们做了缓存，他会通过 name + version + integrity 信息生成一个唯一的 key，这个 key 能找到对应的 index-v5 下的缓存记录 也就是 npm cache 文件夹 下的

![图片](/images/node02.png)
如果发现有缓存记录，就会找到 `tar` 包的 `hash` 值，然后将对应的二进制文件解压到 node_modeules
![图片](/images/node03.png)

## Nodejs 第五章（Npm run 原理）

### **npm run xxx 发生了什么**

按照下面的例子 npm run dev 举例过程中发生了什么
![图片](/images/node04.png)

读取 `package json` 的 `scripts` 对应的脚本命令(`dev:vite`),`vite` 是个可执行脚本，他的查找规则是：

- 先从当前项目的 `node_modules/.bin` 去查找可执行命令 `vite`
- 如果没找到就去全局的 `node_modules` 去找可执行命令 `vite`
- 如果还没找到就去环境变量查找
- 再找不到就进行报错

如果成功找到会发现有三个文件
![图片](/images/node05.png)

> 因为 nodejs 是跨平台的所以可执行命令兼容各个平台

- `.sh`文件是给 Linux unix Macos 使用
- `.cmd` 给 windows 的 cmd 使用
- `.ps1` 给 windows 的 powerShell 使用

### npm 生命周期

没想到吧 npm 执行命令也有生命周期！！！

```json
    "predev": "node prev.js",
    "dev": "node index.js",
    "postdev": "node post.js"
```

执行 npm run dev 命令的时候 predev 会自动执行 他的生命周期是在 dev 之前执行，然后执行 dev 命令，再然后执行 postdev，也就是 dev 之后执行

运用场景例如 npm run build 可以在打包之后删除 dist 目录等等

post 例如你编写完一个工具发布 npm，那就可以在之后写一个 ci 脚本顺便帮你推送到 git 等等

谁用到了例如[vue-cli](https://github.com/vuejs/vue-cli/blob/dev/package.json)

## Nodejs 第六章（npx）

### npx 是什么

npx 是一个命令行工具，它是 npm 5.2.0 版本中新增的功能。它允许用户在不安装全局包的情况下，运行已安装在本地项目中的包或者远程仓库中的包。

npx 的作用是在命令行中运行 node 包中的可执行文件，而不需要全局安装这些包。这可以使开发人员更轻松地管理包的依赖关系，并且可以避免全局污染的问题。它还可以帮助开发人员在项目中使用不同版本的包，而不会出现版本冲突的问题。

### npx 的优势

1. 避免全局安装： `npx` 允许你执行 npm package，而不需要你先全局安装它。
2. 总是使用最新版本：如果你没有在本地安装相应的 npm package， `npx` 会从 npm 的 package 仓库中下载并使用最新版。
3. 执行任意 npm 包： `npx` 不仅可以执行在 `package.json` 的 `scripts` 部分定义的命令，还可以执行任何 npm package。
4. 执行 GitHub gist： `npx` 甚至可以执行 GitHub gist 或者其他公开的 JavaScript 文件。

### npm 和 npx 区别

`npx`侧重于执行命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令

`npm`侧重于安装或者卸载某个模块的。重在安装，并不具备执行某个模块的功能。

[示例](https://create-react-app.bootcss.com/docs/getting-started)

例如创建一个 react 项目 在之前需要安装到全局

```bash
npm install -g create-react-app
```

然后执行 `create-react-app my-app` 这样的话会有两个问题

- 首先需要全局安装这个包占用磁盘空间
- 并且如果需要更新还得执行更新命令

**示例 2**

```bash
npm ls -g 查看全局安装的包
```

> 当前项目安装 vite

```bash
npm i vite -D
```

安装完成之后发现无法执行运行 vite 命令

![图片](/images/node06.png)
这时候就可以使用 `npx vite` 了

![图片](/images/node07.png)
npx 的运行规则和 npm 是一样的 本地目录查找.bin 看有没有 如果没有就去全局的 node_moduels 查找，如果还没有就去下载这个包然后运行命令，然后删除这个包

## Nodejs 第七章（发布 npm 包）

### 发布 npm 的包的好处是什么

- 方便团队或者跨团队共享代码，使用 npm 包就可以方便的管理，并且还可以进行版本控制
- 做开源造轮子必备技术，否则你做完的轮子如何让别人使用难道是 U 盘拷贝？
- 面试题我面字节的时候就问到了这个
- 增加个人 IP 让更多的人知道你的技术能力和贡献

### 发布前准备工作

```sh
npm adduser
```

首先先检查一下是否是 npm 源然后创建一个 npm 账号

> 创建完成之后使用 npm login 登录账号

> 登录完成之后使用 npm publish 发布 npm 包

## Nodejs 第八章（npm 搭建私服）

### 构建 npm 私服

构建私服有什么收益吗？

可以离线使用，你可以将 npm 私服部署到内网集群，这样离线也可以访问私有的包。
提高包的安全性，使用私有的 npm 仓库可以更好的管理你的包，避免在使用公共的 npm 包的时候出现漏洞。
提高包的下载速度，使用私有 npm 仓库，你可以将经常使用的 npm 包缓存到本地，从而显著提高包的下载速度，减少依赖包的下载时间。这对于团队内部开发和持续集成、部署等场景非常有用

### 如何搭建 npm 私服

https://verdaccio.org/zh-CN/

Verdaccio 是可以帮我们快速构建 npm 私服的一个工具

```sh
npm install verdaccio -g
```

使用方式非常简单

> verdaccio 直接运行即可
> 然后访问 4873 默认端口即可

### 基本命令

```sh
#创建账号
npm adduser --registry http://localhost:4873/
# 账号 密码 邮箱

# 发布npm
npm publish --registry http://localhost:4873/

#指定开启端口 默认 4873
verdaccio --listen 9999

# 指定安装源
npm install --registry http://localhost:4873

# 从本地仓库删除包
npm unpublish <package-name> --registry http://localhost:4873

```

[配置文件地址](https://verdaccio.org/zh-CN/docs/configuration)

## Nodejs 第九章（模块化）

Nodejs 模块化规范遵循两套一套 `CommonJS` 规范另一套 `esm` 规范

### CommonJS 规范

引入模块（require）支持四种格式

1. 支持引入内置模块例如 `http` `os` `fs` `child_process` 等 nodejs 内置模块
2. 支持引入第三方模块 `express` `md5` `koa` 等
3. 支持引入自己编写的模块 ./ …/ 等
4. 支持引入 addon C++扩展模块 .node 文件

```js
const fs = require("node:fs"); // 导入核心模块
const express = require("express"); // 导入 node_modules 目录下的模块
const myModule = require("./myModule.js"); // 导入相对路径下的模块
const nodeModule = require("./myModule.node"); // 导入扩展模块
```

导出模块 `exports` 和 `module.exports`

```js
module.exports = {
  hello: function () {
    console.log("Hello, world!");
  },
};
```

如果不想导出对象直接导出值

```js
module.exports = 123;
```

### ESM 模块规范

引入模块 `import` 必须写在头部

> 注意使用 ESM 模块的时候必须开启一个选项打开 package.json 设置 type:module

```js
import fs from "node:fs";
```

> 如果要引入 json 文件需要特殊处理 需要增加断言并且指定类型 json node 低版本不支持

```js
import data from "./data.json" assert { type: "json" };
console.log(data);
```

加载模块的整体对象

```js
import * as all from "xxx.js";
```

动态导入模块

import 静态加载不支持掺杂在逻辑中如果想动态加载请使用 import 函数模式

```js
if (true) {
  import("./test.js").then();
}
```

模块导出

- 导出一个默认对象 default 只能有一个不可重复 export default

```js
export default {
  name: "test",
};
```

- 导出变量

```js
export const a = 1;
```

### Cjs 和 ESM 的区别

1. Cjs 是基于运行时的同步加载，esm 是基于编译时的异步加载
2. Cjs 是可以修改值的，esm 值并且不可修改（可读的）
3. Cjs 不可以 tree shaking，esm 支持 tree shaking
4. commonjs 中顶层的 this 指向这个模块本身，而 ES6 中顶层 this 指向 undefined

### nodejs 部分源码解析

.json 文件如何处理

```js
Module._extensions[".json"] = function (module, filename) {
  const content = fs.readFileSync(filename, "utf8");

  if (policy?.manifest) {
    const moduleURL = pathToFileURL(filename);
    policy.manifest.assertIntegrity(moduleURL, content);
  }

  try {
    setOwnProperty(module, "exports", JSONParse(stripBOM(content)));
  } catch (err) {
    err.message = filename + ": " + err.message;
    throw err;
  }
};
```

使用 fs 读取 json 文件读取完成之后是个字符串 然后 JSON.parse 变成对象返回

**.node 文件如何处理**

```js
Module._extensions[".node"] = function (module, filename) {
  if (policy?.manifest) {
    const content = fs.readFileSync(filename);
    const moduleURL = pathToFileURL(filename);
    policy.manifest.assertIntegrity(moduleURL, content);
  }
  // Be aware this doesn't use `content`
  return process.dlopen(module, path.toNamespacedPath(filename));
};
```

发现是通过 process.dlopen 方法处理.node 文件
**.js 文件如何处理**

```js
Module._extensions[".js"] = function (module, filename) {
  // If already analyzed the source, then it will be cached.
  //首先尝试从cjsParseCache中获取已经解析过的模块源代码，如果已经缓存，则直接使用缓存中的源代码
  const cached = cjsParseCache.get(module);
  let content;
  if (cached?.source) {
    content = cached.source; //有缓存就直接用
    cached.source = undefined;
  } else {
    content = fs.readFileSync(filename, "utf8"); //否则从文件系统读取源代码
  }
  //是不是.js结尾的文件
  if (StringPrototypeEndsWith(filename, ".js")) {
    //读取package.json文件
    const pkg = readPackageScope(filename);
    // Function require shouldn't be used in ES modules.
    //如果package.json文件中有type字段，并且type字段的值为module，并且你使用了require
    //则抛出一个错误，提示不能在ES模块中使用require函数
    if (pkg?.data?.type === "module") {
      const parent = moduleParentCache.get(module);
      const parentPath = parent?.filename;
      const packageJsonPath = path.resolve(pkg.path, "package.json");
      const usesEsm = hasEsmSyntax(content);
      const err = new ERR_REQUIRE_ESM(
        filename,
        usesEsm,
        parentPath,
        packageJsonPath,
      );
      // Attempt to reconstruct the parent require frame.
      //如果抛出了错误，它还会尝试重构父模块的 require 调用堆栈
      //，以提供更详细的错误信息。它会读取父模块的源代码，并根据错误的行号和列号，
      //在源代码中找到相应位置的代码行，并将其作为错误信息的一部分展示出来。
      if (Module._cache[parentPath]) {
        let parentSource;
        try {
          parentSource = fs.readFileSync(parentPath, "utf8");
        } catch {
          // Continue regardless of error.
        }
        if (parentSource) {
          const errLine = StringPrototypeSplit(
            StringPrototypeSlice(
              err.stack,
              StringPrototypeIndexOf(err.stack, "    at "),
            ),
            "\n",
            1,
          )[0];
          const { 1: line, 2: col } =
            RegExpPrototypeExec(/(\d+):(\d+)\)/, errLine) || [];
          if (line && col) {
            const srcLine = StringPrototypeSplit(parentSource, "\n")[line - 1];
            const frame = `${parentPath}:${line}\n${srcLine}\n${StringPrototypeRepeat(
              " ",
              col - 1,
            )}^\n`;
            setArrowMessage(err, frame);
          }
        }
      }
      throw err;
    }
  }
  module._compile(content, filename);
};
```

如果缓存过这个模块就直接从缓存中读取，如果没有缓存就从 fs 读取文件，并且判断如果是 cjs 但是 type 为 module 就报错，并且从父模块读取详细的行号进行报错，如果没问题就调用 compile

```js
Module.prototype._compile = function (content, filename) {
  let moduleURL;
  let redirects;
  const manifest = policy?.manifest;
  if (manifest) {
    moduleURL = pathToFileURL(filename);
    //函数将模块文件名转换为URL格式
    redirects = manifest.getDependencyMapper(moduleURL);
    //redirects是一个URL映射表，用于处理模块依赖关系
    manifest.assertIntegrity(moduleURL, content);
    //manifest则是一个安全策略对象，用于检测模块的完整性和安全性
  }
  /**
   * @filename {string}  文件名
   * @content {string}   文件内容
   */
  const compiledWrapper = wrapSafe(filename, content, this);

  let inspectorWrapper = null;
  if (getOptionValue("--inspect-brk") && process._eval == null) {
    if (!resolvedArgv) {
      // We enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        try {
          resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
        } catch {
          // We only expect this codepath to be reached in the case of a
          // preloaded module (it will fail earlier with the main entry)
          assert(ArrayIsArray(getOptionValue("--require")));
        }
      } else {
        resolvedArgv = "repl";
      }
    }

    // Set breakpoint on module start
    if (resolvedArgv && !hasPausedEntry && filename === resolvedArgv) {
      hasPausedEntry = true;
      inspectorWrapper = internalBinding("inspector").callAndPauseOnStart;
    }
  }
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this, redirects);
  let result;
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (requireDepth === 0) statCache = new SafeMap();
  if (inspectorWrapper) {
    result = inspectorWrapper(
      compiledWrapper,
      thisValue,
      exports,
      require,
      module,
      filename,
      dirname,
    );
  } else {
    result = ReflectApply(compiledWrapper, thisValue, [
      exports,
      require,
      module,
      filename,
      dirname,
    ]);
  }
  hasLoadedAnyUserCJSModule = true;
  if (requireDepth === 0) statCache = null;
  return result;
};
```

首先，它检查是否存在安全策略对象 `policy.manifest`。如果存在，表示有安全策略限制需要处理
将函数将模块文件名转换为 URL 格式，`redirects`是一个 URL 映射表，用于处理模块依赖关系 ，`manifest`则是一个安全策略对象，用于检测模块的完整性和安全性，然后调用`wrapSafe`

```js
function wrapSafe(filename, content, cjsModuleInstance) {
  if (patched) {
    const wrapper = Module.wrap(content);
    //支持esm的模块
    //import { a } from './a.js'; 类似于eval
    //import()函数模式动态加载模块
    const script = new Script(wrapper, {
      filename,
      lineOffset: 0,
      importModuleDynamically: async (specifier, _, importAssertions) => {
        const loader = asyncESM.esmLoader;
        return loader.import(specifier, normalizeReferrerURL(filename),
                             importAssertions);
      },
    });

    // Cache the source map for the module if present.
    if (script.sourceMapURL) {
      maybeCacheSourceMap(filename, content, this, false, undefined, script.sourceMapURL);
    }
    //返回一个可执行的全局上下文函数
    return script.runInThisContext({
      displayErrors: true,
    });
  }
```

wrapSafe 调用了 wrap 方法

```js
let wrap = function (script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};
//(function (exports, require, module, __filename, __dirname) {
//const xm = 18
//\n});
const wrapper = [
  "(function (exports, require, module, __filename, __dirname) { ",
  "\n})",
];
```

wrap 方法 发现就是把我们的代码包装到一个函数里面

> //(function (exports, require, module, **filename, **dirname) {
> //const xm = 18 我们的代码
> //\n});

然后继续看 `wrapSafe` 函数，发现把返回的字符串也就是包装之后的代码放入 `nodejs` 虚拟机里面 `Script` ，看有没有动态 `import` 去加载，最后返回执行后的结果，然后继续看`_compile`，获取到 `wrapSafe` 返回的函数，通过 `Reflect.apply` 调用因为要填充五个参数`[exports, require, module, filename, dirname]`,最后返回执行完的结果。

## Nodejs 第十章（全局变量）

如何在 nodejs 定义全局变量呢？

在`nodejs`中使用`global`定义全局变量，定义的变量，可以在引入的文件中也可以访问到该变量，例如`a.js global.xxx = 'xxx' require('xxx.js') xxx.js` 也可以访问到该变量，在浏览器中我们定义的全局变量都在`window`,`nodejs`在`global`，不同的环境还需要判断，于是在`ECMAScript 2020` 出现了一个`globalThis`全局变量，在`nodejs环境`会自动切换成`global` ，浏览器环境自动切换`window`非常方便

### 关于其他全局 API

> 由于 nodejs 中没有 DOM 和 BOM，除了这些 API，其他的 ECMAscriptAPI 基本都能用

例如

```js
setTimeout setInterval Promise Math  console  Date fetch(node v18) 等...
```

nodejs 内置全局 API
`__dirname` 它表示当前模块的所在目录的绝对路径

`__filename` 它表示当前模块文件的绝对路径，包括文件名 和文件扩展名

`require module` 模块导入

`process`

1. `process.argv` : 这是一个包含命令行参数的数组。第一个元素是 Node.js 的执行路径，第二个元素是当前执行的 JavaScript 文件的路径，之后的元素是传递给脚本的命令行参数。
2. `process.env`: 这是一个包含当前环境变量的对象。您可以通过 `process.env` 访问并操作环境变量。
3. `process.cwd()`: 这个方法返回当前工作目录的路径。
4. `process.on(event, listener)`: 用于注册事件监听器。您可以使用`process.on`监听诸如 `exit` 、 `uncaughtException` 等事件，并在事件发生时执行相应的回调函数。
5. `process.exit([code])`: 用于退出当前的 Node.js 进程。您可以提供一个可选的退出码作为参数。
6. `process.pid`: 这个属性返回当前进程的 PID（进程 ID）。

`Buffer`

1. 创建 `Buffer` 实例：

   - `Buffer.alloc(size[, fill[, encoding]])`: 创建一个指定大小的新的 `Buffer` 实例，初始内容为零。 `fill` 参数可用于填充缓冲区， `encoding` 参数指定填充的字符编码。
   - `Buffer.from(array)`: 创建一个包含给定数组的 `Buffer` 实例。
   - `Buffer.from(string[, encoding])`: 创建一个包含给定字符串的 `Buffer` 实例。

2. 读取和写入数据：

   - `buffer[index]`: 通过索引读取或写入 `Buffer` 实例中的特定字节。
   - `buffer.length`: 获取 `Buffer` 实例的字节长度。
   - `buffer.toString([encoding[, start[, end]]])`: 将 `Buffer` 实例转换为字符串。

3. 转换数据：

   - `buffer.toJSON()`: 将 Buffer 实例转换为 JSON 对象。
   - `buffer.slice([start[, end]])`: 返回一个新的 `Buffer` 实例，其中包含原始 `Buffer` 实例的部分内容。

4. 其他方法：
   - `Buffer.isBuffer(obj)`: 检查一个对象是否是 `Buffer` 实例。
   - `Buffer.concat(list[, totalLength])`: 将一组 `Buffer` 实例或字节数组连接起来形成一个新的 `Buffer` 实例。

请注意，从`Node.js` 6.0 版本开始， `Buffer` 构造函数的使用已被弃用，推荐使用 `Buffer.alloc()` 、`Buffer.from()` 等方法来创建`Buffer`实例。

`Buffer`类在`处理文件`、`网络通信`、`加密` 和 `解密`等操作中非常有用，尤其是在需要处理二进制数据时
