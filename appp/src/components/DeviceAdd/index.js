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
            <div className="fp_container">
                <div className="fh_container">
                    <div className="pannel">
                        <Flex direction="column" justify="between">
                            <div className="logo" ><img className="logo_img" alt="" src={logo} /></div>
                            <div className="pimg" ><img alt="" src={ping} /></div>
                            <WhiteSpace size="xl" />
                            <div className="add_btn" >
                                <Link to="/wifi"><img src={AddImg} alt="" /><FormattedMessage id="start.add" /></Link>
                            </div>
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceAdd;