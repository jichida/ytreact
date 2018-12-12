import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col,} from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import DeviceList from '../PageList/DeviceList';
import sb_icon from '../../assets/sb_icon.png';
const data = [
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: true,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
]


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
                    query={{}}
                />
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(injectIntl(Machines));
