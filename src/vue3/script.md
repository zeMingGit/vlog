# Node.js 和 Vue 开发中的 OpenSSL 错误

## 概要
vue项目中package.json文件中配置项目启动或构建脚本时，可能会遇到如图命令。

这行代码通常出现在 `package.json` 的 `scripts` 部分，它是为了在开发环境中启动 **Vue.js** 项目的开发服务器，并且配置了 **Node.js** 的环境变量 `NODE_OPTIONS` 来启用 OpenSSL 的旧版加密提供者。

<img src="/img/openssl.png" />

## 一、解释：

1. **`SET NODE_OPTIONS=--openssl-legacy-provider`**:
   - 这是一个环境变量设置，用于告诉 Node.js 在运行时使用 OpenSSL 3.0 的 **legacy provider**。这个选项帮助解决一些加密算法被禁用的问题，通常是在 Node.js v17+ 版本中，OpenSSL 3.0 更严格的安全政策导致某些旧算法不可用时使用。
   - 这行命令在 Windows 环境中使用 `SET` 来设置环境变量。
2. **`&&`**:
   - `&&` 是一个命令连接符，它确保第一个命令（`SET NODE_OPTIONS=--openssl-legacy-provider`）成功执行后，才会继续执行第二个命令（`vue-cli-service serve`）。如果第一个命令失败，第二个命令将不会执行。
3. **`vue-cli-service serve`**:
   - 这是 Vue CLI 提供的命令，用来启动开发服务器。它会启动一个本地的开发环境，通常是通过 Webpack 来构建和热更新你的 Vue 应用。
   - 这个命令是 Vue 项目开发中的标准命令，用于启动应用的开发模式。

## 二、为什么要加上 `NODE_OPTIONS=--openssl-legacy-provider`？

在 **Node.js v17 及以上版本**，由于 OpenSSL 3.0 的升级，一些旧的加密算法（比如某些用于生成或验证签名的算法）被禁用了。如果你的项目或依赖库使用了这些旧的加密算法，就会遇到类似以下的错误：

```
Error: error:0308010C:digital envelope routines::unsupported
```

为了解决这个问题，使用 `--openssl-legacy-provider` 选项可以让 Node.js 回退到 OpenSSL 的兼容模式，从而继续使用这些被禁用的旧加密算法。

## 三、对于不同操作系统的区别：

- **Windows**: 在 Windows 中，你需要使用 `SET` 来设置环境变量，如下所示：

```json
"dev": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve"
```

- **Linux/macOS**: 在类 Unix 系统（如 Linux 和 macOS）中，你可以使用 `export` 来设置环境变量：

```json
"dev": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve"
```

```json
"scripts": {
  "dev": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve"
}
```

## 四、解决不同平台的问题：

如果你的项目需要跨平台使用（例如 Windows 和 Linux/macOS），你可以通过以下方法避免在不同操作系统中使用不同的命令。

1. **使用 `cross-env` 工具**： `cross-env` 是一个跨平台的工具，允许你在不同操作系统上统一设置环境变量。你可以通过以下方式使用：

- 首先，安装 `cross-env`：

  ```bash
  npm install cross-env --save-dev
  ```

- 然后修改 `package.json` 中的 `scripts`：

  ```json
  {
    "scripts": {
      "dev": "cross-env NODE_OPTIONS=--openssl-legacy-provider vue-cli-service serve"
    }
  }
  ```

这样，你就可以确保该命令在所有平台（Windows、Linux、macOS）上都能正常工作。
