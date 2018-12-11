/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import store  from './store';

import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {history} from './store';


import AppRoot from '../approot.js';


//react 国际化
import {IntlProvider,addLocaleData} from 'react-intl';
import MessageProvider from '../locales/MessageProvider';
// import en_US from '../locales/en_US';
// import intl from 'intl';
import zh from 'react-intl/locale-data/zh';//react-intl语言包
import en from 'react-intl/locale-data/en';//react-intl语言包

 // addLocaleData([...en, ...zh]);//需要放入本地数据库
addLocaleData(zh)
addLocaleData(en)


let ChildRoot = (props)=>{
  console.log(props);
  const locale = props.locale || 'zh-cn';
  return (<IntlProvider locale={locale} messages={MessageProvider(locale)}>
    <div>
      <ConnectedRouter history={history}>
          <Route path="/" component={AppRoot}/>
      </ConnectedRouter>
      <DevTools />
    </div>
  </IntlProvider>);
}

const mapStateToProps =  ({app:{locale}}) =>{
  return {locale};
}

ChildRoot = connect(mapStateToProps)(ChildRoot);

const Root = (props)=>
    (

        <Provider store={store}>
            <ChildRoot />
        </Provider>

    );



export default Root;