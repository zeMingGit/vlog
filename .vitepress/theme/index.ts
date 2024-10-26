import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './MyLayout.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(VueAmazingUI)
  },
} satisfies Theme