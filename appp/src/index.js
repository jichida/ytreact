import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './env/root';
import { sagaMiddleware } from './env/store';
import rootSaga from './sagas';
import 'antd-mobile/dist/antd-mobile.css';
// import moment from 'moment';
// import VConsole from 'vconsole';
import 'moment/locale/zh-cn';
import {registerandroid} from './env/android';
// import registerServiceWorker from './registerServiceWorker';
// import {
//   setwifistatuscallback
// } from './env/device';
// const vConsole = new VConsole();
registerandroid();
global.Intl = require('intl');
window.Intl = require('intl');

sagaMiddleware.run(rootSaga);
ReactDOM.render( < Approot / > ,
    document.getElementById('root'));
