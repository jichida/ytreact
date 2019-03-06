import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, Modal, WingBlank, WhiteSpace  } from 'antd-mobile';//
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,tmp_ui_setuserdevice_request, wifi_sendcmd_request,set_weui} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 进水TDS值(mg/l)	tds
// 进水导电率(us/cm)	conductivity
// 进水硬度	hardness
// 进水碱度(ppm)	alkalinity
// ph值		ph
// 用户需求出水TDS值	usertds


const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          tds: createFormField({
            ...props.tds,
            value: props.tds.value,
          }),
          conductivity: createFormField({
            ...props.conductivity,
            value: props.conductivity.value,
          }),
          hardness: createFormField({
                ...props.hardness,
                value: props.hardness.value,
          }),
          alkalinity: createFormField({
                ...props.alkalinity,
                value: props.alkalinity.value,
          }),
          ph: createFormField({
                ...props.ph,
                value: props.ph.value,
          }),
        //   bucket: createFormField({
        //         ...props.bucket,
        //         value: props.bucket.value,
        //   }),
        };
    }
})(injectIntl((props)=>{
    const { validateFields } = props.form;
    const { dispatch, intl} = props;

    const dispatch_form_err = (dispatch,errs)=>{
        dispatch(common_err({type:'form_err',errmsg: intl.formatMessage({id: 'form.check'})}))
    }

    const handleSubmit = (e)=>{
        //e.preventDefault();

        // validateFields((err, values)=>{
        //     if(!err){
        //         props.onSubmit(values);
        //     }
        //     else{
        //       console.log(err)
        //       dispatch_form_err(dispatch,err);
        //     }
        // })

        props.onSubmit()
    }

    // const handleBucketSelect = (value)=>{
    //     setFieldsValue({bucket: value});
    // }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalPH')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.ph" defaultMessage="PH值" /></Item>
                {/* <Item><FormattedMessage id="setting.water.ph" defaultMessage="PH值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('ph',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.ph" defaultMessage="ph值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalConductivity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" /></Item>
                {/* <Item><FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('conductivity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalTDS')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" /></Item>
                {/* <Item><FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('tds',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalHardness')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" /></Item>

                {/* <Item><FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('hardness',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalAlkalinity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" /></Item>
                {/* <Item><FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                type="money"
                                extra=">"
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('alkalinity',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                {/* <Item><FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />
                    <Brief>
                        <div className="item_children">
                            <Buckets
                                {...getFieldProps('bucket',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />,
                                    }],
                                })}
                                onChange={handleBucketSelect}
                            />
                        </div>
                    </Brief>
                </Item> */}
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.synctosave" defaultMessage="同步到本地" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))
//
// const InputModal = ({isVisual, title_key, value, onValueChange, onClose, onSubmit, inputPlaceholder})=>{
//     return (
//         <Modal
//             popup
//             visible={isVisual}
//             animationType="slide-up"
//         >
//             <div className="setting-modal">
//                 <WingBlank className="wb_margin">
//                     <List>
//                     <Item>
//                         <FormattedMessage id={title_key} />
//                         <Brief>
//                             <div className="item_children">
//                             <InputItem
//                                 placeholder={inputPlaceholder}
//                                 value={value}
//                                 onChange={(val)=>{onValueChange(val)}}
//                             />
//                             </div>
//                         </Brief>
//                     </Item>
//                     </List>
//                     <WingBlank  className="submit_zone dual_btn">
//                         <div className="add_btn_left" style={{display: 'inline-block'}} >
//                             <Button type="ghost" className="btn" onClick={onClose}>
//                                 <FormattedMessage id="form.cancel" defaultMessage="取消" />
//                             </Button>
//                         </div>
//                         <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
//                         <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
//                             <Button type="ghost" className="btn" onClick={onSubmit}>
//                                 <FormattedMessage id="setting.system.send" defaultMessage="发送" />
//                             </Button>
//                         </div>
//                     </WingBlank>
//                 </WingBlank>
//             </div>
//         </Modal>
//     )
// }

class Inlet extends PureComponent{
  constructor(props) {
      super(props)
      const {inwatersettings} = props;
      this.state = {
        modalTDS: false,
        modalPH: false,
        modalConductivity: false,
        modalHardness: false,
        modalAlkalinity: false,
        tds:lodashget(inwatersettings,'tds',''),
        conductivity: lodashget(inwatersettings,'conductivity',''),
        hardness: lodashget(inwatersettings,'hardness',''),
        alkalinity: lodashget(inwatersettings,'alkalinity',''),
        ph:lodashget(inwatersettings,'ph',''),
      }
    }

    componentWillReceiveProps(nextProps) {
      const nextData = lodashget(nextProps,'inwatersettings',{});
      const curData = lodashget(this.props,'inwatersettings',{});
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          return;
        }
      }
      this.setState({
        tds:lodashget(nextData,'tds',''),
        conductivity: lodashget(nextData,'conductivity',''),
        hardness: lodashget(nextData,'hardness',''),
        alkalinity: lodashget(nextData,'alkalinity',''),
        ph:lodashget(nextData,'ph',''),
      });
    }

    handleSubmit = ()=>{
        let { ph, conductivity, hardness, alkalinity, tds } = this.state
        const values = { ph, conductivity, hardness, alkalinity, tds }
        console.log(values)

        const {dispatch} = this.props;
        dispatch(tmp_ui_setuserdevice_request({inwatersettings:values}));
    }

    showModal = (modal) => {
        this.setState({
          [modal]: true,
        });
    }

    handleClose = () => {
        this.setState({
            modalAlkalinity: false,
            modalConductivity: false,
            modalHardness: false,
            modalPH: false,
            modalTDS: false,
        })
    }

    handlePHSubmit = () => {
        console.log(this.state.ph);
        const {dispatch} = this.props;
        let isvalid = this.state.ph.length > 0;
        let iph = 0;
        if(isvalid){
          iph = parseFloat(this.state.ph)*10;
          iph = parseInt(`${iph}`,10);
          isvalid = iph >= 0 && iph<= 150;
        }

        if(isvalid){
          const cmd = `$feedph ${iph}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置PH'}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请输入正确的ph值',
            show: true,
            type:'warning'
          }}));
        }
    }
    handleConductivitySubmit = () => {
        console.log(this.state.conductivity);
        const {dispatch} = this.props;
        if(this.state.conductivity.length > 0){
          const cmd = `$feedcon ${this.state.conductivity}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置导电率值'}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请输入导电率值',
            show: true,
            type:'warning'
          }}));
        }
    }
    handleTDSSubmit = () => {
        console.log(this.state.tds);
        const {dispatch} = this.props;
        if(this.state.tds.length > 0){
          const cmd = `$feedtds ${this.state.tds}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置TDS值'}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请输入TDS值',
            show: true,
            type:'warning'
          }}));
        }
    }
    handleHardnessSubmit = () => {
        console.log(this.state.hardness);
        const {dispatch} = this.props;
        if(this.state.hardness.length > 0){
          const cmd = `$feedca ${this.state.hardness}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置进水硬度值'}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请进水硬度值',
            show: true,
            type:'warning'
          }}));
        }
    }
    handleAlkalinitySubmit = () => {
        console.log(this.state.alkalinity);
        const {dispatch} = this.props;
        if(this.state.alkalinity.length > 0){
          const cmd = `$feedalk ${this.state.alkalinity}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置进水咸度值'}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请进水咸度值',
            show: true,
            type:'warning'
          }}));
        }
    }

    render () {
        const {inwatersettings,dispatch} = this.props;
        const { formatMessage } = this.props.intl;

        const basicData = {
            tds: {
                value:lodashget(inwatersettings,'tds',''),
            },
            conductivity: {
                value:lodashget(inwatersettings,'conductivity',''),
            },
            hardness: {
                value: lodashget(inwatersettings,'hardness',''),
            },
            alkalinity: {
                value: lodashget(inwatersettings,'alkalinity',''),
            },
            ph: {
                value: lodashget(inwatersettings,'ph',''),
            },
        }
        return (
            <div className="sub_setting_bg">
                <RenderForm {...basicData}
                    onSubmit={this.handleSubmit}
                    showModal={this.showModal}
                    dispatch={dispatch}/>
                {/* { <InputModal
                    isVisual={this.state.modalVisual}
                    title_key="setting.water.tds"
                    value={this.state.tds}
                    onValueChange={this.handleTDSChange}
                    onClose={this.handleTDSClose}
                    onSubmit={this.handleTDSSubmit}
                    inputPlaceholder={this.props.intl.formatMessage({id: "form.input"})} />
                } */}

                <Modal
                    popup
                    visible={this.state.modalPH}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.ph" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.ph}
                                        defaultValue={inwatersettings.ph}
                                        onChange={(val)=>{this.setState({ph: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handlePHSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalConductivity}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.conductivity" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.conductivity}
                                        defaultValue={inwatersettings.conductivity}
                                        onChange={(val)=>{this.setState({conductivity: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleConductivitySubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalTDS}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.tds" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.tds}
                                        defaultValue={inwatersettings.tds}
                                        onChange={(val)=>{this.setState({tds: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleTDSSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalHardness}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.hardness" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.hardness}
                                        defaultValue={inwatersettings.hardness}
                                        onChange={(val)=>{this.setState({hardness: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleHardnessSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalAlkalinity}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.alkalinity" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.alkalinity}
                                        defaultValue={inwatersettings.alkalinity}
                                        onChange={(val)=>{this.setState({alkalinity: val})}}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleAlkalinitySubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

            </div>

        )
    }
}

const mapStateToProps =  ({devicedata:{inwatersettings,_id}}) =>{
  return {inwatersettings,_id};
};

Inlet = connect(mapStateToProps)(Inlet);
export default withRouter(injectIntl(Inlet));
