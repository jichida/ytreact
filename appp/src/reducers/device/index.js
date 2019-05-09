import { createReducer } from 'redux-act';
import {
  wifi_getdata,
  adddevice_result,
  getdevice_result,
  setuserdevice_result,
  tmp_ui_setuserdevice_request
  // ui_setcurwifi
} from '../../actions/index.js';
import moment from 'moment';
import 'moment-timezone';
const curTZ = moment.tz.guess();
const initial = {
    device: {
      _id:'',
      distributorid:{},
      devicelist:{
        filterlist:[
          {isprev: true, lastchangedate: "2019-04-26T09:10:35.250Z",  idname: "prev0"},
          {isprev: true, lastchangedate: "2019-04-26T09:10:35.250Z",  idname: "prev1"},
          {isprev: true, lastchangedate: "2019-04-26T09:10:35.250Z",  idname: "prev2"},
          {isprev: false, lastchangedate: "2019-04-26T09:10:35.250Z", idname: "post0"},
          {isprev: false, lastchangedate: "2019-04-26T09:10:35.250Z", idname: "post1"},
          {isprev: false, lastchangedate: "2019-04-26T09:10:35.250Z", idname: "post2"},
        ],
        configuration: String,
        materials: String,
        host: String,
        pipefittings: { // 主要管件
          valve: String,
          connection: String,
          elbow: String,
          triplet: String,
          silkpair: String,
          silkspin: String,
          others: String
        },
        others:String
      },
      basicinfo:{
          username:'',
          userphone:'',
          useraddress:'',
          useproperty:'',
          building:'',
          floor:'',
          model:''
      },
      usewater:{
          quantity:'',
          persons:'',
          spot:'',
          watergage:'',
          booster:false,
          bathrooms:'',
          shunt:false,
          source:'',
          tds:'',
          conductivity:'',
          hardness:'',
          alkalinity:'',
          ph:'',
          usertds:'',
      },
      install:{
        position:'',
        avoidlight:false,
        wall:'',
        method:'',
        space:'',
        pipe:'',
        drainage:'',
        pipematerials:'',
        wifi:false,
        power:false
      },
      syssettings:{//系统设置
          deviceid:'',//设备编号
          buydate:new Date(),//购买日期
          installdate:new Date(),//安装日期
          installer:'',//安装人员姓名
          timezone:`${curTZ}`,
          sdate:new Date(),
          stime:new Date(),
      },
      wifisettings:{
        ssid:'',
        password:'',
        dhcp:false,
        ip:'',
        gatewary:'',
        lan:'',
        dns:''
      },
      checklist:{
        washed:false,
        uptostandard:false,
        bypassclosed:false,
        noleakage:false,
        wificonnected:false,
        appset:false,
        pictures:[]
      },
    },

};

const device = createReducer({
    [tmp_ui_setuserdevice_request]:(state,payload)=>{
      const {inwatersettings:inwatersettingsnew} = payload;
      const inwatersettings = state.inwatersettings;

      inwatersettings.ph = inwatersettingsnew.ph;
      inwatersettings.conductivity = inwatersettingsnew.conductivity;
      inwatersettings.tds = inwatersettingsnew.tds;
      inwatersettings.hardness = inwatersettingsnew.hardness;
      inwatersettings.alkalinity = inwatersettingsnew.alkalinity;

      return { ...state, inwatersettings};
    },
    [wifi_getdata]: (state, payload) => {
        // let homedata = state.homedata;
        // let errordata = state.errordata;
        // let performancedata = state.performancedata;
        const {syssettings:syssettingsnew} = payload;
        const syssettings = state.syssettings;
        syssettings.quality = syssettingsnew.quality;
        syssettings.dormancy = syssettingsnew.dormancy === 0?false:true;
        syssettings.dormancystart = syssettingsnew.dormancystart;
        syssettings.dormancyend = syssettingsnew.dormancyend;

        // inwatersettings.ph = inwatersettingsnew.ph;
        // inwatersettings.conductivity = inwatersettingsnew.conductivity;
        // inwatersettings.tds = inwatersettingsnew.tds;
        // inwatersettings.hardness = inwatersettingsnew.hardness;
        // inwatersettings.alkalinity = inwatersettingsnew.alkalinity;

        return { ...state, syssettings };
    },
    [adddevice_result]: (state, payload) => {
        return { ...state, ...payload };
    },
    // [ui_setcurwifi]: (state, payload) => {
    //     const {wifissid,wifipassword} = payload;
    //     let wifisettings = state.wifisettings;
    //     wifisettings.ssid  = wifissid;
    //     wifisettings.password  = wifipassword;
    //     return { ...state,wifisettings};
    // },
    [getdevice_result]: (state, payload) => {
      const {_id,basicinfo:basicinfonew, usewater:usewaternew,install:installnew,
        syssettings:syssettingsnew,wifisettings:wifisettingsnew,
        checklist:checklistnew,devicelist:devicelistnew} = payload;
      let {basicinfo,usewater,install,syssettings,wifisettings,checklist,devicelist} = state;
      if(!!devicelistnew){
        devicelist = {...devicelistnew};
      }
      if(!!basicinfonew){
        basicinfo = {...basicinfonew};
      }
      if(!!usewaternew){
        usewater = {...usewaternew};
      }
      if(!!installnew){
        install = {...installnew};
      }
      if(!!syssettingsnew){
        syssettings = {...syssettingsnew};
      }
      if(!!wifisettingsnew){
        wifisettings = {...wifisettingsnew};
      }
      if(!!checklistnew){
        checklist = {...checklistnew};
      }
      return { ...state, basicinfo,usewater,install,syssettings,wifisettings,checklist,_id,devicelist };
    },
    [setuserdevice_result]: (state, payload) => {
        const {basicinfo:basicinfonew, usewater:usewaternew,install:installnew,
          syssettings:syssettingsnew,wifisettings:wifisettingsnew,
          checklist:checklistnew,devicelist:devicelistnew} = payload;
        let {basicinfo,usewater,install,syssettings,wifisettings,checklist,devicelist} = state;
        if(!!devicelistnew){
          devicelist = {...devicelistnew};
        }
        if(!!basicinfonew){
          basicinfo = {...basicinfonew};
        }
        if(!!usewaternew){
          usewater = {...usewaternew};
        }
        if(!!installnew){
          install = {...installnew};
        }
        if(!!syssettingsnew){
          syssettings = {...syssettingsnew};
        }
        if(!!wifisettingsnew){
          wifisettings = {...wifisettingsnew};
        }
        if(!!checklistnew){
          checklist = {...checklistnew};
        }
        return { ...state, basicinfo,usewater,install,syssettings,wifisettings,checklist ,devicelist};
    },
}, initial.device);

export default device;
