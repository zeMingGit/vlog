// 作者: zeMing
import { readdirFiles } from '../script/tool.js'
const files = readdirFiles(__dirname, 1, 'doc/vue2')

let text = new Map([
  ['index', '概述'],
  ['precision', 'Number精度问题'],
])
let items = files.map(item => {
  return {
    text: text.get(item),
    link: `/doc/vue2/${item}`
  }
})

const vue2 ={
  text: 'vue2',
  collapsed: false,
  items,
}

export default vue2