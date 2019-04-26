import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, Select, Input, Progress } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import _ from 'lodash';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map'
import moment from 'moment';
import 'moment-timezone';
import GridContent from '../GridContent';
import config from './config';
import './index.less';
import {startdevicequery,setdevicesubscriber} from '../../actions';
import {adddevicecmddata_request,adddevicecmddata_result} from '../../actions';
// import {getdevicedata_request,getdevicedata_result} from '../../actions';
// import {getdevicehisdata_request,getdevicehisdata_result} from '../../actions';
import {getdevicecmddata_request,getdevicecmddata_result} from '../../actions';
import {callthen} from '../../sagas/pagination';

import success from '../../assets/success.png'
import sb_icon from '../../assets/sj_icon.png';

const curTZ = moment.tz.guess();

const Option = Select.Option;


// 操作指令数据
// 底部表格数据


const TopMonitor = injectIntl((props)=>{
    const {srvdata, intl} = props;
    let topData = []
    console.log('Home Data: ', srvdata)
    if(!!srvdata) {
      const {ProductQualityAverage,ModIn, DailyVolume,Reserve1,Yield} = srvdata;

      // main_outwater_quality:30,//出水水质,
      // main_outwater_grade:'优',//出水等级,
      // main_inwater_quality:32,//进水水质,
      // main_totalwatervol:29993,//总产水量
      // main_runtime:23,//运行时间
      // main_outcwatervol:322,//浓水出水量

      // 顶部数据
      // const monitorData = {
      //     consumption: 1000,
      //     runtime: '02:10:20',
      //     recovery: 1000,
      // };//<-----每日用水量吨&回收率uS/cm 从哪里来？
      const { formatMessage } = intl;
      // 顶部数据
      topData = [
          {
              title:`${formatMessage({id: 'machine.data.average'})}`,
              unit: 'uS/cm',
              data: `${ProductQualityAverage}`,
          },
          {
              title: `${formatMessage({id: 'machine.data.quality'})}`,//quality
              unit: 'uS/cm',
              data: `${ModIn}`,
          },
          {
              title: `${formatMessage({id: 'machine.data.consumption'})}`,//consumption
              unit: 'Gal',
              data: `${DailyVolume}`,
          },
          {
              title: `${formatMessage({id: 'machine.data.recovery'})}`,//recovery
              unit: '%',
              data: `${Yield}`,
          },
          {
              title: `${formatMessage({id: 'machine.data.runtime'})}`,//runtime
              unit: '天',
              data: `${Reserve1}`,
          },

      ]

              // {
          //     title: `${formatMessage({id: 'machine.data.average'})}`,
          //     unit: 'uS/cm',
          //     data: outwater_quality.value,
          //     percent: outwater_quality.percent,
          //     warring: outwater_quality.warring,
          // },

    }



    const topList = _.map(topData, (item, index)=>{
        return (
            // <Col span={4} key={item.title}>
            //     <div className="number-info">
            //         <span className="title">{item.title}</span>
            //         <span className="unit">{item.unit}</span>
            //         <span className="data">{item.data}</span>
            //     </div>
            // </Col>
            <div key={index}>
                <div className="number-info">
                    <span className="title">{item.title}</span>
                    <span className="unit">{item.unit}</span>
                    <span className="data">{item.data}</span>

                </div>
            </div>
        )
    })

    return (
        <Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            { !!srvdata ? topList : `${intl.formatMessage({id: 'app.nodata'})}` }
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
    const {srvdata, intl} = props;
    const { formatMessage } = intl;
    let chartData = []

    if(!!srvdata) {
      // "MODLife" : "720",//MOD Life 膜寿命 d[G] {界面6}
      // "Pre_filter1" : "365",//Pre_filter1 前置1 d[H] {界面7}
      // "Pre_filter2" : "30",//Pre_filter2 前置2 d[I] {界面8}
      // "Pre_filter3" : "10",//Pre_filter3 前置3 d[J] {界面9}
      // "Pos_filter1" : "0",//Post Filter1 后置1 d[K] {界面10}
      // "Pos_filter2" : "10",//Post Filter2 后置2 d[L] {界面11}
      // "Pos_filter3" : "120",//Post Filter3 后置3 d[M] {界面12}
      // "UV" : "60",//UV d[U] {界面13}
      //
      const {MODLifePercent,Pre_filter1_percent,Pre_filter2_percent,Pre_filter3_percent,Pos_filter1_percent,Pos_filter2_percent,Pos_filter3_percent,UV} = srvdata;
      // const {prefilter1_leftday,prefilter2_leftday,prefilter3_leftday,posfilter1_leftday,posfilter2_leftday,} = srvdata;
      // const outwater_quality = getPercent('main_outwater_quality', homedata.main_outwater_quality);
      const modlife_flow = getPercent('filterelements_modlife_flow', MODLifePercent);
      const prefilter1_flow = getPercent('filterelements_prefilter1_flow', Pre_filter1_percent);
      const prefilter2_flow = getPercent('filterelements_prefilter2_flow', Pre_filter2_percent);
      const prefilter3_flow = getPercent('filterelements_prefilter3_flow', Pre_filter3_percent);
      const posfilter1_flow = getPercent('filterelements_posfilter1_flow', Pos_filter1_percent);
      const posfilter2_flow = getPercent('filterelements_posfilter2_flow', Pos_filter2_percent);
      const posfilter3_flow = getPercent('filterelements_posfilter3_flow', Pos_filter3_percent);
      const uvfilter_flow = getPercent('filterelements_uvfilter_flow', UV);
      // //以下是滤芯部分
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

      chartData = [
          // {
          //     title: `${formatMessage({id: 'machine.data.average'})}`,
          //     unit: 'uS/cm',
          //     data: outwater_quality.value,
          //     percent: outwater_quality.percent,
          //     warring: outwater_quality.warring,
          // },
          {
              title:  `${formatMessage({id: 'machine.data.ionmembrance'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: modlife_flow.value,
              percent: modlife_flow.percent,
              warring: modlife_flow.warring ,
          },
          {
              title:  `${formatMessage({id: 'machine.data.frontfilter1'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: prefilter1_flow.value,
              percent: prefilter1_flow.percent,
              warring: prefilter1_flow.warring,
          },
          {
              title: `${formatMessage({id: 'machine.data.frontfilter2'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: prefilter2_flow.value,
              percent: prefilter2_flow.percent,
              warring: prefilter2_flow.warring,
          },
          {
              title: `${formatMessage({id: 'machine.data.frontfilter3'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: prefilter3_flow.value,
              percent: prefilter3_flow.percent,
              warring: prefilter3_flow.warring,
          },
          {
              title: `${formatMessage({id: 'machine.data.afterfilter1'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: posfilter1_flow.value,
              percent: posfilter1_flow.percent,
              warring: posfilter1_flow.warring,
          },
          {
              title:  `${formatMessage({id: 'machine.data.afterfilter2'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: posfilter2_flow.value,
              percent: posfilter2_flow.percent,
              warring: posfilter2_flow.warring,
          },
          {
              title:  `${formatMessage({id: 'machine.data.afterfilter3'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: posfilter3_flow.value,
              percent: posfilter3_flow.percent,
              warring: posfilter3_flow.warring,
          },
          {
              title:  `${formatMessage({id: 'machine.data.uvlife'})}`,
              unit: `${formatMessage({id: 'machine.data.flow'})}`,
              data: uvfilter_flow.value,
              percent: uvfilter_flow.percent,
              warring: uvfilter_flow.warring,
          }
      ]

    }

    return (
        <Row gutter={24} style={{marginTop: 30, padding: '10px 26px'}}>
            <Col span={24} style={{display: 'flex', justifyContent: 'space-between'}}>
                {
                  !!srvdata ? (
                     _.map(chartData, (item, index)=>{
                        return (
                            <Chart {...item} key={index} />
                        )
                    }))
                    : ''
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
    render: (text, record) =>{
      console.log('Mode Record:', record)
      console.log(text);
      if(lodashget(record,'issent') === 1) {
         return (
          //  <React.Fragment><span></span></React.Fragment>
          <div>
            <div style={{width: '25px', display: 'inline-block'}}>
              <img src={success} alt="" style={{width: '20px', height: '20px'}} />
            </div>
            <div style={{display: 'inline-block'}}>{`${text}`}</div>
          </div>
         )
      }

      // return (<img src={failer} alt="" style={{width: '20px', height: '20px'}} />)

      // if(lodashget(record,'issent') === 1){//表示已经发送成功
      //   return `#${text}`;
      // }
      return (
        <div>
          <div style={{width: '25px', display: 'inline-block'}}>
          </div>
          <div style={{display: 'inline-block'}}>{text}</div>
        </div>

      )
    }
  }, {
    title: <FormattedMessage id="machine.mode.body" />,
    dataIndex: 'body',
    key: 'body',
  }, {
    title: <FormattedMessage id="machine.mode.occurstime" />,
    dataIndex: 'occurstime',
    key: 'occurstime',
    render: (text, record) =>{
      console.log(text);
      return moment(text).format('YYYY-MM-DD HH:mm:ss');
    }
  }
]


const columns = [{
    title: <FormattedMessage id="table.systime" />,
    dataIndex: 'systime',
    key: 'systime'
  },
  {
    title: <FormattedMessage id="table.currentstate" />,
    dataIndex: 'currentstate',
    key: 'currentstate'
  },
  {
    title: <FormattedMessage id="table.ModIn" />,
    dataIndex: 'ModIn',
    key: 'ModIn'
  },
  {
    title: <FormattedMessage id="table.Concentration" />,
    dataIndex: 'Concentration',
    key: 'Concentration'
  },
  {
    title: <FormattedMessage id="table.ModOut" />,
    dataIndex: 'ModOut',
    key: 'ModOut'
  },
  {
    title: <FormattedMessage id="table.Waste" />,
    dataIndex: 'Waste',
    key: 'Waste'
  },
  {
    title: <FormattedMessage id="table.cutAbs" />,
    dataIndex: 'cutAbs',
    key: 'cutAbs'
  },
  {
    title: <FormattedMessage id="table.cutPer" />,
    dataIndex: 'cutPer',
    key: 'cutPer'
  },
  {
    title: <FormattedMessage id="table.ModCurrent" />,
    dataIndex: 'ModCurrent',
    key: 'ModCurrent'
  },
  {
    title: <FormattedMessage id="table.ModVoltage" />,
    dataIndex: 'ModVoltage',
    key: 'ModVoltage'
  },
  {
    title: <FormattedMessage id="table.solenoidCurrent" />,
    dataIndex: 'solenoidCurrent',
    key: 'solenoidCurrent'
  },
  {
    title: <FormattedMessage id="table.ProductQualityAverage" />,
    dataIndex: 'ProductQualityAverage',
    key: 'ProductQualityAverage'
  },
  {
    title: <FormattedMessage id="table.ONtime" />,
    dataIndex: 'ONtime',
    key: 'ONtime'
  },
  {
    title: <FormattedMessage id="table.productDvol" />,
    dataIndex: 'productDvol',
    key: 'productDvol'
  },
  {
    title: <FormattedMessage id="table.wasteDvol" />,
    dataIndex: 'wasteDvol',
    key: 'wasteDvol'
  },
  {
    title: <FormattedMessage id="table.Yield" />,
    dataIndex: 'Yield',
    key: 'Yield'
  },
  {
    title: <FormattedMessage id="table.DailyVolume" />,
    dataIndex: 'DailyVolume',
    key: 'DailyVolume'
  },
  {
    title: <FormattedMessage id="table.WasteVolumeDaily" />,
    dataIndex: 'WasteVolumeDaily',
    key: 'WasteVolumeDaily'
  },
  {
    title: <FormattedMessage id="table.FeedVolumeDaily" />,
    dataIndex: 'FeedVolumeDaily',
    key: 'FeedVolumeDaily'
  },
{
    title: <FormattedMessage id="table.totalVol" />,
    dataIndex: 'totalVol',
    key: 'totalVol'
  },
  {
    title: <FormattedMessage id="table.p1" />,
    dataIndex: 'p1',
    key: 'p1'
  },
  {
    title: <FormattedMessage id="table.p2" />,
    dataIndex: 'p2',
    key: 'p2'
  },
  {
    title: <FormattedMessage id="table.Ieff" />,
    dataIndex: 'Ieff',
    key: 'Ieff'
  },
  {
    title: <FormattedMessage id="table.Energy" />,
    dataIndex: 'Energy',
    key: 'Energy'
  },
  {
    title: <FormattedMessage id="table.Pressure1" />,
    dataIndex: 'Pressure1',
    key: 'Pressure1'
  },
  {
    title: <FormattedMessage id="table.Pressure2" />,
    dataIndex: 'Pressure2',
    key: 'Pressure2'
  },
  {
    title: <FormattedMessage id="table.Pressure3" />,
    dataIndex: 'Pressure3',
    key: 'Pressure3'
  },
  {
    title: <FormattedMessage id="table.Pressure4" />,
    dataIndex: 'Pressure4',
    key: 'Pressure4'
  },
  {
    title: <FormattedMessage id="table.tmpt1" />,
    dataIndex: 'tempt1',
    key: 'tempt1'
  },
  {
    title: <FormattedMessage id="table.tmpt2" />,
    dataIndex: 'tempt2',
    key: 'tempt2'
  },
  {
    title: <FormattedMessage id="table.tmpt3" />,
    dataIndex: 'tempt3',
    key: 'tempt3'
  },
  {
    title: <FormattedMessage id="table.tmpt4" />,
    dataIndex: 'tempt4',
    key: 'tempt4'
  },
  {
    title: <FormattedMessage id="table.MODLife" />,
    dataIndex: 'MODLife',
    key: 'MODLife'
  },
  {
    title: <FormattedMessage id="table.Pre_filter1" />,
    dataIndex: 'Pre_filter1',
    key: 'Pre_filter1'
  },
  {
    title: <FormattedMessage id="table.Pre_filter2" />,
    dataIndex: 'Pre_filter2',
    key: 'Pre_filter2'
  },
  {
    title: <FormattedMessage id="table.Pre_filter3" />,
    dataIndex: 'Pre_filter3',
    key: 'Pre_filter3'
  },
  {
    title: <FormattedMessage id="table.Post_filter1" />,
    dataIndex: 'Post_filter1',
    key: 'Post_filter1'
  },
  {
    title: <FormattedMessage id="table.Post_filter2" />,
    dataIndex: 'Post_filter2',
    key: 'Post_filter2'
  },
  {
    title: <FormattedMessage id="table.Post_filter3" />,
    dataIndex: 'Post_filter3',
    key: 'Post_filter3'
  },
  {
    title: <FormattedMessage id="table.MODLifePercent" />,
    dataIndex: 'MODLifePercent',
    key: 'MODLifePercent',
  },
  {
    title: <FormattedMessage id="table.Pre_filter1_percent" />,
    dataIndex: 'Pre_filter1_percent',
    key: 'Pre_filter1_percent',
  },
  {
    title: <FormattedMessage id="table.Pre_filter2_percent" />,
    dataIndex: 'Pre_filter2_percent',
    key: 'Pre_filter2_percent',
  },
  {
    title: <FormattedMessage id="table.Pre_filter3_percent" />,
    dataIndex: 'Pre_filter3_percent',
    key: 'Pre_filter3_percent',
  },
  {
    title: <FormattedMessage id="table.Pos_filter1_percent" />,
    dataIndex: 'Pos_filter1_percent',
    key: 'Pos_filter1_percent',
  },
  {
    title: <FormattedMessage id="table.Pos_filter2_percent" />,
    dataIndex: 'Pos_filter2_percent',
    key: 'Pos_filter2_percent',
  },
  {
    title: <FormattedMessage id="table.Pos_filter3_percent" />,
    dataIndex: 'Pos_filter3_percent',
    key: 'Pos_filter3_percent',
  },
  {
    title: <FormattedMessage id="table.UV" />,
    dataIndex: 'UV',
    key: 'UV',
  },
  {
    title: <FormattedMessage id="table.created_at" />,
    dataIndex: 'updated_at',
    key: 'updated_at',
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

      }
    }
    componentWillUnmount(){
      this.props.dispatch(setdevicesubscriber({data:{deviceid:'',cmd:'unset'}}));
    }

    componentDidMount(){
      const deviceid = lodashget(this,'props.curdevice.syssettings.deviceid');
      console.log(`start request deviceid:${deviceid}`);
      if(!!deviceid){
        this.props.dispatch(setdevicesubscriber({data:{deviceid,cmd:'set'}}));
        this.props.dispatch(startdevicequery({deviceid}));
      }
    }

    initModeTableData = (data) => {
      const dataMode = []
      lodashmap(data, (item, index) => {
        dataMode.push({
          key: index,
          ...item
        })
      })
      return dataMode
    }


    // initTableData = (data) => {
    //   const data_spot = []
    //   lodashmap(data, (item, index) => {
    //     const { created_at, deviceid, _id, updated_at, srvdata } = item
    //     let createdTime = moment(created_at).format('YYYY-MM-DD HH:mm:ss')
    //     let updatedTime = moment(updated_at).format('YYYY-MM-DD HH:mm:ss')
    //     data_spot.push({
    //       key: index,
    //       _id,
    //       deviceid,
    //       created_at: createdTime,
    //       updated_at: updatedTime,
    //       ...srvdata
    //     })
    //   })
    //   return data_spot
    // }



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
                    // this.setState({dataMode:result});
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
        const { history,curdevice } = this.props;
        const { formatMessage } = this.props.intl;
        const tzs = timezoneOption();

        const tzOptions = _.map(tzs, (item,key)=>{
            return (
                <Option value={item.value} key={key}>{item.label}</Option>
            )
        })

        const realtimedata = {
          srvdata:this.props.srvdata
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
                <Row gutter={24} style={{marginTop: 30, padding: '0 26px'}}>
                    {/* <Col span={2}></Col> */}
                    <Col span={12} className="sub-title">
                        <div><h2>{formatMessage({id: 'machine.mode'})}</h2><span className="right-Link" onClick={()=>{history.push(`/actions/${curdevice.deviceid}`)}}>Mode&gt;</span></div>
                        <Table columns={Mode_columns} dataSource={this.props.dataMode} className="table-list" pagination={false} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10} className="sub-title">
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
                                {/* <Button size="large" onClick={this.handleDownload}>{formatMessage({id: 'machine.download'})}</Button> */}
                            </div>
                        </div>
                    </Col>
                    {/* <Col span={2}></Col> */}
                </Row>
                <Row style={{marginTop: 30, padding: '0 26px'}}>
                    <Col span={24} style={{margin: '0 auto'}}>
                        <Table columns={columns} dataSource={this.props.data_spot} scroll={{x: true}} className="data-table-list" pagination={false} />
                    </Col>
                </Row>
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({device:{devices},devicedetail:{srvdata,data_spot,dataMode}},props) =>{
  const curdevice = lodashget(devices,`${props.match.params.id}`,{});
  console.log(curdevice)
  return {curdevice,srvdata,data_spot,dataMode};
};
DataDetails = connect(mapStateToProps)(DataDetails);
export default withRouter(injectIntl(DataDetails));
