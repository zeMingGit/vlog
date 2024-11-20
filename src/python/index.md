# Python 语法基础

## 一、数据类型

### 1. **数值类型**
   - **`int`**: 整数类型，表示没有小数部分的数字。
     ```python
     x = 10
     y = -42
     ```
   - **`float`**: 浮点数类型，表示有小数部分的数字。
     ```python
     pi = 3.14159
     temp = -12.5
     ```
   - **`complex`**: 复数类型，表示形如 `a + bj` 的复数，其中 `a` 是实部，`b` 是虚部，`j` 为虚数单位。
     ```python
     z = 3 + 4j
     ```

### 2. **序列类型**
   - **`list`**: 列表，按顺序存储的可变集合，可以包含不同类型的元素。
     ```python
     fruits = ["apple", "banana", "cherry"]
     ```
   - **`tuple`**: 元组，按顺序存储的不可变集合，元素不能被修改。
     ```python
     coordinates = (1, 2, 3)
     ```
   - **`range`**: 范围，表示一个不可变的序列，通常用于循环中。
     ```python
     r = range(5)
     ```

### 3. **文本类型**
   - **`str`**: 字符串，表示文本数据，可以是单引号 `'` 或双引号 `"` 包围的字符序列。
     ```python
     greeting = "Hello, World!"
     ```

### 4. **映射类型**
   - **`dict`**: 字典，是一种键值对存储的数据结构。键必须是不可变类型（如数字、字符串、元组等）。
     ```python
     person = {"name": "Alice", "age": 30, "city": "New York"}
     ```

### 5. **集合类型**
   - **`set`**: 集合，是一个无序的、不重复的元素集合，常用于去重和集合运算。
     ```python
     unique_numbers = {1, 2, 3, 4, 5}
     ```
   - **`frozenset`**: 冻结集合，与 `set` 类似，但它是不可变的。
     ```python
     frozen = frozenset([1, 2, 3])
     ```

### 6. **布尔类型**
   - **`bool`**: 布尔类型，只有两个值：`True` 或 `False`，通常用于逻辑运算。
     ```python
     is_active = True
     is_valid = False
     ```

### 7. **二进制类型**
   - **`bytes`**: 字节类型，表示不可变的字节序列，通常用于二进制数据。
     ```python
     b = b"hello"
     ```
   - **`bytearray`**: 可变字节序列，与 `bytes` 类似，但可以修改内容。
     ```python
     ba = bytearray([65, 66, 67])
     ```
   - **`memoryview`**: 内存视图，允许你在不复制数据的情况下操作内存数据。
     ```python
     mv = memoryview(b"hello")
     ```

### 8. **特殊类型**
   - **`NoneType`**: `None` 是 Python 中的特殊常量，表示没有值或者空值，通常用于函数没有返回值的情况。
     ```python
     x = None
     ```

## 二、声明变量&常量

- **变量声明**：在 Python 中，变量通过赋值操作来声明，无需显式声明类型。

  ```python
  x = 10        # 整数
  y = 3.14      # 浮点数
  name = "Alice" # 字符串
  is_active = True # 布尔值
  ```

- **常量声明**：Python 没有专门的常量关键字，通常通过 **全大写字母** 命名来表示常量，虽然这只是约定，不会强制限制常量值的修改。

  ```python
  PI = 3.14159     # 常量，表示圆周率
  MAX_USERS = 100  # 常量，表示最大用户数
  ```

## 三、流程控制

在 Python 中，流程控制是指控制代码执行顺序的语句，它使得程序能够根据不同的条件、循环和选择做出不同的决策。Python 提供了几种主要的流程控制结构：**条件语句**、**循环语句** 和 **跳转语句**。

### 1. **条件语句**
条件语句允许你根据不同的条件执行不同的代码块。Python 使用 `if`、`elif` 和 `else` 来进行条件判断。

**语法：**

