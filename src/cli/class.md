# Class 类

## 概要
`提示：什么是Class 类？`

Class 是 JavaScript 中的一种语法糖，用于更清晰地定义对象的结构和行为。它是创建对象的模板，封装了数据和操作数据的方法，以支持面向对象编程的设计理念。

## 一、定义
::: code-group
``` ts [class 类]
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  speak() {
    console.log(`我叫：${this.name}，今年${this.age}岁`)
  }
}

const p1 = new Person('张三', 18)
console.log(p1)
p1.speak()
```

``` ts [继承]
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  speak() {
    console.log(`我叫：${this.name}，今年${this.age}岁`)
  }
}

// 继承
class Student extends Person {
  grade: string
  constructor(name: string, age: number, grade: string) {
    super(name, age)
    this.grade = grade
  }
  study() {
    console.log(`${this.name}正在努力学习...`)
  }
  // 覆盖父类
  override speak() {
    console.log(`我是学生，我叫：${this.name}，今年${this.age}岁`)
  }
}
const s1 = new Student('李同学', 16, '大一')
s1.study()
```
:::

### 核心特性
1. **类的定义**
2. **构造函数 (constructor)**
    - 每个类可以有一个特殊的 constructor 方法，用于初始化实例对象。
3. **实例化对象**
    - 使用 new 关键字创建类的实例。
4. **方法与属性**
    - 类方法：在类中定义的函数。
    - 类属性：绑定到实例对象的变量。
5. **继承 (extends)**
    - 子类可以通过 extends 关键字继承父类的属性和方法。
    - 子类可以使用 super 调用父类的构造函数或方法。
6. **静态方法 (static)**
    - 使用 static 关键字定义，与类本身关联，而非实例对象。
7. **私有字段与方法 (ES2022+)**
    - 以 # 开头的字段或方法只能在类内部访问。

## 二、属性修饰符
| 修饰符     |  含义  |  具体规则  |
| -------- | :-------: | :------- |
| public  |   公开的   |   可以被：**类内部**、**子类**、**类外部**访问 |
| protected  |   受保护的   |   可以被：**类内部**、**子类**访问 |
| private  |   私有的   |   可以被：**类内部**访问 |
| readonly  |   只读属性   |   属性无法修改 |
