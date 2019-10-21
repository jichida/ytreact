import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Popover, Icon, Button } from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import DeviceList from '../PageList/DeviceList';
import sb_icon from '../../assets/sb_icon.png';


class Machines extends React.PureComponent {

    handleShowExpire = () => {
        // 显示滤芯到期设备
        console.log('expire')
    }

    render() {
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <div><img src={sb_icon} alt="" /><span>{this.props.intl.formatMessage({id: 'machine.all'})}</span></div>
                        <div style={{marginLeft: '10px'}}>
                            <Popover placement="right" 
                                content={<div className="show-expire">
                                    <Button onClick={this.handleShowExpire} className="btn">{this.props.intl.formatMessage({id: 'machine.expire.equip'})}</Button>
                                </div>}  
                                trigger="click"
                            >
                                <Icon type="down" />
                            </Popover>
                        </div>
                    </Col>
                </Row>
                <DeviceList
                    query={{}}
                />
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(injectIntl(Machines));
