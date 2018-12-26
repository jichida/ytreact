let islocalhost = false;
let serverurl = islocalhost?'http://localhost:4101':'http://yt.i2u.top:4101';

export default {
    restserverurl:`${serverurl}/adminapi/v1`,
    adminauthserverurl:`${serverurl}/adminauth/v1`,
    admincustomapi:`${serverurl}/admincustomapi/v1`,
    serverurl:`${serverurl}`,
    appversion:'1.1.1(build0801)',
};
