
const xviewfun = (xviewdata)=>{
  if(!!window["xview"]){
    return window["xview"].callNativeXView(xviewdata);
  }
  if(!!window["webkit"]){
    return window["webkit"].messageHandlers["callNativeXView"].postMessage(xviewdata);
  }
  return ()=>{

  };
}

export {xviewfun};
