import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 阀门	valve
// 活接	connection
// 弯头	elbow
// 三通	triplet
// 对丝	silkpair
// 丝转	silkspin
// 其他	others

const basicData = {
    valve: {
        value: '',
    },
    connection: {
        value: '',
    },
    elbow: {
        value: '',
    },
    triplet: {
        value: [],
    },
    silkpair: {
        value: [],
    },
    silkspin: {
        value: [],
    },
    others: {
        value: '',
    }
}

const triplet = [
    {
        label: '商用',
        value: '商用',
    },
    {
        label: '家用',
        value: '家用',
    }
]

const silkpair = [
    {
        label: '铜',
        value: '铜',
    },
    {
        label: '吕',
        value: '吕',
    }
]

const silkspin = [
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
          valve: createFormField({
            ...props.valve,
            value: props.valve.value,
          }),
          connection: createFormField({
            ...props.connection,
            value: props.connection.value,
          }),
          elbow: createFormField({
            ...props.elbow,
            value: props.elbow.value,
          }),
          triplet: createFormField({
            ...props.triplet,
            value: props.triplet.value,
          }),
          silkpair: createFormField({
              ...props.silkpair,
              value: props.silkpair.value,
          }),
          silkspin: createFormField({
              ...props.silkspin,
              value: props.silkspin.value,
          }),
          others: createFormField({
              ...props.others,
              value: props.others.value,
          })
        };
    }
})((props)=>{
    const { getFieldProps, validateFields } = props.form;

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    return (
        <React.Fragment>
        <form>
            <List renderHeader={() => <FormattedMessage id="equipment.fittingstitle" defaultMessage="主要管件数量（注意不同管径）" />}>
                <Item><FormattedMessage id="equipment.valve" defaultMessage="阀门" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder= "请输入"
                                {...getFieldProps('valve',{
                                    rules: [{
                                        required: true,
                                    message: <FormattedMessage id="equipment.valve" defaultMessage="阀门" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.connection" defaultMessage="活接" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('connection',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.connection" defaultMessage="活接" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.elbow" defaultMessage="弯头" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder="请输入"
                                {...getFieldProps('elbow',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.elbow" defaultMessage="弯头" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.triplet" defaultMessage="三通" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={triplet}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('triplet')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.silkpair" defaultMessage="对丝" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={silkpair}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('silkpair')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.silkspin" defaultMessage="丝转" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={silkspin}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('silkspin')}
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
                <Button type="gconnection" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
})

class PipeFittings extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
    }

    render () {
        const { history } = this.props;

        return (
            <div className="fp_container black_bg">
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="equipment.pipefittings" defaultMessage="主要管件" />
                </NavBar>
                { <RenderForm {...basicData} {...this.props} onSubmit={this.handleSubmit} />}
            </div>
            </div>
        )
    }
}

export default withRouter(PipeFittings);
// export default withRouter(injectIntl(silkspin));
