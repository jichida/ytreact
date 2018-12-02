import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, DatePicker,  } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import _ from 'lodash';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import 'moment-timezone';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;
const Brief = Item.Brief;


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
    const { getFieldProps, validateFields } = props.form;
    const { intl:{ formatMessage } } = props;

    const handleSubmit = (e)=>{
        e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }


    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />
                    <Brief>
                        <div className="item_children">
                        <InputItem
                            placeholder={formatMessage({id: "form.input"})}
                            {...getFieldProps('deviceid',{
                                rules: [{
                                    required: true,
                                    message: <FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />,
                                }],
                            })}
                        />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.buydate" defaultMessage="购买日期" />
                    <Brief>
                        <div className="item_children">
                        <DatePicker
                            mode="date"
                            extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                            {...getFieldProps('buydate')}
                            >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.installdate" defaultMessage="安装日期" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="date"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('installdate')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.installer" defaultMessage="安装人员" />
                    <Brief>
                        <div className="item_children">
                        <InputItem
                            placeholder={formatMessage({id: "form.input"})}
                            {...getFieldProps('installer',{
                                rules: [{
                                    required: true,
                                    message: <FormattedMessage id="setting.system.installer" defaultMessage="安装人员" />,
                                }],
                            })}
                        ></InputItem>
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <WingBlank className="submit_zone" style={{padding: '30px 0px'}}>
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
}))

class SettingSystem extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
        // const {dispatch,_id} = this.props;
        // dispatch(setuserdevice_request({_id,data:{syssettings:values}}));

        // dispatch(ui_set_language(values['language'][0]));
    }

    render () {
        const { syssettings } = this.props;
        const basicData = {
            deviceid: {
                value: lodashget(syssettings,'deviceid',''),
            },
            buydate: {
                value: new Date(),//lodashget(syssettings,'buydate',new Date()),
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
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

const mapStateToProps =  ({device:{locale,syssettings,_id}}) =>{
  return {locale,syssettings,_id};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
