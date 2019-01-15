import { createAction } from 'redux-act';


export const createnotice_request = createAction('createnotice_request');
export const createnotice_result = createAction('createnotice_result');

export const page_getnotice_request = createAction('page_getnotice_request');
export const page_getnotice_result = createAction('page_getnotice_result');

export const set_notice_db = createAction('set_notice_db');
