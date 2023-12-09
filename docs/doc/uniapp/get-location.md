# 使用uniapp开发微信小程序获取当前位置

## 前言
 - 使用uniapp开发微信小程序时，多多少少会遇到获取当前位置的详细信息（比如：xxx省xxx市），uniapp提供了一个名为uni.getLocation()。仔细观察文档你就会发现，在success中只有经纬度信息，在app端success中才会有一个address字段（其中就包含详细的地址信息等）
 - 现在是微信小程序需要使用具体的位置信息怎么半？不得陷入沉思和骂***，废话不多说开整
 - 前提是，你的微信小程序具有定位功能，这个非常重要！！！



## 一、配置
#### 1、进入mainfest.json文件配置permission块
意思就是进mainfestison里的微信小程序配置，勾选位置接口

#### 2、进入微信公众平台添加合法域名
tip：尽量不要跳过，这一步跳过可能会出现在微信开发者工具预览小程序时能够获取到位置，但是在手机微信中预览小程序就获取失败

[进入微信公众平台](https://mp.weixin.qq.com/)
进入当前开发的项目中  一一 开发  一一   开发管理   一一   开发设置   一一  服务器域名   一一   request合法域名   一一  添加域名

```javascript
https://restapi.amap.com   //高德合法域名
```

#### 3、[高德SDK文件下载](https://lbs.amap.com/api/wx/download)
[高德SDK文件下载](https://lbs.amap.com/api/wx/download)
在解压后可以获取到一个js文件 ( amap-wx.130.js )，并且将改文件存放在项目中的静态文件中

## 二、使用步骤 （直接封装组件）
#### 1.在组件中引入amap-wx.130.js文件
>代码如下（示例）：

```javascript
import amap from '@/static/js/amap-wx.130.js';
```

#### 2.在data中定义

```javascript
data() {
	return {
		amapPlugin: null,
		gaodekey: '386b29f376fca00a839e43060d0c829f', //高德key,此处的key需要去高德平台申请获取，此key是假的！！！
		address: "", // 已经获取到的位置
	}
}
```

#### 3.在created中定义

```javascript
created() {
	this.amapPlugin = new amap.AMapWX({
		key: this.gaodekey
	});
	this.getLocation();
},
```

#### 4.在methods中定义

```javascript
getLocation() {
    const _this = this;
    this.amapPlugin = new amap.AMapWX({
        key: this.gaodekey
    });
    uni.showLoading({
        title: '获取信息中'
    });
    // 成功获取位置
    _this.amapPlugin.getRegeo({
        success: (data) => {
            console.log(data, '当前定位');
            
            _this.address =`${data[0].regeocodeData.addressComponent.city}${data[0].regeocodeData.addressComponent.district}`;
            
            // _this.address 可根据自己的实际情况修改
            _this.address = `${data[0].regeocodeData.formatted_address}`;
			// 传出
            _this.$emit("lodAddress",_this.address)
            uni.hideLoading();
        },
        // 获取位置失败
        fail: (err) => {
            uni.showToast({
                title: "获取位置失败，请重启小程序",
                icon: "error"
            })
        }
    });
},
```

#### 5.在你需要使用的vue页面调用改组件

```javascript
// 调用组件
<position-infor @lodAddress="getLocation()"></position-infor>

methods(){
	// 页面加载就会触发
	getLocation(address){
    	// address就是组件传出的具体位置
    	console.log(address);
    	this.address = address;
	}
}

```

## 总结
实现此功能，你的微信小程序项目`必须具有定位功能`，没有的话还得去微信平台申请。二就是`必须拥有一个高德的key`，没有也需要申请。三就是需要借助`高德的amap-wx.130.js文件`，以上就是本人想说的所有东西，需要补充私~
