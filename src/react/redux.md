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
   │  ├─ countStore.ts
   │  └─ xxx.ts
   └─ index.ts
```
:::

## 二、定义与使用
在store中这样去定义它：
::: code-group
``` jsx [store/index.ts]
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/countStore'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store
```
``` jsx [store/modules/countStore]
import { createSlice } from '@reduxjs/toolkit'

const countStore = createSlice({
  name: 'count',
  // 初始化state
  initialState: {
    count: 0,
  },
  // 修改状态的方法，同步方法 支持直接修改
  reducers: {
    inscrement (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
  }
})

const { inscrement, decrement } = countStore.actions
const reducer = countStore.reducer

export { inscrement, decrement }
export default reducer
```
:::

在main.tsx中挂载react-redux
``` jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './store/index.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

在页面中使用：
```jsx
import { useSelector, useDispatch } from 'react-redux'
import { inscrement, decrement } from './store/modules/countStore'
function App() {
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div>
      this is app { count }

      <button onClick={() => dispatch(inscrement())}>加count</button>
      <button onClick={() => dispatch(decrement())}>减count</button>
    </div>
  )
}
```