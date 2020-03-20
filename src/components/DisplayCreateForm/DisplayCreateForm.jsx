import React from "react";
import { Form, Field, FieldArray } from "formik";
import {
  AntDatePicker,
  AntInput,
  AntTextArea,
  AntUpload,
  AntSelect,
  AntTimePicker
} from "../CreateFields/CreateFields";
import { Row, Col, Button, Collapse, Upload, Modal, Icon, Tooltip } from "antd";
import { dateFormat, dateTimeFormat, timeFormat } from "../FieldFormats/FieldFormats";
import {
  validateDate,
} from "../ValidateFields/ValidateFields";

const { Panel } = Collapse;

export default ({ handleSubmit, values, setFieldValue, submitCount }) => (

  <Form className="form-container" onSubmit={handleSubmit}>
  <Row
    gutter={{
      md: 8,
      lg: 24,
      xl: 48,
    }}
  >
    <Col md={16} sm={24}>

            <Field
            component={AntInput}
            name="title"
            type="text"
            placeholder="Title"
            submitCount={submitCount}
            hasFeedback
            />
            <Field
            component={AntTextArea}
            name="body"
            type="text"
            placeholder="Body Text"
            rows={8}
            submitCount={submitCount}
            hasFeedback
            />
            <Col span={24} style={{ textAlign: 'right' }}>
            {(values.images && values.images.length > 0) || values.fieldstatus.image ? (
                <Upload 
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={values.images}
                    fieldStatus={values.fieldstatus.image}
                    multiple={true}
                    submitCount={submitCount}
                    hasFeedback
                    >
                    <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text">Upload</div>
                    </div>
                </Upload>
            ):('')}
                <span>Add Fields: </span>
                {console.log(values.fieldstatus.image)}
                {(values.images && values.images.length <= 0 ) || values.fieldstatus.image ? (
                    <Tooltip placement="top" title="Add Image">
                        <Button type="dashed" style={{ margin: '5px' }} onClick={() => {setFieldValue(values.fieldstatus.image, true);}}>
                            <Icon type="file-image" />
                        </Button>
                    </Tooltip>
                ) : ('')}
                <Tooltip placement="top" title="Add Location">
                    <Button type="dashed" style={{ margin: '5px' }}>
                        <Icon type="environment" />
                    </Button>
                </Tooltip>
                <Tooltip placement="top" title="Add Range Date">
                    <Button type="dashed" style={{ margin: '5px' }}>
                        <Icon type="clock-circle" />
                    </Button>
                </Tooltip>
                <div style={{ margin: '24px 0' }} />
            </Col>
        </Col>
        <Col md={8} sm={24}>
          <Collapse accordion>
            <Panel header="Author" key="1">
                <Field
                component={AntInput}
                name="author"
                type="text"
                placeholder="Author"
                submitCount={submitCount}
                hasFeedback
                />
                <Field
                component={AntDatePicker}
                name="createdAt"
                label="Created At"
                defaultValue={values.createdAt}
                format={dateTimeFormat}
                validate={validateDate}
                submitCount={submitCount}
                hasFeedback
                showTime
                />
            </Panel>
            <Panel header="Friendly URL (Slug)" key="2">
                <Field
                component={AntInput}
                name="slug"
                type="text"
                placeholder="Friendly URL (Slug)"
                submitCount={submitCount}
                hasFeedback
                />
            </Panel>
          </Collapse>
        </Col>
    </Row>
    <div className="submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Save
      </button>
      <button className="ant-btn ant-btn-default" type="submit">
        Publish
      </button>
    </div>
  </Form>
);
