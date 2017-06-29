/*
 * @Author: zhanghaoran 
 * @Date: 2017-06-29 17:31:35 
 * @Last Modified by:   zhanghaoran 
 * @Last Modified time: 2017-06-29 17:31:35 
 */

const state = {
  LOGIN_STATUS: false
}

const mutations = {
  updataLogin(state) {
    state.LOGIN_STATUS = !state.LOGIN_STATUS
  }
}

export {
  state,
  mutations
};
