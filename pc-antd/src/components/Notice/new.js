import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Button, message, Form, Input, Select, Upload } from 'antd';
import { FormattedMessage } from 'react-intl';
import GridContent from '../GridContent';
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
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    
    handleCancel = () => {
        this.props.history.goBack();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

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
                                label="标题"
                            >
                                {getFieldDecorator('title', {
                                    rules: [{
                                        required: true, message: 'Please input your Notice Title!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="经销商"
                            >
                                {getFieldDecorator('distributor', {
                                    rules: [{
                                        required: true, message: 'Please select your Notice Title!',
                                    }],
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="选择经销商"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="内容"
                            >
                                {getFieldDecorator('content', {
                                    rules: [{
                                        required: true, message: 'Please input your Notice Content!',
                                    }],
                                })(
                                    <Input.TextArea rows={4} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="附件"
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
                                    <Col span={12} style={{textAlign: 'right'}}><Button type="primary" htmlType="submit">确定</Button></Col>
                                    <Col span={12} style={{textAlign: 'left'}}><Button onClick={this.handleCancel}>取消</Button></Col>
                                </Row>
                                
                            </Form.Item>
                        </Form>
                    </Row>
                </Card>
            </GridContent>
        )
    }
}

export default Form.create()(withRouter(New));