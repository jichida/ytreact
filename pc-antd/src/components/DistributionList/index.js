import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import './index.less';
import DeviceList from '../PageList/DeviceList';
import sb_icon from '../../assets/sb_icon.png';


class Machines extends React.PureComponent {


    render() {
        const { history, intl, query } = this.props;
        const { formatMessage } = intl;
        let title;
        console.log(query.iserr);
        if(typeof(query.iserr) === 'undefined'){
            title = formatMessage({id: 'machine.all'});
        } else {
            title = query.iserr ? formatMessage({id: 'machine.all.abnormal'}) : formatMessage({id: 'machine.all.normal'});
        }
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>{title}</span>
                        <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
                    </Col>
                </Row>
                <DeviceList
                    query={query}
                />
                </Card>
            </GridContent>
        )
    }
}
const mapStateToProps =  ({searchquery:{query}}) =>{
  return {query};
};

Machines = connect(mapStateToProps)(Machines);
export default withRouter(injectIntl(Machines));
