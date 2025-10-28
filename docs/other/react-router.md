## React-router v7 第一章(安装)
`React-router` 是 React的路由库，如果你学过Vue，跟Vue的Router很相似。它的作用就是，根据不同的`URL`，匹配不同的组件，然后进行渲染。这样就可以实现在单页面应用中跳转页面。

[官方文档:](https://reactrouter.com/home)

### 安装
* **框架模式**
    框架模式就是使用，React-router 提供的脚手架模板去安装，安装完成后会自带路由功能。
 ```bash
    npx create-react-router@latest my-react-router-app # 创建项目
    cd my-react-router-app # 进入项目
    npm i # 安装依赖
    npm run dev # 启动项目
```
* **数据模式**
    数据模式就是，我们可以使用自己的模板去创建`React`项目，比如使用 `vite` `webpack` 等，然后自己安装 `React-router`。
```bash
npm i react-router #V7不在需要 react-router-dom
```
```ts
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]);
```
* **声明模式**

声明模式，也可以用自己的模板创建 `React` 项目，然后自己安装 `React-router`。
```bash
npm i react-router #V7不在需要 react-router-dom
```

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import About from '../about'
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
```
:::tip
数据模式和声明模式的区别，数据模式可以享用 `React-router` 所有的功能，包括数据处理。而声明模式只能享用 `React-router` 的一部分功能，比如路由跳转。
:::

### 基本使用
* `src/router/index.ts`

pages目录创建两个组件，Home和About

新建目录 `router` ，在目录中新建文件 `index.ts` ，在文件中引入 `React-router`，然后使用 `createBrowserRouter` 创建路由。
```ts
import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]);

export default router;
```

* `src/App.tsx`
在 `App.tsx` 文件中引入路由，然后使用 `RouterProvider` 包裹 `App` 组件。
```ts
import React from 'react';
import { RouterProvider } from 'react-router';
import router from './router';
const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
```

### 路由跳转
在 `Home` 组件中使用 `NavLink` 组件跳转到 `About` 组件。
```ts
import { NavLink } from 'react-router';
const Home: React.FC = () => {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Home;
```
在 `About` 组件中使用 `Link` 组件跳转到 `Home` 组件。
```ts
import { NavLink  } from 'react-router';
const About: React.FC = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default About;
```

## React-router v7 第二章(路由模式)
### 路由模式
在React RouterV7 中，是拥有不同的路由模式，路由模式的选择将直接影响你的整个项目。React Router 提供了四种核心路由创建函数：
`createBrowserRouter` 、`createHashRouter` 、`createMemoryRouter` 和 `createStaticRouter`

1. `createBrowserRouter(推荐)`
**核心特点：**
* 使用HTML5的history API (pushState, replaceState, popState)
* 浏览器URL比较纯净 (/search, /about, /user/123)
* 需要服务器端支持(nginx, apache,等)否则会刷新404
**使用场景：**
* 大多数现代浏览器环境
* 需要服务器端支持
* 需要URL美观

***

2. `createHashRouter`
**核心特点：**
* 使用URL的hash部分(#/search, #/about, #/user/123)
* 不需要服务器端支持
* 刷新页面不会丢失
**使用场景：**
* 静态站点托管例如(github pages, netlify, vercel)
* 不需要服务器端支持

***

3. `createMemoryRouter`
**核心特点：**
* 使用内存中的路由表
* 刷新页面会丢失状态
* 切换页面路由不显示URL
**使用场景：**
* 非浏览器环境例如(React Native, Electron)
* 单元测试或者组件测试(Jest, Vitest)

***

4. `createStaticRouter`
**核心特点：**
* 专为服务端渲染（SSR）设计
* 在服务器端匹配请求路径，生成静态 HTML
* 需与客户端路由器（如 createBrowserRouter）配合使用
**使用场景：**
* 服务端渲染应用（如 Next.js 的兼容方案）
* 需要SEO优化的页面
**解决刷新404问题**
当使用 `createBrowserRouter` 时，如果刷新页面会丢失状态，这是因为浏览器默认会去请求服务器上的资源，如果服务器上没有资源，就会返回404。
要解决这个问题就需要在服务器配置一个回退路由，当请求的资源不存在时，返回`index.html`。

* **Nginx(推荐)**
下载地址：[Nginx](https://nginx.org/en/download.html)
```bash
location / {
  try_files $uri $uri/ /index.html;
}
```

* **Apache**
```bash
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

* **Vercel**
```ts
{
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

* **Nodejs**
```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http
  .createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.')
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })

      res.end(content)
    })
  })
  .listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort)
  })
