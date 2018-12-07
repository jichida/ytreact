import React from 'react'
import {Card, Form, Select, Input, Button, Row, Col } from 'antd';
import _ from 'lodash';
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
        selectedProvince: {},
        selectedCity: {},
        selectedArea: {},
        citys:[],
        areas:[],
    }

    handleProvinceChange = (value)=>{
        let cur = _.find(provinces, (item)=>(
            item.name === value
        ));
        console.log('当前省份');
        console.log(cur);
        if(cur){
            if(this.state.selectedProvince!==cur){
                this.setState({
                    selectedProvince: cur,
                });

                this.props.form.resetFields(['city','area']);

                let citys = _.map(cur.city, (item)=>(
                    <Option key={item.name}>{item.name}</Option>
                ));

                this.setState({
                    citys,
                    areas:[],
                });
                if(citys.length===1){
                    let areas = _.map(cur.city, (item)=>(
                        <Option key={item.name}>{item.name}</Option>
                    ));
                    this.setState({
                        selectedCity: cur.city,
                        areas
                    })
                }
            }
        }
        
    }

    handleCityChange = (value)=> {
        let curCity = _.find(this.state.selectedProvince.city, (item)=>(
            item.name === value
        ));
        if(curCity){
            if(this.state.selectedCity!==curCity){
                this.setState({
                    selectedCity: curCity
                });

                this.props.form.resetFields(['area']);

                let areas = _.map(curCity.area, (item)=>(
                    <Option key={item}>{item}</Option>
                ));
                this.setState({
                    areas
                });
            }
        }
    }

    handleAreaChange = (value)=>{
        this.setState({
            selectedArea: value,
        });
    }

    render(){
        const { form, onSubmit } = this.props;
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
                    <Row span={16} style={{marginBottom: '30px'}}>
                        <Col span={5} style={{textAlign: 'right'}}><span style={{fontSize: '14px', lineHeight: '40px'}}>选择省市区：</span></Col>
                        <Col span={19}>
                        <Row gutter={24}>
                            <Col span={8}>
                            {getFieldDecorator('province', {
                                rules: [{ 
                                    required: true, message: '请选择省',
                                }],
                            })(
                                <Select placeholder="选择省" size="large" onChange={this.handleProvinceChange} style={{width: '100%'}}>
                                {   _.map(provinces, (item)=>(
                                        <Option key={item.name}>{item.name}</Option>
                                    ))
                                }
                                </Select>
                            )}
                            </Col>
                            <Col span={8}>
                            {getFieldDecorator('city', {
                                rules: [{ 
                                    required: true, message: '请选择市', 
                                }],
                            })(
                                <Select placeholder="选择市" size="large" onChange={this.handleCityChange} style={{width: '100%'}}>
                                    {this.state.citys}
                                </Select>
                            )}
                            </Col>
                            <Col span={8}>
                            {getFieldDecorator('area', {
                                rules: [{ 
                                    required: true, message: '请选择区', 
                                }],
                            })(
                                <Select placeholder="选择区" size="large" onChange={this.handleAreaChange} style={{width: '100%'}}>
                                    {this.state.areas}
                                </Select>
                            )}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Form.Item {...formItemLayout} label="经销商名称">
                        {getFieldDecorator('distributor', {
                            rules: [{ 
                                required: true, message: '请选择经销商名称', 
                            }],
                        })(
                            <Select placeholder="请输入经销商名称" size="large">
                                <Option key="经销商1">经销商1</Option>
                                <Option key="经销商2">经销商2</Option>
                                <Option key="经销商3">经销商3</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="客户名称">
                        {getFieldDecorator('customer', {
                            rules: [{ 
                                required: true, message: '请输入客户名称', 
                            }],
                        })(<Input size="large" placeholder="请输入客户名称" />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={onValidateForm} size="large" style={{width: '100%'}}>立即搜索</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(SearchForm)