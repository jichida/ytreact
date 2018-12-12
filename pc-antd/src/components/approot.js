import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout.js'
import Search from './Search';
import RegionalDisplay from './RegionalDisplay'; // 区域展示/中国区域展示
import Notice from './Notice'; // 通知公告
import SearchResult from './SearchResult';
import Abnormals from './Abnormals';
import Machines from './Machines'; // 全部机器/异常机器
import Distribution from './Distribution'; // 全球分布
import ActionList from './ActionList';  // 操作指令
import Statistics from './Statistics';  // 数据统计
import DataDetails from './DataDetails'; // 数据详情
import Login from './Login';
import Forget from './ForgetPassword';
import {requireAuthentication} from './requireauthentication';

import './common.less';
import gobal_bg from '../assets/bg2.png'

const Layout = (Component)=>{
  const LayoutComponent = (props)=>{
    return (<BasicLayout><Component {...props}/></BasicLayout>);
  }
  return LayoutComponent;
}

class AppRoot extends React.Component {
    componentWillMount() {

    }

    componentWillUnmount() {

    }
    render() {
      return (
        <div className="global_bg" style={{backgroundImage: `url(${gobal_bg})`}}>
          <Switch>
            <Route exact path="/" component={Login} /> 
            <Route path="/search" component={Layout(Search)} />
            <Route path="/result" component={Layout(SearchResult)} />
            <Route path='/abnormals' component={Layout(Abnormals)} />
            <Route path="/machines" component={Layout(Machines)} /> {/* :param  全部 / 异常 */}
            <Route path="/distribution" component={Layout(Distribution)} />
            <Route path="/statistics" component={Layout(Statistics)} />
            <Route path="/regional" component={Layout(RegionalDisplay)} /> {/* :param  区域 */}
            <Route path="/details" component={Layout(DataDetails)} />
            <Route path="/notice" component={Layout(Notice)} /> 
            <Route path="/actions" component={Layout(ActionList)} />
            <Route path="/login" component={Login}/>
            <Route path="/forget" component={Forget}/>
          </Switch>
        </div>
      );
  }
}
export default connect()(AppRoot);
