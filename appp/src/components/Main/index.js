import React, { PureComponent } from 'react';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';

import HomeChart from '../HomeChart';
import monitorBg from '../../assets/zhuye_an.png';


import './index.less';
import '../../assets/wlimg.png';
 
const CRed = '#ff2728';
const CGreen = '#3eef7d';
const CBlue = '#38b4f2';

class Home extends PureComponent{

    render () {
        return (
            <React.Fragment>
                <div className="home_bg"></div>
                <WingBlank style={{marginTop: "-140px"}}>
                    <Flex direction="column" className="monitor_container">
                        <div className="zhuyean">
                            <img src={monitorBg} alt="" style={{width: '100%', display: 'block'}} />
                            <div className="monitor">
                                <h1>优</h1>
                                <p>出水水质 TDS 100</p>
                            </div>
                        </div>
                        <div className="detail">
                            <WingBlank>
                            <Flex>
                                <Flex.Item>进水水质 900 ppm</Flex.Item>
                                <Flex.Item>总产水量 900 gal</Flex.Item>
                            </Flex>
                            <WhiteSpace size="lg" />
                            <Flex>
                                <Flex.Item>运行时间 20 天</Flex.Item>
                                <Flex.Item>浓水出水量 600 gal</Flex.Item>
                            </Flex>
                            </WingBlank>
                        </div>
                        <WhiteSpace size="lg" />
                        <div className="chart">
                            <WingBlank>
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
                            <WhiteSpace style={{height:50}} />
                            </WingBlank>
                        </div>
                    </Flex>
                </WingBlank>
            </React.Fragment>
        )
    }
}

export default Home;