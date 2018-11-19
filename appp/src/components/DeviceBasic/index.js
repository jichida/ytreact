import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button,  WingBlank } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';

import './index.less';
 
const basicData = {
    username: {
        value: 'benjycui',
    },
    userphone: {
        value: '1234567890',
    },
    useraddress: {
        value: '南京市玄武区珠江路1#',
    },
    useproperty: { //使用性质
        value: ['家用'],
    },
    building: { // 房屋类型
        value: ['住宅'],
    },
    floor: { // 楼层
        value: 1,
    },
    model: { //预装型号
        value: ['XXX型'],
    }
}

const useproperty = [
    {
        label: '商用',
        value: '商用',
    },
    {
        label: '家用',
        value: '家用',
    }
]

const building = [
    {
        label: '店铺',
        value: '店铺',
    },
    {
        label: '住宅',
        value: '住宅',
    }
]

const model = [
    {
        label: 'XXX型',
        value: 'XXX型',
    },
    {
        label: 'YYY型',
        value: 'YYY型',
    }
]

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          username: createFormField({
            ...props.username,
            value: props.username.value,
          }),
          userphone: createFormField({
            ...props.userphone,
            value: props.userphone.value,
          }),
          useraddress: createFormField({
            ...props.useraddress,
            value: props.useraddress.value,
          }),
          useproperty: createFormField({
            ...props.useproperty,
            value: props.useproperty.value,
          }),
          building: createFormField({
              ...props.building,
              value: props.building.value,
          }),
          floor: createFormField({
              ...props.floor,
              value: props.floor.value,
          }),
          model: createFormField({
              ...props.model,
              value: props.model.value,
          })
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
                    placeholder="请输入用户名"
                    {...getFieldProps('username',{
                        rules: [{
                            required: true,
                            message: '请输入用户名',
                        }],
                    })}
                >用户名：</InputItem>
                <InputItem
                    placeholder="请输入联系方式"
                    {...getFieldProps('userphone',{
                        rules: [{
                            required: true,
                            message: '请输入联系方式',
                        }],
                    })}
                >联系方式：</InputItem>
                <InputItem
                    placeholder="请输入用户地址"
                    {...getFieldProps('useraddress',{
                        rules: [{
                            required: true,
                            message: '请输入用户地址',
                        }],
                    })}
                >用户地址：</InputItem>
                <Picker
                    data={useproperty}
                    cols={1}
                    {...getFieldProps('useproperty')}
                    >
                    <List.Item arrow="horizontal">使用性质：</List.Item>
                </Picker>
                <Picker
                    data={building}
                    cols={1}
                    {...getFieldProps('building')}
                    >
                    <List.Item arrow="horizontal">房屋类型：</List.Item>
                </Picker>
                <InputItem
                    type="number"
                    placeholder="请输入楼层高度"
                    {...getFieldProps('floor',{
                        rules: [{
                            required: true,
                            message: '请输入楼层高度',
                        }],
                    })}
                    extra="楼"
                >楼层高度：</InputItem>
                <Picker
                    data={model}
                    cols={1}
                    {...getFieldProps('model')}
                    >
                    <List.Item arrow="horizontal">预装型号：</List.Item>
                </Picker>
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

class DeviceBasic extends PureComponent{

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
                设备信息
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default withRouter(DeviceBasic);