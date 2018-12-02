import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
const basicData = {
    frontfilter: {
        value: '',
    },
    host: {
        value: '',
    },
    afterfilter: {
        value: '',
    },
    configuration: { //其他配置
        value: [],
    },
    others: { //其他
        value: '',
    }
}

const configuration = [
    {
        label: '商用',
        value: '商用',
    },
    {
        label: '家用',
        value: '家用',
    }
]


const others = [
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
          frontfilter: createFormField({
            ...props.frontfilter,
            value: props.frontfilter.value,
          }),
          host: createFormField({
            ...props.host,
            value: props.host.value,
          }),
          afterfilter: createFormField({
            ...props.afterfilter,
            value: props.afterfilter.value,
          }),
          configuration: createFormField({
            ...props.configuration,
            value: props.configuration.value,
          }),
          others: createFormField({
              ...props.others,
              value: props.others.value,
          })
        };
    }
})(withRouter((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { history } = props;

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
                <Item><FormattedMessage id="equipment.frontfilter" defaultMessage="前置滤芯" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('frontfilter',{
                                    rules: [{
                                        required: true,
                                    message: <FormattedMessage id="equipment.frontfilter" defaultMessage="前置滤芯" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.host" defaultMessage="主机" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('host',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.host" defaultMessage="主机" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('afterfilter',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.configuration" defaultMessage="其他配置" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={configuration}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('configuration')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.others" defaultMessage="其他" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('others',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.others" defaultMessage="其他" />,
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
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class EquipmentList extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
    }

    render () {
        const { history } = this.props;

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="equipment.title" defaultMessage="设备清单" />
                </NavBar>
                <div className="sub_setting_bg">
                { <RenderForm {...basicData} {...this.props} onSubmit={this.handleSubmit} />}
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EquipmentList);
