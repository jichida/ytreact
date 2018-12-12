import React, { PureComponent } from 'react';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import HomeChart from '../HomeChart';
import monitorBg from '../../assets/zhuye_an.png';
// import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import { injectIntl } from 'react-intl';
import Waterwave from './waterwave.js';
import './index.less';
import '../../assets/wlimg.png';
import home_bgimg from '../../assets/zhuye_bg.png';

const CRed = '#ff2728';
const CGreen = '#3eef7d';
const CBlue = '#38b4f2';

class Home extends PureComponent{

    render () {
      const {intl} = this.props;
      // const mapfilternames = mapname_filter;

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
        filterelements:[
          'filterelements_modlife',
          'filterelements_prefilter1',
          'filterelements_prefilter2',
          'filterelements_prefilter3',
          'filterelements_posfilter1',
          'filterelements_posfilter2',
          'filterelements_posfilter3',
        ],//滤芯的顺序
      };

      // const CoFlex_FEs = [];
      // lodashmap(devicedata.filterelements,(fename)=>{
      //
      // });
      const title_main_outwater_quality = intl.formatMessage({id: 'home.show.title_main_outwater_quality'},{value:lodashget(devicedata,'main_outwater_quality',300)});
      const title_main_inwater_quality = intl.formatMessage({id: 'home.show.title_main_inwater_quality'},{value:lodashget(devicedata,'main_inwater_quality',300)});
      const title_main_totalwatervol = intl.formatMessage({id: 'home.show.title_main_totalwatervol'},{value:lodashget(devicedata,'main_totalwatervol',0)});
      const title_main_runtime = intl.formatMessage({id: 'home.show.title_main_runtime'},{value:lodashget(devicedata,'main_runtime',0)});
      const title_main_outcwatervol = intl.formatMessage({id: 'home.show.title_main_outcwatervol'},{value:lodashget(devicedata,'main_outcwatervol',0)});

