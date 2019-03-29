import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Tabs, Popover } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl'

import Main from '../Main';
import Abnormal from '../Abnormal';
import Performance from '../Performance';

import './index.less';
import wifi_img from '../../assets/wlimg.png';
import nowifi_img from '../../assets/no-wifi.png';
import connected_img from '../../assets/connnected.png';
import disconnect_img from '../../assets/disconnnected.png';
import {ui_home_selindex} from '../../actions';
import {ui_set_language} from '../../actions';

const constrast = {
    'EN': 'en',
    '简': 'zh-cn',
    '繁': 'zh-tw'
}

const lanString = {
    'en': 'EN',
    'zh-cn': '简',
    'zh-tw': '繁'
}

const Item = Popover.Item

class Home extends PureComponent{

    state = {
        visible: false,
        language: 'cn'
    }

    onClickWifi =()=>{
      const {history} = this.props;
      history.push(`/wifi`);
      console.log('onClickWifi');
    }

    onChangeTab = (index)=>{
      this.props.dispatch(ui_home_selindex(index));
    }

    handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      }

      onSelect = (opt) => {
        console.log(opt.props.value);
        this.props.dispatch(ui_set_language(constrast[opt.props.value]))
        this.setState({
          visible: false
        });
      }

    render () {
        const { history, intl: { formatMessage },wifiStatus, tcpconnected, locale } = this.props;
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

        let connectStatusImg = disconnect_img
        if(tcpconnected) {
            connectStatusImg = connected_img
        } else {
            connectStatusImg = disconnect_img
        }
        return (
            <div className="home">
                <NavBar
                    className="nav"
                    leftContent={
                        <Popover mask
                          visible={this.state.visible}
                          placement = "bottomLeft"
                          overlay={[
                            (<Item key="4" value="简" data-seed="logId">中文简体</Item>),
                            (<Item key="5" value="繁">中文繁体</Item>),
                            (<Item key="6" value="EN">EN</Item>),
                          ]}
                          align={{
                            overflow: { adjustY: 30, adjustX: 30 },
                            offset: [10, 30],
                          }}
                          onVisibleChange={this.handleVisibleChange}
                          onSelect={this.onSelect}
                        >
                          <div>
                            {lanString[locale]}
                          </div>
                        </Popover>
                      }
                    rightContent={[
                        <div key="0" className="nav-wifi-icon"><img src={connectStatusImg} alt=''/></div>,
                        <div key="1" className="nav-wifi-icon" onClick={this.onClickWifi}><img src={wifiimage} alt=''/></div>
                    ]}
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
const mapStateToProps =  ({app:{hometabindex, tcpconnected},wifi:{wifiStatus}, app:{locale}}) =>{
  return {curtab:hometabindex, tcpconnected, wifiStatus, locale};
};
Home = connect(mapStateToProps)(Home);
export default withRouter(injectIntl(Home));
