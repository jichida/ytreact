let islocalhost = true;
const serverurl = islocalhost?'http://localhost:4001':'http://asm.i2u.top:4001';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.2.5',
    sendlocationinterval:20000,
    softmode:'appc'
};


export default config;
