import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => (
  <div className={styles.tabs_account}>
    <div class="components-tabs-account">
        <a class={styles.tabs} href="/admin/system/internationalization"><Icon type="flag" /> Languages</a>
        <a class={styles.tabs} href="/admin/system/countries"><Icon type="global" /> Countries</a>
    </div>
  </div>
);
