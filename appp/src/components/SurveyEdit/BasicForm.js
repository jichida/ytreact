import React from 'react';
import {  List, InputItem, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import Buckets from '../Buckets';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

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



class Index extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    handleSubmit = ()=>{
        const { validateFields } = this.props.form;
        validateFields((err, values)=>{
            console.log(values);
            if(!err){
                this.props.onSubmit('basic', values);
            }
            else{
                console.log(err)
                this.dispatch_form_err(this.props.dispatch,err);
            }
        })
    }

    dispatch_form_err = (dispatch,errs)=>{
        const { intl: { formatMessage }} = this.props;
        dispatch(common_err({type:'form_err',errmsg: formatMessage({id: 'form.check'})}))
    }

    render() {
        const { getFieldProps, setFieldsValue, getFieldValue } = this.props.form;
        const { intl: { formatMessage }, unit} = this.props;

        console.log('form props update!!!')

        const handleBucketSelect = (value)=>{
            setFieldsValue({bucket: value});
        }

        const useproperty = [
            {
                label: formatMessage({id:'const.select.useproperty0'}),
                value: '商用',
            },
            {
                label: formatMessage({id:'const.select.useproperty1'}),
                value: '家用',
            }
        ];
        
        const building = [
            {
                label: formatMessage({id:'const.select.building0'}),
                value: '独立别墅',
            },
            {
                label: formatMessage({id:'const.select.building1'}),
                value: '公寓',
            },
            {
                label: formatMessage({id:'const.select.building2'}),
                value: '商用',
            },
            {
                label: formatMessage({id:'const.select.building3'}),
                value: '企事业单位',
            },
            {
                label: formatMessage({id:'const.select.building4'}),
                value: '其他',
            },
        ]
        
        return (
            <form>
                <List>
                    <Item><FormattedMessage id="user.name" defaultMessage="用户名" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('username')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <Item className="extra-load"><FormattedMessage id="user.phone" defaultMessage="联系方式" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('userphone')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <Item><FormattedMessage id="user.address" defaultMessage="用户地址" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('useraddress')}
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
                                    {...getFieldProps('floor')}
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
        )
    }
}

const createFormOptions = {
    mapPropsToFields({basicinfo}) {
        return {
          username: createFormField({value: lodashget(basicinfo,'username','')}),
          userphone: createFormField({value: lodashget(basicinfo,'userphone','')}),
          useraddress: createFormField({value: lodashget(basicinfo,'useraddress','')}),
          useproperty: createFormField({value: [lodashget(basicinfo,'useproperty','商用')]}),
          building: createFormField({value: [lodashget(basicinfo,'building','')]}),
          floor: createFormField({value: lodashget(basicinfo,'floor','')}),
          model: createFormField({value: [lodashget(basicinfo,'model','HYDRODI-250')]}),
          bucket: createFormField({value: lodashget(basicinfo,'bucket','50gal')}),
        };
    }
}

export default createForm(createFormOptions)(Index)


// handleSubmit = (values)=>{
//     console.log(values);
//     const {dispatch,_id} = this.props;
//     values.useproperty = values.useproperty[0];
//     values.building = values.building[0];
//     values.model = values.model[0];
//     dispatch(ui_setuserdevice_request({_id,data:{basicinfo:values}}));
// }


// class DeviceBasic extends PureComponent{

//     constructor(props) {
//         super(props);
//         initHeight = window.innerHeight;
//     }

//     componentDidMount() {
//         window.addEventListener('resize', () => {
//             const activeElement = document.activeElement
//             if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
//                 setTimeout(() => {
//                     if(!!activeElement.scrollIntoViewIfNeeded) {
//                         activeElement.scrollIntoViewIfNeeded(true)
//                     } else {
//                         activeElement.scrollIntoView(false)
//                     }
//                 }, 100)
//             }
//         })
//     }


//     render () {
//         const { history,basicinfo,dispatch}  = this.props;

//          console.log(basicData);
//         return (
//             <div className="sub_bg">
//                 <NavBar
//                     className="nav"
//                     icon={<Icon type="left" />}
//                     onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
//                 >
//                 <FormattedMessage id="device.basic" />
//                 </NavBar>
//                 <div className="sub_device_bg">
//                     { <RenderForm {...basicData} unit={this.props.unit} onSubmit={this.handleSubmit} dispatch={dispatch}/>}
//                 </div>
                
//             </div>
//         )
//     }
// }

// const mapStateToProps =  ({device:{basicinfo,_id}, app: { unit}}) =>{
//   return {basicinfo,_id, unit};
// };
// DeviceBasic = connect(mapStateToProps)(DeviceBasic);
// export default withRouter(DeviceBasic);
