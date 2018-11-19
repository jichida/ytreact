import React, { PureComponent } from 'react';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import './index.less';

 
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
        value: '房间',
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
                <InputItem
                    placeholder="设备编号"
                    {...getFieldProps('deviceid',{
                        rules: [{
                            required: true,
                            message: '请输入设备编号',
                        }],
                    })}
                >设备编号：</InputItem>
                <DatePicker
                    mode="date"
                    {...getFieldProps('buydate')}
                    >
                    <List.Item arrow="horizontal">购买日期</List.Item>
                </DatePicker>
                <DatePicker
                    mode="date"
                    {...getFieldProps('installdate')}
                    >
                    <List.Item arrow="horizontal">安装日期</List.Item>
                </DatePicker>
                <InputItem
                    placeholder="安装人员"
                    {...getFieldProps('installer',{
                        rules: [{
                            required: true,
                            message: '请输入安装人员',
                        }],
                    })}
                >安装人员：</InputItem>
                <InputItem
                    placeholder="时区"
                    {...getFieldProps('timezone')}
                >时区：</InputItem>
                <DatePicker
                    mode="date"
                    {...getFieldProps('sdate')}
                    >
                    <List.Item arrow="horizontal">选择日期</List.Item>
                </DatePicker>
                <DatePicker
                    mode="time"
                    {...getFieldProps('stime')}
                    >
                    <List.Item arrow="horizontal">选择时间</List.Item>
                </DatePicker>
                <InputItem
                    placeholder="出水水质"
                    {...getFieldProps('quality',{
                        rules: [{
                            required: true,
                            message: '请输入出水水质',
                        }],
                    })}
                >出水水质：</InputItem>
                <InputItem
                    type="money"
                    placeholder="滤芯"
                    {...getFieldProps('frontfilter1')}
                >前置滤芯1：</InputItem>
                <InputItem
                    type="money"
                    placeholder="滤芯"
                    {...getFieldProps('frontfilter2')}
                >前置滤芯2：</InputItem>
                <InputItem
                    placeholder="滤芯"
                    {...getFieldProps('frontfilter3')}
                >前置滤芯3： </InputItem>
                <InputItem
                    placeholder="滤芯"
                    {...getFieldProps('afterfilter1')}
                >后置滤芯1</InputItem>
                <InputItem
                    placeholder="滤芯"
                    {...getFieldProps('afterfilter2')}
                >后置滤芯2</InputItem>
                <InputItem
                    placeholder="滤芯"
                    {...getFieldProps('afterfilter3')}
                >后置滤芯3</InputItem>
                <List.Item
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >重置</Button>
                            </div>
                        }
                >废水阀泄压</List.Item>
                <List.Item
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn">重置</Button>
                            </div>
                        }
                >重置并重启系统</List.Item>
                <List.Item
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn">重置</Button>
                            </div>
                        }
                >重置时间</List.Item>
                <List.Item
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn">重置</Button>
                            </div>
                        }
                >恢复出厂设置</List.Item>
                <List.Item
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn">发送</Button>
                            </div>
                        }
                >发送设备运行记录</List.Item>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('dormancy', {
                            valuePropName: 'checked',
                        })}
                    />}
                >休眠</List.Item>
                <DatePicker
                    mode="time"
                    {...getFieldProps('dormancystart')}
                    >
                    <List.Item arrow="horizontal">休眠开始时间</List.Item>
                </DatePicker>
                <DatePicker
                    mode="time"
                    {...getFieldProps('dormancyend')}
                    >
                    <List.Item arrow="horizontal">休眠开始时间</List.Item>
                </DatePicker>
            </List>
        </form>
        <WingBlank style={{marginTop: 30}}>
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>保存</Button>
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
            <div className="container">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default SettingSystem;