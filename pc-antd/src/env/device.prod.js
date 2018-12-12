import store from './store';
import {wifi_setstatus,socket_setstatus,socket_recvdata} from '../actions';

window.wifistatuscallback_yt = (result)=>{
  store.dispatch(wifi_setstatus(result));
}
window.socketstatuscallback = (result)=>{
  store.dispatch(socket_setstatus(result));
}
window.xviewReceiverNativeSocket = (result)=>{
  store.dispatch(socket_recvdata(result));
}

const setwifistatuscallback = ()=>{
  const xviewData = {
    componentName:"ComponentUtil",
    action:"getWifiStatus",
    callback:"wifistatuscallback_yt"
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}


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
    fncallback(result);
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
  window.connectWifi = (result)=>{
    fncallback(result);
  };
  const xviewData = {
    componentName:"ComponentUtil",
    action:"connectWifi",
    callback:"connectWifi",
    data:{
      ssid:values.wifissid,
      passWord:values.wifipassword,
      wifiCipher:values.wifiCipher
    }
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }

}

const socket_send = (values,fncallback)=>{
  window.sendSocketCallback = fncallback;
  const xviewData = {
    componentName:"ComponentNetty",
    action:"sendMessage",
    callback:"sendSocketCallback",
    data:values
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}

const socket_connnect = (values)=>{
  const xviewData = {
    componentName:"ComponentNetty",
    action:"connect",
    callback:"socketstatuscallback",
    data:values
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}

const socket_close = ()=>{
  const xviewData = {
    componentName:"ComponentNetty",
    action:"disconnect",
    callback:"socketstatuscallback",
    data:{}
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
}




export {socket_connnect,socket_send,socket_close,
  getssidlist,setcurwifi,openwifi,setwifistatuscallback}
