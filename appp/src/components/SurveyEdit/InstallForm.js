import React from 'react';
import { List, InputItem, Switch, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage } from 'react-intl';
import  SpaceInput from '../SpaceInput';
import PickerAndInput from '../PickerAndInpput';
import PopoverInput from '../Controls/popoverInput'
import { convertDecimal } from '../../util/convertDecimal'

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;


class Index extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e)=>{
        const { form: { validateFields },dispatch, unit} = this.props

        validateFields((err, values)=>{
            if(!err){
                // if(unit === 'in') {
                //     console.log('Submit Values:', values)
                //     if(!!values.drainage) {
                //         values.drainage = Math.round(values.drainage * 2.54)
                //     }

                //     if(!!values.space) {
                //         if(!!values.space.length) {
                //             values.space.length = Math.round(values.space.length * 2.54)
                //         }
                //         if(!!values.space.width) {
                //             values.space.width = Math.round(values.space.width * 2.54)
                //         }
                //         if(!!values.space.height) {
                //             values.space.height = Math.round(values.space.height * 2.54)
                //         }
                //     }
                // }
                const space_cn = {}
                const space_en = {}
                if(unit === 'in') {
                    if(!!values.drainage) {
                        values['drainage_en'] = values.drainage
                        values['drainage_cn'] = convertDecimal(values.drainage * 2.54)
                    }

                    if(!!values.space) {
                        space_en['length'] = lodashget(values, 'space.length', '') === '' ? '' : convertDecimal(lodashget(values, 'space.length', 0))
                        space_cn['length'] = lodashget(values, 'space.length', '') === '' ? '' : convertDecimal(lodashget(values, 'space.length', 0)* 2.54)
                        space_en['width'] = lodashget(values, 'space.width', '') === '' ? '' : convertDecimal(lodashget(values, 'space.width', 0))
                        space_cn['width'] = lodashget(values, 'space.width', '') === '' ? '' : convertDecimal(lodashget(values, 'space.width', 0)* 2.54)
                        space_en['height'] = lodashget(values, 'space.height', '') === '' ? '' : convertDecimal(lodashget(values, 'space.height', 0))
                        space_cn['height'] = lodashget(values, 'space.height', '') === '' ? '' : convertDecimal(lodashget(values, 'space.height', 0)* 2.54)
                    }
                }
                if(unit === 'cm') {
                    if(!!values.drainage) {
                        values['drainage_cn'] = values.drainage
                        values['drainage_en'] = convertDecimal(values.drainage * 0.3937008)
                    }

                    if(!!values.space) {
                        space_cn['length'] = lodashget(values, 'space.length', '') === '' ? '' : convertDecimal(lodashget(values, 'space.length', 0))
                        space_en['length'] = lodashget(values, 'space.length', '') === '' ? '' : convertDecimal(lodashget(values, 'space.length', 0)* 0.3937008)
                        space_cn['width'] = lodashget(values, 'space.width', '') === '' ? '' : convertDecimal(lodashget(values, 'space.width', 0))
                        space_en['width'] = lodashget(values, 'space.width', '') === '' ? '' : convertDecimal(lodashget(values, 'space.width', 0)* 0.3937008)
                        space_cn['height'] = lodashget(values, 'space.height', '') === '' ? '' : convertDecimal(lodashget(values, 'space.height', 0))
                        space_en['height'] = lodashget(values, 'space.height', '') === '' ? '' : convertDecimal(lodashget(values, 'space.height', 0)* 0.3937008)
                    }
                }
                values['space_cn'] = space_cn
                values['space_en'] = space_en
                // delete values.space
                console.log('install form:', values)
                this.props.onSubmit('install', values);
            }
            else{
              console.log(err)
              this.dispatch_form_err(dispatch,err);
            }
        })
    }

    dispatch_form_err = (dispatch,errs)=>{
        const { intl: { formatMessage } } = this.props
        dispatch(common_err({type:'form_err',errmsg:formatMessage({id: 'form.check'})}))
    }

    render() {
        const { getFieldProps, setFieldsValue } = this.props.form;
        const { intl: { formatMessage }, unit} = this.props;

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

        const positionOptions = [
            {
                label: formatMessage({id: 'install.position.equip'}),
                value: 'equip',
            },
            {
                label: formatMessage({id: 'install.position.in'}),
                value: 'in',
            },
            {
                label: formatMessage({id: 'install.position.out'}),
                value: 'out',
            },
        ]
        
        const wallOptions = [
            {
                label: formatMessage({id: 'install.wall.cement' }),
                value: 'cement',
            },
            {
                label: formatMessage({id: 'install.wall.hollowbrick' }),
                value: 'hollowbrick',
            },
            {
                label: formatMessage({id: 'install.wall.clapboard' }),
                value: 'clapboard',
            },
        ]
        
        const methodOptions = [
            {
                label: formatMessage({id: 'install.method.toground' }),
                value: 'toground',
            },
            {
                label: formatMessage({id: 'install.method.wallhanging' }),
                value: 'wallhanging',
            },
        ]
        
        const pipeOptions = [
            {
                label: formatMessage({id: 'install.pipe.inch' }),
                value: 'inch',
            },
            {
                label: formatMessage({id: 'install.pipe.sixbranch' }),
                value: 'sixbranch',
            },
            {
                label: formatMessage({id: 'install.pipe.fourbranch' }),
                value: 'fourbranch',
            },
            {
                label: formatMessage({id: 'install.pipe.others' }),
                value: 'others',
            },
        ]
        
        const pipematerialsOptions = [
            {
                label: formatMessage({id: 'install.pipematerials.galvanized' }),
                value: 'galvanized',
            },
            {
                label: formatMessage({id: 'install.pipematerials.stainless' }),
                value: 'stainless',
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
                value: 'others',
            },
        ]

        return (
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
                        // extra={<Switch
                        //     {...getFieldProps('avoidlight', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />}
                        extra={<PopoverInput type="1" {...getFieldProps('avoidlight')} />}
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
                                        {...getFieldProps('drainage')}
                                    />
                                </div>
                        </Brief>
                    </Item>
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
                        // extra={<Switch
                        //     {...getFieldProps('wifi', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />}
                        extra={<PopoverInput type="2" up={true} {...getFieldProps('avoidlight')} />}
                    ><FormattedMessage id="install.wifi" defaultMessage="有无WIFI" /></List.Item>
                    <List.Item className="item_switch"
                        // extra={<Switch
                        //     {...getFieldProps('power', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />}
                        extra={<PopoverInput type="2" up={true} {...getFieldProps('power')} />}
                    ><FormattedMessage id="install.power" defaultMessage="有无电源" /></List.Item>
                </List>
            </form>
        )
    }

}

const createFormOptions = {
    mapPropsToFields({install, unit}) {
        return {
          position: createFormField({value: [lodashget(install,'position','')]}),
          avoidlight: createFormField({value: lodashget(install,'avoidlight',false)}),
          wall: createFormField({value: [lodashget(install,'wall','')]}),
          method: createFormField({value: [lodashget(install,'method','')]}),
          space: createFormField({value: unit === 'cm' ? lodashget(install,'space_cn', {}) : lodashget(install,'space_en', {})}),
          pipe: createFormField({value: [lodashget(install,'pipe','')]}),
          drainage: createFormField({value: unit === 'cm' ? lodashget(install,'drainage_cn','') : lodashget(install,'drainage_en','')}),
          pipematerials: createFormField({value: [lodashget(install,'pipematerials','')]}),
          wifi: createFormField({value: lodashget(install,'wifi',false)}),
          power: createFormField({value: lodashget(install,'power',false)}),
        };
    }
}

export default createForm(createFormOptions)(Index)