<template>
  <Layout>
    <template #home-hero-image>
      <HeroImage />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import HeroImage from './components/HeroImage.vue'
const { Layout } = DefaultTheme
</script>