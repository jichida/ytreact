import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import _ from 'lodash';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import 'moment-timezone';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;


// 设备编号			deviceid
// 购买日期			buydate
// 安装日期			installdate
// 安装人员			installer


const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          deviceid: createFormField({
            ...props.deviceid,
            value: props.deviceid.value,
          }),
          buydate: createFormField({
            ...props.buydate,
            value: props.buydate.value,
          }),
          installdate: createFormField({
            ...props.installdate,
            value: props.installdate.value,
          }),
          installer: createFormField({
            ...props.installer,
            value: props.installer.value,
          }),
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
                    {...getFieldProps('deviceid')}
                ><FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('buydate')}
                ><FormattedMessage id="setting.system.buydate" defaultMessage="购买日期" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('installdate')}
                ><FormattedMessage id="setting.system.installdate" defaultMessage="安装日期" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('installer')}
                ><FormattedMessage id="setting.system.installer" defaultMessage="安装人员" /></InputItem>
            </List>
        </form>
        </React.Fragment>
    )
}))

class SettingSystem extends PureComponent{

    render () {
        const { syssettings } = this.props;
        const basicData = {
            deviceid: {
                value: lodashget(syssettings,'deviceid',''),
            },
            buydate: {
                value: new Date().toLocaleDateString(),//lodashget(syssettings,'buydate',new Date()),
            },
            installdate: {
                value: '',//lodashget(syssettings,'installdate',new Date()),
            },
            installer: {
                value: lodashget(syssettings,'installer',''),
            },
        }
        console.log(basicData)
        return (
            <div className="sub_setting_bg">
                { <RenderForm {...basicData} />}
            </div>
        )
    }
}

const mapStateToProps =  ({device:{locale,syssettings,_id}}) =>{
  return {locale,syssettings,_id};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
