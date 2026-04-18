# Next.js

## Next.js第一章(入门)
**开始使用 Next.js**
欢迎来到 `Next.js` 学习之旅！本教程将带你从零开始创建你的第一个 `Next.js` 应用。

我们所学的版本是16.0.2

**什么是 Next.js？**
Next.js是一个基于React全栈框架，由Vercel开发和维护，那么它有什么优势呢？

* **SSR** ：服务端渲染，可以提高页面加载速度(现在会SSR的人才并不多，可以提升你的竞争力)
* **SSG** ：静态站点生成，可以生成静态页面，类似于Vitepress / Astro等静态站点生成工具
* **SEO** : Next.js提供了SEO优化，让你的网站更容易被搜索引擎收录
* **AI** : Vercel提供了 AI SDK 可以跟Next.js轻松结合，让你可以轻松实现AI应用
* **服务端操作** : Next.js提供了服务端操作，顺便学习服务端知识，为以后做全栈开发打下基础
* **社区丰富** : Next.js拥有庞大的社区，可以让你轻松找到解决方案
* **部署** : 支持多种部署选项，与Vercel等平台集成良好，可以快速部署

**前置知识**

在学习Next.js之前，你需要掌握以下知识：

* HTML `熟练使用`
* CSS `熟练使用`
* JavaScript `熟练使用`
* TypeScript `基本使用即可`
* React `熟练使用`
* Node.js `基本使用即可`

**Next.js 市场情况**
截止：2025年11月11日，`npm` 下载量

