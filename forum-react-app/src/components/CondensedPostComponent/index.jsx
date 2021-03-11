import React from 'react';

import { Container } from './styles';

const CondensedPostComponent = ({ data }) => {
  const { id, title, createdDate, rating, upvotes, downvotes } = data;
  return (
    <Container className="mb-2">
      <p className="mb-0">{ title }</p>
      <small>{ createdDate }</small>
    </Container>
  );
};

export default CondensedPostComponent;
