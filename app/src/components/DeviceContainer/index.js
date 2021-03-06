import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';


import DeviceInfo from '../DeviceInfo';
 

class Setting extends PureComponent{

    render () {
        const { history } = this.props;

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                <FormattedMessage id="device" />
                </NavBar>
                <DeviceInfo />
                </div>
            </div>
        )
    }
}

export default withRouter(Setting);