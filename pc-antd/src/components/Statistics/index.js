import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map'
import lodashsoftby from 'lodash.sortby'
import { Card, Row, Col, DatePicker, Radio, Button, Checkbox } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import _ from 'lodash';
import GridContent from '../GridContent';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
// import lodashget from 'lodash.get'
import { callthen } from '../../sagas/pagination'
import { page_getdevice_request, page_getdevice_result} from '../../actions'
import {getdevicestat_request,getdevicestat_result} from '../../actions';
import sb_icon from '../../assets/sj_icon.png';

const CheckboxGroup = Checkbox.Group

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
const typeActionPer = {
    'ModInOut':{//1是进水水质
      id:'machine.report.modinout',
      name: 'mod in/out',
      action: 'ModInOut',//ModIn uS 进水水质 d[c] <<---代表两个字段
    },
    // 'srvdata.ModOut': {//2是出水水质
    //     name: <FormattedMessage id="machine.report.quality" />,
    //     action: 'srvdata.ModOut',//ModOut uS 出水水质 d[e]
    // },
    'Pressure1':{//3是压力1
        id:'machine.report.pressure',
        name: <FormattedMessage id="machine.report.pressure" />,
        action: 'srvdata.Pressure1',//Pressure1 压力1 d[y]
    },
    'WasteVolumeDaily': {//4日废水量
        id:'machine.report.drainage',
        name: <FormattedMessage id="machine.report.drainage" />,
        action: 'srvdata.WasteVolumeDaily',//Waste Volume Daily 今日废水量 d[r]
    },
    'totalVol': {//5日总水量
        id:'machine.report.totalinlet',
        name: <FormattedMessage id="machine.report.totalinlet" />,
        action: 'srvdata.totalVol',//totalVol 总用水量 d[t]
    },
    'DailyVolume': {//6日用水量
        id:'machine.report.dailyvolume',
        name: <FormattedMessage id="machine.report.dailyvolume" />,
        action: 'srvdata.DailyVolume',//Daily Volume 今日用水量 d[q]
    },
};

const typeAction = [
    {//1是进水水质
        label: 'mod in/out',
        value: 'ModInOut',//ModIn uS 进水水质 d[c] <<---代表两个字段
    },
    {//3是压力1
        label: <FormattedMessage id="machine.report.pressure" />,
        value: 'Pressure1',//Pressure1 压力1 d[y]
    },
    {//6日用水量
        label: <FormattedMessage id="machine.report.dailyvolume" />,
        value: 'DailyVolume',//Daily Volume 今日用水量 d[q]
    },
    {//4日废水量
        label: <FormattedMessage id="machine.report.drainage" />,
        value: 'WasteVolumeDaily',//Waste Volume Daily 今日废水量 d[r]
    },
    {//5日总水量
        label: <FormattedMessage id="machine.report.totalinlet" />,
        value: 'totalVol',//totalVol 总用水量 d[t]
    },
    // {//6日用水量
    //     label: <FormattedMessage id="machine.report.dailyvolume" />,
    //     value: 'DailyVolume',//Daily Volume 今日用水量 d[q]
    // },
];



