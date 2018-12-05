/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeLatest,call,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssidlist,
  setcurwifi,
  setsocketrecvcallback,
  setsocketsend
} from '../../env/device.js';
import {
  wifi_getssidlist_request,
  wifi_getssidlist_result,

  wifi_setcurwifi_request,
  wifi_setcurwifi_result,

  wifi_sendcmd_request,

  common_err,
  set_weui,

  wifi_recvcmd,
  wifi_getdata
} from '../../actions/index.js';
import { push } from 'connected-react-router';//https://github.com/reactjs/connected-react-router
import lodash_startsWith from 'lodash.startswith';
import lodash_endWith from 'lodash.endswith';
import lodash_replace from 'lodash.replace';
import lodash_split from 'lodash.split';
import lodash_set from 'lodash.set';
let recvbuf = '';

const parsedata = (stringbody,callbackfn)=>{
  stringbody = lodash_replace(stringbody, '$', '');
  stringbody = lodash_replace(stringbody, '%', '');
  const dataz = lodash_split(stringbody, ',');
  const mapdatafieldname = [
    'main_outwater_quality',
    'main_outwater_grade',//出水等级,
    'main_inwater_quality',//出水水质,
    'main_inwater_grade',//出水等级,
    'main_totalwatervol',//总产水量
    'main_runtime',//总产水量
    'main_outcwatervol',//浓水出水量
    'filterelements_modlife_leftvol',//电离子膜寿命剩余流量
    'filterelements_prefilter1_leftvol',//前置PP寿命
    'filterelements_prefilter2_leftvol',//前置2滤芯寿命
    'filterelements_prefilter3_leftvol',//前置3滤芯寿命
    'filterelements_posfilter1_leftvol',//后置活性炭寿命
    'filterelements_posfilter2_leftvol',//电离子膜寿命
    'filterelements_posfilter3_leftvol',//电离子膜寿命
    'filterelements_modlife_leftday',//电离子膜寿命
    'filterelements_prefilter1_leftday',//电离子膜寿命
    'filterelements_prefilter2_leftday',//电离子膜寿命
    'filterelements_prefilter3_leftday',//电离子膜寿命
    'filterelements_posfilter1_leftday',//电离子膜寿命
    'filterelements_posfilter2_leftday',//电离子膜寿命
    'filterelements_posfilter3_leftday',//电离子膜寿命
    'filterelements',//滤芯的顺序
    'averagecurrent_600',//平均电流@600	600电导率时的电流:mA	1 word
    'averagecurrent_300',//300电导率时的电流:mA	1 word
    'averagecut_600',//16	平均cut@600	600电导率时的cut	1 word
    'averagecut_300',// 17	平均cut@300	300电导率时的cut	1 word
    'waterpurificationrate',//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
    'error_partsfailure',//零件故障
    'error_pumpfailure',//20	泵故障	ERROR2:0 无故障 1有故障
    'error_programfailure',//21	程序故障	ERROR3:0 无故障 1有故障
    'error_flowfailure',//22	流量故障	ERROR4:0 无故障 1有故障
    'error_leakagefault',//23	漏水故障	ERROR5:0 无故障 1有故障
    'error_edicurrent',//24	EDI电流	ERROR6:0 无故障 1有故障
    'error_modout',//25	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
    'error_intakesensorfault',//26	进水传感器故障	ERROR8 :0 无故障 1有故障
    'error_outflowsensorfault',//27	出水传感器故障	ERROR9:0 无故障 1有故障
    'error_cwatersensorfault',//28	浓水传感器故障	ERROR10 :0 无故障 1有故障
    'error_wastewatersensorfault',//29	废水传感器故障	ERROR11:0 无故障 1有故障
    'error_outflowflowmeterfailure',//30	出水流量计故障	ERROR12:0 无故障 1有故障
    'error_wastewaterflowmeterfailure',//31	废水流量计故障	ERROR13:0 无故障 1有故障
    'error_clockfailure',//32	时钟故障	ERROR14:0 无故障 1有故障
    'error_pressuresensor1failure',//33	压力1传感器故障	ERROR15:0 无故障 1有故障
    'error_pressuresensor2failure',//34	压力2传感器故障	ERROR16:0 无故障 1有故障
    'error_pressuresensor3failure',//35	压力3传感器故障	ERROR17:0 无故障 1有故障
    'error_pressuresensor4failure',//36	压力4传感器故障	ERROR18:0 无故障 1有故障
  ];
  let result = {};
  for(let i = 0;i < mapdatafieldname.length; i++){
    const value = dataz.length >i ?dataz[i]:'0';
    lodash_set(result,mapdatafieldname[i],value);
  }
  callbackfn(result);
};

setsocketrecvcallback(()=>{
  if(lodash_startsWith(recvbuf,'$')){
    if(lodash_endWith(recvbuf,'%')){
      if(recvbuf !== '$ok%'){
        parsedata(recvbuf,(result)=>{
          setsocketsend(`$ok%`);
        });
      }
      recvbuf = '';
    }
  }
});

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

    yield takeLatest(`${wifi_sendcmd_request}`, function*(action) {
      try{
        const {payload} = action;
        yield put(set_weui({
          toast:{
          text:`发送给硬件命令:\n${payload.cmd}`,
          show: true,
          type:'success'
        }}));
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${wifi_getssidlist_request}`, function*(action) {
      try{
        let {payload:result} = action;
        console.log(`getcurwifi_request:${JSON.stringify(result)}`);
        const { wifiresult, timeout } = yield race({
           wifiresult: call(getwifilist),
           timeout: call(delay, 2000)
        });
        if(!!timeout){
          yield put(common_err({type:'getcurwifi',errmsg:`获取wifi信息超时`}));
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
          yield put(common_err({type:'wifi_setcurwifi',errmsg:`设置wifi超时`}));
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
