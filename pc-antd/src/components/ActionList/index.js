import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Popover, DatePicker, Button } from 'antd';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/sj_icon.png';
import rl_icon from '../../assets/rl.png';
import moment from 'moment';

const { RangePicker } = DatePicker;

const data = [
    {
        key: 1,
        type: 'message',
        body: 'ModinUs: 353 , 303',
        occurstime: '2018-05-05 3:21:00 PM'
    },
]

const columns = [{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '主体',
    dataIndex: 'body',
    key: 'body',
  }, {
    title: '时间',
    dataIndex: 'occurstime',
    key: 'occurstime',
  }
]



class RegionalDisplay extends React.PureComponent {

    state = {
        start: moment(),
        end: moment(),
    }

    onPickerChange = (date,datestring) => {
        this.setState({
            start: date[0],
            end: date[1],
        });
        console.log(date);
        // 输出：
        // Array(2)
        // 0: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _z: null, …}
        // 1: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _z: null, …}

    }

    render() {
        const { history } = this.props;
        let { start, end } = this.state;

        const content = (
            <RangePicker onChange={this.onPickerChange} />
        )

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>操作指令</span>
                        <Popover content={content} title="选择时间" trigger="click">
                            <Button className="picker"><span>{start.format('l')}-{end.format('l')}</span><img src={rl_icon} alt="" /></Button>
                        </Popover>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; 返回上一页</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22} style={{margin: '0 auto'}}>
                        <Table columns={columns} dataSource={data} className="table-list" />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(RegionalDisplay);