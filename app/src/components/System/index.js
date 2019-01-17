import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, Switch, Picker, Modal, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { createForm, createFormField } from 'rc-form';
import moment from 'moment';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {ui_set_language} from '../../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';
import {common_err, wifi_sendcmd_request,getdevice_request} from '../../actions';

const Item = List.Item;
const Brief = Item.Brief;

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

const hoursList = lodashmap(hours, (item)=> {
    return {
        label: `${item}时`,
        value: item,
    }
})

// 出水水质（ppm)		quality
// 废水阀泄压 reset
// 重置并重启系统 reset
// 重置时间 reset
// 恢复出厂设置 reset
// 发送设备运行记录 reset


const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          quality: createFormField({
            ...props.quality,
            value: props.quality.value,
          }),
        };
    }
})(withRouter(injectIntl((props)=>{
    const { validateFields } = props.form;
    const { history } = props;

    const handleSubmit = (e)=>{
        e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    const showQualitySetup = (e)=> {
        e.preventDefault();
        props.showModal('modal1');
    }

    const showDormancySetup = (e)=> {
        e.preventDefault();
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
                              onClickCmd(`$decpression%`);//20	废水阀泄压	整机泄压	$decpression%
                            }} >
                                <FormattedMessage id="setting.system.resetbt" defaultMessage="重置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.decompression" defaultMessage="废水阀泄压" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
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
                            <Button size="small" type="ghost" className="btn" onClick={()=>{
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
                            <Button size="small" type="ghost" className="btn" onClick={(showDormancySetup)} >
                                <FormattedMessage id="setting.system.dormancy" defaultMessage="休眠" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.system.dormancy" /></List.Item>
                <List.Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 80, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{history.push('/change')}}>
                                <FormattedMessage id="login.changepassword" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="login.changepassword" /></List.Item>
            </List>
        </form>
        <WingBlank className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
})))

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
        //这里不能这样设置，会替换原先数据
        const {dispatch,_id,syssettings} = this.props;
        // syssettings.xxx = values.xxx
        console.log(syssettings);
        dispatch(setuserdevice_request({_id,data:{syssettings}}));

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
        const { syssettings, dispatch, intl:{ formatMessage }} = this.props;
        const basicData = {
            quality: {
                value: lodashget(syssettings,'quality',''),
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
        }
        console.log(basicData)
        return (
            <div className="sub_setting_bg">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch} />}
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

const mapStateToProps =  ({device:{locale,syssettings,_id}}) =>{
  return {locale,syssettings,_id};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
