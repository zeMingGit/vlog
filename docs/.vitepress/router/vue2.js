// 作者: zeMing
import fs from 'fs'
import path from 'path'
const currentDir = path.dirname(__dirname)
const grandfatherDir = path.dirname(currentDir)
const siblingFolderName = 'doc/vue2'
const siblingFolderPath = path.join(grandfatherDir, siblingFolderName)
const files = fs.readdirSync(siblingFolderPath)

let text = new Map([
  ['index', '概述'],
  ['precision', 'Number精度问题'],
])
let items = files.map(item => {
  const name = item.split('.')[0]
  return {
    text: text.get(name) || name,
    link: `/doc/vue2/${name}`
  }
})

const vue2 ={
  text: 'vue2',
  collapsed: false,
  items,
}

export default vue2