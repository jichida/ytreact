import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl'

import Main from '../Main';

import './index.less';
import '../../assets/wlimg.png';
import {ui_home_selindex} from '../../actions';

class Home extends PureComponent{

    render () {
        const { intl: { formatMessage } } = this.props;


        return (
            <div className="home">
                <NavBar
                    className="nav"
                    rightContent={[<div key="0" className="nav-wifi-icon"/>]}
                >
                { formatMessage({id: "home"})}
                </NavBar>
                <Main />
            </div>
        )
    }
}
const mapStateToProps =  ({app:{hometabindex}}) =>{
  return {curtab:hometabindex};
};
Home = connect(mapStateToProps)(Home);
export default withRouter(injectIntl(Home));
