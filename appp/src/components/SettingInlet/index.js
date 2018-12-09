import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, } from 'antd-mobile';//Modal, WingBlank, WhiteSpace 
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {common_err,ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import Buckets from '../Buckets';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 进水TDS值(mg/l)	tds
// 进水导电率(us/cm)	conductivity
// 进水硬度	hardness
// 进水碱度(ppm)	alkalinity
// ph值		ph
// 用户需求出水TDS值	usertds
const dispatch_form_err = (dispatch,errs)=>{
  dispatch(common_err({type:'form_err',errmsg:`请检查所有输入项`}))
}

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
          bucket: createFormField({
                ...props.bucket,
                value: props.bucket.value,
          }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields, setFieldsValue } = props.form;
    const { intl: { formatMessage },dispatch} = props;

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

    const handleBucketSelect = (value)=>{
        setFieldsValue({bucket: value});
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="setting.water.ph" defaultMessage="PH值" />
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
                </Item>
                <Item><FormattedMessage id="setting.water.conductivity" defaultMessage="进水导电率" />
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
                </Item>
                <Item><FormattedMessage id="setting.water.tds" defaultMessage="进水TDS值" />
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
                </Item>
                <Item><FormattedMessage id="setting.water.hardness" defaultMessage="进水硬度" />
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
                </Item>
                <Item><FormattedMessage id="setting.water.alkalinity" defaultMessage="进水碱度" />
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
                </Item>
                <Item><FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />
                    <Brief>
                        <div className="item_children">
                            {/* <InputItem
                                placeholder={<FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />}
                                {...getFieldProps('bucket',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="setting.water.bucket" defaultMessage="储水桶型号" />,
                                    }],
                                })}
                            /> */}
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
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
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

    state = {
        modalVisual: false,
        tds: '',
    }

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        dispatch(ui_setuserdevice_request({_id,data:{inwatersettings:values}}));
    }

    showModal = () => {
        this.setState({
          modalVisual: true,
        });
    }

    handleTDSChange = (val) =>{
        this.setState({
            tds: val,
        })
    }

    handleTDSClose = () => {
        this.setState({
            modalVisual: false,
        })
    }

    handleTDSSubmit = () => {
        console.log(this.state.tds);
    }

    render () {
        const {inwatersettings,dispatch} = this.props;

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
            bucket: {
                value:lodashget(inwatersettings,'bucket','50gal'),
            },
        }
        return (
            <div className="sub_setting_bg">
                <RenderForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch}/>
                {/* { <InputModal
                    isVisual={this.state.modalVisual}
                    title_key="setting.water.tds"
                    value={this.state.tds}
                    onValueChange={this.handleTDSChange}
                    onClose={this.handleTDSClose}
                    onSubmit={this.handleTDSSubmit}
                    inputPlaceholder={this.props.intl.formatMessage({id: "form.input"})} />
                } */}
            </div>

        )
    }
}

const mapStateToProps =  ({device:{inwatersettings,_id}}) =>{
  return {inwatersettings,_id};
};

Inlet = connect(mapStateToProps)(Inlet);
export default withRouter(injectIntl(Inlet));
