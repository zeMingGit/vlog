# 支付宝相关

## 概要
`提示：uniapp开发uniapp相关内容等`

## 技术细节
### 1. alipay链接
```shell
# alipays链接地址
# https://opendocs.alipay.com/mini/09ewnm
https://opendocs.alipay.com/support/01rb18

# 示例
alipays://platformapi/startapp?appId=2021003155682224&page=furtherConsultation/pages/onlineOutPatient/onlineOutPatient&query=stdSecondDeptId=2168

# 获取query参数
const launchOptions = uni.getLaunchOptionsSync()
options = launchOptions.query
```



## 小结
` 提示：支付宝内容`