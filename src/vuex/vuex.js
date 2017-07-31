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

  // 系统配置模态框数据与状态
  OPTIONMODAL_STATUS: false,
  optionModelData: "",
  queryEquip: false,
  // 默认选中菜单
  isAcitve: "首页",
  // 当前用户名
  userName: '',
  // 请求的公共头
  urlCommon: 'http://localhost:8080/GWServices.asmx/',
  // 用户权限信息相关数据
  getWebUser: '',

  // 配置模态框使用数据
  optiontreeData: '',

  // 配置模态框当前配置页面所需设备数据
  equipNoArr: [],
  // 报警排表模态框--状态
  AlarmTabulateModelStatus: false,
  AlarmSubmitStatus: false,

  // 设备联动模态框--状态
  EquipLink_ADD: false,
  EquipLink_REMOVE: false,
  EquipLink_REMOVE_item: false,
  // 场景名称
  scenarioName: ''
}

const mutations = {
  delete_ScenarioName(state, param) {
    state.scenarioName = param
  },
  EquipLink_REMOVE_Status(state, param = '') {
    state.EquipLink_REMOVE = !state.EquipLink_REMOVE
    state.EquipLink_REMOVE_item = param
  },
  EquipLink_ADD_Status(state, param = '') {
    state.EquipLink_ADD = !state.EquipLink_ADD
    if (param != '') {
      state.scenarioName = param
    }
  },
  AlarmModelStatus(state) {
    state.AlarmTabulateModelStatus = !state.AlarmTabulateModelStatus
  },
  // 确定提交
  AlarmModalSubmitStatus(state, param = true) {
    state.AlarmSubmitStatus = param
  },
  getEquipNoArr(state, param) {
    state.equipNoArr = param
  },
  getoptionModelData(state, param) {
    state.optiontreeData = param
  },
  updatequeryEquip(state) {
    // console.log("配置按钮点击");
    state.queryEquip = !state.queryEquip
  },
  // 系统配置页面，配置弹出框状态与数据更新
  optionModalStatus(state, modelData) {
    // console.log("触发了？");
    state.OPTIONMODAL_STATUS = !state.OPTIONMODAL_STATUS
    state.optionModelData = modelData
  },
  getWebUser(state, getWebUser) {
    state.getWebUser = getWebUser
  },
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
