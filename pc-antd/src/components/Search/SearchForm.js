import React from 'react'
import {Card, Form, Select, Input, Button, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import lodashmap from 'lodash.map';
import lodashfind from 'lodash.find';
import provinces from '../provinces.js';

const Option = Select.Option;

const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
};

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 19,
        offset: 5,
      },
    },
  };

class SearchForm extends React.PureComponent{

    state = {
        selectedCountry: {},
        selectedRegion: {},
    }

    handleCountryChange = (value)=>{
        // let cur = lodashfind(provinces, (item)=>(
        //     item.name === value
        // ));
        // if(cur){
        //     if(this.state.selectedProvince!==cur){
        //         this.setState({
        //             selectedProvince: cur,
        //         });

        //         this.props.form.resetFields(['city','area']);

        //         let citys = lodashmap(cur.city, (item)=>(
        //             <Option key={item.name}>{item.name}</Option>
        //         ));

        //         this.setState({
        //             citys,
        //             areas:[],
        //         });
        //         if(citys.length===1){
        //             let areas = lodashmap(cur.city, (item)=>(
        //                 <Option key={item.name}>{item.name}</Option>
        //             ));
        //             this.setState({
        //                 selectedCity: cur.city,
        //                 areas
        //             })
        //         }
        //     }
        // }
        
    }

    handleRegionChange = (value)=>{
        this.setState({
            selectedRegion: value,
        });
    }

    render(){
        const { form, onSubmit } = this.props;
        const { formatMessage } = this.props.intl;
        const { getFieldDecorator, validateFields } = form;
        const onValidateForm = () => {
          validateFields((err, values) => {
            if (!err) {
              onSubmit(values);
            }
          });
        };

        return (
            <Card bordered={false}>
                <Form layout="horizontal" hideRequiredMark>
                    <Row span={16} style={{marginBottom: '24px'}}>
                        <Col span={5} style={{textAlign: 'right'}}><span style={{fontSize: '14px', lineHeight: '40px'}}>{formatMessage({id: 'app.search.choose'})}：</span></Col>
                        <Col span={19}>
                        <Row gutter={24}>
                            <Col span={12}>
                            {getFieldDecorator('country', {
                                rules: [{ 
                                    required: true, message: `${formatMessage({id: 'app.search.country'})}`,
                                }],
                            })(
                                <Select placeholder={formatMessage({id: 'app.search.country'})} size="large" onChange={this.handleCountryChange} style={{width: '100%'}}>
                                {/* {   lodashmap(provinces, (item)=>(
                                        <Option key={item.name}>{item.name}</Option>
                                    ))
                                } */}
                                </Select>
                            )}
                            </Col>
                            <Col span={12}>
                            {getFieldDecorator('area', {
                                rules: [{ 
                                    required: true, message: `${formatMessage({id: 'app.search.region'})}`, 
                                }],
                            })(
                                <Select placeholder={formatMessage({id: 'app.search.region'})} size="large" onChange={this.handleRegionChange} style={{width: '100%'}}>
                                    {/* {this.state.areas} */}
                                </Select>
                            )}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Form.Item {...formItemLayout} label={formatMessage({id: 'app.search.distributor'})}>
                        {getFieldDecorator('distributor', {
                            rules: [{ 
                                required: true, message: `${formatMessage({id: 'app.search.distributor.choose'})}`, 
                            }],
                        })(
                            <Select placeholder={formatMessage({id: 'app.search.distributor.choose'})} size="large">
                                <Option key="经销商1">经销商1</Option>
                                <Option key="经销商2">经销商2</Option>
                                <Option key="经销商3">经销商3</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({id: 'app.search.curstomer'})}>
                        {getFieldDecorator('customer', {
                            rules: [{ 
                                required: true, message: `${formatMessage({id: 'app.search.curstomer.input'})}`, 
                            }],
                        })(<Input size="large" placeholder={formatMessage({id: 'app.search.curstomer.input'})} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={onValidateForm} size="large" className="search_btn" style={{width: '100%'}}>{formatMessage({id: 'app.search'})}</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(injectIntl(SearchForm))