import React, { PureComponent } from 'react';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import Main from '../Main';
import Abnormal from '../Abnormal';
import Performance from '../Performance';

import './index.less';
import '../../assets/wlimg.png';


class Home extends PureComponent{

    state = {
        SelectKey: 0,
    }

    handleClick = ( key ) => {
        this.setState({
            SelectKey: key,
        })
    }

    hanleTabClick = (index)=>{
        this.setState({
            SelectKey: index,
        })
    }

    render () {
        const { history } = this.props;
        const { SelectKey } = this.state;
        let content;
        switch (SelectKey) {
            case 0:
                content = <Main />;
                break;
            case 1:
                content = <Abnormal />;
                break;
            case 2:
                content = <Performance />;
                break;
            default:
                content = <Main />;
        }

        let tabs = [
            { title: 
                <div className={SelectKey===0 ? "navbar_item_on" : "navbar_item"}>
                    <h3>主页</h3>
                    <span>{SelectKey}</span>
                </div>},
            { title: 
                <div className={SelectKey===1 ? "navbar_item_on" : "navbar_item"}>
                    <h3>异常</h3>
                    <span></span>
                </div> },
            { title: 
                <div className={SelectKey===2 ? "navbar_item_on" : "navbar_item"}>
                    <h3>性能</h3>
                    <span></span>
                </div> },
          ];

        return (
            <div className="home">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                    rightContent={[<div key="0" className="nav-wifi-icon"/>]}
                >
                    <Tabs
                        tabs={tabs}
                        initialPage={0} 
                        useOnPan={false} 
                        tabBarBackgroundColor="transparent"
                        tabBarUnderlineStyle={{border: 0}}
                        tabBarActiveTextColor="#ffffff"
                        tabBarInactiveTextColorr="#ffffff"
                        onTabClick={(tab, index)=>this.hanleTabClick(index)} 
                        tabBarTextStyle={{height:60}}
                    />
                </NavBar>
                { content }   
            </div>
        )
    }
}

export default withRouter(Home);