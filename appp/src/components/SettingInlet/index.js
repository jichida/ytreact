import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, Modal, WingBlank, WhiteSpace  } from 'antd-mobile';//
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,tmp_ui_setuserdevice_request, wifi_sendcmd_request,set_weui} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import {getintlmessage,intl} from '../../util/globalIntl';
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
        //   rawtds: createFormField({
        //     ...props.rawtds,
        //     value: props.rawtds.value,
        //   }),
        //   rawconductivity: createFormField({
        //     ...props.rawconductivity,
        //     value: props.rawconductivity.value,
        //   }),
        //   rawhardness: createFormField({
        //         ...props.rawhardness,
        //         value: props.rawhardness.value,
        //   }),
        //   rawalkalinity: createFormField({
        //         ...props.rawalkalinity,
        //         value: props.rawalkalinity.value,
        //   }),
        //   rawph: createFormField({
        //         ...props.rawph,
        //         value: props.rawph.value,
        //   }),
        //   bucket: createFormField({
        //         ...props.bucket,
        //         value: props.bucket.value,
        //   }),
        };
    }
})(injectIntl((props)=>{
    const { validateFields } = props.form;
    const { dispatch, intl} = props;
    const { tds, conductivity, hardness, alkalinity, ph } = props;
    // const { rawtds, rawconductivity, rawhardness, rawalkalinity, rawph } = props;
    console.log('Setting Inlet Props:', props)

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
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalPH')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.ph" defaultMessage="PH值" /><Brief>{ph.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalConductivity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" /><Brief>{conductivity.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalTDS')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" /><Brief>{tds.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalHardness')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" /><Brief>{hardness.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: '70px', display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalAlkalinity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" /><Brief>{alkalinity.value}</Brief></Item>
                {/* <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalrawPH')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.rawph" defaultMessage="原水PH值" /><Brief>{rawph.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalrawConductivity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.rawconductivity" defaultMessage="原水导电率" /><Brief>{rawconductivity.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalrawTDS')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.rawtds" defaultMessage="原水TDS值" /><Brief>{rawtds.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalrawHardness')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.rawhardness" defaultMessage="原水硬度" /><Brief>{rawhardness.value}</Brief></Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.showModal('modalrawAlkalinity')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="setting.water.rawalkalinity" defaultMessage="原水碱度" /><Brief>{rawalkalinity.value}</Brief></Item> */}
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
        {/* <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.synctosave" defaultMessage="同步到本地" />
                </Button>
            </div>
        </div> */}
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
        // modalrawTDS: false,
        // modalrawPH: false,
        // modalrawConductivity: false,
        // modalrawHardness: false,
        // modalrawAlkalinity: false,
        tds:lodashget(inwatersettings,'tds',''),
        conductivity: lodashget(inwatersettings,'conductivity',''),
        hardness: lodashget(inwatersettings,'hardness',''),
        alkalinity: lodashget(inwatersettings,'alkalinity',''),
        ph:lodashget(inwatersettings,'ph',''),
        // rawtds:lodashget(inwatersettings,'rawtds',''),
        // rawconductivity: lodashget(inwatersettings,'rawconductivity',''),
        // rawhardness: lodashget(inwatersettings,'rawhardness',''),
        // rawalkalinity: lodashget(inwatersettings,'rawalkalinity',''),
        // rawph:lodashget(inwatersettings,'rawph',''),
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
            // modalrawAlkalinity: false,
            // modalrawConductivity: false,
            // modalrawHardness: false,
            // modalrawPH: false,
            // modalrawTDS: false,
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.feedph'),target:{
            fieldname:'inwatersettings.ph',
            value:`${this.state.ph}`
          }}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:intl.formatMessage({id: 'formpopup.weui.correctph'}),//'请输入正确的ph值',
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.feedcon'),target:{
            fieldname:'inwatersettings.conductivity',
            value:`${this.state.conductivity}`
          }}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:intl.formatMessage({id: 'formpopup.weui.correctconductivity'}),//'请输入导电率值',
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.feedtds'),target:{
            fieldname:'inwatersettings.tds',
            value:`${this.state.tds}`
          }}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:intl.formatMessage({id: 'formpopup.weui.correcttds'}),//'请输入TDS值',
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.feedca'),target:{
            fieldname:'inwatersettings.hardness',
            value:`${this.state.hardness}`
          }}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:intl.formatMessage({id: 'formpopup.weui.correcthardness'}),//'请进水硬度值',
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.feedalk'),target:{
            fieldname:'inwatersettings.alkalinity',
            value:`${this.state.alkalinity}`
          }}));
          this.handleClose();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:intl.formatMessage({id: 'formpopup.weui.correctalkalinity'}),//'请进水咸度值',
            show: true,
            type:'warning'
          }}));
        }
    }

    // handlerawPHSubmit = () => {
    //     console.log(this.state.rawph);
    //     const {dispatch} = this.props;
    //     let isvalid = this.state.rawph.length > 0;
    //     let iph = 0;
    //     if(isvalid){
    //       iph = parseFloat(this.state.rawph)*10;
    //       iph = parseInt(`${iph}`,10);
    //       isvalid = iph >= 0 && iph<= 150;
    //     }

    //     if(isvalid){
    //       const cmd = `$feedph ${iph}%`; // 原水ph 命令
    //       dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置原水PH',target:{
    //         fieldname:'inwatersettings.rawph',
    //         value:`${this.state.rawph}`
    //       }}));
    //       this.handleClose();
    //     }
    //     else{
    //       dispatch(set_weui({
    //         toast:{
    //         text:'请输入正确的原水ph值',
    //         show: true,
    //         type:'warning'
    //       }}));
    //     }
    // }
    // handlerawConductivitySubmit = () => {
    //     console.log(this.state.rawconductivity);
    //     const {dispatch} = this.props;
    //     if(this.state.rawconductivity.length > 0){
    //       const cmd = `$feedcon ${this.state.rawconductivity}%`; // 原水导电率 命令
    //       dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置原水导电率值',target:{
    //         fieldname:'inwatersettings.rawconductivity',
    //         value:`${this.state.rawconductivity}`
    //       }}));
    //       this.handleClose();
    //     }
    //     else{
    //       dispatch(set_weui({
    //         toast:{
    //         text:'请输入原水导电率值',
    //         show: true,
    //         type:'warning'
    //       }}));
    //     }
    // }
    // handlerawTDSSubmit = () => {
    //     console.log(this.state.rawtds);
    //     const {dispatch} = this.props;
    //     if(this.state.rawtds.length > 0){
    //       const cmd = `$feedtds ${this.state.rawtds}%`;// 原水tds 命令
    //       dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置原水TDS值',target:{
    //         fieldname:'inwatersettings.rawtds',
    //         value:`${this.state.rawtds}`
    //       }}));
    //       this.handleClose();
    //     }
    //     else{
    //       dispatch(set_weui({
    //         toast:{
    //         text:'请输入原水TDS值',
    //         show: true,
    //         type:'warning'
    //       }}));
    //     }
    // }
    // handlerawHardnessSubmit = () => {
    //     console.log(this.state.rawhardness);
    //     const {dispatch} = this.props;
    //     if(this.state.rawhardness.length > 0){
    //       const cmd = `$feedca ${this.state.rawhardness}%`; // 原水硬度值 命令
    //       dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置原水硬度值',target:{
    //         fieldname:'inwatersettings.rawhardness',
    //         value:`${this.state.rawhardness}`
    //       }}));
    //       this.handleClose();
    //     }
    //     else{
    //       dispatch(set_weui({
    //         toast:{
    //         text:'请原水硬度值',
    //         show: true,
    //         type:'warning'
    //       }}));
    //     }
    // }
    // handlerawAlkalinitySubmit = () => {
    //     console.log(this.state.rawalkalinity);
    //     const {dispatch} = this.props;
    //     if(this.state.rawalkalinity.length > 0){
    //       const cmd = `$feedalk ${this.state.rawalkalinity}%`;// 原水咸度值 命令
    //       dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置原水咸度值',target:{
    //         fieldname:'inwatersettings.rawalkalinity',
    //         value:`${this.state.rawalkalinity}`
    //       }}));
    //       this.handleClose();
    //     }
    //     else{
    //       dispatch(set_weui({
    //         toast:{
    //         text:'请原水咸度值',
    //         show: true,
    //         type:'warning'
    //       }}));
    //     }
    // }

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
            // rawtds: {
            //     value:lodashget(inwatersettings,'rawtds',''),
            // },
            // rawconductivity: {
            //     value:lodashget(inwatersettings,'rawconductivity',''),
            // },
            // rawhardness: {
            //     value: lodashget(inwatersettings,'rawhardness',''),
            // },
            // rawalkalinity: {
            //     value: lodashget(inwatersettings,'rawalkalinity',''),
            // },
            // rawph: {
            //     value: lodashget(inwatersettings,'rawph',''),
            // },
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
                                        type="digit"
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
                                        type="digit"
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
                                        type="digit"
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
                                        type="digit"
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
                                        type="digit"
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


                {/* <Modal
                    popup
                    visible={this.state.modalrawPH}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.rawph" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        type="digit"
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.rawph}
                                        defaultValue={inwatersettings.rawph}
                                        onChange={(val)=>{this.setState({rawph: val})}}
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
                                    <Button type="ghost" className="btn" onClick={this.handlerawPHSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalrawConductivity}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.rawconductivity" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        type="digit"
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.rawconductivity}
                                        defaultValue={inwatersettings.rawconductivity}
                                        onChange={(val)=>{this.setState({rawconductivity: val})}}
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
                                    <Button type="ghost" className="btn" onClick={this.handlerawConductivitySubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalrawTDS}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.rawtds" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        type="digit"
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.rawtds}
                                        defaultValue={inwatersettings.rawtds}
                                        onChange={(val)=>{this.setState({rawtds: val})}}
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
                                    <Button type="ghost" className="btn" onClick={this.handlerawTDSSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalrawHardness}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.rawhardness" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        type="digit"
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.rawhardness}
                                        defaultValue={inwatersettings.rawhardness}
                                        onChange={(val)=>{this.setState({rawhardness: val})}}
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
                                    <Button type="ghost" className="btn" onClick={this.handlerawHardnessSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal>

                <Modal
                    popup
                    visible={this.state.modalrawAlkalinity}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="setting.water.rawalkalinity" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        type="digit"
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.rawalkalinity}
                                        defaultValue={inwatersettings.rawalkalinity}
                                        onChange={(val)=>{this.setState({rawalkalinity: val})}}
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
                                    <Button type="ghost" className="btn" onClick={this.handlerawAlkalinitySubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal> */}

            </div>

        )
    }
}

const mapStateToProps =  ({devicedata:{inwatersettings,_id}}) =>{
    // {
    //     tds: 1,
    //     conductivity: 2,
    //     hardness: 3,
    //     alkalinity: 4,
    //     ph: 5,
    //     rawtds: 6,
    //     rawconductivity: 7,
    //     rawhardness: 8,
    //     rawalkalinity: 9,
    //     rawph: 10,
    // }
  return {inwatersettings,_id};
};

Inlet = connect(mapStateToProps)(Inlet);
export default withRouter(injectIntl(Inlet));
