import {getxviewfun} from './xviewfun';
export const jsCallPhone=(phonenumber)=>{

  const xviewData = {
    componentName:"ComponentUtil",
    action:"callPhone",
    data:{ tel: phonenumber}
  }
  getxviewfun().callNativeXView(JSON.stringify(xviewData));
}
