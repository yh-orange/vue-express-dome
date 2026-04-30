# Next.js

## Next.js 第一章(入门)

**开始使用 Next.js**
欢迎来到 `Next.js` 学习之旅！本教程将带你从零开始创建你的第一个 `Next.js` 应用。

我们所学的版本是 16.0.2

**什么是 Next.js？**
Next.js 是一个基于 React 全栈框架，由 Vercel 开发和维护，那么它有什么优势呢？

- **SSR** ：服务端渲染，可以提高页面加载速度(现在会 SSR 的人才并不多，可以提升你的竞争力)
- **SSG** ：静态站点生成，可以生成静态页面，类似于 Vitepress / Astro 等静态站点生成工具
- **SEO** : Next.js 提供了 SEO 优化，让你的网站更容易被搜索引擎收录
- **AI** : Vercel 提供了 AI SDK 可以跟 Next.js 轻松结合，让你可以轻松实现 AI 应用
- **服务端操作** : Next.js 提供了服务端操作，顺便学习服务端知识，为以后做全栈开发打下基础
- **社区丰富** : Next.js 拥有庞大的社区，可以让你轻松找到解决方案
- **部署** : 支持多种部署选项，与 Vercel 等平台集成良好，可以快速部署

**前置知识**

在学习 Next.js 之前，你需要掌握以下知识：

- HTML `熟练使用`
- CSS `熟练使用`
- JavaScript `熟练使用`
- TypeScript `基本使用即可`
- React `熟练使用`
- Node.js `基本使用即可`

**Next.js 市场情况**
截止：2025 年 11 月 11 日，`npm` 下载量

Next.js: `13,294,097`
Nuxt.js: `956,540`
Astro: `747,707`
SvelteKit: `626,494`
**环境准备**
Node.js 环境 [下载地址:](https://nodejs.org/en/download) 注：最低版本要求 20.9,主包用的是 22.17.0
代码编辑器 Vscode Cursor webStorm 等皆可，不要用记事本就行。

## Next.js 第二章(项目搭建)

**Next.js 项目搭建**

创建项目
快速入门

注： 当前教程为 16.0.2 版本，最低 Node.js 版本为 20.9.0

```bash
npx create-next-app@latest
```

接下来会有几个问题需要你选择，根据你的需求选择即可

- What is your project named? » my-app `项目名称（必填）`
- Would you like to use the recommended Next.js defaults? `是否使用推荐配置` 这里我选自定义配置 `No, customize settings`
- Would you like to use TypeScript? » No / Yes `是否使用TypeScript` 这里我选是 `Yes`
- Which linter would you like to use? » ESLint / Biome / None `是否使用ESLint` 这里我选是 `None`
- Would you like to use React Compiler? » No / Yes `是否使用React Compiler` 这里我选是 `Yes`
- Would you like to use Tailwind CSS? » No / Yes `是否使用Tailwind CSS` 这里我选是 `Yes`
- Would you like to use src/app directory? » No / Yes `是否使用src/app目录` 这里我选是 `Yes`
- Would you like to use App Router? (recommended) » No / Yes `是否使用App Router` 这里我选是 `Yes`
- Would you like to use Turbopack? (recommended) » No / Yes `是否使用Turbopack` 这里我选是 `Yes`
- Would you like to customize the import alias (@/_ by default)? » No / Yes 是否自定义导入别名 `@/_`这里我选是`Yes`
- What import alias would you like configured? » @/_ 是否自定义导入别名 `@/_`这里我选是 默认`@/\*`

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
**什么是 Turbopack？**
`Turbopack` 是一个增量打包器，用于取代`webpack`,它是用`Rust语言`编写,并且`Turbopack`转换`js/ts`使用的是 `SWC`,他比 vite 快 10 倍，比 webpack 快 700 倍，速度更快，性能更优。

核心原理：Turbopack 是函数级别的缓存，可以将某些函数，进行标记，当这些函数被调用时，会记住他们被调用的内容，保存到缓存中。

首先我们看到有两个文件`api.ts/ sdk.ts` 都调用了 readFile 函数，然后把这两个文件打包成 bundle,然后拼接起来,最后打成一个 fullBundle

### 什么是 React Compiler?

`React Compiler` 是 `Next.js` 用于自动优化组件渲染来提高性能的工具，在之前的话，我们需要手动优化 `useMemo` / `useCallback` / `memo` 等，现在 `Next.js` 会自动优化，你只需要写代码即可,减少心智负担。

如何开启 React Compiler? `如果你在选项中选择yes则无需安装`

```bath
npm install -D babel-plugin-react-compiler
```

next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, //开启即可
};

