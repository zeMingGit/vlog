# uniapp--vue3生成canvas进行电子签名
## 概要

` 提示：使用uniapp中vue3语法，进行canvas电子签名，最后保存图片生成地址`

使用场景：
用户进行电子签名，最后保存用户的签名，生成图片存入数据库等等。。

项目构建：
本教程有多个使用方法，方法一可以减少不必要的代码，封装性较强，推荐使用
方法二可以使用，不是很推荐，代码夯余



## 使用步骤
**方法一：**
`使用vue3的hooks直接封装，减少不必要的代码`

```javascript
// 在hooks目录下，新建index.js
import { ref, unref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export function useDrawSignature(canvasId) {
  let ctx = null
  let isButtonDown = false
  let points = []
  let isSigned = ref(false)

  onLoad(() => {
    ctx = uni.createCanvasContext(canvasId)
    // 设置画笔样式
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  })

    // 触摸开始，获取到起点
  function touchStart(e) {
    let startPoint = { X: e.changedTouches[0].x, Y: e.changedTouches[0].y }
    points.push(startPoint) // 把起点存起来
    ctx.beginPath() // 每次触摸开始，开启新的路径
    isButtonDown = true
  }

  // 触摸移动，获取到路径点
  function touchMove(e) {
    if (isButtonDown) {
      let movePoint = { X: e.changedTouches[0].x, Y: e.changedTouches[0].y }
      points.push(movePoint) // 存点
      let len = points.length
      if (len >= 2) {
        draw() // 绘制路径
      }
    }
  }

  // 触摸结束，将未绘制的点清空防止对后续路径产生干扰
  function touchEnd() {
    points = []
    isButtonDown = false
  }

  // 绘画
  function draw() {
    let point1 = points[0]
    let point2 = points[1]
    points.shift()
    ctx.moveTo(point1.X, point1.Y)
    ctx.lineTo(point2.X, point2.Y)
    ctx.stroke()
    ctx.draw(true)
    isSigned.value = true
  }

  function clear() {
    ctx.clearRect(0, 0, 1000, 1000)
    ctx.draw(true)
    isSigned.value = false
  }

  return {
    isSigned,
    touchStart,
    touchMove,
    touchEnd,
    clear
  }
}
```
`使用：`

```javascript
<template>
	<canvas
	   canvas-id="canvas"
	   class="canvas-inner"
	   disable-scroll="true"
	   @touchstart="touchStart"
	   @touchmove="touchMove"
	   @touchend="touchEnd"
	/>
	 <cover-view class="flex btn flex-end">
	    <cover-view class="clear btn-inner text-center" @click="clear">清空</cover-view>
	    <cover-view class="confirm btn-inner text-center" @click="save">保存</cover-view>
    </cover-view>
</template>
import { useDrawSignature } from '@/hooks/index'
const { isSigned, touchStart, touchMove, touchEnd, clear } = useDrawSignature('canvas')

const save = () => {
	if (!unref(isSigned)) {
		uni.showToast({
			title: '请签名',
			icon: 'none'
		})
		return
	}
}
```

**方法二：(推荐方法一)**

1、` 提示：template部分`

```vue
<template>
  <view class="setUpASeal">
    <canvas
      canvas-id="writeCanvas"
      class="writeCanvas"
      disable-scroll="true"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    />
    <cover-view class="flex btn">
      <cover-view class="clearBtn" @tap="clear">清除</cover-view>
      <cover-view class="saveBtn" @tap="saveCanvas">保存图片</cover-view>
    </cover-view>
  </view>
</template>
```
2、` 提示：script部分`

```vue
<script setup>
import { ref, unref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import * as CASERVICE from '@/caCertification/service/index'
import { uploadFile } from '@/api/index'
import { useAccountStore } from '@/store/account'
const account = useAccountStore()
const userInfo = ref(account.user)

// 初始化画布
let ctx = null
let isButtonDown = false
let lastX = 0
let lastY = 0
let points = []
onLoad(() => {
  ctx = uni.createCanvasContext('writeCanvas')
  // 设置画笔样式
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
})

// 触摸开始，获取到起点
function touchStart(e) {
  lastX = e.changedTouches[0].x
  lastY = e.changedTouches[0].y
  let startPoint = { X:lastX, Y:lastY }
  points.push(startPoint) // 把起点存起来
  ctx.beginPath() // 每次触摸开始，开启新的路径
  isButtonDown = true
}

// 触摸移动，获取到路径点
function touchMove(e) {
  if (isButtonDown) {
    const currentX = e.changedTouches[0].x
    const currentY = e.changedTouches[0].y
    let movePoint = { X:currentX, Y:currentY }
    points.push(movePoint) // 存点
    let len = points.length
    if (len >= 2) {
      draw() // 绘制路径
    }
  }
}

// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
function touchEnd() {
  points = []
  isButtonDown = false
}

// 绘画
function draw() {
  let point1 = points[0]
  let point2 = points[1]
  points.shift()
  ctx.moveTo(point1.X, point1.Y)
  ctx.lineTo(point2.X, point2.Y)
  ctx.stroke()
  ctx.draw(true)
}

const upload = async(tempFilePath) => {
  let res = await uploadFile(tempFilePath)
  const { data } = JSON.parse(res)
  // 保存签章
  let params = {
    handwrittenSignatureUrl: data.url,
    organId: unref(userInfo).doctorLoginInfo.organId,
    doctorId: unref(userInfo).doctorLoginInfo.doctorId,
  }
  let setHandwrittenInfo = await CASERVICE.setHandwrittenSignature(params)
  return setHandwrittenInfo
}

// 保存图片
function saveCanvas() {
  uni.showLoading({
    title: '保存中...',
    mask: true
  })
  uni.canvasToTempFilePath({
    canvasId: 'writeCanvas',
    async success(res) {
      let path = res.tempFilePath
      const setHandwrittenInfo = await upload(path)
      if (setHandwrittenInfo.code + '' === '1') {
        uni.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 600)
      } else {
        uni.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000
        })
      }
    }
  })
  uni.hideLoading()
}

// 清除画布
function clear() {
  ctx.clearRect(0, 0, 1000, 1000)
  ctx.draw(true)
}

</script>
```
3、`提示：style部分`

```scss
<style lang="scss" scoped>
.setUpASeal {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .writeCanvas {
    width: 100%;
    height: 100%;
  }

  .btn {
    position: fixed;
    right: 20rpx;
    bottom: 20rpx;
    z-index: 999;
    font-size: 20rpx;
    color: #fff;
    text-align: center;

    .clearBtn {
      margin-right: 32rpx;
      background-color: #333;
      border-radius: 8rpx;
    }

    .saveBtn {
      background-color: #333;
      border-radius: 8rpx;
    }

    .clearBtn,
    .saveBtn {
      padding: 10rpx 20rpx;
    }
  }
}
</style>
```


## 技术细节
` 提示：这里可以添加技术细节`


## 小结
` 提示：这里可以添加总结`

