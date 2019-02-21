

const seteasylink = ()=>{
    const xviewData = {'title': "进入设备配网", 'url': "http://10.10.100.254/"};
    if(!!window["xview"]){
      window["xview"].setNetworkUI(JSON.stringify(xviewData));
    }
}

export {seteasylink};
