const watermarkText = 'zeMing';
let canvas;

// 创建水印画布
function createWatermarkCanvas() {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  const fontSize = 30;

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

  const backgroundImage = canvas.toDataURL();
  document.body.style.backgroundImage = `url('${backgroundImage}')`;
}

// 初始化水印
function initWatermark() {
  createWatermarkCanvas();

  // 监听窗口尺寸变化事件
  window.addEventListener('resize', createWatermarkCanvas);
}

initWatermark();
