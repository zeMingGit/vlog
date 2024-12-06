# 工具代码

## 概要
`提示：提供一些工具性代码方法`

## 技术细节
<!-- <div class="tip custom-block" style="padding-top: 8px">试一下</div> -->

- ### 1. 从数组中删除指定的元素
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
- ### 2. 判断对象属性存在不存在
```javascript
const a = {}

// #方式一：布尔判定
if(obj.a) {
  console.log('存在')
} else {
  // 如果:
  // const a = {
  //   a: undefined,
  //   a: 0,
  //   a: '',
  // }
  console.log('不存在')
}

// #方式二：对比undefined
if(obj.a !== undefined) {
  console.log('存在')
} else {
  // 如果:
  // const a = {
  //   a: undefined,
  //   a: 0,
  //   a: '',
  // }
  console.log('不存在')
}

// #方式三：使用Object.keys
if(Object.keys(obj).includes('a')) {
  // 拿到的是对象自有的可枚举属性：原型链的属性拿不到
  console.log('存在')
} else {
  console.log('不存在')
}

// #方式四：使用hasOwnProperty
if(obj.hasOwnProperty('a')) {
  // 拿到的是对象自有的属性：原型链的属性拿不到
  console.log('存在')
} else {
  console.log('不存在')
}

// #方式五：使用in
if('a' in obj) {
  // 不要求可枚举和自有属性，原型上也行
  console.log('存在')
} else {
  console.log('不存在')
}
```

- ### 3. 图片转base64
``` ts
/**
 * @desc img url to base64
 * @param url - img url
 * @author zeMing
 */
export const urlToBase64 = (url: string, mineType?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as HTMLCanvasElement | null
    const ctx = canvas!.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function() {
      if (!canvas || !ctx) {
        return reject()
      }
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}
```


