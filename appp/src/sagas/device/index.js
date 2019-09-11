import {select,takeLatest,put} from 'redux-saga/effects';
import {
  set_weui,
  ui_setuserdevice_request,
  setuserdevice_request,
  setuserdevice_result,
  getdevice_result,
  adddevice_request,
  setdevice_distributorid,
  importsurvey
} from '../../actions';
import lodashget from 'lodash.get';
import { intl } from '../../util/globalIntl';

export function* deviceflow(){//仅执行一次
  yield takeLatest(`${getdevice_result}`, function*(action) {
    try{
      yield put(set_weui({
        toast:{
        text:intl.formatMessage({id:'constsaga.device.getdevicesuccess'}),
        show: true,
        type:'success'
      }}));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${setuserdevice_result}`, function*(action) {
    try{
      yield put(set_weui({
        toast:{
        text:intl.formatMessage({id:'constsaga.device.setdevicesuccess'}),
        show: true,
        type:'success'
      }}));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${ui_setuserdevice_request}`, function*(action) {
    try{
      const {payload:{_id,data}} = action;
      if(_id === '' || !_id){
        const deviceid = lodashget(data,'syssettings.deviceid','');
        if(deviceid !== ''){
          const {installerid} = yield select((state)=>{
            const distributorid = state.userlogin.distributor._id;
            const installerid = state.userlogin._id;
            return {installerid,distributorid};
          });
          // data.distributorid = distributorid;
          data.installerid = installerid;
          yield put(adddevice_request({data}));
          return;
        }
        yield put(set_weui({
          toast:{
          text:intl.formatMessage({id:'constsaga.device.scanqrfirst'}),
          show: true,
          type:'warning'
        }}));
        return;
      }
      yield put(setuserdevice_request({_id,data}));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${setdevice_distributorid}`,function*(action){
    try{
      const {distributorid,checklist,_id} = yield select((state)=>{
        const distributorid = state.userlogin.distributor._id;
        const installerid = state.userlogin._id;
        const checklist = state.device.checklist;
        const _id = state.device._id;
        return {_id,checklist,distributorid};
      });

      // debugger;
      // {_id,data:{basicinfo:values}
      let data = {};
      // data.distributorid = distributorid;
      checklist.washed = true;
      checklist.uptostandard= true;
      checklist.bypassclosed= true;
      checklist.noleakage= true;
      checklist.wificonnected= true;
      checklist.appset= true;

      data.checklist = checklist;
      data.distributorid = distributorid;
      yield put(setuserdevice_request({_id,data}));
    }
    catch(e){
      console.log(e);
    }

  });
  // importsurvey
  yield takeLatest(`${importsurvey}`, function*(action) {
    try{
      const {installerid} = yield select((state)=>{
        const distributorid = state.userlogin.distributor._id;
        const installerid = state.userlogin._id;
        return {installerid,distributorid};
      });
      const _id = yield select((state)=>{
        // debugger;
        return state.device._id;
      });
      const {basicinfo:basicinfonew, usewater:usewaternew,install:installnew}= action.payload;
      // debugger;
      // {_id,data:{basicinfo:values}
      let data = {
        basicinfo:basicinfonew, 
        usewater:usewaternew,
        install:installnew
      };
      // data.distributorid = distributorid;
      data.installerid = installerid;
      yield put(setuserdevice_request({_id,data}));
    }
    catch(e){
      console.log(e);
    }
  });
}
