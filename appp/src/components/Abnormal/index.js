import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import lodashmap from 'lodash.map';
import { FormattedMessage } from 'react-intl';
// import lodashget from 'lodash.get';
import { injectIntl } from 'react-intl';
import './index.less';


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
      return intl.formatMessage({id:`home.show.err.${k}`});
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
