import React, { PureComponent } from 'react';
import {  NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Setting from '../SettingSystem/Normal';

import './index.less';

let initHeight;

class DeviceBasic extends PureComponent{

    constructor(props) {
        super(props);
        initHeight = window.innerHeight;
    }

    render () {
        const { history}  = this.props;

        return (
            <div className="fp_container sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}                
                >
                    <FormattedMessage id="device.setting" defaultMessage="设备设置" />
                </NavBar>
                <Setting />
            </div>
        )
    }
}


export default withRouter(DeviceBasic);
