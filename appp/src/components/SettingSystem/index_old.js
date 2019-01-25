import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker, Picker, Modal, WhiteSpace } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import _ from 'lodash';
import {ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import 'moment-timezone';
import {scanbarcode} from '../../env/scanbarcode';
import {common_err,ui_set_language,wifi_sendcmd_request,getdevice_request} from '../../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';
import {stringtodate} from '../../util/dateutil';


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

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

const hoursList = lodashmap(hours, (item)=> {
    return {
        label: `${item}时`,
        value: item,
    }
})



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

const dispatch_form_err = (dispatch,errs)=>{
  if(!!errs.deviceid){
    dispatch(common_err({type:'form_err',errmsg:`请先扫描设备二维码`}))
    return;
  }
  dispatch(common_err({type:'form_err',errmsg:`请检查所有输入项`}))
}

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

    const { getFieldProps, validateFields,setFieldsValue} = props.form;
    const { intl:{ formatMessage } ,dispatch} = props;
    const options = timezoneOption();

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

    const showQualitySetup = (e)=> {
        //e.preventDefault();
        props.showModal('modal1');
    }

    const showDormancySetup = (e)=> {
        //e.preventDefault();
        props.showModal('modal2');
    }

    const onClickCmd = (cmd)=>{
      const {dispatch} = props;
      dispatch(wifi_sendcmd_request({cmd}));
    }


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
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={showQualitySetup} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              onClickCmd(`$res_prefilter1%`);//1	前置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter1" defaultMessage="前置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              onClickCmd(`$res_prefilter2%`);//2	前置滤芯2 复位	滤芯寿命复位	$res_prefilter2%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter2" defaultMessage="前置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              onClickCmd(`$res_prefilter3%`);//3	前置滤芯3 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter3" defaultMessage="前置滤芯3" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              onClickCmd(`$res_posfilter1%`);//4	后置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter1" defaultMessage="后置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"   onClick={()=>{
                              onClickCmd(`$res_posfilter2%`);//5	后置滤芯2 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter2" defaultMessage="后置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"   onClick={()=>{
                              onClickCmd(`$res_posfilter3%`);//4	后置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter3" defaultMessage="后置滤芯3" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              onClickCmd(`$decpression%`);//20	废水阀泄压	整机泄压	$decpression%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.decompression" defaultMessage="废水阀泄压" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              onClickCmd(`$sysreset 1%`);//重置重启系统	重启系统	$sysreset 1%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resetsystem" defaultMessage="重置并重启系统" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              //获取当前时间
                              const curdate = moment().format('YY.MM.DD.HH.ss');
                              onClickCmd(`$date ${curdate}%`);//11	重置时间	同步系统时间	$date 18.11.30.13.20% 意思是年.月.日.时.分
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resettime" defaultMessage="重置时间" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              //柠檬酸冲洗	柠檬酸	$app_acid%
                              onClickCmd(`$app_acid%`);//12	柠檬酸冲洗
                            }}>
                                <FormattedMessage id="setting.system.rinse" defaultMessage="冲洗" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.Citric" defaultMessage="柠檬酸冲洗" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              onClickCmd(`$sysinit%`);//12	恢复出厂设置	恢复出厂时的状态	$sysinit%
                            }}>
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
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={showDormancySetup} >
                                <FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" /></List.Item>
                <Item><FormattedMessage id="setting.system.language" defaultMessage="语言" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={languages}
                                cols={1}
                                onOk={
                                  (v)=>{
                                    const language = v[0];
                                    // dispatch(ui_set_language(language));
                                    if(language === 'en'){
                                      // 语言选择：0 ：中文简体，1：中文繁体，2：英语	$charact 0%
                                      const cmd = `$charact 2%`;
                                      onClickCmd(cmd);
                                    }
                                    else if(language === 'zh-cn'){
                                      const cmd = `$charact 0%`;
                                      onClickCmd(cmd);
                                    }
                                    else if(language === 'zh-tw'){
                                      const cmd = `$charact 1%`;
                                      onClickCmd(cmd);
                                    }
                                    console.log(v);
                                  }
                                }
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

    state = {
        Modal1: false,
        modal2: false,
        quality: 0,
        isdormancy: false,
        dormancystart: '',
        dormancyend: '',
    }

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        dispatch(ui_setuserdevice_request({_id,data:{syssettings:values}}));
        // const language = values['language'][0];
        // dispatch(ui_set_language(language));
        // if(language === 'en'){
        //   // 语言选择：0 ：中文简体，1：中文繁体，2：英语	$charact 0%
        //   const cmd = `$charact 2%`;
        //   dispatch(wifi_sendcmd_request({cmd}));
        // }
        // else if(language === 'zh-cn'){
        //   const cmd = `$charact 0%`;
        //   dispatch(wifi_sendcmd_request({cmd}));
        // }
        // else if(language === 'zh-tw'){
        //   const cmd = `$charact 1%`;
        //   dispatch(wifi_sendcmd_request({cmd}));
        // }
    }

    showModal = (key) => {
        this.setState({
          [key]: true,
        });
    }

    onCloseQuality = (e) => {
        //e.preventDefault();
        this.setState({
            modal1: false,
        })
    }

    onQualityChange = (val) => {
        console.log(val);
        this.setState({
            quality: val,
        })
    }

    onQualityClick = () =>{
      //8	出水水质  设置	0~200  ppm	$prodtrigger 120%
        console.log(this.state.quality);
        //
        if(this.state.quality.length > 0){
          const {dispatch} = this.props;
          const cmd = `$prodtrigger ${this.state.quality}%`;
          dispatch(wifi_sendcmd_request({cmd}));
        }
    }

    onCloseDormancy = (e) => {
        //e.preventDefault();
        this.setState({
            modal2: false,
        })
    }

    onDormancyClick = () =>{
      // 14	休眠状态	休眠使能：1 使能 0关闭	$fidle 1%
      // 15	休眠开始时间	开始休眠 如：22	$hroff 22%
      // 16	休眠结束时间	退出休眠 如：6	$hron 22%
      // $fidleoffon 1.22.6%意思是 休眠.开始时间.结束时间

        let dormancy = {
            isdormancy: this.state.isdormancy,
            dormancystart: this.state.dormancystart,
            dormancyend: this.state.dormancyend,
        }
        console.log(dormancy.isdormancy);
        console.log(dormancy.dormancystart);
        console.log(dormancy.dormancyend);

        const {dispatch} = this.props;
        if(dormancy.isdormancy){
        //   const start = moment(dormancy.dormancystart).format('HH');
        //   const end = moment(dormancy.dormancyend).format('HH');
        //   const cmd = `$fidleoffon 1.${start}.${end}%`;
          const cmd = `$fidleoffon 1.${dormancy.dormancystart}.${dormancy.dormancyend}%`;
          dispatch(wifi_sendcmd_request({cmd}));
        }
        else{
          const cmd = `$fidle 0%`;
          dispatch(wifi_sendcmd_request({cmd}));
        }
    }

    render () {
        const {locale,syssettings,dispatch, intl:{ formatMessage }} = this.props;
        const timezone = `${lodashget(syssettings,'timezone',`${curTZ}`)}`;
        const basicData = {
            deviceid: {
                value: lodashget(syssettings,'deviceid',''),
            },
            buydate: {
                value: stringtodate(lodashget(syssettings,'buydate',new Date())),
            },
            installdate: {
                value: stringtodate(lodashget(syssettings,'installdate',new Date())),
            },
            installer: {
                value: lodashget(syssettings,'installer',''),
            },
            timezone: {
                value: [timezone]
            },
            sdate: {
                value: stringtodate(lodashget(syssettings,'sdate',new Date())),
            },
            stime: {
                value: stringtodate(lodashget(syssettings,'stime',new Date())),
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
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch}/>}
                <Modal
                    popup
                    visible={this.state.modal1}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.system.qualitysetup" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.quality}
                                        onChange={(val)=>{this.setState({quality: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.onCloseQuality}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.onQualityClick}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>
                <Modal
                    popup
                    visible={this.state.modal2}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                                <List.Item
                                    extra={<Switch
                                            checked={this.state.isdormancy}
                                            onChange={() => {
                                                this.setState({
                                                    isdormancy: !this.state.isdormancy,
                                                });
                                        }}
                                    />}
                                >{formatMessage({id: "setting.system.isdormancy"})}</List.Item>
                                <Item><FormattedMessage id="setting.system.dormancystart" defaultMessage="休眠开始时间" />
                                    <Brief>
                                        <div className="item_children">
                                            <Picker
                                                data={hoursList}
                                                cols={1}
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                                value={this.state.dormancystart}
                                                onChange={val => this.setState({ dormancystart:val })}
                                                >
                                                <List.Item></List.Item>
                                            </Picker>
                                        </div>
                                    </Brief>
                                </Item>
                                <Item><FormattedMessage id="setting.system.dormancyend" defaultMessage="休眠开始时间" />
                                    <Brief>
                                        <div className="item_children">
                                            <Picker
                                                data={hoursList}
                                                cols={1}
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                                value={this.state.dormancyend}
                                                onChange={val => this.setState({ dormancyend:val })}
                                                >
                                                <List.Item></List.Item>
                                            </Picker>
                                        </div>
                                    </Brief>
                                </Item>
                                <WingBlank  className="submit_zone dual_btn wb_margin">
                                    <div className="add_btn_left" style={{display: 'inline-block'}} >
                                        <Button type="ghost" className="btn" onClick={this.onCloseDormancy}>
                                            <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                        </Button>
                                    </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                    <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                        <Button type="ghost" className="btn" onClick={this.onDormancyClick}>
                                            <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                        </Button>
                                    </div>
                                </WingBlank>
                            </List>
                        </WingBlank>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps =  ({device:{syssettings,_id},app:{locale},userlogin:{truename}}) =>{
  if(!syssettings.installer){
    syssettings.installer = truename;
  }
  return {locale,syssettings,_id};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
