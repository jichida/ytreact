import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button, List } from 'antd';
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
            <p>识别编号：{id}</p>
            <p>设备名称：{name}</p>
            <p>运行时间：{runtime}</p>
            <p>
                <span style={{color: '#6ba4e7'}}>{mode}</span>
                <Button style={{float: "right", color: '#6ba4e7'}} onClick={()=>{history.push(`/details/${id}`)}}>显示详情</Button>
            </p>
        </Card>
    )
}

class Machines extends React.PureComponent {


    render() {
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>全部设备</span>
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

export default withRouter(Machines);