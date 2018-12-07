import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, List, Divider } from 'antd';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/dq_icon.png';
import sb_err from '../../assets/sb_yc.png';
import sb_normal from '../../assets/sb_zc.png';
import sb_off from '../../assets/sb_wlw.png';

const data = [
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
]

const RegionalItem = ({regional,total, normal, abnormal, offline})=>{
    return (
        <Card
            className="child-card"
            title={<p><span>{regional}地区</span></p>}
        >
            <Row gutter={8}>
                <Col span={10}>
                    <div className="total">
                        <h1>{total}</h1>
                        <h3>总设备数量</h3>
                    </div>
                </Col>
                <Col span={2}>
                    <Divider type="vertical" className="split" />
                </Col>
                <Col span={12}>
                    <p className="detail"><img src={sb_normal} alt="" /><span>正常运行：{normal}</span></p>
                    <p className="detail"><img src={sb_err} alt="" /><span>异常运行：{abnormal}</span></p>
                    <p className="detail"><img src={sb_off} alt="" /><span>未联网设备：{offline}</span></p>
                </Col>
            </Row>
        </Card>
    )
}


class RegionalDisplay extends React.PureComponent {


    render() {
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>中国区域展示</span>
                        <Link to="#" className="right-Link">&lt; 返回上一页</Link>
                    </Col>
                </Row>
                <List
                    grid={{ gutter: 24, column: 4 }}
                    dataSource={data}
                    pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 8,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <RegionalItem {...item} />
                        </List.Item>
                    )}
                />
                </Card>
            </GridContent>
        )
    }
}

export default RegionalDisplay;