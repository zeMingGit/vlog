const nav = [
  { text: '开始', link: '/src/introduction/' },
  {
    text: "关于",
    items: [
      { text: '团队', link: '/src/nav/team' },
      { text: '关于我们', link: '/src/nav/about' },
    ],
  },
  {
    text: '文档友链',
    items: [
      {
        items: [
          { text: 'vue', link: 'https://cn.vuejs.org/guide/introduction.html' },
          { text: 'vite', link: 'https://cn.vitejs.dev/' },
          { text: 'pinia', link: 'https://pinia.vuejs.org/zh/introduction.html' },
          { text: 'vuex', link: 'https://next.vuex.vuejs.org/zh/' },
          { text: 'vue-router', link: 'https://next.router.vuejs.org/zh/' },
        ],
      },
      { text: 'uniapp', link: 'https://uniapp.dcloud.net.cn/' },
      { text: 'eslint', link: 'https://eslint.org/docs/latest/use/getting-started' },
      { text: 'vitePress', link: 'https://vitepress.dev/zh/' },
    ],
  }
]

export default nav
