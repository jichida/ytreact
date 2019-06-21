import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd-mobile'
import enUs from 'antd-mobile/lib/locale-provider/en_US'
import './common.less';

// import Index from './Login';
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
import gobal_bg from '../assets/electricbg.png';


class AppRoot extends React.Component {
    componentWillMount() {

    }

    componentWillUnmount() {

    }
    render() {
      return (
        <LocaleProvider locale={this.props.locale === 'en' ? enUs : undefined}>
          <div className="page" style={{backgroundImage: `url(${gobal_bg})`}}>
            <Switch>
              <Route exact path="/" component={requireAuthentication(Home)} />
              <Route exact path="/home" component={requireAuthentication(Home)} />
              <Route exact path="/deviceinfo" component={requireAuthentication(DeviceInfo)} />
              <Route exact path="/basic" component={requireAuthentication(BasicInfo)} />
              <Route exact path="/water" component={requireAuthentication(WaterInfo)} />
              <Route exact path="/install" component={requireAuthentication(InstallInfo)} />
              <Route exact path="/equipmentlist" component={requireAuthentication(List)} />
              <Route exact path="/setting" component={requireAuthentication(Setting)} />
              <Route exact path="/frontfilter" component={requireAuthentication(FrontFilter)} />
              <Route exact path="/afterfilter" component={requireAuthentication(AfterFilter)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/change" component={requireAuthentication(ChangePassword)} />
            </Switch>
          </div>
        </LocaleProvider>
      );
  }
}

const mapStateToProps = ({app: { locale }}) => {
  console.log('locale:', locale)
  return {
    locale
  }
}


export default connect(mapStateToProps)(AppRoot);
