import { createAction } from 'redux-act';

export const adddevice_request = createAction('adddevice_request');
export const adddevice_result = createAction('adddevice_result');

//getdevice 可能不用
export const getdevice_request = createAction('getdevice_request');
export const getdevice_result = createAction('getdevice_result');

export const setuserdevice_request = createAction('setuserdevice_request');
export const setuserdevice_result = createAction('setuserdevice_result');

export const ui_setuserdevice_request = createAction('ui_setuserdevice_request');
