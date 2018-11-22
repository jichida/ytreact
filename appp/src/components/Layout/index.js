import React from 'react';
import { TabBar } from 'antd-mobile';

import Home from '../Home';
import Device from '../Device';
import Setting from '../Setting';

import './index.less';

import i_home from '../../assets/tab/icon1.png';
import i_home_on from '../../assets/tab/icon1_on.png';
import i_device from '../../assets/tab/icon2.png';
import i_device_on from '../../assets/tab/icon2_on.png';
import i_setting from '../../assets/tab/icon3.png';
import i_setting_on from '../../assets/tab/icon3_on.png';

class Layout extends React.PureComponent {

  state = {
      selectedTab: 'Home',
  }

  render() {
    return (
      <div className="fh_container fp_container layout_bg">
        <TabBar
          barTintColor="#ffffff28"
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            key="Home"
            icon={
              <div className="navbar_item">
                  <img src={i_home} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selectedIcon={
              <div className="navbar_item_on">
                  <img src={i_home_on} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selected={this.state.selectedTab === 'Home'}
            onPress={() => {
              this.setState({
                selectedTab: 'Home',
              });
            }}
          >
            {<Home />}
          </TabBar.Item>
          <TabBar.Item
            key="Device"
            icon={
              <div className="navbar_item">
                  <img src={i_device} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selectedIcon={
              <div className="navbar_item_on">
                  <img src={i_device_on} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selected={this.state.selectedTab === 'Device'}
            onPress={() => {
              this.setState({
                selectedTab: 'Device',
              });
            }}
          >
            {<Device />}
          </TabBar.Item>
          <TabBar.Item
            key="Setting"
            icon={
              <div className="navbar_item">
                  <img src={i_setting} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selectedIcon={
              <div className="navbar_item_on">
                  <img src={i_setting_on} alt="" className="navbar_icon" />
                  <span></span>
              </div>
            }
            selected={this.state.selectedTab === 'Setting'}
            onPress={() => {
              this.setState({
                selectedTab: 'Setting',
              });
            }}
          >
            {<Setting />}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Layout;
