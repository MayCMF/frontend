import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => (
  <div className={styles.tabs_account}>
    <div class="ant-tabs-nav-wrap">
      <div class="ant-tabs-nav-scroll">
        <div class="ant-tabs-nav ant-tabs-nav-animated">
          <a class="ant-tabs-tab" href="/admin/content"><Icon type="file-text" /> Content</a>
          <a class="ant-tabs-tab" href="/admin/files"><Icon type="file-image" /> Files</a>
        </div>
      </div>
    </div>
  </div>
);
