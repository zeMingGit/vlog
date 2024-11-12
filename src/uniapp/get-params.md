# uniapp-cli npm获取命令行参数
## 概要

:::tip
使用vite创建的项目请见 [vue / Vite栏](../vue3/vite.md)
:::
` 提示：uniapp 用cli工程创建，npm命令启动编译不同的文件`

例如：在package.json中，如下

```javascript{5-8}
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

当一个成熟的项目需要为其他公司或机构提供使用时，并不需要重新创建分支或复制一份项目。你可以继续维护当前的分支，并通过条件渲染（例如 v-if）或其他方法来控制不同功能的显示与隐藏。此外，项目的基本配置应该是通用的。

例如在 main.js 中导入项目的基本配置。你可以提前在 utils 文件夹下创建一个 index.js 文件，并根据各自的项目需求，创建不同的配置文件并导入到 index.js 中。

至于如何动态导入 utils 文件夹下的 index.js 文件，你可以参考本教程来实现。动态导入可以使用 import 语句的动态导入语法或者使用 require.ensure 方法进行按需加载。具体的实现方式取决于你使用的构建工具和版本。

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

const HTYPE = process.env.VUE_APP_HTYPE
const mapSettings = {
  'XZRC': xzrcyyDatas,
  'SDY': sdfyyDatas,
}
let nodeSettings = mapSettings[HTYPE] || ''

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

