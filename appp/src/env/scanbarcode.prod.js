

export const scanbarcode=(fncallback)=>{
  const json = {
    "callback": "callbackfn_scanbarcode"
  };
  window.callbackfn_scanbarcode = fncallback;
  if(!!window.xview){
    window.xview.xviewScanBarcode(JSON.stringify(json));
  }
};