export default nextConfig;
```

### 什么是 App Router?

Next.js 有两套路由系统，一个是旧的`Pages Router`路由系统，一个是新的`App Router`路由系统。

首先 Next.js 首推的是`App Router`路由系统

- `Pages Router`的路由系统是会把`pages`目录下的所有`jsx/tsx`文件，都转换成路由，例如`pages/index.tsx`会转换成/路由，`pages/about.tsx`会转换成`/about`路由，这样导致我们不能把组件写到`pages`目录下。

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

- `App Router` 的路由系统是根据约定定义的，目录结构如下

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

- `Pages Router` 读取数据需要使用 `getServerSideProps` / `getStaticProps` / `getStaticPaths` 等函数，而`App Router`则不需要，直接在组件中使用 fetch 调用即可。

**Pages Router:**

```ts
export async function getServerSideProps() {
  const res = await fetch("xxx");
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
  const res = await fetch("xxx");
  const data = await res.json();
  return <div>{data.name}</div>;
}
```

## Next.js 第三章(App Router)

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

`layout` (布局) 布局是多个页面共享 UI，例如导航栏、侧边栏、底部等。

`template` (模板) 基本功能跟布局一样，只是不会保存状态

- 布局和模板的特点就是：
- 布局嵌套：支持多层布局嵌套，构建复杂的页面结构
- 状态管理：布局会在页面切换时保持状态，而模板会重新渲染
- 根布局：`app/layout.tsx` 是必须存在的根布局文件
- 渲染顺序：当布局和模板同时存在时，渲染顺序为 `layout → template → page`

**目录结构如下:**

```ts
"use client"; //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Blog 布局组件</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h1>数量： {count}</h1>
      <hr />
      {children}
    </div>
  );
}
```

**app/blog/layout.tsx**

```ts
"use client"; //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Blog 布局组件</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h1>数量： {count}</h1>
      <hr />
      {children}
    </div>
  );
}
```

**app/blog/template.tsx**

```ts
"use client"; //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react";
export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Blog Template</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h1>数量： {count}</h1>
      <hr />
      {children}
    </div>
  );
}
```

**app/blog/a/page.tsx**

```ts
import Link from "next/link";
export default function APage() {
  return (
    <div>
      <h1>A Page</h1>
      <Link href="/blog/b">跳转B</Link>
    </div>
  );
}
```

**app/blog/b/page.tsx**

```ts
import Link from "next/link";
export default function BPage() {
  return (
    <div>
      <h1>B Page</h1>
      <Link href="/blog/a">跳转A</Link>
    </div>
  );
}
```

### loading(加载)

Next.js 的 loading 是借助了`Suspense`实现的，Suspense 的具体用法请参考 Suspense 组件

**app/blog/loading.tsx**

```ts
export default function Loading() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
```

**app/blog/a/page.tsx**

```ts
import Link from "next/link";
const getData = async () => {
  //触发异步会自动跳转到loading组件 异步结束正常返回页面
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("数据");
    }, 5000);
  });
};
export default async function APage() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <h1>A Page</h1>
      <Link href="/blog/b">跳转B</Link>
    </div>
  );
}
```

### error(错误)

Next.js 的 error 是借助了`Error Boundary`实现的。

**app/blog/error.tsx**

```ts
"use client"; //错误组件必须是客户端组件
export default function Error() {
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
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

其实 Next.js 默认会生成一个 404 页面，但我们可能自定义 404 页面，只需要在 app 目录下创建一个`not-found.tsx`文件即可

**app/not-found.tsx**

```ts
export default function NotFound() {
  return (
    <div>
      <h1>404 Page</h1>
    </div>
  );
}
```

### Next.js 第四章(路由导航)

## Next.js 第四章(路由导航)

### 路由导航

路由导航是指我们在`Next.js`中跳转页面的方式，例如原始的`<a>`标签，等。

在 Next.js 中，共有四种方式提供跳转:

- `Link` 组件
- `useRouter Hook` (客户端组件)
- `redirect` 函数 (服务端组件)
- `History API` (浏览器 API 本文略过用的不多 了解即可)

### Link 组件

`<Link>`是一个内置组件，在 a 标签的基础上扩展了功能，并且还能用来实现预获取(prefetching)，以及保持滚动位置(scroll)等。

**基本用法**

```ts
import Link from "next/link"; //引入Link组件
export default function Home() {
  return (
    <div>
      <Link href="/about">跳转About页面</Link>
      <Link href={{ pathname: "/about", query: { name: "张三" } }}>
        跳转About并且传入参数
      </Link>
      <Link href="/page" prefetch={true}>
        预获取page页面
      </Link>
      <Link href="/xm" scroll={true}>
        保持滚动位置
      </Link>
      <Link href="/daman" replace={true}>
        替换当前页面
      </Link>
    </div>
  );
}
```

**支持动态渲染**

```ts
import Link from "next/link";
export default function Page() {
  const arr = [1, 2, 3, 4, 5];
  return arr.map((item) => (
    <Link key={item} href={`/page/${item}`}>
      动态渲染的Link
    </Link>
  ));
}
```

### useRouter Hook

useRouter 可以在代码中根据逻辑跳转页面，例如根据用户权限跳转不同的页面。

使用该 hook 需要在客户端组件中。需要在顶层编写 `'use client'` 声明这是客户端组件。

```ts
"use client";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/page")}>跳转page页面</button>
      <button onClick={() => router.replace("/page")}>替换当前页面</button>
      <button onClick={() => router.back()}>返回上一页</button>
      <button onClick={() => router.forward()}>跳转下一页</button>
      <button onClick={() => router.refresh()}>刷新当前页面</button>
      <button onClick={() => router.prefetch("/about")}>预获取about页面</button>
    </>
  );
}
```

### redirect 函数

redirect 函数可以用于服务端组件/客户端组件中跳转页面，例如根据用户权限跳转不同的页面。

**在 Next.js 中 redirect 的状态是：307 临时重定向**

```ts
import { redirect } from "next/navigation";
export default async function Page() {
  const checkLogin = await checkLogin();
  //如果用户未登录，则跳转到登录页面
  if (!checkLogin) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
```

### permanentRedirect 函数

permanentRedirect 跟上面的 redirect 的区别是：permanentRedirect 是永久重定向，而 redirect 是临时重定向。

**在 Next.js 中 permanentRedirect 的状态是：308 永久重定向**

```ts
//用法跟redirect一样，只是状态码不同
import { permanentRedirect } from "next/navigation";
export default async function Page() {
  const checkLogin = await checkLogin();
  if (!checkLogin) {
    permanentRedirect("/login");
  }
}
```

### permanentRedirect / redirect 参数说明

这两个函数都接受以下参数：

- `path`：字符串类型，表示重定向的目标 URL（支持相对路径和绝对路径）
- `type`：可选参数，值为 `replace` 或 `push` ，用于控制重定向的行为

关于 `type` 参数的默认行为：

- 在 **Server Actions** 中：默认使用 **push**，会将新页面添加到浏览器历史记录
- 在 **其他场景** 中：默认使用 **replace**，会替换当前的浏览器历史记录
  你可以通过显式指定 **type** 参数来覆盖默认行为。

:::warning
注意：`type` 参数在服务端组件中无效，仅在客户端组件和 Server Actions 中生效。
:::

## Next.js 第五章(动态路由)

动态路由
动态路由是指在路由中使用方括号[]来定义路由参数，例如/blog/[id]，其中[id]就是动态路由参数，因为在某些需求下，我们需要根据不同的 id 来显示不同的页面内容，例如商品详情页，文章详情页等。

基本用法`[slug]`
使用动态路由只需要在文件夹名加上方括号`[]`即可，例如`[id],[params]`等，名字可以自定义。

来看 demo: 我们在`app/shop`目录下创建一个`[id]`目录

```ts
//app/shop/[id]/page.tsx
export default function Page() {
  return <div>Page</div>;
}
```

访问路径为:`http://localhost:3000/shop/123` 其中`123`就是动态路由参数，这个可以是任意值。

### 路由片段[…slug]

我们如果需要捕获多个路由参数，例如`/shop/123/456`，我们可以使用路由片段来捕获多个路由参数，他的用法就是`[...slug]`，其中 slug 就是路由片段，这个名字可以自定义，后面的片段有多少就捕获多少。

```ts
//app/shop/[...id]/page.tsx
export default function Page() {
  return <div>Page</div>;
}
```

访问路径为:`http://localhost:3000/shop/123/456/789` 其中 `123` 和 `456` 和 `789` 就是动态路由参数，后面的片段有多少就捕获多少。

### 可选路由[[…slug]]

可选路由指的是，我们可能会有这个路由参数，也可能会没有这个路由参数，例如`/shop/123`，也可能是`/shop`，我们可以使用可选路由来捕获这个路由参数，他的用法就是`[[...slug]]`，其中`slug`就是路由片段，这个名字可以自定义，后面的片段有多少就捕获多少。

```ts
//app/shop/[[...id]]/page.tsx
export default function Page() {
  return <div>Page</div>;
}
```

- 访问路径为:`http://localhost:3000/shop`，可以没有参数
- 访问路径为:`http://localhost:3000/shop/123`，可以有参数
- 访问路径为:`http://localhost:3000/shop/123/456`，可以有多个参数
  这种方式比较灵活。

### 接受参数 useParams

使用 `useParams` hook 来接受参数，这个 hook 只能在客户端组件中使用。

```ts
"use client";
import { useParams } from "next/navigation";
export default function ShopPage() {
  const params = useParams();
  console.log(params); //{id: '123'}  {id: ['123', '456']} 接受单个值以及多个值
  return <div>ShopPage</div>;
}
```

## Next.js 第六章(平行路由)

### 平行路由

平行路由指的是在同一布局 `layout.tsx` 中，可以同时渲染多个页面，例如 `team`，`analytics`等，这个东西跟`vue`的`router-view`类似。

### 基本用法

平行路由的使用方法就是通过`@` + 文件夹名来定义，例如`@team`，`@analytics`等，名字可以自定义。
:::warning
平行路由也不会影响 URL 路径。
:::
定义完成之后，我们就可以在`layout.tsx`中使用`team`和`analytics`来渲染对应的页面，他会自动注入`layout`的 props 里面

:::warning
注意：例子中我们使用了解构的语法，这里面的名称`team,analytics`需跟文件夹名称一致。
:::

```ts
export default function RootLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {team}
        {children}
        {analytics}
      </body>
    </html>
  );
}
```

### 独立路由

当我们使用了平行路由之后，我们为其单独定义`loading,error`,等组件使其拥有独立加载和错误处理的能力。

### default.tsx

首先我们先认识一下子导航，每一个平行路由下面还可以接着创建对应的路由，例如@team 下面可以接着创建`@team/setting`，`@team/user`等。

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
import Link from "next/link";
export default function RootLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {team}
        {children}
        {analytics}
        <Link className="text-blue-500 block" href="/setting">
          Setting
        </Link>
      </body>
    </html>
  );
}
```

子导航使用 `Link` 组件跳转 `setting` 页面时，是没有问题的，但是我们在跳转之后刷新页面，就出现`404`了，这是怎么回事?

当使用软导航 `Link` 组件跳转子页面的时候，这时候 `@analytics` 和 `children` 依然保持活跃，所以他只会替代`@team`里面的内容。
而当我们使用硬导航浏览器页面刷新,此时`@analytics` 和 `children` 已经失活，因为它的底层原理其实是同时匹配`@team`和`@analytics`，`children` 目录下面的`setting` 页面，但是只有`@team `有这个页面，其他两个没有，所以导致`404`。
解决方案：使用`default.tsx`来进行兜底，确保不会 `404`

- `@analytics/default.tsx` 定义`default.tsx`文件
- `app/default.tsx` 定义`default.tsx`文件

## Next.js 第七章(路由组)

### 路由组

路由组也是一种基于文件夹的约定范式，可以让我们开发者，按类别或者团队组织路由模块，并且不影响 URL 路径。

用法：只需要通过`(groupName)`包裹住文件夹名即可，例如`(shop)`，`(user)`等，名字可以自定义。

### 定义多个根布局

这种一般是大型项目使用的，例如我们需要把， `后台管理系统` 和 `前台的门户网站` ，放到一个项目就可以使用这种方法实现。
使用方法：

1. 先把 `app` 目录下的 `layout.tsx` 文件删除
2. 在每组的目录下创建 `layout.tsx` 文件，并且定义`html,body`标签。

## Next.js 第八章(路由处理程序)

### 路由处理程序(Route Handlers)

路由处理程序，可以让我们在 Next.js 中编写 API 接口，并且支持与客户端组件的交互，真正做到了什么叫**前后端分离人不分离**。

文件结构
定义前端路由页面我们使用的`page.tsx`文件，而定义 API 接口我们使用的`route.ts`文件，并且他两都不受文件夹的限制，可以放在任何地方，只需要文件的名称以`route.ts`结尾即可。

:::warning
注意：`page.tsx`文件和`route.ts`文件不能放在同一个文件夹下，否则会报错，因为`Next.js`就搞不清到底用哪一个了，所以我们最好把前后端代码分开
:::

为此我们可以定义一个 api 文件夹，然后在这个文件夹下创建一对应的模块例如 `user` `login` `register` 等。

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

Next.js 是遵循`RESTful API`的规范，所以我们可以使用 HTTP 方法来定义请求。

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
工具准备: 打开 vsCode / Cursor 找到插件市场搜索`REST Client`，安装完成后，我们可以使用`REST Client`来测试 API 接口。

### 定义 GET 请求

`src/app/api/user/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams; //接受url中的参数
  console.log(query.get("id"));
  return NextResponse.json({ message: "Get request successful" }); //返回json数据
}
```

**`REST client`测试:**

在 `src` 目录新建 `test.http` 文件，编写测试请求

`src/test.http`

```http
GET http://localhost:3000/api/user?id=123 HTTP/1.1
```

### 定义 Post 请求

`src/app/api/user/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  //const body = await request.formData(); //接受formData数据
  //const body = await request.text(); //接受text数据
  //const body = await request.arrayBuffer(); //接受arrayBuffer数据
  //const body = await request.blob(); //接受blob数据
  const body = await request.json(); //接受json数据
  console.log(body); //打印请求体中的数据
  return NextResponse.json(
    { message: "Post request successful", body },
    { status: 201 },
  );
  //返回json数据
}
```

REST client 测试:

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
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log(id);
  return NextResponse.json({ message: `Hello, ${id}!` });
}
```

