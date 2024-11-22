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

### 1. 通过IDE插件
- 以vscode为例，直接在插件搜索 Prettier 并安装

  <img src="/img/prettier_1.png" style="zoom:50%;" />

- 安装之后，鼠标右键配置默认的格式化工具

  ![](/img/prettier_2.png)

- 因为vscode本身有一种格式化选项，需要将默认选项更改为 Prettier

  ![](/img/prettier_3.png)

配置完成后就可以通过快捷键 `Shift + Alt + F` 或鼠标右键使用 Prettier 快速进行格式化。

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
:::tip
上面提到的两种方式都是采用 Prettier 的默认配置，例如 Prettier 默认使用双引号。但是，如果你想使用单引号，该怎么办？

在这种情况下，你需要使用 Prettier 的配置文件。通常使用一个名为 `.prettierrc` 或 `.prettierrc.json` 的文件来定制其行为。你可以根据项目的需要创建并调整这个配置文件。
:::
以下是一个基本的 Prettier 配置文件示例 `.prettierrc`：
```javascript
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "printWidth": 80
}
```

### 1. 配置说明：

- `"tabWidth"`：指定缩进的空格数。

- `"semi"`：是否在语句末尾添加分号。

- `"singleQuote"`：是否使用单引号替代双引号。

- `"trailingComma"`：在多行对象和数组的最后一项后面是否加逗号。

- `"bracketSpacing"`：是否在对象字面量的括号之间打印空格。

- `"jsxBracketSameLine"`：是否将 JSX 的 `>` 放在最后一行的末尾，而不是另起一行。

- `"arrowParens"`：在单参数箭头函数中是否添加括号。

- `"printWidth"`：指定换行的行长度。

这是一个基本的配置示例，你可以根据个人或项目的具体需求调整这些选项。Prettier 支持多种配置选项，详细信息请参考官方文档：[prettier 配置项](https://prettier.io/docs/en/options)

### 2. 使用方式：

**2.1. 创建配置文件**：

在项目根目录下创建一个 `.prettierrc` 文件，并添加你的自定义配置。

**2.2. 集成到编辑器**：

配置文件对上面提到的方法一：安装插件，同样有效，插件将自动读取项目中的 `.prettierrc` 文件，并在保存文件时自动应用配置的格式化规则。

**2.3. 命令行使用**：

可以通过命令行工具或集成到构建过程中的任务中使用 Prettier。例如，在 `package.json` 的 `scripts` 中添加 `"format": "prettier --write \"src/**/*.js\""`，然后运行 `npm run format` 可以格式化指定目录下的所有 JavaScript 文件。

通过使用和调整 Prettier 的配置文件，你可以确保项目中的代码始终保持一致的风格，提高代码的可读性和维护性。