import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({
          id: 'adminandaccountandsettings.settings.open',
        })}
        unCheckedChildren={formatMessage({
          id: 'adminandaccountandsettings.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.password',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.password-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.messages',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.messages-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.todo',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'adminandaccountandsettings.notification.todo-description',
          },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
