import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="adminandaccountandsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="adminandaccountandsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="adminandaccountandsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'adminandaccountandsettings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'adminandaccountandsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="adminandaccountandsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'adminandaccountandsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'adminandaccountandsettings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="adminandaccountandsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'adminandaccountandsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'adminandaccountandsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="adminandaccountandsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'adminandaccountandsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'adminandaccountandsettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="adminandaccountandsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'adminandaccountandsettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'adminandaccountandsettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="adminandaccountandsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

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

export default SecurityView;
