/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeLatest,call,take,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssidlist,
  openwifi,
  setcurwifi,
  setwifistatuscallback,
  socket_connnect,
  socket_send,
} from '../../env/device.js';
import {
  wifi_open_reqeust,
  wifi_open_result,

  wifi_getssidlist_request,
  wifi_getssidlist_result,

  wifi_setcurwifi_request,
  wifi_setcurwifi_result,

  wifi_sendcmd_request,
  wifi_sendcmd_result,

  common_err,
  set_weui,
  wifi_setstatus,
  ui_wifisuccess_tonext,

  socket_setstatus,
  socket_recvdata,
  wifi_getdata,
  wifi_init,

} from '../../actions/index.js';
import { push } from 'connected-react-router';//https://github.com/reactjs/connected-react-router
import lodash_startsWith from 'lodash.startswith';
import lodash_endWith from 'lodash.endswith';
import lodash_replace from 'lodash.replace';
import lodash_split from 'lodash.split';
import lodash_set from 'lodash.set';
import config from '../../env/config';
let recvbuf = '';
setwifistatuscallback();
const parsedata = (stringbody,callbackfn)=>{
  stringbody = lodash_replace(stringbody, '$', '');
  stringbody = lodash_replace(stringbody, '%', '');
  const dataz = lodash_split(stringbody, ',');
  const mapdatafieldname = [
    'homedata.main_outwater_quality',
    'homedata.main_outwater_grade',//出水等级,
    'homedata.main_inwater_quality',//出水水质,
    'homedata.main_inwater_grade',//出水等级,
    'homedata.main_totalwatervol',//总产水量
    'homedata.main_runtime',//总产水量
    'homedata.main_outcwatervol',//浓水出水量
    'homedata.filterelements_modlife_leftvol',//电离子膜寿命剩余流量
    'homedata.filterelements_prefilter1_leftvol',//前置PP寿命
    'homedata.filterelements_prefilter2_leftvol',//前置2滤芯寿命
    'homedata.filterelements_prefilter3_leftvol',//前置3滤芯寿命
    'homedata.filterelements_posfilter1_leftvol',//后置活性炭寿命
    'homedata.filterelements_posfilter2_leftvol',//电离子膜寿命
    'homedata.filterelements_posfilter3_leftvol',//电离子膜寿命
    'homedata.filterelements_modlife_leftday',//电离子膜寿命
    'homedata.filterelements_prefilter1_leftday',//电离子膜寿命
    'homedata.filterelements_prefilter2_leftday',//电离子膜寿命
    'homedata.filterelements_prefilter3_leftday',//电离子膜寿命
    'homedata.filterelements_posfilter1_leftday',//电离子膜寿命
    'homedata.filterelements_posfilter2_leftday',//电离子膜寿命
    'homedata.filterelements_posfilter3_leftday',//电离子膜寿命
    'homedata.filterelements',//滤芯的顺序
    'performancedata.averagecurrent_600',//平均电流@600	600电导率时的电流:mA	1 word
    'performancedata.averagecurrent_300',//300电导率时的电流:mA	1 word
    'performancedata.averagecut_600',//16	平均cut@600	600电导率时的cut	1 word
    'performancedata.averagecut_300',// 17	平均cut@300	300电导率时的cut	1 word
    'performancedata.waterpurificationrate',//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
    'errordata.error_partsfailure',//零件故障
    'errordata.error_pumpfailure',//20	泵故障	ERROR2:0 无故障 1有故障
    'errordata.error_programfailure',//21	程序故障	ERROR3:0 无故障 1有故障
    'errordata.error_flowfailure',//22	流量故障	ERROR4:0 无故障 1有故障
    'errordata.error_leakagefault',//23	漏水故障	ERROR5:0 无故障 1有故障
    'errordata.error_edicurrent',//24	EDI电流	ERROR6:0 无故障 1有故障
    'errordata.error_modout',//25	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
    'errordata.error_intakesensorfault',//26	进水传感器故障	ERROR8 :0 无故障 1有故障
    'errordata.error_outflowsensorfault',//27	出水传感器故障	ERROR9:0 无故障 1有故障
    'errordata.error_cwatersensorfault',//28	浓水传感器故障	ERROR10 :0 无故障 1有故障
    'errordata.error_wastewatersensorfault',//29	废水传感器故障	ERROR11:0 无故障 1有故障
    'errordata.error_outflowflowmeterfailure',//30	出水流量计故障	ERROR12:0 无故障 1有故障
    'errordata.error_wastewaterflowmeterfailure',//31	废水流量计故障	ERROR13:0 无故障 1有故障
    'errordata.error_clockfailure',//32	时钟故障	ERROR14:0 无故障 1有故障
    'errordata.error_pressuresensor1failure',//33	压力1传感器故障	ERROR15:0 无故障 1有故障
    'errordata.error_pressuresensor2failure',//34	压力2传感器故障	ERROR16:0 无故障 1有故障
    'errordata.error_pressuresensor3failure',//35	压力3传感器故障	ERROR17:0 无故障 1有故障
    'errordata.error_pressuresensor4failure',//36	压力4传感器故障	ERROR18:0 无故障 1有故障
  ];
  let result = {};
  for(let i = 0;i < mapdatafieldname.length; i++){
    const value = dataz.length >i ?dataz[i]:0;
    lodash_set(result,mapdatafieldname[i],value);
  }
  callbackfn(result);
};

