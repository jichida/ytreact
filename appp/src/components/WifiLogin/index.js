import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, WhiteSpace, Button, WingBlank, List, InputItem, ActionSheet } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.less';
import {ui_setcurwifi,wifi_getssidlist_request,wifi_setcurwifi_request} from '../../actions';
import wifi from '../../assets/wlimg.png';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class WifiLogin extends PureComponent{
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(wifi_getssidlist_request({}));
    }

    // 取消 id: form.cancel
    showActionSheet = (title) => {
        const {intl,wifilist,wifipassword,dispatch} = this.props;
        dispatch(wifi_getssidlist_request({}));//refresh 
        const canceltext = intl.formatMessage({id: 'form.cancel'});
        let BUTTONS = [...wifilist,canceltext];//"form.cancel"

        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            title: title,
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
        (buttonIndex) => {
          if(buttonIndex !== wifilist.length){
            // debugger;
            dispatch(ui_setcurwifi({ wifissid: wifilist[buttonIndex],wifipassword}));
          }
            // this.setState({ clicked: BUTTONS[buttonIndex] });
        });
    }
    onClickPass =()=>{
      // history.push('/wifisucess')
      const {dispatch,wifissid,wifipassword} = this.props;
      dispatch(wifi_setcurwifi_request({wifissid,wifipassword}));
    }
    handleWifiPasswordChange = (value)=>{
      const {wifissid,dispatch} = this.props;
      dispatch(ui_setcurwifi({ wifissid,wifipassword:value}));
    }
    render () {
        const {  intl,wifissid,wifipassword } = this.props;
        const title = intl.formatMessage({id: 'start.wifi.select'});
        /*
          问题:wifissid如何设置显示？
        */
        let wifiidtxt = wifissid;
        if(wifiidtxt === ''){
          wifiidtxt = intl.formatMessage({id: 'start.wifi.selected'});
        }

        return (
            <div className="fh_container black_bg">
                <div className="fp_container">
                    <div className="pannel">
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
                                        <List.Item arrow="horizontal" className="input"
                                          onClick={()=>this.showActionSheet(title)}>
                                            {wifiidtxt}
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
                                            value={wifipassword}
                                            onChange={this.handleWifiPasswordChange}
                                            placeholder={intl.formatMessage({id: 'start.wifi.password.input'})}
                                        />
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      this.onClickPass();
                                      }
                                    }>
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

const mapStateToProps =  ({wifi:{wifissid,wifipassword,wifilist}}) =>{
  return {wifissid,wifipassword,wifilist};
};
WifiLogin = connect(mapStateToProps)(WifiLogin);
export default withRouter(injectIntl(WifiLogin));
