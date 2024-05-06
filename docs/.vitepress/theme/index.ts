import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VueAmazingUI from 'vue-amazing-ui'
import Layout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(VueAmazingUI)
  },
} satisfies Theme