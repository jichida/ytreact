import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, message, Upload } from 'antd';
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
        <Button type="primary" ghost style={{border: 0}}>下载</Button>
      </span>
    ),
  }]

  const uploadprops = {
    name: 'file',
    action: '',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };



class Notice extends React.PureComponent {


    render() {

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>通知公告</span>
                        <span className="right-Link">
                            <Upload {...uploadprops}>
                                <Button type="primary" icon="upload" size="large">上传</Button>
                            </Upload>
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

export default Notice;