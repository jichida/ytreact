import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import lodashmap from 'lodash.map';
import { FormattedMessage } from 'react-intl';
// import lodashget from 'lodash.get';
import { injectIntl } from 'react-intl';
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
        // let items=[];
        // let sub = [];
        // let i=0;
        // while(i<arr.length-1)
        // {
        //     for(let j=0;j<3;j++)
        //     {
        //         if(i<=arr.length-1)
        //         {
        //             sub.push(<Flex.Item key={arr[i].text} className="item-container"><div className={style}><span>{arr[i].text}</span></div></Flex.Item>)
        //         }
        //         i++;
        //     }
        //     items.push(<Flex key={i}>{sub}</Flex>);
        //     sub = [];

        // }

        // return items;
        console.log(arr);
        return (
            lodashmap(arr, (item)=>{
                return (
                <Flex.Item key={item.text} className="item-container"><div className={style}><span>{item.text}</span></div></Flex.Item>
                )
            })
        )
    }

    geterrtext = (k)=>{
      const {intl} = this.props;
      return intl.formatMessage({id:`home.show.err.${k}`});
    }

    render () {
      const {errordata} = this.props;
      // const mapname = mapname_err;
      const errflag = errordata;
      const abnormal = [];
      const normal = [];
      lodashmap(errflag,(v,k)=>{
        const text = this.geterrtext(k);
        if(!!text){
          if(v === 1){
            //有故障
            abnormal.push({text});
          }
          else if(v === 0){
            normal.push({text});
          }
        }

      })
        return (
                    <div className="panel">
                        <div className="abnormal">
                            <Flex direction="column">
                                    <Flex wrap="wrap">
                                    {this.renderList(abnormal, 'red-circle')}
                                    </Flex>
                                <p className="normal_title"><FormattedMessage id="status.normal" /></p>
                                <div style={{width: "100%"}}>
                                    <Flex wrap="wrap">
                                    {this.renderList(normal, 'green-circle')}
                                    </Flex>
                                </div>
                            </Flex>
                        </div>
                    </div>
        )
    }
}

const mapStateToProps =  ({devicedata:{errordata}}) =>{
  return {errordata};
};
Abnormal = connect(mapStateToProps)(Abnormal);
export default injectIntl(Abnormal);
