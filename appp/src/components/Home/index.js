import React, { PureComponent } from 'react';
import { Flex, NavBar, Icon } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';

import Main from '../Main';
import Abnormal from '../Abnormal';
import Performance from '../Performance';

import './index.less';
import '../../assets/wlimg.png';
 

class Home extends PureComponent{

    state = {
        SelectKey: 'home',
    }

    handleClick = ( key ) => {
        this.setState({
            SelectKey: key,
        })
    }

    render () {
        const { history } = this.props;
        const { SelectKey } = this.state;
        let content;
        switch (SelectKey) {
            case 'home':
                content = <Main />;
                break;
            case 'abnormal':
                content = <Abnormal />;
                break;
            case 'performance':
                content = <Performance />;
                break;
            default:
                content = <Main />;
        }

        return (
            <div >
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                    rightContent={[<div key="0" className="nav-wifi-icon"/>]}
                >
                    <Flex style={{width: "100%"}}>
                        <Flex.Item key="name"
                            className={this.state.SelectKey==='home'&&'nav-link-active'} 
                            style={{ textAlign: "center", lineHeight: 2.5 }}
                        >
                            <Link to="#" className="nav-link" onClick={()=>this.handleClick('home')}><b>主页</b></Link>
                        </Flex.Item>
                        <Flex.Item  key="abnormal"
                            className={this.state.SelectKey==='abnormal'&&'nav-link-active'} 
                            style={{ textAlign: "center", lineHeight: 2.5 }}
                        >
                            <Link to="#" className="nav-link" onClick={()=>this.handleClick('abnormal')}><b>异常</b></Link>
                        </Flex.Item>
                        <Flex.Item key="performance"
                            className={this.state.SelectKey==='performance'&&'nav-link-active'} 
                            style={{ textAlign: "center", lineHeight: 2.5 }}
                        >
                            <Link to="#" className="nav-link" onClick={()=>this.handleClick('performance')}><b>性能</b></Link>
                        </Flex.Item>
                    </Flex>
                </NavBar>
                { content }   
            </div>
        )
    }
}

export default withRouter(Home);