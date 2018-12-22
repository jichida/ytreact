import {
    common_err,

    loginwithtoken_request,
    login_request,
    // login_result,
    findpwd_request,
    findpwd_result,
    sendauth_request,
    sendauth_result,

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,
    md_login_result,

    adddevice_request,
    adddevice_result,
    getdevice_request,
    getdevice_result,
    page_getdevice_request,
    page_getdevice_result,
    setuserdevice_request,
    setuserdevice_result,

    getaddressconstlist_request,
    getaddressconstlist_result,

    getdeviceaddressstats_request,
    getdeviceaddressstats_result,

    getdistributorlist_request,
    getdistributorlist_result,
  } from '../../actions';

//接收的对应关系
const recvmessagetoresultpair = {
  'common_err':common_err,
  'getdistributorlist_result':getdistributorlist_result,
  'findpwd_result':findpwd_result,
  'sendauth_result':sendauth_result,
  'login_result':md_login_result,
  'logout_result':logout_result,
  'getsystemconfig_result':getsystemconfig_result,
  'getaddressconstlist_result':getaddressconstlist_result,
  'adddevice_result':adddevice_result,
  'getdevice_result':getdevice_result,
  'setuserdevice_result':setuserdevice_result,
  'page_getdevice_result':page_getdevice_result,
  'getdeviceaddressstats_result':getdeviceaddressstats_result,
};

//非验证发送接口
const sendmessagefnsz = {
  'findpwd':`${findpwd_request}`,
  'sendauth':`${sendauth_request}`,
  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,
  'getaddressconstlist':`${getaddressconstlist_request}`,
  'getsystemconfig':`${getsystemconfig_request}`,

};

//验证发送接口
const sendmessageauthfnsz = {
  'getdistributorlist':`${getdistributorlist_request}`,
  'getdeviceaddressstats':`${getdeviceaddressstats_request}`,
  'page_getdevice':`${page_getdevice_request}`,
  'adddevice':`${adddevice_request}`,
  'getdevice':`${getdevice_request}`,
  'setuserdevice':`${setuserdevice_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
