# 刻度进度仪表盘

## 概要
`提示：uniapp自定义进度刻度仪表盘`

在最近的 **app** 应用开发过程中，我遇到了许多图表展示的问题。为什么 `ECharts` 不是开发应用的首选？我们不得不使用不支持 `TypeScript` 的 `uCharts` 。uCharts也是依托答辩。尽管uCharts是开源的，但它的可视化配置参数需要收费。尽管如此，我们仍应怀着感恩的心去使用它（我开玩笑的🙃）。

## 效果展示
* 参数配置

完成百分比：<InputNumber v-model:value="props.threshold" precision="1" :min="0" :max="1" @change="onChange" />

* 效果如图
<view class="gauge">
  <canvas :id="canvasId" ref="canvas" :canvas-id="canvasId" />
  <view class="maskGure">
    <view class="percentage" :style="{color: props.color}">
      {{ props.threshold * 100 }}<text class="unit">%</text>
    </view>
    <view class="title">{{ props.title }}</view>
  </view>
</view>

<script setup>
import { ref, onMounted, onBeforeUnmount, unref, nextTick } from 'vue'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const props = ref({
  width: Number,
  height: Number,
  tickCount:  20, // 格子数,
  threshold: 0.5, // 完成百分比
  duration: 300, // 动画持续时间，单位为毫秒
  startAngle: 0.85, // 起始角度，0为3点钟位置
  endAngle: 2.15, // 结束角度，2为2 * Math.PI，即完整一圈
  color: '#1890FF', // 颜色
  title: '完成度', // 标题
})


const canvas = ref(null)
const canvasId = ref(nanoid())
let animationFrameId = null

const drawGauge = (highlightedTicks, canvasWidth, canvasHeight) => {
  const ctx = canvas.value.getContext('2d')
  const { tickCount, startAngle, endAngle, threshold, color } = unref(props)
  const radius = canvasWidth / 2
  const tickLength = 10
  const angleRange = (endAngle - startAngle) * Math.PI
  const angleStep = angleRange / tickCount
  const thresholdIndex = Math.floor(tickCount * threshold)

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.lineWidth = 2

  for (let i = 0; i <= tickCount; i++) {
    const angle = startAngle * Math.PI + i * angleStep
    const startX = radius + Math.cos(angle) * (radius - tickLength)
    const startY = radius + Math.sin(angle) * (radius - tickLength)
    const endX = radius + Math.cos(angle) * radius
    const endY = radius + Math.sin(angle) * radius

    // 设置不同的刻度颜色
    if (thresholdIndex > 0 && i <= highlightedTicks && i <= thresholdIndex) {
      ctx.strokeStyle = color // 自定义颜色
    } else {
      ctx.strokeStyle = '#CFCFCF' // 默认颜色
    }

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }
}

