import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Popover, DatePicker, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
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
    title: <FormattedMessage id="machine.mode.type" />,
    dataIndex: 'type',
    key: 'type',
  }, {
    title: <FormattedMessage id="machine.mode.body" />,
    dataIndex: 'body',
    key: 'body',
  }, {
    title: <FormattedMessage id="machine.mode.occurstime" />,
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
        const { formatMessage } = this.props.intl;
        let { start, end } = this.state;

        const content = (
            <RangePicker onChange={this.onPickerChange} />
        )

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>{formatMessage({id: 'machine.mode'})}</span>
                        <Popover content={content} title={formatMessage({id: 'app.datepicker'})} trigger="click">
                            <Button className="picker"><span>{start.format('l')}-{end.format('l')}</span><img src={rl_icon} alt="" /></Button>
                        </Popover>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
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

export default withRouter(injectIntl(RegionalDisplay));