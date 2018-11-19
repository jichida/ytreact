import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, WingBlank, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';

import './index.less';
 
// 安装地点		position
// 是否避光		avoidlight
// 墙体材料		wall
// 主机安装方式	method
// 安装空间		space
// 进水管径大小	pipe
// 排水距离		drainage
// 管路材质		pipematerials
// 有无WIFI		wifi
// 有无电源		power

const basicData = {
    position: {
        value: '房间',
    },
    avoidlight: {
        value: false,
    },
    wall: {
        value: '白漆',
    },
    method: {
        value: '落地',
    },
    space: { 
        value: 5,
    },
    pipe: {
        value: 16,
    },
    drainage: {
        value: 8,
    },
    pipematerials: {
        value: '钢管',
    },
    wifi: {
        value: true,
    },
    power: {
        value: true,
    },
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          position: createFormField({
            ...props.position,
            value: props.position.value,
          }),
          avoidlight: createFormField({
            ...props.avoidlight,
            value: props.avoidlight.value,
        }),
          wall: createFormField({
            ...props.wall,
            value: props.wall.value,
          }),
          method: createFormField({
            ...props.method,
            value: props.method.value,
          }),
          space: createFormField({
            ...props.space,
            value: props.space.value,
          }),
          pipe: createFormField({
              ...props.pipe,
              value: props.pipe.value,
          }),
          drainage: createFormField({
            ...props.drainage,
            value: props.drainage.value,
          }),
          pipematerials: createFormField({
            ...props.pipematerials,
            value: props.pipematerials.value,
          }),
          wifi: createFormField({
            ...props.wifi,
            value: props.wifi.value,
          }),
          power: createFormField({
            ...props.power,
            value: props.power.value,
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
                    placeholder="安装地点"
                    {...getFieldProps('position',{
                        rules: [{
                            required: true,
                            message: '请输入安装地点',
                        }],
                    })}
                >安装地点：</InputItem>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('avoidlight', {
                            valuePropName: 'checked',
                        })}
                    />}
                >是否避光</List.Item>
                <InputItem
                    placeholder="墙体材料"
                    {...getFieldProps('wall',{
                        rules: [{
                            required: true,
                            message: '请输入墙体材料',
                        }],
                    })}
                >墙体材料：</InputItem>
                <InputItem
                    placeholder="主机安装方式"
                    {...getFieldProps('method',{
                        rules: [{
                            required: true,
                            message: '请输入主机安装方式',
                        }],
                    })}
                >主机安装方式：</InputItem>
                <InputItem
                    placeholder="安装空间"
                    {...getFieldProps('space',{
                        rules: [{
                            required: true,
                            message: '请输入安装空间',
                        }],
                    })}
                    extra="平方米"
                >安装空间：</InputItem>
                <InputItem
                    type="money"
                    placeholder="进水管径大小"
                    {...getFieldProps('pipe',{
                        rules: [{
                            required: true,
                            message: '请输入进水管径大小',
                        }],
                    })}
                    extra="厘米"
                >进水管径大小(个）：</InputItem>
                <InputItem
                    type="money"
                    placeholder="排水距离"
                    {...getFieldProps('drainage',{
                        rules: [{
                            required: true,
                            message: '请输入排水距离',
                        }],
                    })}
                    extra="米"
                >排水距离：</InputItem>
                <InputItem
                    placeholder="管路材质"
                    {...getFieldProps('pipematerials',{
                        rules: [{
                            required: true,
                            message: '请输入管路材质',
                        }],
                    })}
                >管路材质： </InputItem>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('wifi', {
                            valuePropName: 'checked',
                        })}
                    />}
                >有无WIFI</List.Item>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('power', {
                            valuePropName: 'checked',
                        })}
                    />}
                >有无电源</List.Item>
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

class DeviceInstall extends PureComponent{

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
                安装环境
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default withRouter(DeviceInstall);