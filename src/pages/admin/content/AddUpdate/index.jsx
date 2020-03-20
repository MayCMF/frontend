import React, { Component, Fragment } from 'react';
import { Upload, Modal, Form, Row, Col, DatePicker, TimePicker, Collapse, Input, Icon, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';
import content from '@/models/content';
import Tabs from '@/components/Tabs'

const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const { Panel } = Collapse;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

let id = 0;

@connect(state => ({
  loading: state.loading.models.content,
  content: state.content,
}))
class ContentList extends Component { 
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  remove = k => {
  const { form } = this.props;
  // can use data-binding to get
  const keys = form.getFieldValue('keys');
  // We need at least one passenger
  if (keys.length === 1) {
    return;
  }

  // can use data-binding to set
  form.setFieldsValue({
    keys: keys.filter(key => key !== k),
  });
};

add = () => {
  const { form } = this.props;
  // can use data-binding to get
  const keys = form.getFieldValue('keys');
  const nextKeys = keys.concat(id++);
  // can use data-binding to set
  // important! notify form to detect changes
  form.setFieldsValue({
    keys: nextKeys,
  });
};

handleSubmit = e => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      const { keys, names } = values;
      console.log('Received values of form: ', values);
      console.log('Merged values:', keys.map(key => names[key]));
    }
  });
};

render() {
  const { previewVisible, previewImage, fileList } = this.state;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'Passengers' : ''}
      required={false}
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          },
        ],
      })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
      {keys.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(k)}
        />
      ) : null}
    </Form.Item>
  ));
  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  };
  return (
    <PageHeaderWrapper>
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={16} sm={24}>
            <Input placeholder="Title" />
            <div style={{ margin: '24px 0' }} />
            <Input placeholder="Tags" />
            <div style={{ margin: '24px 0' }} />
            <TextArea rows={8}  placeholder="Body Text" />    
            <div className="clearfix" style={{ margin: '24px 0' }} >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              multiple={true}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            </div>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add}>
                <Icon type="plus" /> Add field
              </Button>
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
          <Collapse accordion>
            <Panel header="Author" key="1">
              <div style={{ margin: '24px 0' }} />
              <Input placeholder="Author" />
              <Form.Item label="Created">
                {getFieldDecorator('date-time-picker', config)(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                )}
              </Form.Item>
            </Panel>
            <Panel header="Friendly URL (Slug)" key="3">
              <Input placeholder="Enter short URL" />
            </Panel>
          </Collapse>
          </Col>
        </Row>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </PageHeaderWrapper>
  );
  }
}

export default Form.create()(ContentList);
