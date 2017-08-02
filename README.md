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

* [ ] 完成首页内容块

* [X] ~~*刷新模态框完成，但初始动画有问题*~~

> 动画类名大小写错误一个

### 17/07/05

- [ ] 菜单列表内的isActive没有响应式的依赖于vuex中的变量，故联动选择状态未完成

### 17/07/06

设备联动导航菜单列表完成

### 17/07/10

实时快照btnList模板样式完成，还有事件未完成

### 17/07/12

系统配置模块，table基础渲染完成，行内点击展开功能未实现，查询功能串行流程有bug

### 17/07/13

系统配置模块，配置模态框组件开始编写

### 17/07/14

系统配置模块，配置模态框组件应用功能未实现

模态框整体移出到body下。以后所有模态框统一设置到body下，方便维护

### 17/07/18

配置模态应拆分成小组件，change应该用事件代理解决，不然绑定到dom上很脏

### 17/07/26

报警排表-特定日期排表，因没数据，所以暂时不动

### 17/08/02

>完成了子组件内部刷新，目前没有找到合适的办法，还是hack了利用的中间层跳转实现