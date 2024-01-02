import uniapp from '../router/uniapp'
import vue2 from '../router/vue2'
import vue3 from '../router/vue3'

const sidebar = {
  '/doc/': [
    {
      text: '开始',
      collapsed: false,
      items: [
        { text: '简介', link: '/doc/introduction/' },
        { text: '快速上手', link: '/doc/introduction/quick-start' },
      ],
    },
    uniapp,
    vue3,
    vue2,
    {
      text: '杂项',
      collapsed: false,
      items: [
        { text: '概述', link: '/doc/sundry/' },
        { text: 'css布局', link: '/doc/sundry/css' },
        { text: '工具代码', link: '/doc/sundry/toolCode' },
        { text: 'vs code配置', link: '/doc/sundry/settings' },
        { text: 'git记录', link: '/doc/sundry/git' },
      ]
    },
  ]
}

export default sidebar
