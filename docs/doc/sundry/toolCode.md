# 工具代码

<script setup>
import { ref, unref } from 'vue'
let inputValue = ref('1, 2, 3, 4, 5')
const remove = (arr, el) => {
  arr = arr.split(',')
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
remove(unref(inputValue), 3)
</script>

## 概要
`提示：提供一些工具性代码方法`

## 技术细节
::: tip
试一下
:::
<!-- <div class="tip custom-block" style="padding-top: 8px">试一下</div> -->
在这里输入：<input v-model="inputValue" />

结果：{{ inputValue }}

```javascript
// 这个是remove方法作用是从数组中删除指定的元素
// 函数接受两个参数，第一个参数 `arr` 是要操作的数组，第二个参数 `el` 是要删除的元素
const remove = (arr, el) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
```


