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
import {getdevicecount_request,getdevicecount_result} from '../../actions';
import {callthen} from '../../sagas/pagination';


class Distribution extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      normal: 0,
      abnormal: 0,
    };
  }

  componentDidMount(){
    this.props.dispatch(callthen(getdevicecount_request,getdevicecount_result,{})).then((result) => {
      console.log(result);
      this.setState(result.data)
    }).catch((err) => {
      console.log(err);
    })
  }

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
                            <p className="total">{formatMessage({id: 'machine.distribution.para1'})} <span>{this.state.total}</span>
                             {formatMessage({id: 'machine.distribution.para2'})} <span>{this.state.normal}</span>
                             {formatMessage({id: 'machine.distribution.para3'})} <span>{this.state.abnormal}</span>
                             {formatMessage({id: 'machine.distribution.para4'})}</p>
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
