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



// // 作者: zeMing
// const vue2 ={
//   text: 'vue2',
//   collapsed: false,
//   items: [
//     { text: '概述', link: '/doc/vue2/' },
//     { text: 'Number精度问题', link: '/doc/vue2/precision' },
//   ]
// }

// export default vue2