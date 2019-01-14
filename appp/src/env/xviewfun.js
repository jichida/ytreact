
const getxviewfun = ()=>{
  if(!!window["xview"]){
    return window["xview"].callNativeXView;
  }
  if(!!window["webkit"]){
    return window["webkit"].messageHandlers["callNativeXView"].postMessage;
  }
  return ()=>{

  };
}

export {getxviewfun};
