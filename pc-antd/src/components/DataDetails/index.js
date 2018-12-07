import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, Select, Input, Progress } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/sj_icon.png';

const curTZ = moment.tz.guess();

const Option = Select.Option;



// 顶部数据
const topData = [
    {
        title: '进水水质',
        unit: 'uS/cm',
        data: '1000',
    },
    {
        title: '每日用水量',
        unit: '吨',
        data: '1000',
    },
    {
        title: '运行时间',
        unit: '时/分/秒',
        data: '02:10:20',
    },
    {
        title: '回收率',
        unit: 'uS/cm',
        data: '1000',
    }
]

// 操作指令数据
const dataMode = [
    {
        key: 1,
        type: 'message',
        body: 'ModinUs: 353 , 303',
        occurstime: '2018-05-05 3:21:00 PM'
    },
]

// 顶部图表数据
const chartData = [
    {
        title: '平均出水水质',
        unit: 'uS/cm',
        data: '90',
        warring: true,
    },
    {
        title: '电离子膜寿命',
        unit: '剩余天数',
        data: '60',
        warring: false,
    },
    {
        title: '前置滤芯1',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
    {
        title: '前置滤芯2',
        unit: '剩余天数',
        data: '10',
        warring: true,
    },
    {
        title: '前置滤芯3',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
    {
        title: '后置滤芯1',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
    {
        title: '后置滤芯2',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
    {
        title: '后置滤芯3',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
    {
        title: 'UV寿命',
        unit: '剩余天数',
        data: '1000',
        warring: false,
    },
]

// 底部表格数据
const data_spot = [
    {
        key: 1,
        ModInuS: 279,
        ProductuS:178,
        ModOutuS: 201,
        ProductQualityAverage: 76,
        totalONtime: 82017,
        productDvol: 0,
        cYield: 30,
        DailyVolume: 15830,
        FeedVolumeDaily: 51281,
        cWasteVolumeDaily: 35451,
        totalVol: 50932,
        SysPressure: 520,
        tmpt2: 313,
        createtime: '2018-09-11 9:39:00 AM'
    },
]


const Chart = ({title, unit, data, warring})=>{
    return (
        <div className="chart">
            <Progress type="circle" 
                percent={data} 
                width={100}
                status={warring&&"exception"}
                format={() => <React.Fragment><p className="data">{data}</p><p className="unit">{unit}</p></React.Fragment>} />
            <p>{title}</p>
        </div>
    )
}

const Mode_columns = [{
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

const columns = [{
    title:'ModIn uS',
    dataIndex: 'ModInuS',
    key: 'ModInuS',
  },{
    title:'Product uS',
    dataIndex: 'ProductuS',
    key: 'ProductuS',
  },{
    title:'ModOut uS',
    dataIndex: 'ModOutuS',
    key: 'ModOutuS',
  }, {
    title:'Product Quality Average',
    dataIndex: 'ProductQualityAverage',
    key: 'ProductQualityAverage',
  },{
    title:'totalONtime',
    dataIndex: 'totalONtime',
    key: 'totalONtime',
  },{
    title:'productDvol',
    dataIndex: 'productDvol',
    key: 'productDvol',
  },{
    title:'cYield',
    dataIndex: 'cYield',
    key: 'cYield',
  },{
    title:'Daily Volume',
    dataIndex: 'DailyVolume',
    key: 'DailyVolume',
  },{
    title:'Feed VolumeDaily',
    dataIndex: 'FeedVolumeDaily',
    key: 'FeedVolumeDaily',
  },{
    title:'cWaste Volume',
    dataIndex: 'cWasteVolume',
    key: 'cWasteVolume',
  },{
    title:'totalVol',
    dataIndex: 'totalVol',
    key: 'totalVol',
  },{
    title:'SysPressure',
    dataIndex: 'SysPressure',
    key: 'SysPressure',
  },{
    title:'tmpt2',
    dataIndex: 'tmpt2',
    key: 'tmpt2',
  }, {
    title:'Created At',
    dataIndex: 'createtime',
    key: 'createtime',
  }
]

const timezoneOption = () => {
    const timeZones = moment.tz.names();
    const offsetTmz = [];

    for (const i in timeZones) {
      const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
      let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

      const timeZone = {
        label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
        value: `${timeZones[i]}`,
        time: `${x}`,
      };
      offsetTmz.push(timeZone);
    }

    return _.sortBy(offsetTmz, [function (el) { return -(el.time); }]);
}



class DataDetails extends React.PureComponent {

    state = {
        action: '',
        timezone: curTZ,
    }

    handleSend = () => {
        if(this.state.action){
            console.log(this.state.action);
        }
    }

    handleStatistic = () => {
        console.log('数据统计');
    }

    handleDownload = () => {
        console.log('下载数据');
    }

    render() {
        const { history } = this.props;
        const tzs = timezoneOption();

        const topList = _.map(topData, (item)=>{
            return (
                <Col span={6}>
                    <div className="number-info">
                        <span className="title">{item.title}</span>
                        <span className="unit">{item.unit}</span>
                        <span className="data">{item.data}</span>
                    </div>
                </Col>
            )
        })

        const topChart = _.map(chartData, (item)=>{
            return (
                <Chart {...item} />
            )
        })

        const tzOptions = _.map(tzs, (item)=>{
            return (
                <Option value={item.value}>{item.label}</Option>
            )
        })

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>数据详情</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; 返回上一页</span>
                    </Col>
                </Row>
                <Row gutter={24}>
                    { topList }
                </Row>
                <Row gutter={24} style={{marginTop: 30}}>
                    <Col span={24} style={{textAlign: 'center'}}>
                        { topChart }
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop: 30}}>
                    <Col span={2}></Col>
                    <Col span={10} className="sub-title">
                        <p><h2>操作指令</h2><span className="right-Link" onClick={()=>{history.push('/actions')}}>Mode&gt;</span></p>
                        <Table columns={Mode_columns} dataSource={dataMode} className="table-list" pagination={false} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="sub-title">
                        <p><h2>输入指令</h2></p>
                        <div className="command">
                            <h4>Send a Command</h4>
                            <div className="send">
                                <Input value={this.state.action} 
                                    onChange={(e)=>{this.setState({action: e.target.value})}} 
                                    style={{ width: '80%', marginRight:'14px' }}/>
                                <Button onClick={this.handleSend}>send</Button></div>
                            <h4>Timezone</h4>
                            <div><Select
                                    style={{ width: '100%' }}
                                    value={this.state.timezone}
                                    onSelect={(value)=>{this.setState({timezone: value})}}
                                    showSearch
                                    placeholder="Select a timezone"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {tzOptions}
                                </Select>
                            </div>
                            <div style={{marginTop:'50px'}}>
                                <Button type="primary" size="large" style={{ marginRight:'20px' }} onClick={this.handleStatistic}>数据统计</Button>
                                <Button size="large" onClick={this.handleDownload}>下载数据</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row style={{marginTop: 30}}>
                    <Col span={24} style={{margin: '0 auto'}}>
                        <Table columns={columns} dataSource={data_spot} className="data-table-list" pagination={false} />
                    </Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}

export default withRouter(DataDetails);