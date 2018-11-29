/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeLatest,call,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssid,
  senddata
} from '../../env/device.js';
import {

  getcurwifi_request,
  getcurwifi_result,
  // getcurwifi_devicelist_request,
  // getcurwifi_devicelist_result,
  // md_createdevice_result,
  // createdevice_result,
  // md_updatedevice_result,
  // updatedevice_result,

  set_weui
} from '../../actions';
import _ from 'lodash';
const getrandom=(min,max)=>{
  return parseInt(Math.random()*(max-min+1)+min,10);
}

function getcurwifi() {
    return new Promise(resolve => {
      getssid((result)=>{
        resolve(result);
      });
    });
}

function sendwifidata(values){
  return new Promise(resolve => {
    senddata(values,(retdata)=>{
      let retjson = retdata;
      let datasz = [];
      _.map(retjson.data,(data)=>{
        data.name = `SCICLEAN${getrandom(0,10)}${getrandom(0,10)}${getrandom(0,10)}${getrandom(0,10)}`;
        datasz.push(
          data
        );
      });
      retjson.data = datasz;
      resolve(retjson);
    });
  });
}

export function* wififlow() {
    console.log(`wififlow======>`);

    // yield takeLatest(`${md_createdevice_result}`, function*(action) {
    //       let {payload:result} = action;
    //       console.log(`md_createdevice_result:${JSON.stringify(result)}`);
    //       yield put(createdevice_result(result));
    //       const {newdevice} = result;
    //       yield put(replace(`/addnewdevice3/${newdevice._id}`));
    // });
    //
    // yield takeLatest(`${md_updatedevice_result}`, function*(action) {
    //       let {payload:result} = action;
    //       console.log(`md_updatedevice_result:${JSON.stringify(result)}`);
    //       yield put(updatedevice_result(result));
    //       yield put(replace(`/devicelist`));
    // });

    yield takeLatest(`${getcurwifi_request}`, function*(action) {
          let {payload:result} = action;
          console.log(`getcurwifi_request:${JSON.stringify(result)}`);
          const { wifiresult, timeout } = yield race({
             wifiresult: call(getcurwifi),
             timeout: call(delay, 2000)
          });
          if(!!timeout){
            yield put(set_weui({type:'getcurwifi',errmsg:`获取wifi信息超时`}));
          }
          else{
            yield put(getcurwifi_result(wifiresult));
          }

    });

    // yield takeLatest(`${getcurwifi_devicelist_request}`, function*(action) {
    //       let {payload:result} = action;
    //       console.log(`getcurwifi_devicelist_request:${JSON.stringify(result)}`);
    //       yield put(set_weui(
    //         {
    //           loading:{
    //             show:true,
    //           }
    //         }
    //       ));
    //       const { wifiresult, timeout } = yield race({
    //          wifiresult:  call(sendwifidata,result),
    //          timeout:  call(delay, 40000)
    //       });
    //       yield put(set_weui(
    //         {
    //           loading:{
    //             show:false,
    //           }
    //         }
    //       ));
    //       if(!!timeout){
    //         yield put(set_weui(
    //           {
    //             toast:{
    //               show:true,
    //               text:`获取当前wifi设备超时`,
    //               type:'warning'
    //             }
    //           }
    //         ));
    //       }
    //       else{
    //         if(wifiresult.code === '0'){
    //           yield put(getcurwifi_devicelist_result(wifiresult.data));
    //           yield put(push('/addnewdevice2'));
    //
    //         }
    //         else{
    //           //弹框,message
    //           yield put(set_weui(
    //             {
    //               toast:{
    //                 show:true,
    //                 text:wifiresult.message,
    //                 type:'warning'
    //               }
    //             }
    //           ));
    //         }
    //       }
    //
    // });
}
