import uniapp from '../router/uniapp'
import vue from '../router/vue'
import react from '../router/react'
import python from '../router/python'
import cli from '../router/cli'

const introduction = {
  text: '开始',
  collapsed: false,
  base: '/introduction',
  items: [
    { text: '简介', link: '/' },
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
    { text: '个人记录', link: '/my' },
  ],
}

const sidebar = {
  '/': [ introduction, vue, uniapp, react, cli, python, sundry ],
}

export default sidebar
