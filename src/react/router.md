# React Router 路由

## 概要
`提示：什么是 React Router？`

`React Router` 是一个为 React 设计的路由库，用于在应用中实现页面导航。它允许你定义不同的 URL 路径，并根据这些路径渲染相应的组件，从而实现页面的切换。

## 一、安装
安装 [React Router](https://reactrouter.com/en/main) 库，也可以在[这里](https://blog.csdn.net/lph159/article/details/140732920)获取到 ReactRouter 教程
```sh
npm install react-router-dom
```

::: details 其中项目结构大致为此
```
.
└─ router
   ├─ modules
   │  ├─ xxx.tsx
   │  └─ xxx.tsx
   └─ index.tsx
```
:::
## 二、定义
在这可以学习到具体信息：[视频教程地址](https://www.bilibili.com/list/watchlater?oid=577161016&bvid=BV1ZB4y1Z7o8&spm_id_from=333.1007.top_right_bar_window_view_later.content.click&p=53)

### 1. 在router中这样去定义它
::: danger 警告
注意：在声明 router 文件里的文件时，文件格式必须是tsx格式，否则ts会将组件误解为类型
:::
::: code-group
```tsx [router/index.tsx]
import { useRoutes, createBrowserRouter } from 'react-router-dom'
import Login from '../page/Login'
import Article from '../page/Article'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/article',
    element: <Article />,
  }
])

export default router
```

```tsx [page/Login/index.tsx]
const Login: React.FC = () => {
  return <div className="">我是登录页面</div>
}

export default Login
```
:::

### 2. 在main.tsx中挂载react router
```tsx
import { RouterProvider } from 'react-router-dom'
// 自定义router/index.tsx的默认导出
import router from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
```

## 三、使用

### 1. 路由导航跳转
**声明式导航：** 在模板中通过 `<Link/>` 组件描述出要跳转到哪里去，to属性指定要跳转到路由path。

**编程式导航：** 通过 `useNavigate` 钩子得到导航方法，通过调用方法以命令式的形式进行路由跳转。
::: code-group
``` tsx [编程式导航]
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="">我是登录页面</div>

      <button onClick={() => navigate('/article')}>跳转article</button>
    </div>
  )
}

export default Login
```
``` tsx [声明式导航]
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="">我是登录页面</div>

      <Link to={'/article'}>跳转article</Link>
    </div>
  )
}

export default Login
```
:::

### 2. 路由导航跳转传参
::: code-group
``` tsx [searchParams传参]
// 传递
import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="">我是登录页面</div>

      <button onClick={() => navigate('/article?id=123&name=xiaoxiao')}>
        searchParams传参
      </button>
    </div>
  )
}
export default Login

// 接收
import { useSearchParams } from 'react-router-dom'
const Article: React.FC = () => {
  const [params] = useSearchParams()
  return (
    <div className="">
      我是文章 { params.get('id') } { params.get('name') }
    </div>
  )
}
```

``` tsx [params传参]
// 传递
import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="">我是登录页面</div>

      <button onClick={() => navigate('/article/132/xiaoxiao')}>
        params传参
      </button>
    </div>
  )
}
export default Login

// 路由配置
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/article/:id/:name', // 定义占位符
    element: <Article />,
  }
])


// 接收
import { useParams } from 'react-router-dom'
const Article: React.FC = () => {
  const { id, name } = useParams()
  return (
    <div className="">
      我是文章 { id } { name }
    </div>
  )
}
```
:::

### 3. 嵌套路由
::: code-group
``` tsx [路由配置]
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/board',
        element: <Board />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
])
```

``` tsx [Layout页]
import { Link, Outlet } from 'react-router-dom'

const Layout:React.FC = () => {
  return (
    <div>
      <div className="">我是layput</div>
      <Link to="/board">面板</Link>
      <Link to="/about">关于</Link>

      {/* 二级路由出口 */}
      <Outlet />
    </div>
  )
}

export default Layout
```

``` tsx [Board页]
const Board: React.FC = () => {
  return (
    <div className="">我是看板页面</div>
  )
}

export default Board
```
``` tsx [About页]
const About: React.FC = () => {
  return (
    <div className="">我是关于页面</div>
  )
}

export default About
```
:::

### 4. 默认二级路由配置
场景和配置方式：访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置 `去掉path，设置index属性为true`。但是还有最后一步，应该把`layout中它的路径替换为 / `。

::: code-group
``` tsx [路由配置 - 默认二级路由配置]
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // path: '/board',
        index: true, // 默认二级路由配置
        element: <Board />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
])
```

``` tsx [Layout页]
import { Link, Outlet } from 'react-router-dom'

const Layout:React.FC = () => {
  return (
    <div>
      <div className="">我是layput</div>
      {/* 默认二级路由配置 */}
      <Link to="/">面板</Link>
      <Link to="/about">关于</Link>

      {/* 二级路由出口 */}
      <Outlet />
    </div>
  )
}

export default Layout
```
:::

### 5. 404路由配置
在路由表数组的末尾，以 * 号作为路由path配置路由
``` tsx
import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../page/NotFound'

const router = createBrowserRouter([
  ...
  // 404路由配置
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
```

### 6. 路由模式
常见的路由模式有两种，history模式和hash模式，ReactRouter分别由createBrowserRouter 和 createHashRouter函数负责创建


| 路由模式 | url表现     | 底层原理           |         是否需要后端支持  |
| :-------: | :---------: | :--------------:  | :----------: |
| history | url/login   | history对象 + pushState事件 | 需要|
| hash    | url/#/login | 监听 hashChange事件 | 不需要 |

## 最后
待补充...