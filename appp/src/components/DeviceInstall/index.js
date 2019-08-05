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
    const { intl: { formatMessage },dispatch, unit} = props;

    const positionOptions = [
        {
            label: formatMessage({id: 'install.position.equip'}),
            value: formatMessage({id: 'install.position.equip'}),
        },
        {
            label: formatMessage({id: 'install.position.in'}),
            value: formatMessage({id: 'install.position.in'}),
        },
        {
            label: formatMessage({id: 'install.position.out'}),
            value: formatMessage({id: 'install.position.out'}),
        },
    ]

    const wallOptions = [
        {
            label: formatMessage({id: 'install.wall.cement' }),
            value: formatMessage({id: 'install.wall.cement' }),
        },
        {
            label: formatMessage({id: 'install.wall.hollowbrick' }),
            value: formatMessage({id: 'install.wall.hollowbrick' }),
        },
        {
            label: formatMessage({id: 'install.wall.clapboard' }),
            value: formatMessage({id: 'install.wall.clapboard' }),
        },
    ]
    
    const methodOptions = [
        {
            label: formatMessage({id: 'install.method.toground' }),
            value: formatMessage({id: 'install.method.toground' }),
        },
        {
            label: formatMessage({id: 'install.method.wallhanging' }),
            value: formatMessage({id: 'install.method.wallhanging' }),
        },
    ]
    
    const pipeOptions = [
        {
            label: formatMessage({id: 'install.pipe.inch' }),
            value: formatMessage({id: 'install.pipe.inch' }),
        },
        {
            label: formatMessage({id: 'install.pipe.sixbranch' }),
            value: formatMessage({id: 'install.pipe.sixbranch' }),
        },
        {
            label: formatMessage({id: 'install.pipe.fourbranch' }),
            value: formatMessage({id: 'install.pipe.fourbranch' }),
        },
        {
            label: formatMessage({id: 'install.pipe.others' }),
            value: formatMessage({id: 'install.pipe.others' }),
        },
    ]
    
    const pipematerialsOptions = [
        {
            label: formatMessage({id: 'install.pipematerials.galvanized' }),
            value: formatMessage({id: 'install.pipematerials.galvanized' }),
        },
        {
            label: formatMessage({id: 'install.pipematerials.stainless' }),
            value: formatMessage({id: 'install.pipematerials.stainless' }),
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
            label: formatMessage({id: 'install.pipematerials.others' }),
            value: formatMessage({id: 'install.pipematerials.others' }),
        },
    ]

    const dispatch_form_err = (dispatch,errs)=>{
        dispatch(common_err({type:'form_err',errmsg:formatMessage({id: 'form.check'})}))
    }

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                if(unit === 'in') {
                    console.log('Submit Values:', values)
                    if(!!values.drainage) {
                        values.drainage = Math.round(values.drainage * 2.54)
                    }

                    if(!!values.space) {
                        if(!!values.space.length) {
                            values.space.length = Math.round(values.space.length * 2.54)
                        }
                        if(!!values.space.width) {
                            values.space.width = Math.round(values.space.width * 2.54)
                        }
                        if(!!values.space.height) {
                            values.space.height = Math.round(values.space.height * 2.54)
                        }
                    }
                }
                console.log(values)
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
                <Item><FormattedMessage id="install.space" defaultMessage="安装空间" />  ( {unit} )
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
                <Item><FormattedMessage id="install.drainage" defaultMessage="排水距离" />  ( {unit} )
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    type="digit"
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

        const { history, install, dispatch }  = this.props;

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
        
        if(this.props.unit === 'in') {
            
            if(!!basicData.drainage) {
                basicData.drainage.value = Math.round(lodashget(install,'drainage','') * 0.3937008)
            }

            if(!!basicData.space) {
                console.log('space')
                if(!!basicData.space.value.length) {
                    basicData.space.value.length = Math.round(lodashget(install,'space','').length * 0.3937008)
                }
                if(!!basicData.space.value.width) {
                    basicData.space.value.width = Math.round(lodashget(install,'space','').width * 0.3937008)
                }
                if(!!basicData.space.value.height) {
                    basicData.space.value.height = Math.round(lodashget(install,'space','').height * 0.3937008)
                }
            }
        }

        return (
            <div className="fp_container sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
                >
                    <FormattedMessage id="device.install" />
                </NavBar>
                <div className="sub_device_bg">
                    <RenderForm {...basicData} unit={this.props.unit} onSubmit={this.handleSubmit} dispatch={dispatch}/>
                </div>
                
            </div>
        )
    }
}
const mapStateToProps =  ({device:{install,_id}, app: { unit }}) =>{
    console.log('mstp install:', install)
  return {install,_id, unit};
};
DeviceInstall = connect(mapStateToProps)(DeviceInstall);
export default withRouter(DeviceInstall);
