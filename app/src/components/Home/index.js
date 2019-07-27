import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl'
import { Popover } from 'antd-mobile'

import Main from '../Main';

import './index.less';
import '../../assets/wlimg.png';
import {ui_home_selindex, ui_set_language} from '../../actions';

const Item = Popover.Item

const lanString = {
    'en': 'EN',
    'zh-cn': '简',
    'zh-tw': '繁'
}

class Home extends PureComponent{
    state = {
        visible: false,
        language: 'zh-cn'
    }

    handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
    }

    onSelect = (opt) => {
        console.log(opt.props.value);
        this.props.dispatch(ui_set_language(opt.props.value))
        this.setState({
            visible: false
        });
    }

    render () {
        const { intl: { formatMessage }, locale } = this.props;

        return (
            <div className="home">
                <NavBar
                    className="nav"
                    leftContent={
                        <Popover mask
                          visible={this.state.visible}
                          placement = "bottomLeft"
                          overlay={[
                            (<Item key="4" value="zh-cn" data-seed="logId">中文简体</Item>),
                            (<Item key="5" value="zh-tw">中文繁體</Item>),
                            (<Item key="6" value="en">English</Item>),
                          ]}
                          align={{
                            overflow: { adjustY: 30, adjustX: 30 },
                            offset: [10, 30],
                          }}
                          onVisibleChange={this.handleVisibleChange}
                          onSelect={this.onSelect}
                        >
                          <div>
                            {lanString[locale]}
                          </div>
                        </Popover>
                      }
                    // rightContent={[<div key="0" className="nav-wifi-icon"/>]}
                >
                { formatMessage({id: "home"})}
                </NavBar>
                <div className="home-content">
                    <Main />
                </div>
                
            </div>
        )
    }
}
const mapStateToProps =  ({app:{hometabindex, locale}}) =>{
  return {
      curtab:hometabindex,
      locale
    };
};
Home = connect(mapStateToProps)(Home);
export default withRouter(injectIntl(Home));
