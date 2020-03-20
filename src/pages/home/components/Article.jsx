import React from 'react';

const Article = ({ location }) => (
  <div>
    <h1>{location.state.title}</h1>
    <p>{location.state.content}</p>
    <img src={location.state.cover}/>
  </div>
)

export default Article;