REST client 测试:

`src/test.http`

```http
GET http://localhost:3000/api/user/886 HTTP/1.1
```

### cookie

Next.js 也内置了 cookie 的操作可以方便让我们读写，接下来我们用一个登录的例子来演示如何使用 cookie。

安装手动挡组件库[shadcn/ui 官网地址](https://ui.shadcn.com/)

```sh
npx shadcn@latest init
```

为什么使用这个组件库？因为这个组件库是把组件放入你项目的目录下面，这样做的好处是可以让你随时修改组件库样式，并且还能通过 AI 分析修改组件库

安装`button`,`input`组件

```sh
npx shadcn@latest add button
npx shadcn@latest add input
```

新建 login 接口
`src/app/api/login/route.ts`

```ts
import { cookies } from "next/headers"; //引入cookies
import { NextRequest, NextResponse } from "next/server"; //引入NextRequest, NextResponse
//模拟登录成功后设置cookie
export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.username === "admin" && body.password === "123456") {
    const cookieStore = await cookies(); //获取cookie
    cookieStore.set("token", "123456", {
      httpOnly: true, //只允许在服务器端访问
      maxAge: 60 * 60 * 24 * 30, //30天
    });
    return NextResponse.json({ code: 1 }, { status: 200 });
  } else {
    return NextResponse.json({ code: 0 }, { status: 401 });
  }
}
//检查登录状态
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token && token.value === "123456") {
    return NextResponse.json({ code: 1 }, { status: 200 });
  } else {
    return NextResponse.json({ code: 0 }, { status: 401 });
  }
}
```

`src/app/page.tsx`

```ts
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 1) {
          router.push("/home");
        }
      });
  };
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4">
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[250px]"
        placeholder="请输入用户名"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-[250px]"
        placeholder="请输入密码"
      />
      <Button onClick={handleLogin}>登录</Button>
    </div>
  );
}
```

`src/app/home/page.tsx`

```ts
"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const checkLogin = async () => {
  const res = await fetch("/api/login");
  const data = await res.json();
  if (data.code === 1) {
    return true;
  } else {
    redirect("/");
  }
};
export default function HomePage() {
  useEffect(() => {
    checkLogin();
  }, []);
  return <div>你已经登录进入home页面</div>;
}
```

## Next.js 第九章(AI)

**AI**
Vercel 提供了[AI SDK](https://gitcode.com/gh_mirrors/sdk1/sdk?utm_source=highlight_word_gitcode&word=sdk&isLogin=1&from_link=ac33515aed719ceb8760c88bba0c2e07)，可以让我们在`Next.js`中轻松集成`AI功能`。[AI SDK 官网](https://ai-sdk.dev/getting-started)

### 安装 AI-SDK

```sh
npm i ai @ai-sdk/deepseek @ai-sdk/react
```

这儿我们使用`deepseek`作为 AI 模型，`@ai-sdk/react`封装了流式输出和上下文管理 hook，可以让我们在 Next.js 中轻松集成 AI 功能。如果你要安装其他模型，只需要将`deepseek`替换为其他模型即可。

例如：安装`openai`模型

```sh
npm i ai @ai-sdk/openai @ai-sdk/react
```

**编写 API 接口**
`src /app/api/chat/route.ts`

```ts
import { NextRequest } from "next/server";
import { streamText, convertToModelMessages } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { DEEPSEEK_API_KEY } from "./key";
const deepSeek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY, //设置API密钥
});
export async function POST(req: NextRequest) {
  const { messages } = await req.json(); //获取请求体
  //这里为什么接受messages 因为我们使用前端的useChat 他会自动注入这个参数，所有可以直接读取
  const result = streamText({
    model: deepSeek("deepseek-chat"), //使用deepseek-chat模型
    messages: convertToModelMessages(messages), //转换为模型消息
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
    system: "你是一个高级程序员，请根据用户的问题给出回答", //系统提示词
  });

  return result.toUIMessageStreamResponse(); //返回流式响应
}
```

`src/app/page.tsx`
我们在前端使用 `useChat` 组件来实现 AI 对话，这个组件内部封装了流式响应，默认会向 `/api/chat` 发送请求。

- `messages`: 消息列表，包含用户和 AI 的对话内容
- `sendMessage`: 发送消息的函数，参数为消息内容
- `onFinish`: 消息发送完成后回调函数，可以在这里进行一些操作，例如清空输入框

**messages：数据结构解析**

```ts
[
  {
    parts: [
      {
        type: "text", //文本类型
        text: "你知道 api router 吗",
      },
    ],
    id: "FPHwY1udRrkEoYgR", //消息ID
    role: "user", //用户角色
  },
  {
    id: "qno6vcWcwFM4Yc8J", //消息ID
    role: "assistant", //AI角色
    parts: [
      {
        type: "step-start", //步骤开始
      },
      {
        type: "text", //文本类型
        text: "是的，我知道 **API Router**。", //文本内容
        state: "done", //步骤完成
      },
    ],
  },
];
```

```ts
"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";

export default function HomePage() {
  const [input, setInput] = useState(""); //输入框的值
  const messagesEndRef = useRef<HTMLDivElement>(null); //获取消息结束的ref
  //useChat 内部封装了流式响应 默认会向/api/chat 发送请求
  const { messages, sendMessage } = useChat({
    onFinish: () => {
      setInput("");
    },
  });

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //回车发送消息
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        sendMessage({ text: input });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* 头部标题 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI 智能助手
          </h1>
          <p className="text-sm text-gray-500 mt-1">随时为您解答问题</p>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="bg-linear-to-br from-blue-100 to-purple-100 rounded-full p-6 mb-4">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                开始对话
              </h2>
              <p className="text-gray-500">输入您的问题，我会尽力帮助您</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* 头像 */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      message.role === "user"
                        ? "bg-linear-to-br from-blue-500 to-blue-600"
                        : "bg-linear-to-br from-purple-500 to-purple-600"
                    }`}
                  >
                    {message.role === "user" ? "你" : "AI"}
                  </div>

                  {/* 消息内容 */}
                  <div
                    className={`flex flex-col ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === "user"
                          ? "bg-linear-to-br from-blue-500 to-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={message.id + index}
                                className="whitespace-pre-wrap wrap-break-word"
                              >
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
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="请输入你的问题... (按 Enter 发送，Shift + Enter 换行)"
                className="min-h-[60px] max-h-[200px] resize-none rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
            <Button
              onClick={() => {
                if (input.trim()) {
                  sendMessage({ text: input });
                }
              }}
              disabled={!input.trim()}
              className="h-[60px] px-6 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Next.js 第十章(Proxy)

**Proxy 代理**
:::warning
从 Next.js 16 开始，中间件 `Middleware` 更名为代理`（Proxy）`，以更好地体现其用途。其功能保持不变
:::

如果你想升级为 16.x 版本，Next.js 提供了命令行工具来帮助你升级，只需要执行以下命令即可

```bash
npx @next/codemod@canary middleware-to-proxy .
```

代码转换会将文件和函数名从 middleware 重命名为 proxy。

```ts
// middleware.ts -> proxy.ts

// - export function middleware() {
// + export function proxy() {
```

### 基本使用

应用场景：

- 处理跨域请求
- 接口转发例如/api/user -> (可能是其他服务器 java/go/python 等) -> /api/user
- 限流例如配合第三方服务做限流
- 鉴权/判断是否登录

Prxoy 代理其实跟拦截器类似，它可以在请求完成之前进行拦截，然后进行一些处理，例如：修改请求头、修改请求体、修改响应体等。

`src/proxy.ts` 定义`proxy`函数导出即可，`Next.js`会自动调用这个函数。

```ts
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
  console.log(request.url, "url");
}
```

但是你会发现，他会拦截项目中所有的请求，包括静态资源、API 请求、页面请求等。

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
  console.log(request.url, "url");
}
//配置匹配路径
export const config = {
  matcher: "/api/:path*",
  //matcher: ['/api/:path*','/api/user/:path*'], 支持单个以及多个路径匹配
  //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], 同样支持正则表达式匹配
};
```

结合之前的案例,在`cookie`那一集，我们还需要单独定义 check 接口检查 cookie，现在我们可以直接在 proxy 中实现。

```ts
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get("token");
  if (request.nextUrl.pathname.startsWith("/home") && !cookie) {
    console.log("redirect to login");
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (cookie && cookie.value) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/api/:path*", "/home/:path*"],
};
```

**复杂匹配**

- `source`: 表示匹配路径
- `has`: 表示匹配路径中必须(包含)某些条件
- `missing`: 表示匹配路径中(必须不包含)某些条件

type 只能匹配: header, query, cookie

```ts
import { NextRequest, NextResponse } from "next/server";
import { ProxyConfig } from "next/server";
export async function proxy(request: NextRequest) {
  console.log("start proxy");
  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    {
      source: "/home/:path*",
      //表示匹配路径中必须(包含)Authorization头和userId查询参数
      has: [
        { type: "header", key: "Authorization", value: "Bearer 123456" },
        { type: "query", key: "userId", value: "123" },
      ],
      //表示匹配路径中(必须不包含)cookie和userId查询参数
      missing: [
        { type: "cookie", key: "token", value: "123456" },
        { type: "query", key: "userId", value: "456" },
      ],
    },
  ],
};
```

访问 url 为：`http://localhost:3000/home?userId=123`

**案例实战(处理跨域)**
只要是/api 下面的接口都可以被任意访问

```ts
import { NextRequest, NextResponse } from "next/server";
import { ProxyConfig } from "next/server";
export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const config: ProxyConfig = {
  matcher: "/api/:path*",
};
```

## Next.js 第十一章(渲染基础概念)

**渲染基础**
本章我们学习 `CSR` `SSR` `SSG` 三种渲染方式,以及`Hydration水合`的概念。

### CSR

CSR 是`Client Side Rendering`的缩写，即客户端渲染。像我们使用的 `Vue` `React` `Angular` 等框架，都是 CSR。

工作流程如下：

`浏览器请求服务器` -> `服务器返回HTML/JS/CSS等文件` -> `JS动态渲染生成DOM` -> `浏览器渲染DOM`

**优点：**

- 交互流畅，可直接响应
- 前后端分离，前端注重 UI，后端注重数据

**缺点：**

- 首屏加载慢，因为需要下载 JS/CSS 等文件
- SEO 不友好，因为 JS 动态渲染`(现在爬虫普遍已经支持JS抓取了)`

**适合场景：**

- 后台管理系统开发(后台系统不需要 SEO，也不需要首屏加载速度)
- 单页面应用开发(SPA)

### SSR

SSR 是`Server Side Rendering`的缩写，即服务端渲染。像我们使用的`Next.js` `Nuxt.js`等框架，都是**SSR**。

例如我们有一个电商网站，需要保证用户搜索关键词能搜到 `xx商品`, 还要注意 用户还可能是`弱网环境`,在地铁 电梯等，所以我们可以直接把 API 放到服务器请求，然后渲染成 HTML 页面返回给浏览器。

工作流程如下：

浏览器请求服务器 -> 服务器(内部调用 API 接口-> 渲染 HTML 页面) -> 浏览器直接读取 HTML 页面 并且 同时加载 JS/CSS 等文件 -> 执行 hydration(水合)

**优点：**
首屏加载快，因为服务器已经渲染了 HTML 页面
SEO 友好，搜索引擎能爬取到完整内容

**缺点：**
开发成本高，需要懂服务端知识，全栈开发。
服务器承担渲染工作，如果用户访问量大，对服务器配置要求高，增大成本

**适合场景：**
电商网站开发
博客网站开发
官网/首页等

### SSG

SSG 是`Static Site Generation`的缩写，即静态站点生成。像我们使用的 `Vitepress` `Astro` 等框架，都是**SSG**。

例如我们需要一个查看文档的网站，例如 `Vue` `React` 等文档，大家看到的都是一样的，所以我们在构建的时候，直接编译成静态文件，连接口都不用请求了，如果在部署 CDN/Nginx 等服务器，基本可以实现秒开。

工作流程如下：

项目构建 `npm run build` -> 生成静态文件（每个路由对应一个 HTML） -> 部署到`CDN/Nginx`等服务器 -> 浏览器请求服务器 -> 服务器返回 HTML 页面 -> `hydration`

**优点：**

- 首屏加载极快（CDN 分发静态文件，无需服务器实时渲染）
- 服务器压力小（CDN 直接承载请求，无需服务器执行 JS）
- SEO 最优（静态 HTML 含完整数据，搜索引擎爬取无压力）

**缺点：**

- 不适用于动态数据（数据更新需要重新构建部署，如实时股价、实时评论）
- 详情页面如果过多(构建时间会长)

**适合场景：**

- 技术文档
- 静态营销页
- 静态新闻站

### Hydration(水合)

简单来说就是 HTML 他是静态的，需要通过 JS 才能变成动态的，不然 HTML 是没有任何交互效果的，当 JS 下载完成在赋予 HTML 交互效果的阶段称之为`水合`。

以 Next.js 水合为例(详细版本):

服务端操作:

Next.js 服务器接收到用户请求。

- 服务器执行 React 组件代码，获取数据（比如从 API 接口请求文章列表）。
- 服务器将 React 组件渲染成静态 HTML 字符串（包含了文章列表的所有内容）。
- 服务器将这个 HTML 字符串返回给浏览器。

客户端操作:

- 浏览器接收到 HTML，立即解析并展示给用户（此时用户能看到文章列表，但点击 “查看详情” 按钮没有反应）
- 浏览器开始下载页面所需的 JS 文件（包括 React 核心库、组件代码等）
- JS 下载完成后，React 会执行 ReactDOM.hydrateRoot() 方法（在 React 18+ 中）
- hydrateRoot() 会对比浏览器中的真实 DOM 和 React 组件的虚拟 DOM：
  - 如果结构一致，React 会给真实 DOM 绑定事件监听器。
  - 如果发现差异（比如服务器和客户端数据不一致），React 会发出警告，并以客户端渲染的结果为准。
- 水合完成后，页面变成可交互的动态页面（用户可以点击按钮、滚动加载更多内容等）

## Next.js 第十五章(Image)

**Image 组件**
该组件是 Next.js 内置的图片组件，是基于原生`img`标签进行扩展，并不代表原生`img`标签不能使用。

- 尺寸优化：支持使用现代化图片格式，如 `webp` ， `avif` ， `apng` 等,并自动根据设备提供正确的尺寸。
- 视觉稳定性：防止图片加载时发生布局偏移，具体参考 CLS
- 懒加载：在图片进入视口才会加载，使用浏览器原生懒加载，并可选择添加模糊显示占位符。
- 灵活性：可按需调整图像大小，即使是存储在远程服务器上的图像也可以调整

**图片引入**

1. **src 本地图片引入**
   Next.js 建议我们把图片放在根目录下的`public`文件夹中，然后使用/开头访问。

```ts
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/1.png" width={100} height={100} alt="1" />
    </div>
  );
}
```

2. **import 静态引入**
   使用`import`引入图片，是不需要填写宽度和高度，`Next.js`会自动确定图片的尺寸。

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/public/*": ["./public/*"] // 新增这一行代码，配置图片路径。
    }
  }
}
```

使用静态`import`引入图片，你会发现无需填写宽度和高度，`Next.js`会自动确定图片的尺寸。

```ts
import Image from "next/image";
import test from "@/public/1.png";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src={test} alt="1" />
    </div>
  );
}
```

3. **远程图片引入**

```ts
import Image from "next/image";
export default async function Home() {
  const len = 20;
  return (
    <div>
      <h1>Home</h1>
      {Array.from({ length: len }).map((_, index) => (
        <Image
          key={index}
          src={`https://eo-img.521799.xyz/i/pc/img${index + 1}.webp`}
          alt="1"
          width={192}
          height={108}
        />
      ))}
    </div>
  );
}
```

当我们直接使用远程图片引入的时候 Next.js 会报错，因为 Next.js 默认只允许加载本地图片，如果需要加载远程图片，需要配置`next.config.js`文件。

image-loader.ts:86 Uncaught Error: Invalid src prop (https://eo-img.521799.xyz/i/pc/img1.webp) on `next/image`, hostname “eo-img.521799.xyz” is not configured under images in your `next.config.js`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // 协议
        hostname: "eo-img.521799.xyz", // 主机名
        pathname: "/i/pc/**", // 路径
        port: "", // 端口
      },
    ],
  },
};
```

4. **LCP 警告**
   如果图片是首屏或者 LCP 图片，需要添加`loading="eager"`属性，否则会触发 LCP 警告,因为 Image 组件默认是懒加载的。

- lazy: 懒加载，默认值，在图片进入视口才会加载。
- eager: 立即加载，在图片进入视口就会加载。

Image with src “https://eo-img.521799.xyz/i/pc/img1.webp” was detected as the Largest Contentful Paint (LCP). Please add the `loading="eager"` property if this image is above the fold.
Read more: https://nextjs.org/docs/app/api-reference/components/image#loading

```ts
import Image from "next/image";
export default async function Home() {
  const len = 20;
  return (
    <div>
      <h1>Home</h1>
      {Array.from({ length: len }).map((_, index) => (
        <Image
          key={index}
          src={`https://eo-img.521799.xyz/i/pc/img${index + 1}.webp`}
          alt="1"
          width={192}
          height={108}
          loading="eager" // 立即加载
        />
      ))}
    </div>
  );
}
```

第二种解决方案使用`preload`属性加载图片，表示提前预加载图片，不过 Next.js 还是更加推荐使用`loading="eager"`属性加载图片。

```ts
import Image from "next/image";
export default async function Home() {
  const len = 20;
  return (
    <div>
      <h1>Home</h1>
      {Array.from({ length: len }).map((_, index) => (
        <Image
          key={index}
          src={`https://eo-img.521799.xyz/i/pc/img${index + 1}.webp`}
          alt="1"
          width={192}
          height={108}
          preload={index < 10} // 优先加载策略
        />
      ))}
    </div>
  );
}
```

5. **图片格式优化**
   Next.js 会通过请求 Accept 头自动检测浏览器支持的图像格式，以确定最佳输出格式

```ts
Accept:image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

我们可以同时启用 AVIF 和 WebP 格式。对于支持 AVIF 的浏览器，系统将优先使用 AVIF 格式，WebP 格式作为备选方案。目前 AVIF 格式最优。

```ts
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"], //默认是 ['image/webp']
  },
};
```

6. **设备适配**
   如果你的老板告诉你要兼容哪些设备，你可以使用 `deviceSizes` 和 `imageSizes` 属性来配置。

```ts
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 设备尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 图片尺寸
  },
};
```

那为什么需要两个数组去实现呢？

我们观察上图可以发现， `imageSizes` 用于生成小图片尺寸例如(缩略图，头像等)，而 `deviceSizes` 用于生成大图片尺寸例如(横幅图、背景图、全屏展示图)。

```ts
import Image from "next/image";

// 头像 - 固定 64px
export function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      width={64}
      height={64}
      alt="用户头像"
      sizes="64px" // ← 告诉浏览器这张图只需要 64px
    />
  );
}

// 横幅图 - 响应式全宽
export function Banner() {
  return (
    <Image
      src="/banner.jpg"
      width={1920}
      height={600}
      alt="横幅"
      sizes="100vw" // ← 占满整个视口宽度，使用 deviceSizes
    />
  );
}

// 响应式内容图
export function ContentImage() {
  return (
    <Image
      src="/content.jpg"
      width={1200}
      height={800}
      alt="内容图"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
      // ↑ 手机上 100% 宽度，平板上 50%，桌面最大 1200px
    />
  );
}
```

### Props

以下是 Image 组件可用的属性：
| 分类 | 属性名 | 类型 | 示例 | 说明 |
|------------|--------------|---------------------|----------------------------------------|----------------------------------------|
| 基础属性 | `src` | `String` | `src="/profile.png"` | 图片源路径，支持本地路径或远程 `URL` |
| 基础属性 | `alt` | `String` | `alt="Picture of the author"` | 图片替代文本，用于无障碍访问和 `SEO` |
| 尺寸相关 | `width` | `Integer` (px) | `width={500}` | 图片宽度，静态导入时可选 |
| 尺寸相关 | `height` | `Integer` (px) | `height={500}` | 图片高度，静态导入时可选 |
| 尺寸相关 | `fill` | `Boolean` | `fill={true}` | 填充父容器，替代 `width` 和 `height` |
| 尺寸相关 | `sizes` | `String` | `sizes="(max-width: 768px) 100vw"` | 响应式图片尺寸 |
| 优化相关 | `quality` | `Integer` (1-100) | `quality={80}` | 图片压缩质量，默认为 75 |
| 优化相关 | `loader` | `Function` | `loader={imageLoader}` | 自定义图片加载器函数 |
| 优化相关 | `unoptimized` | `Boolean` | `unoptimized={true}` | 禁用图片优化，使用原图 |
| 加载相关 | `loading` | `String` | `loading="lazy"` | 加载策略，"`lazy`" 或 "`eager`" |
| 加载相关 | `preload` | `Boolean` | `preload={true}` | 是否预加载，用于 `LCP` 元素 |
| 加载相关 | `placeholder` | `String` | `placeholder="blur" ` | 占位符类型，"`blur`" 或 "`empty`" |
| 加载相关 | `blurDataURL` | `String` | `blurDataURL="data:image/jpeg..."` | 模糊占位符的 `Data URL` |
| 事件回调 | `onLoad` | `Function` | `onLoad={e => done()}` | 图片加载完成时的回调 |
| 事件回调 | `onError` | `Function` | `onError={e => fail()}` | 图片加载失败时的回调 |
| 其他属性 | `style` | `Object` | `style={{objectFit: "contain"}}` | 内联样式对象 |
| 其他属性 | `overrideSrc` | `String` | `overrideSrc="/seo.png"` | 覆盖 src，用于 SEO 优化 |
| 其他属性 | `decoding` | `String` | d`ecoding="async"` | 解码方式，`"async"/"sync"/"auto`" |

## Next.js 第十六章(font)

**font 字体**
`next/font`模块，内置了字体优化功能，其目的是防止`CLS`布局偏移。font 模块主要分为两部分，一部分是内置的`Google Fonts`字体，另一部分是本地字体。

### 基本用法

**Goggle 字体**
在使用 google 字体的时候，Google 字体和 css 文件会在构建的时候下载 到本地，可以与静态资源一起托管到服务器，所以不会向 Google 发送请求。

1. 基本使用

```ts
import { BBH_Sans_Hegarty } from "next/font/google"; //引入字体库
const bbhSansHegarty = BBH_Sans_Hegarty({
  weight: "400", //字体粗细
  display: "swap", //字体显示方式
});
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={bbhSansHegarty.className}>
        {" "}
        {/** bbhSansHegarty会返回一个类名，用于加载字体 */}
        {children}
        sdsadasdjsalkdjasl 你好
      </body>
    </html>
  );
}
```

2. 可变字体
   可变字体是一种可以适应不同字重和样式的字体，它可以在不同的设备上自动调整字体大小和样式，以适应不同的屏幕大小和分辨率 。

```ts
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "700"], //字体粗细 (不是所有字体都支持可变字体)
  style: ["normal", "italic"], //字体样式
  subsets: ["latin"],
  display: "swap",
});
```

如何选择其他字体？可以参考[Google Fonts](https://fonts.google.com/)

```ts
import {
  Inter,
  BBH_Sans_Bartle,
  Roboto_Slab,
  Rubik,
  Montserrat,
} from "next/font/google"; //引入其他字体库
```

**API 参考**
**配置选项**
| 属性名 | Google | 本地 | 类型 | 必填 | 说明 |
|--------------------|--------|------|-----------------|------|--------------------------|
| `src` | ✗ | ✓ | `String/Array` | 是 | 字体文件路径 |
| `weight` | ✓ | ✓ | `String/Array` | 可选 | 字体粗细，如 `‘400’` |
| `style` | ✓ | ✓ | `String/Array` | - | 字体样式，如 `‘normal’` |
| `subsets` | ✓ | ✗ | `Array` | - | 字符子集 |
| `axes` | ✓ | ✗ | `Array` | - | 可变字体轴 |
| `display` | ✓ | ✓ | `String` | - | 显示策略 |
| `preload` | ✓ | ✓ | `Boolean` | - | 是否预加载 |
| `fallback` | ✓ | ✓ | `Array` | - | 备用字体 |
| `adjustFontFallback` | ✓ | ✓ | `Boolean/String ` | - | 调整备用字体 |
| `variable` | ✓ | ✓ | `String` | - | CSS 变量 |
| `declarations` | ✗ | ✓ | `Array` | - | 自定义声明 |

---

字体样式，如 ‘normal’ ‘italic（斜体）’ ‘oblique（倾斜）’ 等。

**weight**
字体粗细，如 ‘400’ ‘700’ ‘900’ 等。

**display**

- auto：浏览器默认（通常为 block）
- block：空白 3s → 备用字体 → 自定义字体
- swap：备用字体 → 自定义字体
- fallback：空白 100ms → 备用字体，3s 内加载完成则切换
- optional：空白 100ms，100ms 内加载完成则使用，否则用备用字体

**本地字体**
字体下载地址：[免费可商用字体](https://nextjs-docs-henna-six.vercel.app/ZhiyongDatongFont.ttf)

本地字体需要通过`src`属性指定字体文件路径，字体文件路径可以是单个文件，也可以是多个文件。

```ts
import localFont from "next/font/local";
const local = localFont({
  src: "./font/zydtt.ttf", //本地字体文件路径
  display: "swap", //字体显示方式
});
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={local.className}>
        {children}
        sdsadasdjsalkdjasl 你好
      </body>
    </html>
  );
}
```

## Next.js 第十七章(Script 脚本)

**Script 组件**
`Next.js`允许我们使用 Script 组件去加载 js 脚本(外部/本地脚本)，并且他还对 Script 组件进行优化。

### 基本使用

**局部引入**
`src/app/home/page.tsx`
在 home 路由引入一个远程的 js 脚本，他只会在切换到 home 路由时才会加载，并且只会加载一次，然后纳入缓存。

```ts
import Script from "next/script"; //引入Script组件
export default function HomePage() {
  return (
    <div>
      <Script src="https://unpkg.com/vue@3/dist/vue.global.js" />
    </div>
  );
}
```

他的底层原理会把这个`Script`组件转换成`<script>`标签，然后插入到`<head>`标签中。

**全局引入**
`src/app/layout.tsx`

全局引入直接在`app/layout.tsx`中引入，他会自动在所有页面中引入，并且只会加载一次，然后纳入缓存。

```ts
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <Script src="https://unpkg.com/vue@3/dist/vue.global.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**加载策略**
`Next.js`允许我们通过 `strategy` 属性来控制 `Script` 组件的加载策略。

