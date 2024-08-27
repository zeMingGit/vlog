# C 语言

### 一、什么是 C 语言编译器

> 用于将 C 语言源代码翻译成机器语言（机器代码）的软件工具。常见的 C 语言编译器有：GCC、Clang、Microsoft Visual C++ (MSVC)；

1. **GCC (GNU Compiler Collection)**：
   - 开源且免费，广泛应用于各种平台，包括Linux、Windows、macOS等
   - 支持多种编程语言，包括C、C++、Fortran、Java等
2. **Clang**：
   - 由LLVM项目开发，具有模块化和可重用性强的特点
   - 与GCC相比，提供更快的编译速度和更好的错误信息
3. **Microsoft Visual C++ (MSVC)**：
   - 由微软开发，主要用于Windows平台
   - 包含在Visual Studio开发环境中，提供丰富的开发工具和调试支持

### 二、如何在 Windows 编写并运行 C 语言

1. #### 安装 GCC 编译器

   1. 大多数 Linux 发行版系统都内置了 GCC，要想在 Windows上使用 GCC，最简单的方式是通过 [MSYS2](https://www.msys2.org/) ，可按照官方文档下载安装MSYS2

   2. 启动 MSYS2 会打开一个终端窗口，在终端中执行以下命令安装 GCC

      ```sh
      pacman -S mingw-w64-ucrt-x86_64-gcc
      ```

   3. 验证 GCC 是否安装成功，输出版本号即安装成功

      ```sh
      gcc --version
      ```

2. #### 安装 IDE 

   - 下载并安装 [Visual Studio Code](https://code.visualstudio.com/)

   - 在插件市场安装 C/C++ 插件

     ![](../../public/img/cpp-extension.png)

3. #### 编写第一个 C 程序

   1. 创建 hello.c 文件，在vscode 中打开，输入以下代码：

      ```c
      #include <stdio.h>
      
      int main() {
          printf("Hello, World!\n");
          return 0;
      }
      ```

   2. 将 hello.c 编译成 Windows可 执行程序 hello.exe

      ```sh
      gcc hello.c -o hello.exe
      ```

   3. 运行 hello.exe

      ```sh
      hello.exe
      // 输出 `Hello, World!`，则 C 语言开发环境搭建成功
      ```

### 三、数据类型

1. 字符类型：

   - 使用`char`关键字声明。C 语言规定，字符常量必须放在单引号里面

   ```c
   char str = 'B';
   ```

   在计算机内部，字符类型使用一个字节（8位）存储。C 语言将其当作整数处理，所以字符类型就是宽度为一个字节的整数。每个字符对应一个整数（由 ASCII 码确定），比如`B`对应整数`66`。

2. 整数类型：

   - 整数类型用来表示较大的整数，类型声明使用`int`关键字

   ```c
   int a = 10;
   ```

   C 语言使用`signed`关键字，表示一个类型带有正负号，包含负值；使用`unsigned`关键字，表示该类型不带有正负号，只能表示零和正整数。

   对于`int`类型，默认是带有正负号的，也就是说`int`等同于`signed int`。由于这是默认情况，关键字`signed`一般都省略不写，但是写了也不算错。

3. 浮点数类型：

   - 任何有小数点的数值，都会被编译器解释为浮点数。浮点数的类型声明使用`float`关键字

   ```c
   float c = 10.5;
   ```

4. 布尔类型：

   - C 语言原来并没有为布尔值单独设置一个类型，而是使用整数`0`表示伪，所有非零值表示真。

     ```c
     int x = 1;
     if (x) {
       printf("x is true!\n");
     }
     ```

   - 头文件`stdbool.h`定义了另一个类型别名`bool`，并且定义了`true`代表`1`、`false`代表`0`。只要加载这个头文件，就可以使用这几个关键字。

     ```c
     #include <stdbool.h>
     
     bool flag = false;
     ```

5. 



