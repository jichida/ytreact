import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'react-redux';
import TopNavHeader from '../TopNavHeader';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends PureComponent {


  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };


  // 用户登录信息菜单点击导航
  handleMenuClick = ({ key }) => {
    // const { dispatch } = this.props;

    // if (key === 'logout') {
    //   dispatch({
    //     type: 'login/logout',
    //   });
    // }
  };



  render() {
    const { setting } = this.props;
    const { navTheme, fixedHeader } = setting;
    const width = this.getHeadWidth();
    const HeaderDom = (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onMenuClick={this.handleMenuClick}
            {...this.props}
          />
      </Header>
    );

    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
