import React,{ Component } from 'react';
import { TabBar } from 'antd-mobile';

import IndexDevice from '../index_device';
import IndexProfile from '../userprofile';

import Tab0Image from './images/icon1.png';
import Tab0ImageOn from './images/icon1_on.png';
import Tab1Image from './images/icon2.png';
import Tab1ImageOn from './images/icon2_on.png';



class TabBarIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            key="indexdevice"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${Tab0Image}) center center /  21px 21px no-repeat `}}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${Tab0ImageOn}) center center /  21px 21px no-repeat `}}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'indexdevice',
              });
            }}
            data-seed="logId"
          >
            <IndexDevice />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${Tab1Image}) center center /  21px 21px no-repeat `}}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${Tab1ImageOn}) center center /  21px 21px no-repeat `}}
              />
            }
            key="indexprofile"
            selected={this.state.selectedTab === 'indexprofile'}
            onPress={() => {
              this.setState({
                selectedTab: 'indexprofile',
              });
            }}
            data-seed="logId1"
          >
            <IndexProfile />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarIndex;
