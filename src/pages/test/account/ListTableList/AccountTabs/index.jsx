import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => (
  <div className={styles.tabs_account}>
    <div class="components-tabs-account">
        <a class={styles.tabs} href="#"><Icon type="usergroup-add" /> People</a>
        <a class={styles.tabs} href="#"><Icon type="android" /> Roles</a>
        <a class={styles.tabs} href="#"><Icon type="apple" /> Permissions</a>
    </div>
  </div>
);
