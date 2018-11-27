import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import lodashmap from 'lodash.map';
import { FormattedMessage } from 'react-intl';
// import lodashget from 'lodash.get';

import './index.less';

//
// const abnormal = [
//     {
//         text: '零件故障',
//     },
//     {
//         text: '泵',
//     },
//     {
//         text: '程序',
//     },
//     {
//         text: '流量',
//     },
//     {
//         text: '漏水',
//     },
//     {
//         text: '出水传感器',
//     },
//     {
//         text: 'Mod out',
//     },
//     {
//         text: '时钟',
//     },
//     {
//         text: '压力传感器',
//     },
// ];
//
// const normal = [
//     {
//         text: '零件故障',
//     },
//     {
//         text: '泵',
//     },
//     {
//         text: '程序',
//     },
// ];

class Abnormal extends PureComponent{

    renderList = (arr, style)=>{
        let items=[];
        let sub = [];
        let i=0;
        while(i<arr.length-1)
        {
            for(let j=0;j<3;j++)
            {
                if(i<=arr.length-1)
                {
                    sub.push(<Flex.Item key={arr[i].text} className="item-container"><div className={style}><span>{arr[i].text}</span></div></Flex.Item>)
                }
                i++;
            }
            items.push(<Flex key={i}>{sub}</Flex>);
            sub = [];

        }
        return items;
    }


    render () {
      const {mapname_err} = this.props;
      const mapname = mapname_err;
      const errflag = {
        error_partsfailure:1,//零件故障
        error_pumpfailure:1,//20	泵故障	ERROR2:0 无故障 1有故障
        error_programfailure:1,//21	程序故障	ERROR3:0 无故障 1有故障
        error_flowfailure:1,//22	流量故障	ERROR4:0 无故障 1有故障
        error_leakagefault:1,//23	漏水故障	ERROR5:0 无故障 1有故障
        error_edicurrent:1,//24	EDI电流	ERROR6:0 无故障 1有故障
        error_modout:1,//25	MODOUT  膜的去除效率	ERROR7:0 无故障 1有故障
        error_intakesensorfault:1,//26	进水传感器故障	ERROR8 :0 无故障 1有故障
        error_outflowsensorfault:1,//27	出水传感器故障	ERROR9:0 无故障 1有故障
        error_cwatersensorfault:1,//28	浓水传感器故障	ERROR10 :0 无故障 1有故障
        error_wastewatersensorfault:1,//29	废水传感器故障	ERROR11:0 无故障 1有故障
        error_outflowflowmeterfailure:1,//30	出水流量计故障	ERROR12:0 无故障 1有故障
        error_wastewaterflowmeterfailure:1,//31	废水流量计故障	ERROR13:0 无故障 1有故障
        error_clockfailure:1,//32	时钟故障	ERROR14:0 无故障 1有故障
        error_pressuresensor1failure:0,//33	压力1传感器故障	ERROR15:0 无故障 1有故障
        error_pressuresensor2failure:0,//34	压力2传感器故障	ERROR16:0 无故障 1有故障
        error_pressuresensor3failure:0,//35	压力3传感器故障	ERROR17:0 无故障 1有故障
        error_pressuresensor4failure:0,//36	压力4传感器故障	ERROR18:0 无故障 1有故障
      };
      const abnormal = [];
      const normal = [];
      lodashmap(errflag,(v,k)=>{
        if(!!mapname[k]){
          if(v === 1){
            //有故障
            abnormal.push({text:mapname[k]});
          }
          else if(v === 0){
            normal.push({text:mapname[k]});
          }
        }

      })
        return (
            <div className="fh_container">
                <div className="fp_container">
                    <div className="panel">
                        <div className="abnormal">
                            <Flex direction="column">
                                <div style={{width: "100%"}}>
                                    {this.renderList(abnormal, 'red-circle')}
                                </div>
                                <p className="normal_title"><FormattedMessage id="status.normal" /></p>
                                <div style={{width: "100%"}}>
                                    {this.renderList(normal, 'green-circle')}
                                </div>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({app:{mapname_err}}) =>{
  return {mapname_err};
};
Abnormal = connect(mapStateToProps)(Abnormal);
export default Abnormal;
