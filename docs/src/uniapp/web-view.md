# web-view拓展
## 概要

`提示：讲述场景-使用`

为了满足业务需求，在小程序的登录首页上有一个知情同意书，用户需要点击并阅读该同意书5秒后才能点击一键登录按钮。点击同意书后将跳转到一个 WebView 页面。然而，WebView 页面无法通过设置来调整大小等属性，因此需要在 WebView 页面中进行优化。

为了实现此功能，我们可以采用以下优化方法：
  1. 在 WebView 页面中添加一个按钮和倒计时组件，用于展示倒计时状态和控制按钮可点击性。
  2. 使用 JavaScript 脚本编写倒计时逻辑，控制按钮的状态和倒计时时间，并在倒计时结束后激活按钮，并发送消息给小程序。**注意：会在以下特定时机触发并收到消息：小程序后退、组件销毁、分享、复制链接（2.31.1）。e.detail = { data }，data是多次 postMessage 的参数组成的数组。**

  3. 通过 `postMessage` 方法向小程序发送消息，将多次 postMessage 的参数组成的数组传递给小程序，以实现消息的传递和处理。


## 技术细节

`提示：具体实现如下`
:::tip 微信web-view文档
https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
:::
- #### 在h5页面中，也就是webview页面

这是我的业务逻辑，可省略
```javascript
// 首先在head中添加js
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>


// 获取DOM的行为
const primaryDom = document.querySelector('.primary')

let time = 5
let timer = setInterval(function () {
  if (time < 0) {
    clearInterval(timer)
    primaryDom.innerHTML = '我已阅读并同意'
    return
  }
  primaryDom.innerHTML = `请您仔细阅读并同意隐私政策(${time--}s)`
}, 1000)

primaryDom.addEventListener('click', function () {
  if (time > 0) { return }
  if (window.__wxjs_environment === 'miniprogram') {
    wx.miniProgram.postMessage({ data: { isRead: 'yes' } })
    wx.miniProgram.navigateBack()
    return
  }
})
```

- #### 小程序页面，获取H5传递的参数

```vue
<template>
  <web-view :src="url" @message="bindmessage" />
</template>

<script>
export default {
  methods: {
    bindmessage(res) {
      const { isRead } = res.detail.data[0]
      if (isRead) {
        uni.setStorageSync('isRead', isRead)
      }
    },
  },
}
</script>
```



## 小结
待补充