import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, WingBlank, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
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
                <Item><FormattedMessage id="install.position" defaultMessage="安装地点" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.position" defaultMessage="安装地点" />}
                                    {...getFieldProps('position',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.position" defaultMessage="安装地点" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('avoidlight', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="install.avoidlight" defaultMessage="是否避光" /></List.Item>
                <Item><FormattedMessage id="install.wall" defaultMessage="墙体材料" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.wall" defaultMessage="墙体材料" />}
                                    {...getFieldProps('wall',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.wall" defaultMessage="墙体材料" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.method" defaultMessage="主机安装方式" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.method" defaultMessage="主机安装方式" />}
                                    {...getFieldProps('method',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.method" defaultMessage="主机安装方式" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.space" defaultMessage="安装空间" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.space" defaultMessage="安装空间" />}
                                    {...getFieldProps('space',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.space" defaultMessage="安装空间" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.pipe" defaultMessage="进水管径大小" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.pipe" defaultMessage="进水管径大小" />}
                                    {...getFieldProps('pipe',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.pipe" defaultMessage="进水管径大小" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.drainage" defaultMessage="排水距离" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.drainage" defaultMessage="排水距离" />}
                                    {...getFieldProps('drainage',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.drainage" defaultMessage="排水距离" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.pipematerials" defaultMessage="管路材质" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={<FormattedMessage id="install.pipematerials" defaultMessage="管路材质" />}
                                    {...getFieldProps('pipematerials',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="install.pipematerials" defaultMessage="管路材质" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('wifi', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="install.wifi" defaultMessage="有无WIFI" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('power', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="install.power" defaultMessage="有无电源" /></List.Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="submit.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
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
            <div className="fp_container sub_bg">
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