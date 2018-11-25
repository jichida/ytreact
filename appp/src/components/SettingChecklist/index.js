import React, { PureComponent } from 'react';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker, WhiteSpace } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;
const Brief = Item.Brief;
 
// 滤芯已冲洗	washed
// 进水压力已符合标准	uptostandard
// 旁通已关闭	bypassclosed
// 系统无泄漏	noleakage
// WIFI已连接	wificonnected
// APP已设置		appset

const checkData = {
    washed: {
        value: true,
    },
    uptostandard: {
        value: true,
    },
    bypassclosed: {
        value: true,
    },
    noleakage: {
        value: true,
    },
    wificonnected: {
        value: true,
    },
    appset: {
        value: true,
    },
}

const RenderCheckForm = createForm({
    mapPropsToFields(props) {
        return {
          washed: createFormField({
            ...props.washed,
            value: props.washed.value,
          }),
          uptostandard: createFormField({
            ...props.uptostandard,
            value: props.uptostandard.value,
          }),
          bypassclosed: createFormField({
            ...props.bypassclosed,
            value: props.bypassclosed.value,
          }),
          noleakage: createFormField({
            ...props.noleakage,
            value: props.noleakage.value,
          }),
          wificonnected: createFormField({
            ...props.wificonnected,
            value: props.wificonnected.value,
          }),
          appset: createFormField({
            ...props.appset,
            value: props.appset.value,
          }),
        };
    }
})((props)=>{
    const { getFieldProps, validateFields } = props.form;

    const { onEnable } = props;

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
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('washed', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.washed" defaultMessage="滤芯已冲洗" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('uptostandard', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.uptostandard" defaultMessage="进水压力已符合标准" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('bypassclosed', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.bypassclosed" defaultMessage="旁通已关闭" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('noleakage', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.noleakage" defaultMessage="系统无泄漏" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('wificonnected', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.wificonnected" defaultMessage="WIFI已连接" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('appset', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.appset" defaultMessage="APP已设置" /></List.Item>
            </List>
        </form>
        <WingBlank  className="submit_zone dual_btn">
            <div className="add_btn_left" style={{display: 'inline-block'}} >
                <Button type="ghost" className="btn">
                    <FormattedMessage id="submit.decompression" defaultMessage="系统泄压" />
                </Button>
            </div>
            <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
            <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                <Button type="ghost" className="btn" onClick={onEnable}>
                    <FormattedMessage id="submit.enable" defaultMessage="启用" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
})


// 出水流量正常			discharge
// 设备已调试			debugged
// 出水水质正常			quality
// 设备已交付使用			delivered
// 拍摄安装图，用以备份存档（至少上传4张）	picture

const resultData = {
    discharge: {
        value: true,
    },
    debugged: {
        value: true,
    },
    quality: {
        value: true,
    },
    delivered: {
        value: true,
    },
    picture: {
        value: true,
    },
    appset: {
        value: true,
    },
}

const RenderResultForm = createForm({
    mapPropsToFields(props) {
        return {
          discharge: createFormField({
            ...props.discharge,
            value: props.discharge.value,
          }),
          debugged: createFormField({
            ...props.debugged,
            value: props.debugged.value,
          }),
          quality: createFormField({
            ...props.quality,
            value: props.quality.value,
          }),
          delivered: createFormField({
            ...props.delivered,
            value: props.delivered.value,
          }),
          picture: createFormField({
            ...props.picture,
            value: props.picture.value,
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
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('discharge', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.discharge" defaultMessage="滤芯已冲洗" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('debugged', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.debugged" defaultMessage="进水压力已符合标准" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('quality', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.quality" defaultMessage="旁通已关闭" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('delivered', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.delivered" defaultMessage="系统无泄漏" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('picture', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.checklist.picture" defaultMessage="WIFI已连接" /></List.Item>
            </List>
        </form>
        <WingBlank className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn">
                    <FormattedMessage id="submit.ok" defaultMessage="OK" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
})

class SettingChecklist extends PureComponent{

    state = {
        checked: false,
    }

    handleSubmit = (values)=>{
        console.log(values);
    }

    handleEnable = ()=>{
        this.setState({
            checked: true,
        })
    }

    render () {

        return (
            <div className="fh_container">
            <div className="fp_container">
            <div className="sub_setting_bg">
                { this.state.checked ? 
                    <RenderResultForm {...resultData} onSubmit={this.handleSubmit} />
                    : <RenderCheckForm {...checkData} onSubmit={this.handleSubmit} onEnable={this.handleEnable} />
                }
            </div></div></div>
        )
    }
}

export default SettingChecklist;