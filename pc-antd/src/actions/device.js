import { createAction } from 'redux-act';

export const adddevice_request = createAction('adddevice_request');
export const adddevice_result = createAction('adddevice_result');

//getdevice 可能不用
export const getdevice_request = createAction('getdevice_request');
export const getdevice_result = createAction('getdevice_result');

export const setuserdevice_request = createAction('setuserdevice_request');
export const setuserdevice_result = createAction('setuserdevice_result');

export const ui_setuserdevice_request = createAction('ui_setuserdevice_request');

export const page_getdevice_request = createAction('page_getdevice_request');
export const page_getdevice_result = createAction('page_getdevice_result');

export const getdevicecount_request = createAction('getdevicecount_request');
export const getdevicecount_result = createAction('getdevicecount_result');

export const getdevicedata_request = createAction('getdevicedata_request');
export const getdevicedata_result = createAction('getdevicedata_result');
export const getdevicehisdata_request = createAction('getdevicehisdata_request');
export const getdevicehisdata_result = createAction('getdevicehisdata_result');
export const getdevicecmddata_request = createAction('getdevicecmddata_request');
export const getdevicecmddata_result = createAction('getdevicecmddata_result');
export const adddevicecmddata_request = createAction('adddevicecmddata_request');
export const adddevicecmddata_result = createAction('adddevicecmddata_result');
export const getdevicestat_request = createAction('getdevicestat_request');
export const getdevicestat_result = createAction('getdevicestat_result');
