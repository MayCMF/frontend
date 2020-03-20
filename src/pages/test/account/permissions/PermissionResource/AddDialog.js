import React, { PureComponent } from 'react';
import { Modal, Form, Input, Row, Col, Tooltip, Icon } from 'antd';

@Form.create()
class AddDialog extends PureComponent {
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  handleOKClick = () => {
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        onSubmit(formData);
      }
    });
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal
        title="Menu resource template"
        width={450}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={this.handleOKClick}
        onCancel={this.handleCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Form>
          <Form.Item {...formItemLayout} label="Resource name">
            <Row>
              <Col span={20}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a resource name',
                    },
                  ],
                })(<Input placeholder="Please enter a resource name" />)}
              </Col>
              <Col span={4} style={{ textAlign: 'center' }}>
                <Tooltip title="Example: User data">
                  <Icon type="question-circle" />
                </Tooltip>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Resource routing">
            <Row>
              <Col span={20}>
                {getFieldDecorator('router', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter resource routing',
                    },
                  ],
                })(<Input placeholder="Please enter resource routing" />)}
              </Col>
              <Col span={4} style={{ textAlign: 'center' }}>
                <Tooltip title="example: /api/v1/users">
                  <Icon type="question-circle" />
                </Tooltip>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddDialog;
