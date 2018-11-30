import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import _ from 'lodash';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import 'moment-timezone';
import {ui_set_language} from '../../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;
const Brief = Item.Brief;

const curTZ = moment.tz.guess();

const timezoneOption = () => {
    const timeZones = moment.tz.names();
    const offsetTmz = [];

    for (const i in timeZones) {
      const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
      let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

      const timeZone = {
        label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
        value: `${timeZones[i]}`,
        time: `${x}`,
      };
      offsetTmz.push(timeZone);
    }

    return _.sortBy(offsetTmz, [function (el) { return -(el.time); }]);
  }


// 设备编号			deviceid
// 购买日期			buydate
// 安装日期			installdate
// 安装人员			installer
// 选择时区			timezone
// 选择日期			sdate
// 选择时间			stime
// 出水水质（ppm)		quality
// 前置滤芯1			frontfilter1
// 前置滤芯2
// 前置滤芯3
// 后置滤芯1			afterfilter
// 后置滤芯2
// 后置滤芯3
// 废水阀泄压 reset
// 重置并重启系统 reset
// 重置时间 reset
// 恢复出厂设置 reset
// 发送设备运行记录 reset
// 休眠  true|false		dormancy
// 休眠开始时间		dormancystart
// 休眠结束时间		dormancyend

const languages = [
    {
        label: '英语',
        value: 'en',
    },
    {
        label: '中文简体',
        value: 'zh-cn',
    },
    {
        label: '中文繁体',
        value: 'zh-tw',
    },
]

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
          timezone: createFormField({
            ...props.timezone,
            value: props.timezone.value,
          }),
          sdate: createFormField({
            ...props.sdate,
            value: props.sdate.value,
          }),
          stime: createFormField({
            ...props.stime,
            value: props.stime.value,
          }),
          quality: createFormField({
            ...props.quality,
            value: props.quality.value,
          }),
          frontfilter1: createFormField({
              ...props.frontfilter1,
              value: props.frontfilter1.value,
          }),
          frontfilter2: createFormField({
            ...props.frontfilter2,
            value: props.frontfilter2.value,
          }),
          frontfilter3: createFormField({
            ...props.frontfilter3,
            value: props.frontfilter3.value,
          }),
          afterfilter1: createFormField({
            ...props.afterfilter1,
            value: props.afterfilter1.value,
          }),
          afterfilter2: createFormField({
            ...props.afterfilter2,
            value: props.afterfilter2.value,
          }),
          afterfilter3: createFormField({
            ...props.afterfilter3,
            value: props.afterfilter3.value,
          }),
          dormancy: createFormField({
            ...props.dormancy,
            value: props.dormancy.value,
          }),
          dormancystart: createFormField({
            ...props.dormancystart,
            value: props.dormancystart.value,
          }),
          dormancyend: createFormField({
            ...props.dormancyend,
            value: props.dormancyend.value,
          }),
          language: createFormField({
            ...props.language,
            value: props.language.value,
          }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { intl:{ formatMessage } } = props;
    const options = timezoneOption();

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
                <Item arrow="horizontal"><FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />
                    <Brief>
                        <div className="item_children">
                        <InputItem
                            placeholder={formatMessage({id: "setting.system.scan"})}
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
                <Item arrow="horizontal"><FormattedMessage id="setting.system.timezone" defaultMessage="选择时区" />
                    <Brief>
                        <div className="item_children">
                        <Picker
                            data={options}
                            cols={1}
                            extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                            {...getFieldProps('timezone', {
                                initialValue: [curTZ],
                            })}
                            >
                            <List.Item></List.Item>
                        </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.sdate" defaultMessage="选择日期" />
                    <Brief>
                        <div className="item_children">
                        <DatePicker
                            mode="date"
                            extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                            {...getFieldProps('sdate')}
                            >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.stime" defaultMessage="选择时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('stime')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('quality',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" />,
                                    }],
                                })}
                            ></InputItem>
                        </div>
                    </Brief>
                </Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter1" defaultMessage="前置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter2" defaultMessage="前置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter3" defaultMessage="前置滤芯3" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter1" defaultMessage="后置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter2" defaultMessage="后置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter3" defaultMessage="后置滤芯3" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.decompression" defaultMessage="废水阀泄压" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resetsystem" defaultMessage="重置并重启系统" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resettime" defaultMessage="重置时间" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.restore" defaultMessage="恢复出厂设置" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.sendlog" defaultMessage="发送设备运行记录" /></List.Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('dormancy', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" /></List.Item>
                <Item><FormattedMessage id="setting.system.dormancystart" defaultMessage="休眠开始时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('dormancystart')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.dormancyend" defaultMessage="休眠开始时间" />
                    <Brief>
                        <div className="item_children">
                            <DatePicker
                                mode="time"
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('dormancyend')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.system.language" defaultMessage="语言" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={languages}
                                cols={1}
                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('language', {
                                    initialValue: ['zh-cn'],
                                })}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
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
        const {dispatch,_id} = this.props;
        dispatch(setuserdevice_request({_id,data:{syssettings:values}}));

        dispatch(ui_set_language(values['language'][0]));
    }

    render () {
        const {locale,syssettings} = this.props;
        const timezone = `${lodashget(syssettings,'timezone',`${curTZ}`)}`;
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
            timezone: {
                value: [timezone]
            },
            sdate: {
                value: '',//lodashget(syssettings,'sdate',''),
            },
            stime: {
                value: '',//lodashget(syssettings,'stime',''),
            },
            quality: {
                value: lodashget(syssettings,'quality',''),
            },
            frontfilter1: {
                value: lodashget(syssettings,'frontfilter1',''),
            },
            frontfilter2: {
                value: lodashget(syssettings,'frontfilter2',''),
            },
            frontfilter3: {
                value: lodashget(syssettings,'frontfilter3',''),
            },
            afterfilter1: {
                value: lodashget(syssettings,'afterfilter1',''),
            },
            afterfilter2: {
                value: lodashget(syssettings,'afterfilter2',''),
            },
            afterfilter3: {
                value: lodashget(syssettings,'afterfilter3',''),
            },
            dormancy: {
                value: lodashget(syssettings,'dormancy',false),
            },
            dormancystart: {
                value: '',//lodashget(syssettings,'dormancystart','sample'),
            },
            dormancyend: {
                value: '',//lodashget(syssettings,'dormancyend','sample'),
            },
            language: {
                value:  [locale],
            }
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

SettingSystem = connect(mapStateToProps)(SettingSystem);
export default SettingSystem;
