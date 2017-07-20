<template>
  <div class="clearfix">
    <span>起始时间：</span>
    <input type="text" @click="panelState=!panelState" v-model="time.goTime" :class="{input_disabled:timeStatus!==dateChooseArr[3]}">
    <!-- <dataPicker></dataPicker>  -->
    <span>结束时间：</span>
    <input type="text" @click="panelState=!panelState" v-model="time.endTime" :class="{input_disabled:timeStatus!==dateChooseArr[3]}">
    <select v-model="timeStatus" @change="getTime()">
      <option :value="dateChooseArr[0]">当天</option>
      <option :value="dateChooseArr[1]">本周</option>
      <option :value="dateChooseArr[2]">本月</option>
      <option :value="dateChooseArr[3]">用户指定</option>
    </select>
  </div>
</template>

 <script type="es6">
// import dataPicker from './vue2-DataPick'

export default {
  data() {
    return {
      // 初始值，默认选择器关闭
      panelState: false,
      // 时间选择的标志
      timeStatus: '',
      // 日期选择档位
      dateChooseArr: ['day', 'week', 'month', 'customized'],

      // 时间对象
      time: {
        // 开始时间
        goTime: '',
        // 结束时间
        endTime: ''
      }
    }
  },
  methods: {
    getTime() {
      switch (this.timeStatus) {
        case this.dateChooseArr[0]:
          // 获取今天的年月日
          this.time.endTime = this.GetDayDate()
          // 此处正则处理更好，后面的传空格不能丢
          this.time.goTime = this.GetDayDate().substring(0, 10) + " 00:00:00"
          break;
        case this.dateChooseArr[1]:
          this.time.endTime = this.GetDayDate()
          this.time.goTime = this.GetWeekDate()
          break;
        case this.dateChooseArr[2]:
          this.time.endTime = this.GetDayDate()
          this.time.goTime = this.GetMonthDate()
          break;
        case this.dateChooseArr[3]:
          break;
        default:
          break;
      }
    },
    // 获取当前日期
    GetDayDate() {
      function add_zero(temp) {
        if (temp < 10) return "0" + temp;
        else return temp;
      };
      let d = new Date();
      let y = d.getYear() + 1900;
      let month = add_zero(d.getMonth() + 1),
        days = add_zero(d.getDate()),
        hours = add_zero(d.getHours());
      let minutes = add_zero(d.getMinutes()),
        seconds = add_zero(d.getSeconds());
      var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
      return str;
    },
    //格式化日期：yyyy-MM-dd
    formatDate(date) {
      let myyear = date.getFullYear();
      let mymonth = date.getMonth() + 1;
      let myweekday = date.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return (myyear + "-" + mymonth + "-" + myweekday);
    },
    // 获取本周第一天日期
    GetWeekDate() {
      let nowDay = new Date().getDate(),              //当前日
        nowMonth = new Date().getMonth(),           //当前月
        nowYear = new Date().getFullYear(),             //当前年
        nowDayOfWeek = new Date().getDay();         //今天本周的第几天
      // 做一下时间间隔判断，满足中国星期计算方法
      let tem = nowDayOfWeek == 1 ? 7 : 1;
      //获得本周的开始日期
      return this.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + tem)) + " 00:00:00";
    },
    //获取本月第一天日期
    GetMonthDate() {
      let nowMonth = new Date().getMonth(),           //当前月
        nowYear = new Date().getFullYear(),             //当前年
        nowDay = 1
      return this.formatDate(new Date(nowYear, nowMonth, nowDay)) + " 00:00:00";
    }
  },
  components: {
    // dataPicker
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';


@mixin input-select_common {
  background: rgba(255, 255, 255, .2);
  border: 1px solid rgba(255, 255, 255, .4);
  color: #FFF;
  transition: all 300ms linear 0s;
}

div {
  span {
    float: left;
    display: block;
    line-height: 30px;
  }
  input {
    @include input-select_common;
    margin-right: 13px;
    padding: 6px 12px;
    display: block;
    width: auto;
    float: left;
  }
  .input_disabled {
    opacity: .65;
    cursor: not-allowed;
    pointer-events: none;
  }
  select {
    @include input-select_common;
    padding: 5px 10px;
    outline: 0;
    margin-right: 6px;
    float: left;
  }
}
</style>
