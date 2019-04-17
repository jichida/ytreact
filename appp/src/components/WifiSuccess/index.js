import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Modal, Flex, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import {set_weui,ui_wifisuccess_tonext,} from '../../actions';
import {seteasylink} from '../../env/easylink';
import './index.less';
import {getMobileOperatingSystem} from '../../util/getos';

import mga from '../../assets/ljimga.png';
import mgb from '../../assets/ljimgb.png';

const alert = Modal.alert;

 class WifiSuccess extends PureComponent{
     state = {
       isIphone: getMobileOperatingSystem()==='iOS'
     }
     onClickNext = (isinternet)=>{
       const { wifiStatus,dispatch, intl} = this.props;
       if(wifiStatus === 1){//
         dispatch(ui_wifisuccess_tonext({isinternet}));
       }
       else{
         alert(intl.formatMessage({id: "form.ok"}), intl.formatMessage({id: 'start.wifi.notconnected.confirm'}), [
          { text: intl.formatMessage({id: "form.cancel"}), onPress: () => console.log('cancel') },
          { text: intl.formatMessage({id: "form.ok"}), onPress: () => {
            dispatch(ui_wifisuccess_tonext({isinternet}));
          }},
        ]);
       }
     }
    render () {
        // -1  未打开  0 打开未连接  1  已连接 2 密码错误}
        const { wifiStatus, intl,wifissid } = this.props;
        let startwifiid = "start.wifi.notconnected";
        if(wifiStatus === -1){
          startwifiid = 'start.wifi.notopened';
        }
        else if(wifiStatus === 0){
          startwifiid = 'start.wifi.notconnected';
        }
        else if(wifiStatus === 1){
          startwifiid = 'start.wifi.succeed';
        }
        else if(wifiStatus === 2){
          startwifiid = 'start.wifi.wrongpassword';
        }
        let showssid = '';
        if(wifiStatus === 1){
          showssid = `(${wifissid})`;
        }
        if(this.state.isIphone){
          return (
              <WingBlank className="black_bg" style={{marginLeft:0, marginRight:0}}>
                  <div className="fp_container">
                      <div className="pannel">
                          <WingBlank>
                              <Flex direction="column" justify="center" className="content container">
                                  <WhiteSpace size="xl" />
                                  <div className="logo" >
                                      <div><img src={mga} alt="" className="logo_img" /></div>
                                      <div className="span_dian"><span></span><span></span><span></span><span></span><span></span></div>
                                      <div><img src={mgb} alt="" className="logo_img" /></div>
                                  </div>
                                  <WhiteSpace size="xl" />
                                  <div className="add_btn" >
                                      <Button type="ghost" className="btn" onClick={()=>{
                                          seteasylink();
                                      }}>
                                          <FormattedMessage id="form.easylink" />
                                      </Button>
                                  </div>
                                  <WhiteSpace size="xl" />
                                  <div className="add_btn" >
                                      <Button type="ghost" className="btn" onClick={()=>{
                                        this.onClickNext(false);
                                        // history.push('/devices')
                                      }}>
                                          <FormattedMessage id="form.next0" />
                                      </Button>
                                  </div>
                                  <WhiteSpace size="xl" />
                                  <div className="add_btn" >
                                      <Button type="ghost" className="btn" onClick={()=>{
                                        this.onClickNext(true);
                                        // history.push('/devices')
                                      }}>
                                          <FormattedMessage id="form.next1" />
                                      </Button>
                                  </div>
                                  <WhiteSpace size="xl" />
                                  <div className="add_btn" >
                                      <Button type="ghost" className="btn" onClick={()=>{
                                        this.props.history.goBack();
                                      }}>
                                          <FormattedMessage id="form.back" />
                                      </Button>
                                  </div>
                              </Flex>
                          </WingBlank>
                      </div>
                  </div>
              </WingBlank>
          )
        }
        return (
            <WingBlank className="black_bg" style={{marginLeft:0, marginRight:0}}>
                <div className="fp_container">
                    <div className="pannel">
                        <WingBlank>
                            <Flex direction="column" justify="center" className="content container">
                                <WhiteSpace size="xl" />
                                <div className="logo" >
                                    <div><img src={mga} alt="" className="logo_img" /></div>
                                    <div className="span_dian"><span></span><span></span><span></span><span></span><span></span></div>
                                    <div><img src={mgb} alt="" className="logo_img" /></div>
                                </div>
                                <WhiteSpace size="xl" />
                                <div className="status" ><FormattedMessage id={startwifiid} />{showssid}</div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      if(wifiStatus === 1){
                                        seteasylink();
                                      }
                                      else{
                                        alert('确认', 'wifi尚未连接,可以手工在设置中连接后再点配网,确实需要点配网吗?', [
                                         { text: '取消', onPress: () => console.log('cancel') },
                                         { text: '确定', onPress: () => {
                                           seteasylink();
                                         }},
                                       ]);
                                     }
                                    }}>
                                        <FormattedMessage id="form.easylink" />
                                    </Button>
                                </div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      this.onClickNext(false);
                                      // history.push('/devices')
                                    }}>
                                        <FormattedMessage id="form.next0" />
                                    </Button>
                                </div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      this.onClickNext(true);
                                      // history.push('/devices')
                                    }}>
                                        <FormattedMessage id="form.next1" />
                                    </Button>
                                </div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      this.props.history.goBack();
                                    }}>
                                        <FormattedMessage id="form.back" />
                                    </Button>
                                </div>
                            </Flex>
                        </WingBlank>
                    </div>
                </div>
            </WingBlank>
        )
    }
}
const mapStateToProps =  ({wifi:{wifiStatus,wifissid}}) =>{
  return {wifiStatus,wifissid};
};
WifiSuccess = connect(mapStateToProps)(WifiSuccess);
export default withRouter(injectIntl(WifiSuccess));
