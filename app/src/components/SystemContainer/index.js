import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';


import System from '../System';
 

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
                <FormattedMessage id="setting" />
                </NavBar>
                <System />
                </div>
            </div>
        )
    }
}

export default withRouter(Setting);