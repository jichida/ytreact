import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Tabs,  } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl'

import Main from '../Main';
import Abnormal from '../Abnormal';
import Performance from '../Performance';

import './index.less';
import wifi_img from '../../assets/wlimg.png';
import nowifi_img from '../../assets/no-wifi.png';
import {ui_home_selindex} from '../../actions';

class Home extends PureComponent{

    // state = {
    //     SelectKey: 0,
    // }

    // handleClick = ( index ) => {
    //     // this.setState({
    //     //     SelectKey: key,
    //     // })
    //     this.props.dispatch(ui_home_selindex(index));
    // }
    onClickWifi =()=>{
      const {history} = this.props;
      history.push(`/wifi`);
      console.log('onClickWifi');
      // /wifi
    }
    onChangeTab = (index)=>{
      this.props.dispatch(ui_home_selindex(index));
        // this.setState({
        //     SelectKey: index,
        // })
    }

    render () {
        const { history, intl: { formatMessage },wifiStatus } = this.props;
        const { curtab } = this.props;
        let content;
        switch (curtab) {
            case 0:
                content = <Main />;
                break;
            case 1:
                content = <Abnormal />;
                break;
            case 2:
                content = <Performance />;
                break;
            default:
                content = <Main />;
        }

        let tabs = [
            { title:
                <div className={curtab===0 ? "navbar_item_on" : "navbar_item"}>
                    <h3>{formatMessage({id: 'layout.home'})}</h3>
                    <span>{curtab}</span>
                </div>},
            { title:
                <div className={curtab===1 ? "navbar_item_on" : "navbar_item"}>
                    <h3>{formatMessage({id: 'layout.abnormal'})}</h3>
                    <span></span>
                </div> },
            { title:
                <div className={curtab===2 ? "navbar_item_on" : "navbar_item"}>
                    <h3>{formatMessage({id: 'layout.performance'})}</h3>
                    <span></span>
                </div> },
          ];
        const wifiimage = wifiStatus === 1?wifi_img:nowifi_img;
        return (
            <div className="home">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                    // rightContent={[<div key="0" className="nav-wifi-icon" onClick={this.onClickWifi}><img src={wifi_img} alt=''/></div>]}
                    rightContent={[<div key="0" className="nav-wifi-icon" onClick={this.onClickWifi}><img src={wifiimage} alt=''/></div>]}
                >
                    <Tabs
                        tabs={tabs}
                        initialPage={curtab}
                        useOnPan={false}
                        tabBarBackgroundColor="transparent"
                        tabBarUnderlineStyle={{border: 0}}
                        tabBarActiveTextColor="#ffffff"
                        tabBarInactiveTextColorr="#ffffff"
                        onChange={(tab, index)=>this.onChangeTab(index)}
                        tabBarTextStyle={{height:60}}
                    />
                </NavBar>
                { content }
            </div>
        )
    }
}
const mapStateToProps =  ({app:{hometabindex},wifi:{wifiStatus}}) =>{
  return {curtab:hometabindex,wifiStatus};
};
Home = connect(mapStateToProps)(Home);
export default withRouter(injectIntl(Home));
