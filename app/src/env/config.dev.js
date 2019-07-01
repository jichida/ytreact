const islocalhost = false;
const serverurl = islocalhost?'http://localhost:4101':'http://47.111.13.144:4101';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    sockethost:'yt.i2u.top',
    socketport:4102,
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.4.8(build0625)',
    sendlocationinterval:20000,
    softmode:'app'
};


export default config;