const socket_recvdata_promise = (data)=>{
  recvbuf += data;
  return new Promise(resolve => {
      if(lodash_startsWith(recvbuf,'$')){
        if(lodash_endWith(recvbuf,'%')){
          if(recvbuf !== '$ok%'){
            parsedata(recvbuf,(result)=>{
              resolve({cmd:'data',data:result});
              // resolve(result);
              // socket_send(`$ok%`,()=>{
              //
              // });
            });
          }
          else{
            resolve({cmd:'ok',data:recvbuf});
          }
          recvbuf = '';
        }
      }
  });
}

const socket_send_promise = (data)=>{
  return new Promise(resolve => {
      socket_send({'sendMessage':data},()=>{

      });
      resolve({});
  });
}
// socket_setrecvcallback(()=>{
//   if(lodash_startsWith(recvbuf,'$')){
//     if(lodash_endWith(recvbuf,'%')){
//       if(recvbuf !== '$ok%'){
//         parsedata(recvbuf,(result)=>{
//           socket_send(`$ok%`,()=>{
//
//           });
//         });
//       }
//       recvbuf = '';
//     }
//   }
// });

function getwifilist_promise() {
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

function openwifi_promise(){
  return new Promise(resolve => {
    openwifi((retdata)=>{
      resolve(retdata);
    });
  });
}

function socket_connnect_promise(values){
  return new Promise(resolve => {
    socket_connnect(values,(retdata)=>{

    });
    resolve({});
  });
}

export function* wififlow() {
    console.log(`wififlow======>`);



    yield takeLatest(`${wifi_init}`,function*(action){
      //连接&发送状态回调
      // const {payload} = action;
      try{
        setwifistatuscallback();
        yield call(delay, 100);
        yield put(wifi_open_reqeust({}));
      }
      catch(e){
        console.log(e);
      }
    });

    // yield takeLatest(`${socket_setstatus}`,function*(action){
    //   //连接&发送状态回调
    //   const {payload} = action;
    //   try{
    //     // yield put(set_weui({
    //     //   toast:{
    //     //   text:`socket连接&发送状态回调-->socket_setstatus--->${JSON.stringify(payload)}`,
    //     //   show: true,
    //     //   type:'success'
    //     // }}));
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // });

    yield takeLatest(`${socket_recvdata}`,function*(action){
      const {payload} = action;
      try{
        // yield put(set_weui({
        //   toast:{
        //   text:`socket接收到数据--->socket_recvdata--->${JSON.stringify(payload)}`,
        //   show: true,
        //   type:'success'
        // }}));
        if(payload.code === 0){
          const result = yield call(socket_recvdata_promise,payload.data);
          // debugger;
          if(result.cmd === 'data'){
            //get result.data
            yield put(wifi_getdata(result.data));
          }
          else if(result.cmd === 'ok'){
            yield put(wifi_sendcmd_result({}));
          }
          //result is to data
          yield call(socket_send_promise,'$ok%');
        }
      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${ui_wifisuccess_tonext}`,function*(action){
      try{
        //for test--->
        // yield put(socket_recvdata({code:0,data:`$504,0,503,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,300,0,7,22,0,7,1007,503,20,%`}));

        //开始连接socket,进入下一个页面
        yield call(socket_connnect_promise,{
          host:config.sockethost,
          port:config.socketport
        });
        yield put(push('/devices'));
        console.log('to next page')
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${wifi_setstatus}`, function*(action) {
      try{
        const {payload} = action;
        const {code,wifiStatus} = payload;
        let text = '未知状态';
        let type = 'warning';
        if(code === 0){
          if(wifiStatus === -1){
            //为打开
            text = 'Wi-Fi未打开';
          }
          if(wifiStatus === 0){
            //为打开
            text = 'Wi-Fi未打开';
          }
          else if(wifiStatus === 1){
            type = 'success';
            text = 'Wi-Fi已连接';
          }
          else if(wifiStatus === 2){
            text = 'Wi-Fi 密码错误';
          }
        }
        yield put(set_weui({
          toast:{
          text:`${JSON.stringify(payload)}`,
          show: true,
          type
        }}));
      }
      catch(e){
        console.log(e);
      }
    });
    yield takeLatest(`${wifi_open_reqeust}`, function*(action) {
      try{
        // const {payload} = action;
        const result = yield call(openwifi_promise);
        yield put(wifi_open_result(result));
        yield put(set_weui({
          toast:{
          text:`打开wifi成功${JSON.stringify(result)}`,
          show: true,
          type:'success'
        }}));
      }
      catch(e){
        console.log(e);
      }
    });
    yield takeLatest(`${wifi_sendcmd_request}`, function*(action) {
      try{
        const {payload} = action;
        yield call(socket_send_promise,payload.cmd);

        const delaytime = 5000;
        const raceresult = yield race({
           wifiresult: take(`${wifi_sendcmd_result}`),
           timeout: call(delay, delaytime)
        });
        const { wifiresult, timeout } = raceresult;
        if(!!timeout){
          yield put(set_weui({
            toast:{
            text:`发送给硬件命令返回超时,${delaytime}毫秒`,
            show: true,
            type:'success'
          }}));
        }
        else{
          yield put(set_weui({
            toast:{
            text:`发送给硬件命令成功`,
            show: true,
            type:'success'
          }}));
        }
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${wifi_getssidlist_request}`, function*(action) {
      try{
        let {payload:result} = action;
        const delaytime = 5000;
        console.log(`wifi_getssidlist_request:${JSON.stringify(result)}`);
        const raceresult = yield race({
           wifiresult: call(getwifilist_promise),
           timeout: call(delay, delaytime)
        });
        yield put(set_weui({
          toast:{
          text:`${JSON.stringify(raceresult)}`,
          show: true,
          type:'success'
        }}));
        const { wifiresult, timeout } = raceresult;
        if(!!timeout){
          yield put(common_err({type:'wifi_getssidlist',errmsg:`获取wifi信息超时,${delaytime}毫秒`}));
        }
        else{
          if(wifiresult.code === 0){
            console.log(wifiresult.data);
            yield put(wifi_getssidlist_result(wifiresult.data));
          }
        }


      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${wifi_setcurwifi_request}`, function*(action) {
      try{
        let {payload:result} = action;
        console.log(`wifi_setcurwifi_request:${JSON.stringify(result)}`);
        const { wifiresult, timeout } = yield race({
           wifiresult: call(setwifi,result),
           timeout: call(delay, 2000)
        });
        if(!!timeout){
          yield put(common_err({type:'wifi_setcurwifi',errmsg:`设置wifi超时`}));
        }
        else{
          yield put(wifi_setcurwifi_result(wifiresult));
        }
        //跳转到下一个页面
        yield put(push('/wifisucess'));
        yield call(socket_connnect_promise,{})
      }
      catch(e){
        console.log(e);
      }
    });
}
