# uniapp项目初始化

## 概要
开发app和各种小程序时，uniapp是一个非常得力的工具。进行项目的初始化是必不可少的步骤。uniapp项目初始化包括安装开发环境、创建项目、配置项目结构、以及安装必要的依赖和插件等。通过这些步骤，可以为后续的开发工作打下坚实的基础，确保项目能够顺利进行。本节将详细介绍 uniapp项目初始化的各个环节，帮助开发者快速上手并高效开展开发工作。

## 技术细节
:::tip
uniapp就是依托答辩
:::
### 1. cli脚手架
`uni-app`项目支持 `uni cli`和 `HBuilderX cli`两种脚手架工具：
* `uni cli`：面向非HBuilderX的用户（如习惯使用vscode/webstorm的开发者），提供创建项目、编译发行等能力；在App平台，仅支持生成离线打包的wgt资源包，不支持云端打包生成apk/ipa；若需云端打包，依然需要安装HBuilderX，使用`HBuilderX cli`。

* `HBuilderX cli`：面向HBuilderX用户的自动化工具，提供`uni-app`项目的持续集成能力；支持通过`HBuilderX cli`进行web打包、小程序打包、App云端打包、部署uniCloud等；但注意HBuilderX暂不支持linux平台。另外注意`HBuilderX cli`不基于npm，它是HBuilderX安装目录下的`cli.exe`。

本次讲解主要针对 uniapp 的命令行工具--**`uni cli`**。

#### 1.1 环境安装
* 使用Vue3/Vite版
```sh
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```
* 创建以 typescript 开发的工程
```sh
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```
### 2. 依赖安装
项目的搭建过程中，依赖安装是不可或缺的一部分。

#### 2.1 **pinia**
::: code-group
```sh [npm]
$ npm i pinia@2.1.7

# 数据持久化
$ npm i pinia-plugin-persistedstate@3.2.1
```
```sh [pnpm]
$ pnpm i pinia@2.1.7

# 数据持久化
$ pnpm i pinia-plugin-persistedstate@3.2.1
:::
下载完数据持久化觉得完事大吉？no，如：
```javascript{9-18}
export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      user: {},
      token: {} as UseToken,
    }
  },
  // app专属
  persist: { // [!code ++]
    storage: { // [!code ++]
      getItem(key) { // [!code ++]
        return uni.getStorageSync(key) // [!code ++]
      }, // [!code ++]
      setItem(key, val) { // [!code ++]
        uni.setStorageSync(key, val) // [!code ++]
      } // [!code ++]
    } // [!code ++]
  } // [!code ++]
  // 在vue中默认true就可以做到数据持久化
  persist：true, // [!code --]
})
```
#### 2.2 **axios**
axios需要在v1.0以下
::: code-group
```sh [npm]
$ npm i axios@0.24.0
```
```sh [pnpm]
$ pnpm i axios@0.24.0
:::

在uniapp中，使用axios发送网络请求需要做适配，如
```typescript{3,11}
// 在axios.ts中 
import axios, { AxiosRequestConfig } from 'axios'
import axiosAdapter from './axiosAdapter'

const service = axios.create({
  baseURL,
  timeout: 30 * 1000
})

// 适配器!!!
axios.defaults.adapter = axiosAdapter

service.interceptors.request.use((config: AxiosRequestConfig) => {

})

service.interceptors.response.use(res => {

})
```
```typescript
// 在axiosAdapter.ts中
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import buildURL from 'axios/lib/helpers/buildURL'

const axiosAdapter = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const url = config.baseURL + buildURL(config.url, config.params, config.paramsSerializer) // 确保 url 为 string 类型
    const method = config.method.toUpperCase() || 'GET' // 设置默认方法
    const headers = config.headers || {} // 设置默认头部
    const timeout = config.timeout || 5000 // 设置默认超时时间

    uni.request({
      url,
      method: method as any,
      data: config.data,
      header: headers,
      timeout,
      sslVerify: false,
      success: (res) => {
        const response: AxiosResponse = {
          data: res.data,
          status: res.statusCode,
          statusText: res.errMsg || '', // 确保 statusText 为 string 类型
          headers: res.header,
          config,
          request: null
        }
        resolve(response)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default axiosAdapter
```

#### 2.3 **eslint**

ESLint 最新版本是 9.7.0，由于尚未熟悉 9 大版本的新文件格式，建议仍使用 8 版本进行配置。下载以下依赖后，将 [vue3 eslint](../sundry/settings) 复制到项目中。

::: code-group
```sh [npm]
$ npm i eslint@8.39.0 -D

$ npm i eslint-plugin-vue@9.26.0
@typescript-eslint/eslint-plugin@7.13.1
@typescript-eslint/parser@7.13.1 -D
```
```sh [pnpm]
$ pnpm i eslint@8.39.0 -D
:::

#### 2.4 **stylelint**

下载以下依赖，将[vue3 stylelint](../sundry/settings) 复制到项目中。

::: code-group
```sh [npm]
$ npm i stylelint@13.8.0 -D

$ npm i
stylelint-config-rational-order@0.1.2
stylelint-config-recommended@3.0.0
stylelint-config-recommended-scss@4.0.0
stylelint-config-standard@20.0.0
stylelint-order@4.0.0
stylelint-scss@3.18.0
-D
```
```sh [pnpm]
$ pnpm i eslint@8.39.0 -D
:::

## 小结
需要下载对应版本的依赖，否则可能导致项目无法运行或报错。最后说一句，uniapp app依托答辩。
