import {
    common_err,

    loginwithtoken_request,
    login_request,
    login_result,

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,

  } from '../../actions';

//接收的对应关系
const recvmessagetoresultpair = {
  'common_err':common_err,

  'login_result':login_result,
  'logout_result':logout_result,
  'getsystemconfig_result':getsystemconfig_result,

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

};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
