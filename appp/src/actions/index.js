import { createAction } from 'redux-act';

export * from './device';
export * from './userlogin';
export * from './app';
export * from './md';
export * from './ui';

export const ui_main_selindex = createAction('ui_main_selindex');
export const ui_home_selindex = createAction('ui_home_selindex');
export const ui_set_language = createAction('ui_set_language');

export const adddevice_request = createAction('adddevice_request');
export const adddevice_result = createAction('adddevice_result');

export const getdevice_request = createAction('getdevice_request');
export const getdevice_result = createAction('getdevice_result');

export const setuserdevice_request = createAction('setuserdevice_request');
export const setuserdevice_result = createAction('setuserdevice_result');


console.log(ui_main_selindex)
console.log(ui_home_selindex)
