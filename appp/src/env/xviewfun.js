
const xviewfun = (xviewdata)=>{
  window.setTimeout(()=>{
    if(!!window["xview"]){
       window["xview"].callNativeXView(xviewdata);
    }
    if(!!window["webkit"]){
       window["webkit"].messageHandlers["callNativeXView"].postMessage(xviewdata);
    }
  },0)
}

export {xviewfun};
