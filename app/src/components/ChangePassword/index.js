import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import {set_weui,changepwd_request} from '../../actions';
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

class ChangePassword extends PureComponent{

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                console.log(values);
                const payload = {
                  password:values.oldpassword,
                  passwordA:values.pwdnew,
                  passwordB:values.pwdconfirm
                }
                //<----验证-----
                let texterr;
                if(!payload.password){
                  texterr = '旧密码不能为空';
                }
                if(!texterr){
                  if(!payload.passwordA){
                    texterr = '新密码不能为空';
                  }
                }
                if(!texterr){
                  if(!payload.passwordB){
                    texterr = '请再输入新密码';
                  }
                }
                if(!texterr){
                  if(payload.passwordA !== payload.passwordB){
                    texterr = '两次密码输入不一致';
                  }
                }
                if(!!texterr){
                  this.props.dispatch(set_weui({
                    toast:{
                      text:texterr,
                      type:'warning'
                  }
                  }));
                  return;
                }
                //<----验证结束-----
                // this.props.dispatch(set_uiapp({ ispoppwd: false }));
                this.props.dispatch(changepwd_request(payload));
                // {oldpassword: "", pwdnew: "", pwdconfirm: ""}
            }
        })
    }

    onOldBlur = (value)=>{
        const { intl } = this.props;
        if(!value){
            Toast.info(intl.formatMessage({id: 'login.inputpassword'}));
        }
    }

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
                    <FormattedMessage id="login.changepassword" />
                </NavBar>
                <WhiteSpace style={{backgroundColor: '#000'}} />
                <React.Fragment>
                    <List>
                        <Item><FormattedMessage id="login.oldpassword" />
                            <Brief>
                                <div className="item_children">
                                    <InputItem
                                        type="password"
                                        onBlur={this.onOldBlur}
                                        placeholder={intl.formatMessage({id: 'login.inputoldpassword'})}
                                        {...getFieldProps('oldpassword',{
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="login.inputoldpassword" />,
                                            }],
                                        })}
                                        extra={<div className="add_btn" style={{width: 90, display: 'inline-block', padding:5}} >
                                                <Button size="small" type="ghost" className="btn" onClick={()=>{history.push('/forget')}}>
                                                    <FormattedMessage id="login.forget" />
                                                </Button>
                                            </div>
                                        }
                                    />
                                </div>
                            </Brief>
                        </Item>
                        <Item><FormattedMessage id="login.newpassword" />
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

export default withRouter(createForm()(injectIntl(ChangePassword)));
