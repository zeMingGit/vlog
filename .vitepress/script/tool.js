/**
 * @description 作用是读取指定文件夹下的所有文件 --暂时弃用(已废弃！)
 * @param {Object} params 参数对象
 * @param {String} params.currentPath 当前路径
 * @param {Number} [params.level=1] 向上级目录的层数
 * @param {String} [params.parentPath=''] 指定的父级路径
 * @param {Boolean} [params.isBackFile=true] 是否返回文件夹的名称
 * @throws {TypeError} 如果 currentPath 或 parentPath 参数不是字符串类型
 * @throws {Error} 如果指定路径不存在
 * @returns {Array} 返回一个数组，数组中包含指定文件夹下的所有文件名或文件夹名（根据 isBackFile 参数决定）
 * @author zeMing
 */
import fs from 'fs'
import path from 'path'

// 调用示例：const files = readdirFiles({ currentPath: __dirname, level: 3, parentPath: 'router', })
export const readdirFiles = (params) => {
  const {
    currentPath,
    level = 1,
    parentPath,
    isBackFile = false
  } = params

  if (typeof currentPath !== 'string' || typeof parentPath !== 'string') {
    throw new TypeError('currentPath和parentPath参数必须是字符串 at tool.js')
  }
  const filesList = [] // 存储文件名列表
  let filePath = currentPath
  for (let i = 0; i < level; i++) {
    filePath = path.join(filePath, '../')
  }
  filePath = path.join(filePath, parentPath)
  if (!fs.existsSync(filePath)) {
    throw new Error('指定路径不存在 at tool.js')
  }
  const files = fs.readdirSync(filePath)

  files.forEach((file) => {
    const stats = fs.statSync(path.join(filePath, file))
    if (stats.isFile()) {
      const fileName = file.split('.')[0]
      filesList.push(fileName)
    } else if (isBackFile) {
      filesList.push(file)
    }
  })
  return filesList
}


/**
 * @description 作用是读取指定文件夹下的所有文件
 * @param {Object} params 参数对象
 * @param {String} params.path 当前路径
 * @param {Boolean} [params.isBackSuffix=false] 是否返回文件后缀名
 * @throws {TypeError} 如果 path 参数不是字符串类型
 * @throws {Error} 如果指定路径不存在
 * @returns {Array} 返回一个数组，数组中包含指定文件夹下的所有文件名或文件夹名（根据 isBackSuffix 参数决定） at tool.js
 * @example
 * const files = readdirFilesV2({ path: 'docs/doc/vue2', })
 * // files = ['index', 'precision']
 */
export const readdirFilesV2 = (params) => {
  const {
    path,
    isBackSuffix = false,
    isBackPath = false,
  } = params

  try {
    const fileList = fs.readdirSync(path).map((pkg) => {
      if (!fs.statSync(path + '/' + pkg).isFile()){
        return null
      }
      if (!isBackSuffix) {
        pkg = pkg.split('.')[0]
      }
      return isBackPath ? `/${path}/${pkg}` : pkg
    }).filter(file => file !== null)
    return fileList
  } catch (error) {
    console.error('读取目录时出错：', error)
    throw error
  }
}
