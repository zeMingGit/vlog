
# Vue3 中图片引入终极指南

## 概要
`提示：什么是 图片引入？`

图片管理与引入是我们前端开发中非常常见的需求，合理高效地引入图片不仅能提升项目性能，还能优化开发体验。

相比 Vue2，在 **Vue3 + Vite** 项目中，图片的引入与使用都有一些小小的区别。这次全面总结 **Vue3 + Vite** 项目中各种场景下的图片引入方式：`如模板、CSS、JavaScript 动态加载，以及批量动态导入的高阶用法`，帮助我彻底掌握图片引入的所有场景。

此文来源于 [掘金](https://mp.weixin.qq.com/s/d5kkCc5Cai3SaEV1sviEjg)，我进行搬运记录。

## 一、文件存放规范
在 Vue3 + Vite 项目中，图片通常存放在以下两类目录：

![](/img/cli-1.jpg)

* `src/assets 文件夹`：  
适用于需要经过 Vite 打包处理的图片资源，支持动态导入、路径别名 (`@`) 等功能。一般情况，我们项目中的图片资源都放这里。

* `public 文件夹`：  
用于存放静态资源，直接映射到构建后的根目录中，适合无需打包的图片，如 logo 或外部提供的资源

## 二、静态加载图片

### 1. template模板中的图片引入

* 从 `src/assets` 中引入：
``` vue
<template>
  <img src="@/assets/a.jpg" alt="静态图片" />
</template>
```

* 从 `public` 中引入：
``` vue
<template>
  <img src="/vite.svg" alt="静态资源图片" />
</template>
```

* 从 `相对路径` 中引入：当图片与组件位于同一目录或子目录下：
``` vue
<template>
  <img src="../assets/b.jpg" alt="相对路径图片" />
</template>
```

### 2. CSS 样式中的图片引用

* 从 `src/assets` 中引入：
``` scss
.background {
  background-image: url('@/assets/a.jpg');
}
```

* 从 `public` 中引入：
``` scss
.background {
  background-image: url('/vite.svg');
}
```

* 使用相对路径：
``` scss
.background {
  background-image: url('../assets/b.jpg');
}
```

## 三、动态加载图片

### 1. 为什么要使用动态加载
动态图片加载在某些场景下非常重要，例如：**根据数据动态生成图片路径**。你可能想这么写：

``` vue
<template>
  <div class="wrap">
    <img :src="imagePath" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 通过变量获取图片路径
const name = "c.jpg"
const imagePath = `@/assets/${name}`
</script>
```
但很遗憾，图片不会正常加载出来

这是因为 `@` 别名（指向 `src/` 目录）在字符串模板中不会被解析。Vite 的别名 `@` 仅适用于 `import` 或 **动态导入** 的语法（如 `import.meta.glob` 或 `new URL`），而在普通的字符串中，`@` 只是一个普通字符，不会被识别为路径别名。

聪明的你可能会这么改进：
``` vue
<script setup>
import { ref } from 'vue'

// 通过变量获取图片路径
const name = "c.jpg"
const imagePath = `src/assets/${name}`

</script>
```
这样写确实在 **开发环境** 能够展示图片，但这 **不是最佳实践** ！

::: tip
再部署生产环境后，路径可能会被改变（例如，被哈希化或通过 CDN 托管），直接拼接的路径可能无法解析，导致图片加载失败。
:::


### 2. `new URL` 动态加载

#### 2.1 不存在变量的情况

为了能动态加载图片，且在部署生产后图片可以正确显示，我们可以使用 **「new URL」**

::: tip
`new URL()` 是现代 JavaScript 提供的标准 API，用于解析和构建 URL。在 Vite 中，它特别适用于动态加载资源文件（如图片、JSON 等）。静态资源处理
:::
``` vue
<template>
  <img :src="imagePath" alt="静态图片" />
</template>

<script setup>
const imagePath = new URL('@/assets/c.jpg', import.meta.url).href
console.log(imagePath) // 输出图片的绝对路径
</script>
```

但是，要注意，new URL中依旧不支持变量的写法：
``` javascript
// 通过变量获取图片路径
const name = "c.jpg"
const imagePath = new URL(`@/assets/${name}`, import.meta.url).href
```
不能够被加载。这是因为`@` 别名只能在构建阶段解析，不能在运行时动态解析。

#### 2.2 存在变量的情况

如果想在new URL中使用变量，我们可以通过下面的几种方式修改：

* **使用相对路径**

改为使用相对路径，`new URL()` 会基于当前模块路径进行解析：

``` javascript
const name = "c.jpg"
const imagePath = new URL(`../assets/${name}`, import.meta.url).href
```

* **使用 import.meta.glob**

对于动态路径，推荐使用 Vite 的批量导入功能 `import.meta.glob`：

``` javascript
const images = import.meta.glob('@/assets/*.jpg', { eager: true })  
const name = "c.jpg"  
const imagePath = images[`/src/assets/${name}`]?.default
```
后文我们会详细介绍 `import.meta.glob`

* **不使用别名**

直接拼接相对路径或绝对路径，不依赖 `@` 别名：

``` javascript
const name = "c.jpg"
const imagePath = new URL(`src/assets/${name}`, import.meta.url).href
```

### 3. 循环遍历加载图片
有的时候，我们可能根据一个数组，想批量生成img标签，如：
``` vue
<template>
  <div v-for="name in imageNames" :key="name">
    <img :src="getImagePath(name)" :alt="name" />
  </div>
</template>

<script setup>
const imageNames = ['b.jpg', 'c.jpg', 'd.jpg']
const getImagePath = (fileName) => {
  return new URL(`@/assets/${fileName}`, import.meta.url).href
}
</script>
```
但是，这样写，我们的代码并不会生效。因为在 `v-for` 循环中动态加载路径时，`@/assets/` 被当作普通字符串处理，而不会自动替换为项目根目录下的 `src/` 目录路径。以下是一些可能的解决方案：

::: code-group
``` vue [使用相对路径引入]
<template>
  <div class="wrap">
    <img :src="getImagePath(name)" :alt="name" v-for="name in imageNames" :key="name" />
  </div>
</template>

<script setup>
const imageNames = ['b.jpg', 'c.jpg', 'd.jpg']
const getImagePath = (fileName) => {
  return new URL(`./assets/${fileName}`, import.meta.url).href
}
</script>
```

``` javascript [将图片资源放在public下引入]
const imageNames = ['b.jpg', 'c.jpg', 'd.jpg']
const getImagePath = (fileName) => {
  return new URL(`/${fileName}`, import.meta.url).href
}
```

``` vue [维护一个数组]
<template>
  <div class="wrap" v-for="url in imageNames" :key="url">
    <img :src="url" />
  </div>
</template>

<script setup>
const imageNames = [
  new URL('@/assets/b.jpg',import.meta.url).href,
  new URL('@/assets/c.jpg',import.meta.url).href, 
  new URL('@/assets/d.jpg',import.meta.url).href
]
</script>
```
:::

如果上面的方法你觉得比较麻烦，也可以使用 `vite 提供的 import.meta.glob`，实现**批量动态导入图片**。

## 四、批量动态导入图片

#### import.meta.glob

在上面的示例中，我们使用`mport.meta.glob`动态加载了一张图片

  *   *   *   *   *   *   *   *   *   *   *   *   * 

[code]

    <template>  <img :src="imagePath" /></template>  
    <script setup>import { ref } from 'vue'  
    const images = import.meta.glob('@/assets/*.jpg', { eager: true });const name = "c.jpg";const imagePath = images[`/src/assets/${name}`]?.default;  
      
    </script>
[/code]

> ❝
>
> `import.meta.glob` 是 Vite 提供的一个
> API，用于批量导入文件，特别适合动态加载资源。它可以自动解析文件路径并生成一个文件映射对象。
>
> ❞

**「基础语法」**

[code]

    const files = import.meta.glob(pattern, options);  
    
[/code]

  * `pattern`：匹配文件路径的通配符模式，例如 `./assets/*.jpg`。
  * `options`：

> ❝
>
> `eager`: 是否立即加载文件（`true` 表示立即加载）。`as`: 指定导出的内容格式，例如 `raw`（导出文件内容为字符串）。
>
> ❞

返回值是一个对象，键为文件路径，值为导入函数或导入的内容（取决于 `eager` 配置）。

当我们需要加载一个目录下的所有图片时，就可以使用import.meta.glob来批量加载 `src/assets`
目录下的所有图片文件，然后通过路径访问它们。

## 加载整个目录中的图片

假设 `src/assets/`下存有多个图片：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg
width='1px' height='1px' viewBox='0 0 1 1' version='1.1'
xmlns='http://www.w3.org/2000/svg'
xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg
stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-
opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)'
fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1'
height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过以下代码实现批量导入：

  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * 

