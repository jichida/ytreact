import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'

import userlogin from './userlogin';
import app from './app';
import device from './device';

export default (history)=>combineReducers(
  {
    app,
    device,
    userlogin,
    form: formReducer,
    router: connectRouter(history),
  });
