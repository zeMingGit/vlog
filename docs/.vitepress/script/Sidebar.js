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
    vue2,
    vue3,
    {
      text: 'git',
      collapsed: false,
      items: [
        { text: '问题', link: '/doc/git/' },
      ]
    },
  ]
}

export default sidebar
