import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Modal, Badge, Radio } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import PButton from '@/components/PermButton';
import UserCard from './UserCard';
import RoleSelect from './RoleSelect';
import { formatDate } from '../../../../utils/utils';

import styles from './User.less';

@connect(state => ({
  loading: state.loading.models.user,
  user: state.user,
}))
@Form.create()
class User extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    this.dispatch({
      type: 'user/fetch',
      search: {},
      pagination: {},
    });
  }

  onItemDisableClick = item => {
    this.dispatch({
      type: 'user/changeStatus',
      payload: { record_id: item.record_id, status: 2 },
    });
  };

  onItemEnableClick = item => {
    this.dispatch({
      type: 'user/changeStatus',
      payload: { record_id: item.record_id, status: 1 },
    });
  };

  onItemEditClick = item => {
    this.dispatch({
      type: 'user/loadForm',
      payload: {
        type: 'E',
        id: item.record_id,
      },
    });
  };

  onAddClick = () => {
    this.dispatch({
      type: 'user/loadForm',
      payload: {
        type: 'A',
      },
    });
  };

  onDelOKClick(id) {
    this.dispatch({
      type: 'user/del',
      payload: { record_id: id },
    });
    this.clearSelectRows();
  }

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  onItemDelClick = item => {
    Modal.confirm({
      title: `Make sure to delete [user data: ${item.user_name}]？`,
      okText: 'confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: this.onDelOKClick.bind(this, item.record_id),
    });
  };

  handleTableSelectRow = (selectedRowKeys, selectedRows) => {
    let keys = [];
    let rows = [];
    if (selectedRowKeys.length > 0 && selectedRows.length > 0) {
      keys = [selectedRowKeys[selectedRowKeys.length - 1]];
      rows = [selectedRows[selectedRows.length - 1]];
    }
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  onTableChange = pagination => {
    this.dispatch({
      type: 'user/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  onResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();
    this.dispatch({
      type: 'user/fetch',
      search: {},
      pagination: {},
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (err) {
        return;
      }

      let roleIDs = '';
      if (values.role_ids) {
        roleIDs = values.role_ids.map(v => v.role_id).join(',');
      }
      this.dispatch({
        type: 'user/fetch',
        search: {
          ...values,
          role_ids: roleIDs,
        },
        pagination: {},
      });
      this.clearSelectRows();
    });
  };

  onDataFormSubmit = data => {
    this.dispatch({
      type: 'user/submit',
      payload: data,
    });
    this.clearSelectRows();
  };

  onDataFormCancel = () => {
    this.dispatch({
      type: 'user/changeFormVisible',
      payload: false,
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  renderDataForm() {
    return <UserCard onCancel={this.onDataFormCancel} onSubmit={this.onDataFormSubmit} />;
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearchFormSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Username">
              {getFieldDecorator('user_name')(<Input placeholder="Username" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Real name">
              {getFieldDecorator('real_name')(<Input placeholder="Real name" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Role">{getFieldDecorator('role_ids')(<RoleSelect />)}</Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="User status">
              {getFieldDecorator('status', { initialValue: '0' })(
                <Radio.Group>
                  <Radio value="0">All</Radio>
                  <Radio value="1">Normal</Radio>
                  <Radio value="2">Disable</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  Query
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.onResetFormClick}>
                  Reset
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      user: {
        data: { list, pagination },
      },
    } = this.props;

    const { selectedRows, selectedRowKeys } = this.state;
    const columns = [
      {
        title: 'User Name',
        dataIndex: 'user_name',
      },
      {
        title: 'actual name',
        dataIndex: 'real_name',
      },
      {
        title: 'Role Name',
        dataIndex: 'roles',
        render: val => {
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
        title: 'User status',
        dataIndex: 'status',
        render: val => {
          if (val === 1) {
            return <Badge status="success" text="Enable" />;
          }
          return <Badge status="error" text="Disable" />;
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
      },
      {
        title: 'Creation time',
        dataIndex: 'created_at',
        render: val => <span>{formatDate(val, 'YYYY-MM-DD HH:mm')}</span>,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span>Total {total}</span>,
      ...pagination,
    };

    return (
      <PageHeaderWrapper title="Manage Users">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator}>
              {/* <PButton code="add" icon="plus" type="primary" onClick={() => this.onAddClick()}>
                New
              </PButton>
              {selectedRows.length === 1 && [
                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  Edit
                </PButton>,
                <PButton
                  key="del"
                  code="del"
                  icon="delete"
                  type="danger"
                  onClick={() => this.onItemDelClick(selectedRows[0])}
                >
                  Delete
                </PButton>,
                selectedRows[0].status === 2 && (
                  <PButton
                    key="enable"
                    code="enable"
                    icon="check"
                    onClick={() => this.onItemEnableClick(selectedRows[0])}
                  >
                    Enable
                  </PButton>
                ),
                selectedRows[0].status === 1 && (
                  <PButton
                    key="disable"
                    code="disable"
                    icon="stop"
                    type="danger"
                    onClick={() => this.onItemDisableClick(selectedRows[0])}
                  >
                    Disable
                  </PButton>
                ),
              ]} */}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.handleTableSelectRow,
                }}
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                onChange={this.onTableChange}
                size="small"
              />
            </div>
          </div>
        </Card>
        {this.renderDataForm()}
      </PageHeaderWrapper>
    );
  }
}

export default User;
