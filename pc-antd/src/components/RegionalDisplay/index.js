import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, List, Divider } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import {getdeviceaddressstats_request,getdeviceaddressstats_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
import lodashmap from 'lodash.map';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/dq_icon.png';
import sb_err from '../../assets/sb_yc.png';
import sb_normal from '../../assets/sb_zc.png';
import sb_off from '../../assets/sb_lx.png';


const RegionalItem = withRouter(injectIntl((props)=>{
    console.log(props);
    const {addresslevel2,regional,total, normal, abnormal, offline, intl, history} = props;
    const { formatMessage } = intl;
    return (
        <Card
            className="child-card"
            title={<p>
                <span>{regional}{formatMessage({id: 'machine.regional'})}</span>
                <span className="regional-detail" onClick={()=>{history.push(`/regional_list/${addresslevel2}`)}}>{formatMessage({id: 'machine.detail'})}</span>
            </p>}
        >
            <Row gutter={8}>
                <Col span={10}>
                    <div className="total">
                        <h1>{total}</h1>
                        <h3>{formatMessage({id: 'machine.total'})}</h3>
                    </div>
                </Col>
                <Col span={2}>
                    <Divider type="vertical" className="split" />
                </Col>
                <Col span={12}>
                    <p className="detail"><img src={sb_normal} alt="" /><span>{formatMessage({id: 'machine.runing.normal'})}：{normal}</span></p>
                    <p className="detail"><img src={sb_err} alt="" /><span>{formatMessage({id: 'machine.runing.abnormal'})}：{abnormal}</span></p>
                    <p className="detail"><img src={sb_off} alt="" /><span>{formatMessage({id: 'machine.runing.offline'})}：{offline}</span></p>
                </Col>
            </Row>
        </Card>
    )
}))


class RegionalDisplay extends React.PureComponent {
    state = {
      data:[]
    };
    componentDidMount(){
      // getdeviceaddressstats_request
      const {dispatch,match,mapaddress} = this.props;
      const addresslevel1 = match.params.addresslevel1;
      // console.log(`start...`);
      dispatch(callthen(getdeviceaddressstats_request,getdeviceaddressstats_result,{query:{addresslevel1}})).then((result)=>{
        let resultdata = result.data;
        let data = [];
        for(let i = 0 ;i < resultdata.length; i++){
          const {addresslevel2,...rest} = resultdata[i];
          data.push({
            regional:mapaddress[addresslevel2],
            addresslevel2,
            ...rest
          });
        }
        console.log(resultdata);
        this.setState({data:data});
      }).catch((e)=>{

      });

    }

    render() {
        const {history,match,mapaddress,intl} = this.props;
        const addresslevel1 = match.params.addresslevel1;
        const regionalname = intl.formatMessage({id:`machine.regional.china`},{value:mapaddress[addresslevel1]});
        console.log(this.state.data);
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span><FormattedMessage id={`${regionalname}`} /></span>
                        {this.props.userlogin.is_admin && <div className="right-Link" onClick={()=>{history.goBack()}}>&lt;  <FormattedMessage id="app.return" /></div>}
                    </Col>
                </Row>
                <List
                    grid={{ gutter: 24, column: 4 }}
                    dataSource={this.state.data}
                    pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 8,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <RegionalItem {...item} />
                        </List.Item>
                    )}
                />
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({addressconst:{addressconsts},userlogin}) =>{
  let mapaddress = {};
  // console.log(JSON.stringify(mapaddress));
  lodashmap(addressconsts,(v,k)=>{
    mapaddress[k] = v.name;
  });
  console.log(JSON.stringify(mapaddress));
  return {mapaddress,userlogin};
};

RegionalDisplay = connect(mapStateToProps)(RegionalDisplay);
export default withRouter(injectIntl(RegionalDisplay));
