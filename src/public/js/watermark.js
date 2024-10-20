/**
 * @description	创建水印
 * @author zeMing
 */
const watermarkText = 'zeMing'
let canvas
const mutationConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeOldValue: true,
}

// 创建水印画布
function createWatermarkCanvas() {
  if (canvas) {
    document.body.appendChild(canvas)
    return
  }
  canvas = document.createElement('canvas')
  canvas.id = 'watermark-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '-1'
  document.body.appendChild(canvas)
}

// 绘制水印文本
function drawWatermarkText() {
  const ctx = canvas.getContext('2d')
  const fontSize = 30

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'

  const watermarkWidth = ctx.measureText(watermarkText).width
  const watermarkHeight = fontSize

  const numColumns = Math.floor(canvas.width / (watermarkWidth + 20))
  const numRows = Math.ceil(canvas.height / (watermarkHeight + 20))

  for (let row = 0; row < numRows; row++) {
    const xOffset = row % 2 === 0 ? 0 : (watermarkWidth + 20) / 2

    for (let column = 0; column < numColumns; column++) {
      const x = xOffset + column * (watermarkWidth + 100)
      const y = row * (watermarkHeight + 150)

      ctx.save() // 保存当前的绘图状态
      ctx.translate(x, y) // 平移到水印位置
      ctx.rotate((-35 * Math.PI) / 180) // 旋转35°，注意角度需要转换为弧度
      ctx.fillText(watermarkText, 0, 0) // 绘制旋转后的水印文本
      ctx.restore() // 恢复之前的绘图状态
    }
  }
}

// 使用 MutationObserver 监听 DOM 变化并绘制水印
function observeDOMChanges() {
  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      const { removedNodes, type, target, oldValue } = mutationsList[0]
      if (removedNodes[0] === canvas) {
        createWatermarkCanvas(canvas)
        drawWatermarkText()
      }
      if (type === 'attributes' && target.id === 'watermark-canvas' && oldValue) {
        console.log('警告⚠️：检测到水印属性变化！禁止修改水印属性！')
        observer.disconnect()
        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.pointerEvents = 'none'
        canvas.style.zIndex = '-1'
        observer.observe(document.documentElement, mutationConfig)
      }
    }
  })
  observer.observe(document.documentElement, mutationConfig)
}

// 初始化水印
function initWatermark() {
  createWatermarkCanvas()
  drawWatermarkText()
  observeDOMChanges()

  window.addEventListener('resize', () => {
    drawWatermarkText()
  })
}
initWatermark()

/**
 * @description	复制事件，自定义内容
 * @author zeMing
 */
document.addEventListener('keydown', function(event) {
  const { ctrlKey, code, metaKey } = event
  if ((ctrlKey || metaKey) && (code === 'KeyV' || code === 'KeyC')) {
    event.preventDefault() // 阻止默认粘贴行为
    const selectedText = window.getSelection().toString() // 获取选中的文本
    const clipboardData = `${selectedText}\n\n--------------------------------\n来源小棱镜文档：${window.location.href}\n@zeMing所有`
    navigator.clipboard.writeText(clipboardData).then(() => {
    }).catch((error) => {
    })
  }
})