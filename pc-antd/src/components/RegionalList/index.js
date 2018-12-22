import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import lodashmap from 'lodash.map';
import './index.less';
import {getdistributorlist_request,getdistributorlist_result} from '../../actions';
import {callthen} from '../../sagas/pagination';

import DeviceList from '../PageList/DeviceList';
import sb_icon from '../../assets/sb_icon.png';


class Machines extends React.PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        distributorids:[]
      }
    }
    componentDidMount(){
      const { match } = this.props;
      const addresslevel2 = match.params.addresslevel2;
      this.props.dispatch(callthen(getdistributorlist_request,getdistributorlist_result,{addresslevel2})).then((result) => {

        let distributorids = [];
        lodashmap(result.data,(v)=>{
          distributorids.push(v._id);
        });
        console.log(distributorids);
        this.setState({distributorids})
      }).catch((err) => {
        console.log(err);
      })
    }
    render() {
        const { history, intl, match,mapaddress } = this.props;
        const addresslevel2 = match.params.addresslevel2;
        const { formatMessage } = intl;
        console.log(this.state);
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>{mapaddress[addresslevel2]}{formatMessage({id: 'machine.regional'})}</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
                    </Col>
                </Row>
                <DeviceList
                    query={{distributorid:{$in:this.state.distributorids}}}
                />
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({addressconst:{addressconsts}}) =>{
  let mapaddress = {};
  // console.log(JSON.stringify(mapaddress));
  lodashmap(addressconsts,(v,k)=>{
    mapaddress[k] = v.name;
  });
  return {mapaddress};
};
Machines = connect(mapStateToProps)(Machines);
export default withRouter(injectIntl(Machines));
