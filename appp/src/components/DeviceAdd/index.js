import React, { PureComponent } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

import logo from '../../assets/logo.png';
import ping from '../../assets/pimg0.png';
import AddImg from '../../assets/addbtn.png';

 class DeviceAdd extends PureComponent{

    render () {
        return (
            <div className="fh_container">
                <div className="fp_container">
                <Flex direction="column" justify="between" className="container">
                    <WhiteSpace size="xl" />
                    <div className="logo" ><img className="logo_img" alt="" src={logo} /></div>
                    <div className="pimg" ><img alt="" src={ping} /></div>
                    <div className="add_btn" >
                        <Link to="/wifi"><img src={AddImg} alt="" /><FormattedMessage id="start.add" /></Link>
                    </div>
                    <WhiteSpace size="xl" />
                </Flex>
                </div>
            </div>
        )
    }
}

export default DeviceAdd;