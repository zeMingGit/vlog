<template>
  <DefaultTheme.Layout />
  <ClientOnly>
    <Watermark 
      fullscreen
      content="zeMing"
      :zIndex="0"
      :fontSize="18"
    />
  </ClientOnly>

  <!-- <Layout>
    <template #home-hero-image>
      <HeroImage />
    </template>
  </Layout> -->
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { Watermark } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
// import HeroImage from './components/HeroImage.vue'
// const { Layout } = DefaultTheme

const markImg = 'https://cdn.chinachdu.com/webStatic/wechat-applets/nyt-static/xin_vlogLogoSun.svg'

</script>