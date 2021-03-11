import React from 'react';

import { Button, Container, Description, Title, TitleContainer } from './styles';

const TrialComponent = ({ expanded }) => {
  return (
    <Container expanded={expanded}>
      <TitleContainer>
        <Title>Forum Teams</Title>
        <Title>30 Day Free Trial</Title>
      </TitleContainer>
      <Description>Forum Teams is a private, secure spot for you and your coworkers to find and share information.</Description>
      <Button>Learn more</Button>
    </Container>
  );
};

export default TrialComponent;
