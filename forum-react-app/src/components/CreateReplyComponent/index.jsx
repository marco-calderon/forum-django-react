import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useRef, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import MarkdownEditorComponent from '../MarkdownEditorComponent';

const CreateReplyComponent = ({ submitReply, onCancel }) => {
  const [content, setContent] = useState('');
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4>Add your reply</h4>
          <a className="btn-icon" onClick={() => onCancel()}>
            <Icon path={mdiClose} size={1}></Icon>
          </a>
        </div>
      </Card.Header>
      <Card.Body>
        <MarkdownEditorComponent value={content} onChange={setContent} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button variant="success" onClick={() => submitReply(content)}>Submit</Button>
      </Card.Footer>
    </Card>
  );
};

export default CreateReplyComponent;
