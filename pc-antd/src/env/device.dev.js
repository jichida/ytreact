import store from './store';
import {wifi_setstatus} from '../actions';

// let fncallback;
window.wifistatuscallback = (result)=>{
  store.dispatch(wifi_setstatus(result));
}

const setwifistatuscallback = ()=>{
  // fncallback = window.wifistatuscallback;
}



const openwifi =  (fncallback)=>{
  window.setTimeout(()=>{
    fncallback({
      code:0,
      wifiStatus:1
    });
  },100);
}

const getssidlist = (fncallback)=>{
  window.setTimeout(()=>{
    fncallback({
      "code":0,
      "data":[
        {"mac":"3c:46:d8:14:8f:54","ssid":"yikuaiqian2018","wifiCipher":2},
        {"mac":"78:44:fd:c8:7b:39","ssid":"QianMianYuJia","wifiCipher":2}
      ]
    })
  },100);
}

const setcurwifi = (values,fncallback)=>{
  console.log(values);
  fncallback('ok');
}


const socket_send = (values,fncallback)=>{
  console.log(`socket_send`);
  console.log(values);
}

const socket_connnect = (values)=>{
  console.log(`socket_connnect`);
  console.log(values);
}

const socket_close = ()=>{
  console.log(`socket_close`);
}



export {socket_connnect,socket_send,socket_close,
  getssidlist,setcurwifi,openwifi,setwifistatuscallback}
