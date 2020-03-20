import React, { Component } from 'react';
import styles from "./index.less";
import { Row, Col, Card, Icon, Statistic } from "antd";


class StatisticBlock extends Component {
  render() {
    return ( 
      <div className={styles.container}>
        <div id="component-statistic">
          <div className="statistic">
            <Row gutter={16}>
              <Col className="statistic-row" span={6}>
                <Card hoverable >
                  <a href="/admin/people" className="statistic-box">
                    <Col className="statistic-row" span={6}>
                      <Icon type="user"/>
                    </Col>
                    <Col className="statistic-row" span={18}>
                      <Statistic title="Active Users" value={12} />
                    </Col>
                  </a>
                </Card>
              </Col>
              <Col className="statistic-row" span={6}>
                <Card hoverable >
                  <div className="statistic-box">
                    <Col className="statistic-row" span={6}>
                      <Icon type="file-text" />
                    </Col>
                    <Col className="statistic-row" span={18}>
                      <Statistic title="Posts" value={4960} />
                    </Col>
                  </div>
                </Card>
              </Col>
              <Col className="statistic-row" span={6}>
                <Card hoverable >
                  <div className="statistic-box">
                    <Col className="statistic-row" span={6}>
                      <Icon type="file-image" />
                    </Col>
                    <Col className="statistic-row" span={18}>
                      <Statistic title="Files" value={12753} />
                    </Col>
                  </div>
                </Card>
              </Col>
              <Col className="statistic-row" span={6}>
                <Card hoverable >
                  <div className="statistic-box">
                    <Col className="statistic-row" span={6}>
                      <Icon type="tags" />
                    </Col>
                    <Col className="statistic-row" span={18}>
                      <Statistic title="Tags" value={17456} />
                    </Col>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default StatisticBlock;