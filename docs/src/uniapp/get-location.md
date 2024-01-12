# 使用uniapp开发微信小程序获取当前位置

## 概要
在使用 Uniapp 开发微信小程序时，通常会遇到需要获取当前位置的详细信息（如 xxx省xxx市）。Uniapp 提供了一个名为 `uni.getLocation()`的方法来实现位置获取。然而，仔细观察文档后会发现，在 success 回调中只返回经纬度信息，而在 app 端的 success 回调中才会包含一个 address 字段，其中包含了详细的地址信息等。

那么在微信小程序中如何获取具体的位置信息呢？前提是，你的微信小程序已经具备了定位功能，这一点非常重要！你可以通过以下步骤来获取具体的位置信息：

1.使用 uni.getLocation() 方法获取经纬度信息。

2.将获得的经纬度信息发送给后端服务器。

3.后端服务器使用合适的地图 API（如百度地图、高德地图等）来获取详细的位置信息。你可以参考相应地图 API 的文档来实现该功能。

4.后端服务器将获取到的详细位置信息返回给前端，前端即可使用该信息进行相关操作。


## 一、配置
#### 1、进入mainfest.json文件配置permission块
这一步是在mainfest.json文件中配置微信小程序的权限，需要勾选位置接口。

#### 2、在微信公众平台添加合法域名
`tip：尽量不要跳过，这一步跳过可能会出现在微信开发者工具预览小程序时能够获取到位置，但是在手机微信中预览小程序就获取失败`

在微信公众平台中进行以下操作：
*  进入当前开发的项目 [进入微信公众平台](https://mp.weixin.qq.com/)，点击【开发】，选择【开发管理】，进入【开发设置】
*  在【服务器域名】中的【request合法域名】中添加以下域名：

```http
https://restapi.amap.com   //高德合法域名
```
这一步是为了确保微信小程序能够正常访问高德地图API

#### 3、下载高德SDK文件
在[高德开放平台](https://lbs.amap.com/api/wx/download)下载高德SDK文件。解压后，会得到一个amap-wx.130.js的文件。将该文件存放在项目中的静态文件夹中

## 二、使用步骤 （直接封装组件）
#### 1.在组件中引入amap-wx.130.js文件
>代码如下（示例）：

```javascript
import amap from '@/static/js/amap-wx.130.js';
```

#### 2.在data中定义

```vue
<script>
data() {
	return {
		amapPlugin: null,
		gaodekey: '386b29f376fca00a839e43060d0c829f', //高德key,此处的key需要去高德平台申请获取，此key是假的！！！
		address: "", // 已经获取到的位置
	}
}
</script>
```

#### 3.在created中定义

```vue
<script>
created() {
	this.amapPlugin = new amap.AMapWX({
		key: this.gaodekey
	});
	this.getLocation();
},
</script>
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

```vue
<template>
    <!-- 调用组件 -->
    <position-infor @lodAddress="getLocation()"></position-infor>
</template>

<script>
methods(){
	// 页面加载就会触发
  getLocation(address){
    // address就是组件传出的具体位置
    console.log(address);
    this.address = address;
  }
}
</script>

```

## 小结
实现此功能，你的微信小程序项目`必须具有定位功能`，没有的话还得去微信平台申请。二就是`必须拥有一个高德的key`，没有也需要申请。三就是需要借助`高德的amap-wx.130.js文件`
