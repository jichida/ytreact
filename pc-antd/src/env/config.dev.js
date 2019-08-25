const islocalhost = false;
const serverurl = islocalhost?'http://localhost:4101':'http://api.hydronovation.com.cn:4101';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

const config = {
    rootaddressconst:'5c11e0d340dc7d07eacf33a6',
    sockethost:'yt.i2u.top',
    socketport:4102,
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.0.0(build0825)',
    sendlocationinterval:20000,
    softmode:'pc'
};


export default config;
