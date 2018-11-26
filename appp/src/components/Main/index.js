import React, { PureComponent } from 'react';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';

import HomeChart from '../HomeChart';
import monitorBg from '../../assets/zhuye_an.png';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import './index.less';
import '../../assets/wlimg.png';

const CRed = '#ff2728';
const CGreen = '#3eef7d';
const CBlue = '#38b4f2';

class Home extends PureComponent{

    render () {
      const mapfilternames = {
        filterelements_modlife:'电离子膜',
        filterelements_prefilter1:'前置PP',
        filterelements_prefilter2:'前置2滤芯',
        filterelements_prefilter3:'前置3滤芯',
        filterelements_posfilter1:'后置活性炭滤芯',
        filterelements_posfilter2:'后置2滤芯',
        filterelements_posfilter3:'后置3滤芯',
      };
      const devicedata = {
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
        filterelements_prefilter3_leftvol:50,//前置3滤芯寿命剩余流量
        filterelements_posfilter1_leftvol:70,//后置活性炭寿命剩余流量
        filterelements_posfilter2_leftvol:90,//电离子膜寿命剩余流量
        filterelements_posfilter3_leftvol:100,//电离子膜寿命剩余流量
        filterelements_modlife_leftday:20,//电离子膜寿命剩余天数
        filterelements_prefilter1_leftday:10,//前置PP寿命剩余天数
        filterelements_prefilter2_leftday:24,//前置2寿命剩余天数
        filterelements_prefilter3_leftday:41,//前置3寿命剩余天数
        filterelements_posfilter1_leftday:65,//后置活性炭寿命剩余天数
        filterelements_posfilter2_leftday:23,//后置2滤芯寿命剩余天数
        filterelements_posfilter3_leftday:46,//后置2滤芯寿命剩余天数
        filterelements:[
          'filterelements_modlife',
          'filterelements_prefilter1',
          'filterelements_prefilter2',
          'filterelements_prefilter3',
          'filterelements_prefilter4',
          'filterelements_prefilter5',
          'filterelements_prefilter6',
        ],//滤芯的顺序
      };

      const CoFlex_FEs = [];
      lodashmap(devicedata.filterelements,(fename)=>{

      });

        return (
            <React.Fragment>
                <div className="home_bg"></div>
                    <WingBlank style={{marginTop: "-140px", display: "flex", justifyContent: 'center'}}>
                        <div className="zhuyean">
                            <img src={monitorBg} alt="" style={{width: '100%', display: 'block'}} />
                            <div className="monitor">
                                <h1>{lodashget(devicedata,'main_outwater_grade','优')}</h1>
                                <p>出水水质 TDS {lodashget(devicedata,'main_outwater_quality',300)}</p>
                            </div>
                        </div>
                    </WingBlank>
                    <Flex direction="column" className="monitor_container">
                        <div className="detail">
                                <Flex>
                                    <Flex.Item>进水水质 {lodashget(devicedata,'main_inwater_quality',0)} ppm</Flex.Item>
                                    <Flex.Item>总产水量 {lodashget(devicedata,'main_totalwatervol',0)} gal</Flex.Item>
                                </Flex>
                                <WhiteSpace size="lg" style={{height: 30}} />
                                <Flex>
                                    <Flex.Item>运行时间 {lodashget(devicedata,'main_runtime',0)} 天</Flex.Item>
                                    <Flex.Item>浓水出水量 {lodashget(devicedata,'main_outcwatervol',0)} gal</Flex.Item>
                                </Flex>
                        </div>
                        <WhiteSpace size="lg" style={{height: 50}} />
                        <div className="chart">
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title="电离子膜寿命"
                                        firsttitle={"请更换滤芯"} firstpercent={40} firstcolor={CRed}
                                        secondtitle={"请更换滤芯"} secondpercent={40} secondcolor={CRed}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title="前置PP寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title="前置2滤芯寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title="前置3滤芯寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title="后置活性炭滤芯寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title="后置2滤芯寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title="后置3滤芯寿命"
                                        firsttitle={"剩余20天"} firstpercent={20} firstcolor={CGreen}
                                        secondtitle={"剩余流量58%"} secondpercent={58} secondcolor={CBlue}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace style={{height:10}} />
                        </div>
                    </Flex>

            </React.Fragment>
        )
    }
}

export default Home;
