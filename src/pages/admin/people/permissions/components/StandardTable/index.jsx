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
      needTotalList,
    };
  }

  handleTableChange = (filters, sorter, ...rest) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(filters, sorter, ...rest);
    }
  };

  render() {
    const { data, rowKey, ...rest } = this.props;
    const { list = [] } = data || {};
    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'key'}
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
