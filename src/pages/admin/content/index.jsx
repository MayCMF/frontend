import { Badge, Button, Card, Col, DatePicker, Divider, Dropdown, Form, Avatar, Icon, Input,
  InputNumber, Menu, Row, Select, message, } from 'antd';
import React, { Component, Fragment } from 'react';
import Highlighter from 'react-highlight-words';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
// import CreateForm from './components/CreateForm';
import StandardTable from '@/components/StandardTable';
// import UpdateForm from './components/UpdateForm';
import styles from '../style.less';
import content from '@/models/content';
import Tabs from '@/components/Tabs'
const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['error', 'processing', 'error'];
const status = ['0', '1'];
const statusTitle = ['Unpublished', 'Published'];

const contentType = ['page', 'article', 'blog'];
const contentMap = ['0', '1', '2'];
/* eslint react/no-multi-comp:0 */

@connect(state => ({
  loading: state.loading.models.content,
  content: state.content,
}))
class ContentList extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      render: (val) => (
        <Fragment>
          <Avatar shape="square" src={val} />
        </Fragment>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ...this.getColumnSearchProps('title'),
    },
    {
      title: 'Content Type',
      dataIndex: 'type',
      filters: [
        {
          text: contentType[0],
          value: contentType[0],
        },
        {
          text: contentType[1],
          value: contentType[1],
        },
        {
          text: contentType[2],
          value: contentType[2],
        },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: statusTitle[0],
          value: '0',
        },
        {
          text: statusTitle[1],
          value: '1',
        },
      ],

      render(val) {
        return <Badge status={statusMap[val]} text={statusTitle[val]} />;
      },
    },
    {
      title: 'Published',
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
      type: 'content/fetch',
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
      params.sorter = `${sorter.field}_${sorter.title}`;
    }

    dispatch({
      type: 'content/fetch',
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
          type: 'content/remove',
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
          type: 'content/changeStatus',
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
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updated_at: fieldsValue.updated_at && fieldsValue.updated_at.valueOf(),
      };
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
        formValues: values,
      });
      dispatch({
        type: 'content/fetch',
        payload: values,
      });
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onItemEnableClick = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/changeStatus',
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
      type: 'content/add',
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
      type: 'content/update',
      payload: {
        name: fields.title,
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
      content: { data },
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
      <PageHeaderWrapper content=<Tabs />>
        {/* <AccountTabs /> */}
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

export default Form.create()(ContentList);
