
const seteasylink = (param,callback)=>{
  // * 开始配网
  // * 'sleepTime': "100", //20 ~ 200  默认值50，可为空	每包数据的间隔时间，建议20-200, 单位ms
  // * 'runSecond': "50", //30 ~ 60  发送持续的时间，到点了就停止发送, 单位s 最少30 s 超时时间设置
  // * 'ssid': "wifi 名称", //必传
  // * 'password': "", //可以为空
  // *
  //
  //     this.xviewData.componentName = "ComponentEasyLink";
  //      this.xviewData.action = "start";
  //      this.xviewData.callback = '前端定义';
  //      this.xviewData.data = {'ssid': "wifi 名称", 'password': "",
  //      'sleepTime': "100",'runSecond': "50"}";
  //      window["xview"].callNativeXView(JSON.stringify(xviewData));
  let data = {
    ssid:param.ssid,
    password:param.password,
    sleepTime:'100',
    runSecond:'50'
  }
  setTimeOut(()=>{
    callback()
  },1000);
}
