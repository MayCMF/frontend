import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, message, Card, Row, Col, InputNumber } from 'antd';

import RoleMenu from './RoleMenu';

@connect(state => ({
  role: state.role,
}))
@Form.create()
class RoleCard extends PureComponent {
  onOKClick = () => {
    const { form, onSubmit } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      const formData = { ...values };
      formData.sequence = parseInt(formData.sequence, 10);
      if (!formData.permissions || formData.permissions.length === 0) {
        message.warning('Please select menu permissions!');
        return;
      }
      onSubmit(formData);
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  render() {
    const {
      role: { formTitle, formVisible, formData, submitting },
      form: { getFieldDecorator },
      onCancel,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
    };

    return (
      <Modal
        title={formTitle}
        width={800}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Form>
          <Row>
            <Col>
              <Form.Item {...formItemLayout} label="Role Name">
                {getFieldDecorator('name', {
                  initialValue: formData.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a role name',
                    },
                  ],
                })(<Input placeholder="Please enter a role name" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item {...formItemLayout} label="Sort value">
                {getFieldDecorator('sequence', {
                  initialValue: formData.sequence ? formData.sequence.toString() : '1000000',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a sort value',
                    },
                  ],
                })(<InputNumber min={1} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item {...formItemLayout} label="Remarks">
                {getFieldDecorator('memo', {
                  initialValue: formData.memo,
                })(<Input.TextArea rows={2} placeholder="Please enter a note" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title="Select menu permissions" bordered={false}>
                {getFieldDecorator('permissions', {
                  initialValue: formData.permissions,
                })(<RoleMenu />)}
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default RoleCard;
