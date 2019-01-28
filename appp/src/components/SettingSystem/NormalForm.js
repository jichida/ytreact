import React from 'react'
import {  List, InputItem, Button, WingBlank, DatePicker, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import {scanbarcode} from '../../env/scanbarcode';
import { injectIntl, FormattedMessage } from 'react-intl';
import { common_err, wifi_sendcmd_request, getdevice_request} from '../../actions';


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

const dispatch_form_err = (dispatch,errs)=>{
    if(!!errs.deviceid){
      dispatch(common_err({type:'form_err',errmsg:`请先扫描设备二维码`}))
      return;
    }
    dispatch(common_err({type:'form_err',errmsg:`请检查所有输入项`}))
  }
  

const formOptions = {
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
          })
        };
    }
}

class Index extends React.Component {

    handleSubmit = (e)=>{
        const { validateFields } = this.props.form;
        validateFields((err, values)=>{
            if(!err){
               this.props.onSubmit(values);
            }
            else{
                console.log(err)
                dispatch_form_err(this.props.dispatch,err);
            }
        })
    }

    onClickCmd = (cmd)=>{
        const { dispatch } = this.props;
        dispatch(wifi_sendcmd_request({cmd}));
    }

    render () {
        const { getFieldProps, setFieldsValue} = this.props.form;
        const { intl:{ formatMessage } ,dispatch} = this.props;
        const options = timezoneOption();

    return (
        <React.Fragment>
        <form>
            <List>
                <Item arrow="horizontal"><FormattedMessage id="setting.system.deviceid" defaultMessage="设备编号" />
                    <Brief>
                        <div className="item_children">
                        <InputItem
                            editable={false}
                            onClick={()=>{
                             scanbarcode((result)=>{
                              //  alert(JSON.stringify(result));
                              // {
                              // "code": "0/-1",
                              // "data": "扫描结果/失败原因",
                              // "message": "扫描结果/失败原因"
                              // }
                              if(result.code === 0){
                                setFieldsValue({deviceid:result.data})
                                dispatch(getdevice_request({'syssettings.deviceid':result.data}));
                              }
                              //  alert(JSON.stringify(result));//<---这里判断code是否为0，如果为0，表示成功；去取data的值
                             });
                           }}
                            placeholder={formatMessage({id: "setting.system.scan"})}
                            {...getFieldProps('deviceid',{
                                validateTrigger: 'onBlur',
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
                            editable={false}
                            placeholder={formatMessage({id: "form.input"})}
                            {...getFieldProps('installer',{
                                validateTrigger: 'onBlur',
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
            </List>
        </form>
        {/* <WingBlank className="submit_zone" style={{padding: '30px 0px'}}>
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={this.handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </WingBlank> */}
        </React.Fragment>
    )
    }
}

export default createForm(formOptions)(injectIntl(Index))