- `beforeInteractive` : 在代码和页面之前加载会`阻塞页面渲染`。
- `afterInteractive` (默认值): 在页面渲染到客户端之后加载。
- `lazyOnload` : 在浏览器空闲时稍后加载脚本。
- `worker` (实验性特性): 暂时不建议使用。

```ts
<Script id="VGUBHJMK1" strategy="beforeInteractive" src="https://unpkg.com/vue@3/dist/vue.global.js" />
<Script id="VGUBHJMK2" strategy="afterInteractive" src="https://unpkg.com/vue@3/dist/vue.global.js" />
<Script id="VGUBHJMK3" strategy="lazyOnload" src="https://unpkg.com/vue@3/dist/vue.global.js" />
<Script id="VGUBHJMK4" strategy="worker" src="https://unpkg.com/vue@3/dist/vue.global.js" />
```

::: danger
`webWorker`模式 尚不稳定，谨慎使用,小提示可以给 Script 组件添加 id，Next.js 会追踪优化。
:::

**内联脚本**
即使不从外部文件载入脚本，Next.js 也支持我们通过{}直接在`Script组件`编写代码。

```ts
import Script from "next/script";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="VGUBHJMK5"
          strategy="beforeInteractive"
          src="https://unpkg.com/vue@3/dist/vue.global.js"
        ></Script>
      </head>
      <body>
        {children}
        <div id="app"></div>
        <Script id="VGUBHJMK6" strategy="afterInteractive">
          {`
            const {createApp} = Vue
            createApp({
              template: '<h1>{{ message }}</h1>',
              setup() {
                return {
                  message: 'Next.js + Vue.js'
                }
              }
            }).mount('#app')
          `}
        </Script>
      </body>
    </html>
  );
}
```

