const watermarkText = 'zeMing';

// 创建水印画布
function createWatermarkCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'watermark-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
}

// 绘制水印文本
function drawWatermarkText() {
  const canvas = document.getElementById('watermark-canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = 30;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';

  const watermarkWidth = ctx.measureText(watermarkText).width;
  const watermarkHeight = fontSize;

  const numColumns = Math.floor(canvas.width / (watermarkWidth + 20));
  const numRows = Math.ceil(canvas.height / (watermarkHeight + 20));

  for (let row = 0; row < numRows; row++) {
    const xOffset = row % 2 === 0 ? 0 : (watermarkWidth + 20) / 2;

    for (let column = 0; column < numColumns; column++) {
      const x = xOffset + column * (watermarkWidth + 100);
      const y = row * (watermarkHeight + 150);

      ctx.save(); // 保存当前的绘图状态
      ctx.translate(x, y); // 平移到水印位置
      ctx.rotate((-35 * Math.PI) / 180); // 旋转35°，注意角度需要转换为弧度
      ctx.fillText(watermarkText, 0, 0); // 绘制旋转后的水印文本
      ctx.restore(); // 恢复之前的绘图状态
    }
  }
}

// 使用 MutationObserver 监听 DOM 变化并绘制水印
function observeDOMChanges() {
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        drawWatermarkText();
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

// 初始化水印
function initWatermark() {
  createWatermarkCanvas();
  drawWatermarkText();
  observeDOMChanges();
}

initWatermark();
