import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import './common.less';

import Index from './Login';
// import Index from './DeviceAdd';
// import WifiLogin from './WifiLogin';
// import WifiSuccess from './WifiSuccess';
// import DeviceSelect from './DeviceSelect';

import Home from './Layout';
import DeviceInfo from './DeviceContainer';
import BasicInfo from './Basic';
import WaterInfo from './Water';
import InstallInfo from './Install';
import List from './List';
import Setting from './SystemContainer';
import FrontFilter from './FrontFilter';
import AfterFilter from './AfterFilter';
import Login from './Login';
import Forget from './Forget';
import ChangePassword from './ChangePassword';


import {requireAuthentication} from './requireauthentication';


class AppRoot extends React.Component {
    componentWillMount() {

    }

    componentWillUnmount() {

    }
    render() {
      return (
          <div className="page">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/deviceinfo" component={DeviceInfo} />
              <Route exact path="/basic" component={BasicInfo} />
              <Route exact path="/water" component={WaterInfo} />
              <Route exact path="/install" component={InstallInfo} />
              <Route exact path="/equipmentlist" component={List} />
              <Route exact path="/setting" component={Setting} />
              <Route exact path="/frontfilter" component={FrontFilter} />
              <Route exact path="/afterfilter" component={AfterFilter} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/change" component={ChangePassword} />
            </Switch>
          </div>
      );
  }
}

export default connect()(AppRoot);
