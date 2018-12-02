import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;


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
    const { getFieldProps } = props.form;

    return (
        <React.Fragment>
        <form>
            <List>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('username')}
                ><FormattedMessage id="user.name" defaultMessage="用户名" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('userphone')}
                ><FormattedMessage id="user.phone" defaultMessage="联系方式" /></InputItem>
                <Item><FormattedMessage id="user.address" defaultMessage="用户地址" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                editable={false}
                                {...getFieldProps('useraddress')}
                            />
                        </div>
                    </Brief>
                </Item>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('useproperty')}
                ><FormattedMessage id="user.property" defaultMessage="使用性质" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('building')}
                ><FormattedMessage id="user.building" defaultMessage="房屋类型" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('floor')}
                ><FormattedMessage id="user.floor" defaultMessage="楼层高度" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('model')}
                ><FormattedMessage id="user.model" defaultMessage="预装型号" /></InputItem>
            </List>
        </form>
        </React.Fragment>
    )
}))

class DeviceBasic extends PureComponent{

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
            <div className="black_bg">
                <div className="setting">
                    <NavBar
                        className="nav"
                        icon={<Icon type="left" />}
                        onLeftClick={() => history.goBack()}
                    >
                        <FormattedMessage id="device.basic" />
                    </NavBar>
                    <div className="sub_setting_bg">
                        { <RenderForm {...basicData} />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({device:{basicinfo,_id}}) =>{
  return {basicinfo,_id};
};
DeviceBasic = connect(mapStateToProps)(DeviceBasic);
export default withRouter(DeviceBasic);
