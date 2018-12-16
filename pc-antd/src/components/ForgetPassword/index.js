import React from 'react'
import { connect } from 'react-redux';
import Login from '../AntdLogin';
import { Alert, Card, Select, Row } from 'antd';
import {sendauth_request,sendauth_result,findpwd_request} from '../../actions';
import {ui_set_language} from '../../actions';
import {callthen} from '../../sagas/pagination';
import { injectIntl } from 'react-intl';
import logo from '../../assets/title.png';
import language_icon from '../../assets/login_iconc.png';

import './index.less';
const { Mobile, Captcha, Password, Submit } = Login;
const { Option } = Select;

class ForgetPassword extends React.Component {

  state = {
    notice: '',
  }

  onSubmit = (err, values) => {
      const {dispatch} = this.props;
      this.setState({
        notice: '',
      }, () => {
        if(!err){
            if(values.password !== values.confirm){
                this.setState({
                    notice: this.props.intl.formatMessage({id: 'user.password.confirm.err'}),
                });
            }
            else {
                console.log(values);
                dispatch(findpwd_request({
                    username:values.mobile,
                    authcode:values.captcha,
                    password:values.password
                }));
                // {mobile: "13861271530", captcha: "1234", password: "1234", confirm: "1234"}
            }
        }
      });
  }

  handleChange = (value)=>{
    console.log(value);
    const {dispatch} = this.props;
    dispatch(ui_set_language(value));

  }

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch(callthen(sendauth_request,sendauth_result,{
            username:values.mobile,
            reason:'findpwd'
          }))
            .then(resolve)
            .catch(reject);
        }
      });
    });

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <React.Fragment>
        <Row>
          <div className="login_logo">
            <img src={logo} alt="" />
          </div>
        </Row>
        <Row>
          <Card className="login_panel">
            <Row>
              <div className="languages">
                <img src={language_icon} alt="" />
                <Select defaultValue="简体中文" className="select" style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="zh-cn">简体中文</Option>
                  <Option value="zh-tw">繁体中文</Option>
                  <Option value="en">English</Option>
                </Select>
              </div>
            </Row>
            <Row>
              <Login onSubmit={this.onSubmit}
                className="login"
                ref={form => {
                  this.loginForm = form;
                }}
              >
                  {
                      this.state.notice &&
                      <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                  }
                  <Mobile name="mobile"  placeholder={formatMessage({id: 'user.phone'})} />
                  <Captcha name="captcha"  placeholder={formatMessage({id: 'user.captcha'})} buttonText={formatMessage({id: 'user.captcha.get'})} onGetCaptcha={this.onGetCaptcha} />
                  <Password name="password" placeholder={formatMessage({id: 'user.password.new'})} />
                  <Password name="confirm" placeholder={formatMessage({id: 'user.password.confirm'})} />
                  <Submit>{formatMessage({id: 'user.password.reset'})}</Submit>
                  <div className="forget">
                  </div>
              </Login>
            </Row>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}
ForgetPassword = connect()(ForgetPassword);
export default injectIntl(ForgetPassword);
