/*
 * @Author: zhanghaoran
 * @Date: 2017-06-29 17:31:35
 * @Last Modified by: 张浩然
 * @Last Modified time: 2017-07-04 23:07:41
 */

const state = {
  // 登录块与登录动画切换标识,false为未进入登录动画
  LOGIN_STATUS: false,
  //是否完成登录，用来路由判断进入首页的标识
  LOGIN_COMPLETE: false,
  //登录所用的提示信息
  login_warnMsg: '',
  //全屏状态，true为全屏，false反之
  FULL_STATUS: false,
  LOGOUT_STATUS: false,
  bg_url: 'bg_1.jpg',
  REFRESH_STATUS: false,
  // 默认选中菜单
  isAcitve: "首页",
  // 当前用户名
  userName: ''
}

const mutations = {
  // 更换当前用户名
  updata_userName(state, userName) {
    state.userName = userName
  },
  // 更换菜单选中状态
  updata_isAcitve(state, name) {
    state.isAcitve = name
  },
  // 更换背景图片
  updata_bg_url(state, url) {
    state.bg_url = url
  },
  // 切换登录过程标识
  switchLogin(state) {
    state.LOGIN_STATUS = !state.LOGIN_STATUS
  },
  // 切换注销过程标识
  switchLogout(state) {
    state.LOGOUT_STATUS = !state.LOGOUT_STATUS
  },
  //更新登录信息
  updataLoginMsg(state, text) {
    state.login_warnMsg = text.msg;
  },
  //切换全屏状态标识
  switchFullStatus(state) {
    state.FULL_STATUS = !state.FULL_STATUS
  },
  // 切换刷新页面状态
  switchREFRESH_STATUS(state) {
    state.REFRESH_STATUS = !state.REFRESH_STATUS
  }
}

export { state, mutations };
