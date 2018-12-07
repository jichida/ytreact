import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import GridContent from '../GridContent';
import SearchForm from './SearchForm';
import abnormal_img from '../../assets/search_a.png';
import all_img from '../../assets/search_b.png';
import global_img from '../../assets/search_c.png';
import './index.less';

class Search extends React.PureComponent {

    handleSubmit = (values)=>{
        console.log(values)
    }

    render() {
        return (
            <GridContent iswide>
                <Row gutter={48} style={{marginLeft:-24, marginRight:-48}}>
                    <Col span={8}>
                        <Link to="/machines/abnormal">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<img alt="" src={abnormal_img} />}
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/machines">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<img alt="" src={all_img} />}
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/distribution">
                            <Card
                                hoverable
                                style={{ width: 346, height: 140, border: 0 }}
                                cover={<img alt="" src={global_img} />}
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

export default Search;