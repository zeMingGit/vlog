import { readdirFilesV2 } from '../script/tool.js'

let text = new Map([
  ['index', '概述'],
  ['precision', 'Number精度问题'],
])
const items = readdirFilesV2({ path: 'docs/doc/vue2', }).map((pkg) => {
  return {
    text: text.get(pkg),
    link: `/doc/vue2/${pkg}`
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