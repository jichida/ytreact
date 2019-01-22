import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import IFrame from 'react-iframe';
import './index.less';


class WifiLogin extends PureComponent{

    onClickPass =()=>{
      this.props.history.push('/devices')
    }


    render () {
        const {  intl } = this.props;
        const title = intl.formatMessage({id: 'start.setting'});

        return (
            <WingBlank className="black_bg" style={{marginLeft:0, marginRight:0}}>
                <div className="fp_container">
                    <div className="pannel">
                            <Flex direction="column" className="wifi_frame container" >

                                <WhiteSpace size="xl"></WhiteSpace>
                                <span className="frame-title">{title}</span>
                                <div className="frame" >
                                    <IFrame url="http://10.10.100.254/"
                                        width="100%"
                                        height="100%"
                                        id="frame"
                                        position="relative"
                                    />
                                </div>
                                <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{
                                      this.onClickPass();
                                      }
                                    }>
                                        <FormattedMessage id="form.next" />
                                    </Button>
                                </div>
                                <WhiteSpace size="xl" />
                            </Flex>
                    </div>
                </div>
            </WingBlank>
        )
    }
}

export default withRouter(injectIntl(WifiLogin));
