import React from 'react';
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import Home from '../Home';
import Device from '../Device';

import './index.less';

import i_home from '../../assets/tab/icon1.png';
import i_home_on from '../../assets/tab/icon1_on.png';
import i_device from '../../assets/tab/icon4.png';
import i_device_on from '../../assets/tab/icon4_on.png';
import {ui_main_selindex} from '../../actions';

class Layout extends React.PureComponent {

  // state = {
  //     selectedTab: 'Home',
  // }
  onChangeTab = (index)=>{
    this.props.dispatch(ui_main_selindex(index));
      // this.setState({
      //     SelectKey: index,
      // })
  }
  render() {
    const {curtab} = this.props;
    return (
      <div className="fh_container fp_container layout_bg">
        <TabBar
          barTintColor="#000000e3"
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
            selected={curtab === 0}
            onPress={() => {
              this.onChangeTab(0);
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
            selected={curtab === 1}
            onPress={() => {
              this.onChangeTab(1);
            }}
          >
            {<Device />}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
const mapStateToProps =  ({app:{maintabindex}}) =>{
  return {curtab:maintabindex};
};
Layout = connect(mapStateToProps)(Layout);
export default Layout;