第二种写法使用 `dangerouslySetInnerHTML` 属性来设置内联脚本。

```ts
<Script
  dangerouslySetInnerHTML={{
    __html: `
    const {createApp} = Vue
    createApp({
        template: '<h1>{{ message }}</h1>',
        setup() {
        return {
            message: 'Next.js + Vue.js'
        }
        }
    }).mount('#app')
    `,
  }}
  strategy="afterInteractive"
></Script>
```

**事件监听**

- `onload` : 脚本加载完成时触发。
- `onReady` : 脚本加载完成后，且组件每次挂载的时候都会触发。
- `onError` : 脚本加载失败时触发。

Script 组件只有在导入客户端的时候才会生效，所以需要使用`'use client'`声明这是一个客户端组件。

```ts
"use client";

import Script from "next/script";

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log("Script has loaded");
        }}
      />
    </>
  );
}
```

### Next.js 第十八章(静态导出 SSG)

**静态导出 SSG**
Next.js 支持静态站点生成（SSG，Static Site Generation），可以在构建时预先生成所有页面的静态 HTML 文件。这种方式特别适合内容相对固定的站点，如`官网`、`博客`、`文档`等，能够提供最佳的性能和 SEO 表现。

**配置静态导出**
需要在`next.config.js`文件中配置 `output` 为 `export` ，表示导出静态站点。 `distDir` 表示导出目录，默认为 `out`。

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 导出静态站点
  distDir: "dist", // 导出目录
};

