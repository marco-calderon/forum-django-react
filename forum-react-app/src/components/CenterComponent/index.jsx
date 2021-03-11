import React from 'react';
import PostComponent from '../PostComponent';
import PropTypes from 'prop-types';

import { Container } from './styles';

const CenterComponent = ({ posts, menuToggled }) => {
  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <Container menuToggled={menuToggled}>
      {posts && posts.map(p => (
        <PostComponent key={p.id} data={p} />
      ))}
    </Container>
  );
};

CenterComponent.props = {
  menuToggled: PropTypes.bool
};

CenterComponent.defaultProps = {
  menuToggled: false
};

export default CenterComponent;
