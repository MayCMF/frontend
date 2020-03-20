import { Form, Input, Modal } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="New Role"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="Role Name"
      >
        {form.getFieldDecorator('desc', {
          rules: [
            {
              required: true,
              message: 'Please enter a Role description.',
              min: 5,
            },
          ],
        })(<Input placeholder="Role Name" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