export default nextConfig;
```

接着我们执行`npm run build`命令，构建静态站点。

构建完成之后，我们安装`http-server`来启动静态站点。

```bash
npm install http-server -g #安装http-server
cd dist #进入导出目录
http-server -p 3000 #启动静态站点
```

启动完成之后发现点击 a 标签无法进行跳转，是因为打完包之后的页面叫`about.html`,而我们的跳转链接是`/about`，所以需要修改配置项。

**修改配置项**
需要在`next.config.js`文件中配置`trailingSlash`为`true`，表示添加尾部斜杠，生成`/about/index.html`而不是`/about.html`。

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 导出静态站点
  distDir: "dist", // 导出目录
  trailingSlash: true, // 添加尾部斜杠，生成 /about/index.html 而不是 /about.html
};

export default nextConfig;
```

此时重新点击`a`标签就可以进行跳转了。

**动态路由处理**
新建目录: `src/app/posts/[id]/page.tsx`

如果要使用动态路由，则需要使用 `generateStaticParams` 函数来生成有多少个动态路由，这个函数需要返回一个数组，数组中包含所有动态路由的参数，例如`{ id: '1' }`表示对应 id 为 1 的详情页。

```ts
export async function generateStaticParams() {
  //支持调用接口请求详情id列表 const res = await fetch('https://api.example.com/posts')
  return [
    { id: "1" }, //返回对应的详情id
    { id: "2" },
  ];
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Post {id}</h1>
    </div>
  );
}
```

