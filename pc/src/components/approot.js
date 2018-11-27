import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import DeviceInfo from './deviceinfo';
import Globaldistribution from './globaldistribution';
import GlobaldistributionView from './globaldistribution/view.js';
import Index from './index';
import IndexDevice from './index_device';
// import Login from './login/login';
import './css/m2018.css';
import {requireAuthentication} from './requireauthentication';

class AppRoot extends React.Component {
    componentWillMount() {

    }

    componentWillUnmount() {

    }
    render() {
      return (
              <div className="container">
              <div style={{position:'fixed',height: '100%', width: '100%',top: '0px'}}>
              <div style={{
            background: `url(${require("./img/bg2.png")})`,
            backgroundPositionX: 'center',
            backgroundPositionY:'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundColor: '#f9fafb',
            backgroundAttachment: 'fixed',
            height:'100%'
      }}>
                <Switch>
                  <Route exact path="/" component={Index} />

                  <Route exact path="/deviceinfo" component={DeviceInfo} />
                  <Route exact path="/globaldistribution" component={Globaldistribution} />
                  <Route exact path="/globaldistributionview" component={GlobaldistributionView} />
                  <Route exact path="/indexdevice" component={IndexDevice} />

                  {/* <Route path="/login" component={Login}/> */}
                </Switch>
              </div>
              </div>
              </div>
      );
  }
}
export default connect()(AppRoot);
