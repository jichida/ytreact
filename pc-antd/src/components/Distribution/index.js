import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, List } from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';

import global_img from '../../assets/qqfb_bg.png';

const total = {
    total: 960,
    normal: 500,
    abnormal: 460,
}

class Distribution extends React.PureComponent {


    render() {
        const { formatMessage } = this.props.intl;

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row>
                        <Col span={24}>
                            <Card 
                                className="map-card"
                                cover={<img src={global_img} alt="" className="map" />}
                            >
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left: 410, top:220}}>
                                        <span>北美洲</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left: 450, top:407}}>
                                        <span>南美洲</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left: 700, top:200}}>
                                        <span>欧洲</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left:200, top:120}}>
                                        <span>美国阿里斯加</span>
                                    </div>
                                </Link>

                                <Link to="/regional">
                                    <div className="dt_dian" style={{left:400, top:150}}>
                                        <span>加拿大</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left:800, top:150}}>
                                        <span>俄罗斯</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left:1000, top:200}}>
                                        <span>中国</span>
                                    </div>
                                </Link>
                                <Link to="/regional">
                                    <div className="dt_dian" style={{left:1050, top:400}}>
                                        <span>澳大利亚</span>
                                    </div>
                                </Link>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <p className="total">{formatMessage({id: 'machine.distribution.para1'})} <span>{total.total}</span> {formatMessage({id: 'machine.distribution.para2'})} <span>{total.normal}</span> {formatMessage({id: 'machine.distribution.para3'})} <span>{total.abnormal}</span> {formatMessage({id: 'machine.distribution.para4'})}</p>
                        </Col>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

export default injectIntl(Distribution);