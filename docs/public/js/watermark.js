const watermarkText = '@zeMing';

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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px Arial';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';

  // 计算水印文本的行数和列数
  const textWidth = ctx.measureText(watermarkText).width;
  const rowCount = Math.ceil(canvas.height / (textWidth + 40));
  const columnCount = Math.ceil(canvas.width / (textWidth + 40));

  // 绘制水印文本
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      const x = column * (textWidth + 100) + 30;
      const y = row * (textWidth + 60) + 100;

      ctx.save();
      ctx.translate(x, y);
      const angle = -35;
      ctx.rotate(angle * Math.PI / 180);
      ctx.fillText(watermarkText, 0, 0);
      ctx.restore();
    }
  }
}

// 使用 MutationObserver 监听 DOM 变化并绘制水印
function observeDOMChanges() {
  const observer = new MutationObserver(function(mutationsList) {
    for(let mutation of mutationsList) {
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

initWatermark()
