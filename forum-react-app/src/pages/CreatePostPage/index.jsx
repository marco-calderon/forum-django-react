import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MarkdownEditorComponent from '../../components/MarkdownEditorComponent';
import { Container } from './styles';

const GET_CATEGORIES = gql`
  {
    allCategories {
      id
      name
    }
  }
`;

const CREATE_POST = gql`
  mutation ($id: Int!, $title: String!, $content: String!) {
    createPost(categoryId: $id, title: $title, content: $content) {
      post {
        id
      }
    }
  }
`;

const CreatePostPage = () => {
  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const history = useHistory();
  const [value, setValue] = useState('');
  const { data } = useQuery(GET_CATEGORIES);
  const [createPost, postData] = useMutation(CREATE_POST);

  if (!data) {
    return <p>Loading...</p>
  }

  const handleOnCreatePost = async () => {
    const response = await createPost({
      variables: {
        id: categoryRef.current.value,
        title: titleRef.current.value,
        content: value
      }
    });
    if (response) {
      history.push(`/forum/post/${response.data.createPost.id}`);
    }
  }

  return (
    <Container className="container">
      <Row>
        <h1>Create new post</h1>
      </Row>
      <Card>
        <Card.Body>
          <Row>
            <div className="col-12">
              <h6>Category</h6>
              <fieldset className="form-group">
                <select ref={categoryRef} className="form-select">
                  {data && data.allCategories?.map(c => <option key={c.id} value={c.id}>{ c.name }</option>)}
                </select>
              </fieldset>
            </div>
          </Row>
          <Row>
            <Col sm={12}>
              <h6>Title</h6>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="form-group">
                <input ref={titleRef} type="text" className="form-control" placeholder="Post title" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h6>Content</h6>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <MarkdownEditorComponent value={value} onChange={setValue} />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <div className="d-flex align-items-end">
              <Button variant="primary" onClick={handleOnCreatePost}>Create post</Button>
            </div>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CreatePostPage;
