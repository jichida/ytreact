import React from 'react';
import { TabBar } from 'antd-mobile';

import Home from '../Home';
import Device from '../Device';
import Setting from '../Setting';

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
      <div className="fh_container">
        <TabBar
          barTintColor="rgba(40, 40, 40, 0.8)"
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            key="Home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${i_home}) center center /  21px 21px no-repeat` }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${i_home_on}) center center /  21px 21px no-repeat` }}
            />
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
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${i_device}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${i_device_on}) center center /  21px 21px no-repeat` }}
              />
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
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${i_setting}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${i_setting_on}) center center /  21px 21px no-repeat` }}
              />
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
