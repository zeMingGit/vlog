<template>
 <div class="hero_img flex">
  <img :src="logoSrc" />
</div>

</template>
<script setup>
import { ref } from 'vue'
const logoSrc = ref('https://cdn.chinachdu.com/webStatic/wechat-applets/nyt-static/xin_vlogLogo.jpg')
</script>

<style scoped lang="scss">

</style>
