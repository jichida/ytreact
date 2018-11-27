import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, Switch } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

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
        value: '',
    },
    avoidlight: {
        value: '',
    },
    wall: {
        value: '',
    },
    method: {
        value: '',
    },
    space: { 
        value: '',
    },
    pipe: {
        value: '',
    },
    drainage: {
        value: '',
    },
    pipematerials: {
        value: '',
    },
    wifi: {
        value: '',
    },
    power: {
        value: '',
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
                <Item><FormattedMessage id="install.position" defaultMessage="安装地点" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                                    placeholder={formatMessage({id: "form.input"})}
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
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

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
                    <FormattedMessage id="device.install" />
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default withRouter(DeviceInstall);