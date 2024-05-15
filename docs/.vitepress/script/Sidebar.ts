import uniapp from '../router/uniapp'
import vue2 from '../router/vue2'
import vue3 from '../router/vue3'

const introduction = {
  text: '开始',
  collapsed: false,
  base: '/src/introduction',
  items: [
    { text: '简介', link: '/' },
    { text: '快速上手', link: '/quick-start' },
  ],
}

const sundry = {
  text: '杂项',
  collapsed: false,
  base: '/src/sundry',
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
  '/src/': [ introduction, uniapp, vue3, vue2, sundry ],
}

export default sidebar
