import { createAction } from 'redux-act';

export const wifi_getssidlist_request = createAction('wifi_getssidlist_request');
export const wifi_getssidlist_result = createAction('wifi_getssidlist_result');

export const wifi_setcurwifi_request = createAction('wifi_setcurwifi_request');
export const wifi_setcurwifi_result = createAction('wifi_setcurwifi_result');

export const wifi_sendcmd_request = createAction('wifi_sendcmd_request');
export const wifi_sendcmd_result = createAction('wifi_sendcmd_result');

export const wifi_recvcmd_request = createAction('wifi_recvcmd_request');
export const wifi_recvcmd_result = createAction('wifi_recvcmd_result');
