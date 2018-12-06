import store from './store';
import {wifi_setstatus} from '../actions';

window.wifistatuscallback = (result)=>{
  store.dispatch(wifi_setstatus(result));
}

const setwifistatuscallback = ()=>{
  const xviewData = {
    componentName:"ComponentUtil",
    action:"getWifiStatus",
    callback:"wifistatuscallback"
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}

setwifistatuscallback();

const openwifi =  ()=>{
  const xviewData = {
    componentName:"ComponentUtil",
    action:"openWifi",
    callback:"wifistatuscallback"
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}


const getssidlist = (fncallback)=>{
  window.getWifiListCallback = (result)=>{
    let wifilist = [];
    if(result.code === 0){
      wifilist = result.data;
    }
    fncallback(wifilist);
  };
  const xviewData = {
    componentName:"ComponentUtil",
    action:"getWifiList",
    callback:"getWifiListCallback"
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
  // {"code":0,"data":[{"mac":"3c:46:d8:14:8f:54","ssid":"yikuaiqian2018","wifiCipher":2},{"mac":"78:44:fd:c8:7b:39","ssid":"QianMianYuJia","wifiCipher":2}],

}

const setcurwifi = (values,fncallback)=>{
  console.log(values);
  fncallback('ok');
}

const setsocketrecvcallback = (fncallback)=>{
    fncallback(`$ok%`)
}



export {getssidlist,setcurwifi,setsocketrecvcallback,openwifi}
