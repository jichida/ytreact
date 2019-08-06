import React, { PureComponent } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

import system_img from '../../assets/set1.png';
import water_img from '../../assets/set2.png';
import connected_img from '../../assets/connnected.png';
import disconnect_img from '../../assets/disconnnected.png';
import list_img from '../../assets/sy7.png';
// import wifi_img from '../../assets/set3.png';
// import table_img from '../../assets/set4.png';


import System from '../SettingSystem/index';
import Filter from '../SettingFilter'
import Inlet from '../SettingInlet';
// import Wifi from '../SettingWifi';
// import Checklist from '../SettingChecklist';

// const isDirect = true;
// const isNormal = false;


class Setting extends PureComponent{

    state = {
        selectedTab: 'system',
    }

    render () {
         const { tcpconnected } = this.props;
        let connectStatusImg = disconnect_img
        if(tcpconnected) {
            connectStatusImg = connected_img
        } else {
            connectStatusImg = disconnect_img
        }

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => history.goBack()}
                    rightContent={[
                        <div key="0" className="nav-wifi-icon"><img src={connectStatusImg} alt=''/></div>,
                    ]}
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
                                <div><FormattedMessage id="setting.system" /></div>
                                <img src={system_img} alt="" className="device_navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <div><FormattedMessage id="setting.system" /></div>
                                <img src={system_img} alt="" className="device_navbar_icon" />
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
                        {/* {<System />} */}
                    </TabBar.Item>
                    <TabBar.Item
                        key="filter"
                        icon={
                            <div className="tabbar_item">
                                <div><FormattedMessage id="form.equip.filter" /></div>
                                <img src={list_img} alt="" className="device_navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <div><FormattedMessage id="form.equip.filter" /></div>
                                <img src={list_img} alt="" className="device_navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selected={this.state.selectedTab === 'filter'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'filter',
                        });
                        }}
                    >
                        {/* {<Filter />} */}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="tabbar_item">
                                <div><FormattedMessage id="setting.water" /></div>
                                <img src={water_img} alt="" className="device_navbar_icon" />
                                <span></span>
                            </div>
                        }
                        selectedIcon={
                            <div className="tabbar_item_on">
                                <div><FormattedMessage id="setting.water" /></div>
                                <img src={water_img} alt="" className="device_navbar_icon" />
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
                        {/* {<Inlet />} */}
                    </TabBar.Item>
                    {/* <TabBar.Item
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
                    </TabBar.Item> */}
                    {/* <TabBar.Item
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
                    </TabBar.Item> */}
                </TabBar>
                { this.state.selectedTab === 'system' && <System />}
                { this.state.selectedTab === 'filter' && <Filter />}
                { this.state.selectedTab === 'water' && <Inlet />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ app: { tcpconnected } }) => {
    return { tcpconnected }
}
Setting = connect(mapStateToProps)(Setting);

export default withRouter(Setting);
