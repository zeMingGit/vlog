import uniapp from '../router/uniapp'
import vue2 from '../router/vue2'
import vue3 from '../router/vue3'

const sidebar = {
  '/src/': [
    {
      text: '开始',
      collapsed: false,
      items: [
        { text: '简介', link: '/src/introduction/' },
        { text: '快速上手', link: '/src/introduction/quick-start' },
      ],
    },
    uniapp,
    vue3,
    vue2,
    {
      text: '杂项',
      collapsed: false,
      items: [
        { text: '概述', link: '/src/sundry/' },
        { text: 'css布局', link: '/src/sundry/css' },
        { text: '工具代码', link: '/src/sundry/toolCode' },
        { text: 'vs code配置', link: '/src/sundry/settings' },
        { text: 'git记录', link: '/src/sundry/git' },
      ]
    },
  ]
}

export default sidebar
