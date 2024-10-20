import uniapp from '../router/uniapp'
import vue from '../router/vue'
import react from '../router/react'
import c from '../router/c'

const introduction = {
  text: '开始',
  collapsed: false,
  base: '/introduction',
  items: [
    { text: '简介', link: '/' },
    { text: '快速上手', link: '/quick-start' },
  ],
}

const sundry = {
  text: '杂项',
  collapsed: false,
  base: '/sundry',
  items: [
    { text: '概述', link: '/' },
    { text: 'css布局', link: '/css' },
    { text: '工具代码', link: '/toolCode' },
    { text: 'git记录', link: '/git' },
    { text: 'vs code配置', link: '/settings' },
    { text: 'node生态环境', link: '/node' },
    { text: '个人记录', link: '/my' },
  ],
}

const sidebar = {
  '/': [ introduction, uniapp, vue, react, c, sundry ],
}

export default sidebar
