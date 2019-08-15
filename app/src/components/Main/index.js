import React, { PureComponent } from 'react';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import HomeChart from '../HomeChart';
import monitorBg from '../../assets/zhuye_an.png';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import { injectIntl } from 'react-intl';
import Refresh from '../Controls/Refresh';
// import Waterwave from './waterwave.js';
import config from './config';
import './index.less';
import refresh_icon from '../../assets/refresh.png';
import '../../assets/wlimg.png';
import home_bgimg from '../../assets/zhuye_bg.png';
import {wifi_sendcmd_request, set_confirm} from '../../actions';
import {getFilterLabel} from '../EquipmentList/config.js';
import { mainconvertfromfilterlist, filterlistConvertToArray } from './filterconfig'
import {intl,getintlmessage} from '../../util/globalIntl';
const CRed = '#ff2728';
const CGreen = '#3eef7d';
const CBlue = '#38b4f2';

const getPercent = (id, value, full) => {
    let cf = config[id];
    let color = CGreen;
    let warring = false;
    let fullvalue = !!full ? full : cf.value;
    let percent = Math.round(value/fullvalue * 100);
    percent = percent >= 100 ? 100 : percent;
    if(percent >= cf.fullPercent){
        color = CBlue;
    } else if(percent <= cf.warringPercent){
        color = CRed;
        warring = true;
    }
    return {
        value,
        percent,
        color,
        warring
    }
}

class Home extends PureComponent{

    handleRefresh = ()=> {
        // refresh
        const cmd = `$data%`;
        const {dispatch} = this.props;
        dispatch(wifi_sendcmd_request({cmd,cmdstring:getintlmessage('constcmd.cmdstring.data')}));

        console.log('Refresh')
    }

    onClickCmd = (cmd,cmdstring='设置')=>{
      const { dispatch, intl } = this.props;
      dispatch(set_confirm({
        title: `${intl.formatMessage({id: 'form.confirm'})}`,
        message: `${cmdstring}?`,
        text: [`${intl.formatMessage({id: 'form.cancel'})}`, `${intl.formatMessage({id: 'form.ok'})}`],
        command: wifi_sendcmd_request({cmd,cmdstring})
      }))

      // dispatch(wifi_sendcmd_request({cmd,cmdstring}));
  }

    render () {
      const {intl,homedata,performancedata,isgetdata,devicelist, locale} = this.props;
      // const mapfilternames = mapname_filter;
      //注：这里根据devicelist 显示设备数据!!!!!!
      const devicedata = homedata;

      // const CoFlex_FEs = [];
      // lodashmap(devicedata.filterelements,(fename)=>{
      //
      // });
      const title_main_outwater_quality = intl.formatMessage({id: 'home.show.title_main_outwater_quality'},{value:lodashget(devicedata,'main_outwater_quality',300)});
      const title_main_inwater_quality = intl.formatMessage({id: 'home.show.title_main_inwater_quality'},{value:lodashget(devicedata,'main_inwater_quality',300)});
      const title_main_totalwatervol = intl.formatMessage({id: 'home.show.title_main_totalwatervol'},{value:locale === 'en' ? lodashget(devicedata,'main_totalwatervol',0) : Math.round(lodashget(devicedata,'main_totalwatervol',0)*3.785)});
      const title_main_runtime = intl.formatMessage({id: 'home.show.title_main_runtime'},{value:lodashget(devicedata,'main_runtime',0)});
      const title_main_outcwatervol = intl.formatMessage({id: 'home.show.title_main_outcwatervol'},{value:lodashget(performancedata,'waterpurificationrate',0)});

      const title_main_filterelements_modlife = intl.formatMessage({id: 'home.show.title_main_filterelements_modlife'});
      const title_main_filterelements_prefilter1 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter1'});
      const title_main_filterelements_prefilter2 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter2'});
      const title_main_filterelements_prefilter3 = intl.formatMessage({id: 'home.show.title_main_filterelements_prefilter3'});
      const title_main_filterelements_posfilter1 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter1'});
      const title_main_filterelements_posfilter2 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter2'});
      const title_main_filterelements_posfilter3 = intl.formatMessage({id: 'home.show.title_main_filterelements_posfilter3'});
      //----

      const modlife_leftday = getPercent('filterelements_modlife_leftday', lodashget(devicedata,'filterelements_modlife_leftday',0));
      const icon_filterelements_modlife_leftday = modlife_leftday.color;
      const title_filterelements_modlife_leftday = (modlife_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:modlife_leftday.value});
      const value_filterelements_modlife_leftday = modlife_leftday.percent;
      console.log(value_filterelements_modlife_leftday);

