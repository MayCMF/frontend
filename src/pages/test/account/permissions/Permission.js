import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Radio, Modal, Layout, Tree, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import PButton from '@/components/PermButton';
import PermissionCard from './PermissionCard';

import styles from './Permission.less';

@connect(({ permissions, loading }) => ({
  permissions,
  loading: loading.models.permissions,
}))
@Form.create()
class Permission extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    treeSelectedKeys: [],
  };

  componentDidMount() {
    this.dispatch({
      type: 'permissions/fetchTree',
    });

    this.dispatch({
      type: 'permissions/fetch',
      search: {},
      pagination: {},
    });
  }

  handleEditClick = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    const item = selectedRows[0];
    this.dispatch({
      type: 'permissions/loadForm',
      payload: {
        type: 'E',
        id: item.record_id,
      },
    });
  };

  handleAddClick = () => {
    this.dispatch({
      type: 'permissions/loadForm',
      payload: {
        type: 'A',
      },
    });
  };

  handleDelClick = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    const item = selectedRows[0];
    Modal.confirm({
      title: `Are you sure to delete [permission data: ${item.name}]？`,
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

  onTableChange = pagination => {
    this.dispatch({
      type: 'permissions/fetch',
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
      type: 'permissions/fetch',
      search: { parent_id: this.getParentID() },
      pagination: {},
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.dispatch({
        type: 'permissions/fetch',
        search: {
          ...values,
          parent_id: this.getParentID(),
        },
        pagination: {},
      });
      this.clearSelectRows();
    });
  };

  handleFormSubmit = data => {
    this.dispatch({
      type: 'permissions/submit',
      payload: data,
    });
    this.clearSelectRows();
  };

  handleFormCancel = () => {
    this.dispatch({
      type: 'permissions/changeFormVisible',
      payload: false,
    });
  };

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

  getParentID = () => {
    const { treeSelectedKeys } = this.state;
    let parentID = '';
    if (treeSelectedKeys.length > 0) {
      [parentID] = treeSelectedKeys;
    }
    return parentID;
  };

  handleDelOKClick(id) {
    this.dispatch({
      type: 'permissions/del',
      payload: { record_id: id },
    });
    this.clearSelectRows();
  }

  renderDataForm() {
    return <PermissionCard onCancel={this.handleFormCancel} onSubmit={this.handleFormSubmit} />;
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item} />;
    });

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearchFormSubmit} layout="inline">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="Permission name">
              {getFieldDecorator('name')(<Input placeholder="Please enter" />)}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Hidden state">
              {getFieldDecorator('hidden', {
                initialValue: '-1',
              })(
                <Radio.Group>
                  <Radio value="-1">All</Radio>
                  <Radio value="0">Display</Radio>
                  <Radio value="1">Hide</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
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
      permissions: {
        data: { list, pagination },
        treeData,
        expandedKeys,
      },
    } = this.props;

    const { selectedRowKeys } = this.state;

    const columns = [
      {
        title: 'Permission name',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: 'Sort value',
        dataIndex: 'sequence',
        width: 100,
      },
      {
        title: 'Hidden state',
        dataIndex: 'hidden',
        width: 100,
        render: val => {
          let title = 'Display';
          if (val === 1) {
            title = 'Hide';
          }
          return <span>{title}</span>;
        },
      },
      {
        title: 'Permission icon',
        dataIndex: 'icon',
        width: 100,
      },
      {
        title: 'Access routing',
        dataIndex: 'router',
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span>共{total}条</span>,
      ...pagination,
    };

    const breadcrumbList = [{ title: 'System Management' }, { title: 'Permission management', href: '/system/permissions' }];

    return (
      <PageHeaderWrapper>
        <Layout>
          <Layout.Sider
            width={200}
            style={{ background: '#fff', borderRight: '1px solid lightGray' }}
          >
            <Tree
              expandedKeys={expandedKeys}
              onSelect={keys => {
                this.setState({
                  treeSelectedKeys: keys,
                });

                const {
                  permissions: { search },
                } = this.props;

                const item = {
                  parentID: '',
                };

                if (keys.length > 0) {
                  [item.parentID] = keys;
                }

                this.dispatch({
                  type: 'permissions/fetch',
                  search: { ...search, ...item },
                  pagination: {},
                });
              }}
              onExpand={keys => {
                this.dispatch({
                  type: 'permissions/saveExpandedKeys',
                  payload: keys,
                });
              }}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Layout.Sider>
          <Layout.Content>
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
                <div className={styles.tableListOperator}>


                </div>
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
            </Card>
          </Layout.Content>
        </Layout>
        {this.renderDataForm()}
      </PageHeaderWrapper>
    );
  }
}

export default Permission;
