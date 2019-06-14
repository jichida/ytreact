/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeLatest,call,take,race,fork,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssidlist,
  openwifi,
  setcurwifi,
  setwifistatuscallback,
  getwifistatus,
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
  wifi_sendcmd_result_ping,

  common_err,
  set_weui,
  wifi_setstatus,
  ui_wifisuccess_tonext,

  socket_setstatus,
  socket_recvdata,
  wifi_getdata,
  wifi_init,
  settcp_connected,
  app_sendcmd_request,

  push_devicecmddata,

  setlinkmode,
  setdatatarget
  // wifi_seteasylink,
} from '../../actions/index.js';
import { push } from 'connected-react-router';//https://github.com/reactjs/connected-react-router
import lodash_startsWith from 'lodash.startswith';
import lodash_endWith from 'lodash.endswith';
import lodash_replace from 'lodash.replace';
import lodash_split from 'lodash.split';
import lodash_set from 'lodash.set';
import lodash_get from 'lodash.get';
import config from '../../env/config';
import moment from 'moment';

let recvbuf = '';
// let linkmode = 'internetmode';//unknow,directmode,internetmode
let lastresponsemoment = moment();

setwifistatuscallback();
const parsedata = (stringbody,callbackfn)=>{
  stringbody = lodash_replace(stringbody, '$', '');
  stringbody = lodash_replace(stringbody, '%', '');
  const dataz = lodash_split(stringbody, ',');
  const mapdatafieldname = [
    'homedata.main_outwater_quality',//1、出水水质 :PPM
    'homedata.main_outwater_grade',//2、出水等级,
    'homedata.main_inwater_quality',//3、进水水质	进水水质 ：PPM
    // 'homedata.main_inwater_grade',//4、出水等级,
    'homedata.main_totalwatervol',//4、总产水量	用水总量 ：GAL
    'homedata.main_runtime',//5、运行时间	运行时间：天	1 word
    'homedata.main_outcwatervol',//6、浓水出水量	浓水出水量：GAL	2 word
    'homedata.filterelements_modlife_leftday',//7、电离子膜寿命
    'homedata.filterelements_prefilter1_leftday',//8、前置PP寿命	前置PP剩余天数： 天
    'homedata.filterelements_prefilter2_leftday',//9、前置2滤芯寿命
    'homedata.filterelements_prefilter3_leftday',//10、前置3滤芯寿命
    'homedata.filterelements_posfilter1_leftday',//11、后置活性炭寿命
    'homedata.filterelements_posfilter2_leftday',//12、后置2滤芯寿命
    'homedata.filterelements_posfilter3_leftday',//13、后置3滤芯寿命

    'performancedata.averagecurrent_600',//14、平均电流@600	600电导率时的电流:mA	1 word
    'homedata.filterelements_modlife_leftvol',//15、电离子膜寿命剩余流量

    'homedata.filterelements_prefilter1_leftvol',//16、前置PP剩余流量
    'homedata.filterelements_prefilter2_leftvol',//17、前置2滤芯寿命
    'homedata.filterelements_prefilter3_leftvol',//18、前置3滤芯寿命
    'homedata.filterelements_posfilter1_leftvol',//19、后置活性炭寿命
    'homedata.filterelements_posfilter2_leftvol',//20、后置2滤芯剩余流量
    'homedata.filterelements_posfilter3_leftvol',//21、后置3滤芯剩余流量

    'performancedata.averagecurrent_300',//22、300电导率时的电流:mA	1 word
    'performancedata.averagecut_600',//23、	平均cut@600	600电导率时的cut	1 word
    'performancedata.averagecut_300',//24、	平均cut@300	300电导率时的cut	1 word
    'performancedata.waterpurificationrate',//25、	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

    'errordata.error_partsfailure',//26、零件故障
    'errordata.error_pumpfailure',//27、泵故障	ERROR2:0 无故障 1有故障
    'errordata.error_programfailure',//28、	程序故障	ERROR3:0 无故障 1有故障
    'errordata.error_flowfailure',//29、	流量故障	ERROR4:0 无故障 1有故障
    'errordata.error_leakagefault',//30	漏水故障	ERROR5:0 无故障 1有故障
    'errordata.error_edicurrent',//31、	EDI电流	ERROR6:0 无故障 1有故障
    'errordata.error_modout',//32、	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
    'errordata.error_intakesensorfault',//33、	进水传感器故障	ERROR8 :0 无故障 1有故障
    'errordata.error_outflowsensorfault',//34、	出水传感器故障	ERROR9:0 无故障 1有故障
    'errordata.error_cwatersensorfault',//35、	浓水传感器故障	ERROR10 :0 无故障 1有故障
    'errordata.error_wastewatersensorfault',//36、	废水传感器故障	ERROR11:0 无故障 1有故障
    'errordata.error_outflowflowmeterfailure',//37、	出水流量计故障	ERROR12:0 无故障 1有故障
    'errordata.error_wastewaterflowmeterfailure',//38、	废水流量计故障	ERROR13:0 无故障 1有故障
    'errordata.error_clockfailure',//39、	时钟故障	ERROR14:0 无故障 1有故障
    'errordata.error_pressuresensor1failure',//40	压力1传感器故障	ERROR15:0 无故障 1有故障
    'errordata.error_pressuresensor2failure',//41	压力2传感器故障	ERROR16:0 无故障 1有故障
    'errordata.error_pressuresensor3failure',//42	压力3传感器故障	ERROR17:0 无故障 1有故障
    'errordata.error_pressuresensor4failure',//43	压力4传感器故障	ERROR18:0 无故障 1有故障

    'syssettings.quality',// 44	出水水质设置值	setlo  	1 word
    'syssettings.dormancy',// 45	休眠状态	目前设备的休眠状态	1 byte
    'syssettings.dormancystart',// 46	休眠开始时间	开始休眠 如：22	1 byte
    'syssettings.dormancyend',// 47	休眠结束时间	退出休眠 如：6	1 byte

    'wifi.singal',// 48	网络信号	主机目前与外网的连接强度	1 byte
    'inwatersettings.ph',// 49	进水PH	进水的PH值  byte	1 byte
    'inwatersettings.conductivity',// 50	进水电导率	进水电导率  word	1 word
    'inwatersettings.tds',// 51	进水TDS	进水TDS  word	1 word
    'inwatersettings.hardness',// 52	进水硬度	进水硬度  word	1 word
    'inwatersettings.alkalinity',// 53	进水碱度	进水碱度  word	1 word

    'filterlist.prev0',
    'filterlist.prev1',
    'filterlist.prev2',
    'filterlist.post0',
    'filterlist.post1',
    'filterlist.post2',
  ];

  //需要转成int类型
  const mapParseToInt = [
    'homedata.main_outwater_quality',//1、出水水质 :PPM
    'homedata.main_inwater_quality',//3、进水水质	进水水质 ：PPM
    'homedata.main_totalwatervol',//4、总产水量	用水总量 ：GAL
    'homedata.main_runtime',//5、运行时间	运行时间：天	1 word
    'homedata.main_outcwatervol',//6、浓水出水量	浓水出水量：GAL	2 word
    'homedata.filterelements_modlife_leftday',//7、电离子膜寿命
    'homedata.filterelements_prefilter1_leftday',//8、前置PP寿命	前置PP剩余天数： 天
    'homedata.filterelements_prefilter2_leftday',//9、前置2滤芯寿命
    'homedata.filterelements_prefilter3_leftday',//10、前置3滤芯寿命
    'homedata.filterelements_posfilter1_leftday',//11、后置活性炭寿命
    'homedata.filterelements_posfilter2_leftday',//12、后置2滤芯寿命
    'homedata.filterelements_posfilter3_leftday',//13、后置3滤芯寿命

    'performancedata.averagecurrent_600',//14、平均电流@600	600电导率时的电流:mA	1 word
    'homedata.filterelements_modlife_leftvol',//15、电离子膜寿命剩余流量

    'homedata.filterelements_prefilter1_leftvol',//16、前置PP剩余流量
    'homedata.filterelements_prefilter2_leftvol',//17、前置2滤芯寿命
    'homedata.filterelements_prefilter3_leftvol',//18、前置3滤芯寿命
    'homedata.filterelements_posfilter1_leftvol',//19、后置活性炭寿命
    'homedata.filterelements_posfilter2_leftvol',//20、后置2滤芯剩余流量
    'homedata.filterelements_posfilter3_leftvol',//21、后置3滤芯剩余流量

    'performancedata.averagecurrent_300',//22、300电导率时的电流:mA	1 word
    'performancedata.averagecut_600',//23、	平均cut@600	600电导率时的cut	1 word
    'performancedata.averagecut_300',//24、	平均cut@300	300电导率时的cut	1 word
    'performancedata.waterpurificationrate',//25、	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

    'errordata.error_partsfailure',//26、零件故障
    'errordata.error_pumpfailure',//27、泵故障	ERROR2:0 无故障 1有故障
    'errordata.error_programfailure',//28、	程序故障	ERROR3:0 无故障 1有故障
    'errordata.error_flowfailure',//29、	流量故障	ERROR4:0 无故障 1有故障
    'errordata.error_leakagefault',//30	漏水故障	ERROR5:0 无故障 1有故障
    'errordata.error_edicurrent',//31、	EDI电流	ERROR6:0 无故障 1有故障
    'errordata.error_modout',//32、	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
    'errordata.error_intakesensorfault',//33、	进水传感器故障	ERROR8 :0 无故障 1有故障
    'errordata.error_outflowsensorfault',//34、	出水传感器故障	ERROR9:0 无故障 1有故障
    'errordata.error_cwatersensorfault',//35、	浓水传感器故障	ERROR10 :0 无故障 1有故障
    'errordata.error_wastewatersensorfault',//36、	废水传感器故障	ERROR11:0 无故障 1有故障
    'errordata.error_outflowflowmeterfailure',//37、	出水流量计故障	ERROR12:0 无故障 1有故障
    'errordata.error_wastewaterflowmeterfailure',//38、	废水流量计故障	ERROR13:0 无故障 1有故障
    'errordata.error_clockfailure',//39、	时钟故障	ERROR14:0 无故障 1有故障
    'errordata.error_pressuresensor1failure',//40	压力1传感器故障	ERROR15:0 无故障 1有故障
    'errordata.error_pressuresensor2failure',//41	压力2传感器故障	ERROR16:0 无故障 1有故障
    'errordata.error_pressuresensor3failure',//42	压力3传感器故障	ERROR17:0 无故障 1有故障
    'errordata.error_pressuresensor4failure',//43	压力4传感器故障	ERROR18:0 无故障 1有故障

    // 'syssettings.quality',// 44	出水水质设置值	setlo  	1 word
    // 'syssettings.dormancy',// 45	休眠状态	目前设备的休眠状态	1 byte
    // 'syssettings.dormancystart',// 46	休眠开始时间	开始休眠 如：22	1 byte
    // 'syssettings.dormancyend',// 47	休眠结束时间	退出休眠 如：6	1 byte

    'wifi.singal',// 48	网络信号	主机目前与外网的连接强度	1 byte
    // 'inwatersettings.ph',// 49	进水PH	进水的PH值  byte	1 byte
    // 'inwatersettings.conductivity',// 50	进水电导率	进水电导率  word	1 word
    // 'inwatersettings.tds',// 51	进水TDS	进水TDS  word	1 word
    // 'inwatersettings.hardness',// 52	进水硬度	进水硬度  word	1 word
    // 'inwatersettings.alkalinity',// 53	进水碱度	进水碱度  word	1 word
    'filterlist.prev0',
    'filterlist.prev1',
    'filterlist.prev2',
    'filterlist.post0',
    'filterlist.post1',
    'filterlist.post2',
  ];

  if(dataz.length < mapParseToInt.length){
    callbackfn({cmd:'error',data:stringbody});
    return;//非法
  }
  console.log(`dataz个数:${dataz.length},mapdatafieldname个数:${mapdatafieldname.length}`);

  let result = {};
  for(let i = 0;i < mapdatafieldname.length; i++){
    let value = dataz.length >i ?dataz[i]:0;
    if(value === ''){
      value = 0;
    }
    lodash_set(result,mapdatafieldname[i],value);
  }
  console.log(result);
  for(let i = 0;i < mapParseToInt.length; i++){
    const value = lodash_get(result,mapParseToInt[i],'0');
    lodash_set(result,mapParseToInt[i],parseInt(value));
  }

  const value = lodash_get(result,'syssettings.dormancy','0');
  lodash_set(result,'syssettings.dormancy',value==='0'?false:true);

  let value_dormancystart = lodash_get(result,'syssettings.dormancystart','0');
  while(value_dormancystart.length < 2){
    value_dormancystart = '0'+value_dormancystart;
  }
  const c_value_dormancystart = moment(`2019-01-01 ${value_dormancystart}:00:00`);
  lodash_set(result,'syssettings.dormancystart',c_value_dormancystart.format('HH'));

  let value_dormancyend = lodash_get(result,'syssettings.dormancyend','0');
  while(value_dormancyend.length < 2){
    value_dormancyend = '0'+value_dormancyend;
  }
  const c_value_dormancyend = moment(`2019-01-01 ${value_dormancyend}:00:00`);
  lodash_set(result,'syssettings.dormancyend',c_value_dormancyend.format('HH'));

  let value_ph = lodash_get(result,'inwatersettings.ph','70');
  value_ph = parseInt(value_ph)/10;
  value_ph = value_ph.toFixed(1);
  lodash_set(result,'inwatersettings.ph',value_ph);
  // debugger;
  console.log(result);

  const main_outwater_grade = lodash_get(result,'homedata.main_outwater_grade');
  if(!!main_outwater_grade){
    //问题2  0:优  1:好  2:一般
    if(main_outwater_grade === '0'){
      lodash_set(result,'homedata.main_outwater_grade','优');
    }
    if(main_outwater_grade === '1'){
      lodash_set(result,'homedata.main_outwater_grade','好');
    }
    if(main_outwater_grade === '2'){
      lodash_set(result,'homedata.main_outwater_grade','一般');
    }
  }

  // const resultfilterlist = lodash_get(result,'filterlist');
  // console.log(`resultfilterlist is :${resultfilterlist}`)
  //
  // let prev0 = 1;
  // let prev1 = 1;
  // let prev2 = 1;
  // let post0 = 1;
  // let post1 = 1;
  // let post2 = 0;
  // // debugger;
  //
  // const filterlistfieldz = lodash_split(resultfilterlist,'.');
  // if(filterlistfieldz.length >= 6 ){
  //   prev0 = parseInt(filterlistfieldz[0]);
  //   prev1 = parseInt(filterlistfieldz[1]);
  //   prev2 = parseInt(filterlistfieldz[2]);
  //   post0 = parseInt(filterlistfieldz[3]);
  //   post1 = parseInt(filterlistfieldz[4]);
  //   post2 = parseInt(filterlistfieldz[5]);
  // }
  // lodash_set(result,'filterlist',{prev0,prev1,prev2,post0,post1,post2});
  //
  // debugger;
  callbackfn({cmd:'data',data:result});
};

