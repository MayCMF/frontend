import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import PButton from '@/components/PermButton';
import RoleCard from './RoleCard';

import styles from './Role.less';

@connect(state => ({
  role: state.role,
  loading: state.loading.models.role,
}))
@Form.create()
class Role extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    this.dispatch({
      type: 'role/fetch',
      search: {},
      pagination: {},
    });
  }

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  handleAddClick = () => {
    this.dispatch({
      type: 'role/loadForm',
      payload: {
        type: 'A',
      },
    });
  };

  handleEditClick = item => {
    this.dispatch({
      type: 'role/loadForm',
      payload: {
        type: 'E',
        id: item.record_id,
      },
    });
  };

  handleDelClick = item => {
    Modal.confirm({
      title: `Ayou sure to delete [role data:${item.name}】？`,
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: this.handleDelOKClick.bind(this, item.record_id),
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

  handleTableChange = pagination => {
    this.dispatch({
      type: 'role/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  handleResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();

    this.dispatch({
      type: 'role/fetch',
      search: {},
      pagination: {},
    });
  };

  handleSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (err) {
        return;
      }
      this.dispatch({
        type: 'role/fetch',
        search: values,
        pagination: {},
      });
      this.clearSelectRows();
    });
  };

  handleDataFormSubmit = data => {
    this.dispatch({
      type: 'role/submit',
      payload: data,
    });
    this.clearSelectRows();
  };

  handleDataFormCancel = () => {
    this.dispatch({
      type: 'role/changeFormVisible',
      payload: false,
    });
  };

  handleDelOKClick(id) {
    this.dispatch({
      type: 'role/del',
      payload: { record_id: id },
    });
    this.clearSelectRows();
  }

  renderDataForm() {
    return <RoleCard onCancel={this.handleDataFormCancel} onSubmit={this.handleDataFormSubmit} />;
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearchFormSubmit} layout="inline">
        <Row gutter={16}>
          <Col md={8} sm={24}>
            <Form.Item label="Role Name">
              {getFieldDecorator('name')(<Input placeholder="please enter Role Name" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  Get
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleResetFormClick}>
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
      role: {
        data: { list, pagination },
      },
    } = this.props;

    const { selectedRowKeys, selectedRows } = this.state;

    const columns = [
      {
        title: 'Role Name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: 'Sort value',
        dataIndex: 'sequence',
        width: 100,
      },
      {
        title: 'Role note',
        dataIndex: 'memo',
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span>Total {total}</span>,
      ...pagination,
    };

    const breadcrumbList = [{ title: 'System Management' }, { title: 'Role management', href: '/system/role' }];

    return (
      <PageHeaderWrapper title="Role management" breadcrumbList={breadcrumbList}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator}>

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
                onChange={this.handleTableChange}
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

export default Role;
