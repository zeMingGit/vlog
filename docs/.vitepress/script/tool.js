/**
 * @description 作用是读取指定文件夹下的所有文件
 * @param {Array} beforeFileName __dirname 当前文件的绝对路径
 * @param {*} level 递归的层级
 * @param {*} pathName 读取的文件夹名称
 * @param {*} flagSuffix 是否需要返回文件后缀
 * @returns {Array} 返回一个数组，数组中包含指定文件夹下的所有文件
 * @author zeMing
 */
import fs from 'fs'
import path from 'path'

export const readdirFiles = (beforeFileName, level = 1, pathName, flagSuffix = false) => {
  if (typeof pathName !== 'string') {
    throw new TypeError('tool.js-pathName参数必须是一个字符串')
  }
  let currentDir = path.dirname(beforeFileName)
  let filesList = [] // 存储文件列表
  for (let i = 0; i < level; i++) {
    level - 1
    const result = readdirFiles(currentDir, level - 1, pathName)
    filesList = filesList.concat(result) // 将递归调用的结果合并到文件列表中
  }
  if (level != 0) return filesList
  const siblingFolderPath = path.join(currentDir, pathName)
  if (!fs.existsSync(siblingFolderPath)) {
    throw new Error('tool.js-读取的文件夹不存在')
  }
  const files = fs.readdirSync(siblingFolderPath)
  if (!flagSuffix) {
    files.forEach((item, index) => {
      files[index] = item.split('.')[0]
    })
    return files
  }
  filesList = filesList.concat(files) // 将当前文件夹下的文件合并到文件列表中
  return filesList
}
