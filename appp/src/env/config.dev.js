const islocalhost = false;
const serverurl = islocalhost?'http://localhost:4101':'http://tx.i2u.top:4101';
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
    appversion:'1.4.1(build0611)',
    sendlocationinterval:20000,
    softmode:'appp'
};


export default config;
