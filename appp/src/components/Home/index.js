import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import Main from '../Main';
import Abnormal from '../Abnormal';
import Performance from '../Performance';

import './index.less';
import '../../assets/wlimg.png';
import {ui_home_selindex} from '../../actions';

class Home extends PureComponent{

    // state = {
    //     SelectKey: 0,
    // }

    // handleClick = ( index ) => {
    //     // this.setState({
    //     //     SelectKey: key,
    //     // })
    //     this.props.dispatch(ui_home_selindex(index));
    // }

    onChangeTab = (index)=>{
      this.props.dispatch(ui_home_selindex(index));
        // this.setState({
        //     SelectKey: index,
        // })
    }

    render () {
        const { history } = this.props;
        const { curtab } = this.props;
        let content;
        switch (curtab) {
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
                <div className={curtab===0 ? "navbar_item_on" : "navbar_item"}>
                    <h3>主页</h3>
                    <span>{curtab}</span>
                </div>},
            { title:
                <div className={curtab===1 ? "navbar_item_on" : "navbar_item"}>
                    <h3>异常</h3>
                    <span></span>
                </div> },
            { title:
                <div className={curtab===2 ? "navbar_item_on" : "navbar_item"}>
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
                        initialPage={curtab}
                        useOnPan={false}
                        tabBarBackgroundColor="transparent"
                        tabBarUnderlineStyle={{border: 0}}
                        tabBarActiveTextColor="#ffffff"
                        tabBarInactiveTextColorr="#ffffff"
                        onChange={(tab, index)=>this.onChangeTab(index)}
                        tabBarTextStyle={{height:60}}
                    />
                </NavBar>
                { content }
            </div>
        )
    }
}
const mapStateToProps =  ({app:{hometabindex}}) =>{
  return {curtab:hometabindex};
};
Home = connect(mapStateToProps)(Home);
export default withRouter(Home);
