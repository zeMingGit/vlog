export default {
  title: 'zeMing',
  description: '',
  lang: 'zh-CN',
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: 'https://vitejs.dev' },
  },
  themeConfig: {
    nav: [
      { text: '开始', link: '/doc/introduction/' },
      {
        text: "关于",
        items: [
          { text: '常见问题', link: '/doc' },
          { text: '团队', link: '/doc' },
          { text: '关于我们', link: '/doc' },
        ],
      },
    ],
    sidebar: {
      '/doc/': [
        {
          text: '开始',
          // collapsible: true,
          items: [
            { text: '简介', link: '/doc/introduction/' },
            { text: '快速上手', link: '/doc/introduction/quick-start' },
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    }
  }
}