import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, DatePicker, Radio } from 'antd';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import GridContent from '../GridContent';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';

import sb_icon from '../../assets/sj_icon.png';

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';

const cycleAction = [
    {
      name: '日报',
      action: 'day',
    },
    {
        name: '周报',
        action: 'week',
    },
    {
        name: '月报',
        action: 'month',
    },
    {
        name: '年报',
        action: 'year',
    },
];

const typeAction = [
    {
      name: 'mod in/out',
      action: 'mod in/out',
    },
    {
        name: '出水水质',
        action: 'quality',
    },
    {
        name: '压力',
        action: 'pressure',
    },
    {
        name: '废水排放量',
        action: 'drainage',
    },
    {
        name: '总进水量',
        action: 'totalinlet',
    },
    {
        name: '总产水量',
        action: 'totaleffluent',
    },
];



class Statistics extends React.PureComponent {

    state = {
        cycle: 'day',
        type: 'mod in/out',
        rangeDate: [moment('2018-11-01', dateFormat), moment('2018-11-30', dateFormat)],
    }

    onCycleChange = (e)=> {
        this.setState({
            cycle: e.target.value,
        })
    }

    onTypeChange = (e)=> {
        this.setState({
            type: e.target.value,
        })
    }

    // 示例数据
    getOption = ()=> {
        return ({
            color: ['#83b9ed'],
            title: {
               text: 'mod in/out数据统计',// title 数据统计类目
               left: 'center'
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'] // xAxis[] 横轴数据，统计周期
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'mod in/out', // title 数据统计类目
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210] // yAxis[] 横轴数据，统计数据
                }
            ]
        })
    }

    // 实际传入数据
    // getOption = (title, xAxis, yAxis)=> {
    //     return ({
    //         color: ['#83b9ed'],
    //         title: {
    //            text: `${title}数据统计`,// title 数据统计类目
    //            left: 'center',
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true,
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             data: xAxis, // xAxis[] 横轴数据，统计周期
    //         },
    //         yAxis: {
    //             type: 'value',
    //         },
    //         series: [
    //             {
    //                 name: `${title}`, // title 数据统计类目
    //                 type: 'line',
    //                 data: yAxis, // yAxis[] 横轴数据，统计数据
    //             }
    //         ]
    //     })
    // }

    render() {
        const { history } = this.props;

        const cycles = (
                _.map(cycleAction, (item)=>(
                    <Radio.Button value={item.action}>{item.name}</Radio.Button>
                ))
        )

        const types = (
            _.map(typeAction, (item)=>(
                <Radio.Button value={item.action}>{item.name}</Radio.Button>
            ))
        )


        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={24}>
                            <img src={sb_icon} alt="" /><span>数据详情</span>
                            <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; 返回上一页</span>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}} className="statistic_radio" onChange={this.onCycleChange}>
                        <Col span={20}>
                            <Radio.Group value={this.state.cycle} buttonStyle="solid">
                                { cycles }
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                                <DatePicker.RangePicker  value={this.state.rangeDate} />
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}} className="statistic_radio">
                        <Col span={24}>
                            <Radio.Group value={this.state.type} buttonStyle="solid" onChange={this.onTypeChange}>
                                { types }
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}}>
                        <Col span={24}>
                            <ReactEcharts option={this.getOption()} />
                        </Col>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(Statistics);