import {select,takeLatest,put} from 'redux-saga/effects';
import {
  set_weui,
  ui_setsurvey_request,
  ui_setuserdevice_request,
  savesurvey_request,
  setuserdevice_request,
  setuserdevice_result,
  getdevice_result,
  adddevice_request
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
          const {installerid,distributorid} = yield select((state)=>{
            const distributorid = state.userlogin.distributor._id;
            const installerid = state.userlogin._id;
            return {installerid,distributorid};
          });
          data.distributorid = distributorid;
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

  yield takeLatest(`${ui_setsurvey_request}`, function*(action) {
    try{
      const {payload:{userphonekey,data}} = action;
      yield put(savesurvey_request({userphonekey,data}));
    }
    catch(e){
      console.log(e);
    }
  });

  // ui_setsurvey_request
}
