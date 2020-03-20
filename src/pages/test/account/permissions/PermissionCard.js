import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Card,
  Radio,
  Modal,
  Icon,
  TreeSelect,
  Tooltip,
  InputNumber,
  Row,
  Col,
} from 'antd';

import PermissionAction from './PermissionAction';
import PermissionResource from './PermissionResource';

@connect(({ permissions }) => ({
  permissions,
}))
@Form.create()
class PermissionCard extends PureComponent {
  onOKClick = () => {
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.hidden = parseInt(formData.hidden, 10);
        formData.sequence = parseInt(formData.sequence, 10);
        onSubmit(formData);
      }
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  toTreeSelect = data => {
    if (!data) {
      return [];
    }
    const newData = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = { ...data[i], title: data[i].name, value: data[i].record_id };
      if (item.children && item.children.length > 0) {
        item.children = this.toTreeSelect(item.children);
      }
      newData.push(item);
    }
    return newData;
  };

  render() {
    const {
      permissions: { formVisible, formTitle, formData, submitting, treeData },
      form: { getFieldDecorator },
      onCancel,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };

    return (
      <Modal
        title={formTitle}
        width={900}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Menu name">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter a menu name',
                      },
                    ],
                  })(<Input placeholder="please enter" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Superior menu">
                  {getFieldDecorator('parent_id', {
                    initialValue: formData.parent_id,
                  })(
                    <TreeSelect
                      showSearch
                      treeNodeFilterProp="title"
                      style={{ width: '100%' }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={this.toTreeSelect(treeData)}
                      placeholder="Please choose"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Menu icon">
                  <Row>
                    <Col span={20}>
                      {getFieldDecorator('icon', {
                        initialValue: formData.icon,
                        rules: [
                          {
                            required: true,
                            message: 'Please enter the menu icon',
                          },
                        ],
                      })(<Input placeholder="Please enter" />)}
                    </Col>
                    <Col span={4} style={{ textAlign: 'center' }}>
                      <Tooltip title="Icon only supports official Icon icon">
                        <Icon type="question-circle" />
                      </Tooltip>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Access routing">
                  {getFieldDecorator('router', {
                    initialValue: formData.router,
                  })(<Input placeholder="Please enter" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Sort value">
                  {getFieldDecorator('sequence', {
                    initialValue: formData.sequence ? formData.sequence.toString() : '1000000',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter a sort value',
                      },
                    ],
                  })(<InputNumber min={1} style={{ width: '80%' }} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Hidden state">
                  {getFieldDecorator('hidden', {
                    initialValue: formData.hidden ? formData.hidden.toString() : '0',
                  })(
                    <Radio.Group>
                      <Radio value="0">Display</Radio>
                      <Radio value="1">Hide</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card title="Permission action manage" bordered={false}>
                  {getFieldDecorator('actions', {
                    initialValue: formData.actions,
                  })(<PermissionAction />)}
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card title="Permission resource manage" bordered={false}>
                  {getFieldDecorator('resources', {
                    initialValue: formData.resources,
                  })(<PermissionResource />)}
                </Card>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
  }
}

export default PermissionCard;
