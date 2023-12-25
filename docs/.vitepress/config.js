import lastUpdated from './script/LastTime'
import search from './script/Search'
import sidebar from './script/Sidebar'
import nav from './script/Nav'

export default {
  title: 'zeMing',
  description: '',
  lang: 'zh-CN',
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: 'https://vitejs.dev' },
  },
  markdown: {
    lineNumbers: true,
  },
  cleanUrls: true, //是否启用干净的URL，例如/about代替/about.html
  head: [
    ['link', { rel: 'icon', href: '/img/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '/style/index.css' }],
    // ['script', { src: '/js/baidu-analytics.js' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?caeddcfe6f8c0b222474f7907aedb4a1"
        var s = document.getElementsByTagName("script")[0]
        s.parentNode.insertBefore(hm, s)
      })()
    `],
  ],
  themeConfig: {
    nav, // 导航栏配置
    sidebar, // 侧边栏配置
    search, // 搜索配置
    lastUpdated, // 允许自定义最后更新文本和日期格式
    logo: { light: "/img/logo.svg", dark: "/img/logoFFF.svg" },
    copyCode: {
      buttonText: '复制代码', // 在这里更改按钮文字
      errorText: '复制失败', // 更改复制失败时的提示文字
      successText: '已复制' // 更改成功复制时的提示文字
    },
    outline: [2, 4], // 设置标题的大纲深度，即显示到哪一级标题
    outlineTitle: '本页目录', // 设置大纲的标题
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    docFooter: { prev: '上一页', next: '下一页' }, // 自定义上一个和下一个链接上方显示的文本
    socialLinks: [
      { icon: 'github', link: 'https://github.com/2439340964' },
    ],
    // 文章底部链接
    editLink: {
      pattern: 'https://gitee.com/zeminga/vlog',
      text: '在gitee上编辑此页面'
    },
    footer: {
      message: '欢迎加入我们，一起来完善小棱镜文档吧',
      copyright: copyright(),
    },
    darkModeSwitchLabel: '切换外观',
  }
}

function copyright() {
  let endYear = new Date().getFullYear()
  endYear = endYear > 2023 ? `2023-${endYear}` : 2023
  return `Copyright©${endYear}  zeMing`
}