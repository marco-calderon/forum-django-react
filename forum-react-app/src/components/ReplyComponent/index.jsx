import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiCheck, mdiCheckCircleOutline, mdiChevronUp as UpIcon } from '@mdi/js';
import { mdiChevronDown as DownIcon } from '@mdi/js';
import { Container, Content, Footer } from './styles';
import { MultiLine } from '../../styles/multiline';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const ReplyComponent = ({ data, setSelectedAnswer, isSelectedAnswer, markSolutionButton }) => {
  const { id, content, creator, createdDate, upvotes, downvotes } = data;

  return (
    <Container className="d-flex mb-2">
      <div className="flex-column">
        <div className="btn btn-sm d-flex align-items-center">
          <Icon path={UpIcon} size={1.5} />
          { upvotes }
        </div>
        <div className="btn btn-sm d-flex align-items-center">
          <Icon path={DownIcon} size={1.5} />
          { downvotes }
        </div>
      </div>
      <Content className="flex-grow-1">
        {isSelectedAnswer && (
          <div className="d-flex justify-content-start">
            <div class="alert alert-success d-flex align-items-center">
              <Icon path={mdiCheckCircleOutline} size={1} />
              &nbsp;
              <span>Selected answer</span>
            </div>
          </div>
        )}
        <MultiLine>{ content }</MultiLine>
        <Footer className="d-flex">
          <div className="mx-2">
            { creator.username }
          </div>
          <p>on { createdDate}</p>
        </Footer>
        {markSolutionButton && (
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={() => setSelectedAnswer(id)}>
              <Icon path={mdiCheck} size={1} />&nbsp;
              Mark as solution
            </Button>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default ReplyComponent;