[code]

    <template>  <img :src="path" /></template>  
    <script setup>import { ref } from 'vue'  
    const imageNames = ref({});const images = import.meta.glob('@/assets/*.jpg', { eager: true });  
    for (const [key, value] of Object.entries(images)) {  const fileName = key.split('/').pop(); // 提取文件名  imageNames.value[fileName] = value.default; // 设置键值对}  
    </script>
[/code]

代码就不解读了，大家直接使用即可。再提供一些其他写法

  *   *   *   *   *   *   * 

[code]

    // 使用动态导入加载所有图片路径const imageNames = ref(  Object.fromEntries(    Object.entries(import.meta.glob('@/assets/*.jpg', { eager: true }))    .map(([key, value]) => [key.split('/').pop(), value.default])  ));
[/code]

或

  *   *   *   *   *   *   *   *   *   * 

[code]

    const imageNames = ref(  Object.entries(import.meta.glob('@/assets/*.jpg', { eager: true })).reduce(    (acc, [key, value]) => {      const fileName = key.split('/').pop(); // 提取文件名      acc[fileName] = value.default; // 设置键值对      return acc;    },    {} // 初始化为空对象  ));
[/code]

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg
width='1px' height='1px' viewBox='0 0 1 1' version='1.1'
xmlns='http://www.w3.org/2000/svg'
xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg
stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-
opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)'
fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1'
height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### **「按条件批量加载」**

通过正则我们可以筛选特定文件，比如加载以 `gcshi_` 开头的图片：

  * 

[code]

    const imageFiles = import.meta.glob('@/assets/images/gcshi_*.jpg');
[/code]

# 延迟加载图片

为了提升首屏性能，我们可以借助vanilla-lazyload插件实现延迟加载或懒加载图片：

  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * 

[code]

    <template>  <div v-for="(src, name) in images" :key="name" class="image-container">  <img :data-src="src" :alt="name" class="lazy" />  </div>  </template>  
      <script setup>  import LazyLoad from 'vanilla-lazyload'; // 轻量懒加载库  
    const imageFiles = import.meta.glob('@/assets/images/*.jpg');const images = {};  
    // 动态加载图片 URLfor (const [key, value] of Object.entries(imageFiles)) {  images[key.split('/').pop()] = await value();}  
    // 初始化懒加载onMounted(() => {  new LazyLoad({ elements_selector: '.lazy' });});</script>
[/code]

# 常见问题与解决方法

## 路径别名不起作用

**「原因」** ：`vite.config.js` 中未正确配置别名。

**「解决方法」** ：

  *   *   *   *   *   *   *   *   *   *   *   * 

[code]

    import { defineConfig } from "vite";import vue from "@vitejs/plugin-vue";import { resolve } from 'path';  
    export default defineConfig({  plugins: [vue()],  resolve: {    alias: {      "@": resolve(__dirname, "src"), // 设置@指向src目录    },  },});
[/code]

## CSS 文件中的路径错误

**「原因」** ：构建后 CSS 文件的路径不正确。

**「解决方法」** ：

  * 使用绝对路径引用 `public` 中的资源。
  * 使用 Vite 的别名或相对路径引用 `src/assets` 中的资源。

# 总结

通过本文的解析，相信大家已经掌握了 Vue3 + Vite 项目中从静态到动态、从单个到批量导入图片的所有方法和优化技巧：

场景| 推荐方法  
---|---  
**「静态图片」**|  相对路径或 `import`引入  
**「动态生成路径的图片」**| `new URL`动态拼接路径  
**「批量动态导入目录中的图片」**|  使用 `import.meta.glob`  
**「延迟加载图片」**|  配合懒加载库  
  
通过灵活应用这些方法，可以让我们的 Vue3 + Vite 项目图片管理更加高效、灵活！
