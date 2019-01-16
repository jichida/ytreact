import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import AntdTable from "../AntdTable/antdtable.js";
import { FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import moment from 'moment';
import { page_getnotice_request, page_getnotice_result } from '../../actions';
import {callthen} from '../../sagas/pagination';
// import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import sb_icon from '../../assets/tz_icon.png';

//
// const data = [
//     {
//         key: 1,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 2,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 3,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 4,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 5,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 6,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 7,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 8,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
//     {
//         key: 9,
//         title: '通知公告标题',
//         occurstime: '2018-05-05'
//     },
// ]


class Notice extends React.PureComponent {

    onItemConvert(item){
      item.key = item._id;
      return item;
    }
    render() {

        const { history,isshownewbtn } = this.props;

        const columns = [{
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <span>
                  {/* <div className="dian" /> */}{text}
                </span>
              ),
          }, {
            dataIndex: 'created_at',
            key: 'created_at',
            width: '200px',
            render: (text, record) => (
                <span>
                  {/* <div className="dian" /> */}{moment(text).format('YYYY-MM-DD HH:mm:ss')}
                </span>
              ),
          }, {
            key: 'action',
            width: '200px',
            render: (text, record) => (
              <span>
                <Button type="primary" ghost style={{border: 0, boxShadow: 'none'}} onClick={()=>{history.push(`/noticedetail/${record._id}`)}}>
                    <FormattedMessage id="machine.notice.detail" />
                </Button>
              </span>
            ),
        }]

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.notice" /></span>
                        <span className="right-Link">
                            {
                              isshownewbtn && <Button type="primary"  icon="edit" size="large" onClick={()=>{history.push('/noticenew')}}><FormattedMessage id="machine.notice.new" /></Button>
                            }
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{margin: '0 auto'}}>
                        <AntdTable
                          tableprops={{
                            className:"notice-table",
                            showHeader:false,
                            scroll:{ y: 450 },
                            // bordered:false,
                          }}
                          listtypeid = 'antdtablealarmdetail'
                          usecache = {false}
                          ref='antdtablealarmdetail'
                          onItemConvert={this.onItemConvert.bind(this)}
                          columns={columns}
                          pagenumber={30}
                          query={{}}
                          sort={{DataTime: -1}}
                          queryfun={(payload)=>{
                            return callthen(page_getnotice_request,page_getnotice_result,payload);
                          }}
                        />
                    </Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({addressconst:{addressconsts},userlogin}) =>{
  let isshownewbtn = false;
  const addresslevel1 = lodashget(userlogin,'addresslevel1','');
  const addresslevel2 = lodashget(userlogin,'addresslevel2','');
  if(addresslevel1.length === 0 || addresslevel2.length === 0){
    isshownewbtn = true;
  }
  return {isshownewbtn};
}

Notice = withRouter(Notice);
export default connect(mapStateToProps)(Notice);
