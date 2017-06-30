/*
 * @Author: zhanghaoran 
 * @Date: 2017-06-29 17:31:35 
 * @Last Modified by: zhanghaoran
 * @Last Modified time: 2017-06-30 17:20:41
 */

const state = {
  // 登录块与登录动画切换标识,false为未进入登录动画
  LOGIN_STATUS: false,
  //是否完成登录，用来路由判断进入首页的标识
  LOGIN_COMPLETE: false,
  //登录所用的提示信息
  login_warnMsg: '',
  //全屏状态，true为全屏，false反之
  FULL_STATUS: false
}

const mutations = {
  // 切换登录过程标识
  switchLogin(state) {
    state.LOGIN_STATUS = !state.LOGIN_STATUS
  },
  //更新登录信息
  updataLoginMsg(state, text) {
    state.login_warnMsg = text.msg;
  },
  //切换全屏状态标识
  switchFullStatus(state) {
    state.FULL_STATUS = !state.FULL_STATUS
  }
}

export {
  state,
  mutations
};
