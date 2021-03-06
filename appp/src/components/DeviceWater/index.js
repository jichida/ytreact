import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem, Button, Switch, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import PopoverInput from '../Controls/popoverInput'
// import { pageInputScroll } from '../../util/pageInputScroll';
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
let initHeight;



// 月用水量（吨）  	quantity
// 用水人数（人）  	persons
// 直饮水点（个） 	 spot
// 水压  	watergage
// 需装增压泵 	booster
// 进水水源  source
// 卫浴间数量 (个）	bathrooms
// 是否分流		shunt
// 进水TDS值(mg/l)	tds
// 进水导电率(us/cm)	conductivity
// 进水硬度(ppm)	hardness
// 进水碱度(ppm)	alkalinity
// ph值		ph
// 用户需求出水TDS值	usertds

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          quantity: createFormField({
            ...props.quantity,
            value: props.quantity.value,
          }),
          persons: createFormField({
            ...props.persons,
            value: props.persons.value,
          }),
          spot: createFormField({
            ...props.spot,
            value: props.spot.value,
          }),
          watergage: createFormField({
            ...props.watergage,
            value: props.watergage.value,
          }),
          booster: createFormField({
              ...props.booster,
              value: props.booster.value,
          }),
          source: createFormField({
            ...props.source,
            value: props.source.value,
        }),
          bathrooms: createFormField({
              ...props.bathrooms,
              value: props.bathrooms.value,
          }),
          shunt: createFormField({
              ...props.shunt,
              value: props.shunt.value,
          }),
        //   tds: createFormField({
        //     ...props.tds,
        //     value: props.tds.value,
        //   }),
        //   conductivity: createFormField({
        //     ...props.conductivity,
        //     value: props.conductivity.value,
        //   }),
        //   hardness: createFormField({
        //         ...props.hardness,
        //         value: props.hardness.value,
        //   }),
        //   alkalinity: createFormField({
        //         ...props.alkalinity,
        //         value: props.alkalinity.value,
        //   }),
        //   ph: createFormField({
        //         ...props.ph,
        //         value: props.ph.value,
        //   }),
          usertds: createFormField({
                ...props.usertds,
                value: props.usertds.value,
          }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { intl: { formatMessage },dispatch} = props;

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

    const dispatch_form_err = (dispatch,errs)=>{
        dispatch(common_err({type:'form_err',errmsg:formatMessage({id: 'form.check'})}))
    }

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

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="water.quantity" defaultMessage="月用水量（吨）" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                // type="money"
                                type="digit"
                                // extra= {<Icon type="right" />}
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
                                // type="money"
                                type="digit"
                                // extra= {<Icon type="right" />}
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
                                // type="money"
                                type="digit"
                                // extra= {<Icon type="right" />}
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
                                // type="money"
                                type="digit"
                                // extra= {<Icon type="right" />}
                                {...getFieldProps('watergage')}
                            />
                        </div>
                    </Brief>
                </Item>
                <List.Item
                    className="item_switch"
                    extra={
                        <PopoverInput type="1" 
                            {...getFieldProps('booster')}
                        />
                        // <Switch
                        //     {...getFieldProps('booster', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />
                    }
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
                                // type="money"
                                type="digit"
                                placeholder={formatMessage({id: "form.input"})}
                                // extra= {<Icon type="right" />}
                                {...getFieldProps('bathrooms')}
                            />
                        </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={
                        // <Switch
                        //     {...getFieldProps('shunt', {
                        //         valuePropName: 'checked',
                        //     })}
                        // />
                        <PopoverInput type="1" 
                            {...getFieldProps('shunt')}
                        />
                    }
                ><FormattedMessage id="water.shunt" defaultMessage="是否分流" /></List.Item>
                {/* <Item><FormattedMessage id="water.tds" defaultMessage="进水TDS值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                placeholder={formatMessage({id: "form.input"})}
                                extra= {<Icon type="right" />}
                                {...getFieldProps('tds',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="water.tds" defaultMessage="进水TDS值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="water.conductivity" defaultMessage="进水导电率" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                placeholder={formatMessage({id: "form.input"})}
                                extra= {<Icon type="right" />}
                                {...getFieldProps('conductivity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="water.conductivity" defaultMessage="进水导电率" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="water.hardness" defaultMessage="进水硬度(ppm)" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                placeholder={formatMessage({id: "form.input"})}
                                extra= {<Icon type="right" />}
                                {...getFieldProps('hardness',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="water.hardness" defaultMessage="进水硬度(ppm)" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="water.alkalinity" defaultMessage="进水碱度(ppm)" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                placeholder={formatMessage({id: "form.input"})}
                                extra= {<Icon type="right" />}
                                {...getFieldProps('alkalinity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="water.alkalinity" defaultMessage="进水碱度(ppm)" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="water.ph" defaultMessage="ph值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                placeholder={formatMessage({id: "form.input"})}
                                extra= {<Icon type="right" />}
                                {...getFieldProps('ph',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="water.ph" defaultMessage="ph值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item><FormattedMessage id="water.usertds" defaultMessage="用户需求出水TDS值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                // type="money"
                                type="digit"
                                placeholder={formatMessage({id: "form.input"})}
                                // extra= {<Icon type="right" />}
                                {...getFieldProps('usertds')}
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

class DeviceWater extends PureComponent{

    constructor(props) {
        super(props);
        this.initHeight = window.innerHeight;
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            const activeElement = document.activeElement
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                setTimeout(() => {
                    if(!!activeElement.scrollIntoViewIfNeeded) {
                        activeElement.scrollIntoViewIfNeeded(true)
                    } else {
                        activeElement.scrollIntoView(false)
                    }
                }, 100)
            }
        })
    }

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id, app} = this.props;
        values.source = values.source[0];
        if(app.locale === 'en') {
            values['quantity_en'] = values.quantity
            values['quantity_cn'] = Math.round(values.quantity/264)
        } else {
            values['quantity_cn'] = values.quantity
            values['quantity_en'] = Math.round(values.quantity*264)
        }

        // values.useproperty = values.useproperty[0];
        // values.building = values.building[0];
        // values.model = values.model[0];
        dispatch(ui_setuserdevice_request({_id,data:{usewater:values}}));

    }

    // handleFocus = () => {
    //     const params = {...this.state.params};
    //     params.isShowBounce = !params.isShowBounce;
    //     this.setState({
    //         params
    //     })
    // }

    // componentDidMount(){
    //     pageInputScroll()
    // }

    render () {
        const { history,usewater,dispatch, app } = this.props;

        const basicData = {
            quantity: {
                value: app.locale === 'en' ? lodashget(usewater,'quantity_en','') : lodashget(usewater,'quantity_cn',''),
            },
            persons: {
                value: lodashget(usewater,'persons',''),
            },
            spot: {
                value: lodashget(usewater,'spot',''),
            },
            watergage: {
                value: lodashget(usewater,'watergage',''),
            },
            booster: {
                value: lodashget(usewater,'booster',false),
            },
            source: {
                value: [lodashget(usewater, 'source', '')],
            },
            bathrooms: {
                value: lodashget(usewater,'bathrooms',''),
            },
            shunt: {
                value: lodashget(usewater,'shunt',false),
            },
            // tds: {
            //     value: lodashget(usewater,'tds',''),
            // },
            // conductivity: {
            //     value: lodashget(usewater,'conductivity',''),
            // },
            // hardness: {
            //     value: lodashget(usewater,'hardness',''),
            // },
            // alkalinity: {
            //     value: lodashget(usewater,'alkalinity',''),
            // },
            // ph: {
            //     value: lodashget(usewater,'ph',''),
            // },
            usertds: {
                value: lodashget(usewater,'usertds',''),
            },
        }

        return (
            <div className="fp_container sub_bg animated-router-forward-enter-done">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.innerHeight=initHeight; history.goBack()}}
                >
                <FormattedMessage id="device.water" />
                </NavBar>
                <div className="sub_device_bg">{ <RenderForm {...basicData} onSubmit={this.handleSubmit} dispatch={dispatch} />}</div>
                
            </div>
        )
    }
}
const mapStateToProps =  ({device:{usewater,_id}, app}) =>{
  return {usewater,_id, app};
};
DeviceWater = connect(mapStateToProps)(DeviceWater);
export default withRouter(DeviceWater);
