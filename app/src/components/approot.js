import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index';


import DeviceInfo from './device/info';
import DeviceBaseinfo from './device/basic_info';
import DeviceWaterinformation from './device/water_information';
import DeviceInstallinformation from './device/install_information';
import DeviceEquipmentlist from './device/equipment_list';
import UserprofileSettings from './userprofile/usersetting';

import {requireAuthentication} from './requireauthentication';

import './css/currency.css';
// import './css/user-Equipment-list.css';
// import './css/user-login.css';
// import './css/user-mine.css';
// import './css/user-zhuye.css';
import './css/weui.css';
//登录相关
import Register from './login/register.js';
import Login from './login/login.js';
import ForgetPwd from './login/forgetpwd.js';

class AppRoot extends React.Component {
    componentWillMount() {

    }
   
    componentWillUnmount() {

    }
    render() {
      return (
        <div className="bg_bg" style={{backgroundImage: "url(" + require("./userprofile/images/bg_bg.png") + ")"}}>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Index} />

                  <Route exact path="/info" component={DeviceInfo} />
                  <Route exact path="/basicinfo" component={DeviceBaseinfo} />
                  <Route exact path="/waterinformation" component={DeviceWaterinformation} />
                  <Route exact path="/installinformation" component={DeviceInstallinformation} />
                  <Route exact path="/equipmentlist" component={DeviceEquipmentlist} />
                  <Route exact path="/usersetting" component={UserprofileSettings} />

                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/forgetpwd" component={ForgetPwd}/>
                </Switch>
              </div>
        </div>
      );
  }
}
export default connect()(AppRoot);
