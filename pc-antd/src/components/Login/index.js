import React from 'react'
import Login from '../AntdLogin';
import { Alert, Card, Select, Row } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import logo from '../../assets/title.png';
import language_icon from '../../assets/login_iconc.png';

import './index.less';

const { UserName, Password, Submit } = Login;
const { Option } = Select;

class LoginPage extends React.Component {

  state = {
    notice: '',
  }

  onSubmit = (err, values) => {
      this.setState({
        notice: '',
      }, () => {
        if(err){
          this.setState({
              notice: '用户名/密码错误！',
          });
        }
        else {
          console.log(values);
          // values{
          //   username;
          //   password;
          // }
          this.props.history.push('/search');
        }
      });
  }

  handleChange = (value)=>{
    console.log(value);
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
              
            </Row>
            <Row>
              <Login onSubmit={this.onSubmit} className="login">
                  <h1>海诺帝管理系统</h1>
                  {
                      this.state.notice &&
                      <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                  }
                  <UserName name="username" />
                  <Password name="password" />
                  <Submit>登录</Submit>
                  <div className="forget">
                      <Link to="/forget">忘记密码？</Link>
                  </div>
              </Login>
            </Row>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginPage);