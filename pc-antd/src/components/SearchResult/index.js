import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button, List } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/sb_icon.png';
import sb_err from '../../assets/sb_yc.png';
import sb_normal from '../../assets/sb_zc.png';

const data = [
    {
        iserr: false,
        address: '北京翡翠山',
        reportdate: '20171116',
        id: '125445554511112254444',
        name: 'HHBJ25018',
        runtime: '02:10:10',
        mode:' Active Mode',
    },
    {
        iserr: false,
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
        iserr: false,
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
        iserr: false,
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

const MachineItem = ({iserr, address, reportdate, id, name, runtime, mode, history})=>{
    return (
        <Card
            className="child-card"
            title={<p><img src={iserr?sb_err:sb_normal} alt="" /><span>{address} {reportdate}</span></p>}
        >
            <p><FormattedMessage id="machine.id" />"：{id}</p>
            <p><FormattedMessage id="machine.name" />"：{name}</p>
            <p><FormattedMessage id="machine.runtime" />"：{runtime}</p>
            <p>
                <span style={{color: '#6ba4e7'}}>{mode}</span>
                <Button style={{float: "right", color: '#6ba4e7'}} onClick={()=>{history.push(`/details/${id}`)}}><FormattedMessage id="machine.detail" /></Button>
            </p>
        </Card>
    )
}

class Machines extends React.PureComponent {


    render() {
        const { history, intl } = this.props;
        const { formatMessage } = intl;
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>{this.props.intl.formatMessage({id: 'app.search.result'})}</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
                    </Col>
                </Row>
                <List
                    grid={{ gutter: 24, column: 4 }}
                    dataSource={data}
                    pagination={{
                        onChange: (page) => {   // 分页逻辑
                          console.log(page);
                        },
                        pageSize: 8,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <MachineItem {...item} {...this.props} />
                        </List.Item>
                    )}
                />
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(injectIntl(Machines));