import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {ui_setuserdevice_request,setdevice_distributorid} from '../../actions';
import lodashget from 'lodash.get';
import {  List, Button, WingBlank, Switch, WhiteSpace, Checkbox  } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import {wifi_sendcmd_request} from '../../actions';
import {set_weui, set_confirm} from '../../actions';
import PicturesWall  from './PicturesWall';
import PopoverInput from '../Controls/popoverInput'
import './index.less';
import {getintlmessage} from '../../util/globalIntl';

const CheckboxItem = Checkbox.CheckboxItem

const RenderCheckForm = createForm({
    mapPropsToFields(props) {
        return {
          washed: createFormField({
            ...props.washed,
            value: props.washed.value,
          }),
          uptostandard: createFormField({
            ...props.uptostandard,
            value: props.uptostandard.value,
          }),
          bypassclosed: createFormField({
            ...props.bypassclosed,
            value: props.bypassclosed.value,
          }),
          noleakage: createFormField({
            ...props.noleakage,
            value: props.noleakage.value,
          }),
          wificonnected: createFormField({
            ...props.wificonnected,
            value: props.wificonnected.value,
          }),
          appset: createFormField({
            ...props.appset,
            value: props.appset.value,
          }),
        };
    }
})((props)=>{
    const { getFieldProps, validateFields } = props.form;

    const { onEnable,isEnableBtnVisible,onClickSysXY } = props;

    // const handleSubmit = (e)=>{
    //     //e.preventDefault();
    //     validateFields((err, values)=>{
    //         if(!err){
    //             props.onSubmit(values);
    //         }
    //     })
    // }


    return (
        <React.Fragment>
        <form>
            <List>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('washed', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('washed')} />}
                ><FormattedMessage id="setting.checklist.washed" defaultMessage="滤芯已冲洗" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('washed')}>
                    <FormattedMessage id="setting.checklist.washed" defaultMessage="滤芯已冲洗" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('uptostandard', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('uptostandard')} />}
                ><FormattedMessage id="setting.checklist.uptostandard" defaultMessage="进水压力已符合标准" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('uptostandard')}>
                    <FormattedMessage id="setting.checklist.uptostandard" defaultMessage="进水压力已符合标准" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('bypassclosed', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('bypassclosed')} />}
                ><FormattedMessage id="setting.checklist.bypassclosed" defaultMessage="旁通已关闭" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('bypassclosed')}>
                    <FormattedMessage id="setting.checklist.bypassclosed" defaultMessage="旁通已关闭" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('noleakage', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('noleakage')} />}
                ><FormattedMessage id="setting.checklist.noleakage" defaultMessage="系统无泄漏" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('noleakage')}>
                    <FormattedMessage id="setting.checklist.noleakage" defaultMessage="系统无泄漏" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('wificonnected', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('wificonnected')} />}
                ><FormattedMessage id="setting.checklist.wificonnected" defaultMessage="WIFI已连接" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('wificonnected')}>
                    <FormattedMessage id="setting.checklist.wificonnected" defaultMessage="WIFI已连接" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('appset', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('appset')} />}
                ><FormattedMessage id="setting.checklist.appset" defaultMessage="APP已设置" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('appset')}>
                    <FormattedMessage id="setting.checklist.appset" defaultMessage="APP已设置" />
                </CheckboxItem>
            </List>
        </form>
        <div className="submit_zone" style={{margin: 0,padding: '5px 10px 20px 10px' }}>
            {
                isEnableBtnVisible && (  <div className="add_btn" >
                        <Button type="ghost" className="btn" style={{color: '#7ac7e5'}} onClick={()=>{
                        validateFields((err, values)=>{
                            onEnable(values);
                        });
                        }}>
                            <FormattedMessage id="form.enable" defaultMessage="启用" />
                        </Button>
                    </div>)
            }
        </div>
        {/* <WingBlank className="submit_zone dual_btn" style={{margin: 0,padding: '5px 10px 20px 10px' }} >
            <div className="add_btn_left" style={{display: 'inline-block'}} >
                <Button type="ghost" className="btn" style={{color: '#7ac7e5'}} onClick={
                  ()=>{onClickSysXY()}
                }>
                    <FormattedMessage id="form.decompression" defaultMessage="系统泄压" />
                </Button>
            </div>
            <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
            {
              isEnableBtnVisible && (  <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                    <Button type="ghost" className="btn" style={{color: '#7ac7e5'}} onClick={()=>{
                      validateFields((err, values)=>{
                          onEnable(values);
                      });
                    }}>
                        <FormattedMessage id="form.enable" defaultMessage="启用" />
                    </Button>
                </div>)
            }
        </WingBlank> */}
        </React.Fragment>
    )
})
//
// const data = [{
//     url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//     id: '2121',
//   }, {
//     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//     id: '2122',
//   }
// ]

// 出水流量正常			discharge
// 设备已调试			debugged
// 出水水质正常			quality
// 设备已交付使用			delivered
// 拍摄安装图，用以备份存档（至少上传4张）	pictures


