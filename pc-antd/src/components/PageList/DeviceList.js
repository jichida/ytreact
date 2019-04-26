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
import lodashget from 'lodash.get';
let g_querysaved;

const MachineItem = ({isgetsrvdata,iserr, address, reportdate, id, name, runtime, mode, history,_id})=>{
    //isgetsrvdata为false 表示未接收到数据,此时图标变灰，不能
    //你如果从下面取的话 6 代表 Suspended  999代表ERROR   0 是Idle Mode  其他的代表 Active Mode
    const mapmode = {
      '0':'Idle Mode',
      '6':'Suspended',
      '999':'ERROR'
    };
    return (
        <Card
            className="child-card"
            title={<p><img src={iserr?sb_err:sb_normal} alt="" /><span>{address} {reportdate}</span></p>}
        >
            <p><FormattedMessage id="machine.id" />：{id}</p>
            <p><FormattedMessage id="machine.name" />：{name}</p>
            <p><FormattedMessage id="machine.runtime" />：{runtime}</p>
            <p>
                <span style={{color: '#6ba4e7', width: '20px', display: 'inline-block'}}>
                {lodashget(mapmode,`${mode}`,'Active Mode')}
                </span>
                <Button style={{float: "right", color: `${!isgetsrvdata ? '#888' : '#6ba4e7'}`}} disabled={!isgetsrvdata} onClick={()=>{history.push(`/details/${_id}`)}}>
                  <FormattedMessage id="machine.detail" />
                </Button>
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
    console.log(iteminput);
    if(iteminput.hasOwnProperty('srvdata')){
      return {
              isgetsrvdata:true,
              iserr: lodashget(iteminput,'basicinfo.username',''),
              address: lodashget(iteminput,'basicinfo.username',''),
              reportdate: moment(lodashget(iteminput,'syssettings.installdate','')).format('YYYYMMDD'),
              id:lodashget(iteminput,'syssettings.deviceid',''),
              name: lodashget(iteminput,'basicinfo.model',''),
              runtime:moment(lodashget(iteminput,'datasrv_updated_at')).format('YYYYMMDD HH:mm:ss'),
              mode:lodashget(iteminput,'srvdata.currentstate',''),
              _id:iteminput._id,
      }
    }
    const item =  {
            isgetsrvdata:false,
            iserr: true,
            address: lodashget(iteminput,'basicinfo.username',''),
            reportdate: moment(lodashget(iteminput,'syssettings.installdate','')).format('YYYYMMDD'),
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
    console.log(query);
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
