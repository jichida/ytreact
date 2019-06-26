import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, NavBar, List, ActionSheet, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import lodashGet from 'lodash.get'
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';
import txImg from '../../assets/tx.png';
import basic_img from '../../assets/sy2.png';
import water_img from '../../assets/sy3.png';
import install_img from '../../assets/sy4.png';
import table_img from '../../assets/set4.png';
import list_img from '../../assets/sy7.png';
import system_img from '../../assets/set1.png';
import waterset_img from '../../assets/set2.png';
// import user_img from '../../assets/sy5.png';
// import {jsCallPhone} from '../../env/callphone';
const Item = List.Item;
const Brief = Item.Brief;

// fix touch to scroll background page on iOS
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

class Device extends PureComponent{

    showActionSheet = (title) => {
        const BUTTONS = ['XXX服务商名称', 'YYY服务商名称', 'ZZZ服务商名称', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          title: title,
          //message: '描述',
          maskClosable: true,
          'data-seed': 'Id',
          // wrapProps,
        },
        (buttonIndex) => {
          console.log(BUTTONS[buttonIndex]);
        });
    }

    goTo = (target) => {
        const {isNormal} = this.props;
        if(isNormal) {
            this.props.history.push(target)
        }
    }

    gotoInfo = (target) => {
        const {isNormal,isGetDevice} = this.props;
        if(isNormal&&isGetDevice) {
            this.props.history.push(target)
        }
    }

    render () {
        console.log(window.innerHeight);
        const { distributor, isGetDevice ,isDirect,isNormal} = this.props;
        // const { intl: { formatMessage }} = this.props;
        // const title = formatMessage({id: "device.privider.select"})

        return (
            <div className="black_bg">
            <div className="device" style={{height: `${window.innerHeight-57}px`}}>
                <NavBar
                    className="nav"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => history.goBack()}
                >
                <FormattedMessage id="device" />
                </NavBar>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={txImg}
                        multipleLine
                        onClick={() => this.props.history.push('/distributor')}
                    >
                        <span 
                            style={{color: "#ffffff"}}
                            // onClick={() => {jsCallPhone(distributor.username);}}
                        >
                            {`${distributor.name}`}
                            <Brief style={{color: "#ffffff"}}>{`TEL:${distributor.username}`}</Brief>
                        </span>
                    </Item>
                </List>
                <WingBlank>
                    <p className="tools_title"><FormattedMessage id="device.tools" /></p>
                    <div className="tools_bg">
                        <Flex wrap="wrap">
                            <div className={`tools_con ${isNormal ? '' : 'disable'}`}>
                                <div onClick={()=>{this.goTo('/setting')}}>
                                    <img src={system_img} alt="" />
                                    <p><FormattedMessage id="device.setting" defaultMessage="设备设置" /></p>
                                </div>
                            </div>
                            <div className={`tools_con ${isNormal&&isGetDevice ? '' : 'disable'}`}>
                                <div onClick={()=>{this.gotoInfo('/basic')}}>
                                    <img src={basic_img} alt="" />
                                    <p><FormattedMessage id="device.basic" /></p>
                                </div>
                            </div>
                            <div className={`tools_con ${isNormal&&isGetDevice ? '' : 'disable'}`}>
                                <div onClick={()=>{this.gotoInfo('/water')}}>
                                    <img src={water_img} alt="" />
                                    <p><FormattedMessage id="device.water" /></p>
                                </div>
                            </div>
                            <div className={`tools_con ${isNormal&&isGetDevice ? '' : 'disable'}`}>
                                <div onClick={()=>{this.gotoInfo('/install')}}>
                                    <img src={install_img} alt="" />
                                    <p><FormattedMessage id="device.install" /></p>
                                </div>
                            </div>
                            <div className={`tools_con ${isNormal&&isGetDevice ? '' : 'disable'}`}>
                                <div onClick={()=>{this.gotoInfo('/checklist')}}>
                                    <img src={table_img} alt="" />
                                    <p><FormattedMessage id="setting.checklist" defaultMessage="安装检查表" /></p>
                                </div>
                            </div>
                            <div className={`tools_con ${isNormal&&isGetDevice ? '' : 'disable'}`}>
                                 <div onClick={()=>{this.gotoInfo('/equipmentlist')}}>
                                    <img src={list_img} alt="" />
                                    <p><FormattedMessage id="device.equipmentlist" defaultMessage="设备清单" /></p>
                                </div>
                             </div>

                            {/* { isNormal&&
                             <div className="tools_con">
                                 <Link to="/inlet"><div><img src={waterset_img} alt="" />
                                     <p><FormattedMessage id="setting.water.quality" defaultMessage="进水水质" /></p></div>
                                 </Link>
                             </div>
                             }  */}
                        </Flex>
                    </div>
                </WingBlank>
                { isDirect && (
                    <WingBlank style={{marginTop: '20px'}}>
                        <div className="tools_warring"><FormattedMessage id="device.warring.direct" /></div>
                    </WingBlank>
                )}
                { isNormal && !isGetDevice && (
                    <WingBlank style={{marginTop: '20px'}}>
                        <div className="tools_warring"><FormattedMessage id="device.warring.device" /></div>
                    </WingBlank>
                )}
            </div></div>
        )
    }
}
const mapStateToProps =  ({userlogin:{distributor},device:{distributorid, syssettings},app:{linkmode}}) =>{
  if(!!distributorid._id){
    console.log(distributorid);
    distributor = distributorid;
  }
  const isDirect = linkmode === 'directmode';
  const isNormal = linkmode === 'internetmode';
  const isGetDevice = lodashGet(syssettings, 'deviceid', '') !== ''
  // debugger;
  return {distributor, isGetDevice,isDirect,isNormal};
};
Device = connect(mapStateToProps)(Device);
export default withRouter(injectIntl(Device));
