

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
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
  else{
    fncallback({
      code:-1,
      message:'未初始化,找不到扫描二维码方法'
    });
  }
};
