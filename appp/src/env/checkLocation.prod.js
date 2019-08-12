

const checkLocation = (fncallback)=>{
    window.callbackfn_checkLocation = (result)=>{
      console.log(result);
      fncallback(result);
    }
    const xviewData = {'action': "openLocation", 'callback': "callbackfn_checkLocation"};
    console.log(xviewData);
    if(!!window["xview"]){
      console.log(`call checkLocation`);
      window["xview"].checkLocation(JSON.stringify(xviewData));
    }
    if(!!window["webkit"]){
      window["webkit"].messageHandlers["checkLocation"].postMessage(JSON.stringify(xviewData));
      // window["webkit"].setNetworkUI(JSON.stringify(xviewData));
    }
}

export {checkLocation};
