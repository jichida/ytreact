import { createAction } from 'redux-act';

export const getsurvey_request = createAction('getsurvey_request');
export const getsurvey_result = createAction('getsurvey_result');

export const savesurvey_request = createAction('savesurvey_request');
export const savesurvey_result = createAction('savesurvey_result');

export const deletesurvey_request = createAction('deletesurvey_request');
export const deletesurvey_result = createAction('deletesurvey_result');

export const importsurvey = createAction('importsurvey');