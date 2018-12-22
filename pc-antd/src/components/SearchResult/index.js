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
        const { history, intl,query } = this.props;
        const { formatMessage } = intl;
        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                <Row style={{marginBottom: 5}}>
                    <Col span={24} className="title">
                        <img src={sb_icon} alt="" /><span>{this.props.intl.formatMessage({id: 'app.search.result'})}</span>
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
//
//
// const MachineItem = ({iserr, address, reportdate, id, name, runtime, mode, history})=>{
//     return (
//         <Card
//             className="child-card"
//             title={<p><img src={iserr?sb_err:sb_normal} alt="" /><span>{address} {reportdate}</span></p>}
//         >
//             <p><FormattedMessage id="machine.id" />"：{id}</p>
//             <p><FormattedMessage id="machine.name" />"：{name}</p>
//             <p><FormattedMessage id="machine.runtime" />"：{runtime}</p>
//             <p>
//                 <span style={{color: '#6ba4e7'}}>{mode}</span>
//                 <Button style={{float: "right", color: '#6ba4e7'}} onClick={()=>{history.push(`/details/${id}`)}}><FormattedMessage id="machine.detail" /></Button>
//             </p>
//         </Card>
//     )
// }
//
// class Machines extends React.PureComponent {
//
//
//     render() {
//         const { history, intl } = this.props;
//         const { formatMessage } = intl;
//         return (
//             <GridContent>
//                 <Card bordered={false} className="main-card">
//                 <Row style={{marginBottom: 5}}>
//                     <Col span={24} className="title">
//                         <img src={sb_icon} alt="" /><span>{this.props.intl.formatMessage({id: 'app.search.result'})}</span>
//                         <span className="right-Link" onClick={()=>{history.goBack()}}>&lt; {formatMessage({id: 'app.return'})}</span>
//                     </Col>
//                 </Row>
//                 <List
//                     grid={{ gutter: 24, column: 4 }}
//                     dataSource={data}
//                     pagination={{
//                         onChange: (page) => {   // 分页逻辑
//                           console.log(page);
//                         },
//                         pageSize: 8,
//                     }}
//                     renderItem={item => (
//                         <List.Item>
//                             <MachineItem {...item} {...this.props} />
//                         </List.Item>
//                     )}
//                 />
//                 </Card>
//             </GridContent>
//         )
//     }
// }
//
// export default withRouter(injectIntl(Machines));
