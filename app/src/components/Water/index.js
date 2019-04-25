import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 月用水量（吨）  	quantity
// 用水人数（人）  	persons
// 直饮水点（个） 	 spot
// 水压  	watergage
// 需装增压泵 	booster
// 卫浴间数量 (个）	bathrooms
// 是否分流		shunt
// 原水TDS值(mg/l)	tds
// 原水导电率(us/cm)	conductivity
// 原水硬度(ppm)	hardness
// 原水碱度(ppm)	alkalinity
// ph值		ph
// 出水TDS值	usertds

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
        //   quantity: createFormField({
        //     ...props.quantity,
        //     value: props.quantity.value,
        //   }),
        //   persons: createFormField({
        //     ...props.persons,
        //     value: props.persons.value,
        //   }),
        //   spot: createFormField({
        //     ...props.spot,
        //     value: props.spot.value,
        //   }),
        //   watergage: createFormField({
        //     ...props.watergage,
        //     value: props.watergage.value,
        //   }),
        //   booster: createFormField({
        //       ...props.booster,
        //       value: props.booster.value,
        //   }),
        //   bathrooms: createFormField({
        //       ...props.bathrooms,
        //       value: props.bathrooms.value,
        //   }),
        //   shunt: createFormField({
        //       ...props.shunt,
        //       value: props.shunt.value,
        //   }),
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
          usertds: createFormField({
                ...props.usertds,
                value: props.usertds.value,
          }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps } = props.form;
    const { intl: { formatMessage }} = props;

    return (
        <React.Fragment>
        <form>
            <List>
                {/* <InputItem
                    className="right-input"
                    editable={false}
                    extra= {formatMessage({id: 'form.ton'})}
                    {...getFieldProps('quantity')}
                ><FormattedMessage id="water.quantity" defaultMessage="月用水量（吨）" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra={formatMessage({id: 'form.per'})}
                    {...getFieldProps('persons')}
                ><FormattedMessage id="water.persons" defaultMessage="用水人数（人）" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra={formatMessage({id: 'form.each'})}
                    {...getFieldProps('spot')}
                ><FormattedMessage id="water.spot" defaultMessage="直饮水点（个）" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra={formatMessage({id: 'form.kg'})}
                    {...getFieldProps('watergage')}
                ><FormattedMessage id="water.watergage" defaultMessage="水压" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('booster')}
                ><FormattedMessage id="water.booster" defaultMessage="需装增压泵" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra={formatMessage({id: 'form.each'})}
                    {...getFieldProps('bathrooms')}
                ><FormattedMessage id="water.bathrooms" defaultMessage="卫浴间数量" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('shunt')}
                ><FormattedMessage id="water.shunt" defaultMessage="是否分流" /></InputItem> */}
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="mg/l"
                    {...getFieldProps('tds')}
                ><FormattedMessage id="water.tds" defaultMessage="原水TDS值" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="uS/cm"
                    {...getFieldProps('conductivity')}
                ><FormattedMessage id="water.conductivity" defaultMessage="原水导电率" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="ppm"
                    {...getFieldProps('hardness')}
                ><FormattedMessage id="water.hardness" defaultMessage="原水硬度(ppm)" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="ppm"
                    {...getFieldProps('alkalinity')}
                ><FormattedMessage id="water.alkalinity" defaultMessage="原水碱度(ppm)" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('ph')}
                ><FormattedMessage id="water.ph" defaultMessage="ph值" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="mg/l"
                    {...getFieldProps('usertds')}
                ><FormattedMessage id="water.usertds" defaultMessage="出水TDS值(mg/l)" /></InputItem>
            </List>
        </form>
        </React.Fragment>
    )
}))

class DeviceWater extends PureComponent{

    render () {
        const { history,usewater, intl: { formatMessage } } = this.props;

        const basicData = {
            // quantity: {
            //     value: lodashget(usewater,'quantity',''),
            // },
            // persons: {
            //     value: lodashget(usewater,'persons',''),
            // },
            // spot: {
            //     value: lodashget(usewater,'spot',''),
            // },
            // watergage: {
            //     value: lodashget(usewater,'watergage',''),
            // },
            // booster: {
            //     value: lodashget(usewater,'booster',false)? formatMessage({id: 'form.yes1'}) : formatMessage({id: 'form.no1'}),
            // },
            // bathrooms: {
            //     value: lodashget(usewater,'bathrooms',''),
            // },
            // shunt: {
            //     value: lodashget(usewater,'shunt',false)? formatMessage({id: 'form.yes1'}) : formatMessage({id: 'form.no1'}),
            // },
            tds: {
                value: lodashget(usewater,'tds',''),
            },
            conductivity: {
                value: lodashget(usewater,'conductivity',''),
            },
            hardness: {
                value: lodashget(usewater,'hardness',''),
            },
            alkalinity: {
                value: lodashget(usewater,'alkalinity',''),
            },
            ph: {
                value: lodashget(usewater,'ph',''),
            },
            usertds: {
                value: lodashget(usewater,'usertds',''),
            },
        }

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                <FormattedMessage id="device.water" />
                </NavBar>
                <div className="sub_setting_bg">
                { <RenderForm {...basicData} />}
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({device:{usewater,_id}}) =>{
  return {usewater,_id};
};
DeviceWater = connect(mapStateToProps)(DeviceWater);
export default withRouter(injectIntl(DeviceWater));
