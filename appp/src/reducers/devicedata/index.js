import { createReducer } from 'redux-act';
import lodashSet from 'lodash.set';
import {
  wifi_getdata,
  getdevice_result,
  setdatatarget,
  setfilterlist
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    devicedata: {
      isgetdata:false,
      srvdata : {
          "Pressure3" : 0,
          "Pressure4" : 0,
          "tempt1" : 237,
          "tempt2" : 235,
          "tempt3" : 238,
          "tempt4" : 247,
          "MODLife" : 720,
          "Pre_filter1" : 0,
          "Pre_filter2" : 0,
          "Pre_filter3" : 0,
          "Post_filter1" : 0,
          "Post_filter2" : 0,
          "Post_filter3" : 0,
          "MODLifePercent" : 0,
          "Pre_filter1_percent" : 0,
          "Pre_filter2_percent" : 0,
          "Pre_filter3_percent" : 0,
          "Pos_filter1_percent" : 0,
          "Pos_filter2_percent" : 0,
          "Pos_filter3_percent" : 0,
          "UV" : 0,
          "systime" : 420,
          "currentstate" : 6,
          "ModIn" : 31,
          "Concentration" : 1009,
          "ModOut" : 383,
          "Waste" : 1007,
          "cutAbs" : 14,
          "cutPer" : 1,
          "ModCurrent" : 6,
          "ModVoltage" : 40,
          "solenoidCurrent" : 42,
          "ProductQualityAverage" : 0,
          "ONtime" : 0,
          "productDvol" : 0,
          "wasteDvol" : 0,
          "Yield" : 0,
          "DailyVolume" : 590,
          "WasteVolumeDaily" : 16,
          "FeedVolumeDaily" : 0,
          "totalVol" : 1,
          "p1" : 46,
          "p2" : 0,
          "Ieff" : 0,
          "Energy" : 0,
          "Pressure1" : 174,
          "Pressure2" : 0
      },
      homedata:{
        main_outwater_quality:30,//出水水质,
        main_outwater_grade:'优',//出水等级,
        main_inwater_quality:32,//进水水质,
        main_totalwatervol:29993,//总产水量
        main_runtime:23,//运行时间
        main_outcwatervol:322,//浓水出水量
        //以下是滤芯部分
        filterelements_modlife_leftvol:390,//电离子膜寿命剩余流量
        filterelements_prefilter1_leftvol:980,//前置PP寿命剩余流量
        filterelements_prefilter2_leftvol:30,//前置2滤芯寿命剩余流量
        filterelements_prefilter3_leftvol:9,//前置3滤芯寿命剩余流量
        filterelements_posfilter1_leftvol:700,//后置活性炭寿命剩余流量
        filterelements_posfilter2_leftvol:90,//电离子膜寿命剩余流量
        filterelements_posfilter3_leftvol:100,//电离子膜寿命剩余流量
        filterelements_modlife_leftday:500,//电离子膜寿命剩余天数
        filterelements_prefilter1_leftday:88,//前置PP寿命剩余天数
        filterelements_prefilter2_leftday:24,//前置2寿命剩余天数
        filterelements_prefilter3_leftday:41,//前置3寿命剩余天数
        filterelements_posfilter1_leftday:50,//后置活性炭寿命剩余天数
        filterelements_posfilter2_leftday:23,//后置2滤芯寿命剩余天数
        filterelements_posfilter3_leftday:46,//后置2滤芯寿命剩余天数
      },
      errordata:{
        error_partsfailure:1,//零件故障
        error_pumpfailure:1,//20	泵故障	ERROR2:0 无故障 1有故障
        error_programfailure:1,//21	程序故障	ERROR3:0 无故障 1有故障
        error_flowfailure:1,//22	流量故障	ERROR4:0 无故障 1有故障
        error_leakagefault:1,//23	漏水故障	ERROR5:0 无故障 1有故障
        error_edicurrent:1,//24	EDI电流	ERROR6:0 无故障 1有故障
        error_modout:1,//25	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
        error_intakesensorfault:1,//26	进水传感器故障	ERROR8 :0 无故障 1有故障
        error_outflowsensorfault:1,//27	出水传感器故障	ERROR9:0 无故障 1有故障
        error_cwatersensorfault:1,//28	浓水传感器故障	ERROR10 :0 无故障 1有故障
        error_wastewatersensorfault:1,//29	废水传感器故障	ERROR11:0 无故障 1有故障
        error_outflowflowmeterfailure:1,//30	出水流量计故障	ERROR12:0 无故障 1有故障
        error_wastewaterflowmeterfailure:1,//31	废水流量计故障	ERROR13:0 无故障 1有故障
        error_clockfailure:1,//32	时钟故障	ERROR14:0 无故障 1有故障
        error_pressuresensor1failure:0,//33	压力1传感器故障	ERROR15:0 无故障 1有故障
        error_pressuresensor2failure:0,//34	压力2传感器故障	ERROR16:0 无故障 1有故障
        error_pressuresensor3failure:0,//35	压力3传感器故障	ERROR17:0 无故障 1有故障
        error_pressuresensor4failure:0,//36	压力4传感器故障	ERROR18:0 无故障 1有故障
      },
      performancedata:{
        averagecurrent_600:300,//平均电流@600	600电导率时的电流:mA	1 word
        averagecurrent_300:200,//300电导率时的电流:mA	1 word
        averagecut_600:350,//16	平均cut@600	600电导率时的cut	1 word
        averagecut_300:150,// 17	平均cut@300	300电导率时的cut	1 word
        waterpurificationrate:90,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

        max_averagecurrent_600:120,//平均电流@600	600电导率时的电流:mA	1 word
        max_averagecurrent_300:100,//300电导率时的电流:mA	1 word
        max_averagecut_600:170,//16	平均cut@600	600电导率时的cut	1 word
        max_averagecut_300:70,// 17	平均cut@300	300电导率时的cut	1 word
        max_waterpurificationrate:19,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

        min_averagecurrent_600:6,//平均电流@600	600电导率时的电流:mA	1 word
        min_averagecurrent_300:5,//300电导率时的电流:mA	1 word
        min_averagecut_600:4,//16	平均cut@600	600电导率时的cut	1 word
        min_averagecut_300:3,// 17	平均cut@300	300电导率时的cut	1 word
        min_waterpurificationrate:2,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
      },
      inwatersettings:{//进水设定（只针对
        tds:'',//进水TDS	进水TDS  word	1 word
        conductivity:'',//50	进水电导率	进水电导率  word	1 word
        hardness:'',//进水硬度	进水硬度  word	1 word
        alkalinity:'',//进水碱度	进水碱度  word	1 word
        ph:'',//49	进水PH	进水的PH值  byte	1 byte
      },
      syssettings:{//系统设置
          quality:'',
          dormancy:false,
          dormancystart:'00:00',
          dormancyend:'23:00',
          language:'zh-cn'
      },
      filterlist:{
        prev0:0,
        prev1:0,
        prev2:0,
        post0:0,
        post1:0,
      },
    },

};

