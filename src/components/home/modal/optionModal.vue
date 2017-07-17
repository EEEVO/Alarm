<template>
  <div class="fullScreenPopup">
    <div class="fullScreenAll"></div>
    <div class="fullScreenCenter">
      <!-- 头部title -->
      <div class="MessageBox_top">
        <span>配置</span>
        <button class="MessageBox_top_Exit" @click="exitModel()">
          <i class="iconfont icon-guanbi"></i>
        </button>
      </div>
      <!-- 中间的内容操作块 -->
      <template>
        <div class="system_plug">
          <ul class="nav-tabList">
            <li v-for="(item,index) of tableItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{navName[index]}}</li>
          </ul>
          <div class="tab-content">
            <article v-if="curractiveIndex==0">
              <div id="commonlyList_Equip" v-if="!advancedConfigStatus[curractiveIndex]">
                <!-- TODO:此处好像不能用虚标签做状态切换 -->
                <div class="system_plug_list">
                  <div class="listStyle">
                    <ul>
                      <li v-for="(item,index) of tableItemName[curractiveIndex].value" :key="index" @click="currentLiIndex=index" :class="{active:currentLiIndex==index}">{{item.equip_nm}}</li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_Data">
                  <div class="sys_plug_ul_height_1">
                    <ul>
                      <li>
                        <span>设备号：</span>
                        <b>{{tableItemName[curractiveIndex].value[currentLiIndex].equip_no}}</b>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>设备名称：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].equip_nm" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'equip_nm',tableItemName[curractiveIndex].value[currentLiIndex].equip_nm)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联页面：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].related_pic" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'related_pic',tableItemName[curractiveIndex].value[currentLiIndex].related_pic)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联视频：</span>
                        <select>
                          <!-- <option v-for="(item,index) of QueryTableData[2].value" :key="index">{{item.ZiChanID}}</option> -->
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>资产编号：</span>
                        <select v-model="tableItemName[curractiveIndex].value[currentLiIndex].ZiChanName" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'ZiChanName',tableItemName[curractiveIndex].value[currentLiIndex].ZiChanName)">
                          <option v-for="(item,index) of QueryTableData[2].value" :key="index" :value="item.ZiChanName">{{item.ZiChanName}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>预案号：</span>
                        <select v-model="tableItemName[curractiveIndex].value[currentLiIndex].PlanNo" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'PlanNo',tableItemName[curractiveIndex].value[currentLiIndex].PlanNo)">
                          <option v-for="(item,index) of QueryTableData[3].value" :key="index" :value="item.PlanNo">{{item.PlanNo}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                  <div class="sys_plug_ul_height_2">
                    <ul>
                      <li>
                        <span>显示报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme,1)" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'alarm_scheme',`${tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme+1}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>记录报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme,2)" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'alarm_scheme',`${tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme+2}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <!-- TODO:不确定判断字段 -->
                        <span>Eamil报警</span>
                        <input type="checkbox">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <span>配置更多属性，请单击</span>
                    <button class="advancedSetparm" @click="advancedConfigUpdata()">
                      高级配置
                    </button>
                  </p>
                </div>
              </div>
              <!-- 高级配置页面 -->
              <div id="advancedList_Equip" v-if="advancedConfigStatus[curractiveIndex]">
                <div class="system_plug_Data">
                  <div class="listStyle">
                    <ul>
                      <li>
                        <span>设备属性：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].detail" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'detail',tableItemName[curractiveIndex].value[currentLiIndex].detail)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯刷新周期：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].acc_cyc" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'acc_cyc',tableItemName[curractiveIndex].value[currentLiIndex].acc_cyc)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通故障处理意见：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].proc_advice" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'proc_advice',tableItemName[curractiveIndex].value[currentLiIndex].proc_advice)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>故障提示：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].out_of_contact" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'out_of_contact',tableItemName[curractiveIndex].value[currentLiIndex].out_of_contact)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>故障恢复提示：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].contacted" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'contacted',tableItemName[curractiveIndex].value[currentLiIndex].contacted)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警声音文件：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].event_wav" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'event_wav',tableItemName[curractiveIndex].value[currentLiIndex].event_wav)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>驱动文件：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_drv" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'communication_drv',tableItemName[curractiveIndex].value[currentLiIndex].communication_drv)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯端口：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].local_addr" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'communication_drv',tableItemName[curractiveIndex].value[currentLiIndex].detail)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>设备地址：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].equip_addr" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'equip_addr',tableItemName[curractiveIndex].value[currentLiIndex].equip_addr)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯参数：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_param" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'communication_param',tableItemName[curractiveIndex].value[currentLiIndex].communication_param)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯时间参数：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_time_param" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'communication_time_param',tableItemName[curractiveIndex].value[currentLiIndex].communication_time_param)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警升级周期（分钟）：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].AlarmRiseCycle" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'AlarmRiseCycle',tableItemName[curractiveIndex].value[currentLiIndex].AlarmRiseCycle)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>模板设备号：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].raw_equip_no" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'raw_equip_no',tableItemName[curractiveIndex].value[currentLiIndex].raw_equip_no)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>附表名称：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].tabname" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'tabname',tableItemName[curractiveIndex].value[currentLiIndex].tabname)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>属性：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].attrib" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'attrib',tableItemName[curractiveIndex].value[currentLiIndex].attrib)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>安全时段：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].SafeTime" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'SafeTime',tableItemName[curractiveIndex].value[currentLiIndex].SafeTime)">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <button @click="advancedConfigUpdata()">返回</button>
                  </p>
                </div>
              </div>
            </article>
            <article v-if="curractiveIndex==1">
              <div id="commonlyList_Equip" v-if="!advancedConfigStatus[curractiveIndex]">
                <!-- TODO:此处好像不能用虚标签做状态切换 -->
                <div class="system_plug_list">
                  <div class="listStyle">
                    <select @change="selectYxpIndex()" v-model='currentId'>
                      <option v-for="(item,index) of getEquipName" :key="index" :value="item.id">{{item.label}}</option>
                    </select>
                    <div class="system_plug_list_lStyle">
                      <ul id="treeList_plug_ycp">
                        <li v-for="(item,index) of yxpList" :key="index" :class="{active:currYcpIndex==index}" @click="selectYvpDate(index)">{{item.yc_nm}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="system_plug_Data">
                  <div class="sys_plug_ul_height_1">
                    <ul>
                      <li>
                        <span>设备号：</span>
                        <!-- <b>{{tableItemName[curractiveIndex].value[currentLiIndex].equip_no}}</b> -->
                        <b>{{currYcpData.equip_no}}</b>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>模拟量编号：</span>
                        <b>{{currYcpData.yc_no}}</b>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>模拟量名称：</span>
                        <input type="text" v-model="currYcpData.yc_nm" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'yc_nm',`${currYcpData.yc_nm}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>下限值：</span>
                        <input type="text" v-model="currYcpData.val_min" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'val_min',`${currYcpData.val_min}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>回复下限值：</span>
                        <input type="text" v-model="currYcpData.restore_min" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'restore_min',`${currYcpData.restore_min}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>回复上限值：</span>
                        <input type="text" v-model="currYcpData.restore_max" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'restore_max',`${currYcpData.restore_max}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>上限值：</span>
                        <input type="text" v-model="currYcpData.val_max" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'val_max',`${currYcpData.val_max}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>单位：</span>
                        <input type="text" v-model="currYcpData.unit" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'unit',`${currYcpData.unit}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联页面：</span>
                        <input type="text" v-model="currYcpData.related_pic" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'related_pic',`${currYcpData.related_pic}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联视频：</span>
                        <select v-model="currYcpData.related_video" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'related_video',currYcpData.related_video)">
                          <option v-for="(item,index) of QueryTableData[1].value" :key="index" :value="item.related_video">{{item.related_video}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>资产编号：</span>
                        <select v-model="currYcpData.ZiChanID" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'ZiChanID',currYcpData.ZiChanID)">
                          <option v-for="(item,index) of QueryTableData[2].value" :key="index" :value="item.ZiChanID">{{item.ZiChanName}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>预案号：</span>
                        <select v-model="currYcpData.PlanNo" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'PlanNo',currYcpData.PlanNo)">
                          <option v-for="(item,index) of QueryTableData[3].value" :key="index" :value="item.PlanNo">{{item.PlanNo}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>曲线记录：</span>
                        <input type="checkbox" :checked="currYcpData.curve_rcd" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'curve_rcd',`${currYcpData.curve_rcd}`)">
                        <!-- <input type="text" v-model="currYcpData.curve_rcd" >  -->
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                  <div class="sys_plug_ul_height_2">
                    <ul>
                      <li>
                        <span>显示报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(currYcpData.alarm_scheme,1)" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'alarm_scheme',`${currYcpData.alarm_scheme+1}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>记录报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(currYcpData.alarm_scheme,2)" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'alarm_scheme',`${currYcpData.alarm_scheme+2}`)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <!-- TODO:不确定判断字段 -->
                        <span>Eamil报警</span>
                        <input type="checkbox">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <span>配置更多属性，请单击</span>
                    <button class="advancedSetparm" @click="advancedConfigUpdata()">
                      高级配置
                    </button>
                  </p>
                </div>
              </div>
              <!-- 模拟量--高级配置页面 -->
              <div id="advancedList_Equip" v-if="advancedConfigStatus[curractiveIndex]">
                <div class="system_plug_Data">
                  <div class="listStyle">
                    <ul>
                      <li>
                        <span>比例变换：</span>
                        <input type="checkbox" :checked="currYcpData.mapping" @change="getChangeData(curractiveIndex,tableItemName[curractiveIndex].value[currentLiIndex].equip_no,'detail',tableItemName[curractiveIndex].value[currentLiIndex].detail)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>曲线记录阈值：</span>
                        <input type="text" v-model="currYcpData.curve_limit" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'curve_limit',currYcpData.curve_limit)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>实测最小值：</span>
                        <input type="text" v-model="currYcpData.yc_min" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'yc_min',currYcpData.yc_min)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>实测最大值：</span>
                        <input type="text" v-model="currYcpData.yc_max" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'yc_max',currYcpData.yc_max)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>最小值：</span>
                        <input type="text" v-model="currYcpData.physic_min" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'physic_min',currYcpData.physic_min)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>最大值：</span>
                        <input type="text" v-model="currYcpData.physic_max" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'physic_max',currYcpData.physic_max)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>属性值：</span>
                        <input type="text" v-model="currYcpData.val_trait" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'val_trait',currYcpData.val_trait)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>操作指令：</span>
                        <input type="text" v-model="currYcpData.main_instruction" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'main_instruction',currYcpData.main_instruction)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>操作参数：</span>
                        <input type="text" v-model="currYcpData.minor_instruction" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'minor_instruction',currYcpData.minor_instruction)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>越线滞纳时间(秒)：</span>
                        <input type="text" v-model="currYcpData.alarm_acceptable_time" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'alarm_acceptable_time',currYcpData.alarm_acceptable_time)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>恢复滞纳时间(秒)：</span>
                        <input type="text" v-model="currYcpData.restore_acceptable_time" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'restore_acceptable_time',currYcpData.restore_acceptable_time)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>重复报警时间（分钟）：</span>
                        <input type="text" v-model="currYcpData.alarm_repeat_time" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'alarm_repeat_time',currYcpData.alarm_repeat_time)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>处理意见：</span>
                        <input type="text" v-model="currYcpData.proc_advice" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'proc_advice',currYcpData.proc_advice)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警级别：</span>
                        <input type="text" v-model="currYcpData.lvl_level" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'lvl_level',currYcpData.lvl_level)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警升级周期：</span>
                        <input type="text" v-model="currYcpData.AlarmRiseCycle" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'AlarmRiseCycle',currYcpData.AlarmRiseCycle)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>越下限事件：</span>
                        <input type="text" v-model="currYcpData.outmin_evt" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'outmin_evt',currYcpData.outmin_evt)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>越上限事件：</span>
                        <input type="text" v-model="currYcpData.outmax_evt" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'outmax_evt',currYcpData.outmax_evt)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>声音文件：</span>
                        <input type="text" v-model="currYcpData.wave_file" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'wave_file',currYcpData.wave_file)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警屏蔽：</span>
                        <input type="text" v-model="currYcpData.alarm_shield" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'alarm_shield',currYcpData.alarm_shield)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>安全时段：</span>
                        <input type="text" v-model="currYcpData.SafeTime" @change="getChangeData(curractiveIndex,currYcpData.equip_no,'SafeTime',currYcpData.SafeTime)">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <button @click="advancedConfigUpdata()">返回</button>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </template>
      <!-- 底部的确定，取消按钮啥的 -->
      <p class="MessageBox_p3">
        <button @click="confirm()">确定</button>
        <button @click="exitModel()">取消</button>
        <button @click="onUsingModals()">应用</button>
      </p>
    </div>
  
  </div>
