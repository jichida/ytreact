import React from 'react'
import Login from '../AntdLogin';
import { Alert, Card, Select, Row } from 'antd';

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
      this.setState({
        notice: '',
      }, () => {
        if(!err){
            if(values.password !== values.confirm){
                this.setState({
                    notice: '新密码与确认的密码不区配！',
                });
            }
            else {
                console.log(values);
                // {mobile: "13861271530", captcha: "1234", password: "1234", confirm: "1234"}
            }
        }
      });
  }

  handleChange = (value)=>{
    console.log(value);
  }

  handleGetCaptcha = ()=>{
      console.log('发送验证码！')
  }


  render() {
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
                  <Option value="简体中文">简体中文</Option>
                  <Option value="繁体中文">繁体中文</Option>
                  <Option value="English">English</Option>
                </Select>
              </div>
            </Row>
            <Row>
              <Login onSubmit={this.onSubmit} className="login">
                  {
                      this.state.notice &&
                      <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                  }
                  <Mobile name="mobile"  placeholder="手机号" />
                  <Captcha name="captcha"  placeholder="验证码" onGetCaptcha={this.handleGetCaptcha} />
                  <Password name="password" placeholder="新密码" />
                  <Password name="confirm" placeholder="再次输入新密码" />
                  <Submit>重设密码</Submit>
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

export default ForgetPassword;