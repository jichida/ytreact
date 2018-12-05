import React, { PureComponent } from 'react';
import { NavBar, Icon, TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

import system_img from '../../assets/set1.png';
import water_img from '../../assets/set2.png';
import wifi_img from '../../assets/set3.png';
import table_img from '../../assets/set4.png';


import System from '../SettingSystem';
import Inlet from '../SettingInlet';
import Wifi from '../SettingWifi';
import Checklist from '../SettingChecklist'; 
 

class Setting extends PureComponent{

    state = {
        selectedTab: 'system',
    }

    render () {
        const { history } = this.props;

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                <FormattedMessage id="setting" />
                </NavBar>
                <TabBar
                    unselectedTintColor="#ffffff"
                    tintColor="#ffffff"
                    barTintColor="rgba(255, 255, 255, 0.118)"
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        key="system"
                        icon={
                            <div className="tabbar_item">
                                <p><FormattedMessage id="setting.system" /></p>
                                <img src={system_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <p><FormattedMessage id="setting.system" /></p>
                                <img src={system_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selected={this.state.selectedTab === 'system'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'system',
                        });
                        }}
                    >
                        {<System />}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="tabbar_item">
                                <p><FormattedMessage id="setting.water" /></p>
                                <img src={water_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <p><FormattedMessage id="setting.water" /></p>
                                <img src={water_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        key="water"
                        selected={this.state.selectedTab === 'water'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'water',
                        });
                        }}
                    >
                        {<Inlet />}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="tabbar_item">
                                <p><FormattedMessage id="setting.wifi" /></p>
                                <img src={wifi_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <p><FormattedMessage id="setting.wifi" /></p>
                                <img src={wifi_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        key="wifi"
                        selected={this.state.selectedTab === 'wifi'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'wifi',
                        });
                        }}
                    >
                        {<Wifi />}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="tabbar_item">
                                <p><FormattedMessage id="setting.checklist" /></p>
                                <img src={table_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <p><FormattedMessage id="setting.checklist" /></p>
                                <img src={table_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        key="table"
                        selected={this.state.selectedTab === 'table'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'table',
                        });
                        }}
                    >
                        {<Checklist />}
                    </TabBar.Item>
                </TabBar>   
                </div>
            </div>
        )
    }
}

export default withRouter(Setting);