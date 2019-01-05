import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, message, Upload } from 'antd';
import { FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/tz_icon.png';


const data = [
    {
        key: 1,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 2,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 3,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 4,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 5,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 6,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 7,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 8,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
    {
        key: 9,
        title: '通知公告标题',
        occurstime: '2018-05-05'
    },
]


class Notice extends React.PureComponent {


    render() {

        const { history } = this.props;

        const columns = [{
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <span>
                  <div className="dian" />{text}
                </span>
              ),
          }, {
            dataIndex: 'occurstime',
            key: 'occurstime',
            width: '200px',
          }, {
            key: 'action',
            width: '200px',
            render: (text, record) => (
              <span>
                <Button type="primary" ghost style={{border: 0}} onClick={(record)=>{history.push(`/noticedetail`)}}>
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
                            <Button type="primary"  icon="edit" size="large" onClick={()=>{history.push('/noticenew')}}><FormattedMessage id="machine.notice.new" /></Button>
                            {/* <Upload {...uploadprops}>
                                <Button type="primary" icon="upload" size="large"><FormattedMessage id="machine.notice.upload" /></Button>
                            </Upload> */}
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{margin: '0 auto'}}>
                        <Table columns={columns} dataSource={data} className="notice-table" showHeader={false}  scroll={{ y: 450 }} />
                    </Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(Notice);