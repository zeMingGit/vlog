# Prettier 一个 “有态度” 的代码格式化工具

## 概要
`提示：什么是 Prettier？`

Prettier 是一个用于格式化代码的工具（也称为包或插件）。它的主要作用是自动统一代码风格，使代码更加整齐、易读，从而提高代码的可维护性和团队协作效率。

## 为什么要用 Prettier
原因只有一个，那就是统一代码格式风格。每个团队和开发者对代码格式化风格都有自己的偏好，因此关于代码风格的争论也从未停止。公说公有理，婆说婆有理，那么到底该听谁的呢？这时，Prettier 应运而生。它强制采用一套统一的格式化风格，并且只提供少量的配置项供开发者自定义。


例如：
- 使用单引号还是双引号
- 语句末尾是否添加分号
- 缩进量是 2 还是 4
- 换行长度阈值是 80 还是 100

事实上，许多新兴编程语言自带格式化工具，例如：Golang 的 gofmt、Rust 的 rustfmt。既然没有统一的代码风格，官方就直接强制统一。而 Prettier 虽然是由前端社区推出的工具，但它确实做得很优秀，Prettier 的风格也被大多数人接受。例如：vue-cli 和 create-vue 脚手架都提供了对 Prettier 的支持。

## 怎么使用 Prettier

### 1. 通过给 IDE 开发工具安装插件
- 以vscode为例，直接在插件搜索 Prettier 并安装

  ![](/img/Snipaste_2024-06-06_16-16-17.png)

- 安装之后，鼠标右键配置默认的格式化工具

  ![](/img/Snipaste_2024-06-06_16-18-02.png)

- 因为vscode本身有一种格式化选项，需要将默认选项更改为 Prettier

  ![](/img/Snipaste_2024-06-06_16-21-55.png)

这样就可以通过快捷键 `Shift + Alt + F` 或者 `鼠标右键` 使用 Prettier 快速进行格式化

   

### 2. 通过脚本命令
给开发工具安装插件虽然简单快捷，但在多人协作的项目中，如何能保证每个人都给 VSCode 安装了 Prettier 插件呢？为了解决这个问题，我们需要将 Prettier 库安装到项目的开发依赖中，并通过配置脚本命令来使用 Prettier 进行代码格式化。

这样做有以下好处：

**1. 一致性：** 确保所有团队成员使用相同版本的 Prettier 和相同的配置。

**2. 自动化：** 可以在 CI/CD 流程中集成 Prettier，自动检查和格式化代码。

**3. 无缝协作：** 新加入的团队成员只需安装项目依赖即可，不必手动配置 Prettier 插件。

- 安装依赖

  ::: code-group
  ```shell [npm]
  $ npm i -D prettier
  ```
  ```shell [pnpm]
  $ pnpm i -D prettier
  ```
  :::

- 配置脚本命令

  ```json
  // 格式化所有内容
  {
    "scripts": {
      "format": "prettier --write ." 
    }
  }

  // 格式化某个目录或某个文件
  {
    "scripts": {
      "format": "prettier --write app/components/Button.js" 
    }
  }
  ```

- 执行脚本
  ::: code-group
  ```shell [npm]
  $ npm run format
  ```
  ```shell [pnpm]
  $ pnpm run format
  ```
  :::

这里就会产生另一个问题，假设第一个人在项目里配置了 Prettier，但是第二个人写完代码后并没有执行 format 命令，这该怎么办呢？这时就需要用到 `Git hooks`（后面篇章会详细介绍），在提交代码时触发 hook 钩子自动执行 format 命令，先把代码格式化一遍，然后再提交。这样就能保证团队中的每个成员，无论他知不知道 Prettier、有没有安装插件或手动执行 format 命令，都能提交经过 Prettier 格式化的代码。


## 配置文件

上面提到的两种方式都是采用 Prettier 的默认配置，比如 Prettier 默认使用双引号。但如果你想使用单引号，该怎么办？此时就需要使用 Prettier 的配置文件。