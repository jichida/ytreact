import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import './common.less';

import Index from './DeviceAdd';
import WifiLogin from './WifiLogin';
import WifiSuccess from './WifiSuccess';
import DeviceSelect from './DeviceSelect';

import Home from './Layout';
import BasicInfo from './DeviceBasic';
import WaterInfo from './DeviceWater';
import InstallInfo from './DeviceInstall';


import {requireAuthentication} from './requireauthentication';


class AppRoot extends React.Component {
    componentWillMount() {

    }
   
    componentWillUnmount() {

    }
    render() {
      return (
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/wifi" component={WifiLogin} />
              <Route exact path="/wifisucess" component={WifiSuccess} />
              <Route exact path="/devices" component={DeviceSelect} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/basic" component={BasicInfo} />
              <Route exact path="/water" component={WaterInfo} />
              <Route exact path="/install" component={InstallInfo} />
            </Switch>
          </div>
      );
  }
}

export default connect()(AppRoot);
