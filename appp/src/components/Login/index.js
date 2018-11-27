import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank, InputItem, ActionSheet } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.less';

import logo from '../../assets/logo.png';
import {login_request} from '../../actions';
import {ui_set_language} from '../../actions';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const languages = [
    'English',
    '中文简体',
    '中文繁体',
    '取消',
]

const constrast = {
    English: 'en',
    中文简体: 'zh-cn',
    中文繁体: 'zh-tw'
}

class Login extends PureComponent{

    state = {
        name: '15961125167',
        password: 'admin',
    }

    handleNameChange = (value)=>{
        this.setState({
            name: value,
        })
    }

    handlePasswordChange = (value)=>{
        this.setState({
            password: value,
        })
    }

    handleSubmit = ()=>{
        console.log(`账号：${this.state.name}，密码：${this.state.password}`);
        const {dispatch} = this.props;
        dispatch(login_request({username:this.state.name,password:this.state.password}));
    }

    showActionSheet = () => {
        const {dispatch} = this.props;
        const BUTTONS = languages;
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          message: '选择当前使用的语言',
          maskClosable: true,
          wrapProps,
        },
        (buttonIndex) => {
            if(buttonIndex!==BUTTONS.length -1){
                dispatch(ui_set_language(constrast[BUTTONS[buttonIndex]]));
                console.log(constrast[BUTTONS[buttonIndex]]);
            }
        });
    }

    componentDidMount(){
        this.showActionSheet();
    }

    render () {

        return (
            <div className="fh_container black_bg">
                <div className="fp_container white_bg">
                <WingBlank>
                    <Flex direction="column" className="logincontent" >
                        <WhiteSpace size="xl" />
                        <div className="logo" >
                            <div><img src={logo} alt="" className="logo_img" /></div>
                        </div>
                        <WhiteSpace size="xl" />
                        <Flex justify="start" className="loginform">
                            <Flex.Item className="itemTitle"><span>账号</span></Flex.Item>
                            <Flex.Item className="itemContent">
                                <InputItem
                                    className="input"
                                    placeholder="请输入账号"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="xl" />
                        <Flex justify="start" className="loginform">
                            <Flex.Item className="itemTitle"><span>密码</span></Flex.Item>
                            <Flex.Item className="itemContent">
                                <InputItem
                                    className="input"
                                    type="password"
                                    placeholder="请输入密码"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                        <div className="add_btn" >
                            <Button type="ghost" className="btn" onClick={this.handleSubmit}>登录</Button>
                        </div>
                        <WhiteSpace size="xl" />
                    </Flex>
                </WingBlank>
                </div>
            </div>
        )
    }
}
Login = connect()(Login);
export default withRouter(Login);
