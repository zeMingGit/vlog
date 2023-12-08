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
    {
      text: 'uniapp',
      collapsed: false,
      items: [
        { text: '概述', link: '/doc/uniapp/' },
        { text: 'npm获取命令行参数', link: '/doc/uniapp/get-params' },
      ]
    },
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
