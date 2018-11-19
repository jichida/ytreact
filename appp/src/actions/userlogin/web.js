import { createAction } from 'redux-act';

export const register_request = createAction('userlogin.register_request');
export const register_result = createAction('userlogin.register_result');

export const loginwithtoken_request = createAction('userlogin.loginwithtoken');
export const login_request = createAction('userlogin.login_request');
export const login_result = createAction('userlogin.login_result');

export const sendauth_request = createAction('userlogin.sendauth_request');
export const sendauth_result = createAction('userlogin.sendauth_result');

//发送编辑信息请求
export const fillprofile_request = createAction('fillprofile_request');
export const fillprofile_result = createAction('fillprofile_result');

export const logout_request = createAction('userlogin.logout_request');
export const logout_result = createAction('userlogin.logout_result');


export const findpwd_request = createAction('findpwd_request');
export const findpwd_result = createAction('findpwd_result');
