import React, { useState } from 'react';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';

const CategoryComponent = ({ data }) => {
  const history = useHistory();
  const { id, name, description, posts } = data;

  const handleOnTitleClick = () => {
    history.push('/forum/category/' + id);
  }

  return (
    <Container className="card" onClick={handleOnTitleClick}>
      <div className="card-body">
        <h3>{ name }</h3>
        <p>{ description }</p>
        <hr />
        <div className="row">
          <h4>Posts: { posts.length }</h4>
        </div>
      </div>
    </Container>
  );
}

export default CategoryComponent;
