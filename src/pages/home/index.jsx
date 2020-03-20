import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'dva';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import LeftSidebar from './components/LeftSidebar';
import styles from './style.less';
import FutureImage from '../../assets/background-thumb900.jpg';
import Articles from './components/Articles';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
      payload: {
        count: 20,
      },
    });
  }

  render() {
    const {
      home: { list = [] },
      loading,
    } = this.props;
    const cardList = ({ match }) => list && (
      
      [<List
        rowKey="id"
        loading={loading}
        grid={{
          gutter: 24,
          xl: 4,
          lg: 4,
          md: 4,
          sm: 2,
          xs: 1,
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={<Link to={{
                  pathname: `/articles/${item.id}`,
                  state: item
                }}>{item.title}</Link>}
                description={
                  <Paragraph
                    className={styles.item}
                    ellipsis={{
                      rows: 2,
                    }}
                  >
                    {item.subDescription}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="small">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={getKey(item.id, i)}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
            </List.Item>
        )}
      />]
    );
    const formItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    return (
      <Router>
          <div className={styles.coverCardList}>
          <LeftSidebar />
          <div class="featured-image-holder">
            <div class="featured-post-image">
              <img src={FutureImage} />
            </div>
          </div>
          <div class="container grid-post">
          <Switch>
            <Route path='/articles' component={Articles} />
            <Route path='/' component={cardList} />
          </Switch>
            {/* <div className={styles.cardList}>{cardList}</div> */}
          </div>
        </div>
      </Router>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange({ dispatch }) {
    dispatch({
      type: 'home/fetch',
      payload: {
        count: 12,
      },
    });
  },
})(Home);
export default connect(({ home, loading }) => ({
  home,
  loading: loading.models.home,
}))(WarpForm);
