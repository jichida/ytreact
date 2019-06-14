import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, WingBlank, Switch, Picker, Modal, WhiteSpace } from 'antd-mobile';
// import moment from 'moment';
import {ui_setuserdevice_request,set_weui} from '../../actions';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import moment from 'moment';
import 'moment-timezone';
import { wifi_sendcmd_request } from '../../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import './index.less';
import DirectForm from './DirectForm';

const Item = List.Item;
const Brief = Item.Brief;
// const curTZ = moment.tz.guess();

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

const hoursList = lodashmap(hours, (item)=> {
    return {
        label: `${item}时`,
        value: item,
    }
})

class SettingSystem extends PureComponent{
  constructor(props) {
      super(props);
      const {syssettings} = props;
      this.state = {
          Modal1: false,
          modal2: false,
          quality:lodashget(syssettings,'quality',''),
          isdormancy: lodashget(syssettings,'isdormancy',false),
          dormancystart: moment(`2019-01-01 ${lodashget(syssettings,'dormancystart','00')}:00:00`),
          dormancyend: moment(`2019-01-01 ${lodashget(syssettings,'dormancyend','00')}:00:00`),
      };
    }

    componentWillReceiveProps(nextProps) {
      const nextData = lodashget(nextProps,'syssettings',{});
      const curData = lodashget(this.props,'syssettings',{});
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          return;
        }
      }
      this.setState({
        quality:lodashget(nextData,'quality',''),
        isdormancy: lodashget(nextData,'isdormancy',''),
        dormancystart: moment(`2019-01-01 ${lodashget(nextData,'dormancystart','00')}:00:00`),
        dormancyend: moment(`2019-01-01 ${lodashget(nextData,'dormancyend','00')}:00:00`),
      });
    }


    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        dispatch(ui_setuserdevice_request({_id,data:{syssettings:values}}));
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
      //8	出水水质  设置	0~200  ppm	sysprodtrigger 120%
        console.log(this.state.quality);
        const {dispatch} = this.props;
        if(this.state.quality.length > 0){
          const cmd = `$sysprodtrigger ${this.state.quality}%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置出水水质',target:{
            fieldname:'syssettings.quality',
            value:`${this.state.quality}`
          }}));
          this.onCloseQuality();
        }
        else{
          dispatch(set_weui({
            toast:{
            text:'请输入出水水质的值',
            show: true,
            type:'warning'
          }}));
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
            dormancystart: this.state.dormancystart.format('HH'),
            dormancyend: this.state.dormancyend.format('HH'),
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
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置休眠状态'}));
          this.onCloseDormancy();
        }
        else{
          const cmd = `$fidle 0%`;
          dispatch(wifi_sendcmd_request({cmd,cmdstring:'设置休眠状态'}));
          this.onCloseDormancy();
        }
    }

    render () {
        const {syssettings,dispatch, intl:{ formatMessage }} = this.props;
        const locale = lodashget(syssettings,'language','zh-cn');
        console.log(locale);
        const basicData = {
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
                value: this.state.dormancystart,
            },
            dormancyend: {
                value: this.state.dormancyend,
            },
            language: {
                value:  [locale],
            }
        }
        console.log(this.state);
        return (
            <div className="sub_setting_bg">
                {/* { <RenderForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch}/>} */}
                <DirectForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch} />
                {/* { isNormal&&<NormalForm {...basicData} onSubmit={this.handleSubmit} showModal={this.showModal} dispatch={dispatch} />} */}
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
                                        type="digit"
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
                                                value={[this.state.dormancystart.format('HH')]}
                                                onChange={(val) => {
                                                    console.log(val);
                                                    const v = moment(`2019-01-01 ${val[0]}:00:00`)
                                                    this.setState({ dormancystart:v })
                                                  }
                                                }
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
                                                value={[this.state.dormancyend.format('HH')]}
                                                onChange={(val) => {
                                                    console.log(val);
                                                    const v = moment(`2019-01-01 ${val[0]}:00:00`)
                                                    this.setState({ dormancyend:v })
                                                  }}
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

const mapStateToProps =  ({devicedata:{syssettings}}) =>{
  // if(!syssettings.installer){
  //   syssettings.installer = truename;
  // }
  return {syssettings};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
