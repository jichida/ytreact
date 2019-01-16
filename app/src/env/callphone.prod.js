import {xviewfun} from './xviewfun';
export const jsCallPhone=(phonenumber)=>{

  const xviewData = {
    componentName:"ComponentUtil",
    action:"callPhone",
    data:{ tel: phonenumber}
  }
  xviewfun(JSON.stringify(xviewData));
}
