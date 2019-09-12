import React from 'react';
import { List, InputItem, Button, Switch, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage } from 'react-intl';
// import { pageInputScroll } from '../../util/pageInputScroll';
import './index.less';
import PopoverInput from '../Controls/popoverInput'

const Item = List.Item;
const Brief = Item.Brief;

class Index extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e)=>{
        const { form: { validateFields }, dispatch, onSubmit, locale} = this.props;
        validateFields((err, values)=>{
            if(!err){
                if(locale === 'en') {
                    values.quantity = Math.round(values.quantity/264)
                }
                onSubmit('water', values);
            }
            else{
                console.log(err)
                this.dispatch_form_err(dispatch,err);
            }
        })
    }

    dispatch_form_err = (dispatch,errs)=>{
        const { intl: { formatMessage }} = this.props
        dispatch(common_err({type:'form_err',errmsg:formatMessage({id: 'form.check'})}))
    }

    render() {
        const { intl: { formatMessage }, form: { getFieldProps }} = this.props

        const source = [
            {
                label: formatMessage({id: 'water.source.municipal' }),
                value: 'municipal',
            },
            {
                label: formatMessage({id: 'water.source.ground' }),
                value: 'ground',
            },
        ]

        return (
            <form>
                <List>
                    <Item><FormattedMessage id="water.quantity" defaultMessage="月用水量（吨）" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    type="digit"
                                    {...getFieldProps('quantity')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <Item><FormattedMessage id="water.persons" defaultMessage="用水人数（人）" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    type="digit"
                                    {...getFieldProps('persons')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <Item><FormattedMessage id="water.spot" defaultMessage="直饮水点（个）" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    type="digit"
                                    {...getFieldProps('spot')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <Item><FormattedMessage id="water.watergage" defaultMessage="水压" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    placeholder={formatMessage({id: "form.input"})}
                                    type="digit"
                                    {...getFieldProps('watergage')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <List.Item
                        className="item_switch"
                        // extra={<Switch
                        //     {...getFieldProps('booster', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />}
                        extra={<PopoverInput type="1" {...getFieldProps('booster')} />}
                    ><FormattedMessage id="water.booster" defaultMessage="是否需装增压泵" /></List.Item>
                    <Item><FormattedMessage id="water.source" defaultMessage="进水水源" />
                        <Brief>
                            <div className="item_children">
                                <Picker
                                    data={source}
                                    cols={1}
                                    extra={formatMessage({id: "form.picker"})}
                                    {...getFieldProps('source')}
                                    >
                                    <List.Item arrow="horizontal"></List.Item>
                                </Picker>
                            </div>
                        </Brief>
                    </Item>
                    <Item><FormattedMessage id="water.bathrooms" defaultMessage="卫浴间数量" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    type="digit"
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('bathrooms')}
                                />
                            </div>
                        </Brief>
                    </Item>
                    <List.Item className="item_switch"
                        // extra={<Switch
                        //     {...getFieldProps('shunt', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />}
                        extra={<PopoverInput type="1" {...getFieldProps('shunt')} />}
                    ><FormattedMessage id="water.shunt" defaultMessage="是否分流" /></List.Item>
                    <Item><FormattedMessage id="water.usertds" defaultMessage="用户需求出水TDS值" />
                        <Brief>
                            <div className="item_children">
                                <InputItem
                                    type="digit"
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('usertds')}
                                />
                            </div>
                        </Brief>
                    </Item>
                </List>
            </form>
        )
    }
}

const createFormOptions = {
    mapPropsToFields({usewater, locale}) {
        return {
            quantity: createFormField({value: locale === 'en' ? lodashget(usewater,'quantity','')*264 : lodashget(usewater,'quantity','')}),
            persons: createFormField({value: lodashget(usewater,'persons','')}),
            spot: createFormField({value: lodashget(usewater,'spot','')}),
            watergage: createFormField({value: lodashget(usewater,'watergage','')}),
            booster: createFormField({value: lodashget(usewater,'booster',false)}),
            source: createFormField({value: [lodashget(usewater, 'source', '')]}),
            bathrooms: createFormField({value: lodashget(usewater,'bathrooms','')}),
            shunt: createFormField({value: lodashget(usewater,'shunt',false)}),
            usertds: createFormField({value: lodashget(usewater,'usertds','')}),
        };
    }
}

export default createForm(createFormOptions)(Index)


// class DeviceWater extends PureComponent{

//     constructor(props) {
//         super(props);
//         this.initHeight = window.innerHeight;
//     }


//     handleSubmit = (values)=>{
//         console.log(values);
//         const {dispatch,_id} = this.props;
//         values.source = values.source[0];
//         // values.useproperty = values.useproperty[0];
//         // values.building = values.building[0];
//         // values.model = values.model[0];
//         dispatch(ui_setuserdevice_request({_id,data:{usewater:values}}));

//     }


//     render () {
//         const { history,usewater,dispatch } = this.props;


//         return (
//             <div className="fp_container sub_bg animated-router-forward-enter-done">
//                 <NavBar
//                     className="nav"
//                     icon={<Icon type="left" />}
//                     onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
//                 >
//                 <FormattedMessage id="device.water" />
//                 </NavBar>
//                 <div className="sub_device_bg">{ <RenderForm {...basicData} onSubmit={this.handleSubmit} dispatch={dispatch} />}</div>
                
//             </div>
//         )
//     }
// }
// const mapStateToProps =  ({device:{usewater,_id}}) =>{
//   return {usewater,_id};
// };
// DeviceWater = connect(mapStateToProps)(DeviceWater);
// export default withRouter(DeviceWater);
