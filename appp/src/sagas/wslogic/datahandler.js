import {
    common_err,

    loginwithtoken_request,
    login_request,
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
  } from '../../actions';

//接收的对应关系
const recvmessagetoresultpair = {
  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,
  'getsystemconfig_result':getsystemconfig_result,

  'adddevice_result':adddevice_result,
  'getdevice_result':getdevice_result,
  'setuserdevice_result':setuserdevice_result,

};

//非验证发送接口
const sendmessagefnsz = {
  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,

  'getsystemconfig':`${getsystemconfig_request}`,

};

//验证发送接口
const sendmessageauthfnsz = {
  'adddevice':`${adddevice_request}`,
  'getdevice':`${getdevice_request}`,
  'setuserdevice':`${setuserdevice_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
