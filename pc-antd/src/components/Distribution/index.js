import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col,  } from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import lodashmap from 'lodash.map';
import global_img from '../../assets/qqfb_bg.png';
import config from '../../env/config';
const total = {
    total: 960,
    normal: 500,
    abnormal: 460,
}

class Distribution extends React.PureComponent {


    render() {
        const { formatMessage } = this.props.intl;
        const {level1address} = this.props;
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row>
                        <Col span={24}>
                            <Card
                                className="map-card"
                                cover={<img src={global_img} alt="" className="map" />}
                            >
                              {
                                lodashmap(level1address,(v)=>{
                                  return (<Link to={`/regional/${v._id}`} key={v._id}>
                                      <div className="dt_dian" style={{left: v.left, top:v.top}}>
                                          <span>{v.name}</span>
                                      </div>
                                  </Link>);
                                })
                              }
                              
                            </Card>
                        </Col>
                        <Col span={24}>
                            <p className="total">{formatMessage({id: 'machine.distribution.para1'})} <span>{total.total}</span> {formatMessage({id: 'machine.distribution.para2'})} <span>{total.normal}</span> {formatMessage({id: 'machine.distribution.para3'})} <span>{total.abnormal}</span> {formatMessage({id: 'machine.distribution.para4'})}</p>
                        </Col>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

const mapStateToProps =  ({addressconst:{addressconsts}}) =>{
  let level1address = [];
  lodashmap(addressconsts,(v,k)=>{
    if(config.rootaddressconst === v.parent_id){
      level1address.push(v);
    }
  });
  return {level1address};
};
Distribution = connect(mapStateToProps)(Distribution);
export default injectIntl(Distribution);
