import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, Select, Input, Progress } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import _ from 'lodash';
import lodashget from 'lodash.get';
import moment from 'moment';
import 'moment-timezone';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/sj_icon.png';

const curTZ = moment.tz.guess();

const Option = Select.Option;

// 顶部数据
const monitorData = {
    quality: 1000,
    consumption: 1000,
    runtime: '02:10:20',
    recovery: 1000,
}

// 进度数据
const chartData = {
    average: {
        data: 90,
        warring: true,
    },
    ionmembrance: {
        data: 60,
        warring: false,
    },
    frontfilter1: {
        data: 1000,
        warring: false,
    },
    frontfilter2: {
        data: 1000,
        warring: false,
    },
    frontfilter3: {
        data: 10,
        warring: true,
    },
    afterfilter1: {
        data: 100,
        warring: false,
    },
    afterfilter2: {
        data: 1000,
        warring: false,
    },
    afterfilter3: {
        data: 1000,
        warring: false,
    },
    uvlife: {
        data: 10,
        warring: true,
    }
}

// 操作指令数据
const dataMode = [
    {
        key: 1,
        type: 'message',
        body: 'ModinUs: 353 , 303',
        occurstime: '2018-05-05 3:21:00 PM'
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

const TopMonitor = injectIntl(({quality, consumption, runtime, recovery, intl})=>{

    const { formatMessage } = intl;
    // 顶部数据
    const topData = [
        {
            title: `${formatMessage({id: 'machine.data.quality'})}`,//quality
            unit: 'uS/cm',
            data: `${quality}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.consumption'})}`,//consumption
            unit: '吨',
            data: `${consumption}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.runtime'})}`,//runtime
            unit: '时/分/秒',
            data: `${runtime}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.recovery'})}`,//recovery
            unit: 'uS/cm',
            data: `${recovery}`,
        }
    ]

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

    return (
        <Row gutter={24}>
            { topList }
        </Row>
    )
})


const TopChart = injectIntl(({average, ionmembrance, frontfilter1, frontfilter2, frontfilter3, afterfilter1,  afterfilter2, afterfilter3, uvlife, intl})=>{
    const { formatMessage } = intl;

    const chartData = [
        {
            title: `${formatMessage({id: 'machine.data.average'})}`,
            unit: 'uS/cm',
            data: average.data,
            warring: average.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.ionmembrance'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: ionmembrance.data,
            warring: ionmembrance.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.frontfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: frontfilter1.data,
            warring: frontfilter1.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: frontfilter2.data,
            warring: frontfilter2.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: frontfilter3.data,
            warring: frontfilter3.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.afterfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: afterfilter1.data,
            warring: afterfilter1.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter2'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: afterfilter2.data,
            warring: afterfilter2.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter3'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: afterfilter3.data,
            warring: afterfilter3.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.uvlife'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: uvlife.data,
            warring: uvlife.warring,
        }
    ]

    return (
        <Row gutter={24} style={{marginTop: 30}}>
            <Col span={24} style={{textAlign: 'center'}}>
                {
                     _.map(chartData, (item)=>{
                        return (
                            <Chart {...item} />
                        )
                    })
                }
            </Col>
        </Row>
    )
})

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
        const { formatMessage } = this.props.intl;
        const tzs = timezoneOption();

        const tzOptions = _.map(tzs, (item,key)=>{
            return (
                <Option value={item.value} key={key}>{item.label}</Option>
            )
        })

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>{formatMessage({id: 'machine.datadetail'})}</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
                    </Col>
                </Row>
                <TopMonitor {...monitorData} />
                <TopChart {...chartData} />
                <Row gutter={24} style={{marginTop: 30}}>
                    <Col span={2}></Col>
                    <Col span={10} className="sub-title">
                        <p><h2>{formatMessage({id: 'machine.mode'})}</h2><span className="right-Link" onClick={()=>{history.push('/actions')}}>Mode&gt;</span></p>
                        <Table columns={Mode_columns} dataSource={dataMode} className="table-list" pagination={false} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="sub-title">
                        <p><h2>{formatMessage({id: 'machine.mode.input'})}</h2></p>
                        <div className="command">
                            <h4>Send a Command</h4>
                            <div className="send">
                                <Input value={this.state.action}
                                    onChange={(e)=>{this.setState({action: e.target.value})}}
                                    style={{ width: '80%', marginRight:'10px' }}/>
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
                                <Button type="primary" size="large" style={{ marginRight:'20px' }} onClick={this.handleStatistic}>{formatMessage({id: 'machine.statistic'})}</Button>
                                <Button size="large" onClick={this.handleDownload}>{formatMessage({id: 'machine.download'})}</Button>
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
const mapStateToProps =  ({device:{devices}},props) =>{
  let curdevice = lodashget(devices,`${props.match.params.id}`,{});
  console.log(curdevice)
  return {curdevice};
};
DataDetails = connect(mapStateToProps)(DataDetails);
export default withRouter(injectIntl(DataDetails));
