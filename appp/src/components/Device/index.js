import React, { PureComponent } from 'react';
import { Flex, NavBar, Icon, List, ActionSheet, WingBlank } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';

import './index.less';
import txImg from '../../assets/tx.png';
import basic_img from '../../assets/sy2.png';
import water_img from '../../assets/sy3.png';
import install_img from '../../assets/sy4.png';
import user_img from '../../assets/sy5.png';
 
const Item = List.Item;
const Brief = Item.Brief;

// fix touch to scroll background page on iOS
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Device extends PureComponent{

    showActionSheet = () => {
        const BUTTONS = ['XXX服务商名称', 'YYY服务商名称', 'ZZZ服务商名称', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          title: '选择服务商',
          //message: '描述',
          maskClosable: true,
          'data-seed': 'Id',
          wrapProps,
        },
        (buttonIndex) => {
          console.log(BUTTONS[buttonIndex]);
        });
    }

    render () {
        const { history } = this.props;

        return (
            <div className="black_bg">
            <div className="device">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                设备信息
                </NavBar>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={txImg}
                        multipleLine
                        onClick={this.showActionSheet}
                        >
                        <span style={{color: "#ffffff"}}>{'XXX服务商名称'}<Brief style={{color: "#ffffff"}}>{'TEL:400-000-1234'}</Brief></span>
                    </Item>
                </List>  
                <WingBlank>
                    <p className="tools_title">常用工具</p>
                    <div className="tools_bg">
                        <Flex>
                            <Flex.Item className="tools_con"><Link to="/basic"><div><img src={basic_img} alt="" /><p>基本信息</p></div></Link></Flex.Item>
                            <Flex.Item className="tools_con"><Link to="/water"><div><img src={water_img} alt="" /><p>用水信息</p></div></Link></Flex.Item>
                            <Flex.Item className="tools_con"><Link to="/install"><div><img src={install_img} alt="" /><p>安装环境</p></div></Link></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item className="tools_con"><Link to="#"><div><img src={user_img} alt="" /><p>用户版入口</p></div></Link></Flex.Item>
                            <Flex.Item className="tools_con"></Flex.Item>
                            <Flex.Item className="tools_con"></Flex.Item>
                        </Flex>
                    </div>
                </WingBlank>
            </div></div>
        )
    }
}

export default withRouter(Device);