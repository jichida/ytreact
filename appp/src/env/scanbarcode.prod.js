
import {xviewfun} from './xviewfun';
export const scanbarcode=(fncallback)=>{
  // const json = {
  //   "callback": "callbackfn_scanbarcode"
  // };
  window.callbackfn_scanbarcode = fncallback;
  // if(!!window.xview){
  //   window.xview.xviewScanBarcode(JSON.stringify(json));
  // }
  const xviewData = {
    componentName:"ComponentScanQR",
    action:"scan",
    callback:"callbackfn_scanbarcode"
  }

  xviewfun(JSON.stringify(xviewData));

  // if(!window["webkit"] && !window["xview"]){
  //   //仅供测试
  //   fncallback({
  //     "code": 0,
  //     // "data": "GHCA0488",
  //     "data": "GHCA0488"
  //   });
  // }

};
