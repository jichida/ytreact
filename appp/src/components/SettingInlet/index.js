import React, { PureComponent } from 'react';
import {  List, InputItem, Button } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Buckets from '../Buckets';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
// 进水TDS值(mg/l)	tds
// 进水导电率(us/cm)	conductivity
// 进水硬度	hardness
// 进水碱度(ppm)	alkalinity
// ph值		ph
// 用户需求出水TDS值	usertds

const basicData = {
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
    bucket: {
        value: '50gal',
    },
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
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
          bucket: createFormField({
                ...props.bucket,
                value: props.bucket.value,
          }),
        };
    }
})((props)=>{
    const { getFieldProps, validateFields, setFieldsValue } = props.form;

    const handleSubmit = (e)=>{
        e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    const handleBucketSelect = (value)=>{
        setFieldsValue({bucket: value});
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="setting.water.ph" defaultMessage="PH值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={<FormattedMessage id="setting.water.ph" defaultMessage="ph值" />}
                                {...getFieldProps('ph',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.ph" defaultMessage="ph值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={<FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />}
                                {...getFieldProps('conductivity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={<FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />}
                                {...getFieldProps('tds',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={<FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />}
                                {...getFieldProps('hardness',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={<FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />}
                                {...getFieldProps('alkalinity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />
                    <Brief>
                        <div className="item_children">
                            {/* <InputItem
                                placeholder={<FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />}
                                {...getFieldProps('bucket',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />,
                                    }],
                                })}
                            /> */}
                            <Buckets 
                                {...getFieldProps('bucket',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />,
                                    }],
                                })}
                                onChange={handleBucketSelect}
                            />
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_area">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}><FormattedMessage id="form.save" defaultMessage="保存" /></Button>
            </div>
        </div>
        </React.Fragment>
    )
})

class Inlet extends PureComponent{

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

export default withRouter(Inlet);