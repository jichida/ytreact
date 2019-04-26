import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashget from 'lodash.get';
import { Card, Row, Col, DatePicker, Radio, Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import _ from 'lodash';
import GridContent from '../GridContent';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import {getdevicestat_request,getdevicestat_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
import sb_icon from '../../assets/sj_icon.png';

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';

const cycleAction = [
    {
      name: <FormattedMessage id="machine.report.day" />,
      action: 'day',
    },
    {
        name: <FormattedMessage id="machine.report.week" />,
        action: 'week',
    },
    {
        name: <FormattedMessage id="machine.report.month" />,
        action: 'month',
    },
    {
        name: <FormattedMessage id="machine.report.year" />,
        action: 'year',
    },
];
//1是进水水质，3是压力1，4日废水量 5日总水量6日用水量
// srvdata:{
//   systime:String,//d[a]
//   currentstate:String,//d[b]
//   ModIn:String,//d[c]
//   Concentration:String,//d[d]
//   ModOut:String,//d[e]
//   Waste:String,//d[f]
//   cutAbs:String,//d[g]
//   cutPer:String,//d[h]
//   ModCurrent:String,//d[i]
//   ModVoltage:String,//d[j]
//   solenoidCurrent:String,//d[k]
//   ProductQualityAverage:String,//d[l]
//   ONtime:String,//d[m]
//   productDvol:String,//d[n]
//   wasteDvol:String,//d[o]
//   Yield:String,//d[p]
//   DailyVolume:String,//d[q]
//   WasteVolumeDaily:String,//d[r]
//   FeedVolumeDaily:String,//d[s]
//   totalVol:String,//d[t]
//   p1:String,//d[u]
//   p2:String,//d[v]
//   Ieff:String,//d[w]
//   Energy:String,//d[x]
//   Pressure1:String,//d[y]
//   Pressure2:String,//d[z]
//   Pressure3:String,//d[A]
//   Pressure4:String,//d[B]
//   tempt1:String,//d[C]
//   tempt2:String,//d[D]
//   tempt3:String,//d[E]
//   tempt4:String,//d[F]
//   MODLife:String,//d[G]
//   Pre_filter1:String,//d[H]
//   Pre_filter2:String,//d[I]
//   Pre_filter3:String,//d[J]
//   Post_filter1:String,//d[K]
//   Post_filter2:String,//d[L]
//   Post_filter3:String,//d[M]
//   MODLifePercent:String,//d[N]
//   Pre_filter1_percent:String,//d[O]
//   Pre_filter2_percent:String,//d[P]
//   Pre_filter3_percent:String,//d[Q]
//   Pos_filter1_percent:String,//d[R]
//   Pos_filter2_percent:String,//d[S]
//   Pos_filter3_percent:String,//d[T]
//   UV:String,//d[U]
//   Reserve1:String,//d[V]
//   Reserve2:String,//d[W]
// }
const typeAction = [
    {//1是进水水质
      name: 'mod in/out',
      action: 'srvdata.ModIn',//ModIn uS 进水水质 d[c]
    },
    {//2是出水水质
        name: <FormattedMessage id="machine.report.quality" />,
        action: 'srvdata.ModOut',//ModOut uS 出水水质 d[e]
    },
    {//3是压力1
        name: <FormattedMessage id="machine.report.pressure" />,
        action: 'srvdata.Pressure1',//Pressure1 压力1 d[y]
    },
    {//4日废水量
        name: <FormattedMessage id="machine.report.drainage" />,
        action: 'srvdata.WasteVolumeDaily',//Waste Volume Daily 今日废水量 d[r]
    },
    {//5日总水量
        name: <FormattedMessage id="machine.report.totalinlet" />,
        action: 'srvdata.totalVol',//totalVol 总用水量 d[t]
    },
    {//6日用水量
        name: <FormattedMessage id="machine.report.totaleffluent" />,
        action: 'srvdata.DailyVolume',//Daily Volume 今日用水量 d[q]
    },
];



class Statistics extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
          cycle: 'day',
          type: 'srvdata.ModIn',
          rangeDate: [],
          isGetData: false
      }
    }
    componentDidMount(){
      this.onClickQuery();
    }
    onClickQuery = ()=>{
      const deviceid = lodashget(this,'props.curdevice.syssettings.deviceid');
      if(!!deviceid){
        this.props.dispatch(callthen(getdevicestat_request,getdevicestat_result,{
            deviceid,
            data:{
              cycle:this.state.cycle,
              type:this.state.type,
              rangeDate:this.state.rangeDate
            }
          })).then((result) => {
            //实时数据，对应this.state.homedata
            // this.setState({homedata:result.homedata});
            this.setState({isGetData: true})
            console.log(result);
        }).catch((err) => {
          console.log(err);
        })
      }
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

    handleRangePick = (datas, datastrings) => {
        const rangeDate = [datas[0], datas[1]]
        this.setState({rangeDate})
    }

    handleSearch = ()=> {
      this.onClickQuery();
        // console.log({...this.state})
    }

    // 示例数据
    getOption = ()=> {
        return ({
            title: {
               text: `mod in/out${this.props.intl.formatMessage({id: 'machine.statistic'})}`,// title 数据统计类目
               left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
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
                    name: 'mod in', // title 数据统计类目
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(199, 237, 250,0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(199, 237, 250,0.2)'
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#03db17'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210] // yAxis[] 横轴数据，统计数据
                },
                {
                    name: 'mod out', // title 数据统计类目
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(216, 244, 247,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(216, 244, 247,1)'
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0368db'
                        }
                    },
                    data: [110, 142, 111, 134, 80, 220, 220] // yAxis[] 横轴数据，统计数据
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
                _.map(cycleAction, (item, index)=>(
                    <Radio.Button key={index} value={item.action}>{item.name}</Radio.Button>
                ))
        )

        const types = (
            _.map(typeAction, (item, index)=>(
                <Radio.Button key={index} value={item.action}>{item.name}</Radio.Button>
            ))
        )


        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={24}>
                            <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.report" /></span>
                            <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; <FormattedMessage id="app.return" /></span>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}} className="statistic_radio" onChange={this.onCycleChange}>
                        <Col span={20}>
                            <Radio.Group value={this.state.cycle} buttonStyle="solid">
                                { cycles }
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                                <DatePicker.RangePicker
                                    ranges={{ '当天': [moment(), moment()], '当月': [moment().startOf('month'), moment().endOf('month')] }}
                                    value={this.state.rangeDate}
                                    format={dateFormat}
                                    onChange={this.handleRangePick}
                                />
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}} className="statistic_radio">
                        <Col span={20}>
                            <Radio.Group value={this.state.type} buttonStyle="solid" onChange={this.onTypeChange}>
                                { types }
                            </Radio.Group>
                        </Col>
                        <Col span={4}><Button type="primary" onClick={this.handleSearch}><FormattedMessage id="app.search" /></Button></Col>
                    </Row>
                    <Row gutter={24} style={{marginBottom: 30}}>
                        <Col span={24}>
                            {this.state.isGetData ? <ReactEcharts option={this.getOption()} /> : '暂无数据'}
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
Statistics = connect(mapStateToProps)(Statistics);
export default withRouter(injectIntl(Statistics));
