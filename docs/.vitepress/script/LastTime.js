// 允许自定义最后更新文本和日期格式。
function lastUpdated() {
  return {
    text: '更新时间',
    formatOptions: {
      locale: 'zh-CN',
      dateStyle: 'long',
      // dateSty用于指定日期的样式，可选值包括 'full'、'long'、'medium' 和 'short'
      timeStyle: 'medium',
      // timeStyle用于指定时间的样式，可选值包括 'full'、'long'、'medium' 和 'short'
    }
  }
}

export default lastUpdated
