import { createReducer } from 'redux-act';
import {
  wifi_getdata,
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    devicedata: {
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
      }

    },

};

const devicedata = createReducer({
    [wifi_getdata]: (state, payload) => {
        // let homedata = state.homedata;
        // let errordata = state.errordata;
        // let performancedata = state.performancedata;
        const {homedata:homedatanew,errordata:errordatanew,performancedata:performancedatanew} = payload;
        const homedata = {...homedatanew};
        const errordata = {...errordatanew};
        const performancedata = {...performancedatanew};
        return { ...state, homedata,errordata,performancedata };
    },

}, initial.devicedata);

export default devicedata;
