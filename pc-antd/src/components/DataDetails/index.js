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

const TopMonitor = injectIntl((props)=>{
    const {homedata, intl} = props;
    const {main_inwater_quality,main_runtime} = homedata;
    // main_outwater_quality:30,//出水水质,
    // main_outwater_grade:'优',//出水等级,
    // main_inwater_quality:32,//进水水质,
    // main_totalwatervol:29993,//总产水量
    // main_runtime:23,//运行时间
    // main_outcwatervol:322,//浓水出水量

    // 顶部数据
    const monitorData = {
        consumption: 1000,
        runtime: '02:10:20',
        recovery: 1000,
    };//<-----每日用水量吨&回收率uS/cm 从哪里来？
    const { formatMessage } = intl;
    // 顶部数据
    const topData = [
        {
            title: `${formatMessage({id: 'machine.data.quality'})}`,//quality
            unit: 'uS/cm',
            data: `${main_inwater_quality}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.consumption'})}`,//consumption
            unit: '吨',
            data: `${monitorData.consumption}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.runtime'})}`,//runtime
            unit: '时/分/秒',
            data: `${main_runtime}`,
        },
        {
            title: `${formatMessage({id: 'machine.data.recovery'})}`,//recovery
            unit: 'uS/cm',
            data: `${monitorData.recovery}`,
        }
    ]

    const topList = _.map(topData, (item)=>{
        return (
            <Col span={6} key={item.title}>
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


const TopChart = injectIntl((props)=>{
    const {homedata, intl} = props;
    const { formatMessage } = intl;
    const {main_inwater_quality,main_runtime} = homedata;
    //以下是滤芯部分
    // filterelements_modlife_leftvol:39,//电离子膜寿命剩余流量
    // filterelements_prefilter1_leftvol:29,//前置PP寿命剩余流量
    // filterelements_prefilter2_leftvol:30,//前置2滤芯寿命剩余流量
    // filterelements_prefilter3_leftvol:9,//前置3滤芯寿命剩余流量
    // filterelements_posfilter1_leftvol:70,//后置活性炭寿命剩余流量
    // filterelements_posfilter2_leftvol:90,//电离子膜寿命剩余流量
    // filterelements_posfilter3_leftvol:100,//电离子膜寿命剩余流量
    // filterelements_modlife_leftday:20,//电离子膜寿命剩余天数
    // filterelements_prefilter1_leftday:1,//前置PP寿命剩余天数
    // filterelements_prefilter2_leftday:24,//前置2寿命剩余天数
    // filterelements_prefilter3_leftday:41,//前置3寿命剩余天数
    // filterelements_posfilter1_leftday:5,//后置活性炭寿命剩余天数
    // filterelements_posfilter2_leftday:23,//后置2滤芯寿命剩余天数
    // filterelements_posfilter3_leftday:46,//后置2滤芯寿命剩余天数
    //
    // 进度数据
    const chartDataConst = {
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

    const chartData = [
        {
            title: `${formatMessage({id: 'machine.data.average'})}`,
            unit: 'uS/cm',
            data: chartDataConst.average.data,
            warring: chartDataConst.average.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.ionmembrance'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.ionmembrance.data,
            warring: chartDataConst.ionmembrance.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.frontfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.frontfilter1.data,
            warring: chartDataConst.frontfilter1.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter2'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.frontfilter2.data,
            warring: chartDataConst.frontfilter2.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter3'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.frontfilter3.data,
            warring: chartDataConst.frontfilter3.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.afterfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.afterfilter1.data,
            warring: chartDataConst.afterfilter1.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter2'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.afterfilter2.data,
            warring: chartDataConst.afterfilter2.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter3'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.afterfilter3.data,
            warring: chartDataConst.afterfilter3.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.uvlife'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: chartDataConst.uvlife.data,
            warring: chartDataConst.uvlife.warring,
        }
    ]

    return (
        <Row gutter={24} style={{marginTop: 30}}>
            <Col span={24} style={{textAlign: 'center'}}>
                {
                     _.map(chartData, (item)=>{
                        return (
                            <Chart {...item} key={item.title} />
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
                status={warring?"exception":"active"}
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

        const realtimedata = {
          homedata:{
            main_outwater_quality:30,//出水水质,
            main_outwater_grade:'优',//出水等级,
            main_inwater_quality:32,//进水水质,
            main_totalwatervol:29993,//总产水量
            main_runtime:23,//运行时间
            main_outcwatervol:322,//浓水出水量
            //以下是滤芯部分
            filterelements_modlife_leftvol:39,//电离子膜寿命剩余流量
            filterelements_prefilter1_leftvol:29,//前置PP寿命剩余流量
            filterelements_prefilter2_leftvol:30,//前置2滤芯寿命剩余流量
            filterelements_prefilter3_leftvol:9,//前置3滤芯寿命剩余流量
            filterelements_posfilter1_leftvol:70,//后置活性炭寿命剩余流量
            filterelements_posfilter2_leftvol:90,//电离子膜寿命剩余流量
            filterelements_posfilter3_leftvol:100,//电离子膜寿命剩余流量
            filterelements_modlife_leftday:20,//电离子膜寿命剩余天数
            filterelements_prefilter1_leftday:1,//前置PP寿命剩余天数
            filterelements_prefilter2_leftday:24,//前置2寿命剩余天数
            filterelements_prefilter3_leftday:41,//前置3寿命剩余天数
            filterelements_posfilter1_leftday:5,//后置活性炭寿命剩余天数
            filterelements_posfilter2_leftday:23,//后置2滤芯寿命剩余天数
            filterelements_posfilter3_leftday:46,//后置2滤芯寿命剩余天数
          },
          // errordata:{
          //   error_partsfailure:1,//零件故障
          //   error_pumpfailure:1,//20	泵故障	ERROR2:0 无故障 1有故障
          //   error_programfailure:1,//21	程序故障	ERROR3:0 无故障 1有故障
          //   error_flowfailure:1,//22	流量故障	ERROR4:0 无故障 1有故障
          //   error_leakagefault:1,//23	漏水故障	ERROR5:0 无故障 1有故障
          //   error_edicurrent:1,//24	EDI电流	ERROR6:0 无故障 1有故障
          //   error_modout:1,//25	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
          //   error_intakesensorfault:1,//26	进水传感器故障	ERROR8 :0 无故障 1有故障
          //   error_outflowsensorfault:1,//27	出水传感器故障	ERROR9:0 无故障 1有故障
          //   error_cwatersensorfault:1,//28	浓水传感器故障	ERROR10 :0 无故障 1有故障
          //   error_wastewatersensorfault:1,//29	废水传感器故障	ERROR11:0 无故障 1有故障
          //   error_outflowflowmeterfailure:1,//30	出水流量计故障	ERROR12:0 无故障 1有故障
          //   error_wastewaterflowmeterfailure:1,//31	废水流量计故障	ERROR13:0 无故障 1有故障
          //   error_clockfailure:1,//32	时钟故障	ERROR14:0 无故障 1有故障
          //   error_pressuresensor1failure:0,//33	压力1传感器故障	ERROR15:0 无故障 1有故障
          //   error_pressuresensor2failure:0,//34	压力2传感器故障	ERROR16:0 无故障 1有故障
          //   error_pressuresensor3failure:0,//35	压力3传感器故障	ERROR17:0 无故障 1有故障
          //   error_pressuresensor4failure:0,//36	压力4传感器故障	ERROR18:0 无故障 1有故障
          // },
          // performancedata:{
          //   averagecurrent_600:300,//平均电流@600	600电导率时的电流:mA	1 word
          //   averagecurrent_300:200,//300电导率时的电流:mA	1 word
          //   averagecut_600:350,//16	平均cut@600	600电导率时的cut	1 word
          //   averagecut_300:150,// 17	平均cut@300	300电导率时的cut	1 word
          //   waterpurificationrate:90,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
          //
          //   max_averagecurrent_600:120,//平均电流@600	600电导率时的电流:mA	1 word
          //   max_averagecurrent_300:100,//300电导率时的电流:mA	1 word
          //   max_averagecut_600:170,//16	平均cut@600	600电导率时的cut	1 word
          //   max_averagecut_300:70,// 17	平均cut@300	300电导率时的cut	1 word
          //   max_waterpurificationrate:19,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
          //
          //   min_averagecurrent_600:6,//平均电流@600	600电导率时的电流:mA	1 word
          //   min_averagecurrent_300:5,//300电导率时的电流:mA	1 word
          //   min_averagecut_600:4,//16	平均cut@600	600电导率时的cut	1 word
          //   min_averagecut_300:3,// 17	平均cut@300	300电导率时的cut	1 word
          //   min_waterpurificationrate:2,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
          // }

        };

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span>{formatMessage({id: 'machine.datadetail'})}</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
                    </Col>
                </Row>
                <TopMonitor {...realtimedata} />
                <TopChart {...realtimedata} />
                <Row gutter={24} style={{marginTop: 30}}>
                    <Col span={2}></Col>
                    <Col span={10} className="sub-title">
                        <div><h2>{formatMessage({id: 'machine.mode'})}</h2><span className="right-Link" onClick={()=>{history.push('/actions')}}>Mode&gt;</span></div>
                        <Table columns={Mode_columns} dataSource={dataMode} className="table-list" pagination={false} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="sub-title">
                        <div><h2>{formatMessage({id: 'machine.mode.input'})}</h2></div>
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
