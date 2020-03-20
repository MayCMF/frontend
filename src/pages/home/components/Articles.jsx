import React from 'react';
import {Route, Link} from 'react-router-dom';

import Article from './Article';

const Articles = ({ match }) => (
  <div> 

    <Route path={`${match.path}/:id`} component={Article} />
  </div>
);

export default Articles;