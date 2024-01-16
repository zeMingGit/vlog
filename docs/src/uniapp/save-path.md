# uniapp文件下载保存
## 概要

` 提示：uniapp文件下载保存`

在Uni-app项目中，通常会涉及到文件的下载保存和在线预览。

在微信小程序中，`wx.saveFile(Object object)`接口已停止维护，建议使用`uni.downloadFile`方法进行文件下载，并配合`uni.getFileSystemManager`对象中的方法来处理文件。

## 技术细节

` 提示：具体实现`

#### 1. base64在线预览/下载
```vue
<script setup>
  // 此处data为base64
  const arrayBuffer = uni.base64ToArrayBuffer(data)
  const fs = uni.getFileSystemManager()
  const filePath = `${wx.env.USER_DATA_PATH}/jcReport.pdf`
  try {
    const res = fs.writeFileSync({
      filePath, // 临时文件路径
      arrayBuffer,
      'binary'
    })

    // 预览文件操作
    uni.openDocument({
      filePath, // 临时文件路径
      success:  (res) => {
        console.log('打开PDF成功')
      },
      fail: (error) => {
        uni.showToast({
          title: '打开PDF失败',
          icon: 'none',
        })
        console.error('打开PDF失败：', error)
      }
    })

    // 保存文件操作
    const saveFile: { savedFilePath } = fs.saveFileSync({ filePath, filePath })
    if (savedFilePath) {
      uni.showToast({
        title: '保存PDF文件成功',
        icon: 'none',
      })
    }
  } catch(e) {
    console.error(e)
    uni.showToast({
      title: '下载失败，稍后再试',
      icon: 'none',
    })
  }
</script>
```



## 小结
` 提示：`


<style scoped>
.vp-doc p {
  word-break: break-all;
}
</style>