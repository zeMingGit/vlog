# uniapp-cli npm获取命令行参数
## 概要

` 提示：uniapp 用cli工程创建，npm命令启动编译不同的文件`

例如：在package.json中，如下

```javascript:{5-8}
"scripts": {
    "build": "node script/index.js",
    "build:h5": "cross-env NODE_ENV=production UNI_PLATFORM=h5 vue-cli-service uni-build",
    "build:mp-weixin": "cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build",
    // 启动sdy项目
    "dev:h5sdy": "cross-env VUE_APP_HTYPE=SDY NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve",
    // 启动xzrc项目
    "dev:h5xzrc": "cross-env VUE_APP_HTYPE=XZRC NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve",
    "dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch"
  },
```
以上代码，都可以使用 `npm run dev:h5sdy / dev:h5xzrc` 启动，其中区别就是 `VUE_APP_HTYPE` 后面的参数，可以在项目中 `process.env.VUE_APP_HTYPE` 获取到命令行中的参数


## 使用场景

` 提示：这里可以添加技术整体架构`

比如一个成熟的项目，功能都比较齐全。突然有一天，这个项目也会给其他公司机构用，需要重新创建分支？copy一份？no，不需要。

可以继续维护目前这个分支，各自功能可以用节点进行v-if或者其他的一些办法，项目基本配置应该有的吧，比如：在main.js导入项目的基本配置（提前在utils创建一个index.js，各自项目创建各自的js，之后导入到index.js）

有个问题，比如我怎么知道utils里面的index.js怎么动态导入？可以使用本教程

## 技术细节
` 提示：这里可以添加技术细节`


**方法一：**

```javascript
 "scripts": {
    "dev:h5sdy": "cross-env VUE_APP_HTYPE=SDY NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve",
    "dev:h5xzrc": "cross-env VUE_APP_HTYPE=XZRC NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve",
  },
```
`重点为：VUE_APP_HTYPE=SDY，必须以VUE_APP_开头，否则env读取不到`

在项目utils/index.js使用

```javascript
import xzrcyyDatas from './xzrcyyDatas.js' // 导入的是各自项目的基础配置
import sdfyyDatas from './sdfyyDatas.js'

let HTYPE = process.env.VUE_APP_HTYPE

let nodeSettings = {}
if (HTYPE === 'XZRC') {
  nodeSettings = xzrcyyDatas
} else if (HTYPE === 'SDY') {
  nodeSettings = sdfyyDatas
}

export default nodeSettings


// 或者
import xzrcyyDatas from './xzrcyyDatas.js' // 导入的是各自项目的基础配置
import sdfyyDatas from './sdfyyDatas.js'

let HTYPE = process.env.VUE_APP_HTYPE

const mapSettings = {
  'XZRC': xzrcyyDatas,
  'SDY': sdfyyDatas,
}
let nodeSettings = mapSettings[HTYPE]

if (!nodeSettings) {
  // 如果没有匹配的配置，则抛出错误
  throw new Error('VUE_APP_HTYPE是未知值--请检查是否进行配置')
}

export default nodeSettings
```


**方法二：**

```javascript
"scripts": {
    "dev:h5sdy": "cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve --H_TYPE=SDY",
    "dev:h5xzrc": "cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve --H_TYPE=XZRC",
  },
```
`重点为：--H_TYPE=XZRC`

*	在vue.config.js中设置

```javascript
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.argv': JSON.stringify(process.argv)
      })
    ]
  }
}

```

*	在项目utils/index.js使用

```javascript
import xzrcyyDatas from './xzrcyyDatas.js' // 导入的是各自项目的基础配置
import hytDatas from './hytDatas.js'

let argv = process.argv
let H_TYPE = ''
if (argv.length > 0) {
  argv.map((item, index) => {
    if (item.indexOf('H_TYPE') > -1) {
      let hType = item.split('=')[1]
      H_TYPE = hType
    }
  })
}

let nodeSettings = {}
if (H_TYPE === 'XZRC') {
  nodeSettings = xzrcyyDatas
} else if (H_TYPE === 'SDY') {
  nodeSettings = hytDatas
}
export default nodeSettings

```


## 小结
` 提示：方法二有一定优势，可以在命令行拼接参数，考虑到后期开发不知如何启动，所以傻瓜式了一点`

