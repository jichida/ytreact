import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem, Button, Switch, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import  SpaceInput from '../SpaceInput';
import PickerAndInput from '../PickerAndInpput';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
let initHeight;

const positionOptions = [
    {
        label: '设备间',
        value: '设备间',
    },
    {
        label: '室内',
        value: '室内',
    },
    {
        label: '室外',
        value: '室外',
    },
]

const wallOptions = [
    {
        label: '水泥墙',
        value: '水泥墙',
    },
    {
        label: '空心砖',
        value: '空心砖',
    },
    {
        label: '隔板',
        value: '隔板',
    },
]

const methodOptions = [
    {
        label: '落地',
        value: '落地',
    },
    {
        label: '壁挂',
        value: '壁挂',
    },
]

const pipeOptions = [
    {
        label: '一寸管',
        value: '一寸管',
    },
    {
        label: '六分管',
        value: '六分管',
    },
    {
        label: '四分管',
        value: '四分管',
    },
    {
        label: '其他(自己填写)',
        value: '其他(自己填写)',
    },
]

const pipematerialsOptions = [
    {
        label: '镀锌钢',
        value: '镀锌钢',
    },
    {
        label: '不锈钢',
        value: '不锈钢',
    },
    {
        label: 'PPR',
        value: 'PPR',
    },
    {
        label: 'PVC',
        value: 'PVC',
    },
    {
        label: '其他(自己填写)',
        value: '其他(自己填写)',
    },
]

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
//
// const basicData = {
//     position: {
//         value: '',
//     },
//     avoidlight: {
//         value: '',
//     },
//     wall: {
//         value: '',
//     },
//     method: {
//         value: '',
//     },
//     space: {
//         value: '',
//     },
//     pipe: {
//         value: '',
//     },
//     drainage: {
//         value: '',
//     },
//     pipematerials: {
//         value: '',
//     },
//     wifi: {
//         value: '',
//     },
//     power: {
//         value: '',
//     },
// }
const dispatch_form_err = (dispatch,errs)=>{
  dispatch(common_err({type:'form_err',errmsg:`请检查所有输入项`}))
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
    const { getFieldProps, validateFields, setFieldsValue } = props.form;
    const { intl: { formatMessage },dispatch} = props;

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
            else{
              console.log(err)
              dispatch_form_err(dispatch,err);
            }
        })
    }

    const handleSpaceInput = (value)=>{
        console.log(value);
        setFieldsValue({space: value});
    }

    const handlePipeChange = (value)=> {
        console.log(value)
        setFieldsValue({pipe: value});
    }

    const handlePipematerialsChange = (value)=> {
        setFieldsValue({pipematerials: value});
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="install.position" defaultMessage="安装地点" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={positionOptions}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('position')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
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
                            <Picker
                                data={wallOptions}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('wall')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.method" defaultMessage="主机安装方式" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={methodOptions}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('method')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.space" defaultMessage="安装空间" />  ( cm )
                    <Brief>
                        <div className="item_children">
                            <SpaceInput
                            {...getFieldProps('space',{
                                rules: [],
                            })}
                            onChange={handleSpaceInput}
                            />
                        </div>
                    </Brief>
                </Item>
                {/* <Item><FormattedMessage id="install.pipe" defaultMessage="进水管径大小" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={pipeOptions}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('pipe')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item> */}
                <Item><FormattedMessage id="install.pipe" defaultMessage="进水管径大小" />
                    <Brief>
                        <div className="item_children">
                            <PickerAndInput
                                options={pipeOptions}
                                cols={1}
                                inputPlaceholder={formatMessage({id: "form.input"})}
                                pickerExtra={formatMessage({id: "form.picker"})}
                                onChange={handlePipeChange}
                                {...getFieldProps('pipe')}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="install.drainage" defaultMessage="排水距离" />  ( cm )
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
                {/* <Item><FormattedMessage id="install.pipematerials" defaultMessage="管路材质" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={pipematerialsOptions}
                                cols={1}
                                extra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('pipematerials')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item> */}
                <Item><FormattedMessage id="install.pipematerials" defaultMessage="管路材质" />
                    <Brief>
                        <div className="item_children">
                            <PickerAndInput
                                options={pipematerialsOptions}
                                cols={1}
                                inputPlaceholder={formatMessage({id: "form.input"})}
                                pickerExtra={formatMessage({id: "form.picker"})}
                                {...getFieldProps('pipematerials')}
                                onChange={handlePipematerialsChange}
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

    constructor(props) {
        super(props);
        initHeight = window.innerHeight;
    }

    handleSubmit = (values)=>{
        values.position = values.position[0];
        values.wall = values.wall[0];
        values.method = values.method[0];
        values.pipe = values.pipe[0];
        values.pipematerials = values.pipematerials[0];
        const {dispatch,_id} = this.props;
        dispatch(ui_setuserdevice_request({_id,data:{install:values}}));
    }

    render () {

        const { history,install,dispatch}  = this.props;

         const basicData = {
           position: {
               value: [lodashget(install,'position','')],
           },
           avoidlight: {
               value: lodashget(install,'avoidlight',false),
           },
           wall: {
               value: [lodashget(install,'wall','')],
           },
           method: {
               value: [lodashget(install,'method','')],
           },
           space: {
               value: lodashget(install,'space',''),
           },
           pipe: {
               value: [lodashget(install,'pipe','')],
           },
           drainage: {
               value: lodashget(install,'drainage',''),
           },
           pipematerials: {
               value: [lodashget(install,'pipematerials','')],
           },
           wifi: {
               value: lodashget(install,'wifi',false),
           },
           power: {
               value: lodashget(install,'power',false),
           },
         }
         console.log(basicData);
        return (
            <div className="fp_container sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
                >
                    <FormattedMessage id="device.install" />
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} dispatch={dispatch}/>}
            </div>
        )
    }
}
const mapStateToProps =  ({device:{install,_id}}) =>{
  return {install,_id};
};
DeviceInstall = connect(mapStateToProps)(DeviceInstall);
export default withRouter(DeviceInstall);