const devicedata = createReducer({
    [setfilterlist]:(state,payload)=>{
      const {prev0,prev1,prev2,post0,post1} = payload;
      let filterlist = {...state.filterlist,prev0,prev1,prev2,post0,post1};
      return {...state,filterlist};
    },
    [setdatatarget]:(state,payload)=>{
      let newdata = {};
      lodashSet(newdata,`${payload.fieldname}`,payload.value);
      console.log(newdata);
      const {inwatersettings:inwatersettingsnew,syssettings:syssettingsnew} = newdata;
      let inwatersettings = state.inwatersettings;
      let syssettings = state.syssettings;
      if(!!inwatersettingsnew){
        inwatersettings = {...inwatersettings,...inwatersettingsnew}
      }
      if(!!syssettingsnew){
        syssettings = {...syssettings,...syssettingsnew}
      }
      return {...state,inwatersettings, syssettings};
    },
    [getdevice_result]:(state,payload)=>{
      if(!!payload.appdata){
        const {homedata:homedatanew,errordata:errordatanew,performancedata:performancedatanew,inwatersettings:inwatersettingsnew,
        syssettings:syssettingsnew} = payload.appdata;
        const homedata = {...homedatanew};
        const errordata = {...errordatanew};
        const performancedata = {...performancedatanew};
        const inwatersettings = {...inwatersettingsnew};
        const syssettings = {...syssettingsnew};
        let srvdata = state.srvdata;
        if(!!payload.srvdata){
          srvdata = {...payload.srvdata};
        }
        return { ...state, homedata,errordata,performancedata,inwatersettings,syssettings,srvdata,isgetdata:true};
      }
      return state;
    },
    [wifi_getdata]: (state, payload) => {
        // let homedata = state.homedata;
        // let errordata = state.errordata;
        // let performancedata = state.performancedata;
        const {homedata:homedatanew,errordata:errordatanew,performancedata:performancedatanew,inwatersettings:inwatersettingsnew,
        syssettings:syssettingsnew} = payload;
        const homedata = {...homedatanew};
        const errordata = {...errordatanew};
        const performancedata = {...performancedatanew};
        const inwatersettings = {...inwatersettingsnew};
        const syssettings = {...syssettingsnew};
        return { ...state, homedata,errordata,performancedata,inwatersettings,syssettings,isgetdata:true};
    },

}, initial.devicedata);

export default devicedata;
