/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeLatest,call,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssidlist,
  setcurwifi
} from '../../env/device.js';
import {
  wifi_getssidlist_request,
  wifi_getssidlist_result,

  wifi_setcurwifi_request,
  wifi_setcurwifi_result,

  set_weui
} from '../../actions/index.js';
import { push } from 'connected-react-router';//https://github.com/reactjs/connected-react-router

function getwifilist() {
    return new Promise(resolve => {
      getssidlist((result)=>{
        resolve(result);
      });
    });
}

function setwifi(values){
  return new Promise(resolve => {
    setcurwifi(values,(retdata)=>{
      resolve({});
    });
  });
}

export function* wififlow() {
    console.log(`wififlow======>`);

    yield takeLatest(`${wifi_getssidlist_request}`, function*(action) {
      try{
        let {payload:result} = action;
        console.log(`getcurwifi_request:${JSON.stringify(result)}`);
        const { wifiresult, timeout } = yield race({
           wifiresult: call(getwifilist),
           timeout: call(delay, 2000)
        });
        if(!!timeout){
          yield put(set_weui({type:'getcurwifi',errmsg:`获取wifi信息超时`}));
        }
        else{
          yield put(wifi_getssidlist_result(wifiresult));
        }

      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${wifi_setcurwifi_request}`, function*(action) {
      try{
        let {payload:result} = action;
        console.log(`getcurwifi_request:${JSON.stringify(result)}`);
        const { wifiresult, timeout } = yield race({
           wifiresult: call(setwifi),
           timeout: call(delay, 2000)
        });
        if(!!timeout){
          yield put(set_weui({type:'wifi_setcurwifi',errmsg:`设置wifi超时`}));
        }
        else{
          yield put(wifi_setcurwifi_result(wifiresult));
          //跳转到下一个页面
          yield put(push('/wifisucess'));
        }

      }
      catch(e){
        console.log(e);
      }
    });
}
