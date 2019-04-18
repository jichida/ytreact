import {takeLatest,put} from 'redux-saga/effects';
import {
  pushdevicenotify,
  startdevicequery,
} from '../../actions';
import {getdevicedata_request,} from '../../actions';
import {getdevicehisdata_request,} from '../../actions';
// import {getdevicecmddata_request,getdevicecmddata_result} from '../../actions';
// import lodashget from 'lodash.get';

export function* devicedetailflow(){//仅执行一次
  yield takeLatest(`${startdevicequery}`, function*(action) {
    try{
      const deviceid = action.payload.deviceid;
      yield put(getdevicedata_request({deviceid}));
      yield put(getdevicehisdata_request({query:{deviceid,
        srvdata:{$exists:true}}}));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${pushdevicenotify}`, function*(action) {
    try{
      const deviceid = action.payload.deviceid;
      yield put(startdevicequery({deviceid}));
    }
    catch(e){
      console.log(e);
    }
  });


}