```python
if condition:
    # 如果 condition 为 True，执行这里的代码
elif another_condition:
    # 如果另一条件为 True，执行这里的代码
else:
    # 如果以上条件都不满足，执行这里的代码
```

**示例：**

```python
age = 18

if age < 18:
    print("未成年")
elif age == 18:
    print("刚成年")
else:
    print("成年人")
```

### 2. **循环语句**
循环语句用于重复执行某段代码。Python 支持两种主要的循环语句：`for` 循环和 `while` 循环。

**`for` 循环**

`for` 循环用于遍历序列（如列表、元组、字符串）或可迭代对象。

**语法：**

```python
for variable in iterable:
    # 循环体
```

**示例：**

```python
for i in range(5):  # range(5) 会生成 0, 1, 2, 3, 4
    print(i)
```

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

**`while` 循环**

`while` 循环会根据条件表达式的值来决定是否继续执行，直到条件为 `False` 为止。

**语法：**

```python
while condition:
    # 循环体
```

**示例：**

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

### 3. **循环控制语句**
在循环中，有时你可能需要提前终止循环或跳过某些特定的迭代，Python 提供了 `break`、`continue` 和 `pass` 语句来实现这些控制。

- **`break`**: 跳出当前循环，终止循环的执行。
- **`continue`**: 跳过当前循环的剩余部分，进入下一次迭代。
- **`pass`**: 空语句，什么都不做，常用于占位符。

**示例：**

```python
# break 示例
for i in range(5):
    if i == 3:
        break  # 退出循环
    print(i)
```

```python
# continue 示例
for i in range(5):
    if i == 3:
        continue  # 跳过 3，继续下次迭代
    print(i)
```

```python
# pass 示例
if 3 > 2:
    pass  # 这里暂时什么都不做
```

### 4. **嵌套控制结构**
你可以将条件语句和循环语句嵌套在一起，创建更复杂的流程控制结构。

**示例：**

```python
# 嵌套 if 语句
age = 25
if age > 18:
    if age < 30:
        print("成年人且年龄在 18 到 30 之间")
    else:
        print("成年人但超过 30 岁")
else:
    print("未成年")
```

```python
# 嵌套循环
for i in range(3):
    for j in range(2):
        print(f"i = {i}, j = {j}")
```

### 5. **条件表达式**
Python 提供了一种简洁的条件表达式（类似三元运算符），用于在一行内根据条件选择两个值中的一个。

**语法：**

```python
x if condition else y
```

**示例：**

```python
age = 18
status = "成年人" if age >= 18 else "未成年"
print(status)
```

### 6. **异常处理**
除了常规的条件和循环控制之外，Python 还提供了异常处理机制来捕捉和处理运行时错误。通过 `try`, `except`, `else`, 和 `finally` 可以处理异常。

**语法：**

```python
try:
    # 可能引发异常的代码
except ExceptionType as e:
    # 异常处理代码
else:
    # 如果没有异常发生，执行此块代码
finally:
    # 无论是否发生异常，最终都会执行这块代码
```

**示例：**

```python
try:
    x = 10 / 0  # 会引发除零异常
except ZeroDivisionError:
    print("不能除以零")
else:
    print("没有错误发生")
finally:
    print("此代码总会执行")
```

## 四、函数

在 Python 中，**函数**是组织代码的一个重要方式，用于将一段重复的代码封装在一起，以便可以在多个地方重用。函数可以接收参数，执行某些操作，并返回结果。

### 1. **定义函数**

在 Python 中，使用 `def` 关键字来定义一个函数。函数名后面紧跟着一对小括号 `()`，里面可以放入参数（也叫形参）。然后，函数体中的代码需要缩进。

**语法：**

```python
def function_name(parameters):
    # 函数体
    return value  # 可选的返回值
```

**示例：**

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # 调用函数，传递参数
greet("Bob")    # 调用函数，传递参数
```

### 2. **函数的返回值**

函数可以通过 `return` 语句返回一个值。如果没有 `return`，函数默认返回 `None`。

**示例：**

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 输出: 8
```

