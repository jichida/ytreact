import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

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
})(injectIntl((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { intl: { formatMessage }} = props;

    const handleSubmit = (e)=>{
        // e.preventDefault();
        validateFields((err, values)=>{
            console.log(values);
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="user.name" defaultMessage="用户名" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('username',{
                                    rules: [{
                                        required: true,
                                    message: <FormattedMessage id="user.name" defaultMessage="用户名" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.phone" defaultMessage="联系方式" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('userphone',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="user.phone" defaultMessage="联系方式" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.address" defaultMessage="用户地址" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('useraddress',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="user.address" defaultMessage="用户地址" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.property" defaultMessage="使用性质" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={useproperty}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('useproperty')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.building" defaultMessage="房屋类型" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={building}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('building')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.floor" defaultMessage="楼层高度" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="number"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('floor',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="user.floor" defaultMessage="楼层高度" />,
                                    }],
                                })}
                            />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="user.model" defaultMessage="预装型号" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={model}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('model')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class DeviceBasic extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        values.useproperty = values.useproperty[0];
        values.building = values.building[0];
        values.model = values.model[0];
        dispatch(setuserdevice_request({_id,data:{basicinfo:values}}));
    }

    render () {
        const { history,basicinfo}  = this.props;

         const basicData = {
             username: {
                 value: lodashget(basicinfo,'username',''),
             },
             userphone: {
                 value: lodashget(basicinfo,'userphone',''),
             },
             useraddress: {
                 value: lodashget(basicinfo,'useraddress',''),
             },
             useproperty: { //使用性质
                 value: [lodashget(basicinfo,'useproperty','商用')],
             },
             building: { // 房屋类型
                 value: [lodashget(basicinfo,'building','')],
             },
             floor: { // 楼层
                 value: lodashget(basicinfo,'floor',''),
             },
             model: { //预装型号
                 value: [lodashget(basicinfo,'model','XXX')],
             }
         }
         console.log(basicData);
        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                <FormattedMessage id="device" />
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

const mapStateToProps =  ({device:{basicinfo,_id}}) =>{
  return {basicinfo,_id};
};
DeviceBasic = connect(mapStateToProps)(DeviceBasic);
export default withRouter(DeviceBasic);
