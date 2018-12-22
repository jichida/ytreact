import React, { PureComponent }  from 'react';
import { Card, Button, List } from 'antd';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
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

const MachineItem = ({iserr, address, reportdate, id, name, runtime, mode, history})=>{
    return (
        <Card
            className="child-card"
            title={<p><img src={iserr?sb_err:sb_normal} alt="" /><span>{address} {reportdate}</span></p>}
        >
            <p><FormattedMessage id="machine.id" />：{id}</p>
            <p><FormattedMessage id="machine.name" />：{name}</p>
            <p><FormattedMessage id="machine.runtime" />：{runtime}</p>
            <p>
                <span style={{color: '#6ba4e7'}}>{mode}</span>
                <Button style={{float: "right", color: '#6ba4e7'}} onClick={()=>{history.push(`/details/${id}`)}}><FormattedMessage id="machine.detail" /></Button>
            </p>
        </Card>
    )
}


class DeviceList extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        query:props.query || {}
      };
  }



  componentDidMount() {
  }
  onItemConvert(iteminput){
    const item =  {
            iserr: true,
            address: lodashget(iteminput,'basicinfo.useraddress',''),
            reportdate: '20171116',
            id:lodashget(iteminput,'_id',''),
            name: lodashget(iteminput,'syssettings.deviceid',''),
            runtime: '02:10:10',
            mode:' Active Mode',
    };
    return item;
  }

  render() {
    const renderItem = (item)=>{
      return (
        <List.Item>
            <MachineItem {...item} {...this.props} />
        </List.Item>
      );
    };
    const tableprops = {
      grid:{ gutter: 24, column: 4 }
    };
    return (
            <PageList
              tableprops={tableprops}
              renderItem={renderItem}
              listtypeid = 'antdtableorder'
              usecache = {!!g_querysaved}
              ref='antdtablealarm'
              onItemConvert={this.onItemConvert.bind(this)}
              pagenumber={8}
              query={this.state.query}
              sort={{_id: -1}}
              queryfun={(payload)=>{
                return callthen(page_getdevice_request,page_getdevice_result,payload);
              }}
            />
    );
  }
}


export default withRouter(injectIntl(DeviceList));