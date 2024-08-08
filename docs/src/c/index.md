# 搭建 C 语言开发环境

## 概要
`提示：什么是 C 语言编译器？`

C 语言编译器用于将 C 语言源代码翻译成机器语言（机器代码）的软件工具。常见的 C 语言编译器有：GCC、Clang、Microsoft Visual C++ (MSVC)。

**1. GCC (GNU Compiler Collection)**
- 开源且免费，广泛应用于各种平台，包括Linux、Windows、macOS等。
- 支持多种编程语言，包括C、C++、Fortran、Java等。

**2. Clang**
- 由LLVM项目开发，具有模块化和可重用性强的特点。
- 与GCC相比，提供更快的编译速度和更好的错误信息。

**3. Microsoft Visual C++ (MSVC)**
- 由微软开发，主要用于Windows平台。
- 包含在Visual Studio开发环境中，提供丰富的开发工具和调试支持。

## 一、如何在 Windows 编写并运行 C 语言

### 1. 安装 GCC 编译器
   * 大多数 Linux 发行版系统都内置了 GCC，要想在 Windows上使用 GCC，最简单的方式是通过 [MSYS2](https://www.msys2.org/) 。可按照官方文档下载安装MSYS2

   * 启动 MSYS2 会打开一个终端窗口，在终端中执行以下命令安装 GCC
   ```sh
   pacman -S mingw-w64-ucrt-x86_64-gcc
   ```

   * 验证 GCC 是否安装成功，输出版本号即安装成功

   ```sh
   gcc --version
   ```

### 2. 安装 IDE 

   - 下载并安装 [Visual Studio Code](https://code.visualstudio.com/)

   - 在插件市场安装 C/C++ 插件

      ![](../../public/img/cpp-extension.png)

### 3. 编写第一个 C 程序

   1. 创建 hello.c 文件，在vscode 中打开，输入以下代码：
   ```c
   #include <stdio.h>
   
   int main() {
         printf("Hello, World!\n");
         return 0;
   }
   ```

   2. 将 hello.c 编译成 Windows可执行程序 hello.exe
   ```sh
   gcc hello.c -o hello.exe
   ```

   3. 运行 hello.exe
   ```sh
   hello.exe
   // 输出 `Hello, World!`，则 C 语言开发环境搭建成功
   ```