const socket_recvdata_promise = (data)=>{
  // console.log(data);
  recvbuf += data;
  let objstring = '';
  const istart = recvbuf.indexOf('$',0);
  if(istart >= 0){
    const iend = recvbuf.indexOf('%',istart);
    if(iend >= 0){
      objstring = recvbuf.substr(istart,iend - istart + 1);
      recvbuf = recvbuf.substr(iend+1)
    }
  }
  else{
    recvbuf = '';
  }
  // debugger;
  return new Promise((resolve,reject) => {
        if(lodash_startsWith(objstring,'$')
          && lodash_endWith(objstring,'%')){
          if(!lodash_endWith(objstring,'ok%')){
            parsedata(objstring,(result)=>{
              lastresponsemoment = moment();
              resolve(result);
            });
          }
          else{
            lastresponsemoment = moment();
            resolve({cmd:'ok',data:objstring});
          }
        }
        else{
          reject('数据有问题');
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
    });
    resolve({});
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
        getwifistatus();
        // alert(`调用wifi获取状态函数`)
        yield call(delay, 1000);//wait for 1 seconds
        // yield put(wifi_open_reqeust({}));///0为打开未连接  -1  未打开  1  已连接 2 密码错误}
        const wifiStatus = yield select((state)=>{
          return state.wifi.wifiStatus;
        });
        // alert(`wifi状态:${wifiStatus}`)
        // if(wifiStatus === -1){
          //未打开情况下打开
        yield put(wifi_open_reqeust({}));
        // }
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
    yield takeLatest(`${push_devicecmddata}`,function*(action){
      const {payload} = action;
      try{
        //<----------
        console.log(payload);
        const payloaddata = payload.payload;
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

        if(payload.type === 'cmddata'){
          const result = payloaddata;
          if(result.cmd === 'data'){
            //get result.data
            yield put(wifi_getdata(result.data));
            yield put(wifi_sendcmd_result({data:'$dataok%'}));
          }
        }//if(payload.type === 'cmddata'){
        else if(payload.type === 'cmdecho'){
          //{"deviceid":"GHCA0488","type":"cmdecho","payload":"$sysprodtrigger 3ok%"}
          console.log(payloaddata);
          yield put(wifi_sendcmd_result({data:payloaddata}));
        }
      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${socket_recvdata}`,function*(action){
      const {payload} = action;
      try{
        console.log(payload);
        // yield put(set_weui({
        //   toast:{
        //   text:`socket接收到数据--->socket_recvdata--->${JSON.stringify(payload)}`,
        //   show: true,
        //   type:'success'
        // }}));
        if(payload.code == 0){
          const result = yield call(socket_recvdata_promise,payload.data);
          // let showdata = result.cmd === 'data'?`${result.data}`:`${result.data}`;
          // yield put(set_weui({
          //   toast:{
          //   text:`【接收到数据】:${showdata}`,
          //   show: true,
          //   type:'success'
          // }}));
          // debugger;
          if(result.cmd === 'data'){
            //get result.data
            yield put(wifi_getdata(result.data));
            yield call(socket_send_promise,'$dataok%');
            yield put(wifi_sendcmd_result({data:'$dataok%'}));
          }
          else if(result.cmd === 'ok'){
            if(result.data === 'ping'){
              yield put(wifi_sendcmd_result_ping({data:result.data}));
            }
            else{
              yield put(wifi_sendcmd_result({data:result.data}));
            }
          }
          //result is to data

        }
      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${ui_wifisuccess_tonext}`,function*(action){
      try{
        const {payload:{isinternet}} = action;

        const linkmode = isinternet?'internetmode':'directmode';
        yield put(setlinkmode(linkmode));

        if(isinternet){
          yield put(push('/home'));
          return;
        }
        //for test--->
        // yield put(socket_recvdata({code:0,data:`$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,%`}));
         // yield put(socket_recvdata({code:0,data:`GET /units/5be29eccc80908000a01c451/datapoints/post?d[a]=954&d[b]=6&d[c]=0&d[d]=0&d[e]=0&d[f]=0&d[g]=0&d[h]=0&d[i]=31&d[j]=122&d[k]=48&d[l]=0&d[m]=0&d[n]=0&d[o]=720&d[p]=0&d[q]=0&d[r]=0&d[s]=0&d[t]=0`}));
         // yield put(socket_recvdata({code:0,data:`$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,%`}));
        //开始连接socket,进入下一个页面
        yield call(socket_connnect_promise,{
          host:config.sockethost,
          port:config.socketport
        });

        // yield put(set_weui({
        //   toast:{
        //   text:`【${config.sockethost}:${config.socketport}】开始连接`,
        //   show: true,
        //   type:'success'
        // }}));

        const raceresult = yield race({
           socketestatusresult: take(`${socket_setstatus}`),
           timeout: call(delay, 20000)
        });

        if(!!raceresult.timeout){
          yield put(set_weui({
            toast:{
            text:`连接【${config.sockethost}:${config.socketport}】超时,请重试`,
            show: true,
            type:'warning'
          }}));
        }
        else{
          //data { socketStatus:  -1 0 1 2 }
          if(lodash_get(raceresult,'socketestatusresult.payload.data.socketStatus',0) === 1){
        yield put(push('/devices'));
          }
          else{
            yield put(set_weui({
              toast:{
              text:`连接【${config.sockethost}:${config.socketport}】失败,${JSON.stringify(raceresult.socketestatusresult.payload)}`,
              show: true,
              type:'warning'
            }}));
          }
        }
      }
      catch(e){
        console.log(e);
      }

    });

    // yield takeLatest(`${wifi_setstatus}`, function*(action) {
    //   try{
    //     const {payload} = action;
    //     const {code,wifiStatus} = payload;
    //     let text = '未知状态';
    //     let type = 'warning';
    //     if(code === 0){
    //       if(wifiStatus === -1){
    //         //为打开
    //         text = 'Wi-Fi未打开';
    //       }
    //       if(wifiStatus === 0){
    //         //为打开
    //         text = 'Wi-Fi未打开';
    //       }
    //       else if(wifiStatus === 1){
    //         type = 'success';
    //         text = 'Wi-Fi已连接';
    //       }
    //       else if(wifiStatus === 2){
    //         text = 'Wi-Fi 密码错误';
    //       }
    //     }
    //     console.log(text);
    //     // yield put(set_weui({
    //     //   toast:{
    //     //   text,//`${JSON.stringify(payload)}`,
    //     //   show: true,
    //     //   type
    //     // }}));
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // });
    yield takeLatest(`${wifi_open_reqeust}`, function*(action) {
      try{
        // const {payload} = action;
        const result = yield call(openwifi_promise);
        yield put(wifi_open_result(result));
        yield put(set_weui({
          toast:{
          text:`打开wifi-->${JSON.stringify(result)}`,
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
            console.log(payload);
            if(config.softmode === 'app'){
                yield put(app_sendcmd_request(payload));
            }
            else{//tcpconnected
              //专业版
              const tcpconnected = yield select((state)=>{
                return (process.env.NODE_ENV === 'production')?state.app.tcpconnected:true;
              });
              if(!tcpconnected){
                yield put(set_weui({
                  toast:{
                    text:`连接已断开,请等待重连`,
                    show: true,
                    type:'offline'
                }}));
                return;
              }

              yield call(socket_send_promise,payload.cmd);
            }
            yield put(set_weui({
              toast:{
              text:`【${payload.cmdstring}】开始命令发送`,
              show: true,
              type:'success'
            }}));
            const delaytime = 5000;//
            const raceresult = yield race({
               wifiresult: take(`${wifi_sendcmd_result}`),
               timeout: call(delay, delaytime)
            });

            const { wifiresult,timeout } = raceresult;
            let istimeout = !!timeout;
            if(!istimeout){
              const recvbuf = `${payload.cmd}`;
              let objstring = '';
              let expectstring = '';
              const istart = recvbuf.indexOf('$',0);
              if(istart >= 0){
                const iend = recvbuf.indexOf('%',istart);
                if(iend >= 0){
                  objstring = recvbuf.substr(istart,iend - istart);
                  expectstring = `${objstring}ok%`;
                }
              }
              if(expectstring !== `${wifiresult.payload.data}`  && `${payload.cmd}` !== '$data%'){
                istimeout = true;//
              }
            }
            if(istimeout){
              //等3秒超时，重发一次
              if(config.softmode === 'app'){
                  yield put(app_sendcmd_request(payload));
              }
              else{
                yield call(socket_send_promise,payload.cmd);
              }
              const raceresult = yield race({
                 wifiresult: take(`${wifi_sendcmd_result}`),
                 timeout: call(delay, delaytime)
              });
              const { wifiresult,timeout } = raceresult;
              istimeout = !!timeout;
              if(!istimeout){
                const recvbuf = `${payload.cmd}`;
                let objstring = '';
                let expectstring = '';
                const istart = recvbuf.indexOf('$',0);
                if(istart >= 0){
                  const iend = recvbuf.indexOf('%',istart);
                  if(iend >= 0){
                    objstring = recvbuf.substr(istart,iend - istart);
                    expectstring = `${objstring}ok%`;
                  }
                }
                if(expectstring !== `${wifiresult.payload.data}` && `${payload.cmd}` !== '$data%'){
                  istimeout = true;//
                }
              }
              if(istimeout){
                yield put(set_weui({
                  toast:{
                      text:`发送给硬件【${payload.cmdstring}】命令失败`,
                      show: true,
                      type:'offline'
                }}));
              }
              else{
                if(`${payload.cmd}` !== '$data%'){
                  if(!!payload.target){
                    yield put(setdatatarget(payload.target));
                  }
                  yield put(set_weui({
                    toast:{
                    text:`发送给硬件【${payload.cmdstring}】命令成功`,
                    show: true,
                    type:'success'
                  }}));
                }
              }
            }
            else{
              if(`${payload.cmd}` !== '$data%'){
                if(!!payload.target){
                  yield put(setdatatarget(payload.target));
                }
                yield put(set_weui({
                  toast:{
                  text:`发送给硬件【${payload.cmdstring}】命令成功`,
                  show: true,
                  type:'success'
                }}));
              }
            }
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${wifi_getssidlist_request}`, function*(action) {
      try{
        let {payload:result} = action;
        const delaytime = 15000;
        yield put(set_weui({
          toast:{
            type:'loading',
            text:'wifi列表获取中,请稍后...',
            value:'show',
          }
        }))
        console.log(`wifi_getssidlist_request:${JSON.stringify(result)}`);
        const raceresult = yield race({
           wifiresult: call(getwifilist_promise),
           timeout: call(delay, delaytime)
        });
        yield put(set_weui({
          toast:{
            type:'loading',
            value:'hide',
          }
        }))
        // yield put(set_weui({
        //   toast:{
        //   text:`${JSON.stringify(raceresult)}`,
        //   show: true,
        //   type:'success'
        // }}));
        const { wifiresult, timeout } = raceresult;
        if(!!timeout){
          yield put(common_err({type:'wifi_getssidlist',errmsg:`获取wifi信息超时,${delaytime}毫秒`}));
        }
        else{
            if(wifiresult.code == 0){
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
        yield call(setwifi,result);
        const { wifiresult, timeout } = yield race({
           wifiresult: take(`${wifi_setstatus}`),
           timeout: call(delay, 20000)
        });
        if(!!timeout){
          yield put(common_err({type:'wifi_setcurwifi',errmsg:`设置wifi超时,请重试`}));
        }
        else{
          yield put(wifi_setcurwifi_result(wifiresult.payload));
        //跳转到下一个页面
        yield put(push('/wifisucess'));
          // yield put(push('/wifisetting'));
          yield call(socket_connnect_promise,{});
        }

      }
      catch(e){
        console.log(e);
      }
    });

    if(config.softmode === 'appp'){
      //仅适用 专业版
      yield fork(function* (){
        const delaytime = 10000;
        yield call(delay,2000);
        while(true){
            const diffmin = moment().diff(moment(lastresponsemoment),'seconds');
            if(diffmin < 10){
              //10秒钟内有回复,则不要重连了
            console.log(`--->10s内有回应,不用重连了`);
            yield put(settcp_connected(true));
              yield call(delay,delaytime);
              continue;
            };

            const linkmode = yield select((state)=>{
              return state.app.linkmode;
            });
            if(linkmode === 'directmode'){
              const wifidirectmodesocketstatus = yield select((state)=>{
                return state.app.wifidirectmodesocketstatus;
              });
              if(wifidirectmodesocketstatus === 1 || wifidirectmodesocketstatus === 0){
                yield put(settcp_connected(true));
                //尝试发送一次命令
                let trycount = 0;
                while(trycount < 5){
                  console.log(`--->尝试第${trycount+1}次发送一次数据`)
                  yield call(socket_send_promise,`$ping%`);
                  const delaytime = 5000;//
                  const raceresult = yield race({
                     wifiresult: take(`${wifi_sendcmd_result_ping}`),
                     timeout: call(delay, delaytime)
                  });
                  if(!!raceresult.timeout){
                    //超时了!
                    trycount++;
                    continue;
                  }
                  yield put(settcp_connected(true));
                  console.log(`--->数据有返回,退出`)
                  break;
                }
                if(trycount === 5){
                  console.log(`--->重试到底了,开始重连`);
                  yield put(settcp_connected(false));
                  //开始连接socket,进入下一个页面
                  yield call(socket_connnect_promise,{
                    host:config.sockethost,
                    port:config.socketport
                  });
                }
              }
              else{
                yield put(settcp_connected(false));
                yield call(socket_connnect_promise,{
                  host:config.sockethost,
                  port:config.socketport
                });
              }
            }
            else{
              yield put(settcp_connected(false));
            }
            yield call(delay,delaytime);
        }
      })
    }


    //设置配网（输入：wifi用户名，密码）
    // yield takeLatest(`${wifi_seteasylink}`, function*(action) {
    //   try{
    //     let {payload:result} = action;
    //
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // });


    /*
    定时
    当前是直连模式
    发送数据,等待回应。如果超时,断开tcp重连。

    //检查是否连接到服务器，如果是，则将mode变为inernetmode
    */
}
