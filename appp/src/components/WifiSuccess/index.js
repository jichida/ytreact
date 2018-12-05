import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

import mga from '../../assets/ljimga.png';
import mgb from '../../assets/ljimgb.png';

 class WifiSuccess extends PureComponent{

    render () {
        const { history } = this.props;
        return (
            <div className="fh_container black_bg">
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
                                <div className="status" ><FormattedMessage id="start.wifi.succeed" /></div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{history.push('/devices')}}>
                                        <FormattedMessage id="form.next" />
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

export default withRouter(WifiSuccess);
