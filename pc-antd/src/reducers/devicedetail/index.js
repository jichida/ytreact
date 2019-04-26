import { createReducer } from 'redux-act';
import lodashmap from 'lodash.map';
import moment from 'moment';
import {
  getdevicedata_result,
  getdevicehisdata_result,
  getdevicecmddata_result
} from '../../actions/index.js';

const initial = {
  devicedetail:{
    srvdata:{
        "Pressure3" : "0",
        "Pressure4" : "0",
        "tempt1" : "237",
        "tempt2" : "235",
        "tempt3" : "238",
        "tempt4" : "249",
        "MODLife" : "720",//MOD Life 膜寿命 d[G] {界面6}
        "Pre_filter1" : "365",//Pre_filter1 前置1 d[H] {界面7}
        "Pre_filter2" : "30",//Pre_filter2 前置2 d[I] {界面8}
        "Pre_filter3" : "10",//Pre_filter3 前置3 d[J] {界面9}
        "Pos_filter1" : "0",//Post Filter1 后置1 d[K] {界面10}
        "Pos_filter2" : "10",//Post Filter2 后置2 d[L] {界面11}
        "Pos_filter3" : "120",//Post Filter3 后置3 d[M] {界面12}
        "MODLifePercent" : "0",
        "Pre_filter1_percent" : "90",
        "Pre_filter2_percent" : "50",
        "Pre_filter3_percent" : "10",
        "Pos_filter1_percent" : "30",
        "Pos_filter2_percent" : "10",
        "Pos_filter3_percent" : "0",
        "UV" : "60",//UV d[U] {界面13}
        "systime" : "5196",//systime 系统运行时间 d[a] X
        "currentstate" : "6",
        "ModIn" : "995",//ModIn uS 进水水质 d[c]{界面2}
        "Concentration" : "1007",
        "ModOut" : "0",
        "Waste" : "1001",
        "cutAbs" : "995",
        "cutPer" : "99",
        "ModCurrent" : "12",
        "ModVoltage" : "203",
        "solenoidCurrent" : "33",
        "ProductQualityAverage" : "0",//Product Quality Average//平均水质d[l] {界面1}
        "ONtime" : "0",
        "productDvol" : "0",
        "wasteDvol" : "0",
        "Yield" : "0",//Yield 回收率 d[p] {界面5}
        "DailyVolume" : "0",//Daily Volume今日用水量 d[q]  {界面3}
        "WasteVolumeDaily" : "0",
        "FeedVolumeDaily" : "0",// Feed Volume Daily 今日总水量 d[s] X
        "totalVol" : "50000",
        "p1" : "46",
        "p2" : "0",
        "Ieff" : "0",
        "Energy" : "0",
        "Pressure1" : "0",
        "Pressure2" : "0",
        "Reserve1":'100' // Reserve1 预留1 d[V] {界面4}
    },
    dataMode:[
    ],
    data_spot:[
    ],
  }
};

const devicedetail = createReducer({
    [getdevicedata_result]:(state,payload)=>{
      const srvdata = {...payload.srvdata};
      return {...state,srvdata};
    },
    [getdevicehisdata_result]: (state, payload) => {
      const data_spot = [];
      const data = payload;
      lodashmap(data, (item, index) => {
        const { created_at, deviceid, _id, updated_at, srvdata } = item
        let createdTime = moment(created_at).format('YYYY-MM-DD HH:mm:ss')
        let updatedTime = moment(updated_at).format('YYYY-MM-DD HH:mm:ss')
        data_spot.push({
          key: index,
          _id,
          deviceid,
          created_at: createdTime,
          updated_at: updatedTime,
          ...srvdata
        })
      });
      return { ...state, data_spot:[...data_spot] };
    },
    [getdevicecmddata_result]:(state,payload)=>{
      const dataMode = [];
      const data = payload;
      lodashmap(data, (item, index) => {
        dataMode.push({
          ...item,
          key: index,
        })
      });
      return {...state,dataMode};
    },
}, initial.devicedetail);

export default devicedetail;
