# 工具代码

## 概要
`提示：提供一些工具性代码方法`

## 技术细节
<!-- <div class="tip custom-block" style="padding-top: 8px">试一下</div> -->

- #### 从数组中删除指定的元素
```javascript
/**
 * @description 作用是从数组中删除指定的元素
 * @param {Array} arr 要操作的数组
 * @param {*} el 要删除的元素
 */
const remove = (arr, el) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
```