const animateGauge = (canvasWidth, canvasHeight) => {
  const { duration, tickCount, threshold } = unref(props)
  const thresholdIndex = Math.floor(tickCount * threshold)
  const startTime = Date.now()

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const highlightedTicks = Math.floor(thresholdIndex * progress)

    drawGauge(highlightedTicks, canvasWidth, canvasHeight)

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const onChange = (s) => {
  nextTick(() => {
    animateGauge(240 / 2, 195 / 2)
  })
}

onMounted(() => {
  const canvasElement = canvas.value
  const canvasWidth = 240 / 2 || canvasElement.clientWidth
  const canvasHeight = 195 / 2 || canvasElement.clientHeight

  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight

  animateGauge(canvasWidth, canvasHeight)
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>
<style scoped lang="scss">
.gauge {
  position: relative;

  canvas {
    margin: auto;
  }

  .maskGure {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .percentage {
      padding-top: 20rpx;
      font-size: 40rpx;
      line-height: 40rpx;

      .unit {
        margin-left: 8rpx;
        font-size: 24rpx;
        line-height: 24rpx;
      }
    }

    .title {
      position: absolute;
      bottom: 0;
      font-size: 28rpx;
      line-height: 28rpx;
      color: #666;
    }
  }
}
</style>


## 技术细节
### 1. 声明组件
::: code-group
```vue [template]
<template>
  <view class="gauge">
    <canvas :id="canvasId" ref="canvas" :canvas-id="canvasId" />
    <view class="maskGure">
      <view class="percentage" :style="{color: color}">
        {{ threshold * 100 }}<text class="unit">%</text>
      </view>
      <view class="title">{{ title }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const props = defineProps({
  width: Number,
  height: Number,
  tickCount: {
    type: Number,
    default: 20 // 格子数
  },
  threshold: {
    type: Number,
    default: 0 // 完成百分比
  },
  duration: {
    type: Number,
    default: 300 // 动画持续时间，单位为毫秒
  },
  startAngle: {
    type: Number,
    default: 0.85 // 起始角度，0为3点钟位置
  },
  endAngle: {
    type: Number,
    default: 2.15 // 结束角度，2为2 * Math.PI，即完整一圈
  },
  color: {
    type: String,
    default: '#1890FF' // 颜色
  },
  title: {
    type: String,
    default: '' // 标题
  }
})

const canvas = ref(null)
const canvasId = ref(nanoid())
let animationFrameId = null

const drawGauge = (highlightedTicks, canvasWidth, canvasHeight) => {
  const ctx = uni.createCanvasContext(canvasId.value)
  const { tickCount, startAngle, endAngle } = props
  const radius = canvasWidth / 2
  const tickLength = 10
  const angleRange = (endAngle - startAngle) * Math.PI
  const angleStep = angleRange / tickCount
  const thresholdIndex = Math.floor(tickCount * props.threshold)

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.setLineWidth(2)

  for (let i = 0; i <= tickCount; i++) {
    const angle = startAngle * Math.PI + i * angleStep
    const startX = radius + Math.cos(angle) * (radius - tickLength)
    const startY = radius + Math.sin(angle) * (radius - tickLength)
    const endX = radius + Math.cos(angle) * radius
    const endY = radius + Math.sin(angle) * radius

    // 设置不同的刻度颜色
    if (thresholdIndex > 0 && i <= highlightedTicks && i <= thresholdIndex) {
      ctx.setStrokeStyle(props.color) // 自定义颜色
    } else {
      ctx.setStrokeStyle('#CFCFCF') // 默认颜色
    }

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }

  ctx.draw()
}

const animateGauge = (canvasWidth, canvasHeight) => {
  const { duration, tickCount } = props
  const thresholdIndex = Math.floor(tickCount * props.threshold)
  const startTime = Date.now()

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const highlightedTicks = Math.floor(thresholdIndex * progress)

    drawGauge(highlightedTicks, canvasWidth, canvasHeight)

    if (progress < 1) {
      // #ifdef APP-PLUS
      animationFrameId = animate()
      // #endif

      // #ifndef APP-PLUS
      animationFrameId = requestAnimationFrame(animate)
      // #endif
    }
  }
  // #ifdef APP-PLUS
  animationFrameId = animate()
  // #endif

  // #ifndef APP-PLUS
  animationFrameId = requestAnimationFrame(animate)
  // #endif
}

onMounted(() => {
  uni.createSelectorQuery()
    .select(`#${canvasId.value}`)
    .boundingClientRect(data => {
      const canvasWidth = props.width || data.width
      const canvasHeight = props.height || data.height

      canvas.value.width = canvasWidth
      canvas.value.height = canvasHeight

      animateGauge(canvasWidth, canvasHeight)
    })
    .exec()
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>
```
```scss
<style scoped lang="scss">
.gauge {
  position: relative;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }

  .maskGure {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .percentage {
      padding-top: 20rpx;
      font-size: 40rpx;
      line-height: 40rpx;

      .unit {
        margin-left: 8rpx;
        font-size: 24rpx;
        line-height: 24rpx;
      }
    }

    .title {
      position: absolute;
      bottom: 0;
      font-size: 28rpx;
      line-height: 28rpx;
      color: #666;
    }
  }
}
</style>
```
:::

### 2. 使用该组件
```vue
<Gauge title="完成" :threshold="0.64" color="#FF6021" />
```

## 小结
` 提示：刻度进度仪表盘`