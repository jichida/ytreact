import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './env/root';
import { sagaMiddleware } from './env/store';
import rootSaga from './sagas';
import 'antd-mobile/dist/antd-mobile.css';
// import moment from 'moment';
import 'moment/locale/zh-cn';
// import registerServiceWorker from './registerServiceWorker';
// import {
//   setwifistatuscallback
// } from './env/device';

sagaMiddleware.run(rootSaga);
ReactDOM.render( < Approot / > ,
    document.getElementById('root'));
