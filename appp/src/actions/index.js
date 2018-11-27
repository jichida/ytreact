import { createAction } from 'redux-act';

export * from './device';
export * from './userlogin';
export * from './app';
export * from './md';
export * from './ui';

export const ui_main_selindex = createAction('ui_main_selindex');
export const ui_home_selindex = createAction('ui_home_selindex');
export const ui_set_language = createAction('ui_set_language');
console.log(ui_main_selindex)
console.log(ui_home_selindex)
