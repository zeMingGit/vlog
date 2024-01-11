---
layout: home
 
hero:
  name: 小棱镜
  # text: 前端技术预览文档
  tagline: 精确解答，探索无限可能
  image: 
      # src: /img/vue.svg
      src: https://cdn.chinachdu.com/webStatic/wechat-applets/nyt-static/xin_vlogLogo.png
      # src: /img/xin_vlogLogo.png
  actions:
    - theme: brand
      text: 开始使用
      link: /src/introduction/
 
features:
  - icon: ⚡️
    title: 帮助性
    details: 快速查找和使用开发技巧和工具，提高效率
  - icon: 🖖
    title: 快乐性
    details: 分享有趣故事和趣味项目，带来快乐和轻松的体验
  - icon: 🛠️
    title: 编码性
    details: 快速复制代码示例和解决方案，提供高效的编码方法
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from './.vitepress/script/fetchReleaseTag.ts'

fetchReleaseTag()
</script>

<style>
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  }

  .VPImage.image-src {
    padding: 24px;
    border-radius: 50%;
  }
</style>
