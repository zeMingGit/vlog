# Vite

## 概要
`提示：什么是 Vite？`

[Vite](https://cn.vitejs.dev/) 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
* 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热替换（HMR）。
* 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## 一、vite环境变量与模式
不知道 [vite环境变量与模式](https://cn.vitejs.dev/guide/env-and-mode) 是什么？其实很简单。

**环境变量：** Vite 在一个特殊的 import.meta.env 对象上暴露环境变量，这些变量在构建时会被静态地替换掉。

**模式：**  默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 命令则运行在 production (生产) 模式。

估计新手还是不知道做什么，让我们看一个例子:
``` json
// 这是一个vue项目中的package.json
"scripts": {
  "dev:h5": "uni",
  "dev:h5:28": "uni --mode 28",
  "dev:h5:70": "uni --mode 70",
  "dev:h5:cqxx": "uni --mode cqxx",

  "build:h5": "uni build",
  "build:h5:28": "uni build --mode 28",
  "build:h5:70": "uni build --mode 70",
  "build:h5:cqxx": "uni build --mode cqxx",
}
```
举例：package.json 文件中明显的多出了 `--mode 28` 指令，他会在项目中找到.env.28文件（没有就新建），你可以在这个文件声明出项目的配置
```
# 环境配置 @zeMing

# 开发环境
VITE_DEV_BASE_URL = 'http://172.16.124.28:48080'

# 正式环境
VITE_BASE_URL = 'http://172.16.124.28:48080'

# 接口前缀
VITE_API_PATH = '/app-api'
```
获取到 .env.28 文件的参数
``` typescript
// 基础路径
export const baseURL = process.env.NODE_ENV === 'development'
  ? import.meta.env.VITE_DEV_BASE_URL
  : import.meta.env.VITE_BASE_URL

// 接口路径
export const apiPath = import.meta.env.VITE_API_PATH
```

## 最后
Vite 是一个超快速的前端构建工具，推动着下一代网络应用的发展。