import React from 'react'
import Login from '../AntdLogin';
import { connect } from 'react-redux';
import { Alert, Card, Select, Row } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import logo from '../../assets/title.png';
import language_icon from '../../assets/login_iconc.png';
import {login_request} from '../../actions';
import {ui_set_language} from '../../actions';

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
        if(!!err){
          this.setState({
              notice: this.props.intl.formatMessage({id: 'user.login.err'}),
          });
        }
        else {
          console.log(values);
          const {dispatch} = this.props;
          dispatch(login_request({username:values.username,password:values.password}));

          // values{
          //   username;
          //   password;
          // }
          // this.props.history.push('/search');
        }
      });
  }

  handleChange = (value)=>{
    console.log(value);
    const {dispatch} = this.props;
    dispatch(ui_set_language(value));
  }


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

            </Row>
            <Row>
              <Login onSubmit={this.onSubmit} className="login">
                  <h1>{formatMessage({id: 'app.name'})}</h1>
                  {
                      this.state.notice &&
                      <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                  }
                  <UserName name="username" />
                  <Password name="password" />
                  <Submit>{formatMessage({id: 'user.login'})}</Submit>
                  <div className="forget">
                      <Link to="/forget">{formatMessage({id: 'user.forget'})}</Link>
                  </div>
              </Login>
            </Row>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}

LoginPage = connect()(LoginPage);
export default withRouter(injectIntl(LoginPage));
