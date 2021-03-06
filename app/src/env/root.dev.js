﻿/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import DevTools from './devtools';
import store from './store';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { LocaleProvider } from 'antd-mobile';
import {history} from './store';
import AppRoot from '../components/approot.js';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import zhTW from 'antd-mobile/lib/locale-provider/en_US';
import IntlGlobalProvider from '../util/globalIntl';
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

const languages = {
    'zh-cn': undefined,
    'zh-tw': undefined,
    'en': enUS,
}


let ChildRoot = (props)=>{
  const locale = props.locale || 'zh-cn';
  return (<IntlProvider locale={locale} messages={MessageProvider(locale)}>
  <IntlGlobalProvider>
    <div>
      <ConnectedRouter history={history}>
        <LocaleProvider locale={languages[locale]}>
          <Route path="/" component={AppRoot}/>
        </LocaleProvider>
      </ConnectedRouter>
      <DevTools />
    </div>
      </IntlGlobalProvider>
  </IntlProvider>);
}
const mapStateToProps =  ({app:{locale}}) =>{
  return {locale};
};
ChildRoot = connect(mapStateToProps)(ChildRoot);

const Root = (props)=>
    (
            <Provider store={store}>
                <ChildRoot />
            </Provider>
    );


export default Root;
