import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, List, Divider } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import {getdeviceaddressstats_request,getdeviceaddressstats_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
import GridContent from '../GridContent';
import './index.less';

import sb_icon from '../../assets/dq_icon.png';
import sb_err from '../../assets/sb_yc.png';
import sb_normal from '../../assets/sb_zc.png';
import sb_off from '../../assets/sb_wlw.png';

const data = [
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
    {
        regional: '东北',
        total: '970',
        normal: 10,
        abnormal: 6,
        offline: 10,
    },
]

const RegionalItem = injectIntl(({regional,total, normal, abnormal, offline, intl})=>{
    const { formatMessage } = intl;
    return (
        <Card
            className="child-card"
            title={<p><span>{regional}{formatMessage({id: 'machine.regional'})}</span></p>}
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
})


class RegionalDisplay extends React.PureComponent {
    componentDidMount(){
      // getdeviceaddressstats_request
      const {dispatch,match} = this.props;
      const addresslevel1 = match.params.addresslevel1;
      debugger;
      dispatch(callthen(getdeviceaddressstats_request,getdeviceaddressstats_result,{query:{addresslevel1}})).then((result)=>{

      }).catch((e)=>{

      });

    }

    render() {
        const {history} = this.props;
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 30}} className="title">
                    <Col span={24}>
                        <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.regional.china" /></span>
                        <div className="right-Link" onClick={()=>{history.goBack()}}>&lt; <FormattedMessage id="app.return" /></div>
                    </Col>
                </Row>
                <List
                    grid={{ gutter: 24, column: 4 }}
                    dataSource={data}
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

RegionalDisplay = connect()(RegionalDisplay);
export default withRouter(injectIntl(RegionalDisplay));
