import React from 'react';
import { connect } from 'react-redux';

import {Card, Form, Select, Input, Button, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import config from '../../env/config';
import lodashmap from 'lodash.map';
// import lodashfind from 'lodash.find';

import { getdistributorlist_request, getdistributorlist_result } from '../../actions';
import { search_setquery } from '../../actions';
import {callthen} from '../../sagas/pagination';

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
    // constructor(props) {
    //     super(props);
        // this.state = {
        //     selectedCountry,
        //     selectedArea: '',
        //     selectDistributor:'',
        //     customerName:'',
        //     areasOptions:[],
        //     distributorOptions: [],
        // }
    // }
    componentDidMount(){
      this.setAreasOption(this.props.searchquery.selectedCountry);
    }

    setAreasOption = (country)=> {
        const { dispatch } = this.props;
        let areasOptions = [];
        lodashmap(this.props.areas, (v, k)=>{
            if(v.parent_id === country) {
                areasOptions.push( <Option key={v._id} value={v._id}>{v.name}</Option> )
            }
        });
        dispatch(search_setquery({areasOptions,selectedCountry:country}));
    }

    setDistributorOption = (country, area) => {
        const { dispatch } = this.props;
        dispatch(callthen(getdistributorlist_request, getdistributorlist_result, {query:{ addresslevel2: area }})).then((result)=>{
            let resultdata = result.data;
            let distributorOptions = [];
            lodashmap(resultdata, (item)=>{
                distributorOptions.push(
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                )
            })

            dispatch(search_setquery({ distributorOptions,selectedArea:area }));
          }).catch((e)=>{

          });
    }



    handleCountryChange = (value)=>{
        const { dispatch } = this.props;
        dispatch(search_setquery({
            selectedCountry: value,
        }));
        console.log(value);

        this.setAreasOption(value);
    }

    handleRegionChange = (value)=>{
        const { dispatch,searchquery } = this.props;
        dispatch(search_setquery({
            selectedArea: value,
        }));
        console.log(value);
        this.setDistributorOption(searchquery.selectedCountry, value);
    }

    render(){
        const { form, onSubmit,provinces,searchquery } = this.props;
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
                                initialValue: searchquery.selectedCountry,
                                rules: [{
                                    required: true, message: `${formatMessage({id: 'app.search.country'})}`,
                                }],
                            })(
                                <Select placeholder={formatMessage({id: 'app.search.country'})} size="large"
                                  onChange={this.handleCountryChange} style={{width: '100%'}}
                                >
                                {
                                  lodashmap(provinces, (item)=>(
                                        <Option key={item._id} value={item._id}>{item.name}</Option>
                                    ))
                                }
                                </Select>
                            )}
                            </Col>
                            <Col span={12}>
                            {getFieldDecorator('area', {
                                initialValue: searchquery.selectedArea,
                                rules: [{
                                    required: true, message: `${formatMessage({id: 'app.search.region'})}`,
                                }],
                            })(
                                <Select placeholder={formatMessage({id: 'app.search.region'})} size="large" onChange={this.handleRegionChange} style={{width: '100%'}}>
                                    {searchquery.areasOptions}
                                </Select>
                            )}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Form.Item {...formItemLayout} label={formatMessage({id: 'app.search.distributor'})}>
                        {getFieldDecorator('distributor', {
                            initialValue: searchquery.selectDistributor,
                            rules: [{
                                required: true, message: `${formatMessage({id: 'app.search.distributor.choose'})}`,
                            }],
                        })(
                            <Select placeholder={formatMessage({id: 'app.search.distributor.choose'})} size="large">
                                    {searchquery.distributorOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({id: 'app.search.curstomer'})}>
                        {getFieldDecorator('customer', {
                            initialValue: searchquery.customerName,
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

const mapStateToProps =  ({addressconst:{addressconsts},searchquery}) =>{
  let mapaddress = {};
  let provinces = [];
  let areas = [];
  // console.log(JSON.stringify(mapaddress));
  lodashmap(addressconsts,(v,k)=>{
    if(v.parent_id === config.rootaddressconst){
      provinces.push(v);
    } else {
        areas.push(v)
    }
    mapaddress[k] = v.name;
  });
  // console.log(JSON.stringify(mapaddress));
  return {mapaddress,provinces, areas,searchquery};
};

SearchForm = connect(mapStateToProps)(SearchForm);

export default Form.create()(injectIntl(SearchForm))
