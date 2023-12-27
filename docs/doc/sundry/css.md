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
    margin-bottom: 10px;
    background-color: #ccc;

    &:nth-child(3n+2) {
      margin-right: 2%;
      margin-left: 2%;
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

#### 2. 各种机型底部的安全区域
```css
.item {
  padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
}
```

#### 3. 常用css
```css
.item {
  word-break: break-all; // 纯数字换行
}
```

#### 4. css好网站
`css`
- [毛玻璃](http://tool.mkblog.cn/glassmorphism/)    http://tool.mkblog.cn/glassmorphism/
- [毛玻璃](https://glassgenerator.netlify.app/)     https://glassgenerator.netlify.app/
- [拟态风风格 CSS 代码](http://tool.mkblog.cn/neumorphism/#e0e0e0)
- [不规则图形css](https://csstrick.alipay.com/)     
- [clip-path 在线网站](http://tools.jb51.net/code/css3path)
- [雪碧图在线生成](https://www.toptal.com/developers/css/sprite-generator)
- [按钮制作](https://cssbuttongenerator.com/)
  
`SVG在线绘制 svg 波浪`
- [https://getwaves.io/](https://getwaves.io/)
- [https://fffuel.co/sssurf/](https://fffuel.co/sssurf/)
- [https://svgwave.in/](https://svgwave.in/)
  
`echarts`
- [PPChart](http://www.ppchart.com/#/)
- [madeapie](https://madeapie.com/#/)
- [echarts Demo 集](https://www.isqqw.com/)
- [MCChart](http://echarts.zhangmuchen.top/#/index)
- [echart 社区](https://www.makeapie.cn/echarts)
