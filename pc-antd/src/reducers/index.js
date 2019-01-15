﻿import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'

import userlogin from './userlogin';
import app from './app';
import device from './device';
import wifi from './wifi';
import devicedata from './devicedata';
import addressconst from './addressconst';
import searchquery from './searchquery'
import notice from './notice';

export default (history)=>combineReducers(
  {
    app,
    notice,
    device,
    addressconst,
    devicedata,
    wifi,
    userlogin,
    searchquery,
    form: formReducer,
    router: connectRouter(history),
  });
