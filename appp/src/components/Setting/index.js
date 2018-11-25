import React, { PureComponent } from 'react';
import { NavBar, Icon, TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './index.less';

import system_img from '../../assets/set1.png';
import water_img from '../../assets/set2.png';
import wifi_img from '../../assets/set3.png';
import table_img from '../../assets/set4.png';
import system_img_selected from '../../assets/set1_1.png';
import water_img_selected from '../../assets/set2_1.png';
import wifi_img_selected from '../../assets/set3_1.png';
import table_img_selected from '../../assets/set4_1.png';

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
                设置
                </NavBar>
                <TabBar
                    unselectedTintColor="#ffffff"
                    tintColor="#ffffff"
                    barTintColor="#ffffff1e"
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        key="system"
                        icon={
                            <div className="navbar_item">
                                <p>系统设置</p>
                                <img src={system_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="navbar_item_on">
                                <p>系统设置</p>
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
                            <div className="navbar_item">
                                <p>进水设定</p>
                                <img src={water_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="navbar_item_on">
                                <p>进水设定</p>
                                <img src={system_img} alt="" className="navbar_icon" />
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
                            <div className="navbar_item">
                                <p>网络</p>
                                <img src={wifi_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="navbar_item_on">
                                <p>网络</p>
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
                            <div className="navbar_item">
                                <p>安装检查表</p>
                                <img src={table_img} alt="" className="navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="navbar_item_on">
                                <p>安装检查表</p>
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