import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, WhiteSpace, Button, WingBlank, List, InputItem, ActionSheet, Checkbox } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.less';
import {wifi_init,ui_setcurwifi,wifi_setcurwifi_request,
  wifi_getssidlist_request,wifi_getssidlist_result,set_weui} from '../../actions';
import {callthen} from '../../sagas/pagination';
// import wifi from '../../assets/wlimg.png';
import { wifi } from './assets'
import {getMobileOperatingSystem} from '../../util/getos';

const AgreeItem = Checkbox.AgreeItem

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

class WifiLogin extends PureComponent{
    state = {
      wificonnected: false,
      isIphone: getMobileOperatingSystem()==='iOS'
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(wifi_init({}));
        // dispatch(wifi_open_reqeust({}));
    }

    // 取消 id: form.cancel
    showActionSheet = (title) => {
        const {intl,wifipassword,dispatch} = this.props;
        dispatch(callthen(wifi_getssidlist_request,wifi_getssidlist_result,{}))
        .then((wifilist)=>{
          // debugger;
          const canceltext = intl.formatMessage({id: 'form.cancel'});
          let wifitxtlist = [];
          for(let i = 0 ;i < wifilist.length; i++){
            wifitxtlist.push(wifilist[i].ssid)
          }
          let BUTTONS = [...wifitxtlist,canceltext];//"form.cancel"

          ActionSheet.showActionSheetWithOptions({
              options: BUTTONS,
              cancelButtonIndex: BUTTONS.length - 1,
              title: title,
              maskClosable: true,
              'data-seed': 'logId',
              // wrapProps,
          },
          (buttonIndex) => {
            if(buttonIndex !== wifilist.length){
              // debugger;
              dispatch(ui_setcurwifi({ wifissid: wifilist[buttonIndex].ssid,
                wifiCipher:wifilist[buttonIndex].wifiCipher,
                wifipassword}));
            }
              // this.setState({ clicked: BUTTONS[buttonIndex] });
          });
        }).catch((e)=>{
          console.log(e);
        });//refresh

    }
    onClickPass =()=>{
      // history.push('/wifisucess')
      const {intl,dispatch,wifissid,wifipassword,wifiCipher} = this.props;
      if(!wifissid || wifissid===''){
        dispatch(set_weui({
          toast:{
          text: intl.formatMessage({id: 'start.wifi.select'}),
          show: true,
          type:'warning'
        }}));
        return;
      }

      dispatch(wifi_setcurwifi_request({wifissid,wifipassword,wifiCipher}));
    }

    handleConnect = () => {
      console.log('iphone connect')
      this.props.history.push('/wifisucess')
    }

    handleWifiPasswordChange = (value)=>{
      const {wifissid,wifiCipher,dispatch} = this.props;
      dispatch(ui_setcurwifi({ wifissid,wifipassword:value,wifiCipher:wifiCipher}));
    }

    handleClickAgreeItem = () => {
      console.log('iphone handleClickAgreeItem')
      // this.props.history.push('prefs:root=WIFI')
      this.setState({wificonnected: !this.state.wificonnected})
    }

    render () {
        const {  intl,wifissid,wifipassword, history } = this.props;
        const { wificonnected, isIphone } = this.state;
        const title = intl.formatMessage({id: 'start.wifi.select'});
        /*
          问题:wifissid如何设置显示？
        */
        let wifiidtxt = wifissid;
        if(wifiidtxt === ''){
          wifiidtxt = intl.formatMessage({id: 'start.wifi.selected'});
        }

        const Android = () => {
          return (
            <React.Fragment>
              <div className="logo" >
                  <div className="logo_img">
                      <img src={wifi} alt=""  />
                  </div>
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
              <WhiteSpace size="xl" style={{ marginBottom: 10}} />
              <div className="add_btn" >
                  <Button type="ghost" className="btn" onClick={()=>{ history.push('/wifisucess')}
                  }>
                      <FormattedMessage id="start.skip" />
                  </Button>
              </div>
            </React.Fragment>
          )
        }

        const Iphone = () => {
          return (
            <React.Fragment>
              <div className="logo" >
                  <div className="logo_img" onClick={()=>this.handleClickAgreeItem()}>
                      <img src={wifi} alt=""  />
                  </div>
              </div>
              <WhiteSpace size="xl" />
              <Flex justify="start" className="loginform">
                  <Flex.Item className="itemTitle"></Flex.Item>
                  <Flex.Item className="itemContent">
                    <AgreeItem checked={wificonnected} onChange={()=>this.setState({wificonnected: !wificonnected})}>
                        <FormattedMessage id="login.wifi.success" />
                    </AgreeItem>
                  </Flex.Item>
              </Flex>
              <WhiteSpace size="xl" style={{ marginBottom: 30}} />
              <div className="add_btn" >
                  <Button type="ghost" className="btn" disabled={!wificonnected} onClick={this.handleConnect}>
                      <FormattedMessage id="login.connect" />
                  </Button>
              </div>
            </React.Fragment>
          )
        }

        return (
            <WingBlank className="black_bg" style={{marginLeft:0, marginRight:0}}>
                <div className="fp_container">
                    <div className="pannel">
                            <Flex direction="column" className="wifi_login container" >
                                <WhiteSpace size="xl" />
                                {/* <div className="logo" >
                                    <div className="logo_img">
                                        <img src={wifi} alt=""  />
                                    </div>
                                </div>
                                <WhiteSpace size="xl" /> */}
                                { isIphone ? <Iphone /> : <Android />}
                                <WhiteSpace size="xl" />
                            </Flex>

                    </div>
                </div>
            </WingBlank>
        )
    }
}

const mapStateToProps =  ({wifi:{wifissid,wifipassword,wifiCipher,wifilist}}) =>{
  return {wifissid,wifipassword,wifiCipher,wifilist};
};

WifiLogin = connect(mapStateToProps)(WifiLogin);
export default withRouter(injectIntl(WifiLogin));
