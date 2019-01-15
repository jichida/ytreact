import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashget from 'lodash.get';
import { Card, Row, Col, Button, } from 'antd';
import { FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
import './detail.less';

import sb_icon from '../../assets/tz_icon.png';

class Detail extends React.PureComponent {

    handleCancel = () => {
        this.props.history.goBack();
    }


    render() {
        const {curnotice,distributors} = this.props;
        let txtdistributors = [];
        if(!!curnotice){
          for(let i=0;i<curnotice.distributorids.length;i++){
            const disid = curnotice.distributorids[i];
            const name = lodashget(distributors,`${disid}.name`,'');
            txtdistributors += `${name},`;
          }
        }
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={24}>
                            <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.notice" /> - <FormattedMessage id="machine.notice.detail" /></span>
                        </Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title"><FormattedMessage id="machine.notice.title" />:</Col>
                        <Col span={16}  className="item-content">{lodashget(curnotice,'title','')}</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title"><FormattedMessage id="machine.notice.distributor" />:</Col>
                        <Col span={16}  className="item-content">{txtdistributors} </Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title"><FormattedMessage id="machine.notice.content" />:</Col>
                        <Col span={16}  className="item-content">{lodashget(curnotice,'content','')}</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={4} className="item-title"><FormattedMessage id="machine.notice.enclosure" />:</Col>
                        <Col span={16}  className="item-content">附件在这里</Col>
                    </Row>
                    <Row gutter={48} className="items">
                        <Col span={16} offset={4}  style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={this.handleCancel}><FormattedMessage id="form.return" /></Button>
                        </Col>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({notice:{notices,distributors}},props) =>{
  let curnotice = lodashget(notices,`${props.match.params.id}`,{});
  console.log(curnotice)
  return {curnotice,distributors};
};
Detail = connect(mapStateToProps)(Detail);
export default withRouter(Detail);
