import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';


import userlogin from './userlogin';
import app from './app';

export default combineReducers(
  {
    app,
    userlogin,
    form: formReducer,
    router: routerReducer,
  });
