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
在这可以学习到具体信息：[视频教程地址](https://www.bilibili.com/video/BV1ZB4y1Z7o8?spm_id_from=333.788.player.switch&vd_source=636e79898d369bbe2acb20cb13cd6463&p=40)

### 1. 在store中这样去定义它
::: code-group
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
    addToNum(state, action) {
      state.count += action.payload
    },
  }
})

// 解构出创建action对象的函数 (actionCreater)
const { inscrement, decrement, addToNum } = countStore.actions
// 获取reducer函数
const reducer = countStore.reducer

export { inscrement, decrement, addToNum }
export default reducer
```
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
:::

### 2. 在main.tsx中挂载react-redux
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

### 3. 在页面中使用
::: tip 提示
**`useSelector`**：在react组件中使用store中的数据，需要一个钩子函数- useSelector，它的作用就是把store中的数据映射到组件中。

**`useDispatch`**：在react组件中修改store中的数据，需要借助另外一个hook函数- useDispatch，它的作用是生成提交action对象的dispatch函数
:::
```jsx
import { useSelector, useDispatch } from 'react-redux'
import { inscrement, decrement, addToNum } from './store/modules/countStore'

function App() {
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div>
      this is app { count }

      <button onClick={() => dispatch(inscrement())}>加count</button>
      <button onClick={() => dispatch(decrement())}>减count</button>

      {/* action传参 */}
      <button onClick={() => dispatch(addToNum(10))}>加count + 10</button>
      <button onClick={() => dispatch(addToNum(20))}>加count + 20</button>
    </div>
  )
}
```

### 4. 异步状态操作
::: code-group
``` jsx [在页面使用]
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannelList } from './store/modules/channelStore'

function App() {
  const { channelList } = useSelector(state => state.channel)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div>
      <ul>
        {
          channelList.map((item) => {
            return <li key={item.id}>{ item.name }</li>
          })
        }
      </ul>
    </div>
  )
}
export default App
```
``` jsx [在channelStore定义]
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannels(state, action) {
      state.channelList = action.payload
    }
  },
})

const { setChannels } = channelStore.actions
const reducer = channelStore.reducer

// 异步请求部分
const fetchChannelList = () => {
  return async(dispatch) => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    dispatch(setChannels(res.data.data.channels))
  }
}

export { fetchChannelList }
export default reducer
```
``` jsx [在store/index.ts]
import { configureStore } from "@reduxjs/toolkit"
import channelReducer from './modules/channelStore'

const store = configureStore({
  reducer: {
    channel: channelReducer,
  }
})

export default store
```
:::

## 三、调试
安装浏览器插件 `Redux DevTools`进行调试Redux
