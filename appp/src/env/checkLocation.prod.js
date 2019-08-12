const openLocation = ()=>{
    const xviewData = {'action': "openLocation"};
    console.log(xviewData);
    if(!!window["xview"]){
      console.log(`call openLocation`);
      window["xview"].checkLocation(JSON.stringify(xviewData));
    }
    if(!!window["webkit"]){
      window["webkit"].messageHandlers["checkLocation"].postMessage(JSON.stringify(xviewData));
      // window["webkit"].setNetworkUI(JSON.stringify(xviewData));
    }
}

const checkLocation = (fncallback)=>{
    window.callbackfn_checkLocation = (result)=>{
      console.log(result);
      fncallback(result);
    }
    const xviewData = {'action': "locationStatus", 'callback': "callbackfn_checkLocation"};
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

export {openLocation,checkLocation};
