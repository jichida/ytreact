import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col,} from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import DeviceList from '../PageList/DeviceList';
import sb_icon from '../../assets/sb_icon.png';
import moment from 'moment';
class Machines extends React.PureComponent {

    render() {

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>{this.props.intl.formatMessage({id: 'machine.abnormal'})}</span>
                    </Col>
                </Row>
                <DeviceList
                    query={{
                      $or:[
                        {iserr:true},//999状态
                        {datasrv_updated_at:{$exists:false}},
                        {datasrv_updated_at:{
                          $lte:moment().subtract(1,'hours').format()
                        }}
                      ]
                    }}
                />
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(injectIntl(Machines));
