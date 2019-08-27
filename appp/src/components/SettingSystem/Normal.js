import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import {  List } from 'antd-mobile';
import moment from 'moment';
// import _ from 'lodash';
import {ui_setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';
import 'moment-timezone';
// import { wifi_sendcmd_request } from '../../actions';
import { injectIntl } from 'react-intl';
import './index.less';
import {stringtodate} from '../../util/dateutil';
import NormalForm from './NormalForm';

// const Item = List.Item;
const curTZ = moment.tz.guess();

// const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

// const hoursList = lodashmap(hours, (item)=> {
//     return {
//         label: `${item}时`,
//         value: item,
//     }
// })

class SettingSystem extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
        const {dispatch,_id} = this.props;
        dispatch(ui_setuserdevice_request({_id,data:{syssettings:values}}));
    }

    render () {
        const {syssettings,dispatch } = this.props;
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
            }
        }
        console.log(basicData)
        return (
            <div className="sub_device_setting_bg" style={{padding: 0}}>
                <NormalForm {...basicData} onSubmit={this.handleSubmit} dispatch={dispatch} />
            </div>
        )
    }
}

const mapStateToProps =  ({device:{syssettings,_id},app:{locale},userlogin:{username}}) =>{
  if(!syssettings.installer || syssettings.installer === ''){
    syssettings.installer = username;
  }

  // debugger;
  return {locale,syssettings,_id};
};

SettingSystem = connect(mapStateToProps)(injectIntl(SettingSystem));
export default SettingSystem;