</template>

 <script type="es6">

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export default {
  props: ["optionModelData"],
  data() {
    return {
      currentId: "",
      jsonChange: [[], [], [], []],
      // 设备配置页面 选中的设备index
      currentLiIndex: 0,
      // nav
      navName: ["设备配置", "模拟量配置", "状态量配置", "设置配置"],
      // 每一块内的高级页面状态数组
      advancedConfigStatus: [false, false, false, false],
      // 当前选中的index
      curractiveIndex: 0,
      tableItemName: this.optionModelData,
      equipData: '',
      QueryTableData: [{
        name: "AlarmProc",
        value: ''
      }, {
        name: "GW_VideoInfo",
        value: ''
      }, {
        name: "GWZiChanTable",
        value: ''
      }, {
        name: "GWPlan",
        value: ''
      }],
      yxpList: [],
      currYcpIndex: '',
      currYcpData: {
        equip_no: '',
        yc_no: '',
        yc_nm: '',
        val_min: '',
        restore_min: '',
        restore_max: '',
        val_max: '',
        unit: '',
        related_pic: ''
      }
    }
  },
  created() {
    this.getQueryTableData()
  },
  methods: {
    selectYvpDate(index) {
      this.currYcpIndex = index
      this.currYcpData = this.yxpList[this.currYcpIndex]
    },
    selectYxpIndex() {
      this.yxpList = [];
      for (let item of this.tableItemName[this.curractiveIndex].value) {
        if (this.currentId === item.equip_no) {
          this.yxpList.push(item);
        }
      }
    },
    // 确认按钮事件
    confirm() {
      this.exitModel();
      this.onUsingModals();
    },
    // TODO:更改设备名称后列表名称没有跟着修改
    // 应用按钮单机事件
    onUsingModals() {
      const urlArr = ["SystemEquipChange", "SystemYcpChange", "SystemYxpChange", "SystemSetParmChange"];
      // this.$http.all(this.$http.post(`${this.$store.state.urlCommon}${urlArr[0]}`, {
      //   jsonChange: JSON.stringify(this.jsonChange[0])
      // }), this.$http.post(`${this.$store.state.urlCommon}${urlArr[1]}`, {
      //   jsonChange: JSON.stringify(this.jsonChange[1])
      // }), this.$http.post(`${this.$store.state.urlCommon}${urlArr[2]}`, {
      //   jsonChange: JSON.stringify(this.jsonChange[2])
      // }), this.$http.post(`${this.$store.state.urlCommon}${urlArr[3]}`, {
      //   jsonChange: JSON.stringify(this.jsonChange[3])
      // })).then(this.$http.spread((res0, res1, res2, res3) => {
      //   console.log(arguments);
      // }));
       this.$http.post(`${this.$store.state.urlCommon}${urlArr[1]}`, {
        jsonChange: JSON.stringify(this.jsonChange[1])
      }).then((res)=>{
        console.log(res.data.d);
      })
    },
    // 更改当前选项卡高级配置页面状态
    advancedConfigUpdata() {
      let Tem = this.advancedConfigStatus[this.curractiveIndex];
      this.$set(this.advancedConfigStatus, this.curractiveIndex, !Tem);
    },
    select(param) {
      this.curractiveIndex = param
    },
    exitModel() {
      this.$store.commit("optionModalStatus")
      this.$store.commit("updatequeryEquip")
    },
    getEquip(param) {
      this.currentLiIndex
      this.equipData = param
    },
    // 获取关联视频
    get_related_video(item) {
      if (item == this.QueryTableData[1].name) {
        for (let i of this.QueryTableData[1].value) {
          item = i
          return item
        }
      }
    },
    // 是否显示报警
    alarmSchemes(item, index) {
      if ((item & index) > 0) {
        return true
      } else {
        return false
      }
    },
    getQueryTableData() {
      for (let item of this.QueryTableData) {
        this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
          tableName: item.name
        }).then((res) => {
          // console.log(JSON.parse(res.data.d));
          item.value = JSON.parse(res.data.d);
        })
      }
    },
    // 获取更改的设备值
    getChangeData(curractiveIndex, id, listName, value) {
      let temArr = this.jsonChange[curractiveIndex]
      // 做一次过滤
      for (let index = 0; index < temArr.length; index++) {
        let item = temArr[index];
        if (item.listName === listName) {
          temArr.remove(index);
        }
      }
      let obj = {
        id,
        listName,
        value
      };
      temArr.push(obj)
    },
  },
  computed: {
    // 获取设备列表数据
    getEquipName() {
      return this.$store.state.optiontreeData[0].children
    },
    // 获取当前选中的模拟量测点
    // currYcpData() {
    //   if (this.currYcpIndex == "" || this.yxpList.length == 0) {
    //     return {
    //       equip_no: '',
    //       yc_no: '',
    //       yc_nm: '',
    //       val_min: '',
    //       restore_min: '',
    //       restore_max: '',
    //       val_max: '',
    //       unit: '',
    //       related_pic: ''
    //     }
    //   }
    //   // return this.yxpList[this.currYcpIndex]
    //   return this.yxpList
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin.scss';

@mixin child-odd {
  background: rgba(0, 0, 0, .13);
  border-top: 1px solid rgba(255, 255, 225, .15);
  border-bottom: 1px solid rgba(255, 255, 225, .15);
}

@mixin comBtn {
  border: none;
  border-radius: 2px;
  padding: 6px 12px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
  color: #fff;
  font-family: "Microsoft YaHei";
}

.fullScreenPopup {
  @include absoluteWH(100%, 100%);
  position: fixed;
  @include trbl(0, 0, 0, 0);
  background: rgba(0, 0, 0, .6);
  z-index: 100;
  .fullScreenAll {
    position: absolute;
    @include trbl(0, 0, 0, 0);
    z-index: 1;
  }
  .fullScreenCenter {
    top: 10%;
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 0 0;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    width: 500px;
    background: url(/static/img/bg_1.jpg);
    .MessageBox_top {
      position: absolute;
      @include trbl(0, 0, auto, 0);
      z-index: 200;
      span {
        display: block;
        float: left;
        padding: 8px 12px;
      }
      .MessageBox_top_Exit {
        background-color: transparent;
        padding: 8px 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        float: right;
        &:hover {
          background-color: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
    .system_plug {
      height: 350px;
      display: block;
      position: relative;
      margin: 20px 0 0 -20px;
      .nav-tabList {
        list-style: none;
        margin: 0;
        padding-left: 13px;
        li {
          float: left;
          margin-right: 4px;
          cursor: pointer;
          padding: 6px 12px;
          background: rgba(255, 255, 255, .13);
          border-radius: 4px 4px 0 0;
          transition: all 300ms linear 0s;
          &:hover {
            background: rgba(255, 255, 255, .36);
            color: #fff;
          }
        }
        .active {
          background: rgba(255, 255, 255, .8)!important;
          color: #000!important;
        }
      }
      .tab-content {
        border: 1px solid rgba(255, 255, 255, .15);
        clear: both;
        @include absoluteWH(auto, auto);
        @include trbl(28px, 0, 0, 13px);
        article {
          @include absoluteWH(auto, auto);
          @include trbl(0, 0, 0, 0);
          #commonlyList_Equip {
            .system_plug_list {
              position: absolute;
              @include trbl(0, 66%, 0, 0);
              overflow-y: auto;
              display: block;
              border: 1px solid rgba(255, 255, 225, .15);
              bottom: 35px!important;
              .listStyle {
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &.active {
                      background: rgba(255, 255, 255, .36)!important;
                    }
                    &:hover {
                      background: rgba(255, 255, 255, .2);
                    }
                  }
                }
                select {
                  background: rgba(255, 255, 255, .2);
                  border: 1px solid rgba(255, 255, 255, .4);
                  color: #FFF;
                  transition: all 300ms linear 0s;
                  padding: 5px 10px;
                  outline: 0;
                  width: 100%;
                  option {
                    background: rgba(0, 0, 0, .9);
                    border-color: rgba(0, 0, 0, .4);
                    color: #FFF;
                  }
                }
                .system_plug_list_lStyle {
                  height: auto;
                  overflow: auto;
                  #treeList_plug_ycp {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    white-space: nowrap;
                    li {
                      line-height: 30px;
                      padding: 0 12px;
                      cursor: default;
                      transition: all 300ms linear 0s;
                      &:nth-child(odd) {
                        background: rgba(0, 0, 0, .13);
                        border-top: 1px solid rgba(255, 255, 225, .15);
                        border-bottom: 1px solid rgba(255, 255, 225, .15);
                      }
                      &:nth-child(even) {
                        background-color: transparent;
                      }
                      &:hover {
                        background: rgba(255, 255, 255, .2);
                      }
                    }
                    .active {
                      background: rgba(255, 255, 255, .36)!important;
                    }
                  }
                }
              }
            }
            .system_plug_Data {
              position: absolute;
              @include trbl(0, 0, 0, 34%);
              display: block;
              bottom: 35px!important;
              .sys_plug_ul_height_1 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 198px;
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input[type="text"],
                    select {
                      background: rgba(255, 255, 255, 0.2);
                      border: 1px solid rgba(255, 255, 255, 0.4);
                      color: #FFF;
                      margin: 0px;
                      padding: 6px 12px;
                      display: block;
                      width: 100%;
                      transition: all 300ms linear 0s;
                      float: left;
                      width: 175px !important;
                      display: block;
                      top: 2px !important;
                    }
                  }
                }
              }
              .sys_plug_ul_height_2 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 87px;
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input {
                      top: 2px!important;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            .system_plug_botton {
              position: absolute;
              @include trbl(auto, 13px, 0, 13px);
              p {
                margin: 3px 0;
                text-align: right;
                button {
                  @include comBtn;
                  background-color: rgba(50, 219, 1, 0.3);
                  &:hover {
                    background-color: rgba(50, 219, 1, 0.6);
                    color: #fff;
                    box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
                  }
                }
              }
            }
          }
          #advancedList_Equip {
            .system_plug_Data {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              display: block;
              bottom: 35px!important;
              overflow: auto;
              .listStyle {
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: rgba(255, 255, 255, .2);
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 182px;
                      text-align: right;
                    }
                    input[type="text"],
                    select {
                      background: rgba(255, 255, 255, .2);
                      border: 1px solid rgba(255, 255, 255, .4);
                      color: #FFF;
                      margin: 0px;
                      padding: 6px 12px;
                      display: block;
                      width: 100%;
                      transition: all 300ms linear 0s;
                      float: left;
                      width: 195px!important;
                      display: block;
                      top: 2px!important;
                    }
                  }
                }
              }
            }
            .system_plug_botton {
              position: absolute;
              @include trbl(auto, 13px, 0, 13px);
              p {
                margin: 3px 0;
                text-align: right;
                button {
                  @include comBtn;
                  background-color: rgba(50, 219, 1, 0.3);
                  &:hover {
                    background-color: rgba(50, 219, 1, 0.6);
                    color: #fff;
                    box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
                  }
                }
              }
            }
          }
        }
        .active {
          display: block;
        }
      }
    }
    .MessageBox_p3 {
      text-align: right;
      button {
        @include comBtn;
        background: rgba(0, 0, 0, .3);
        margin-right: 10px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
  }
}
</style>