const RenderResultForm = createForm({
    mapPropsToFields(props) {
        return {
          discharge: createFormField({
            ...props.discharge,
            value: props.discharge.value,
          }),
          debugged: createFormField({
            ...props.debugged,
            value: props.debugged.value,
          }),
          quality: createFormField({
            ...props.quality,
            value: props.quality.value,
          }),
          delivered: createFormField({
            ...props.delivered,
            value: props.delivered.value,
          }),
          pictures: createFormField({
            ...props.pictures,
            value: props.pictures.value,
          }),
        };
    }
})((props)=>{
    const { getFieldProps, validateFields,  } = props.form;

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                console.log(values)
                props.onSubmit(values);
            }
        })
    }

    console.log(getFieldProps('pictures',{valuePropName: 'value'}))
    console.log(getFieldProps('discharge',{valuePropName: 'checked'}))
    return (
        <React.Fragment>
        <form>
            <List>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('discharge', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('discharge')} />}
                ><FormattedMessage id="setting.checklist.discharge" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('discharge')}>
                    <FormattedMessage id="setting.checklist.discharge" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('debugged', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('debugged')} />}
                ><FormattedMessage id="setting.checklist.debugged" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('debugged')}>
                    <FormattedMessage id="setting.checklist.debugged" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('quality', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('quality')} />}
                ><FormattedMessage id="setting.checklist.quality" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('quality')}>
                    <FormattedMessage id="setting.checklist.quality" />
                </CheckboxItem>
                {/* <List.Item className="item_switch"
                    // extra={<Switch
                    //     {...getFieldProps('delivered', {
                    //         valuePropName: 'checked',
                    //     })}
                    // />}
                    extra={<PopoverInput type="1" {...getFieldProps('delivered')} />}
                ><FormattedMessage id="setting.checklist.delivered" /></List.Item> */}
                <CheckboxItem className="check-item" {...getFieldProps('delivered')}>
                    <FormattedMessage id="setting.checklist.delivered" />
                </CheckboxItem>
                <List.Item><FormattedMessage id="setting.checklist.pictures" defaultMessage="拍摄安装图，用于备份存档（至少上传四张）" />
                    <List.Item.Brief style={{whiteSpace: 'normal'}}>
                        <div className="item_children">
                            <PicturesWall {...getFieldProps('pictures',{valuePropName: 'value'})}/>
                        </div>
                    </List.Item.Brief>
                </List.Item>
            </List>
        </form>
        <WingBlank className="submit_zone" style={{margin: 0, padding: '5px 10px 20px 10px'}}>
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.ok" defaultMessage="OK" />
                </Button>
            </div>
        </WingBlank>
        </React.Fragment>
    )
})

class SettingChecklist extends PureComponent{

    state = {
        checked: false,
    }

    handleSubmit = (values)=>{
      console.log(values);
      const {dispatch,_id} = this.props;
      values.washed = true;
      values.uptostandard = true;
      values.bypassclosed = true;
      values.noleakage = true;
      values.wificonnected = true;
      values.appset = true;
      dispatch(ui_setuserdevice_request({_id,data:{checklist:values}}));
    }

    handleEnable = (values)=>{
      const {dispatch, intl} = this.props;
      const isEnableBtnVisible = values.washed &&
      (values.uptostandard) &&
      (values.bypassclosed) &&
      (values.noleakage) &&
      (values.wificonnected) && (values.appset);
      if(isEnableBtnVisible){
        this.setState({
            checked: true,
        });
        // values.discharge = false;
        // values.debugged = false;
        // values.quality = false;
        // values.delivered = false;
        // values.pictures= [];
        dispatch(setdevice_distributorid({}));
      }
      else{
        //提示：需要全部检查完毕才能启用
        dispatch(set_weui({
          toast:{
          text: intl.formatMessage({id: 'form.check'}),
          show: true,
          type:'warning'
        }}));
      }

    }
    onClickSysXY = ()=>{
      //click xy
      console.log(`click xy`)
      const {dispatch, intl} = this.props;
      dispatch(set_confirm({title: '系统泄压', message: `${intl.formatMessage({id: 'form.confirm'})}系统泄压?`, command: wifi_sendcmd_request({cmd:`$decpression%`,cmdstring:getintlmessage('constcmd.cmdstring.decpression')})}))
    //   dispatch(wifi_sendcmd_request({cmd:`$decpression%`,cmdstring:'系统泄压'}));
    }

    render () {
      const {checklist} = this.props;
     // 滤芯已冲洗	washed
     // 进水压力已符合标准	uptostandard
     // 旁通已关闭	bypassclosed
     // 系统无泄漏	noleakage
     // WIFI已连接	wificonnected
     // APP已设置		appset

     const checkData = {
         washed: {
             value: lodashget(checklist,'washed',false),
         },
         uptostandard: {
             value: lodashget(checklist,'uptostandard',false),
         },
         bypassclosed: {
             value:  lodashget(checklist,'bypassclosed',false),
         },
         noleakage: {
             value:  lodashget(checklist,'noleakage',false),
         },
         wificonnected: {
             value: lodashget(checklist,'wificonnected',false),
         },
         appset: {
             value: lodashget(checklist,'appset',false),
         },
     }

     const resultData = {
         discharge: {
             value: lodashget(checklist,'discharge',false),
         },
         debugged: {
             value: lodashget(checklist,'debugged',false),
         },
         quality: {
             value: lodashget(checklist,'quality',false),
         },
         delivered: {
             value: lodashget(checklist,'delivered',false),
         },
         pictures: {
             value: lodashget(checklist,'pictures',[]),
         },
     }

        const isEnableBtnVisible = true;
        return (
            <div className="checklist_bg">
                { this.state.checked ?
                    <RenderResultForm {...resultData} onSubmit={this.handleSubmit} />
                    : <RenderCheckForm {...checkData} onSubmit={this.handleSubmit} isEnableBtnVisible={isEnableBtnVisible}
                      onClickSysXY={this.onClickSysXY}
                      onEnable={this.handleEnable} />
                }
            </div>
        )
    }
}

const mapStateToProps =  ({device:{checklist,_id}}) =>{
  return {checklist,_id};
};

SettingChecklist = connect(mapStateToProps)(SettingChecklist);
export default injectIntl(SettingChecklist);