```

## React-router v7 第三章(路由)
路由
React-Router V7 的路由种类是非常多的，有 `嵌套路由` `布局路由` `索引路由` `前缀路由` `动态路由` ，大致上是分为这五种的，下面我们一一介绍
### Layout
我们在演示上面几种路由之前，先对界面进行一个布局，方便我们后续的演示,UI组件我们使用 `antd`。
```bash
npm install antd
```
我们创建一个 `layout` 文件夹，在文件夹中创建一个 `Content` `Header` `Menu` 文件夹，在文件夹中创建一个`index.tsx`文件，文件内容如下：

* `src/layout/Menu/index.tsx` `菜单页面`
```ts
import { Menu as AntdMenu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router';
export default function Menu() {
    const navigate = useNavigate();//编程式导航
    const handleClick: MenuProps['onClick'] = (info) => {
         navigate(info.key) // 点击菜单项时，导航到对应的页面
    };
    const menuItems = [
        {
            key: '/home',
            label: 'Home',
            icon: <AppstoreOutlined />,
        },
        {
            key: '/about',
            label: 'About',
            icon: <AppstoreOutlined />,
        },
    ];
    return <AntdMenu onClick={handleClick} style={{ height: '100vh' }} items={menuItems} />;
}

```

* `src/layout/Header/index.tsx` `头部页面`
```ts
import { Breadcrumb } from 'antd';

export default function Header() {
  return <Breadcrumb 
    items={[
      {
        title: 'Home',
      },
      {
        title: 'List',
      },
      {
        title: 'App',
      },
    ]}
  />;
}
```
* `src/layout/Content/index.tsx` `内容页面`
```ts
import { Outlet } from 'react-router';
export default function Content() {
  return <Outlet />;
}
```
### 嵌套路由
嵌套路由就是父路由中嵌套子路由 `children` ，子路由可以继承父路由的布局，也可以有自己的布局。

注意事项：
* 父路由的path 是 `index` 开始，所以访问子路由的时候需要加上父路由的path例如 `/index/home` `/index/about`
* 子路由不需要增加/了直接写子路由的path即可
* 子路由默认是不显示的，需要父路由通过 `Outlet` 组件来显示子路由 `outlet` 就是类似于`Vue`的`<router-view>`展示子路由的一个容器

```ts
const router = createBrowserRouter([
    {
        path: '/index',
        Component: Layout, // 父路由
        children: [ 
            {
                path: 'home',
                Component: Home, // 子路由
            },
            {
                path: 'about',
                Component: About, // 子路由
            },
        ]
    },
]);

import { Outlet } from 'react-router';
function Content() {
  return <Outlet />;
}
```

### 布局路由
布局路由是一种特殊的嵌套路由，父路由可以省略 path，这样不会向 URL 添加额外的路径段：
```ts
const router = createBrowserRouter([
    { 
        // path: '/index', //省略 
        Component: Layout,
        children: [
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ]
    },
]);
```

### 索引路由
索引路由使用 `index: true` 来定义，作为父路由的默认子路由：
```ts
{ index: true, Component: Home }
```
索引路由在其父级的 `URL` 处呈现到其父级的 `Outlet` 中
```ts
const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true, 
                // path: 'home',
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ]
    },
]);
```

### 前缀路由
前缀路由只设置 `path` 而不设置 `Component` ，用于给一组路由添加统一的路径前缀：
```ts
const router = createBrowserRouter([
    {
        path: '/project',
        //Component: Layout, //省略
        children: [
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ]
    },
]);
```

### 动态路由
动态路由通过 `:参数名` 语法来定义动态段：

访问规则如下 `http://localhost:3000/home/123`
```ts
const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: 'home/:id', 
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ]
    },
]);


//在组件中获取参数
import { useParams } from "react-router";

function Card() {
  let params = useParams();
  console.log(params.id);
}
```

