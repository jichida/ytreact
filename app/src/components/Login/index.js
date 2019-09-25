import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Button, WingBlank, InputItem, ActionSheet, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashMap from 'lodash.map'
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';
import config from '../../env/config';
import logo from '../../assets/logo.png';
import {login_request} from '../../actions';
import {ui_set_language} from '../../actions';

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

// console.log(config.)

// const languages = [
//     'English',
//     '中文简体',
//     '中文繁體',
//     '取消',
// ]

const constrast = {
    English: 'en',
    中文简体: 'zh-cn',
    中文繁體: 'zh-tw'
}

class Login extends PureComponent{

  constructor(props) {
      super(props);
      this.state = {
          name: props.username,
          password: props.password,
          loginHistory: JSON.parse(localStorage.getItem('login_history'))
      };
      // console.log(this.state);
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
        // this.props.history.push('/home');
        const {dispatch} = this.props;
        dispatch(login_request({username:this.state.name,password:this.state.password}));
    }

    showActionSheet = () => {
        // const {dispatch} = this.props;
        const {intl,dispatch} = this.props;
        const languages = [
            'English',
            '中文简体',
            '中文繁體',
            intl.formatMessage({id:'form.cancel'}),
        ];

        const BUTTONS = languages;
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: 1,
          message: intl.formatMessage({id:`login.selectlanguage`}),
          maskClosable: true,
          // wrapProps,
        },
        (buttonIndex) => {
            if(buttonIndex!==BUTTONS.length -1){
                dispatch(ui_set_language(constrast[BUTTONS[buttonIndex]]));
                console.log(constrast[BUTTONS[buttonIndex]]);
            }
        });
    }

    showLoginHistory = () => {
        const { intl } = this.props
        const { loginHistory } = this.state
        const loginNames = []
        lodashMap(loginHistory, (item) => {
            loginNames.push(item.username)
        })
        loginNames.push(intl.formatMessage({id:'form.cancel'}))

        const BUTTONS = loginNames

        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: 1,
          message: intl.formatMessage({id:`login.history`}),
          maskClosable: true,
          // wrapProps,
        },
        (buttonIndex) => {
            if(buttonIndex!==BUTTONS.length -1){
                const { username, password } = loginHistory[buttonIndex]
                this.setState({
                    name: username,
                    password: password
                })
            }
        });
    }

    componentDidMount(){
        console.log(`componentDidMount 账号：${this.state.name}，密码：${this.state.password}`);

        this.showActionSheet();
    }

    render () {

        const {intl, history} = this.props;
        console.log(`render 账号：${this.state.name}，密码：${this.state.password}`);

        return (
            <WingBlank className="black_bg" style={{marginLeft:0, marginRight:0}}>
                <div className="fp_container white_bg">
                <WingBlank>
                    <Flex direction="column" className="logincontent" >
                        <WhiteSpace size="xl" />
                        <div className="logo" >
                            <div><img src={logo} alt="" className="logo_img" /></div>
                        </div>
                        <WhiteSpace size="xl" />
                        <Flex justify="start" className="loginform">
                            <div className="itemTitle">
                                <span><FormattedMessage id="login.deviceid" defaultMessage="设备编号" /></span>
                            </div>
                            <div className="itemContent">
                                <InputItem
                                    className="input"
                                    placeholder={intl.formatMessage({id:`login.inputaccount`})}
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </div>
                            {!!this.state.loginHistory&&<div className="login-load"><Icon type="down" size="large" style={{color: '#fff'}} onClick={this.showLoginHistory} /></div>}
                            
                        </Flex>
                        <WhiteSpace size="xl" />
                        <Flex justify="start" className="loginform">
                            <div className="itemTitle"><span><FormattedMessage id="login.password" defaultMessage="密码" /></span></div>
                            <div className="itemContent">
                                <InputItem
                                    className="input"
                                    type="password"
                                    placeholder={intl.formatMessage({id:`login.inputpassword`})}
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            {/* <div className="itemPassword">
                                <div className="forget_btn">
                                    <Button className="btn" type="ghost" size="small" onClick={()=>{history.push('/forget')}}>
                                        <FormattedMessage id="login.forget" defaultMessage="忘记密码" />
                                    </Button>
                                </div>
                            </div> */}
                        </Flex>
                        <WhiteSpace size="xl" style={{ marginBottom: 30}} />
                        <div className="add_btn" >
                            <Button type="ghost" className="btn" onClick={this.handleSubmit}><FormattedMessage id="login.login" defaultMessage="登录" /></Button>
                        </div>
                        <WhiteSpace size="xl" />
                          <div style={{color:'#FFFFFF'}}>{config.appversion}</div>
                    </Flex>
                </WingBlank>
                </div>
            </WingBlank>
        )
    }
}

const mapStateToProps =  ({userlogin:{username,password,loginsuccess}}) =>{
  return {username,password,loginsuccess};
};
Login = connect(mapStateToProps)(Login);
export default withRouter(injectIntl(Login));
