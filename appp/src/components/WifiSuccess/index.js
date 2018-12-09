import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {ui_wifisuccess_tonext} from '../../actions';
import './index.less';

import mga from '../../assets/ljimga.png';
import mgb from '../../assets/ljimgb.png';

 class WifiSuccess extends PureComponent{

    render () {
        ///0为打开未连接  -1  未打开  1  已连接 2 密码错误}
        const { wifiStatus,dispatch } = this.props;
        let startwifiid = "start.wifi.succeed";
        if(wifiStatus === -1){
          startwifiid = 'start.wifi.notconnected';
        }
        else if(wifiStatus === 0){
          startwifiid = 'start.wifi.notopened';
        }
        else if(wifiStatus === 1){
          startwifiid = 'start.wifi.succeed';
        }
        else if(wifiStatus === 2){
          startwifiid = 'start.wifi.wrongpassword';
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
                                <div className="status" ><FormattedMessage id={startwifiid} /></div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      dispatch(ui_wifisuccess_tonext({}));
                                      // history.push('/devices')
                                    }}>
                                        <FormattedMessage id="form.next" />
                                    </Button>
                                </div>
                                <WhiteSpace size="xl" />
                            </Flex>
                        </WingBlank>
                    </div>
                </div>
            </WingBlank>
        )
    }
}
const mapStateToProps =  ({wifi:{wifiStatus}}) =>{
  return {wifiStatus};
};
WifiSuccess = connect(mapStateToProps)(WifiSuccess);
export default withRouter(WifiSuccess);
