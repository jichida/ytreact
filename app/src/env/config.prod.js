let islocalhost = false;
const serverurl = islocalhost?'http://localhost:4101':'http://tx.i2u.top:4101';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    sockethost:'10.10.100.254',
    socketport:8899,
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.3.6(build0524)',
    sendlocationinterval:20000,
    softmode:'app'
};


export default config;
