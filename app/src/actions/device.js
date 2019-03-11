import { createAction } from 'redux-act';

export const adddevice_request = createAction('adddevice_request');
export const adddevice_result = createAction('adddevice_result');


export const getdevice_request = createAction('getdevice_request');
export const getdevice_result = createAction('getdevice_result');

export const setuserdevice_request = createAction('setuserdevice_request');
export const setuserdevice_result = createAction('setuserdevice_result');

export const ui_setuserdevice_request = createAction('ui_setuserdevice_request');
export const tmp_ui_setuserdevice_request = createAction('tmp_ui_setuserdevice_request');

export const app_sendcmd_request = createAction('app_sendcmd_request');
export const app_sendcmd_result = createAction('app_sendcmd_result');
export const push_devicecmddata = createAction('push_devicecmddata');
