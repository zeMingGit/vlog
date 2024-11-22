---
layout: home
 
hero:
  name: 小棱镜
  # text: 前端技术预览文档
  tagline: 探索细节，激发创意
  image: 
      # src: /img/vue.svg
      src: https://cdn.chinachdu.com/webStatic/wechat-applets/nyt-static/xin_vlogLogo.png
      # src: /img/xin_vlogLogo.png
  actions:
    - theme: brand
      text: 快速开始
      link: /introduction/
 
features:
  - icon: ⚡️
    title: 帮助
    details: 快速查找技巧，减少学习曲线，提升工作效率
  - icon: 🖖
    title: 专注
    details: 清晰目标，减少干扰，提高效率，提升质量
  - icon: 🛠️
    title: 编码
    details: 提供代码示例，快速解决问题，提升开发效率
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from '../.vitepress/script/fetchReleaseTag.ts'

onMounted(() => {
  fetchReleaseTag()
})
</script>

<style>
.VPImage.image-src {
  padding: 24px;
  border-radius: 50%;
}
</style>
