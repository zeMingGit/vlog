# Redux 状态管理

## 概要
`提示：什么是 Redux？`

[Redux](https://cn.redux.js.org/introduction/getting-started) 是 JavaScript 应用的状态容器，提供可预测的状态管理。可以将 Redux 与 React 或其他视图库一起使用。它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态。

## 一、安装
`Redux Toolkit` 是 Redux 逻辑的方法，是一套工具的合集。`react-redux` 用来链接 Redux 和 React 组件的中间件
```sh
npm install @reduxjs/toolkit react-redux
```

::: details 其中项目结构大致为此
```
.
└─ store
   ├─ modules
   │  ├─ xxx.ts
   │  └─ xxx.ts
   └─ index.ts
```
:::
