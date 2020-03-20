import { Badge, Button, Card, Col, DatePicker, Divider, Dropdown, Form, Avatar, Icon, Input,
  InputNumber, Menu, Row, Select, message, } from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StatisticBlock from './StatisticBlock';
import { connect } from 'dva';
import moment from 'moment';
import StandardTable from './people/components/StandardTable';
import styles from './style.less';
import user from '@/models/user';
import roles from '@/models/role';
const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['error', 'processing', 'error'];
const status = ['0', '1', '2'];
const statusTitle = ['Error', 'Enabled', 'Disabled'];

const roleMap = [];
for (let i = 0; i < roles.length; i += 1) {
  roleMap.push("{text:"+ roles[i].name, "value:" + roles[i].record_id +"}");
}
// console.log(state.roles)
// const roleMap = ['default', 'processing', 'success', 'error'];
/* eslint react/no-multi-comp:0 */

@connect(state => ({
  loading: state.loading.models.user,
  user: state.user,
  roles: state.roles,
}))
class UserList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };
  columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (val) => (
        <Fragment>
          <Avatar src={val} shape="square" />
        </Fragment>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      sorter: true,
    },
    {
      title: 'Actual Name',
      dataIndex: 'real_name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: statusTitle[1],
          value: '1',
        },
        {
          text: statusTitle[2],
          value: '2',
        },
      ],

      render(val) {
        return <Badge status={statusMap[val]} text={statusTitle[val]} />;
      },
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      filters: roles,
      render(val) {
        if (!val || val.length === 0) {
          return <span>-</span>;
        }
        const names = [];
        for (let i = 0; i < val.length; i += 1) {
          names.push(val[i].name);
        }
        return <span>{names.join(' | ')}</span>;
      },
    },
    {
      title: 'Member For',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Operatins',
      render: (text, record) => (
        <Fragment>
          <Button onClick={() => this.handleUpdateModalVisible(true, record)}>Edit </Button>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.user_name}`;
    }

    dispatch({
      type: 'user/fetch',
      status: params,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'user/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case 'disenable':
        dispatch({
          type: 'user/changeStatus',
          payload: {
            record_id: selectedRows.map(row => row.record_id),
            status: 2
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updated_at && fieldsValue.updated_at.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  onItemEnableClick = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/changeStatus',
      payload: { record_id: item.record_id, status: 1 },
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/add',
      payload: {
        desc: fields.desc,
      },
    });
    message.success('Added successfully');
    this.handleModalVisible();
  };
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/update',
      payload: {
        name: fields.user_name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('Configuration succeeded');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={16} sm={24}>
            <FormItem label="Search User">
              {getFieldDecorator('email')(<Input placeholder="Enter user name or email" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Find
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      user: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="disenable">Disenable Users</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <StatisticBlock/>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              New
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button icon="smile" type="default" onClick={() => this.onItemEnableClick(selectedRows[0])}>Enable Users</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                    More actions <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(UserList);
