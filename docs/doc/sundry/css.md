# css布局

## 概要
`提示：提供一些布局`

## 技术细节
#### 1. 九宫格布局-中间居中
```less
.wrap {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 32%;
    height: 100px;
    background-color: #ccc;
    margin-bottom: 10px;

    &:nth-child(3n+2) {
      margin-left: 2%;
      margin-right: 2%;
    }

    &:nth-child(3n+1) {
      margin-left: 0;
    }

    &:nth-child(3n+3) {
      margin-right: 0;
    }
  }
}
```

#### 2. 常用css
```css
.item {
  word-break: break-all; // 纯数字换行
}
```
