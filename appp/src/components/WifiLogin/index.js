import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank, List, InputItem, ActionSheet } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './index.less';

import wifi from '../../assets/wlimg.png';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class WifiLogin extends PureComponent{

    state = {
        clicked: 0,
    }
    
    showActionSheet = () => {
        const BUTTONS = ['无线网络1', '无线网络2', '无线网络3', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            title: '选择当前网络',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
        (buttonIndex) => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
        });
    }

    render () {
        const { history } = this.props;

        return (
            <div className="fh_container black_bg">
                <div className="fp_container">
                    <div class="panel">
                        <WingBlank>
                            <Flex direction="column" className="wifi_login container" >
                                <WhiteSpace size="xl" />
                                <div className="logo" >
                                    <div><img src={wifi} alt="" className="logo_img" /></div>
                                </div>
                                <WhiteSpace size="xl" />
                                <Flex justify="start" className="loginform">
                                    <Flex.Item className="itemTitle"><span>网络</span></Flex.Item>
                                    <Flex.Item className="itemContent">
                                        <List.Item arrow="horizontal" className="input" onClick={this.showActionSheet}>选择的wifi网络</List.Item>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="xl" />
                                <Flex justify="start" className="loginform">
                                    <Flex.Item className="itemTitle"><span>密码</span></Flex.Item>
                                    <Flex.Item className="itemContent">
                                        <InputItem className="input" type="password" placeholder="请输入WIFI密码" />
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{history.push('/wifisucess')}}>通过</Button>
                                </div>
                                <WhiteSpace size="xl" />
                            </Flex>
                        </WingBlank>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(WifiLogin);