import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button, message, Form, Input, Select, Upload } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import GridContent from '../GridContent';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
// import lodashfind from 'lodash.find';

import { getdistributorlist_request, getdistributorlist_result } from '../../actions';
import { createnotice_request } from '../../actions';
import {callthen} from '../../sagas/pagination';

import './new.less';

import sb_icon from '../../assets/tz_icon.png';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
      lg: { span: 4 }
    },
    wrapperCol: {
      lg: { span: 16 }
    },
};

const tailFormItemLayout = {
    wrapperCol: {
      lg: {
          span: 16,
          offset: 4
      }
    },
};

const uploadprops = {
    name: 'file',
    action: '',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
};

class New extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            dispatch(createnotice_request({data:values}));
          }
        });
    }

    handleCancel = () => {
        this.props.history.goBack();
    }

    state = {
        distributorOptions: [],
    }
    componentDidMount(){
      const {distributorquery,dispatch} = this.props;
      dispatch(callthen(getdistributorlist_request, getdistributorlist_result, {query:distributorquery})).then((result)=>{
          let resultdata = result.data;
          let distributorOptions = [];
          lodashmap(resultdata, (item)=>{
              distributorOptions.push(item);
          });
          this.setState({distributorOptions});
        }).catch((e)=>{

        });
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        const { intl } = this.props;

        return (
            <GridContent>
                <Card bordered={false} className="main-card">
                    <Row style={{marginBottom: 30}} className="title">
                        <Col span={24}>
                            <img src={sb_icon} alt="" /><span><FormattedMessage id="machine.notice" /> - <FormattedMessage id="machine.notice.new" /></span>
                        </Col>
                    </Row>
                    <Row  style={{marginBottom: 30}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'machine.notice.title'})}
                            >
                                {getFieldDecorator('title', {
                                    rules: [{
                                        required: true, message: intl.formatMessage({id: 'machine.notice.title.required'}),
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'machine.notice.distributor'})}
                            >
                                {getFieldDecorator('distributorids', {
                                    rules: [{
                                        required: true, message: intl.formatMessage({id: 'machine.notice.distributor.required'}),
                                    }],
                                })(
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder= {intl.formatMessage({id: 'machine.notice.distributor.required'})}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {
                                      lodashmap(this.state.distributorOptions, (item)=>(
                                            <Option key={item._id} value={item._id}>{item.name}</Option>
                                        ))
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'machine.notice.content'})}
                            >
                                {getFieldDecorator('content', {
                                    rules: [{
                                        required: true, message: intl.formatMessage({id: 'machine.notice.content.required'}),
                                    }],
                                })(
                                    <Input.TextArea rows={4} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'machine.notice.enclosure'})}
                            >
                                {getFieldDecorator('file', {
                                    valuePropName: 'fileList',
                                    // getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...uploadprops}>
                                        <Button type="primary" icon="upload" size="large"><FormattedMessage id="machine.notice.upload" /></Button>
                                    </Upload>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Row gutter={48}>
                                    <Col span={12} style={{textAlign: 'right'}}><Button type="primary" htmlType="submit">{intl.formatMessage({id: 'form.submit'})}</Button></Col>
                                    <Col span={12} style={{textAlign: 'left'}}><Button onClick={this.handleCancel}>{intl.formatMessage({id: 'form.cancel'})}</Button></Col>
                                </Row>

                            </Form.Item>
                        </Form>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

const mapStateToProps =  ({addressconst:{addressconsts},userlogin}) =>{
  const addresslevel1 = lodashget(userlogin,'addresslevel1','');
  const addresslevel2 = lodashget(userlogin,'addresslevel2','');
  let distributorquery = {};
  if(addresslevel1.length === 0){
    //全部
  }
  else{
    if(addresslevel2.length === 0){
      distributorquery = {addresslevel1};//固定一级区域
    }
    else{
      //无权限啊,怎么进来的
      distributorquery = {addresslevel1,addresslevel2};
    }
  }
  return {distributorquery};
}

const NewForm = Form.create()(withRouter(injectIntl(New)));
export default connect(mapStateToProps)(NewForm);