Next.js: `13,294,097`
Nuxt.js: `956,540`
Astro: `747,707`
SvelteKit: `626,494`
**环境准备**
Node.js环境 [下载地址:](https://nodejs.org/en/download) 注：最低版本要求20.9,主包用的是22.17.0
代码编辑器 Vscode Cursor webStorm等皆可，不要用记事本就行。


## Next.js第二章(项目搭建)

**Next.js 项目搭建**

创建项目
快速入门

注： 当前教程为16.0.2版本，最低Node.js版本为20.9.0

```bash
npx create-next-app@latest
```

接下来会有几个问题需要你选择，根据你的需求选择即可

* What is your project named? » my-app `项目名称（必填）`
* Would you like to use the recommended Next.js defaults? `是否使用推荐配置` 这里我选自定义配置 `No, customize settings`
* Would you like to use TypeScript? » No / Yes `是否使用TypeScript` 这里我选是 `Yes`
* Which linter would you like to use? » ESLint / Biome / None `是否使用ESLint` 这里我选是 `None`
* Would you like to use React Compiler? » No / Yes `是否使用React Compiler` 这里我选是 `Yes`
* Would you like to use Tailwind CSS? » No / Yes `是否使用Tailwind CSS` 这里我选是 `Yes`
* Would you like to use src/app directory? » No / Yes `是否使用src/app目录` 这里我选是 `Yes`
* Would you like to use App Router? (recommended) » No / Yes `是否使用App Router` 这里我选是 `Yes`
* Would you like to use Turbopack? (recommended) » No / Yes `是否使用Turbopack` 这里我选是 `Yes`
* Would you like to customize the import alias (@/* by default)? » No / Yes 是否自定义导入别名 `@/*` 这里我选是 `Yes`
* What import alias would you like configured? » @/* 是否自定义导入别名 `@/*` 这里我选是 默认 `@/*`

选择完成之后，他会执行`npm install`安装依赖，安装完成之后，他会执行`npm run dev`启动项目，访问`http://localhost:3000`即可看到项目。

**目录结构介绍**
```txt
public/ -> 静态资源目录
src/ -> 源代码目录
  └─app/ -> App Router目录
     └─layout.tsx -> 跟布局(必须存在 且必须包含html body标签)
     └─page.tsx -> 首页
     └─globals.css -> 全局样式
next-env.d.ts -> TypeScript类型定义文件
next.config.ts -> Next.js配置文件
tsconfig.json -> TypeScript配置文件
postcss.config.mjs -> PostCSS配置文件(主要用于处理tailwindcss)
package.json -> 包管理文件
README.md -> 项目说明文件
```

**命令介绍**
```bash
next dev -> 启动开发服务器 -> npm run dev
next build -> 构建项目 -> npm run build
next start -> 启动生产服务器 -> npm run start
```

**FAQ**
**什么是Turbopack？**
`Turbopack` 是一个增量打包器，用于取代`webpack`,它是用`Rust语言`编写,并且`Turbopack`转换`js/ts`使用的是 `SWC`,他比vite快10倍，比webpack快700倍，速度更快，性能更优。

核心原理：Turbopack是函数级别的缓存，可以将某些函数，进行标记，当这些函数被调用时，会记住他们被调用的内容，保存到缓存中。

首先我们看到有两个文件`api.ts/ sdk.ts` 都调用了readFile函数，然后把这两个文件打包成bundle,然后拼接起来,最后打成一个fullBundle

### 什么是React Compiler?
`React Compiler` 是 `Next.js` 用于自动优化组件渲染来提高性能的工具，在之前的话，我们需要手动优化 `useMemo` / `useCallback` / `memo` 等，现在 `Next.js` 会自动优化，你只需要写代码即可,减少心智负担。

如何开启React Compiler? `如果你在选项中选择yes则无需安装`

```bath
npm install -D babel-plugin-react-compiler
```

next.config.ts
```ts
import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  reactCompiler: true, //开启即可
}
 
export default nextConfig
```

### 什么是App Router?
Next.js 有两套路由系统，一个是旧的`Pages Router`路由系统，一个是新的`App Router`路由系统。

首先Next.js 首推的是`App Router`路由系统

* `Pages Router`的路由系统是会把`pages`目录下的所有`jsx/tsx`文件，都转换成路由，例如`pages/index.tsx`会转换成/路由，`pages/about.tsx`会转换成`/about`路由，这样导致我们不能把组件写到`pages`目录下。

目录结构如下
```txt
 └── pages
    ├── index.tsx -> /
    ├── login.tsx -> /login
    ├── api
    │   └── user.tsx -> /api/user
    ├── posts
    │   └── [id].tsx -> /posts/[id]
    └── blog
        ├── index.tsx -> /blog
        └── setting.tsx -> /blog/setting
```

* `App Router` 的路由系统是根据约定定义的，目录结构如下

```txt
src/
└── app
    ├── page.tsx -> / 首页
    ├── layout.tsx -> 布局组件
    ├── template.tsx -> 模板组件
    ├── loading.tsx -> 加载组件
    ├── error.tsx -> 错误组件
    └── not-found.tsx -> 404组件
    ├── xiaoman
    │   └── page.tsx -> /xiaoman 小满页面
    └── daman
        └── page.tsx -> /daman 大满页面
```

* `Pages Router` 读取数据需要使用 `getServerSideProps` / `getStaticProps` / `getStaticPaths` 等函数，而`App Router`则不需要，直接在组件中使用fetch调用即可。

**Pages Router:**
```ts
export async function getServerSideProps() {
  const res = await fetch('xxx');
  const data = await res.json();
  return { props: { data } };
}
export default function Home({ data }) {
  return <div>{data.name}</div>;
}
```

**App Router:**
```ts
export default async function Home() {
  const res = await fetch('xxx');
  const data = await res.json();
  return <div>{data.name}</div>;
}
```

## Next.js第三章(App Router)
### Next.js 路由基础
Next.js 采用基于`文件系统`的路由机制，这意味着您只需创建文件和文件夹，框架就会自动为您生成对应的路由结构。这种约定优于配置的设计理念，让路由管理变得简单而直观。

**文件系统路由的工作原理**
在 Next.js 中，app 目录下的每个文件夹都代表一个路由段（route segment），并直接映射到 URL 路径。无需配置路由表，框架会根据您的文件结构自动处理。

**page(页面)**
```txt
app/
├── page.tsx               # /
├── about/
│   └── page.tsx           # /about
├── blog/test
│        └── page.tsx      # /blog/test
└── contact/
    └── page.tsx           # /contact
```

**layout && template**

`layout` (布局) 布局是多个页面共享UI，例如导航栏、侧边栏、底部等。

`template` (模板) 基本功能跟布局一样，只是不会保存状态

* 布局和模板的特点就是：
* 布局嵌套：支持多层布局嵌套，构建复杂的页面结构
* 状态管理：布局会在页面切换时保持状态，而模板会重新渲染
* 根布局：`app/layout.tsx` 是必须存在的根布局文件
* 渲染顺序：当布局和模板同时存在时，渲染顺序为 `layout → template → page`

**目录结构如下:**
```ts
'use client' //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react"
export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Blog 布局组件</h1>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <h1>数量： {count}</h1>
            <hr />
            {children}
        </div>
    )
}
```
**app/blog/layout.tsx**
```ts
'use client' //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react"
export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Blog 布局组件</h1>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <h1>数量： {count}</h1>
            <hr />
            {children}
        </div>
    )
}
```
**app/blog/template.tsx**
```ts
'use client' //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react"
export default function BlogTemplate({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Blog Template</h1>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <h1>数量： {count}</h1>
            <hr />
            {children}
        </div>
    )
}
```
**app/blog/a/page.tsx**
```ts
import Link from "next/link"
export default function APage() {
    return (
        <div>
            <h1>A Page</h1>
            <Link href="/blog/b">跳转B</Link>
        </div>
    )
}
```
**app/blog/b/page.tsx**
```ts
import Link from "next/link"
export default function BPage() {
    return (
        <div>
            <h1>B Page</h1>
            <Link href="/blog/a">跳转A</Link>
        </div>
    )
}
```
### loading(加载)
Next.js的loading是借助了`Suspense`实现的，Suspense的具体用法请参考Suspense 组件

**app/blog/loading.tsx**
```ts
export default function Loading() {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}
```
**app/blog/a/page.tsx**
```ts
import Link from "next/link"
const getData = async () => {
  //触发异步会自动跳转到loading组件 异步结束正常返回页面
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("数据")
    }, 5000)
  })
}
export default async function APage() {
    const data = await getData()
    console.log(data)
    return (
        <div>
            <h1>A Page</h1>
            <Link href="/blog/b">跳转B</Link>
        </div>
    )
}
```
### error(错误)
Next.js的error是借助了`Error Boundary`实现的。

**app/blog/error.tsx**
```ts
'use client' //错误组件必须是客户端组件
export default function Error() {
    return (
        <div>
            <h1>Error</h1>
        </div>
    )
}
```
**app/blog/a/page.tsx**
```
import Link from "next/link"
export default async function APage() {
   //遇到异常会自动跳转到error组件
    throw new Error("错误")
    return (
        <div>
            <h1>A Page</h1>
            <Link href="/blog/b">跳转B</Link>
        </div>
    )
}
```

### not-found(404)
其实Next.js 默认会生成一个404页面，但我们可能自定义404页面，只需要在app目录下创建一个`not-found.tsx`文件即可

**app/not-found.tsx**
```ts
export default function NotFound() {
    return (
        <div>
            <h1>404 Page</h1>
        </div>
    )
}
```


### Next.js第四章(路由导航)









































































































## Next.js第四章(路由导航)

### 路由导航
路由导航是指我们在`Next.js`中跳转页面的方式，例如原始的`<a>`标签，等。

在Next.js中，共有四种方式提供跳转:

* `Link` 组件
* `useRouter Hook` (客户端组件)
* `redirect` 函数 (服务端组件)
* `History API` (浏览器API 本文略过用的不多 了解即可)

### Link组件
`<Link>`是一个内置组件，在a标签的基础上扩展了功能，并且还能用来实现预获取(prefetching)，以及保持滚动位置(scroll)等。

**基本用法**
```ts
import Link from "next/link" //引入Link组件
export default function Home() {
    return (
        <div>
            <Link href="/about">跳转About页面</Link>
            <Link href={{pathname: "/about", query: {name: "张三"}}}>跳转About并且传入参数</Link>
            <Link href="/page" prefetch={true}>预获取page页面</Link>
            <Link href="/xm" scroll={true}>保持滚动位置</Link>
            <Link href="/daman" replace={true}>替换当前页面</Link>
        </div>
    )
}
```
**支持动态渲染**
```ts
import Link from "next/link"
export default function Page() {
    const arr = [1, 2, 3, 4, 5]
    return arr.map((item) => (
        <Link key={item} href={`/page/${item}`}>动态渲染的Link</Link>
    ))
}
```

### useRouter Hook
useRouter 可以在代码中根据逻辑跳转页面，例如根据用户权限跳转不同的页面。

使用该hook需要在客户端组件中。需要在顶层编写 `'use client'` 声明这是客户端组件。
```ts
'use client'
import { useRouter } from "next/navigation"
export default function Page() {
    const router = useRouter()
    return (
        <>
        <button onClick={() => router.push("/page")}>跳转page页面</button>
        <button onClick={() => router.replace("/page")}>替换当前页面</button>
        <button onClick={() => router.back()}>返回上一页</button>
        <button onClick={() => router.forward()}>跳转下一页</button>
        <button onClick={() => router.refresh()}>刷新当前页面</button>
        <button onClick={() => router.prefetch("/about")}>预获取about页面</button>
        </>
    )
}
```

### redirect 函数
redirect 函数可以用于服务端组件/客户端组件中跳转页面，例如根据用户权限跳转不同的页面。

**在Next.js中 redirect的状态是：307临时重定向**
```ts
import { redirect } from "next/navigation"
export default async function Page() {
   const checkLogin = await checkLogin()
   //如果用户未登录，则跳转到登录页面
   if (!checkLogin) {
    redirect("/login")
   }
   return (
    <div>
        <h1>Page</h1>
    </div>
   )
}
```

### permanentRedirect 函数
permanentRedirect 跟上面的redirect的区别是：permanentRedirect是永久重定向，而redirect是临时重定向。

**在Next.js中 permanentRedirect的状态是：308永久重定向**
```ts
//用法跟redirect一样，只是状态码不同
import { permanentRedirect } from "next/navigation"
export default async function Page() {
   const checkLogin = await checkLogin()
   if (!checkLogin) {
    permanentRedirect("/login")
   }
}
```

### permanentRedirect / redirect 参数说明
这两个函数都接受以下参数：

* `path`：字符串类型，表示重定向的目标 URL（支持相对路径和绝对路径）
* `type`：可选参数，值为 `replace` 或 `push` ，用于控制重定向的行为

关于 `type` 参数的默认行为：

* 在 **Server Actions** 中：默认使用 **push**，会将新页面添加到浏览器历史记录
* 在 **其他场景** 中：默认使用 **replace**，会替换当前的浏览器历史记录
你可以通过显式指定 **type** 参数来覆盖默认行为。

:::warning
注意：`type` 参数在服务端组件中无效，仅在客户端组件和 Server Actions 中生效。
:::

## Next.js第五章(动态路由)
动态路由
动态路由是指在路由中使用方括号[]来定义路由参数，例如/blog/[id]，其中[id]就是动态路由参数，因为在某些需求下，我们需要根据不同的id来显示不同的页面内容，例如商品详情页，文章详情页等。

基本用法`[slug]`
使用动态路由只需要在文件夹名加上方括号`[]`即可，例如`[id],[params]`等，名字可以自定义。

来看demo: 我们在`app/shop`目录下创建一个`[id]`目录


```ts
//app/shop/[id]/page.tsx
export default function Page() {
    return <div>Page</div>
}
```
访问路径为:`http://localhost:3000/shop/123` 其中`123`就是动态路由参数，这个可以是任意值。

### 路由片段[…slug]
我们如果需要捕获多个路由参数，例如`/shop/123/456`，我们可以使用路由片段来捕获多个路由参数，他的用法就是`[...slug]`，其中slug就是路由片段，这个名字可以自定义，后面的片段有多少就捕获多少。
```ts
//app/shop/[...id]/page.tsx
export default function Page() {
    return <div>Page</div>
}
```
访问路径为:`http://localhost:3000/shop/123/456/789` 其中 `123` 和 `456` 和 `789` 就是动态路由参数，后面的片段有多少就捕获多少。

### 可选路由[[…slug]]
可选路由指的是，我们可能会有这个路由参数，也可能会没有这个路由参数，例如`/shop/123`，也可能是`/shop`，我们可以使用可选路由来捕获这个路由参数，他的用法就是`[[...slug]]`，其中`slug`就是路由片段，这个名字可以自定义，后面的片段有多少就捕获多少。
```ts
//app/shop/[[...id]]/page.tsx
export default function Page() {
    return <div>Page</div>
}
```
* 访问路径为:`http://localhost:3000/shop`，可以没有参数
* 访问路径为:`http://localhost:3000/shop/123`，可以有参数
* 访问路径为:`http://localhost:3000/shop/123/456`，可以有多个参数
这种方式比较灵活。

### 接受参数 useParams
使用 `useParams` hook来接受参数，这个hook只能在客户端组件中使用。
```ts
'use client'
import { useParams } from "next/navigation";
export default function ShopPage() {
  const params = useParams();
  console.log(params); //{id: '123'}  {id: ['123', '456']} 接受单个值以及多个值
  return <div>ShopPage</div>;
}
```

## Next.js第六章(平行路由)
### 平行路由
平行路由指的是在同一布局 `layout.tsx` 中，可以同时渲染多个页面，例如 `team`，`analytics`等，这个东西跟`vue`的`router-view`类似。

### 基本用法
平行路由的使用方法就是通过`@` + 文件夹名来定义，例如`@team`，`@analytics`等，名字可以自定义。
:::warning
平行路由也不会影响URL路径。
:::
定义完成之后，我们就可以在`layout.tsx`中使用`team`和`analytics`来渲染对应的页面，他会自动注入`layout`的props里面

:::warning
注意：例子中我们使用了解构的语法，这里面的名称`team,analytics`需跟文件夹名称一致。
:::
```ts
export default function RootLayout({children,team,analytics}: 
{children: React.ReactNode,team: React.ReactNode,analytics: React.ReactNode}
) {
    return (
        <html>
            <body>
                {team}
                {children}
                {analytics}
            </body>
        </html>
    )
}
```

### 独立路由
当我们使用了平行路由之后，我们为其单独定义`loading,error`,等组件使其拥有独立加载和错误处理的能力。

### default.tsx
首先我们先认识一下子导航，每一个平行路由下面还可以接着创建对应的路由，例如@team下面可以接着创建`@team/setting`，`@team/user`等。

那我们的目录结构就是：
```txt
├── @team
│   ├── page.tsx
│   ├── setting
│   │   └── page.tsx
└── @analytics
│    └── page.tsx
└── layout.tsx   
└── page.tsx
```
然后我们使用 `Link` 组件跳转子导航 `setting` 页面
```ts
import Link from "next/link"
export default function RootLayout({children,team,analytics}: 
{children: React.ReactNode,team: React.ReactNode,analytics: React.ReactNode}) {
    return (
        <html>
            <body>
                {team}
                {children}
                {analytics}
                <Link className="text-blue-500 block" href="/setting">Setting</Link>
            </body>
        </html>
    )
}
```

子导航使用 `Link` 组件跳转 `setting` 页面时，是没有问题的，但是我们在跳转之后刷新页面，就出现`404`了，这是怎么回事?

当使用软导航 `Link` 组件跳转子页面的时候，这时候 `@analytics` 和 `children` 依然保持活跃，所以他只会替代`@team`里面的内容。
而当我们使用硬导航浏览器页面刷新,此时`@analytics` 和 `children` 已经失活，因为它的底层原理其实是同时匹配`@team`和`@analytics`，`children` 目录下面的`setting` 页面，但是只有`@team `有这个页面，其他两个没有，所以导致`404`。
解决方案：使用`default.tsx`来进行兜底，确保不会 `404`

* `@analytics/default.tsx` 定义`default.tsx`文件
* `app/default.tsx` 定义`default.tsx`文件

## Next.js第七章(路由组)

### 路由组
路由组也是一种基于文件夹的约定范式，可以让我们开发者，按类别或者团队组织路由模块，并且不影响 URL 路径。

用法：只需要通过`(groupName)`包裹住文件夹名即可，例如`(shop)`，`(user)`等，名字可以自定义。

### 定义多个根布局
这种一般是大型项目使用的，例如我们需要把， `后台管理系统` 和 `前台的门户网站` ，放到一个项目就可以使用这种方法实现。
使用方法：

1. 先把 `app` 目录下的 `layout.tsx` 文件删除
2. 在每组的目录下创建 `layout.tsx` 文件，并且定义`html,body`标签。

## Next.js第八章(路由处理程序)

### 路由处理程序(Route Handlers)
路由处理程序，可以让我们在Next.js中编写API接口，并且支持与客户端组件的交互，真正做到了什么叫**前后端分离人不分离**。

文件结构
定义前端路由页面我们使用的`page.tsx`文件，而定义API接口我们使用的`route.ts`文件，并且他两都不受文件夹的限制，可以放在任何地方，只需要文件的名称以`route.ts`结尾即可。

:::warning
注意：`page.tsx`文件和`route.ts`文件不能放在同一个文件夹下，否则会报错，因为`Next.js`就搞不清到底用哪一个了，所以我们最好把前后端代码分开
:::

为此我们可以定义一个api文件夹，然后在这个文件夹下创建一对应的模块例如 `user` `login` `register` 等。

目录结构如下
```txt
app/
├── api
│   ├── user
│   │   └── route.ts
│   ├── login
│   │   └── route.ts
│   └── register
│       └── route.ts
```

### 定义请求
Next.js是遵循`RESTful API`的规范，所以我们可以使用HTTP方法来定义请求。

```ts
export async function GET(request) {}
 
export async function HEAD(request) {}
 
export async function POST(request) {}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}
 
//如果没有定义OPTIONS方法，则Next.js会自动实现OPTIONS方法
export async function OPTIONS(request) {}
```
:::warning
注意: 我们在定义这些请求方法的时候`不能修改方法名称而且必须是大写`，否则无效。
:::
工具准备: 打开vsCode / Cursor 找到插件市场搜索`REST Client`，安装完成后，我们可以使用`REST Client`来测试API接口。

### 定义GET请求
`src/app/api/user/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams; //接受url中的参数
    console.log(query.get('id'));
    return NextResponse.json({ message: 'Get request successful' }); //返回json数据
}
```
**`REST client`测试:**

在 `src` 目录新建 `test.http` 文件，编写测试请求

`src/test.http`
```http
GET http://localhost:3000/api/user?id=123 HTTP/1.1
```


### 定义Post请求
`src/app/api/user/route.ts`
```ts
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest){
    //const body = await request.formData(); //接受formData数据
    //const body = await request.text(); //接受text数据
    //const body = await request.arrayBuffer(); //接受arrayBuffer数据
    //const body = await request.blob(); //接受blob数据
    const body = await request.json(); //接受json数据
    console.log(body); //打印请求体中的数据
    return NextResponse.json({ message: 'Post request successful', body },{status: 201});
     //返回json数据
}
```
REST client测试:

`src/test.http`
```http
POST http://localhost:3000/api/user HTTP/1.1
Content-Type: application/json

{
    "name": "张三",
    "age": 18
}
```

### 动态参数
我们可以在路由中使用方括号`[]`来定义动态参数，例如`/api/user/[id]`，其中`[id]`就是动态参数，这个参数可以在请求中传递，这个跟前端路由的动态路由类似。

`src/app/api/user/[id]/route.ts`

接受动态参参数，需要在第二个参数解构`{ params }`,需注意这个参数是异步的，所以需要使用`await`来等待参数解析完成
```ts
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, 
{ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);
    return NextResponse.json({ message: `Hello, ${id}!` });
}
```

REST client测试:

`src/test.http`
```http
GET http://localhost:3000/api/user/886 HTTP/1.1
```

### cookie
Next.js也内置了cookie的操作可以方便让我们读写，接下来我们用一个登录的例子来演示如何使用cookie。

安装手动挡组件库[shadcn/ui官网地址](https://ui.shadcn.com/)
```sh
npx shadcn@latest init 
```
为什么使用这个组件库？因为这个组件库是把组件放入你项目的目录下面，这样做的好处是可以让你随时修改组件库样式，并且还能通过AI分析修改组件库

安装`button`,`input`组件
```sh
npx shadcn@latest add button
npx shadcn@latest add input
```
新建login接口
`src/app/api/login/route.ts`

```ts
import { cookies } from "next/headers"; //引入cookies
import { NextRequest, NextResponse } from "next/server"; //引入NextRequest, NextResponse
//模拟登录成功后设置cookie
export async function POST(request: NextRequest) {
    const body = await request.json();
    if(body.username === 'admin' && body.password === '123456'){
        const cookieStore = await cookies(); //获取cookie
        cookieStore.set('token', '123456',{
            httpOnly: true, //只允许在服务器端访问
            maxAge: 60 * 60 * 24 * 30, //30天
        });
        return NextResponse.json({ code: 1 }, { status: 200 });
    }else{
        return NextResponse.json({ code: 0 }, { status: 401 });
    }
}
//检查登录状态
export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if(token && token.value === '123456'){
        return NextResponse.json({ code:1 }, { status: 200 });
    }else{
        return NextResponse.json({ code:0 }, { status: 401 });
    }
}
```
`src/app/page.tsx`
```ts
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default  function HomePage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.code === 1){
                router.push('/home');
            }
        });
    }
    return (
        <div className='mt-10 flex flex-col items-center justify-center gap-4'>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className='w-[250px]' placeholder="请输入用户名" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className='w-[250px]' placeholder="请输入密码" />
            <Button onClick={handleLogin}>登录</Button>
        </div>
    )
}
```
`src/app/home/page.tsx`
```ts
'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
const checkLogin = async () => {
    const res = await fetch('/api/login');
    const data = await res.json();
    if (data.code === 1) {
        return true;
    } else {
        redirect('/');
    }
}
export default function HomePage() {
    useEffect(() => {
        checkLogin()    
    }, []);
    return <div>你已经登录进入home页面</div>;
}
```

## Next.js第九章(AI)
**AI**
Vercel提供了[AI SDK](https://gitcode.com/gh_mirrors/sdk1/sdk?utm_source=highlight_word_gitcode&word=sdk&isLogin=1&from_link=ac33515aed719ceb8760c88bba0c2e07)，可以让我们在`Next.js`中轻松集成`AI功能`。[AI SDK 官网](https://ai-sdk.dev/getting-started)

### 安装AI-SDK
```sh
npm i ai @ai-sdk/deepseek @ai-sdk/react
```

这儿我们使用`deepseek`作为AI模型，`@ai-sdk/react`封装了流式输出和上下文管理hook，可以让我们在Next.js中轻松集成AI功能。如果你要安装其他模型，只需要将`deepseek`替换为其他模型即可。

例如：安装`openai`模型

```sh
npm i ai @ai-sdk/openai @ai-sdk/react
```

**编写API接口**
`src /app/api/chat/route.ts`
```ts
import { NextRequest } from "next/server";
import { streamText,convertToModelMessages } from 'ai'
import { createDeepSeek } from "@ai-sdk/deepseek";
import { DEEPSEEK_API_KEY } from "./key";
const deepSeek = createDeepSeek({
    apiKey: DEEPSEEK_API_KEY, //设置API密钥
});
export async function POST(req: NextRequest) {
    const { messages } = await req.json(); //获取请求体
    //这里为什么接受messages 因为我们使用前端的useChat 他会自动注入这个参数，所有可以直接读取
    const result = streamText({
        model: deepSeek('deepseek-chat'), //使用deepseek-chat模型
        messages:convertToModelMessages(messages), //转换为模型消息
        //前端传过来的额messages不符合sdk格式所以需要convertToModelMessages转换一下
        //转换之后的格式：
        //[
            //{ role: 'user', content: [ [Object] ] },
            //{ role: 'assistant', content: [ [Object] ] },
            //{ role: 'user', content: [ [Object] ] },
            //{ role: 'assistant', content: [ [Object] ] },
            //{ role: 'user', content: [ [Object] ] },
            //{ role: 'assistant', content: [ [Object] ] },
            //{ role: 'user', content: [ [Object] ] }
        //]
        system: '你是一个高级程序员，请根据用户的问题给出回答', //系统提示词
    });
   
    return result.toUIMessageStreamResponse() //返回流式响应
}
```

`src/app/page.tsx`
我们在前端使用 `useChat` 组件来实现AI对话，这个组件内部封装了流式响应，默认会向 `/api/chat` 发送请求。

* `messages`: 消息列表，包含用户和AI的对话内容
* `sendMessage`: 发送消息的函数，参数为消息内容
* `onFinish`: 消息发送完成后回调函数，可以在这里进行一些操作，例如清空输入框

**messages：数据结构解析**
```ts
[
    {
        "parts": [
            {
                "type": "text", //文本类型
                "text": "你知道 api router 吗"
            }
        ],
        "id": "FPHwY1udRrkEoYgR", //消息ID
        "role": "user" //用户角色
    },
    {
        "id": "qno6vcWcwFM4Yc8J", //消息ID
        "role": "assistant", //AI角色
        "parts": [
            {
                "type": "step-start" //步骤开始 
            },
            {
                "type": "text", //文本类型
                "text": "是的，我知道 **API Router**。", //文本内容
                "state": "done" //步骤完成
            }
        ]
    }
]
```

```ts
'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';

export default function HomePage() {
    const [input, setInput] = useState(''); //输入框的值
    const messagesEndRef = useRef<HTMLDivElement>(null); //获取消息结束的ref
    //useChat 内部封装了流式响应 默认会向/api/chat 发送请求
    const { messages, sendMessage } = useChat({
        onFinish: () => {
            setInput('');
        }
    });

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    //回车发送消息
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                sendMessage({ text: input });
            }
        }
    };

    return (
        <div className='flex flex-col h-screen bg-linear-to-br from-blue-50 via-white to-purple-50'>
            {/* 头部标题 */}
            <div className='bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200'>
                <div className='max-w-4xl mx-auto px-6 py-4'>
                    <h1 className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        AI 智能助手
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>随时为您解答问题</p>
                </div>
            </div>

            {/* 消息区域 */}
            <div className='flex-1 overflow-y-auto px-4 py-6'>
                <div className='max-w-4xl mx-auto space-y-4'>
                    {messages.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full text-center py-20'>
                            <div className='bg-linear-to-br from-blue-100 to-purple-100 rounded-full p-6 mb-4'>
                                <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                                </svg>
                            </div>
                            <h2 className='text-xl font-semibold text-gray-700 mb-2'>开始对话</h2>
                            <p className='text-gray-500'>输入您的问题，我会尽力帮助您</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                            >
                                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* 头像 */}
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                                        message.role === 'user' 
                                            ? 'bg-linear-to-br from-blue-500 to-blue-600' 
                                            : 'bg-linear-to-br from-purple-500 to-purple-600'
                                    }`}>
                                        {message.role === 'user' ? '你' : 'AI'}
                                    </div>
                                    
                                    {/* 消息内容 */}
                                    <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                                            message.role === 'user'
                                                ? 'bg-linear-to-br from-blue-500 to-blue-600 text-white'
                                                : 'bg-white border border-gray-200 text-gray-800'
                                        }`}>
                                            {message.parts.map((part, index) => {
                                                switch (part.type) {
                                                    case 'text':
                                                        return (
                                                            <div key={message.id + index} className='whitespace-pre-wrap wrap-break-word'>
                                                                {part.text}
                                                            </div>
                                                        );
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 输入区域 */}
            <div className='bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-lg'>
                <div className='max-w-4xl mx-auto px-4 py-4'>
                    <div className='flex gap-3 items-end'>
                        <div className='flex-1 relative'>
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='请输入你的问题... (按 Enter 发送，Shift + Enter 换行)'
                                className='min-h-[60px] max-h-[200px] resize-none rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm'
                            />
                        </div>
                        <Button
                            onClick={() => {
                                if (input.trim()) {
                                    sendMessage({ text: input });
                                }
                            }}
                            disabled={!input.trim()}
                            className='h-[60px] px-6 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

## Next.js第十章(Proxy)
**Proxy代理**
:::warning
从 Next.js 16 开始，中间件 `Middleware` 更名为代理`（Proxy）`，以更好地体现其用途。其功能保持不变
:::

如果你想升级为16.x版本，Next.js提供了命令行工具来帮助你升级，只需要执行以下命令即可

```bash
npx @next/codemod@canary middleware-to-proxy .
```
代码转换会将文件和函数名从middleware重命名为proxy。
```ts
// middleware.ts -> proxy.ts
 
// - export function middleware() {
// + export function proxy() {
```

### 基本使用
应用场景：

* 处理跨域请求
* 接口转发例如/api/user -> (可能是其他服务器java/go/python等) -> /api/user
* 限流例如配合第三方服务做限流
* 鉴权/判断是否登录

Prxoy代理其实跟拦截器类似，它可以在请求完成之前进行拦截，然后进行一些处理，例如：修改请求头、修改请求体、修改响应体等。

`src/proxy.ts` 定义`proxy`函数导出即可，`Next.js`会自动调用这个函数。
```ts
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
    console.log(request.url,'url');
}
```
但是你会发现，他会拦截项目中所有的请求，包括静态资源、API请求、页面请求等。
```txt
http://localhost:3000/.well-known/appspecific/com.chrome.devtools.json url
http://localhost:3000/_next/static/chunks/src_app_globals_91e4631d.css url
http://localhost:3000/_next/static/chunks/%5Bturbopack%5D_browser_dev_hmr-client_hmr-client_ts_cedd0592._.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_1dd7fb59.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_a0e4c7b4._.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_a38d7d69._.js url
http://localhost:3000/_next/static/chunks/node_modules_next_dist_4b2403f5._.js url
http://localhost:3000/_next/static/chunks/src_app_globals_91e4631d.css.map url
http://localhost:3000/_next/static/chunks/node_modules_%40swc_helpers_cjs_d80fb378._.js url
http://localhost:3000/_next/static/chunks/_a0ff3932._.js url
http://localhost:3000/api/login url
```

### 配置(config)
例如我们只想匹配`'/api'`下面的路径去做一些事情，我们可以使用`config`配置来实现。
```ts
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
    console.log(request.url,'url');
}
//配置匹配路径
export const config = {
    matcher: '/api/:path*',
    //matcher: ['/api/:path*','/api/user/:path*'], 支持单个以及多个路径匹配
    //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], 同样支持正则表达式匹配
}
```
结合之前的案例,在`cookie`那一集，我们还需要单独定义check接口检查cookie，现在我们可以直接在proxy中实现。
```ts
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
    const cookie = request.cookies.get('token');
    if (request.nextUrl.pathname.startsWith('/home') && !cookie) {
        console.log('redirect to login');
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (cookie && cookie.value) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/api/:path*', '/home/:path*'],
}
```
**复杂匹配**
* `source`: 表示匹配路径
* `has`: 表示匹配路径中必须(包含)某些条件
* `missing`: 表示匹配路径中(必须不包含)某些条件

type 只能匹配: header, query, cookie
```ts
import { NextRequest, NextResponse } from "next/server";
import { ProxyConfig } from "next/server";
export async function proxy(request: NextRequest) {
   console.log('start proxy')
   return NextResponse.next();
}

export const config: ProxyConfig = {
    matcher: [
        {
            source: '/home/:path*',
            //表示匹配路径中必须(包含)Authorization头和userId查询参数
            has: [
                { type: 'header', key: 'Authorization', value: 'Bearer 123456' },
                { type: 'query', key: 'userId', value: '123' }
            ],
            //表示匹配路径中(必须不包含)cookie和userId查询参数
            missing: [
                { type: 'cookie', key: 'token', value: '123456' },
                { type: 'query', key: 'userId', value: '456' },
            ]
        },
    ]
}
```

访问url为：`http://localhost:3000/home?userId=123`

**案例实战(处理跨域)**
只要是/api下面的接口都可以被任意访问
```ts
import { NextRequest, NextResponse } from "next/server";
import { ProxyConfig } from "next/server";
export async function proxy(request: NextRequest) {
    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    })
    return response;
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const config: ProxyConfig = {
   matcher:'/api/:path*',
}
```






























