### 3. **参数**

函数的参数是函数的输入数据，可以在函数调用时传递。Python 支持多种类型的参数：

#### 3.1 **位置参数**
位置参数是最常见的参数类型，传入参数的顺序很重要。

**示例：**

```python
def subtract(a, b):
    return a - b

print(subtract(10, 3))  # 输出: 7
```

#### 3.2 **默认参数**
你可以为函数的参数指定默认值。如果在调用函数时没有传递相应的参数，那么就使用默认值。

**示例：**

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")           # 输出: Hello, Alice!
greet("Bob", "Hi")       # 输出: Hi, Bob!
```

#### 3.3 **可变数量的参数**
如果你不确定函数需要接收多少个参数，可以使用 `*args` 和 `**kwargs` 来处理可变数量的位置参数和关键字参数。

- **`*args`** 用来接收传入的所有额外的位置参数，返回一个元组。
- **`**kwargs`** 用来接收传入的所有额外的关键字参数，返回一个字典。

**示例：**

```python
def sum_numbers(*args):
    return sum(args)

print(sum_numbers(1, 2, 3))         # 输出: 6
print(sum_numbers(1, 2, 3, 4, 5))   # 输出: 15
```

```python
def greet_person(**kwargs):
    print(f"Hello {kwargs['name']}! Your age is {kwargs['age']}.")

greet_person(name="Alice", age=30)
```

#### 3.4 **关键字参数**
关键字参数通过名字而不是位置传递给函数。

**示例：**

```python
def person_info(name, age):
    print(f"Name: {name}, Age: {age}")

person_info(name="Alice", age=25)  # 通过关键字参数传递
```

### 4. **匿名函数（lambda 函数）**

Python 也支持使用 `lambda` 关键字定义匿名函数。`lambda` 函数通常用于需要一个简单函数的地方，如排序、过滤、映射等。

**语法：**

```python
lambda arguments: expression
```

**示例：**

```python
# 定义一个简单的匿名函数，计算两数之和
add = lambda x, y: x + y
print(add(3, 5))  # 输出: 8

# 使用 lambda 函数进行排序
points = [(2, 3), (1, 1), (4, 5)]
points.sort(key=lambda x: x[1])  # 按照元组的第二个元素排序
print(points)  # 输出: [(1, 1), (2, 3), (4, 5)]
```

### 5. **函数作用域**

在 Python 中，函数内部和外部的变量作用域是有区别的。函数内部定义的变量称为局部变量，而函数外部的变量称为全局变量。局部变量只能在函数内部访问，而全局变量可以在函数外部和内部访问（如果没有局部变量覆盖它）。

**示例：**

```python
x = 10  # 全局变量

def foo():
    x = 5  # 局部变量
    print(x)

foo()   # 输出: 5
print(x)  # 输出: 10
```

**修改全局变量：**

如果你想在函数内部修改全局变量，可以使用 `global` 关键字。

```python
x = 10

def modify_global():
    global x
    x = 20

modify_global()
print(x)  # 输出: 20
```

### 6. **函数文档字符串**

每个函数可以有一个文档字符串（docstring），它是函数的说明文档，通常用于描述函数的功能、参数和返回值。文档字符串位于函数定义的下方，用三引号 `"""` 或 `'''` 包裹。

**示例：**

```python
def greet(name):
    """
    该函数接受一个名字作为参数，并打印问候语。
    参数:
        name: 字符串，表示被问候的人的名字
    """
    print(f"Hello, {name}!")

# 可以通过 help() 查看文档字符串
help(greet)
```

### 7. **递归函数**

递归是指函数在其定义中调用自身。递归通常用于解决一些可以分解成类似子问题的问题，如计算阶乘、斐波那契数列等。

**示例：计算阶乘**

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 输出: 120
```
