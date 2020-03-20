import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => (
  <div className={styles.tabs_account}>
    <div class="components-tabs-account">
        <a class={styles.tabs} href="/admin/people"><Icon type="usergroup-add" /> People</a>
        <a class={styles.tabs} href="/admin/people/roles"><Icon type="file-protect" /> Roles</a>
        <a class={styles.tabs} href="/admin/people/permissions"><Icon type="lock" /> Permissions</a>
    </div>
  </div>
);
