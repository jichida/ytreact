import store from './store';
import lodash_get from 'lodash.get';
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
  },2000);
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
  window.setTimeout(()=>{
    let recvbuf = values.sendMessage;
    let objstring = '';
    const istart = recvbuf.indexOf('$',0);
    if(istart >= 0){
      const iend = recvbuf.indexOf('%',istart);
      if(iend >= 0){
        objstring = recvbuf.substr(istart,iend - istart);
        console.log(objstring)

        if(recvbuf === '$data%'){
          store.dispatch(socket_recvdata({code:0,data:`$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,3.2.2.2.1.0%`}));
        }
        else{
          store.dispatch(socket_recvdata({code:0,data:`${objstring}ok%`}));
        }

      }
    }

  },100);
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
window.socketstatuscallback = (result)=>{
  //data { socketStatus:  -1 0 1 2 }
  if(lodash_get(result,'data.socketStatus',0) === 1){
    socket_send({'sendMessage':'$data%'},()=>{

    });
  }
  store.dispatch(socket_setstatus(result));
}

export {socket_connnect,socket_send,socket_close,getwifistatus,
  getssidlist,setcurwifi,openwifi,setwifistatuscallback}
