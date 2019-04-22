import {takeLatest,put} from 'redux-saga/effects';
import {
  pushdevicenotify,
  startdevicequery,
} from '../../actions';
import {getdevicedata_request,getdevicecmddata_request} from '../../actions';
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
      yield put(getdevicecmddata_request({deviceid}));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${pushdevicenotify}`, function*(action) {
    try{
      const deviceid = action.payload.deviceid;
      /*
      注意:
      // 命令关系:
      // 一、cmdsentecho pc端发送命令,通知发送成功
      // 1、转发给pc端
      例:
      { deviceid: 'GHCA0488',
        type: 'cmdsentecho',
        payload: '5cbd70c62690edbb94c8f3c4' }

      // 二、cmddata 接收到硬件的data数据（app)/pc
      // 1、转发给app/pc
      例:
      { deviceid: 'GHCA0488',
          type: 'cmddata',
          payload:
          { cmd: 'data',
            data:
            { homedata:.....

      // 三、cmdecho 接收到硬件的命令回复 $xxxok%
      // 1、转发给app

      // 四、cmdhttpdata 接受到硬件的http数据（两种）
      //1、data.cmd' === 'echo' 转发给pc端
      例:
        { deviceid: 'GHCA0488',
          type: 'cmdhttpdata',
          payload: { cmd: 'echo',

      //2、data.cmd' === 'data' 转发给pc端
      例:{ deviceid: 'GHCA0488',
       srv:mqtt   type: 'cmdhttpdata',
       srv:mqtt   payload: { cmd: 'data', data: { srvdata: [Object] } } } +0ms

      */
      yield put(startdevicequery({deviceid}));
    }
    catch(e){
      console.log(e);
    }
  });


}
