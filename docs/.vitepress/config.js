import lastUpdated from './script/LastTime'
import search from './script/Search'

export default {
  title: 'zeMing',
  description: '',
  lang: 'zh-CN',
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: 'https://vitejs.dev' },
  },
  cleanUrls: true, //是否启用干净的URL，例如/about代替/about.html
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    copyCode: {
      buttonText: '复制代码', // 在这里更改按钮文字
      errorText: '复制失败', // 更改复制失败时的提示文字
      successText: '已复制' // 更改成功复制时的提示文字
    },
    outline: [2, 4], // 设置标题的大纲深度，即显示到哪一级标题
    outlineTitle: '本页目录', // 设置大纲的标题
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
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
          collapsed: false,
          items: [
            { text: '简介', link: '/doc/introduction/' },
            { text: '快速上手', link: '/doc/introduction/quick-start' },
          ],
        },
        {
          text: 'git',
          collapsed: false,
          items: [
            { text: '问题', link: '/doc/git/' },
          ]
        }
      ]
    },
    search: search(), // 搜索配置
    lastUpdated: lastUpdated(), // 允许自定义最后更新文本和日期格式。
    docFooter: { prev: '上一页', next: '下一页' }, // 自定义上一个和下一个链接上方显示的文本
    // 文章底部链接
    editLink: {
      pattern: 'https://gitee.com/zeminga/vlog',
      text: '在gitee上编辑此页面'
    },
  }
}