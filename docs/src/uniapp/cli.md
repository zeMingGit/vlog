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
