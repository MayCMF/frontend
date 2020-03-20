import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Input,
  Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import StandardTable from './components/StandardTable';
import styles from './style.less';
import AccountTabs from '../components/AccountTabs';
const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['Closed', 'Running', 'Live', 'Exception'];
/* eslint react/no-multi-comp:0 */

@connect(({ permissions, loading }) => ({
  permissions,
  loading: loading.models.permissions,
}))
class TableList extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
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
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
        ...this.getColumnSearchProps('name'),
    },
    {
      title: 'Anonymous',
      dataIndex: 'callNo',
      render: val => `${val}`,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'permissions/fetch',
    });
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  renderForm() {
    return (
      <div>
        <Row gutter={{ md: 24, lg: 24, xl: 48, }}>
          <Col md={24} sm={24}>
          Permissions let you control what users can do and see on your site. You can define a specific set of permissions for each role. (See the Roles page to create a role.) Any permissions granted to the Authenticated user role will be given to any user who is logged in to your site. From the Account settings page, you can make any role into an Administrator role for the site, meaning that role will be granted all new permissions automatically. You should be careful to ensure that only trusted users are given this access and level of control of your site.<p/>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const {
      permissions: { data },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper>
        <AccountTabs />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
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

export default Form.create()(TableList);
