import { createAction } from 'redux-act';


export const wifi_open_reqeust = createAction('wifi_open_reqeust');
export const wifi_open_result = createAction('wifi_open_result');

export const wifi_getssidlist_request = createAction('wifi_getssidlist_request');
export const wifi_getssidlist_result = createAction('wifi_getssidlist_result');

export const wifi_setcurwifi_request = createAction('wifi_setcurwifi_request');
export const wifi_setcurwifi_result = createAction('wifi_setcurwifi_result');

export const wifi_sendcmd_request = createAction('wifi_sendcmd_request');
export const wifi_sendcmd_result = createAction('wifi_sendcmd_result');

export const wifi_recvcmd_request = createAction('wifi_recvcmd_request');
export const wifi_recvcmd_result = createAction('wifi_recvcmd_result');

export const wifi_setstatus = createAction('wifi_setstatus');
export const socket_setstatus = createAction('socket_setstatus');
export const socket_recvdata = createAction('socket_recvdata');

export const ui_wifisuccess_tonext = createAction('ui_wifisuccess_tonext');
export const wifi_getdata = createAction('wifi_getdata');

export const wifi_recvcmd = createAction('wifi_recvcmd');
export const wifi_init = createAction('wifi_init');

export const wifi_seteasylink = createAction('wifi_seteasylink');
