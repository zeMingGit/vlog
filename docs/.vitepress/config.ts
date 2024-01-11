import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'
import { createRequire } from 'module'
import nav from './script/Nav'
import sidebar from './script/Sidebar'
import search from './script/Search'
const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')


export default defineConfig({
  lang: 'zh-CN',
  title: 'zeMing',
  description: 'vlog - 小棱镜 快速入门指南',
  // srcDir: 'src',
  cleanUrls: true, //是否启用干净的URL，例如/about代替/about.html
  locales: {
    root: { label: '简体中文' },
    // en: { label: 'English', link: 'https://vitejs.dev' },
  },
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/img/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '/style/index.css' }],
    ['link', { rel: 'preconnect', href: 'https://2HEGWEY7SW-dsn.algolia.net' }],
    ['script', { src: '/js/baidu-analytics.js' }],
    ['script', { src: '/js/watermark.js', defer: '' }],
  ],
  themeConfig: {
    nav, // 导航栏配置
    sidebar, // 侧边栏配置
    search: {
      provider: 'algolia',
      options: {
        appId: '2HEGWEY7SW',
        apiKey: '2e4d854dceb221dedc1ecb0b397a8373',
        indexName: 'vlogxiao',
        locales: { ...search },
      }
    }, // 搜索配置
    logo: { light: "/img/logo.svg", dark: "/img/logoFFF.svg", width: 24, height: 24 },
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
      copyright: `Copyright© 2023-${new Date().getFullYear()} zeMing`,
    },
    docFooter: { prev: '上一页', next: '下一页' }, // 自定义上一个和下一个链接上方显示的文本
    outline: [2, 4], // 设置标题的大纲深度，即显示到哪一级标题
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        // dateSty用于指定日期的样式，可选值包括 'full'、'long'、'medium' 和 'short'
        timeStyle: 'medium',
        // timeStyle用于指定时间的样式，可选值包括 'full'、'long'、'medium' 和 'short'
      }
    }, // 允许自定义最后更新文本和日期格式
    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页目录', // 设置大纲的标题
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  vite: {
    server: {
      // tip：默认端口号在win系统上有些许问题，自测mac正常。暂时不打开。-zeMing
      // port: 8888, 
      host: true,
      // open: '/', // 不做修改，不打开！！！
    },
  }
})
