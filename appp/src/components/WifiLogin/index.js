import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank, List, InputItem, ActionSheet } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
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
    // 取消 id: form.cancel
    showActionSheet = (title) => {
        const BUTTONS = ['无线网络1', '无线网络2', '无线网络3', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            title: title,
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
        (buttonIndex) => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
        });
    }

    render () {
        const { history, intl } = this.props;
        const title = intl.formatMessage({id: 'start.wifi.select'});

        return (
            <div className="fh_container black_bg">
                <div className="fp_container">
                    <div className="panel">
                        <WingBlank>
                            <Flex direction="column" className="wifi_login container" >
                                <WhiteSpace size="xl" />
                                <div className="logo" >
                                    <div><img src={wifi} alt="" className="logo_img" /></div>
                                </div>
                                <WhiteSpace size="xl" />
                                <Flex justify="start" className="loginform">
                                    <Flex.Item className="itemTitle">
                                        <span><FormattedMessage id="start.wifi" /></span>
                                    </Flex.Item>
                                    <Flex.Item className="itemContent">
                                        <List.Item arrow="horizontal" className="input" onClick={()=>this.showActionSheet(title)}>
                                            <FormattedMessage id="start.wifi.selected" />
                                        </List.Item>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="xl" />
                                <Flex justify="start" className="loginform">
                                    <Flex.Item className="itemTitle">
                                        <span><FormattedMessage id="start.password" /></span>
                                    </Flex.Item>
                                    <Flex.Item className="itemContent">
                                        <InputItem className="input" type="password" 
                                            placeholder={intl.formatMessage({id: 'start.wifi.password.input'})} 
                                        />
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{history.push('/wifisucess')}}>
                                        <FormattedMessage id="start.pass" />
                                    </Button>
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

export default withRouter(injectIntl(WifiLogin));