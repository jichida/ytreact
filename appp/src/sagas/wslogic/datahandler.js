import {
    common_err,

    loginwithtoken_request,
    login_request,

    findpwd_request,
    findpwd_result,
    sendauth_request,
    sendauth_result,
    // login_result,

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,
    md_login_result,

    adddevice_request,
    adddevice_result,
    getdevice_request,
    getdevice_result,
    setuserdevice_request,
    setuserdevice_result,

    changepwd_request,
    changepwd_result,

    app_sendcmd_request,
    app_sendcmd_result,

    push_devicecmddata,

    getsurvey_request,
    getsurvey_result,

    savesurvey_request,
    savesurvey_result
  } from '../../actions';

//接收的对应关系
const recvmessagetoresultpair = {
  'savesurvey_result':savesurvey_result,
  'getsurvey_result':getsurvey_result,
  'push_devicecmddata':push_devicecmddata,
  'app_sendcmd_result':app_sendcmd_result,
  'changepwd_result':changepwd_result,
  'common_err':common_err,
  'findpwd_result':findpwd_result,
  'sendauth_result':sendauth_result,

  'login_result':md_login_result,
  'logout_result':logout_result,
  'getsystemconfig_result':getsystemconfig_result,

  'adddevice_result':adddevice_result,
  'getdevice_result':getdevice_result,
  'setuserdevice_result':setuserdevice_result,

};

//非验证发送接口
const sendmessagefnsz = {
  'changepwd':`${changepwd_request}`,
  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,
  'findpwd':`${findpwd_request}`,
  'sendauth':`${sendauth_request}`,
  'getsystemconfig':`${getsystemconfig_request}`,

};

//验证发送接口
const sendmessageauthfnsz = {
  'getsurvey':`${getsurvey_request}`,
  'savesurvey':`${savesurvey_request}`,
  'app_sendcmd':`${app_sendcmd_request}`,
  'adddevice':`${adddevice_request}`,
  'getdevice':`${getdevice_request}`,
  'setuserdevice':`${setuserdevice_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
