import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import Captcha from '../Captcha';
import {sendauth_request,sendauth_result,findpwd_request} from '../../actions';
import {callthen} from '../../sagas/pagination';
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

class ForgetPassword extends PureComponent{

    handleSubmit = (e)=>{
        // e.preventDefault();
        const {dispatch} = this.props;
        this.props.form.validateFields((err, values)=>{
            if(!err){
                console.log(values);
                dispatch(findpwd_request({
                    username:values.deviceid,
                    authcode:values.verification,
                    password:values.pwdconfirm
                }));
                // {
                // deviceid: ""
                // pwdconfirm: ""
                // pwdnew: ""
                // verification: ""
                // }
            }
        })
    }

    onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      const {dispatch} = this.props;
      this.props.form.validateFields(['deviceid'], {}, (err, values) => {
        if (err) {
            Toast.fail(this.props.intl.formatMessage({id: 'login.inputdeviceid'}));
            reject();
        } else {
          dispatch(callthen(sendauth_request,sendauth_result,{
            username:values.deviceid,
            reason:'findpwd'
          })).then(()=>{
            resolve();
          }).catch((e)=>{
            reject();
          });
        //   dispatch({
        //     type: 'login/getCaptcha',
        //     payload: values.mobile,
        //   })
        //     .then(resolve)
        //     .catch(reject);
        }
      });
    });

    onPasswordBlur = (value)=> {
        const { intl } = this.props;
        if(!value){
            Toast.info(intl.formatMessage({id: 'login.inputpassword'}));
        }
        else{
            if(value.length<6){
                Toast.info(intl.formatMessage({id: 'login.inputpwdLess'}));
            }
        }
    }

    onConfirmBlur = (value)=>{
        const { intl } = this.props;
        const { getFieldValue } = this.props.form;
        if(!value){
            Toast.info(intl.formatMessage({id: 'login.inputpwdconfirm'}));
        }
        else{
            let pwd = getFieldValue('pwdnew');
            if(value!==pwd){
                Toast.info(intl.formatMessage({id: 'login.pwdconfirmerr'}));
            }
        }
    }


    render () {
        const { history, intl, form } = this.props;
        const { getFieldProps } = form;

        return (
            <div className="black_bg">
            <div className="fp_container white2_bg">
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="login.forget" />
                </NavBar>
                <WhiteSpace style={{backgroundColor: '#000'}} />
                <React.Fragment>
                    <List>
                        <Item><FormattedMessage id="login.deviceid" />
                            <Brief>
                                <div className="item_children">
                                    <InputItem
                                        placeholder={intl.formatMessage({id: 'login.inputdeviceid'})}
                                        {...getFieldProps('deviceid',{
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="login.inputdeviceid" />,
                                            }],
                                        })}
                                    />
                                </div>
                            </Brief>
                        </Item>
                        <Item><FormattedMessage id="login.verification" />
                            <Brief>
                                <div className="item_children">
                                    <InputItem
                                        placeholder={intl.formatMessage({id: 'login.inputverification'})}
                                        {...getFieldProps('verification',{
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="login.inputverification" />,
                                            }],
                                        })}
                                        extra={<div className="add_btn" style={{width: 90, display: 'inline-block', padding:5}} >
                                                <Captcha  size="small" type="ghost" cssName="btn" countDown={10} onGetCaptcha={this.onGetCaptcha} />
                                            </div>
                                        }
                                    />
                                </div>
                            </Brief>
                        </Item>
                        <Item><FormattedMessage id="login.password" />
                            <Brief>
                                <div className="item_children">
                                    <InputItem
                                        type="password"
                                        placeholder={intl.formatMessage({id: 'login.inputpassword'})}
                                        onBlur={this.onPasswordBlur}
                                        {...getFieldProps('pwdnew',{
                                            rules:  [{
                                                required: true,
                                                message: <FormattedMessage id="login.inputpassword" />,
                                            }],
                                        })}
                                    />
                                </div>
                            </Brief>
                        </Item>
                        <Item><FormattedMessage id="login.pwdconfirm" />
                            <Brief>
                                <div className="item_children">
                                    <InputItem
                                        type="password"
                                        onBlur={this.onConfirmBlur}
                                        placeholder={intl.formatMessage({id: 'login.inputpwdconfirm'})}
                                        {...getFieldProps('pwdconfirm',{
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="login.inputpwdconfirm" />,
                                            }],
                                        })}
                                    />
                                </div>
                            </Brief>
                        </Item>
                    </List>
                    <div className="submit_zone">
                        <div className="add_btn" >
                            <Button type="ghost" className="btn" onClick={this.handleSubmit}>
                                <FormattedMessage id="form.save" defaultMessage="保存" />
                            </Button>
                        </div>
                    </div>
                </React.Fragment>
            </div></div></div>
        )
    }
}
ForgetPassword = connect()(ForgetPassword);
export default withRouter(createForm()(injectIntl(ForgetPassword)));
