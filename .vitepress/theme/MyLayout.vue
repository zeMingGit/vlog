<template>
  <DefaultTheme.Layout />
  <ClientOnly>
    <Watermark 
      fullscreen
      content="zeMing"
      :zIndex="0"
      :fontSize="18"
      :color="color"
    />
  </ClientOnly>

  <!-- <Layout>
    <template #home-hero-image>
      <HeroImage />
    </template>
  </Layout> -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Watermark } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
// import HeroImage from './components/HeroImage.vue'
// const { Layout } = DefaultTheme

let color = ref('rgba(0,0,0,.15)')
const { isDark } = useData()
watch(isDark, (old) => {
  color.value = old ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.15)'
}, {
  immediate: true,
  deep: true
})

const markImg = 'https://cdn.chinachdu.com/webStatic/wechat-applets/nyt-static/xin_vlogLogoSun.svg'
</script>
