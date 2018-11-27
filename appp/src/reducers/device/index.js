import { createReducer } from 'redux-act';
import {
  adddevice_result,
  getdevice_result,
  setuserdevice_result
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    device: {
      _id:'',
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
          booster:'',
          bathrooms:'',
          shunt:'',
          tds:'',
          conductivity:'',
          hardness:'',
          alkalinity:'',
          ph:'',
          usertds:'',
      },
      install:{
        position:'',
        avoidlight:'',
        wall:'',
        method:'',
        space:'',
        pipe:'',
        drainage:'',
        pipematerials:'',
        wifi:'',
        power:''
      },
      syssettings:{//系统设置
          deviceid:'',//设备编号
          buydate:new Date(),//购买日期
          installdate:new Date(),//安装日期
          installer:'',//安装人员姓名
          timezone:'',
          sdate:'',
          stime:'',
          quality:'',
          //《-----
          dormancy:false,
          dormancystart:'',
          dormancyend:'',
          language:''
      },
      inwatersettings:{//进水设定
        tds:'',
        conductivity:'',
        hardness:'',
        alkalinity:'',
        ph:'',
        bucket:'',
      },
      wifisettings:{
        ssid:'',
        password:'',
        dhcp:'',
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
    [adddevice_result]: (state, payload) => {
        return { ...state, ...payload };
    },
    [getdevice_result]: (state, payload) => {
      const {_id,basicinfo:basicinfonew, usewater:usewaternew,install:installnew,
        syssettings:syssettingsnew,inwatersettings:inwatersettingsnew,wifisettings:wifisettingsnew,
        checklist:checklistnew} = payload;
      let {basicinfo,usewater,install,syssettings,inwatersettings,wifisettings,checklist} = state;
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
      if(!!inwatersettingsnew){
        inwatersettings = {...inwatersettingsnew};
      }
      if(!!wifisettingsnew){
        wifisettings = {...wifisettingsnew};
      }
      if(!!checklistnew){
        checklist = {...checklistnew};
      }
      return { ...state, basicinfo,usewater,install,syssettings,inwatersettings,wifisettings,checklist,_id };
    },
    [setuserdevice_result]: (state, payload) => {
        const {basicinfo:basicinfonew, usewater:usewaternew,install:installnew,
          syssettings:syssettingsnew,inwatersettings:inwatersettingsnew,wifisettings:wifisettingsnew,
          checklist:checklistnew} = payload;
        let {basicinfo,usewater,install,syssettings,inwatersettings,wifisettings,checklist} = state;
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
        if(!!inwatersettingsnew){
          inwatersettings = {...inwatersettingsnew};
        }
        if(!!wifisettingsnew){
          wifisettings = {...wifisettingsnew};
        }
        if(!!checklistnew){
          checklist = {...checklistnew};
        }
        return { ...state, basicinfo,usewater,install,syssettings,inwatersettings,wifisettings,checklist };
    },
}, initial.device);

export default device;