class Statistics extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
          curdevice:{},
          cycle: 'hour',
          type: ['ModInOut'],
          rangeDate: [moment().subtract(1, 'days'), moment()],
          isGetData: false,
          result: [],
          chart: [{
              title: '',
              x: [],
              series: [
                  {
                      title: '',
                      data: []
                  }
              ]
          }]

      }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(callthen(page_getdevice_request,page_getdevice_result,{query:{_id:`${id}`}}))
        .then((result) => {
            console.log('Get Result:', lodashget(result, 'result.docs[0]', {}))
            const curdevice = lodashget(result, 'result.docs[0]', {});
            this.setState({curdevice});
            this.onClickQuery();
        })

    }
    onClickQuery = (data = {
        cycle:this.state.cycle,
        // type:this.state.type,
        // typelist: ['ModInOut','srvdata.Pressure1','srvdata.WasteVolumeDaily','srvdata.totalVol','srvdata.DailyVolume'],
        rangeDate:this.state.rangeDate
    })=>{
      data.typelist = ['ModInOut','srvdata.Pressure1','srvdata.WasteVolumeDaily','srvdata.totalVol','srvdata.DailyVolume']
      const deviceid = lodashget(this,'state.curdevice.syssettings.deviceid') || lodashget(this,'state.curdevice.deviceid');
      if(!!deviceid){
        console.log('Query:', {deviceid, data})
        this.props.dispatch(callthen(getdevicestat_request,getdevicestat_result,{
            deviceid,
            data:data
          })).then((result) => {
            //实时数据，对应this.state.homedata
            // this.setState({homedata:result.homedata});
            this.setState({isGetData: true})
            console.log('result:', result);
            const softResult = this.resultParse(result)
            console.log('soft result:', softResult)
            let chart = this.converData(softResult)
            this.setState({chart, result: softResult})
            console.log('Chart:', chart)
        }).catch((err) => {
          console.log(err);
        })
      }
    }

    resultParse = (result) => {
        let newResult = []
        lodashmap(result, (item) => {
            let id = this.idParse(item._id);
            let date = new Date(id).getTime();
            newResult.push({...item, _id: this.idParse(item._id), _date: date})
        })
        // 根据id判断是不是日报
        if(newResult[0]._id.length<10){
          return lodashsoftby(newResult, item => item._date)
        }else{
          return lodashsoftby(newResult, item => item._id)
        }
    }

    idParse = (id) => {
		try{		
			const idsz = id.split(' ');
			const yymmdd = idsz[0];
			const hour = idsz.length > 0 ? idsz[1]:'';
			const yymmddsz = yymmdd.split('-');
			const yy = yymmddsz.length > 0 ? yymmddsz[0]:'';
			const mm = yymmddsz.length > 1 ? yymmddsz[1]:'';
			const dd = yymmddsz.length > 2 ? yymmddsz[2]:'';
			const yy2 = yy.length > 1?yy:`0${yy}`;
			const mm2 = mm.length > 1?mm:`0${mm}`;
			const dd2 = dd.length > 1?dd:`0${dd}`;
            const hour2 = hour.length > 1?hour:`0${hour}`;
            // debugger;//2020-03-16T15:00:39.485Z
            const curmoment = moment(`${yy2}-${mm2}-${dd2}T${hour2}:00:00.000Z`);
			return curmoment.format('YYYY-MM-DD HH');//`${yy2}-${mm2}-${dd2} ${hour2}`
		}
		catch(e){
			console.log(e);
			return id;
		}
		
    }


    converData = (data, type = this.state.type) => {
        let chart = []
        lodashmap(type, (chartitem)=> {
            let x = []
            const title = this.props.intl.formatMessage({id:typeActionPer[chartitem].id});
            if(chartitem === 'ModInOut') {
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
                chart.push({
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
                    series[0].data.push(item[chartitem])
                })
                chart.push({
                    title,
                    x,
                    series
                })
            }
        })
        console.log('data:', data)
        console.log('type:', type)
        console.log('result:', chart)
        return chart
    }

    // converData = (data) => {
    //     let chart = []
    //     lodashmap(data, (dataitem)=> {
    //         let x = []
    //         const title = this.props.intl.formatMessage({id:typeActionPer[this.state.type].id});
    //         if(this.state.type === 'ModInOut') {
    //             let series = [{
    //                 title: 'mod in',
    //                 data: []
    //             },{
    //                 title: 'mod out',
    //                 data: []
    //             }]
    //             lodashmap(data, (item) => {
    //                 x.push(item._id);
    //                 series[0].data.push(item.modin)
    //                 series[1].data.push(item.modout)
    //             })
    //             chart.push({
    //                 title,
    //                 x,
    //                 series
    //             })
    //         } else {
    //             let series = [{
    //                 title,
    //                 data: []
    //             }]
    //             lodashmap(data, (item) => {
    //                 x.push(item._id);
    //                 series[0].data.push(item.value)
    //             })
    //             chart.push({
    //                 title,
    //                 x,
    //                 series
    //             })
    //         }
    //     })
    //     return chart
    // }


    onCycleChange = (e)=> {
        const cycle = e.target.value
        let rangeDate = []
        let Query = { cycle: this.state.cycle, rangeDate: this.state.rangeDate}
        if(cycle === 'hour') {
            rangeDate = [moment().subtract(1, 'days'), moment()]
            Query = { cycle, rangeDate}
        }
        if(cycle === 'day') {
            rangeDate = [moment().subtract(7, 'days'), moment()]
            Query = { cycle, rangeDate}
        }
        if(cycle === 'month') {
            rangeDate = [moment().subtract(1, 'months'), moment()]
            Query = { cycle: 'day', rangeDate}
        }
        if(cycle === 'year') {
            rangeDate = [moment().subtract(1, 'years'), moment()]
            Query = { cycle: 'month', rangeDate}
        }
        this.setState({cycle, rangeDate})
        this.onClickQuery(Query)
    }

    // onTypeChange = (e)=> {
    //     this.setState({
    //         type: e.target.value,
    //     })
    //     let { cycle, rangeDate } = this.state
    //     this.onClickQuery({cycle, type: e.target.value, rangeDate})
    // }

    onTypeChange = (values)=> {
        const chart = this.converData(this.state.result, values)
        this.setState({chart, type: values})
    }

    handleRangePick = (dates) => {
        this.setState({rangeDate: dates})
    }

    handleSearch = ()=> {
        let [ day1, day2 ] = [...this.state.rangeDate]
        if(!!day1&&!!day2) {
            const cycle = 'picker'
            let Query = { cycle: 'day', rangeDate: [...this.state.rangeDate]}
            if(day1.add(2, 'days').isAfter(day2)) {
                Query.cycle = 'hour'
                
            }
            day1.subtract(2, 'days')
            if(day1.add(1, 'years').isBefore(day2)) {
                Query.cycle = 'month'
            }
            day1.subtract(1, 'years')
            
            this.setState({cycle})
            this.onClickQuery(Query)
        }
        
    }

    // 图表数据
    getOption = (data)=> {
        const xdata = data.x;
        return ({
            animation:false,
            title: {
               text: `${data.title}${this.props.intl.formatMessage({id: 'machine.statistic'})}`,// title 数据统计类目
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
                data: xdata // xAxis[] 横轴数据，统计周期
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
                    name: `${data.series[0].title}`, // title 数据统计类目
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
                    data: data.series[0].data // yAxis[] 横轴数据，统计数据
                },
                {
                    name: `${!!data.series[1] && data.series[1].title}`, // title 数据统计类目
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
                    data: !!data.series[1] && data.series[1].data // yAxis[] 横轴数据，统计数据
                }
            ]
        })
    }


    render() {
        const { history,  } = this.props;
        const {curdevice} = this.state;
        const cycles = (
                _.map(cycleAction, (item, key)=>(
                    <Radio.Button key={key} value={item.action}>{item.name}</Radio.Button>
                ))
        )

        // const types = (
        //     _.map(typeAction, (item, key)=>(
        //         <Radio.Button key={key} value={item.action}>{item.name}</Radio.Button>
        //     ))
        // )
        


        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={18}>
                            <div className="left-title">
                                <div><img src={sb_icon} alt="" /></div>
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
                            {/* <Radio.Group value={this.state.type} buttonStyle="solid" onChange={this.onTypeChange}>
                                { types }
                            </Radio.Group> */}
                            <CheckboxGroup options={typeAction} value={this.state.type} onChange={this.onTypeChange} />
                        </Col>
                        <Col span={4}><Button type="primary" onClick={this.handleSearch}><FormattedMessage id="app.search" /></Button></Col>
                    </Row>
                    {this.state.isGetData ? lodashmap(this.state.chart, (item, index) => (
                        <Row key={index} gutter={24} style={{marginBottom: 30}}>
                            <Col span={24}>
                                <ReactEcharts option={this.getOption(item)} />
                            </Col>
                        </Row>
                    )) : '暂无数据'}
                    {/* <Row gutter={24} style={{marginBottom: 30}}>
                        <Col span={24}>
                            {this.state.isGetData ? <ReactEcharts option={this.getOption()} /> : '暂无数据'}
                        </Col>
                    </Row> */}
                </Card>
            </GridContent>
        )
    }
}
// const mapStateToProps =  ({device:{devices}},props) =>{
//   const curdevice = lodashget(devices,`${props.match.params.id}`,{});
//   console.log(curdevice)
//   return {curdevice};
// };
Statistics = connect()(Statistics);
export default withRouter(injectIntl(Statistics));