      const title_main_filterelements_modlife = intl.formatMessage({id: 'home.show.title_main_filterelements_modlife'});
      const title_main_filterelements_prefilter1 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter1'});
      const title_main_filterelements_prefilter2 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter2'});
      const title_main_filterelements_prefilter3 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter3'});
      const title_main_filterelements_posfilter1 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter1'});
      const title_main_filterelements_posfilter2 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter2'});
      const title_main_filterelements_posfilter3 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter3'});
      //----
      let icon_filterelements_modlife_leftday = CGreen;
      const value_filterelements_modlife_leftday = lodashget(devicedata,'filterelements_modlife_leftday',0) ;
      let title_filterelements_modlife_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_modlife_leftday});
      if( value_filterelements_modlife_leftday < 10 ){
          title_filterelements_modlife_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_modlife_leftday = CRed;
      }

      let icon_filterelements_modlife_leftvol = CBlue;
      const value_filterelements_modlife_leftvol = lodashget(devicedata,'filterelements_modlife_leftvol',0) ;
      let title_filterelements_modlife_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_modlife_leftvol});
      if( value_filterelements_modlife_leftvol < 10 ){
          title_filterelements_modlife_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_modlife_leftvol = CRed;
      }
      //----
      let icon_filterelements_prefilter1_leftday = CGreen;
      const value_filterelements_prefilter1_leftday = lodashget(devicedata,'filterelements_prefilter1_leftday',0) ;
      let title_filterelements_prefilter1_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter1_leftday});
      if( value_filterelements_prefilter1_leftday < 10 ){
          title_filterelements_prefilter1_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter1_leftday = CRed;
      }

      let icon_filterelements_prefilter1_leftvol = CBlue;
      const value_filterelements_prefilter1_leftvol = lodashget(devicedata,'filterelements_prefilter1_leftvol',0) ;
      let title_filterelements_prefilter1_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter1_leftvol});
      if( value_filterelements_prefilter1_leftvol < 10 ){
          title_filterelements_prefilter1_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter1_leftvol = CRed;
      }
      //
      let icon_filterelements_prefilter2_leftday = CGreen;
      const value_filterelements_prefilter2_leftday = lodashget(devicedata,'filterelements_prefilter2_leftday',0) ;
      let title_filterelements_prefilter2_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter2_leftday});
      if( value_filterelements_prefilter2_leftday < 10 ){
          title_filterelements_prefilter2_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter2_leftday = CRed;
      }

      let icon_filterelements_prefilter2_leftvol = CBlue;
      const value_filterelements_prefilter2_leftvol = lodashget(devicedata,'filterelements_prefilter2_leftvol',0) ;
      let title_filterelements_prefilter2_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter2_leftvol});
      if( value_filterelements_prefilter2_leftvol < 10 ){
          title_filterelements_prefilter2_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter2_leftvol = CRed;
      }

      //
      let icon_filterelements_prefilter3_leftday = CGreen;
      const value_filterelements_prefilter3_leftday = lodashget(devicedata,'filterelements_prefilter3_leftday',0) ;
      let title_filterelements_prefilter3_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter3_leftday});
      if( value_filterelements_prefilter3_leftday < 10 ){
          title_filterelements_prefilter3_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter3_leftday = CRed;
      }

      let icon_filterelements_prefilter3_leftvol = CBlue;
      const value_filterelements_prefilter3_leftvol = lodashget(devicedata,'filterelements_prefilter3_leftvol',0) ;
      let title_filterelements_prefilter3_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter3_leftvol});
      if( value_filterelements_prefilter3_leftvol < 10 ){
          title_filterelements_prefilter3_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_prefilter3_leftvol = CRed;
      }

      //
      let icon_filterelements_posfilter1_leftday = CGreen;
      const value_filterelements_posfilter1_leftday = lodashget(devicedata,'filterelements_posfilter1_leftday',0) ;
      let title_filterelements_posfilter1_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter1_leftday});
      if( value_filterelements_posfilter1_leftday < 10 ){
          title_filterelements_posfilter1_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter1_leftday = CRed;
      }

      let icon_filterelements_posfilter1_leftvol = CBlue;
      const value_filterelements_posfilter1_leftvol = lodashget(devicedata,'filterelements_posfilter1_leftvol',0) ;
      let title_filterelements_posfilter1_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter1_leftvol});
      if( value_filterelements_posfilter1_leftvol < 10 ){
          title_filterelements_posfilter1_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter1_leftvol = CRed;
      }


      //
      let icon_filterelements_posfilter2_leftday = CGreen;
      const value_filterelements_posfilter2_leftday = lodashget(devicedata,'filterelements_posfilter2_leftday',0) ;
      let title_filterelements_posfilter2_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter2_leftday});
      if( value_filterelements_posfilter2_leftday < 10 ){
          title_filterelements_posfilter2_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter2_leftday = CRed;
      }

      let icon_filterelements_posfilter2_leftvol = CBlue;
      const value_filterelements_posfilter2_leftvol = lodashget(devicedata,'filterelements_posfilter2_leftvol',0) ;
      let title_filterelements_posfilter2_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter2_leftvol});
      if( value_filterelements_posfilter2_leftvol < 10 ){
          title_filterelements_posfilter2_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter2_leftvol = CRed;
      }

      //
      let icon_filterelements_posfilter3_leftday = CGreen;
      const value_filterelements_posfilter3_leftday = lodashget(devicedata,'filterelements_posfilter3_leftday',0) ;
      let title_filterelements_posfilter3_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter3_leftday});
      if( value_filterelements_posfilter3_leftday < 10 ){
          title_filterelements_posfilter3_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter3_leftday = CRed;
      }

      let icon_filterelements_posfilter3_leftvol = CBlue;
      const value_filterelements_posfilter3_leftvol = lodashget(devicedata,'filterelements_posfilter3_leftvol',0) ;
      let title_filterelements_posfilter3_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter3_leftvol});
      if( value_filterelements_posfilter3_leftvol < 10 ){
          title_filterelements_posfilter3_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
          icon_filterelements_posfilter3_leftvol = CRed;
      }

        return (
            <React.Fragment>
                <div className="home_bg" style={{backgroundImage: `url(${home_bgimg})`}}></div>
                    <WingBlank style={{marginTop: "-140px", display: "flex", justifyContent: 'center'}}>
                        <div className="zhuyean">
                            <img src={monitorBg} alt="" style={{width: '100%', display: 'block'}} />
                            {/* <Waterwave style={{width: '100%', display: 'block'}} />*/}
                            <div className="monitor">
                                <h1>{lodashget(devicedata,'main_outwater_grade','优')}</h1>
                                <p>{title_main_outwater_quality}</p>
                            </div>
                        </div>
                    </WingBlank>
                    <Flex direction="column" className="monitor_container">
                        <div className="detail">
                                <Flex>
                                    <Flex.Item>{title_main_inwater_quality}</Flex.Item>
                                    <Flex.Item>{title_main_totalwatervol}</Flex.Item>
                                </Flex>
                                <WhiteSpace size="lg" style={{height: 30}} />
                                <Flex>
                                    <Flex.Item>{title_main_runtime}</Flex.Item>
                                    <Flex.Item>{title_main_outcwatervol}</Flex.Item>
                                </Flex>
                        </div>
                        <WhiteSpace size="lg" style={{height: 50}} />
                        <div className="chart">
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_modlife}
                                        firsttitle={title_filterelements_modlife_leftday} firstpercent={value_filterelements_modlife_leftday} firstcolor={icon_filterelements_modlife_leftday}
                                        secondtitle={title_filterelements_modlife_leftvol} secondpercent={value_filterelements_modlife_leftvol} secondcolor={icon_filterelements_modlife_leftvol}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_prefilter1}
                                      firsttitle={title_filterelements_prefilter1_leftday} firstpercent={value_filterelements_prefilter1_leftday} firstcolor={icon_filterelements_prefilter1_leftday}
                                      secondtitle={title_filterelements_prefilter1_leftvol} secondpercent={value_filterelements_prefilter1_leftvol} secondcolor={icon_filterelements_prefilter1_leftvol}
                                    />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_prefilter2}
                                      firsttitle={title_filterelements_prefilter2_leftday} firstpercent={value_filterelements_prefilter2_leftday} firstcolor={icon_filterelements_prefilter2_leftday}
                                      secondtitle={title_filterelements_prefilter2_leftvol} secondpercent={value_filterelements_prefilter2_leftvol} secondcolor={icon_filterelements_prefilter2_leftvol}
                          />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_prefilter3}
                                      firsttitle={title_filterelements_prefilter3_leftday} firstpercent={value_filterelements_prefilter3_leftday} firstcolor={icon_filterelements_prefilter3_leftday}
                                      secondtitle={title_filterelements_prefilter3_leftvol} secondpercent={value_filterelements_prefilter3_leftvol} secondcolor={icon_filterelements_prefilter3_leftvol}
                                        />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_posfilter1}
                                      firsttitle={title_filterelements_posfilter1_leftday} firstpercent={value_filterelements_posfilter1_leftday} firstcolor={icon_filterelements_posfilter1_leftday}
                                      secondtitle={title_filterelements_posfilter1_leftvol} secondpercent={value_filterelements_posfilter1_leftvol} secondcolor={icon_filterelements_posfilter1_leftvol}
                                  />
                                </Flex.Item>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_posfilter2}
                                      firsttitle={title_filterelements_posfilter2_leftday} firstpercent={value_filterelements_posfilter2_leftday} firstcolor={icon_filterelements_posfilter2_leftday}
                                      secondtitle={title_filterelements_posfilter2_leftvol} secondpercent={value_filterelements_posfilter2_leftvol} secondcolor={icon_filterelements_posfilter2_leftvol}
                                  />
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace />
                            <Flex>
                                <Flex.Item>
                                    <HomeChart title={title_main_filterelements_posfilter3}
                                      firsttitle={title_filterelements_posfilter3_leftday} firstpercent={value_filterelements_posfilter3_leftday} firstcolor={icon_filterelements_posfilter3_leftday}
                                      secondtitle={title_filterelements_posfilter3_leftvol} secondpercent={value_filterelements_posfilter3_leftvol} secondcolor={icon_filterelements_posfilter3_leftvol}
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
const mapStateToProps =  ({app:{mapname_filter}}) =>{
  return {mapname_filter};
};
Home = connect(mapStateToProps)(Home);
export default injectIntl(Home);