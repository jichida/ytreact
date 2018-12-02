import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, Switch, DatePicker, Modal, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { createForm, createFormField } from 'rc-form';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import {ui_set_language} from '../../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';


const Item = List.Item;
const Brief = Item.Brief;

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
        <WingBlank className="submit_zone" style={{padding: '30px 0px'}}>
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
        const {dispatch,_id} = this.props;
        dispatch(setuserdevice_request({_id,data:{syssettings:values}}));

        dispatch(ui_set_language(values['language'][0]));
    }

    showModal = (key) => {
        this.setState({
          [key]: true,
        });
    }

    onCloseQuality = (e) => {
        e.preventDefault();
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
        console.log(this.state.quality);
    }

    onCloseDormancy = (e) => {
        e.preventDefault();
        this.setState({
            modal2: false,
        })
    }

    onDormancyClick = () =>{
        let dormancy = {
            isdormancy: this.state.isdormancy,
            dormancystart: this.state.dormancystart,
            dormancyend: this.state.dormancyend,
        }
        console.log(dormancy.isdormancy);
        console.log(dormancy.dormancystart);
        console.log(dormancy.dormancyend);
    }

    render () {
        const { syssettings, intl:{ formatMessage }} = this.props;
        const basicData = {
            quality: {
                value: lodashget(syssettings,'quality',''),
            },
        }
        console.log(basicData)
        return (
            <div className="sub_setting_bg">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} />}
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
                                            <DatePicker
                                                mode="time"
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                                value={this.state.dormancystart}
                                                onChange={date => this.setState({ dormancystart:date })}
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
                                                value={this.state.dormancyend}
                                                onChange={date => this.setState({ dormancyend:date })}
                                                >
                                                <List.Item arrow="horizontal"></List.Item>
                                            </DatePicker>
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
