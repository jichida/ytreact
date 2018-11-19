import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, WingBlank, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';

import './index.less';
 
// 月用水量（吨）  	quantity
// 用水人数（人）  	persons
// 直饮水点（个） 	 spot
// 水压  	watergage
// 需装增压泵 	booster
// 卫浴间数量 (个）	bathrooms
// 是否分流		shunt
// 原水TDS值(mg/l)	tds
// 原水导电率(us/cm)	conductivity
// 原水硬度(ppm)	hardness
// 原水碱度(ppm)	alkalinity
// ph值		ph
// 用户需求出水TDS值	usertds

const basicData = {
    quantity: {
        value: 10,
    },
    persons: {
        value: 60,
    },
    spot: {
        value: 8,
    },
    watergage: { 
        value: 87.6,
    },
    booster: {
        value: false,
    },
    bathrooms: {
        value: 6,
    },
    shunt: {
        value: true,
    },
    tds: {
        value: 1.02,
    },
    conductivity: {
        value: 1.32,
    },
    hardness: {
        value: 1.62,
    },
    alkalinity: {
        value: 3.02,
    },
    ph: {
        value: 0.02,
    },
    usertds: {
        value: 1.02,
    },
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          quantity: createFormField({
            ...props.quantity,
            value: props.quantity.value,
          }),
          persons: createFormField({
            ...props.persons,
            value: props.persons.value,
          }),
          spot: createFormField({
            ...props.spot,
            value: props.spot.value,
          }),
          watergage: createFormField({
            ...props.watergage,
            value: props.watergage.value,
          }),
          booster: createFormField({
              ...props.booster,
              value: props.booster.value,
          }),
          bathrooms: createFormField({
              ...props.bathrooms,
              value: props.bathrooms.value,
          }),
          shunt: createFormField({
              ...props.shunt,
              value: props.shunt.value,
          }),
          tds: createFormField({
            ...props.tds,
            value: props.tds.value,
          }),
          conductivity: createFormField({
            ...props.conductivity,
            value: props.conductivity.value,
          }),
          hardness: createFormField({
                ...props.hardness,
                value: props.hardness.value,
          }),
          alkalinity: createFormField({
                ...props.alkalinity,
                value: props.alkalinity.value,
          }),
          ph: createFormField({
                ...props.ph,
                value: props.ph.value,
          }),
          usertds: createFormField({
                ...props.usertds,
                value: props.usertds.value,
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
                    placeholder="月用水量（吨）"
                    type="money"
                    {...getFieldProps('quantity',{
                        rules: [{
                            required: true,
                            message: '请输入月用水量（吨）',
                        }],
                    })}
                    extra="吨"
                >月用水量（吨）：</InputItem>
                <InputItem
                    placeholder="请输入用水人数（人）"
                    type="money"
                    {...getFieldProps('persons',{
                        rules: [{
                            required: true,
                            message: '请输入用水人数',
                        }],
                    })}
                    extra="人"
                >用水人数（人）：</InputItem>
                <InputItem
                    placeholder="请输入直饮水点（个）"
                    type="money"
                    {...getFieldProps('spot',{
                        rules: [{
                            required: true,
                            message: '请输入直饮水点',
                        }],
                    })}
                    extra="个"
                >直饮水点（个）：</InputItem>
                <InputItem
                    placeholder="请输入水压"
                    type="money"
                    {...getFieldProps('watergage',{
                        rules: [{
                            required: true,
                            message: '请输入水压',
                        }],
                    })}
                >水压：</InputItem>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('booster', {
                            valuePropName: 'checked',
                        })}
                    />}
                >需装增压泵</List.Item>
                <InputItem
                    type="money"
                    placeholder="请输入卫浴间数量"
                    {...getFieldProps('bathrooms',{
                        rules: [{
                            required: true,
                            message: '请输入卫浴间数量',
                        }],
                    })}
                    extra="个"
                >卫浴间数量(个）：</InputItem>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('shunt', {
                            valuePropName: 'checked',
                        })}
                    />}
                >是否分流</List.Item>
                <InputItem
                    type="money"
                    placeholder="请输入原水TDS值"
                    {...getFieldProps('tds',{
                        rules: [{
                            required: true,
                            message: '请输入原水TDS值',
                        }],
                    })}
                >原水TDS值(mg/l)：</InputItem>
                <InputItem
                    type="money"
                    placeholder="请输入原水导电率"
                    {...getFieldProps('conductivity',{
                        rules: [{
                            required: true,
                            message: '请输入原水导电率',
                        }],
                    })}
                >原水导电率(us/cm)： </InputItem>
                <InputItem
                    type="money"
                    placeholder="请输入原水硬度"
                    {...getFieldProps('hardness',{
                        rules: [{
                            required: true,
                            message: '请输入原水硬度',
                        }],
                    })}
                >原水硬度(ppm)：</InputItem>
                <InputItem
                    type="money"
                    placeholder="请输入原水碱度"
                    {...getFieldProps('alkalinity',{
                        rules: [{
                            required: true,
                            message: '请输入原水碱度',
                        }],
                    })}
                >原水碱度(ppm)：</InputItem>
                <InputItem
                    type="money"
                    placeholder="请输入ph值"
                    {...getFieldProps('ph',{
                        rules: [{
                            required: true,
                            message: '请输入ph值',
                        }],
                    })}
                >ph值：</InputItem>
                <InputItem
                    type="money"
                    placeholder="请输入用户需求出水TDS值"
                    {...getFieldProps('usertds',{
                        rules: [{
                            required: true,
                            message: '请输入用户需求出水TDS值',
                        }],
                    })}
                >用户需求出水TDS值：</InputItem>
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

class DeviceWater extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
    }

    render () {
        const { history } = this.props;

        return (
            <div className="fh_container">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                用水信息
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default withRouter(DeviceWater);