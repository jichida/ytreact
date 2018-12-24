import React from 'react';
import { connect } from 'react-redux';

import {Card, Form, Select, Input, Button, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import config from '../../env/config';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashfind from 'lodash.find';

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
      const {searchquery,addresslevel1,addresslevel2} = this.props;
      if(addresslevel1.length === 0 || addresslevel2.length ===  0){
        this.setAreasOption(searchquery.selectedCountry);
        this.setDistributorOption(searchquery.selectedCountry,searchquery.selectedArea);
      }
    }

    setAreasOption = (country)=> {
        const { dispatch } = this.props;
        let areasOptions = [];

        areasOptions.push({
          _id:'',
          name:'全部'
        });
        lodashmap(this.props.areas, (v, k)=>{
            if(v.parent_id === country) {
                areasOptions.push(v)
            }
        });
        dispatch(search_setquery({areasOptions,selectedCountry:country}));
    }

    setDistributorOption = (country, area) => {
        const { dispatch,searchquery } = this.props;
        let query = {};
        if(area === ''){
          if(country !== ''){
            query = {addresslevel1:country};
          }
        }
        else{
          query = { addresslevel2: area };
        }
        dispatch(callthen(getdistributorlist_request, getdistributorlist_result, {query})).then((result)=>{
            let resultdata = result.data;
            let distributorOptions = [];
            lodashmap(resultdata, (item)=>{
                distributorOptions.push(item);
            })

            dispatch(search_setquery({ distributorOptions,selectedArea:area,searchquery}));
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
        console.log(this.props);
        return (
            <Card bordered={false}>
                <Form layout="horizontal" hideRequiredMark>
                    <Row span={16} style={{marginBottom: '24px'}}>
                        <Col span={5} style={{textAlign: 'right'}}><span style={{fontSize: '14px', lineHeight: '40px'}}>{formatMessage({id: 'app.search.choose'})}：</span></Col>
                        <Col span={19}>
                        <Row gutter={24}>
                            <Col span={12}>
                            {getFieldDecorator('country', {
                                Value: searchquery.selectedCountry,
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
                                Value: searchquery.selectedArea,
                                rules: [{
                                    required: true, message: `${formatMessage({id: 'app.search.region'})}`,
                                }],
                            })(
                                <Select placeholder={formatMessage({id: 'app.search.region'})} size="large" onChange={this.handleRegionChange} style={{width: '100%'}}>

                                  {
                                    lodashmap(searchquery.areasOptions, (item)=>(
                                          <Option key={item._id} value={item._id}>{item.name}</Option>
                                      ))
                                  }

                                </Select>
                            )}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Form.Item {...formItemLayout} label={formatMessage({id: 'app.search.distributor'})}>
                        {getFieldDecorator('distributor', {
                            Value: searchquery.selectDistributor,
                            rules: [{
                                required: true, message: `${formatMessage({id: 'app.search.distributor.choose'})}`,
                            }],
                        })(
                            <Select placeholder={formatMessage({id: 'app.search.distributor.choose'})} size="large">
                              {
                                lodashmap(searchquery.distributorOptions, (item)=>(
                                      <Option key={item._id} value={item._id}>{item.name}</Option>
                                  ))
                              }
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

const mapStateToProps =  ({addressconst:{addressconsts},searchquery,userlogin}) =>{
  let mapaddress = {};
  let provinces = [];
  let areas = [];
  const addresslevel1 = lodashget(userlogin,'addresslevel1','');
  const addresslevel2 = lodashget(userlogin,'addresslevel2','');

  if(addresslevel1.length === 0){
    //所有
    provinces.push({
      _id:'',
      name:'全部'
    });
    mapaddress[''] = '全部';

    lodashmap(addressconsts,(v,k)=>{
      if(v.parent_id === config.rootaddressconst){
        provinces.push(v);
      }
      mapaddress[k] = v.name;
    });

    lodashmap(addressconsts,(v,k)=>{
        if(v.parent_id !== config.rootaddressconst){
          areas.push(v);
          mapaddress[k] = v.name;
        }
    });

    //选择默认经销商
    if(searchquery.selectDistributor.length === 0){
      searchquery.selectDistributor = userlogin._id;
    }

    //如果searchquery.selectDistributor不在searchquery.distributorOptions 里面
    const fresult =  lodashfind(searchquery.selectDistributor,(v)=>{
      return v._id === searchquery.selectDistributor;
    });
    if(!fresult){
      searchquery.selectDistributor = '';
    }

  }
  else{
    searchquery.selectedCountry = addresslevel1;//固定一级区域
    if(addresslevel2.length === 0){
      //一级区域总部
      lodashmap(addressconsts,(v,k)=>{
        if(v.parent_id !== config.rootaddressconst){
          areas.push(v);
          mapaddress[k] = v.name;
        }
      });
    }
    else{
      //无选择权限
      //必须下拉
      searchquery.areasOptions = [];
      lodashmap(addressconsts,(v,k)=>{
        if(v._id === addresslevel1){
          provinces.push(v);
        }
        if(v._id === addresslevel2){
          areas.push(v);
          searchquery.areasOptions.push(v);
        }
        mapaddress[k] = v.name;
      });

      searchquery.selectedArea = addresslevel2;
      searchquery.selectDistributor = userlogin._id;
      searchquery.distributorOptions = [];
      searchquery.distributorOptions.push({
        _id:userlogin._id,
        name:userlogin.name
      });
    }

  }

  // console.log(JSON.stringify(mapaddress));
  return {mapaddress,provinces, areas,searchquery,addresslevel1,addresslevel2};
};

SearchForm = connect(mapStateToProps)(SearchForm);

export default Form.create()(injectIntl(SearchForm))
