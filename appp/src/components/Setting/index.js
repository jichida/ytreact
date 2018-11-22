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
            <div className="setting_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                设置
                </NavBar>
                <TabBar
                    unselectedTintColor="#ffffff"
                    tintColor="#1796d5"
                    barTintColor="#ffffff18"
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        title="系统设置"
                        key="system"
                        icon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${system_img}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        selectedIcon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${system_img_selected}) center center /  35px 35px no-repeat` }}
                            />
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
                        icon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${water_img}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        selectedIcon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${water_img_selected}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        title="进水设定"
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
                        icon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${wifi_img}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        selectedIcon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${wifi_img_selected}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        title="网络"
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
                        icon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${table_img}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        selectedIcon={<div style={{
                            width: '40px',
                            height: '40px',
                            background: `url(${table_img_selected}) center center /  35px 35px no-repeat` }}
                            />
                        }
                        title="安装检查表"
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
        )
    }
}

export default withRouter(Setting);