import { Icon, Tag } from 'antd';
import Link from 'umi/link';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import logo from '../../../../assets/logo.svg';

class LeftSidebar extends Component {
  static defaultProps = {
    hideCheckAll: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value || props.defaultValue || [],
    };
  }
  handleActiveMenu = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const { open } = this.state;
    const { className, style = {} } = this.props;
    
    const clOverlay = classNames(styles.overlay, className, {
      [styles.active]: open,
    });
    const clSidebar = classNames(styles.sidebar, className, {
      [styles.active]: open,
    });
    const clToggle = classNames(styles.toggle, className, {
      [styles.on]: open,
    });
    const clRightPart = classNames(styles.menu_right_part, className, {
      [styles.active]: open,
    });
    return (
      <div id="sidebar" className={clSidebar} style={style}>
      <div className={clOverlay} style={style}></div>
        <div class={styles.menu_left_part}>
        <div className={styles.site_info_holder}>
            <h1 className={styles.site_title}>MayCMF</h1>
            <p className={styles.site_description}>
            Serverless CMF with Full Rest API. Flexible server framework written in Go.
            </p>
        </div>
        <nav class="header-main-menu collapse navbar-collapse navbar-right">
            <ul class="main-menu sm sm-clean">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/articles'>Articles</Link>
              </li>
            </ul>
        </nav>
          <DefaultFooter
            copyright="2019 May CMF"
            className={styles.footer}
            links={[
              {
                key: 'May CMF',
                title: 'May CMF',
                href: 'https://maycmf.github.io',
                blankTarget: true,
                class: 'site-footer',
              },
              {
                key: 'github',
                title: <Icon type="github" />,
                href: 'https://github.com/MayCMF/',
                blankTarget: true,
              },
              {
                key: 'Ivan Fesiuk',
                title: 'Ivan Fesiuk',
                href: 'https://eneus.github.io',
                blankTarget: true,
              },
            ]}
          />
        </div>
        <div className={clRightPart} style={style}>
          <div class={styles.logo_holder}>
            <Link to="/">
              <div class={styles.logo_holder}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>MayCMF</span>
              </div>
            </Link>
          </div>
          <div class="toggle-holder" onClick={this.handleActiveMenu}>
            <div className={clToggle} style={style} >
              <div class={styles.menu_line}></div>
            </div>
          </div>
          <div class="social-holder">
              <div className={styles.social_list}>
                
              </div>
          </div>
          <div class="fixed scroll-top">
              <a href="#" class="btn"></a>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
