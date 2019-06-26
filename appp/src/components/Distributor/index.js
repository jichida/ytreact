import React from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon } from 'antd-mobile';
import Markdown from 'react-markdown'
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { jsCallPhone } from '../../env/callphone';
import './index.less';

import phoneImg from '../../assets/phone.png'

class Index extends React.Component{

    constructor(props) {
        super(props)
    }

    render () {
        const { history, content, phone } = this.props;

        return (
            <div className="fp_container black_bg">
                <div className="sub_bg">
                    <NavBar
                        className="nav"
                        icon={<Icon type="left" />}
                        onLeftClick={() => history.goBack()}
                    >
                        <FormattedMessage id="device.distributor" defaultMessage="经销商详情" />
                    </NavBar>
                    <div className="introduce">
                        <div className="intro-content">
                            <Markdown source={content} className="md" />
                        </div>
                        <div className="phone" onClick={() => {jsCallPhone(phone);}}>
                            <div className="phone-icon"><img src={phoneImg} alt="" /></div>
                            <div className="number">电话：{phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps =  (state) =>{
    const content = 'distributor introduce'
    const phone = '123-123-123'
    return { content, phone };
};

export default connect(mapStateToProps)(withRouter(Index));
