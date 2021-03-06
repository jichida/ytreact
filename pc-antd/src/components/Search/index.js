import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import GridContent from '../GridContent';
import SearchForm from './SearchForm';
import abnormal_img from '../../assets/search_a.png';
import all_img from '../../assets/search_b.png';
import global_img from '../../assets/search_c.png';
import { search_setquery } from '../../actions';
import './index.less';

const NavCard = ({img, title})=> {
    return (
        <div className="nav_pannel" style={{backgroundImage: `url(${img})`}}>
            <div><span className="nav_title">{title}</span><span className="nav_subtitle"><FormattedMessage id="machine.detail" /></span></div>
        </div>
    )
}

class Search extends React.PureComponent {

    handleSubmit = (values)=>{
        console.log(values)
        // 结果： {country: "5c11df1d34f6297e19e3bfbe", area: "5c11e40534f6297e19e3bfc6", distributor: "经销商1", customer: "abc"}
        let query = {};
        if(values.distributor !== ''){
          query["distributorid"] = values.distributor
        };
        if(values.customer !== ''){
          query["customer"] = values.customer;//new RegExp(values.customer,'ig')
        }//"basicinfo.username" = new RegExp(values.customer,'ig')
        if(values.device !== ''){
            query["deviceid"] = values.device;//new RegExp(values.customer,'ig')
          }//"basicinfo.username" = new RegExp(values.customer,'ig')
        debugger;
        this.props.dispatch(search_setquery({query,selectDistributor:values.distributor,
            customerName:values.customer,deviceid:values.device}));
        this.props.history.push('/result');
    }

    render() {
        return (
            <GridContent iswide>
                <Row gutter={48} style={{marginLeft:-24, marginRight:-48}}>
                    <Col span={8}>
                        <Link to="/abnormals">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<NavCard img={abnormal_img} title={<FormattedMessage id="machine.abnormal" />} />}
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/machines">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<NavCard img={all_img} title={<FormattedMessage id="machine.all" />} />}
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/distribution">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<NavCard img={global_img} title={<FormattedMessage id="machine.distribution" />} />}
                            />
                        </Link>
                    </Col>
                </Row>

                <Card bordered={false}>
                    <SearchForm onSubmit={this.handleSubmit} />
                </Card>
            </GridContent>
        )
    }
}
Search = withRouter(Search);
export default connect()(Search)
