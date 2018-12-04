import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'

import userlogin from './userlogin';
import app from './app';
import device from './device';
import wifi from './wifi';
import devicedata from './devicedata';

export default (history)=>combineReducers(
  {
    app,
    device,
    devicedata,
    wifi,
    userlogin,
    form: formReducer,
    router: connectRouter(history),
  });
