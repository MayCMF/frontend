import React, { PureComponent } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { newUUID } from '@/utils/utils';
import { EditableCell, EditableFormRow } from './EditableCell';

import styles from './index.less';

function fillKey(data) {
  if (!data) {
    return [];
  }
  return data.map(item => {
    const nitem = { ...item };
    if (!nitem.key) {
      nitem.key = newUUID();
    }
    return nitem;
  });
}

export default class MenuAction extends PureComponent {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Action number',
        dataIndex: 'code',
        editable: true,
        width: '40%',
      },
      {
        title: 'Action name',
        dataIndex: 'name',
        editable: true,
        width: '45%',
      },
      {
        title: 'Operating',
        dataIndex: 'key',
        width: '10%',
        render: (_, record) => {
          const { dataSource } = this.state;
          if (dataSource.length === 0) {
            return null;
          }
          return (
            <Popconfirm title="Are you sure you want to delete this data?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          );
        },
      },
    ];

    this.state = {
      dataSource: fillKey(props.value),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return {
        ...state,
        dataSource: fillKey(nextProps.value),
      };
    }
    return state;
  }

  handleDelete = key => {
    const { dataSource } = this.state;
    const data = dataSource.filter(item => item.key !== key);
    this.setState({ dataSource: data }, () => {
      this.triggerChange(data);
    });
  };

  handleAddTpl = () => {
    const tplData = [
      {
        code: 'add',
        name: 'New',
      },
      {
        code: 'edit',
        name: 'Edit',
      },
      {
        code: 'del',
        name: 'Delete',
      },
      {
        code: 'query',
        name: 'Query',
      },
    ];

    const newData = tplData.map(v => ({ key: v.code, ...v }));

    const { dataSource } = this.state;
    const data = [...dataSource];
    for (let i = 0; i < newData.length; i += 1) {
      let exists = false;
      for (let j = 0; j < dataSource.length; j += 1) {
        if (dataSource[j].key === newData[i].key) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        data.push(newData[i]);
      }
    }

    this.setState(
      {
        dataSource: data,
      },
      () => {
        this.triggerChange(data);
      }
    );
  };

  handleAdd = () => {
    const { dataSource } = this.state;
    const item = {
      key: newUUID(),
      code: '',
      name: '',
    };
    const data = [...dataSource, item];
    this.setState(
      {
        dataSource: data,
      },
      () => {
        this.triggerChange(data);
      }
    );
  };

  handleSave = row => {
    const { dataSource } = this.state;
    const data = [...dataSource];
    const index = data.findIndex(item => row.key === item.key);
    const item = data[index];
    data.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: data }, () => {
      this.triggerChange(data);
    });
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className={styles.tableList}>
        <div className={styles.tableListOperator}>
          <Button onClick={this.handleAdd} size="small" type="primary">
            New
          </Button>
          <Button onClick={this.handleAddTpl} size="small" type="primary">
            Using templates
          </Button>
        </div>
        <Table
          rowKey={record => record.key}
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}
