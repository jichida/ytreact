import React, { PureComponent } from 'react';
import {  List, InputItem, Button, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
// ssid		SSID
// 密码		password
// 动态主机设置协议	DHCP
// IP地址		IP
// 网关		gateway
// 局域网 		LAN
// 主网域服务器	DNS

const basicData = {
    ssid: {
        value:'',
    },
    password: {
        value: '',
    },
    dhcp: {
        value: '',
    },
    ip: {
        value: '',
    },
    gateway: {
        value: '',
    },
    lan: {
        value: '',
    },
    dns: {
        value: '',
    }
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          ssid: createFormField({
            ...props.ssid,
            value: props.ssid.value,
          }),
          password: createFormField({
            ...props.password,
            value: props.password.value,
          }),
          dhcp: createFormField({
                ...props.dhcp,
                value: props.dhcp.value,
          }),
          ip: createFormField({
                ...props.ip,
                value: props.ip.value,
          }),
          gateway: createFormField({
                ...props.gateway,
                value: props.gateway.value,
          }),
          userssid: createFormField({
                ...props.lan,
                value: props.lan.value,
          }),
          dns: createFormField({
            ...props.dns,
            value: props.dns.value,
      }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { intl: { formatMessage }} = props;

    const handleSubmit = (e)=>{
        e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="setting.wifi.ssid" defaultMessage="WIFI SSID" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('ssid',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.ssid" defaultMessage="WIFI SSID" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.wifi.password" defaultMessage="WIFI 密码" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('password',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.password" defaultMessage="WIFI 密码" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('dhcp', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.wifi.dhcp" defaultMessage="动态主机设置协议" /></List.Item>
                <Item><FormattedMessage id="setting.wifi.ip" defaultMessage="IP地址" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('ip',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.ip" defaultMessage="IP地址" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.wifi.gateway" defaultMessage="网关" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('gateway',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.gateway" defaultMessage="网关" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.wifi.lan" defaultMessage="局域网" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('lan',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.lan" defaultMessage="局域网" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.wifi.dns" defaultMessage="主网域服务器" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('dns',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.dns" defaultMessage="主网域服务器" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}><FormattedMessage id="form.save" defaultMessage="保存" /></Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class Wifi extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
    }

    render () {
        return (
            <div className="sub_setting_bg">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default withRouter(Wifi);