import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './index.less';

import mga from '../../assets/ljimga.png';
import mgb from '../../assets/ljimgb.png';

 class WifiSuccess extends PureComponent{

    render () {
        const { history } = this.props;
        return (
            <div className="fh_container black_bg">
                <div className="fp_container">
                    <div class="panel">
                        <WingBlank>
                            <Flex direction="column" justify="center" className="content container">
                                <WhiteSpace size="xl" />
                                <div className="logo" >
                                    <div><img src={mga} alt="" className="logo_img" /></div>
                                    <div className="span_dian"><span></span><span></span><span></span><span></span><span></span></div>
                                    <div><img src={mgb} alt="" className="logo_img" /></div>
                                </div>
                                <WhiteSpace size="xl" />
                                <div className="status" >{"连接成功"}</div>
                                <WhiteSpace size="xl" />
                                <div className="add_btn" >
                                    <Button type="ghost" className="btn" onClick={()=>{history.push('/devices')}}>下一步</Button>
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