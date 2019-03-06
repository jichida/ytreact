import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import lodashmap from 'lodash.map';
import { FormattedMessage } from 'react-intl';
// import lodashget from 'lodash.get';
import { injectIntl } from 'react-intl';
import Refresh from '../Controls/Refresh';
import './index.less';
import {wifi_sendcmd_request} from '../../actions';


class Abnormal extends PureComponent{

    renderList = (arr, style)=>{

        console.log(arr);
        let list = [];
        lodashmap(arr, (item)=>{
            list.push(
                <Flex.Item key={item.text} className="item-container"><div className={style}><span>{item.text}</span></div></Flex.Item>
            )
        })
        list = this.completionList(list);
        return list;
    }


    geterrtext = (k)=>{
      const {intl} = this.props;
      const txt = `home.show.err.${k}`;
      console.log(txt);
      const rettxt = intl.formatMessage({id:txt});
      console.log(rettxt);
      return rettxt;
    }

    completionList = (list = []) => {
        let num = 3 - list.length%3;
        for(let i = 1; i <= num; i++){
            list.push(
                <Flex.Item key={`completion${i}`} className="item-container"><div className="trans-circle"><span></span></div></Flex.Item>
            )
        }
        return list;
    }

    handleRefresh = ()=> {
      // refresh
      const cmd = `$data%`;
      const {dispatch} = this.props;
      dispatch(wifi_sendcmd_request({cmd,cmdstring:'获取数据'}));

      console.log('Refresh')
  }

    render () {
      const {isgetdata,errordata} = this.props;
      // const mapname = mapname_err;
      const errflag = errordata;
      const abnormal = [];
      const normal = [];
      lodashmap(errflag,(v,k)=>{
        const text = this.geterrtext(k);
        console.log(text);
        if(!!text){
          if(v === '1' || v === 1){
            //有故障
            abnormal.push({text});
          }
          else if(v === '0' || v === 0){
            normal.push({text});
          }
        }

      })

      if(!isgetdata){
        return (
          <Refresh handleRefresh={this.handleRefresh} />
        )
      }
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

const mapStateToProps =  ({devicedata:{isgetdata,errordata}}) =>{
  return {isgetdata,errordata};
};
Abnormal = connect(mapStateToProps)(Abnormal);
export default injectIntl(Abnormal);
