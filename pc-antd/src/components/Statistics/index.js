import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map'
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

const cycleAction = {
    day:{
      name: <FormattedMessage id="machine.report.day" />,
      action: 'hour',
    },
    week:{
        name: <FormattedMessage id="machine.report.week" />,
        action: 'day',
    },
    month:{
        name: <FormattedMessage id="machine.report.month" />,
        action: 'month',
    },
    year:{
        name: <FormattedMessage id="machine.report.year" />,
        action: 'year',
    },
};
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
const typeAction = {
    'ModInOut':{//1是进水水质
      id:'machine.report.modinout',
      name: 'mod in/out',
      action: 'ModInOut',//ModIn uS 进水水质 d[c] <<---代表两个字段
    },
    // 'srvdata.ModOut': {//2是出水水质
    //     name: <FormattedMessage id="machine.report.quality" />,
    //     action: 'srvdata.ModOut',//ModOut uS 出水水质 d[e]
    // },
    'srvdata.Pressure1':{//3是压力1
        id:'machine.report.pressure',
        name: <FormattedMessage id="machine.report.pressure" />,
        action: 'srvdata.Pressure1',//Pressure1 压力1 d[y]
    },
    'srvdata.WasteVolumeDaily': {//4日废水量
        id:'machine.report.drainage',
        name: <FormattedMessage id="machine.report.drainage" />,
        action: 'srvdata.WasteVolumeDaily',//Waste Volume Daily 今日废水量 d[r]
    },
    'srvdata.totalVol': {//5日总水量
        id:'machine.report.totalinlet',
        name: <FormattedMessage id="machine.report.totalinlet" />,
        action: 'srvdata.totalVol',//totalVol 总用水量 d[t]
    },
    'srvdata.DailyVolume': {//6日用水量
        id:'machine.report.dailyvolume',
        name: <FormattedMessage id="machine.report.dailyvolume" />,
        action: 'srvdata.DailyVolume',//Daily Volume 今日用水量 d[q]
    },
};



class Statistics extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
          cycle: 'hour',
          type: 'ModInOut',
          rangeDate: [
            moment().subtract(1, 'M'),moment()],
          isGetData: false,
          chart: {
              title: '',
              x: [],
              series: [
                  {
                      title: '',
                      data: []
                  }
              ]
          }

      }
    }
    componentDidMount(){
      this.onClickQuery();
    }
    onClickQuery = (data = {
        cycle:this.state.cycle,
        type:this.state.type,
        rangeDate:this.state.rangeDate
    })=>{
      const deviceid = lodashget(this,'props.curdevice.syssettings.deviceid') || lodashget(this,'props.curdevice.deviceid');
      if(!!deviceid){
        this.props.dispatch(callthen(getdevicestat_request,getdevicestat_result,{
            deviceid,
            data:data
          })).then((result) => {
            //实时数据，对应this.state.homedata
            // this.setState({homedata:result.homedata});
            this.setState({isGetData: true})
            console.log(result);
            let chart = this.converData(result)
            this.setState({chart})
            console.log('Chart:', chart)
        }).catch((err) => {
          console.log(err);
        })
      }
    }


    converData = (data) => {
        let x = []
        const title = this.props.intl.formatMessage({id:typeAction[this.state.type].id});
        if(this.state.type === 'ModInOut') {
            let series = [{
                title: 'mod in',
                data: []
            },{
                title: 'mod out',
                data: []
            }]
            lodashmap(data, (item) => {
                x.push(item._id);
                series[0].data.push(item.modin)
                series[1].data.push(item.modout)
            })
            return ({
                title,
                x,
                series
            })
        } else {
            let series = [{
                title,
                data: []
            }]
            lodashmap(data, (item) => {
                x.push(item._id);
                series[0].data.push(item.value)
            })
            return({
                title,
                x,
                series
            })
        }
    }

    onCycleChange = (e)=> {
        this.setState({
            cycle: e.target.value,
        })
        let { type, rangeDate } = this.state
        this.onClickQuery({cycle: e.target.value, type, rangeDate})

    }

    onTypeChange = (e)=> {
        this.setState({
            type: e.target.value,
        })
        let { cycle, rangeDate } = this.state
        this.onClickQuery({cycle, type: e.target.value, rangeDate})
    }

    handleRangePick = (datas, datastrings) => {
        const rangeDate = [datas[0], datas[1]]
        this.setState({rangeDate})
    }

    handleSearch = ()=> {
      this.onClickQuery();
        // console.log({...this.state})
    }

    // 图表数据
    getOption = ()=> {
        console.log(this.state.chart.x)
        const data = this.state.chart.x;
        return ({
            title: {
               text: `${this.state.chart.title}${this.props.intl.formatMessage({id: 'machine.statistic'})}`,// title 数据统计类目
               left: 'center'
            },
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         lineStyle: {
            //             color: '#ddd'
            //         }
            //     },
            //     backgroundColor: 'rgba(255,255,255,1)',
            //     padding: [5, 10],
            //     textStyle: {
            //         color: '#7588E4',
            //     },
            // },
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
                extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
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
                data // xAxis[] 横轴数据，统计周期
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#609ee9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                }
            },
            series: [
                {
                    name: `${this.state.chart.series[0].title}`, // title 数据统计类目
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
                    data: this.state.chart.series[0].data // yAxis[] 横轴数据，统计数据
                },
                {
                    name: `${!!this.state.chart.series[1] && this.state.chart.series[1].title}`, // title 数据统计类目
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
                    data: !!this.state.chart.series[1] && this.state.chart.series[1].data // yAxis[] 横轴数据，统计数据
                }
            ]
        })
    }


    render() {
        const { history, curdevice } = this.props;

        const cycles = (
                _.map(cycleAction, (item, key)=>(
                    <Radio.Button key={key} value={item.action}>{item.name}</Radio.Button>
                ))
        )

        const types = (
            _.map(typeAction, (item, key)=>(
                <Radio.Button key={key} value={item.action}>{item.name}</Radio.Button>
            ))
        )


        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={18}>
                            <div className="left-title">
                                <div><img src={sb_icon} alt="" /></div>
                                <div className="left-item">
                                    <FormattedMessage id="machine.name" />
                                    <span>{`:${lodashget(curdevice, 'basicinfo.model', '')}`}</span>
                                </div>
                                <div className="left-item">
                                    <FormattedMessage id="machine.id" />
                                    <span>{`:${lodashget(curdevice, 'deviceid', '')}`}</span>
                                </div>
                                <div className="left-item">
                                    <FormattedMessage id="machine.report" />
                                </div>
                            </div>

                        </Col>
                        <Col span={6}>
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
