import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {common_err,ui_setuserdevice_request,
    wifi_getssidlist_request,wifi_getssidlist_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
import lodashget from 'lodash.get';
import {  List, InputItem, Button, Switch, ActionSheet } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.less';
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }



const Item = List.Item;
const Brief = Item.Brief;
const dispatch_form_err = (dispatch,errs)=>{
  dispatch(common_err({type:'form_err',errmsg:`请检查所有输入项`}))
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          ssid: createFormField({
            ...props.ssid,
            value: props.ssid.value,
          }),
          password: createFormField({
            ...props.password,
            value: props.password.value,
          }),
          dhcp: createFormField({
                ...props.dhcp,
                value: props.dhcp.value,
          }),
          ip: createFormField({
                ...props.ip,
                value: props.ip.value,
          }),
          gateway: createFormField({
                ...props.gateway,
                value: props.gateway.value,
          }),
          lan: createFormField({
                ...props.lan,
                value: props.lan.value,
          }),
          dns: createFormField({
            ...props.dns,
            value: props.dns.value,
      }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields, setFieldsValue, getFieldValue } = props.form;
    const { intl: { formatMessage },dispatch} = props;
    const title = formatMessage({id: 'start.wifi.select'});

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

    const showActionSheet = (title) => {
        dispatch(callthen(wifi_getssidlist_request,wifi_getssidlist_result,{}))
        .then((wifilist)=>{
          // debugger;
          const canceltext = formatMessage({id: 'form.cancel'});
          let wifitxtlist = [];
          for(let i = 0 ;i < wifilist.length; i++){
            wifitxtlist.push(wifilist[i].ssid)
          }
          let BUTTONS = [...wifitxtlist,canceltext];//"form.cancel"

          ActionSheet.showActionSheetWithOptions({
              options: BUTTONS,
              cancelButtonIndex: BUTTONS.length - 1,
              title: title,
              maskClosable: true,
              'data-seed': 'logId',
              // wrapProps,
          },
          (buttonIndex) => {
            if(buttonIndex !== wifilist.length){
                setFieldsValue({ssid:  wifilist[buttonIndex].ssid})
            }
          });
        }).catch((e)=>{
          console.log(e);
        });//refresh

    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="setting.wifi.ssid" defaultMessage="WIFI SSID" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                onClick={()=>showActionSheet(title)}
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('ssid',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.ssid" defaultMessage="WIFI SSID" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="setting.wifi.password" defaultMessage="WIFI 密码" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('password',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.wifi.password" defaultMessage="WIFI 密码" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <List.Item className="item_switch"
                    extra={<Switch
                        {...getFieldProps('dhcp', {
                            valuePropName: 'checked',
                        })}
                    />}
                ><FormattedMessage id="setting.wifi.dhcp" defaultMessage="动态主机设置协议" /></List.Item>
                <Item><span style={{color: !getFieldValue('dhcp')&&'#a0a0a2'}}><FormattedMessage id="setting.wifi.ip" defaultMessage="IP地址" /></span>
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                disabled={!getFieldValue('dhcp')}
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('ip',{
                                    rules: [{
                                        message: <FormattedMessage id="setting.wifi.ip" defaultMessage="IP地址" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><span style={{color: !getFieldValue('dhcp')&&'#a0a0a2'}}><FormattedMessage id="setting.wifi.gateway" defaultMessage="网关" /></span>
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                disabled={!getFieldValue('dhcp')}
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('gateway',{
                                    rules: [{
                                        message: <FormattedMessage id="setting.wifi.gateway" defaultMessage="网关" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><span style={{color: !getFieldValue('dhcp')&&'#a0a0a2'}}><FormattedMessage id="setting.wifi.lan" defaultMessage="局域网" /></span>
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                disabled={!getFieldValue('dhcp')}
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('lan',{
                                    rules: [{
                                        message: <FormattedMessage id="setting.wifi.lan" defaultMessage="局域网" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><span style={{color: !getFieldValue('dhcp')&&'#a0a0a2'}}><FormattedMessage id="setting.wifi.dns" defaultMessage="主网域服务器" /></span>
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                disabled={!getFieldValue('dhcp')}
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('dns',{
                                    rules: [{
                                        message: <FormattedMessage id="setting.wifi.dns" defaultMessage="主网域服务器" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}><FormattedMessage id="form.save" defaultMessage="保存" /></Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class Wifi extends PureComponent{

    handleSubmit = (values)=>{
      console.log(values);
      const {dispatch,_id} = this.props;
      dispatch(ui_setuserdevice_request({_id,data:{wifisettings:values}}));
    }


    render () {

     // ssid		SSID
     // 密码		password
     // 动态主机设置协议	DHCP
     // IP地址		IP
     // 网关		gateway
     // 局域网 		LAN
     // 主网域服务器	DNS
     const {wifisettings,dispatch} = this.props;
     const basicData = {
         ssid: {
             value:lodashget(wifisettings,'ssid',''),
         },
         password: {
             value: lodashget(wifisettings,'password',''),
         },
         dhcp: {
             value: lodashget(wifisettings,'dhcp',''),
         },
         ip: {
             value: lodashget(wifisettings,'ip',''),
         },
         gateway: {
             value: lodashget(wifisettings,'gateway',''),
         },
         lan: {
             value: lodashget(wifisettings,'lan',''),
         },
         dns: {
             value: lodashget(wifisettings,'dns',''),
         }
     }
        return (
            <div className="sub_setting_bg">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} dispatch={dispatch}/>}
            </div>
        )
    }
}
const mapStateToProps =  ({device:{wifisettings,_id}}) =>{
  return {wifisettings,_id};
};

Wifi = connect(mapStateToProps)(Wifi);
export default withRouter(Wifi);
