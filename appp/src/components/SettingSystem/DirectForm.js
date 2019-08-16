import React from 'react'
import {  List, Button, Picker } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
// import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import { injectIntl, FormattedMessage } from 'react-intl';
import { common_err, wifi_sendcmd_request, set_confirm } from '../../actions';
import {getintlmessage,intl} from '../../util/globalIntl';

const Item = List.Item;
const Brief = Item.Brief;

// const timezoneOption = () => {
//     const timeZones = moment.tz.names();
//     const offsetTmz = [];

//     for (const i in timeZones) {
//       const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
//       let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

//       const timeZone = {
//         label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
//         value: `${timeZones[i]}`,
//         time: `${x}`,
//       };
//       offsetTmz.push(timeZone);
//     }

//     return _.sortBy(offsetTmz, [function (el) { return -(el.time); }]);
// }


const languages = [
    {
        label: 'English',
        value: 'en',
    },
    {
        label: '中文简体',
        value: 'zh-cn',
    },
    {
        label: '中文繁體',
        value: 'zh-tw',
    },
]




const formOptions = {
    mapPropsToFields(props) {
        return {
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
                this.dispatch_form_err(this.props.dispatch,err);
            }
        })
    }

    dispatch_form_err = (dispatch,errs)=>{
      const { intl } = this.props
      if(!!errs.deviceid){
        dispatch(common_err({type:'form_err',errmsg: intl.formatMessage({id: 'form.qrcode'})}))
        return;
      }
      dispatch(common_err({type:'form_err',errmsg: intl.formatMessage({id: 'form.check'})}))
    }

    showQualitySetup = (e)=> {
        //e.preventDefault();
        this.props.showModal('modal1');
    }

    showDormancySetup = (e)=> {
        //e.preventDefault();
        this.props.showModal('modal2');
    }

    onClickCmd = (cmd,cmdstring='设置',target)=>{
        const { dispatch, intl } = this.props;
        const reqobj = !!target ? {cmd,cmdstring,target}:{cmd,cmdstring};
        dispatch(set_confirm({
          title: `${intl.formatMessage({id: 'form.confirm'})}`,
          message: `${cmdstring}?`,
          text: [`${intl.formatMessage({id: 'form.cancel'})}`, `${intl.formatMessage({id: 'form.ok'})}`],
          command: wifi_sendcmd_request(reqobj)
        }))

        // dispatch(wifi_sendcmd_request({cmd,cmdstring}));
    }

    render () {
        const { intl } = this.props;
        const { getFieldProps } = this.props.form;

        return (
        <React.Fragment>
        <form>
            <List>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={this.showQualitySetup} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.quality" defaultMessage="出水水质（ppm）" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$res_modlife%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.modlife'})}`);//1	电离子膜 复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.modlife" defaultMessage="电离子膜" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$res_prefilter1%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.frontfilter1'})}`);//1	前置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter1" defaultMessage="前置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              this.onClickCmd(`$res_prefilter2%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.frontfilter2'})}`);//2	前置滤芯2 复位	滤芯寿命复位	$res_prefilter2%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter2" defaultMessage="前置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              this.onClickCmd(`$res_prefilter3%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.frontfilter3'})}`);//3	前置滤芯3 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.frontfilter3" defaultMessage="前置滤芯3" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$res_posfilter1%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.afterfilter1'})}`);//4	后置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter1" defaultMessage="后置滤芯1" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"   onClick={()=>{
                              this.onClickCmd(`$res_posfilter2%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.afterfilter2'})}`);//5	后置滤芯2 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter2" defaultMessage="后置滤芯2" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"   onClick={()=>{
                              this.onClickCmd(`$res_posfilter3%`,`${intl.formatMessage({id: 'setting.system.resetbt'})} ${intl.formatMessage({id: 'setting.system.afterfilter3'})}`);//4	后置滤芯1 复位	滤芯寿命复位
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.afterfilter3" defaultMessage="后置滤芯3" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$prep%`,`${intl.formatMessage({id: 'setting.system.exhaustwash'})}`);
                            }} >
                                <FormattedMessage id="setting.system.rinse" defaultMessage="冲洗" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.exhaustwash" defaultMessage="排气冲洗" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$sysreset 1%`,`${intl.formatMessage({id: 'setting.system.resetsystem'})}`);//重置重启系统	重启系统	$sysreset 1%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resetsystem" defaultMessage="重置并重启系统" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$sysstart%`,`${intl.formatMessage({id: 'setting.system.lanuchsystem'})}`);//启动运行	$sysstart%
                            }}>
                                <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.lanuchsystem" defaultMessage="启动运行" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
                              //获取当前时间
                              const curdate = moment().format('YY.MM.DD.HH.mm');
                              this.onClickCmd(`$date ${curdate}%`,`${intl.formatMessage({id: 'setting.system.resettime'})}`);//11	重置时间	同步系统时间	$date 18.11.30.13.20% 意思是年.月.日.时.分
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.resettime" defaultMessage="重置时间" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              //柠檬酸冲洗	柠檬酸	$app_acid%
                              this.onClickCmd(`$app_acid%`,`${intl.formatMessage({id: 'setting.system.Citric'})}`);//12	柠檬酸冲洗
                            }}>
                                <FormattedMessage id="setting.system.rinse" defaultMessage="冲洗" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.Citric" defaultMessage="柠檬酸冲洗" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$decpression%`,`${intl.formatMessage({id: 'setting.system.decompression'})}`);//20	废水阀泄压	整机泄压	$decpression%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.decompression" defaultMessage="废水阀泄压" /></List.Item>

                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn"  onClick={()=>{
                              this.onClickCmd(`$sysinit%`,`${intl.formatMessage({id: 'setting.system.restore'})}`);//12	恢复出厂设置	恢复出厂时的状态	$sysinit%
                            }}>
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.restore" defaultMessage="恢复出厂设置" /></List.Item>

                {/* <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" >
                                <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.sendlog" defaultMessage="发送设备运行记录" /></List.Item> */}

                {/* <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={this.showDormancySetup} >
                                <FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" /></List.Item> */}
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
                                      this.onClickCmd(cmd,intl.formatMessage({id: 'constcmd.cmdstring.language2'}),{fieldname:'syssettings.language',value:'en'});
                                    }
                                    else if(language === 'zh-cn'){
                                      const cmd = `$charact 0%`;
                                      this.onClickCmd(cmd,intl.formatMessage({id: 'constcmd.cmdstring.language0'}),{fieldname:'syssettings.language',value:'zh-cn'});
                                    }
                                    else if(language === 'zh-tw'){
                                      const cmd = `$charact 1%`;
                                      this.onClickCmd(cmd,intl.formatMessage({id: 'constcmd.cmdstring.language1'}),{fieldname:'syssettings.language',value:'zh-tw'});
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
