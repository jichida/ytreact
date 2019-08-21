const islocalhost = false;
const serverurl = islocalhost?'http://localhost:4101':'http://api.hydronovation.com.cn:4101';
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
    appversion:'1.0.0(build0821)',
    sendlocationinterval:20000,
    softmode:'appp'
};


export default config;