### React-router v7 第四章(路由传参)
**参数传递**
**React-router** 一共有三种方式进行参数传递，参数传递指的是在路由跳转时，将参数传递给目标路由。

### Query方式
Query的方式就是使用 ? 来传递参数，例如：
```bash
#多个参数用 & 连接
/user?name=小满zs&age=18
```
跳转方式：
```ts
<NavLink  to="/about?id=123">About</NavLink> //1. NavLink 跳转
<Link to="/about?id=123">About</Link> //2. Link 跳转
import { useNavigate } from 'react-router'
const navigate = useNavigate()
navigate('/about?id=123') //3. useNavigate 跳转
```
获取参数：
```ts
//1. 获取参数
import { useSearchParams } from 'react-router'
const [searchParams, setSearchParams] = useSearchParams()
console.log(searchParams.get('id')) //获取id参数

//2. 获取参数
import { useLocation } from 'react-router'
const { search } = useLocation()
console.log(search) //获取search参数 ?id=123
```

### Params方式
Params的方式就是使用 :[name] 来传递参数，例如：
```bash
/user/:id
```
跳转方式：
```ts
<NavLink to="/user/123">User</NavLink> //1. NavLink 跳转
<Link to="/user/123">User</Link> //2. Link 跳转
import { useNavigate } from 'react-router'
const navigate = useNavigate()
navigate('/user/123') //3. useNavigate 跳转
```
获取参数：
```ts
import { useParams } from 'react-router'
const { id } = useParams()
console.log(id) //获取id参数
```

### State方式
state在URL中不显示，但是可以传递参数，例如：
```bash
/user
```
跳转方式：
```ts
<Link to="/user" state={{ name: '小满zs', age: 18 }}>User</Link> //1. Link 跳转
<NavLink to="/user" state={{ name: '小满zs', age: 18 }}>User</NavLink> //2. NavLink 跳转
import { useNavigate } from 'react-router'
const navigate = useNavigate()
navigate('/user', { state: { name: '小满zs', age: 18 } }) //3. useNavigate 跳转
```
获取参数：
```ts
import { useLocation } from 'react-router'
const { state } = useLocation()
console.log(state) //获取state参数
console.log(state.name) //获取name参数
console.log(state.age) //获取age参数
```

### 总结
React Router 提供了三种参数传递方式，各有特点：

1. **Params 方式 (`/user/:id`)**
* 适用于：传递必要的路径参数（如ID）
* 特点：符合 RESTful 规范，刷新不丢失
* 限制：只能传字符串，参数显示在URL中
2. **Query 方式 (`/user?name=xiaoman`)**
* 适用于：传递可选的查询参数
* 特点：灵活多变，支持多参数
* 限制：URL可能较长，参数公开可见
3. **State 方式**
* 适用于：传递复杂数据结构
* 特点：支持任意类型数据，参数不显示在URL
* 限制：刷新可能丢失，不利于分享

选择建议：必要参数用 `Params`，筛选条件用 `Query`，临时数据用 `State`。

## React-router v7 第五章(路由懒加载)
**什么是懒加载**
懒加载是一种优化技术，用于延迟加载组件，直到需要时才加载。这样可以减少初始加载时间，提高页面性能

### 懒加载的实现
通过在路由对象中使用 `lazy` 属性来实现懒加载。
```ts
import { createBrowserRouter } from 'react-router';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // 模拟异步请求
const router = createBrowserRouter([
    {
        Component: Layout,
            {
                path: 'about',
                lazy: async () => {
                    await sleep(2000); // 模拟异步请求
                    const Component = await import('../pages/About'); // 异步导入组件
                    console.log(Component);
                    return {
                        Component: Component.default,
                    }
                }
            },
        ],
    },
]);
```

