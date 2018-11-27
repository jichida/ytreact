﻿/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store  from './store';

import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import {history} from './store';
import {IntlProvider, addLocaleData} from 'react-intl';


import AppRoot from '../approot.js';

let Root = (props)=>
    (
        <IntlProvider locale={locale} messages={langMap[locale]}>
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history}>
                        <Route path="/" component={AppRoot}/>
                    </ConnectedRouter>
                </div>
            </Provider>
        </IntlProvider>
    );


export default Root;