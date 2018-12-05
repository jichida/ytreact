import {takeLatest,put} from 'redux-saga/effects';
import {set_weui,ui_setuserdevice_request,setuserdevice_request,adddevice_request} from '../../actions';
import lodashget from 'lodash.get';

export function* deviceflow(){//仅执行一次
  yield takeLatest(`${ui_setuserdevice_request}`, function*(action) {
    try{
      const {payload:{_id,data}} = action;
      if(_id === '' || !_id){
        const deviceid = lodashget(data,'syssettings.deviceid','');
        if(deviceid !== ''){
          yield put(adddevice_request({data}));
          return;
        }
        yield put(set_weui({
          toast:{
          text:'请先系统设置中扫描设备二维码',
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
}
