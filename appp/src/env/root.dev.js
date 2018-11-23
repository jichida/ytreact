/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';
import { Provider } from 'react-redux';
import DevTools from './devtools';
import store from './store';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {history} from './store';
import AppRoot from '../components/approot.js';

//react 国际化
import {IntlProvider,addLocaleData} from 'react-intl';
import zh_CN from '../locales/zh_CN';
// import en_US from '../locales/en_US';
import intl from 'intl';
import zh from 'react-intl/locale-data/zh';//react-intl语言包
import en from 'react-intl/locale-data/en';//react-intl语言包

 addLocaleData([...en, ...zh]);//需要放入本地数据库




const Root = (props)=>
    (
        <IntlProvider lacal={'cn'} message={zh_CN}>
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history}>
                        <Route path="/" component={AppRoot}/>
                    </ConnectedRouter>
                    <DevTools />
                </div>
            </Provider>
        </IntlProvider>
    );


export default Root;
