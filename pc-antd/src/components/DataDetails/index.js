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
import config from './config';
import './index.less';
import {adddevicecmddata_request,adddevicecmddata_result} from '../../actions';
import {getdevicedata_request,getdevicedata_result} from '../../actions';
import {getdevicehisdata_request,getdevicehisdata_result} from '../../actions';
import {getdevicecmddata_request,getdevicecmddata_result} from '../../actions';
import {callthen} from '../../sagas/pagination';


import sb_icon from '../../assets/sj_icon.png';

const curTZ = moment.tz.guess();

const Option = Select.Option;


// 操作指令数据
// 底部表格数据


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

const getPercent = (id,value) => {
    console.log('GetPercent:')
    console.log(value);
    let cf = config[id];
    let warring = false;
    console.log(id);
    let percent = Math.round(value/cf.value * 100) ;
    if(percent <= cf.warringPercent){
        warring = true;
    }
    return {
        value,
        percent,
        warring
    }
}

const TopChart = injectIntl((props)=>{
    const {homedata, intl} = props;
    console.log(homedata)
    const { formatMessage } = intl;
    const outwater_quality = getPercent('main_outwater_quality', homedata.main_outwater_quality);
    const modlife_leftday = getPercent('filterelements_modlife_leftday', homedata.filterelements_modlife_leftday);
    const prefilter1_leftday = getPercent('filterelements_prefilter1_leftday', homedata.filterelements_prefilter1_leftday);
    const prefilter2_leftday = getPercent('filterelements_prefilter2_leftday', homedata.filterelements_prefilter2_leftday);
    const prefilter3_leftday = getPercent('filterelements_prefilter3_leftday', homedata.filterelements_prefilter3_leftday);
    const posfilter1_leftday = getPercent('filterelements_posfilter1_leftday', homedata.filterelements_posfilter1_leftday);
    const posfilter2_leftday = getPercent('filterelements_posfilter2_leftday', homedata.filterelements_posfilter2_leftday);
    const posfilter3_leftday = getPercent('filterelements_posfilter3_leftday', homedata.filterelements_posfilter3_leftday);
    const uvfilter_leftday = getPercent('filterelements_uvfilter_leftday', homedata.filterelements_uvfilter_leftday);
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
    // filterelements_uvfilter_leftday: 46, //UV滤芯剩余天数
    // 进度数据
    // const chartDataConst = {
    //     average: {
    //         data: 90,
    //         warring: true,
    //     },
    //     ionmembrance: {
    //         data: 60,
    //         warring: false,
    //     },
    //     frontfilter1: {
    //         data: 1000,
    //         warring: false,
    //     },
    //     frontfilter2: {
    //         data: 1000,
    //         warring: false,
    //     },
    //     frontfilter3: {
    //         data: 10,
    //         warring: true,
    //     },
    //     afterfilter1: {
    //         data: 100,
    //         warring: false,
    //     },
    //     afterfilter2: {
    //         data: 1000,
    //         warring: false,
    //     },
    //     afterfilter3: {
    //         data: 1000,
    //         warring: false,
    //     },
    //     uvlife: {
    //         data: 10,
    //         warring: true,
    //     }
    // }

    const chartData = [
        {
            title: `${formatMessage({id: 'machine.data.average'})}`,
            unit: 'uS/cm',
            data: outwater_quality.value,
            percent: outwater_quality.percent,
            warring: outwater_quality.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.ionmembrance'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: modlife_leftday.value,
            percent: modlife_leftday.percent,
            warring: modlife_leftday.warring ,
        },
        {
            title:  `${formatMessage({id: 'machine.data.frontfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: prefilter1_leftday.value,
            percent: prefilter1_leftday.percent,
            warring: prefilter1_leftday.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter2'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: prefilter2_leftday.value,
            percent: prefilter2_leftday.percent,
            warring: prefilter2_leftday.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.frontfilter3'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: prefilter3_leftday.value,
            percent: prefilter3_leftday.percent,
            warring: prefilter3_leftday.warring,
        },
        {
            title: `${formatMessage({id: 'machine.data.afterfilter1'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: posfilter1_leftday.value,
            percent: posfilter1_leftday.percent,
            warring: posfilter1_leftday.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter2'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: posfilter2_leftday.value,
            percent: posfilter2_leftday.percent,
            warring: posfilter2_leftday.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.afterfilter3'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: posfilter3_leftday.value,
            percent: posfilter3_leftday.percent,
            warring: posfilter3_leftday.warring,
        },
        {
            title:  `${formatMessage({id: 'machine.data.uvlife'})}`,
            unit: `${formatMessage({id: 'machine.data.life'})}`,
            data: uvfilter_leftday.value,
            percent: uvfilter_leftday.percent,
            warring: uvfilter_leftday.warring,
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

const Chart = ({title, unit, data, percent, warring})=>{
    return (
        <div className="chart">
            <Progress type="circle"
                percent={percent}
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

    constructor(props) {
      super(props);
      this.state = {
          action: '',
          timezone: curTZ,
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
            filterelements_uvfilter_leftday:46,//UV滤芯寿命剩余天数
          },
          dataMode:[
              // {
              //     key: 1,
              //     type: 'message',
              //     body: 'ModinUs: 353 , 303',
              //     occurstime: '2018-05-05 3:21:00 PM'
              // },
          ],
          data_spot:[
              // {
              //     key: 1,
              //     ModInuS: 279,
              //     ProductuS:178,
              //     ModOutuS: 201,
              //     ProductQualityAverage: 76,
              //     totalONtime: 82017,
              //     productDvol: 0,
              //     cYield: 30,
              //     DailyVolume: 15830,
              //     FeedVolumeDaily: 51281,
              //     cWasteVolumeDaily: 35451,
              //     totalVol: 50932,
              //     SysPressure: 520,
              //     tmpt2: 313,
              //     createtime: '2018-09-11 9:39:00 AM'
              // },
          ]
      }
    }

    componentDidMount(){
      const deviceid = lodashget(this,'props.curdevice.syssettings.deviceid');
      if(!!deviceid){
        this.props.dispatch(callthen(getdevicedata_request,getdevicedata_result,{
          deviceid
          })).then((result) => {
            //实时数据，对应this.state.homedata
            this.setState({homedata:result.homedata});
          console.log(result);
        }).catch((err) => {
          console.log(err);
        })
        this.props.dispatch(callthen(getdevicehisdata_request,getdevicehisdata_result,{
          deviceid
          })).then((result) => {
            //历史数据，对应this.state.data_spot
            this.setState({data_spot:result});
          console.log(result);
        }).catch((err) => {
          console.log(err);
        })
        this.props.dispatch(callthen(getdevicecmddata_request,getdevicecmddata_result,{
          deviceid
          })).then((result) => {
            //历史命令数据，对应this.state.dataMode
            this.setState({dataMode:result});
          console.log(result);
        }).catch((err) => {
          console.log(err);
        })
      }

    }



    handleSend = () => {
        const { dispatch } = this.props;
        const deviceid = lodashget(this,'props.curdevice.syssettings.deviceid');
        if(this.state.action && !!deviceid){
            console.log(this.state.action);

            dispatch(callthen(adddevicecmddata_request,adddevicecmddata_result,{
                deviceid,
                data:{
                  type: 'message',
                  body: this.state.action,
                }
              })).then((result) => {
                console.log(result);
                this.props.dispatch(callthen(getdevicecmddata_request,getdevicecmddata_result,{
                  deviceid
                  })).then((result) => {
                    //历史命令数据，对应this.state.dataMode
                    this.setState({dataMode:result});
                  console.log(result);
                }).catch((err) => {
                  console.log(err);
                });
            }).catch((err) => {
              console.log(err);
            })
        }
    }

    handleStatistic = () => {
        const { history } = this.props;
        history.push(`/statistics/${this.props.match.params.id}`);

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
          homedata:this.state.homedata
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
                        <Table columns={Mode_columns} dataSource={this.state.dataMode} className="table-list" pagination={false} />
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
                        <Table columns={columns} dataSource={this.state.data_spot} className="data-table-list" pagination={false} />
                    </Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({device:{devices}},props) =>{
  const curdevice = lodashget(devices,`${props.match.params.id}`,{});
  console.log(curdevice)
  return {curdevice};
};
DataDetails = connect(mapStateToProps)(DataDetails);
export default withRouter(injectIntl(DataDetails));