      const modlife_leftvol = getPercent('filterelements_modlife_leftvol', lodashget(devicedata,'filterelements_modlife_leftvol',0));
      const icon_filterelements_modlife_leftvol = modlife_leftvol.color;
      const title_filterelements_modlife_leftvol = (modlife_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:modlife_leftvol.percent});
      const value_filterelements_modlife_leftvol = modlife_leftvol.percent;
      console.log(value_filterelements_modlife_leftvol)

      //----
    //   let icon_filterelements_prefilter1_leftday = CGreen;
    //   const value_filterelements_prefilter1_leftday = lodashget(devicedata,'filterelements_prefilter1_leftday',0) ;
    //   let title_filterelements_prefilter1_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter1_leftday});
    //   if( value_filterelements_prefilter1_leftday < 10 ){
    //       title_filterelements_prefilter1_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter1_leftday = CRed;
    //   }
    const prefilter1_leftday = getPercent('filterelements_prefilter1_leftday', lodashget(devicedata,'filterelements_prefilter1_leftday',0), lodashget(devicelist[0], 'life', lodashget(devicedata,'filterelements_prefilter1_leftday',0)*100));
      const icon_filterelements_prefilter1_leftday = prefilter1_leftday.color;
      const title_filterelements_prefilter1_leftday = (prefilter1_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:prefilter1_leftday.value});
      const value_filterelements_prefilter1_leftday = prefilter1_leftday.percent;
      console.log(value_filterelements_prefilter1_leftday);

    //   let icon_filterelements_prefilter1_leftvol = CBlue;
    //   const value_filterelements_prefilter1_leftvol = lodashget(devicedata,'filterelements_prefilter1_leftvol',0) ;
    //   let title_filterelements_prefilter1_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter1_leftvol});
    //   if( value_filterelements_prefilter1_leftvol < 10 ){
    //       title_filterelements_prefilter1_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter1_leftvol = CRed;
    //   }
      const prefilter1_leftvol = getPercent('filterelements_prefilter1_leftvol', lodashget(devicedata,'filterelements_prefilter1_leftvol',0));
      const icon_filterelements_prefilter1_leftvol = prefilter1_leftvol.color;
      const title_filterelements_prefilter1_leftvol = (prefilter1_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:prefilter1_leftvol.percent});
      const value_filterelements_prefilter1_leftvol = prefilter1_leftvol.percent;
      console.log(value_filterelements_prefilter1_leftvol)
      //
    //   let icon_filterelements_prefilter2_leftday = CGreen;
    //   const value_filterelements_prefilter2_leftday = lodashget(devicedata,'filterelements_prefilter2_leftday',0) ;
    //   let title_filterelements_prefilter2_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter2_leftday});
    //   if( value_filterelements_prefilter2_leftday < 10 ){
    //       title_filterelements_prefilter2_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter2_leftday = CRed;
    //   }

    //   let icon_filterelements_prefilter2_leftvol = CBlue;
    //   const value_filterelements_prefilter2_leftvol = lodashget(devicedata,'filterelements_prefilter2_leftvol',0) ;
    //   let title_filterelements_prefilter2_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter2_leftvol});
    //   if( value_filterelements_prefilter2_leftvol < 10 ){
    //       title_filterelements_prefilter2_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter2_leftvol = CRed;
    //   }
      const prefilter2_leftday = getPercent('filterelements_prefilter2_leftday', lodashget(devicedata,'filterelements_prefilter2_leftday',0), lodashget(devicelist[1], 'life', lodashget(devicedata,'filterelements_prefilter2_leftday',0)*100));
      const icon_filterelements_prefilter2_leftday = prefilter2_leftday.color;
      const title_filterelements_prefilter2_leftday = (prefilter2_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:prefilter2_leftday.value});
      const value_filterelements_prefilter2_leftday = prefilter2_leftday.percent;
      console.log(value_filterelements_prefilter2_leftday);

      const prefilter2_leftvol = getPercent('filterelements_prefilter2_leftvol', lodashget(devicedata,'filterelements_prefilter2_leftvol',0));
      const icon_filterelements_prefilter2_leftvol = prefilter2_leftvol.color;
      const title_filterelements_prefilter2_leftvol = (prefilter2_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:prefilter2_leftvol.percent});
      const value_filterelements_prefilter2_leftvol = prefilter2_leftvol.percent;
      console.log(value_filterelements_prefilter2_leftvol)

      //
    //   let icon_filterelements_prefilter3_leftday = CGreen;
    //   const value_filterelements_prefilter3_leftday = lodashget(devicedata,'filterelements_prefilter3_leftday',0) ;
    //   let title_filterelements_prefilter3_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_prefilter3_leftday});
    //   if( value_filterelements_prefilter3_leftday < 10 ){
    //       title_filterelements_prefilter3_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter3_leftday = CRed;
    //   }

    //   let icon_filterelements_prefilter3_leftvol = CBlue;
    //   const value_filterelements_prefilter3_leftvol = lodashget(devicedata,'filterelements_prefilter3_leftvol',0) ;
    //   let title_filterelements_prefilter3_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_prefilter3_leftvol});
    //   if( value_filterelements_prefilter3_leftvol < 10 ){
    //       title_filterelements_prefilter3_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_prefilter3_leftvol = CRed;
    //   }
      const prefilter3_leftday = getPercent('filterelements_prefilter3_leftday', lodashget(devicedata,'filterelements_prefilter3_leftday',0), lodashget(devicelist[2], 'life', lodashget(devicedata,'filterelements_prefilter3_leftday',0)*100));
      const icon_filterelements_prefilter3_leftday = prefilter3_leftday.color;
      const title_filterelements_prefilter3_leftday = (prefilter3_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:prefilter3_leftday.value});
      const value_filterelements_prefilter3_leftday = prefilter3_leftday.percent;
      console.log(value_filterelements_prefilter3_leftday);

      const prefilter3_leftvol = getPercent('filterelements_prefilter3_leftvol', lodashget(devicedata,'filterelements_prefilter3_leftvol',0));
      const icon_filterelements_prefilter3_leftvol = prefilter3_leftvol.color;
      const title_filterelements_prefilter3_leftvol = (prefilter3_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:prefilter3_leftvol.percent});
      const value_filterelements_prefilter3_leftvol = prefilter3_leftvol.percent;
      console.log(title_filterelements_prefilter3_leftvol)
      console.log(value_filterelements_prefilter3_leftvol)

      //
    //   let icon_filterelements_posfilter1_leftday = CGreen;
    //   const value_filterelements_posfilter1_leftday = lodashget(devicedata,'filterelements_posfilter1_leftday',0) ;
    //   let title_filterelements_posfilter1_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter1_leftday});
    //   if( value_filterelements_posfilter1_leftday < 10 ){
    //       title_filterelements_posfilter1_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter1_leftday = CRed;
    //   }

    //   let icon_filterelements_posfilter1_leftvol = CBlue;
    //   const value_filterelements_posfilter1_leftvol = lodashget(devicedata,'filterelements_posfilter1_leftvol',0) ;
    //   let title_filterelements_posfilter1_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter1_leftvol});
    //   if( value_filterelements_posfilter1_leftvol < 10 ){
    //       title_filterelements_posfilter1_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter1_leftvol = CRed;
    //   }
      const posfilter1_leftday = getPercent('filterelements_posfilter1_leftday', lodashget(devicedata,'filterelements_posfilter1_leftday',0), lodashget(devicelist[3], 'life', lodashget(devicedata,'filterelements_posfilter1_leftday',0)*100));
      const icon_filterelements_posfilter1_leftday = posfilter1_leftday.color;
      const title_filterelements_posfilter1_leftday = (posfilter1_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:posfilter1_leftday.value});
      const value_filterelements_posfilter1_leftday = posfilter1_leftday.percent;
      console.log(value_filterelements_posfilter1_leftday);

      const posfilter1_leftvol = getPercent('filterelements_posfilter1_leftvol', lodashget(devicedata,'filterelements_posfilter1_leftvol',0));
      const icon_filterelements_posfilter1_leftvol = posfilter1_leftvol.color;
      const title_filterelements_posfilter1_leftvol = (posfilter1_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:posfilter1_leftvol.percent});
      const value_filterelements_posfilter1_leftvol = posfilter1_leftvol.percent;
      console.log(value_filterelements_posfilter1_leftvol)


      //
    //   let icon_filterelements_posfilter2_leftday = CGreen;
    //   const value_filterelements_posfilter2_leftday = lodashget(devicedata,'filterelements_posfilter2_leftday',0) ;
    //   let title_filterelements_posfilter2_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter2_leftday});
    //   if( value_filterelements_posfilter2_leftday < 10 ){
    //       title_filterelements_posfilter2_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter2_leftday = CRed;
    //   }

    //   let icon_filterelements_posfilter2_leftvol = CBlue;
    //   const value_filterelements_posfilter2_leftvol = lodashget(devicedata,'filterelements_posfilter2_leftvol',0) ;
    //   let title_filterelements_posfilter2_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter2_leftvol});
    //   if( value_filterelements_posfilter2_leftvol < 10 ){
    //       title_filterelements_posfilter2_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter2_leftvol = CRed;
    //   }

      const posfilter2_leftday = getPercent('filterelements_posfilter2_leftday', lodashget(devicedata,'filterelements_posfilter2_leftday',0), lodashget(devicelist[4], 'life', lodashget(devicedata,'filterelements_posfilter2_leftday',0)*100));
      const icon_filterelements_posfilter2_leftday = posfilter2_leftday.color;
      const title_filterelements_posfilter2_leftday = (posfilter2_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:posfilter2_leftday.value});
      const value_filterelements_posfilter2_leftday = posfilter2_leftday.percent;
      console.log(value_filterelements_posfilter2_leftday);

      const posfilter2_leftvol = getPercent('filterelements_posfilter2_leftvol', lodashget(devicedata,'filterelements_posfilter2_leftvol',0));
      const icon_filterelements_posfilter2_leftvol = posfilter2_leftvol.color;
      const title_filterelements_posfilter2_leftvol = (posfilter2_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:posfilter2_leftvol.percent});
      const value_filterelements_posfilter2_leftvol = posfilter2_leftvol.percent;
      console.log(value_filterelements_posfilter2_leftvol)

      //
    //   let icon_filterelements_posfilter3_leftday = CGreen;
    //   const value_filterelements_posfilter3_leftday = lodashget(devicedata,'filterelements_posfilter3_leftday',0) ;
    //   let title_filterelements_posfilter3_leftday = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:value_filterelements_posfilter3_leftday});
    //   if( value_filterelements_posfilter3_leftday < 10 ){
    //       title_filterelements_posfilter3_leftday = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter3_leftday = CRed;
    //   }

    //   let icon_filterelements_posfilter3_leftvol = CBlue;
    //   const value_filterelements_posfilter3_leftvol = lodashget(devicedata,'filterelements_posfilter3_leftvol',0) ;
    //   let title_filterelements_posfilter3_leftvol = intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:value_filterelements_posfilter3_leftvol});
    //   if( value_filterelements_posfilter3_leftvol < 10 ){
    //       title_filterelements_posfilter3_leftvol = intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'});
    //       icon_filterelements_posfilter3_leftvol = CRed;
    //   }
      const posfilter3_leftday = getPercent('filterelements_posfilter3_leftday', lodashget(devicedata,'filterelements_posfilter3_leftday',0), lodashget(devicelist[5], 'life', lodashget(devicedata,'filterelements_posfilter3_leftday',0)*100));
      const icon_filterelements_posfilter3_leftday = posfilter3_leftday.color;
      const title_filterelements_posfilter3_leftday = (posfilter3_leftday.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftday'},{value:posfilter3_leftday.value});
      const value_filterelements_posfilter3_leftday = posfilter3_leftday.percent;
      console.log(value_filterelements_posfilter3_leftday);

      const posfilter3_leftvol = getPercent('filterelements_posfilter3_leftvol', lodashget(devicedata,'filterelements_posfilter3_leftvol',0));
      const icon_filterelements_posfilter3_leftvol = posfilter3_leftvol.color;
      const title_filterelements_posfilter3_leftvol = (posfilter3_leftvol.warring ?
        intl.formatMessage({id:'home.show.title_main_filterelements_value_warningtochange'})
        : '') + intl.formatMessage({id: 'home.show.title_main_filterelements_value_leftvol'},{value:posfilter3_leftvol.percent});
      const value_filterelements_posfilter3_leftvol = posfilter3_leftvol.percent;
      console.log(value_filterelements_posfilter3_leftvol)

      const devicelist_prev = [];
      const devicelist_post = [];
      console.log('devicelist:', devicelist)
      lodashmap(devicelist,(dv)=>{
        if(dv.isprev){
          if(String(dv.life) !== '0'){
            devicelist_prev.push(dv);
          }

        }
        else{
          if(String(dv.life) !== '0'){
            devicelist_post.push(dv);
          }
        }
      });
      console.log('prev:', devicelist_prev)
      console.log('post:', devicelist_post)

        const getFilterCo = (idname,v)=>{
          const labelstring = getFilterLabel(intl,idname,v);
        if(idname === 'prev0'){
          return (<Flex.Item key={`${idname}`}>
                      <HomeChart title={labelstring}
                          firsttitle={title_filterelements_prefilter1_leftday} firstpercent={value_filterelements_prefilter1_leftday} firstcolor={icon_filterelements_prefilter1_leftday}
                          secondtitle={title_filterelements_prefilter1_leftvol} secondpercent={value_filterelements_prefilter1_leftvol} secondcolor={icon_filterelements_prefilter1_leftvol}
                    />
                </Flex.Item>);
        }
        if(idname === 'prev1'){
          return (<Flex.Item key={`${idname}`}>
                  <HomeChart title={labelstring}
                  firsttitle={title_filterelements_prefilter2_leftday} firstpercent={value_filterelements_prefilter2_leftday} firstcolor={icon_filterelements_prefilter2_leftday}
                  secondtitle={title_filterelements_prefilter2_leftvol} secondpercent={value_filterelements_prefilter2_leftvol} secondcolor={icon_filterelements_prefilter2_leftvol}
            />

            </Flex.Item>);
        }
        if(idname === 'prev2'){
          return (<Flex.Item key={`${idname}`}>
                <HomeChart title={labelstring}
                firsttitle={title_filterelements_prefilter3_leftday} firstpercent={value_filterelements_prefilter3_leftday} firstcolor={icon_filterelements_prefilter3_leftday}
                secondtitle={title_filterelements_prefilter3_leftvol} secondpercent={value_filterelements_prefilter3_leftvol} secondcolor={icon_filterelements_prefilter3_leftvol}
              />
          </Flex.Item>);
        }

        if(idname === 'post0'){
          return (<Flex.Item key={`${idname}`}>
                <HomeChart title={labelstring}
                firsttitle={title_filterelements_posfilter1_leftday} firstpercent={value_filterelements_posfilter1_leftday} firstcolor={icon_filterelements_posfilter1_leftday}
                secondtitle={title_filterelements_posfilter1_leftvol} secondpercent={value_filterelements_posfilter1_leftvol} secondcolor={icon_filterelements_posfilter1_leftvol}
            />
          </Flex.Item>)
        }

        if(idname === 'post1'){
          return (<Flex.Item key={`${idname}`}>
                <HomeChart title={labelstring}
                firsttitle={title_filterelements_posfilter2_leftday} firstpercent={value_filterelements_posfilter2_leftday} firstcolor={icon_filterelements_posfilter2_leftday}
                secondtitle={title_filterelements_posfilter2_leftvol} secondpercent={value_filterelements_posfilter2_leftvol} secondcolor={icon_filterelements_posfilter2_leftvol}
              />

          </Flex.Item>)
        }

        if(idname === 'post2'){
          return (
                <Flex.Item key={`${idname}`}>
                      <HomeChart title={labelstring}
                      firsttitle={title_filterelements_posfilter3_leftday} firstpercent={value_filterelements_posfilter3_leftday} firstcolor={icon_filterelements_posfilter3_leftday}
                      secondtitle={title_filterelements_posfilter3_leftvol} secondpercent={value_filterelements_posfilter3_leftvol} secondcolor={icon_filterelements_posfilter3_leftvol}
                      />
                </Flex.Item>)
        }
      }

      let showco = [];
      if(devicelist_prev.length === 3){
        showco.push(<Flex key="listprev0">
            {getFilterCo(devicelist_prev[0].idname,devicelist_prev[0].life)}
            {getFilterCo(devicelist_prev[1].idname,devicelist_prev[1].life)}
          </Flex>);
        showco.push(<WhiteSpace key="listprev1" style={{height: '2px', margin: '5px auto'}} />);
          showco.push(<Flex key="listprev2">{getFilterCo(devicelist_prev[2].idname,devicelist_prev[2].life)}
          <Flex.Item></Flex.Item>
          </Flex>);
      }
      else if(devicelist_prev.length === 2){
        showco.push(
          <Flex key="listprev0">
            {getFilterCo(devicelist_prev[0].idname,devicelist_prev[0].life)}
            {getFilterCo(devicelist_prev[1].idname,devicelist_prev[1].life)}
          </Flex>);
      }
      else if(devicelist_prev.length === 1){
        showco.push(
          <Flex key="listprev0">
            {getFilterCo(devicelist_prev[0].idname,devicelist_prev[0].life)}
          <Flex.Item></Flex.Item>
          </Flex>);
      }
      showco.push(<WhiteSpace   key="listprevpostsep" style={{height: '2px', backgroundColor: '#333', margin: '15px auto'}} />);
      if(devicelist_post.length === 3){
        showco.push(<Flex  key="listpost0">
            {getFilterCo(devicelist_post[0].idname,devicelist_post[0].life)}
            {getFilterCo(devicelist_post[1].idname,devicelist_post[1].life)}
          </Flex>);
        showco.push(<WhiteSpace key="listpost1" style={{height: '2px', margin: '5px auto'}} />);
          showco.push(<Flex key="listpost2">{getFilterCo(devicelist_post[2].idname,devicelist_post[2].life)}
          <Flex.Item></Flex.Item>
          </Flex>);
      }
      else if(devicelist_post.length === 2){
        showco.push(
          <Flex  key="listpost0">
            {getFilterCo(devicelist_post[0].idname,devicelist_post[0].life)}
            {getFilterCo(devicelist_post[1].idname,devicelist_post[1].life)}
          </Flex>);
      }
      else if(devicelist_post.length === 1){
        showco.push(
          <Flex  key="listpost0">
            {getFilterCo(devicelist_post[0].idname,devicelist_post[0].life)}
          <Flex.Item></Flex.Item>
          </Flex>);
      }
      showco.push(<WhiteSpace key="listlast" style={{height:10}} />);


        if(!isgetdata){
          //未获取到数据，需要加个大按钮
          return (
            <Refresh handleRefresh={this.handleRefresh} />
          )
        }
        const textgrade0 = intl.formatMessage({id:'constsaga.msg.textgrade0'});
        const textgrade1 = intl.formatMessage({id:'constsaga.msg.textgrade1'});
        const textgrade2 = intl.formatMessage({id:'constsaga.msg.textgrade2'});

        let textgrade = textgrade0;
        const main_outwater_grade = lodashget(devicedata,'homedata.main_outwater_grade','优');
        if(!!main_outwater_grade){
          //问题2  0:优  1:好  2:一般
          if(main_outwater_grade === '0'){
            textgrade = textgrade0;
          }
          if(main_outwater_grade === '1'){
            textgrade = textgrade1;
          }
          if(main_outwater_grade === '2'){
            textgrade = textgrade2;
          }
        }
        return (
            <React.Fragment>
                <div className="home_bg" style={{backgroundImage: `url(${home_bgimg})`}}></div>
                    <WingBlank style={{marginTop: "-140px", display: "flex", justifyContent: 'center'}}>
                        <div className="zhuyean" style={{backgroundImage: `url(${monitorBg})`}}>
                            {/* <img src={monitorBg} alt="" style={{width: '100%', display: 'block'}} /> */}
                            {/* <Waterwave style={{width: '100%', display: 'block'}} />*/}
                            <div className="monitor">
                                <h1 style={{fontSize: `${locale === 'en' ? '20px' : '30px'}`}}>{textgrade}</h1>
                                <p style={{fontSize: `${locale === 'en' ? '12px' : '14px'}`}}>{title_main_outwater_quality}</p>
                            </div>
                        </div>
                        <img src={refresh_icon} alt=""
                            style={{width: '20px', height: '20px', marginTop: '20px'}}
                            onClick={this.handleRefresh}
                        />
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
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace style={{height: '2px', backgroundColor: '#333', margin: '15px auto'}} />
                            {showco}
                        </div>
                    </Flex>

            </React.Fragment>
        )
    }
}
const mapStateToProps =  ({devicedata:{isgetdata,homedata,performancedata},device:{devicelist}, devicedata:{ filterlist }, app: { locale }}) =>{
  const { prev0lastchangedate, prev1lastchangedate, prev2lastchangedate, post0lastchangedate, post1lastchangedate, post2lastchangedate } = devicelist
  const initData = mainconvertfromfilterlist(filterlist)
  initData['prev0'] = {...initData['prev0'], lastchangedate: prev0lastchangedate }
  initData['prev1'] = {...initData['prev1'], lastchangedate: prev1lastchangedate }
  initData['prev2'] = {...initData['prev2'], lastchangedate: prev2lastchangedate }
  initData['post0'] = {...initData['post0'], lastchangedate: post0lastchangedate }
  initData['post1'] = {...initData['post1'], lastchangedate: post1lastchangedate }
  // initData['post2'] = {...initData['post2'], lastchangedate: post2lastchangedate, life: [lodashget(devicelist, 'filterlist[5].life', 180)] }
  const filter_list = filterlistConvertToArray(initData)
  return {isgetdata,homedata,performancedata,devicelist:filter_list, locale};
};
Home = connect(mapStateToProps)(Home);
export default injectIntl(Home);
