import React, { Component } from "react";
import { Formik } from "formik";
import DisplayCreateForm from "@/components/DisplayCreateForm/DisplayCreateForm";
import {
  dateFormat,
  dateTimeFormat
} from "@/components/FieldFormats/FieldFormats";
import moment from "moment";
import { PageHeaderWrapper } from '@ant-design/pro-layout';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
const initialValues = {
  fieldstatus: 
      {
        image: false,
        location: false,
        date: false,
      },
  createdAt: moment(Date.now()),
  images:  [
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
export default class Create extends Component {

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

    handleFiled = formProps => {
        const { fieldstatus } = formProps;
        alert(
            `Image Field: ${fieldstatus.image} \nLocation Field: ${fieldstatus.location} \n Date Field: ${fieldstatus.date}`
        );
    };
    handleSubmit = formProps => {
        const { bookingClient, createdAt, email } = formProps;
        const selectedTime = moment(createdAt).format(dateTimeFormat);
        alert(
        `Email: ${email} \nSelected Date: ${createdAt} \\`
        );
    };
  
    render = () => (
      <PageHeaderWrapper>
          <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={DisplayCreateForm}
          onClick={this.handleFiled}
          />
      </PageHeaderWrapper>
    );
  }
  
