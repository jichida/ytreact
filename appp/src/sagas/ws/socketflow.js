import {takeLatest,put,select} from 'redux-saga/effects';
import {
  notify_socket_connected,
  getsystemconfig_request,
  loginwithtoken_request,
  // querydevicegroup_request
} from '../../actions';
import config from '../../env/config';

console.log(config.appversion);
//获取地理位置信息，封装为promise
export function* socketflow(){//仅执行一次
   yield takeLatest(`${notify_socket_connected}`, function*(action) {
      let {payload:issocketconnected} = action;
      console.log(`notify_socket_connected==>${issocketconnected}`);
      if(issocketconnected){
        yield put(getsystemconfig_request({}));

        const isloginsuccess = yield select((state)=>{
          return state.userlogin.loginsuccess;
        })
        const token = localStorage.getItem(`yt_${config.softmode}_token`);
        console.log(`notify_socket_connected==>${token}`);
        if (!!token && isloginsuccess) {
          yield put(loginwithtoken_request({token}));
        }
      }
    });

}
