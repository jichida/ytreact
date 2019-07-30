import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import Buckets from '../Buckets';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
let initHeight;

const model = [
    {
        label: 'HYDRODI-G2',
        value: 'HYDRODI-G2',
    },
    {
        label: 'HYDRODI-280',
        value: 'HYDRODI-280',
    },
    {
        label: 'HYDRODI-250',
        value: 'HYDRODI-250',
    },
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
          }),
          bucket: createFormField({
            ...props.bucket,
            value: props.bucket.value,
          }),
        };
    }})(injectIntl((props)=>{
    const { getFieldProps, validateFields, setFieldsValue, getFieldValue } = props.form;
    const { intl,dispatch, unit} = props;
    const {formatMessage} = intl;
    const dispatch_form_err = (dispatch,errs)=>{
        dispatch(common_err({type:'form_err',errmsg: formatMessage({id: 'form.check'})}))
    }

    const handleSubmit = (e)=>{
        // //e.preventDefault();
        validateFields((err, values)=>{
            console.log(values);
            if(!err){
                props.onSubmit(values);
            }
            else{
              console.log(err)
              dispatch_form_err(dispatch,err);
            }
        })
    }

    const handleBucketSelect = (value)=>{
        setFieldsValue({bucket: value});
    }


    const useproperty = [
        {
            label: intl.formatMessage({id:'const.select.useproperty0'}),
            value: '商用',
        },
        {
            label: intl.formatMessage({id:'const.select.useproperty1'}),
            value: '家用',
        }
    ];

    const building = [
        {
            label: intl.formatMessage({id:'const.select.building0'}),
            value: '独立别墅',
        },
        {
            label: intl.formatMessage({id:'const.select.building1'}),
            value: '公寓',
        },
        {
            label: intl.formatMessage({id:'const.select.building2'}),
            value: '商用',
        },
        {
            label: intl.formatMessage({id:'const.select.building3'}),
            value: '企事业单位',
        },
        {
            label: intl.formatMessage({id:'const.select.building4'}),
            value: '其他',
        },
    ]
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
                <Item><FormattedMessage id="user.property" defaultMessage="使用环境" />
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
                                type="digit"
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
                { getFieldValue('model')[0] !== 'HYDRODI-G2' && (
                    <Item><FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />
                        <Brief>
                            <div className="item_children">
                                <Buckets
                                    {...getFieldProps('bucket')}
                                    unit={unit}
                                    onChange={handleBucketSelect}
                                />
                            </div>
                        </Brief>
                    </Item>
                ) }
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

    constructor(props) {
        super(props);
        initHeight = window.innerHeight;
    }

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        values.useproperty = values.useproperty[0];
        values.building = values.building[0];
        values.model = values.model[0];
        dispatch(ui_setuserdevice_request({_id,data:{basicinfo:values}}));
    }

    render () {
        const { history,basicinfo,dispatch}  = this.props;

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
             },
             bucket: {
                value:lodashget(basicinfo,'bucket','50gal'),
             },
         }
         console.log(basicData);
        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
                >
                <FormattedMessage id="device.basic" />
                </NavBar>
                <div className="sub_device_bg">
                    { <RenderForm {...basicData} unit={this.props.unit} onSubmit={this.handleSubmit} dispatch={dispatch}/>}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps =  ({device:{basicinfo,_id}, app: { unit}}) =>{
  return {basicinfo,_id, unit};
};
DeviceBasic = connect(mapStateToProps)(DeviceBasic);
export default withRouter(DeviceBasic);
