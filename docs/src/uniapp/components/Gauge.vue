<template>
  <view class="gauge" :style="{width: `${width}px`, height: `${height}px`}">
    <canvas :id="canvasId" ref="canvas" :canvas-id="canvasId" />
    <view class="maskGure">
      <view class="percentage" :style="{color: props.color}">
        {{ props.threshold * 100 }}<text class="unit">%</text>
      </view>
      <view class="title">{{ props.title }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, unref, nextTick, toRefs, watch } from 'vue'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const props = defineProps({
  width: {
    type: Number,
    default: 120,
  },
  height: {
    type: Number,
    default: 97,
  },
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
  const ctx = canvas.value.getContext('2d')
  const { tickCount, startAngle, endAngle } = props
  const radius = canvasWidth / 2
  const tickLength = 10
  const angleRange = (endAngle - startAngle) * Math.PI
  const angleStep = angleRange / tickCount
  const thresholdIndex = Math.floor(tickCount * props.threshold)

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
      ctx.strokeStyle = props.color // 自定义颜色
    } else {
      ctx.strokeStyle = '#CFCFCF' // 默认颜色
    }

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }
}

const animateGauge = (canvasWidth = props.width, canvasHeight = props.canvasHeight) => {
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
      animationFrameId = requestAnimationFrame(animate)
    }
  }
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  const canvasWidth = props.width
  const canvasHeight = props.height

  canvas.value.width = canvasWidth
  canvas.value.height = canvasHeight

  // animateGauge(canvasWidth, canvasHeight)
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  } 
})

watch(props, (newpid) => {
  animateGauge()
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="scss" scoped>
.gauge {
  position: relative;
  display: block;
  margin: auto;

  .maskGure {
    position: absolute;
    inset: 0;

    .percentage {
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      font-size: 20px;
      line-height: 20px;
      margin-top: -10%;
      transform: translate(0, 50%);

      .unit {
        margin-left: 4px;
        font-size: 12px;
        line-height: 12px;
      }
    }

    .title {
      width: 100%;
      position: absolute;
      bottom: 0;
      text-align: center;
    }
  }
}
</style>