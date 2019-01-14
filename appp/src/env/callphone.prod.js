
export const jsCallPhone=(phonenumber)=>{

  const xviewData = {
    componentName:"ComponentUtil",
    action:"callPhone",
    data:{ tel: phonenumber}
  }
  if(!!window["xview"]){
    window["xview"].callNativeXView(JSON.stringify(xviewData));
  }
  else{
    alert('未初始化,拨打电话方法');
  }
}
