# TypeScript

## 概要
`提示：什么是TypeScript？`

[TypeScript](https://www.typescriptlang.org/zh/) 是由微软开发的一种开源编程语言，是 JavaScript 的超集，增加了强类型和其他特性。其核心特点包括：类型系统、增强的代码提示和自动补全、ES6+ 特性支持、类与接口、兼容性。通过 TypeScript，开发者可以在开发阶段捕获潜在错误，使代码更加可靠和可维护，尤其适合大型项目。

## 一、基本类型
类型声明：通过类型声明可以指定TS中变量（参数、形参）的类型。指定类型后，当为变量赋值时，TS编辑器会自动检查值是否符合类型声明，否则报错。简而言之，变量只能存储声明时候定义的类型值。


**语法：**
``` ts
let 变量: 类型
let 变量: 类型 = 值
function fn(参数: 类型, 参数: 类型): 类型 {
  ...
}

```
**类型：**
| 类型     |  例子  |  描述  |
| -------- | :-------: | :-------: |
| number  |   1,-33,2.5   |   任意数字 |
| string  |   'hi'   |   任意字符串 |
| boolean  |   true、false   |  布尔值true或false |
| 字面量  |   其本身   |   限制变量的值就是该字面量的值 |
| any  |   *   |   任意类型 |
| unknown  |   *   |   类型安全的any |
| void  |   空置(undefined)   |   没有值(或undefined) |
| never  |   没有值   |   不能是任何值 |
| object  |   *{name:'xx'}*   |   任意的JS对象 |
| array  |   [1,2,3]   |   任意的JS数组 |
| tuple  |   [4,5]   |   元素，TS新增类型，固定长度数组 |
| enum  |   enum *{A,B}*   |   枚举，TS中新增类型 |
