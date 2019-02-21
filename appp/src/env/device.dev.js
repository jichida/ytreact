import store from './store';
import {wifi_setstatus,socket_setstatus,socket_recvdata} from '../actions';

// let fncallback;
// window.wifistatuscallback = (result)=>{
//   store.dispatch(wifi_setstatus(result));
// }
//$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,%

const setwifistatuscallback = ()=>{
  // fncallback = window.wifistatuscallback;
}

window.wifistatuscallback_yt = (result)=>{
  const data = result.data;
  store.dispatch(wifi_setstatus(data));
}
window.socketstatuscallback = (result)=>{
  store.dispatch(socket_setstatus(result));
}
window.xviewReceiverNativeSocket = (result)=>{
  store.dispatch(socket_recvdata(result));
}

const openwifi =  (fncallback)=>{
  // window.setTimeout(()=>{
  //   fncallback({
  //     code:0,
  //     wifiStatus:1
  //   });
  // },100);
  window.setTimeout(()=>{
    window.wifistatuscallback_yt({
      code:0,
      data:{
        wifiStatus:1
      }
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
  },4000);
}

const setcurwifi = (values,fncallback)=>{
  console.log(values);
  // fncallback('ok');
  window.setTimeout(()=>{
    window.wifistatuscallback_yt({
      code:0,
      data:{
        wifiStatus:1
      }
    });
  },100);
}


const socket_send = (values,fncallback)=>{
  console.log(`socket_send`);
  console.log(values);
}

const socket_connnect = (values)=>{
  console.log(`socket_connnect`);
  console.log(values);
  window.setTimeout(()=>{
    window.socketstatuscallback({
      data:{
        socketStatus:1
      }
    })
  },2000);
}

const socket_close = ()=>{
  console.log(`socket_close`);
}
const getwifistatus = ()=>{
  // const xviewData = {
  //   componentName:"ComponentUtil",
  //   action:"getWifiStatus",
  //   callback:"wifistatuscallback_yt"
  // }
  // xviewfun(JSON.stringify(xviewData));
}


export {socket_connnect,socket_send,socket_close,getwifistatus,
  getssidlist,setcurwifi,openwifi,setwifistatuscallback}
