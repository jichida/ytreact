import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
// import { WingBlank } from 'antd-mobile';
import './common.less';

import Index from './DeviceAdd';
import WifiLogin from './WifiLogin';
import WifiSetting from './WifiSetting';
import WifiSuccess from './WifiSuccess';
import DeviceSelect from './DeviceSelect';

import Home from './Layout';
import BasicInfo from './DeviceBasic';
import WaterInfo from './DeviceWater';
import InstallInfo from './DeviceInstall';
import CheckList from './DeviceCheckList';
import Setting from './DeviceSetting';
import Inlet from './DeviceInlet';
import EquipmentList from './EquipmentList';
import FrontFilter from './FrontFilter';
import AfterFilter from './AfterFilter';
import Login from './Login';
import PipeFittings from './PipeFittings';

import TestCo from './SettingSystem/index_old';


import {requireAuthentication} from './requireauthentication';

import gobal_bg from '../assets/electricbg.png';

import logo from '../assets/logo.png';
import device1 from '../assets/pimg1.png';
import device2 from '../assets/pimg2.png';
import setup from '../assets/setup.png';
import refresh_icon from '../assets/refresh.png';
import '../assets/wlimg.png';
import home_bgimg from '../assets/zhuye_bg.png';
import monitorBg from '../assets/zhuye_an.png';

class AppRoot extends React.Component {
    componentWillMount() {

    }

    componentWillUnmount() {

    }
    render() {
      return (
          <div className="page" style={{backgroundImage: `url(${gobal_bg})`}}>
            <Switch>
              <Route exact path="/" component={requireAuthentication(Index)} />
              <Route exact path="/test" component={TestCo} />
              <Route exact path="/wifi" component={requireAuthentication(WifiLogin)} />
              <Route exact path="/wifisetting" component={requireAuthentication(WifiSetting)} />
              <Route exact path="/wifisucess" component={requireAuthentication(WifiSuccess)} />
              <Route exact path="/devices" component={requireAuthentication(DeviceSelect)} />
              <Route exact path="/home" component={requireAuthentication(Home)} />
              <Route exact path="/basic" component={requireAuthentication(BasicInfo)} />
              <Route exact path="/water" component={requireAuthentication(WaterInfo)} />
              <Route exact path="/install" component={requireAuthentication(InstallInfo)} />
              <Route exact path="/checklist" component={requireAuthentication(CheckList)} />
              <Route exact path="/inlet" component={requireAuthentication(Inlet)} />
              <Route exact path="/setting" component={requireAuthentication(Setting)} />
              <Route exact path="/equipmentlist" component={requireAuthentication(EquipmentList)} />
              <Route exact path="/frontfilter" component={requireAuthentication(FrontFilter)} />
              <Route exact path="/afterfilter" component={requireAuthentication(AfterFilter)} />
              <Route exact path="/pipefitting" component={requireAuthentication(PipeFittings)} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
      );
  }
}

export default connect()(AppRoot);
