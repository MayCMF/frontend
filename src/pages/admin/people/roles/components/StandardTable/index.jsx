import { Alert, Table } from 'antd';
import React, { Component, Fragment } from 'react';
import styles from './index.less';

function initTotalList(columns) {
  if (!columns) {
    return [];
  }

  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends Component {

  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  render() {
    const { data, rowKey, ...rest } = this.props;
    const { list = [] } = data || {};
    return (
      <div className={styles.standardTable}>
        <Table
          dataSource={list}
          pagination= {false}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
