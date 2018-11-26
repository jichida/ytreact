import React, { PureComponent } from 'react';
import {  List, InputItem, Button, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
// ssid		SSID
// 密码		password
// 动态主机设置协议	DHCP
// IP地址		IP
// 网关		gatewary
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
    gatewary: {
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
          gatewary: createFormField({
                ...props.gatewary,
                value: props.gatewary.value,
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
})((props)=>{
    const { getFieldProps, validateFields } = props.form;

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
                                placeholder="请输入"
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
                                placeholder="请输入"
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
                                placeholder="请输入"
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
                <Item><FormattedMessage id="setting.wifi.gatewary" defaultMessage="网关" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('gatewary',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.gatewary" defaultMessage="网关" />,
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
                                placeholder="请输入"
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
                                placeholder="请输入"
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
                <Button type="ghost" className="btn" onClick={handleSubmit}><FormattedMessage id="submit.save" defaultMessage="保存" /></Button>
            </div>
        </div>
        </React.Fragment>
    )
})

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