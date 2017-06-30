/*
 * @Author: zhanghaoran 
 * @Date: 2017-06-29 17:31:35 
 * @Last Modified by: zhanghaoran
 * @Last Modified time: 2017-06-30 11:27:32
 */

const state = {
  LOGIN_STATUS: false,
  LOGIN_COMPLETE: false,
  login_warnMsg: ''
}

const mutations = {
  updataLogin(state) {
    state.LOGIN_STATUS = !state.LOGIN_STATUS
  },
  updataLoginMsg(state, text) {
    console.log(text.msg);
    state.login_warnMsg = text.msg;
  }
}

export {
  state,
  mutations
};
