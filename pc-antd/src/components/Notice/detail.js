import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, message, Form, Input, Select, Upload } from 'antd';
import { FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
import './detail.less';

import sb_icon from '../../assets/tz_icon.png';

class Detail extends React.PureComponent {

    handleCancel = () => {
        this.props.history.goBack();
    }


    render() {

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={24}>
                            <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.notice" /> - <FormattedMessage id="machine.notice.detail" /></span>
                        </Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title">标题:</Col>
                        <Col span={16}  className="item-content">标题在这里</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title">经销商:</Col>
                        <Col span={16}  className="item-content">经销商在这里</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title">内容:</Col>
                        <Col span={16}  className="item-content">内容在这里</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title">附件:</Col>
                        <Col span={16}  className="item-content">附件在这里</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={16} offset={4}  style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={this.handleCancel}>返回</Button>
                        </Col>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(Detail);