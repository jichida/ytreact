import React, { PureComponent } from 'react';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;
const Brief = Item.Brief;
 
// 设备编号			deviceid
// 购买日期			buydate
// 安装日期			installdate
// 安装人员			installer
// 选择时区			timezone		
// 选择日期			sdate
// 选择时间			stime
// 出水水质（ppm)		quality
// 前置滤芯1			frontfilter1
// 前置滤芯2
// 前置滤芯3
// 后置滤芯1			afterfilter
// 后置滤芯2
// 后置滤芯3
// 废水阀泄压 reset
// 重置并重启系统 reset
// 重置时间 reset
// 恢复出厂设置 reset
// 发送设备运行记录 reset
// 休眠  true|false		dormancy
// 休眠开始时间		dormancystart
// 休眠结束时间		dormancyend

const basicData = {
    deviceid: {
        value: '',
    },
    buydate: {
        value: '',
    },
    installdate: {
        value: '',
    },
    installer: {
        value: '白漆',
    },
    timezone: {
        value: moment.now().timezone,
    },
    sdate: {
        value: '',
    },
    stime: {
        value: '',
    },
    quality: { 
        value: 5,
    },
    frontfilter1: {
        value: 'PP滤芯',
    },
    frontfilter2: {
        value: '',
    },
    frontfilter3: {
        value: '滤芯',
    },
    afterfilter1: {
        value: 'PP滤芯',
    },
    afterfilter2: {
        value: '',
    },
    afterfilter3: {
        value: '',
    },
    dormancy: {
        value: false,
    },
    dormancystart: {
        value: '',
    },
    dormancyend: {
        value: '',
    },
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          deviceid: createFormField({
            ...props.deviceid,
            value: props.deviceid.value,
          }),
          buydate: createFormField({
            ...props.buydate,
            value: props.buydate.value,
          }),
          installdate: createFormField({
            ...props.installdate,
            value: props.installdate.value,
          }),
          installer: createFormField({
            ...props.installer,
            value: props.installer.value,
          }),
          timezone: createFormField({
            ...props.timezone,
            value: props.timezone.value,
          }),
          sdate: createFormField({
            ...props.sdate,
            value: props.sdate.value,
          }),
          stime: createFormField({
            ...props.stime,
            value: props.stime.value,
          }),
          quality: createFormField({
            ...props.quality,
            value: props.quality.value,
          }),
          frontfilter1: createFormField({
              ...props.frontfilter1,
              value: props.frontfilter1.value,
          }),
          frontfilter2: createFormField({
            ...props.frontfilter2,
            value: props.frontfilter2.value,
          }),
          frontfilter3: createFormField({
            ...props.frontfilter3,
            value: props.frontfilter3.value,
          }),
          afterfilter1: createFormField({
            ...props.afterfilter1,
            value: props.afterfilter1.value,
          }),
          afterfilter2: createFormField({
            ...props.afterfilter2,
            value: props.afterfilter2.value,
          }),
          afterfilter3: createFormField({
            ...props.afterfilter3,
            value: props.afterfilter3.value,
          }),
          dormancy: createFormField({
            ...props.dormancy,
            value: props.dormancy.value,
          }),
          dormancystart: createFormField({
            ...props.dormancystart,
            value: props.dormancystart.value,
          }),
          dormancyend: createFormField({
            ...props.dormancyend,
            value: props.dormancyend.value,
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
                <Item arrow="horizontal"><FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />
                    <Brief>
                        <div className="item_children">
                        <InputItem
                            // placeholder={<FormattedMessage id="setting.system.scan" defaultMessage="扫一扫" />}
                            placeholder= "扫一扫"
                            {...getFieldProps('deviceid',{
                                rules: [{
                                    required: true,
                                    message: <FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />,
                                }],
                            })}
                        />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.buydate" defaultMessage="购买日期" />
                    <Brief>
                        <div className="item_children">
                        <DatePicker
                            mode="date"
                            extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                            {...getFieldProps('buydate')}
                            >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.installdate" defaultMessage="安装日期" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="date"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('installdate')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.installer" defaultMessage="安装人员" />
                    <Brief>
                        <div className="item_children">                
                        <InputItem
                            placeholder={<FormattedMessage id="setting.system.installer" defaultMessage="安装人员" />}
                            {...getFieldProps('installer',{
                                rules: [{
                                    required: true,
                                    message: <FormattedMessage id="setting.system.installer" defaultMessage="安装人员" />,
                                }],
                            })}
                        ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item arrow="horizontal"><FormattedMessage id="setting.system.timezone" defaultMessage="选择时区" />
                    <Brief>
                        <div className="item_children">   
                        <InputItem
                            placeholder={<FormattedMessage id="setting.system.timezone" defaultMessage="选择时区" />}
                            {...getFieldProps('timezone')}
                        ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.sdate" defaultMessage="选择日期" />
                    <Brief>
                        <div className="item_children">
                        <DatePicker
                            mode="date"
                            extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                            {...getFieldProps('sdate')}
                            >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.stime" defaultMessage="选择时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('stime')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" />}
                                {...getFieldProps('quality',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" />,
                                    }],
                                })}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.frontfilter1" defaultMessage="前置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.frontfilter1" defaultMessage="前置滤芯1" />}
                                {...getFieldProps('frontfilter1')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.frontfilter2" defaultMessage="前置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.frontfilter2" defaultMessage="前置滤芯2" />}
                                {...getFieldProps('frontfilter2')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.frontfilter3" defaultMessage="前置滤芯3" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.frontfilter3" defaultMessage="前置滤芯3" />}
                                {...getFieldProps('frontfilter3')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.afterfilter1" defaultMessage="后置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.afterfilter1" defaultMessage="后置滤芯1" />}
                                {...getFieldProps('afterfilter1')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.afterfilter2" defaultMessage="后置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.afterfilter2" defaultMessage="后置滤芯2" />}
                                {...getFieldProps('afterfilter2')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.afterfilter3" defaultMessage="后置滤芯3" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={<FormattedMessage id="setting.system.afterfilter3" defaultMessage="后置滤芯3" />}
                                {...getFieldProps('afterfilter3')}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.decompression" defaultMessage="废水阀泄压" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resetsystem" defaultMessage="重置并重启系统" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resettime" defaultMessage="重置时间" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.restore" defaultMessage="恢复出厂设置" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.send" defaultMessage="发送设备运行记录" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('dormancy', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" /></List.Item>
                <Item><FormattedMessage id="setting.system.dormancystart" defaultMessage="休眠开始时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('dormancystart')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.dormancyend" defaultMessage="休眠开始时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('dormancyend')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <WingBlank className="submit_zone" style={{padding: '30px 0px'}}>
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
})

class SettingSystem extends PureComponent{

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

export default SettingSystem;