图片优化
如果使用 Image 组件优化图片，在开发模式会进行报错

⚠️ 警告
`get-img-props.ts 442 Uncaught Error`: Image Optimization using the default loader is not compatible with `{ output: 'export' }`.

可能的解决方案：

- 移除 `{ output: 'export' }` 并运行 "next start" 以启用包含图片优化 API 的服务器模式。
- 在 `next.config.js` 中配置 `{ images: { unoptimized: true } }` 来禁用图片优化 API。
- 使用自定义 loader 实现
  [了解更多](https://nextjs.org/docs/messages/export-image-api)

```ts
import Image from "next/image";
import test from "@/public/1.png";
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Image
        loading="eager"
        src={test}
        alt="logo"
        width={250 * 3}
        height={131 * 3}
      />
    </div>
  );
}
```

我们使用自定义 loader 来实现图片优化,要求我们通过一个图床托管图片。 [路过图床](https://imgchr.com/) 是一个免费的图床，我们可以使用它来托管图片。

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 导出静态站点
  distDir: "dist", // 导出目录
  trailingSlash: true, // 添加尾部斜杠，生成 /about/index.html 而不是 /about.html
  images: {
    loader: "custom", // 自定义loader
    loaderFile: "./image-loader.ts", // 自定义loader文件
  },
};

export default nextConfig;
```

根目录：`/image-loader.ts`

```ts
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  return `https://s41.ax1x.com${src}`;
}
```

`src/app/about/page.tsx`

```ts
import Image from "next/image";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Image
        loading="eager"
        src="/2025/12/29/pZYbW7t.jpg"
        alt="logo"
        width={250 * 3}
        height={131 * 3}
      />
    </div>
  );
}
```

### 注意事项

以下功能在 SSG 中不支持，请勿使用：

- Dynamic Routes with dynamicParams: true
- 动态路由没有使用 generateStaticParams()
- 路由处理器依赖于 Request
- Cookies
- Rewrites 重写
- Redirects 重定向
- Headers 头
- Proxy 代理
- Incremental Static Regeneration 增量静态再生
- Image Optimization with the default loader 默认加载器的图像优化
- Draft Mode 草稿模式
- Server Actions 服务器操作
- Intercepting Routes 拦截路由