当切换到 `about` 路由时，才会进行加载
:::tip
如果配置了 `loader` 则每次都会进入 `loading` 状态，如果没有配置 `loader` 则只执行一次。
:::

### 体验优化
例如 `about` 是一个懒加载的组件，在切换到 `about` 路由时，展示的还是上一个路由的组件，直到懒加载的组件加载完成，才会展示新的组件，这样用户会感觉页面卡顿，用户体验不好。

使用状态优化 `useNavigation`
[速查文档](https://message163.github.io/react-docs/router/hooks/useNavigation.html)
* src/layout/Content/index.tsx
```ts
import { Outlet, useNavigation } from 'react-router';
import { Alert, Spin } from 'antd';
export default function Content() {
    const navigation = useNavigation();
    console.log(navigation.state);
    const isLoading = navigation.state === 'loading';
    return <div>
        {isLoading ? <Spin size='large' tip='loading...'  >
            <Alert description="小满zs小满zs小满zs小满zs小满zs小满zs小满zs小满zsv"   message="加载中" type='info' />
        </Spin> : <Outlet />
        }
    </div>
}
```

### 性能优化
使用懒加载打包后，会把懒加载的组件打包成一个独立的文件，从而减小主包的大小，等用到的时候才会进行加载。

## React-router v7 第六章(路由操作)

### 路由操作

路由的操作是由两个部分组成的:

* loader
* action
在平时工作中大部分都是在做`增刪查改(CRUD)`的操作，所以一个界面的接口过多之后就会使逻辑臃肿复杂，难以维护，所以需要使用路由的高级操作来优化代码。

### loader
[useLoaderData速查文档](https://message163.github.io/react-docs/router/hooks/useLoaderData.html)

:::tip
只有GET请求才会触发loader，所以适合用来获取数据
:::

在之前的话我们是 `RenderComponent(渲染组件)`-> `Fetch(获取数据)`-> `RenderView(渲染视图)`

有了loader之后是 `loader(通过fetch获取数据)` -> `useLoaderData(获取数据)` -> `RenderComponent(渲染组件)`

```ts
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const data = await response.json();
      const response = await getUser(data); // [!code highlight] 获取数据
      return {
        data: response.list,
        message: "success",
      }
    },
  },
]);
//App.tsx
import { useLoaderData } from "react-router";
const App = () => {
  const { data, message } = useLoaderData(); // [!code highlight] 获取数据
  return <div>{data}</div>;
}
```

### action
一般用于表单提交，删除，修改等操作。
[useSubmit速查文档](https://message163.github.io/react-docs/router/hooks/useSubmit.html) [useActionData速查文档](https://message163.github.io/react-docs/router/hooks/useActionData.html)

:::tip
只有POST DELETE PATCH PUT等请求才会触发action，所以适合用来提交表单
:::
```ts
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
    {
        // path: '/index',
        Component: Layout,
        children: [
            {
                path: 'about',
                Component: About,
                action: async ({ request }) => {
                    const formData = await request.formData();
                    await createUser(formData); // [!code highlight] 创建用户
                    return {
                        data: table,
                        success: true
                    }
                }
            },
        ],
    },
]);
//App.tsx
import { useSubmit } from 'react-router';
import { Card, Form, Input, Button } from 'antd';
export default function About() {
  const submit = useSubmit();
  return <Card>
    <Form onFinish={(values) => {
      submit(values, { method: 'post'}) // [!code highlight]  提交表单
    }}>
      <Form.Item name='name' label='姓名'>
        <Input />
      </Form.Item>
      <Form.Item name='age' label='年龄'>
        <Input />
      </Form.Item>
      <Button type='primary' htmlType='submit'>提交</Button>
    </Form>
  </Card>;
}
```

### 状态变更
我们可以配合 `useNavigation` 来管理表单提交的状态
[useNavigation速查文档](https://message163.github.io/react-docs/router/hooks/useNavigation.html)

1. GET提交会经过以下状态:
```txt
idle -> loading -> idle
```

2. POST提交会经过以下状态:
```txt
idle -> submitting ->loading -> idle
```

所以我们可以根据这些状态来控制 `disabled` `loading` 等行为
```ts
import { useNavigation, useSubmit } from "react-router";
const submit = useSubmit();
const navigation = useNavigation();

return (
    <div>
         {navigation.state === 'loading' && <div>loading...</div>}
        <button disabled={navigation.state === 'submitting'}>提交</button>
    </div>
)

```

## React-router v7 第七章(导航)
### 导航
在React-router V7中，大致有四种导航方式：

1. 使用 `Link` 组件 [`link`](https://message163.github.io/react-docs/router/apis/link.html)
2. 使用 `NavLink` 组件 [`NavLink`](https://message163.github.io/react-docs/router/apis/navlink.html)
3. 使用编程式导航 [`useNavigate`](https://message163.github.io/react-docs/router/hooks/useNavigate.html)
4. 使用 `redirect` 重定向 [`redirect`](https://message163.github.io/react-docs/router/apis/redirect.html)

### Link
`Link` 组件是一个用于导航到其他页面的组件，他会被渲染成一个`<a>`标签，并具有实际的`href`属性，指向其链接的资源。

**使用**
```ts
import { Link } from "react-router";

export default function App() {
  return (
    <Link to="/about">About</Link>
  )
}
```
**参数**
* `to`：要导航到的路径
`to 属性是一个字符串，表示要导航到的路径。
`<Link to="/about">About</Link>`

* `replace` ：是否替换当前路径
`replace` 属性是一个布尔值，表示是否替换当前路径，如果为 `true` ，则导航不会在浏览器历史记录中创建新的条目，而是替换当前条目。
`<Link replace to="/about">About</Link>`

* `state` ：要传递给目标页面的状态
`state` 属性是一个对象，可以把参数传递给目标页面。
```ts
<Link state={{ from: "home" }} to="/about">About</Link>

// 在目标页面获取状态
import { useLocation } from "react-router";

export default function App() {
  const location = useLocation();
  console.log(location.state);
  return <div>Location: {location.state.from}</div>;
}
```

* `relative` ：相对于当前路径的导航方式
relative 属性是一个字符串，表示相对于当前路径的导航方式，默认的方式是绝对路径，如果想要使用相对路径，可以设置为path。
```ts
//默认是绝对路径
<Link relative="route" to="/about">About</Link>

//使用相对路径
<Link relative="path" to="../about">About</Link>

//例如当前的路由是/index/home，那么使用绝对路径导航到/about，会变成/about
<Link to="/about">About</Link>
//可以使用相对路径导航到/index/about
<Link relative="path" to="../about">About</Link>
```

* `reloadDocument` ：是否重新加载页面
`reloadDocument` 属性是一个布尔值，表示是否重新加载页面。
`<Link reloadDocument to="/about">About</Link>`

* `preventScrollReset` ：是否阻止滚动位置重置
`preventScrollReset` 属性是一个布尔值，表示是否阻止滚动位置重置。
`<Link preventScrollReset to="/about">About</Link>`

* `viewTransition` ：是否启用视图过渡
`viewTransition` 属性是一个布尔值，表示是否启用视图过渡，自动增加页面跳转的动画效果。
`<Link viewTransition to="/about">About</Link>`

### NavLink
`NavLink` 的使用方式和 `Link` 组件类似，但是 `NavLink` 组件可以实现路由的激活状态。

**使用**
```ts
import { NavLink } from "react-router";

export default function App() {
  return (
    <NavLink to="/about">About</NavLink>
  )
}
```
**参数(和Link组件的参数类似)**
* `to` ：要导航到的路径
* `replace` ：是否替换当前路径
* `state` ：要传递给目标页面的状态
* `relative` ：相对于当前路径的导航方式
* `reloadDocument` ：是否重新加载页面
* `preventScrollReset` ：是否阻止滚动位置重置
* `viewTransition` ：是否启用视图过渡

**to**
`to` 属性是一个字符串，表示要导航到的路径。
`<NavLink to="/about">About</NavLink>`

**replace**
`replace` 属性是一个布尔值，表示是否替换当前路径，如果为 `true` ，则导航不会在浏览器历史记录中创建新的条目，而是替换当前条目。
`<NavLink replace to="/about">About</NavLink>`

**state**
`state` 属性是一个对象，可以把参数传递给目标页面。
```ts
<NavLink state={{ from: "home" }} to="/about">About</NavLink>

// 在目标页面获取状态
import { useLocation } from "react-router";

export default function App() {
  const location = useLocation();
  console.log(location.state);
  return <div>Location: {location.state.from}</div>;
}
```

**relative**
`relative` 属性是一个字符串，表示相对于当前路径的导航方式，默认的方式是绝对路径，如果想要使用相对路径，可以设置为 `path。`
```ts
//默认是绝对路径
<NavLink relative="route" to="/about">About</NavLink>

//使用相对路径
<NavLink relative="path" to="../about">About</NavLink>

//例如当前的路由是/index/home，那么使用绝对路径导航到/about，会变成/about
<NavLink to="/about">About</NavLink>
//可以使用相对路径导航到/index/about
<NavLink relative="path" to="../about">About</NavLink>
```

**reloadDocument**
`reloadDocument` 属性是一个布尔值，表示是否重新加载页面。
`<NavLink reloadDocument to="/about">About</NavLink>`

**preventScrollReset**
`preventScrollReset` 属性是一个布尔值，表示是否阻止滚动位置重置。
`<NavLink preventScrollReset to="/about">About</NavLink>`

**viewTransition**
`viewTransition` 属性是一个布尔值，表示是否启用视图过渡，自动增加页面跳转的动画效果。
`<NavLink viewTransition to="/about">About</NavLink>`

**区别**
`Navlink` 会经过以下三个状态的转换，而Link不会，所以 `Navlink` 就是一个link的增强版。

* `active` ：激活状态(当前路由和to属性匹配)
* `pending` ：等待状态(loader有数据需要加载)
* `transitioning` ：过渡状态(通过viewTransition属性触发)
**active自动激活**
`Navlink` 会根据当前路由和to属性是否匹配，自动激活。

`react-router`会为其自动添加样式
```css
a.active {
  color: red;
}

a.pending {
  animate: pulse 1s infinite;
}

a.transitioning {
  /* css transition is running */
}
```
如果不喜欢写样式也可以直接用style属性来设置
```ts
<NavLink  viewTransition  style={({isActive,isPending,isTransitioning})=>{
    return {
        marginRight:'10px',
        color:isActive?'red':'blue',
        backgroundColor:isPending?'yellow':'transparent', 
    }
}} to="/index/about">About</NavLink>
```
:::warning
1.viewTransition 需要谷歌111版本才能使用，注意兼容性
2.pending只有数据模式，和框架模式才能使用，声明式路由不能使用
:::

### useNavigate
`useNavigate` 是一个 `React-router` 的钩子，用于编程式导航，的路由跳转。

例如倒计时结束后，自动返回跳转等,因为这种操作属于逻辑性操作，这时候组件方式的跳转就不合适了，这时候就需要使用编程式跳转。

```ts
import { useNavigate } from 'react-router';

const navigate = useNavigate();
setTimeout(() => {
    navigate('/home');
}, 1000);
```

**参数**
跟Link组件的参数类似

* 第一个参数: to跳转的路由 `navigate(to)`
* 第二个参数: options配置对象 `navigate(to,options)`
    * `replace`: 是否替换当前路由
    * `state`: 传递的数据
    * `relative`: 相对路径
    * `preventScrollReset`: 是否阻止滚动重置

**to**
```ts
import { useNavigate } from 'react-router'; // 导入useNavigate
const navigate = useNavigate(); // 获取navigate函数
navigate('/home'); // 跳转路由
```

**options-replace**
跳转页面的时候，是否替换当前路由`navigate('/home',{replace:true});`

**options-state**
传递数据，在跳转的页面中使用通过 `useLocation` 的state属性获取`navigate('/home',{state:{name:'张三'}});`

**options-relative**
跳转的方式，默认是绝对路径，如果想要使用相对路径，需要设置为`relative:'path'`;`navigate('/home',{relative:'path'});`

**options-viewTransition**
跳转页面的时候，是否启用视图过渡,自动增加页面跳转的动画效果。`navigate('/home',{viewTransition:true});`

**redirect**
`redirect` 是用于重定向，通常用于 `loader` 中，当 `loader` 返回 `redirect` 的时候，会自动重定向到 `redirect` 指定的路由。

### 案例以及用法
权限验证，例如这个路由需要登录才能访问，如果未登录则重定向到登录页。
```ts
import { redirect } from "react-router";
{
  path: "/home",
  loader: async ({request}) => {
    const isLogin = await checkLogin();
    if(!isLogin) return redirect('/login');
    return {
        data: 'home'
    }
  }
} 
```

## React-router v7 第八章(边界处理)
**边界处理**

边界处理包含了`错误处理`，`ErrorBoundary`，`404页面等错误处理`

### 404页面处理
404页面指的是当React-router路由匹配不到时，显示的页面，例如我们的路由是/home,/about,当你去跳转到一个不存在的路由比如/aaa时，就会显示404页面。
不过react-router自带的404页面太丑了，更多的时候我们需要自定义404页面。

配置
* 使用`*`作为通配符，当路由匹配不到时，显示404页面
* 使用`Component: NotFound`作为404页面组件
```ts
const router = createBrowserRouter([
    {
        path: '/index',
        Component: Layout,
        children: [
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ],
    },
    {
        path: '*', // [!code highlight] 通配符，当路由匹配不到时，显示404页面  
        Component: NotFound, // [!code highlight] 404页面组件
    },
]);
```

**404.tsx**
```ts
import { Link } from 'react-router'
export default function NotFound() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5'
        }}>
            <h1 style={{ fontSize: 96, color: '#1890ff', margin: 0 }}>404</h1>
            <p style={{ fontSize: 24, color: '#888', margin: '16px 0 0 0' }}>
                抱歉，您访问的页面不存在
            </p>
            <Link
                to="/"
                style={{
                    marginTop: 32,
                    color: '#1890ff',
                    fontSize: 18,
                    textDecoration: 'underline'
                }}
            >
                返回首页
            </Link>
        </div>
    )
}
```

### ErrorBoundary
`ErrorBoundary` 是用于捕获路由 `loader` 或 `action` 的错误，并进行处理。

如果 `loader` 或 `action` 抛出错误，会调用 `ErrorBoundary` 组件。
```ts
import NotFound from '../layout/404'; // 404页面组件
import Error from '../layout/error'; // 错误处理组件
const router = createBrowserRouter([
    {
        path: '/index',
        Component: Layout,
        children: [
            {
                path: 'home',
                Component: Home,
                ErrorBoundary: Error, //如果组件抛出错误，会调用ErrorBoundary组件
            },
            {
                path: 'about',
                loader: async () => {
                    //throw new Response('Not Found', { status: 404, statusText: 'Not Found' }); 可以返回Response对象
                    //也可以返回json等等
                    throw {
                        message: 'Not Found',
                        status: 404,
                        statusText: 'Not Found',
                        data: '132131',
                    }
                },
                Component: About,
                ErrorBoundary: Error, //如果loader或action抛出错误，会调用ErrorBoundary组件
            },
        ],
    },
    {
        path: '*', 
        Component: NotFound,
    },
]);
```
并且返回的错误信息可以通过一个 `hooksuseRouteError` 获取到

**error.tsx**
```ts
import { useRouteError } from 'react-router'

export default function Error() {
    const error = useRouteError()
    return <div>{error.message}</div>
}
```













