import React, { PureComponent }  from 'react';
import { Card, Button, List } from 'antd';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import moment from 'moment';
import {
  callthen,
} from '../../sagas/pagination';
import {page_getdevice_request,page_getdevice_result} from '../../actions';
import PageList from './index';
import { injectIntl, FormattedMessage } from 'react-intl';
import sb_err from '../../assets/sb_yc.png';
import sb_normal from '../../assets/sb_zc.png';
import sb_warring from '../../assets/sb_wlw.png';
import sb_offline from '../../assets/sb_lx.png';
import lodashget from 'lodash.get';
let g_querysaved;

const MachineItem = ({isgetsrvdata,iserr, iswarr, isoffline, address, reportdate, id, name, runtime, mode, history,_id})=>{
    //isgetsrvdata为false 表示未接收到数据,此时图标变灰，不能
    //你如果从下面取的话 6 代表 Suspended  999代表ERROR   0 是Idle Mode  其他的代表 Active Mode
    const mapmode = {
      '0': <FormattedMessage id="machine.datedetail.Active" />,
      '6': <FormattedMessage id="machine.datedetail.Suspended" />,
      '999': <FormattedMessage id="machine.datedetail.ERROR" />
    };
    return (
        <Card
            className="child-card"
            title={<p style={{display: 'flex', alignItems: 'center'}}><img src={iserr ? sb_err: isoffline ? sb_offline : iswarr ? sb_warring : sb_normal} alt="" /><span>{address} {reportdate}</span></p>}
        >
            <p><FormattedMessage id="machine.id" />：{id}</p>
            <p><FormattedMessage id="machine.name" />：{name}</p>
            <p><FormattedMessage id="machine.runtime" />：{runtime}</p>
            <p>
                <span style={{color: '#6ba4e7', minWidth: '100px', display: 'inline-block'}}>
                {lodashget(mapmode,`${mode}`,<FormattedMessage id="machine.datedetail.Active" />)}
                </span>
                <Button style={{float: "right", color: `${!isgetsrvdata ? '#888' : '#6ba4e7'}`}} disabled={!isgetsrvdata} onClick={()=>{history.push(`/details/${_id}`)}}><FormattedMessage id="machine.detail" /></Button>
            </p>
        </Card>
    )
}


class DeviceList extends React.Component {
  onRefresh(){
    this.refs.antdtablealarm.getWrappedInstance().onRefresh();
  }
  componentDidMount() {
  }
  onItemConvert(iteminput){
    /*
    判断逻辑:
    1、正常运行:【iserr为false,最新数据datasrv_updated_at在1小时之内】
    2、异常运行:【仅判断iserr为true】
    3、未联网:【未收到数据 或者 最新数据datasrv_updated_at在1小时以前】
    */
    console.log(iteminput);
    const installdate = lodashget(iteminput,'syssettings.installdate');
    const isinstalled = lodashget(iteminput,'distributorid','') !== '';
    if(iteminput.hasOwnProperty('srvdata')){
      return {
              isgetsrvdata:true,
              iserr: lodashget(iteminput,'iserr',true),
              iswarr: !installdate,
              isoffline: !!iteminput.datasrv_updated_at ? moment(iteminput.datasrv_updated_at).isBefore(moment().subtract(1,'hours')) : true,
              address: lodashget(iteminput,'basicinfo.username',''),
              reportdate: isinstalled ? moment(installdate).format('YYYYMMDD'): <FormattedMessage id="machine.notinstall" />,
              id:lodashget(iteminput,'syssettings.deviceid','') || lodashget(iteminput,'deviceid'),
              name: lodashget(iteminput,'basicinfo.model',''),
              runtime:moment(lodashget(iteminput,'datasrv_updated_at')).format('YYYYMMDD HH:mm:ss'),
              mode:lodashget(iteminput,'srvdata.currentstate',''),
              _id:iteminput._id,
      }
    }
    const item =  {
            isgetsrvdata:false,
            iserr: lodashget(iteminput,'iserr',true),
            iswarr: true,
            isoffline: true,
            address: lodashget(iteminput,'basicinfo.username',''),
            reportdate: isinstalled ? moment(installdate).format('YYYYMMDD'): <FormattedMessage id="machine.notinstall" />,
            id:lodashget(iteminput,'syssettings.deviceid',''),
            name: lodashget(iteminput,'basicinfo.model',''),
            runtime:lodashget(iteminput,'srvdata.currentstate',''),
            mode:lodashget(iteminput,'srvdata.currentstate',''),
            _id:iteminput._id,
    };
    return item;
  }
  shouldComponentUpdate(nextProps, nextState) {
    const nextData = lodashget(nextProps,'query',{});
    const curData = lodashget(this.props,'query',{});
    if( nextData.length === curData.length ){
      if(JSON.stringify(nextData) === JSON.stringify(curData)){
        return false;
      }
    }
    window.setTimeout(()=>{
      this.onRefresh();
    },0);

    return true;//render
  }
  render() {
    let query = this.props.query || {};
    const renderItem = (item)=>{
      console.log(item)
      return (
        <List.Item>
            <MachineItem {...item} history={this.props.history} />
        </List.Item>
      );
    };
    const tableprops = {
      grid:{ gutter: 24, column: 4 }
    };
    console.log(query);//new RegExp(value,'ig')
    return (
            <PageList
              tableprops={tableprops}
              renderItem={renderItem}
              listtypeid = 'antdtableorder'
              usecache = {!!g_querysaved}
              ref='antdtablealarm'
              onItemConvert={this.onItemConvert.bind(this)}
              pagenumber={8}
              query={query}
              sort={{_id: -1}}
              queryfun={(payload)=>{
                return callthen(page_getdevice_request,page_getdevice_result,payload);
              }}
            />
    );
  }
}


export default withRouter(injectIntl(DeviceList));
