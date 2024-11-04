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
## 二、使用
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

## 最后
待补充...