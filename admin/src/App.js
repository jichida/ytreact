import React, { Component } from 'react';
import { Admin, Resource, ListGuesser, Login } from "react-admin";

import dataProvider from './dataProvider.js';
import authProvider from './authProvider.js';
// import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
//import Login from './Login';
//import Layout from './Layout.js';
import Menu from './menu';
import { reducer as tree } from 'ra-tree-ui-materialui';
import { Dashboard } from './Dashboard.js';
//import CustomRoutes from './routes';
import translations from './i18n';
import singledocumentpage from './components/singledocumentpage/reducer';
import systemconfigreducer from './components/systemconfig/reducer';
//import themeReducer from './themeReducer.js';
//import menu from './menu/reducer';

import Widgets from '@material-ui/icons/Widgets' //系统设置
import { SystemconfigList } from './components/systemconfig/index.js';
import {AddressconstCreate,AddressconstList,AddressconstEdit} from './components/addressconst';
import {DistributorList,DistributorEdit,DistributorCreate} from './components/distributors';
import {InstallerList,InstallerEdit,InstallerCreate} from './components/installers';
// import {UserlistList,UserlistEdit} from './components/user/index.js';
// import {AboutlistList,AboutlistEdit,AboutlistCreate} from './components/abouts/index.js';
import {DeviceuserList,DeviceuserEdit} from './components/deviceuser/index';
import {DeviceList,DeviceEdit} from './components/device/index';
import {DevicedatahistoryList,DevicedatahistoryEdit} from './components/devicedatahistory/index';
import  {SurveyList,SurveyEdit} from './components/survey/index';
// import {DevicedatahistoryList,DevicedatahistoryEdit} from './components/devicedatahistory/index';
// import {RecommendHistoryList,RecommendHistoryEdit} from './components/recommendhistory/index';


const i18nProvider = locale => translations[locale];

const MyLoginPage = () => (
    <Login
        // A random image that changes everyday
        backgroundImage="none"
        title = "溢泰管理后台"
    />
);

class App extends Component {
  render() {
    return (
      <Admin dataProvider = {dataProvider}
      title = "溢泰管理后台"
      authProvider = {authProvider}
      customReducers = {{
        tree,
        systemconfig: systemconfigreducer,
        singledocumentpage,
      }}
      customSagas = {sagas}
      menu={Menu}
      dashboard = {Dashboard}
      locale = "cn"
      i18nProvider = {i18nProvider}
      loginPage={MyLoginPage}
      >
      {
        permissions =>{
          return [
            <Resource name="systemconfig" icon={Widgets} list={SystemconfigList} />,
            <Resource name="addressconst"  icon={Widgets} list={AddressconstList} edit={AddressconstEdit} create={AddressconstCreate}  />,
            <Resource name="installer"  icon={Widgets} list={InstallerList} edit={InstallerEdit} create={InstallerCreate} />,
            <Resource name="distributor"  icon={Widgets} list={DistributorList} edit={DistributorEdit} create={DistributorCreate} />,
            <Resource name="deviceuser"  icon={Widgets} list={DeviceuserList} edit={DeviceuserEdit}  />,
            <Resource name="survey"  icon={Widgets} list={SurveyList} edit={SurveyEdit}  />,
            <Resource name="device"  icon={Widgets} list={DeviceList} edit={DeviceEdit} />,
            <Resource name="devicedatahistory"  icon={Widgets} list={DevicedatahistoryList} edit={DevicedatahistoryEdit} />,
          ]}
      }
      </Admin>
    );
  }
}

export default App;
