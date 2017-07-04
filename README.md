# alarmcenter_vue

技术选型

>Vue2+webpack2+Asiox+vuex+vue-route

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080Ï
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 开发日志

### 17/06/28

* [X] ~~*端口改写为10010*~~

* [X] ~~*代码审查基于eslint*~~

### 17/06/29

* [X] ~~*关闭了eslint*~~

* [X] ~~*登录页面与对应的登录模块初步完成*~~

### 17/06/30

* [X] ~~*完成了整个登录模块*~~

* [ ] 完成了home页的皮肤与全屏切换

### 17/07/01

* [ ] 子组件内切换html根元素的背景未完成

* [ ] 皮肤功能切换，并且皮肤选择也应该存入localStroage

### 17/07/02

* [X] ~~*header组件完成，其中皮肤组件功能不全，且显示时动画存在bug*~~

>bug在于Animate动画库的版本问题导致

### 17/07/03

* [X] ~~*导航菜单与footer组件完成*~~

* [X] ~~*对应导航的内容块组件构建完成*~~

### 17/07/04

* [X] ~~*点击首页时，上面logo部分文字掉落*~~

>问是在commontHeader组件中的样式影响，原因在于style标签中scoped才是此项目内而不是scopedSlots

* [ ] 完成首页内容块

* [X] ~~*刷新模态框完成，但初始动画有问题*~~

> 动画类名大小写错误一个
