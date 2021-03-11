import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { useMutation, useQuery, gql } from '@apollo/client';
import {
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import { Card, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReplyComponent from '../../components/ReplyComponent';
import CreateReplyComponent from '../../components/CreateReplyComponent';
import { MultiLine } from '../../styles/multiline';
import useAuth from '../../services/useAuth';
import Icon from '@mdi/react';
import { mdiCommentQuestion } from '@mdi/js';

const POST_BY_ID = gql`
  query ($id: Int!) {
    postById(id: $id) {
      id, title, content, upvotes, downvotes, createdDate, isAnswered,
      selectedAnswer { id },
      category { id, name },
      answers { id, content, creator { id, username }, createdDate, upvotes, downvotes },
      creator { id, username }
    }
  }
`;

const ADD_REPLY = gql`
  mutation ($content: String!, $postId: Int!){
    createAnswer(content: $content, postId: $postId) {
      answer { id, content, creator { id, username }, createdDate, upvotes, downvotes }
    }
  }
`;

const SET_ANSWERED_POST = gql`
  mutation ($postId: Int!, $answerId: Int!) {
    answerPost(postId: $postId, answerId: $answerId) {
      answer { id },
      post { id }
    }
  }
`;

const PostPage = () => {
  const auth = useAuth();
  const [owner, setOwner] = useState(false);
  const [willReply, setWillReply] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const { data } = useQuery(POST_BY_ID, { 
    variables: {
      id
    }
  });

  const [addReply] = useMutation(ADD_REPLY, {
    refetchQueries: [
      {
        query: POST_BY_ID, variables: {
          id
        }
      }
    ]
  });
  
  const [answerPost] = useMutation(SET_ANSWERED_POST, {
    refetchQueries: [{
      query: POST_BY_ID,
      variables: {
        id
      }
    }]
  });

  useEffect(() => {
    if (auth.isLoggedIn()) {
      auth.getUser().then((user) => {
        if (data && data.postById && user.id === data.postById.creator.id) {
          setOwner(true);
        }
      });
    }
  }, [auth, data]);

  if (!data) {
    return <p>Loading...</p>
  }

  const handleOnReply = () => {
    if (auth.isLoggedIn()) {
      setWillReply(true);
    }
    else {
      history.push('/login');
    }
  }

  const handleSubmitReply = (content) => {
    addReply({
      variables: { content, postId: id }
    });
  }

  const handleSetAnsweredPost = (answerId) => {
    answerPost({
      variables: {
        postId: id,
        answerId
      }
    });
  }

  const { title, content, answers, category, isAnswered, selectedAnswer } = data.postById;

  return (
    <Container className="container">
      <Row>
        <div className="col-12">
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/forum">Home</Link></li>
              <li className="breadcrumb-item"><Link to={`/forum/category/${category.id}`}>{ category.name }</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{ title }</li>
            </ol>
          </nav>
        </div>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <div className="row">
              <h1>{ title }</h1>  
            </div>
            <div className="row">
              <MultiLine>{ content }</MultiLine>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={handleOnReply}>Reply</Button>
            {isAnswered && <Button variant="success" className="mx-2" onClick={handleOnReply}>Go to solution</Button>}
          </Card.Footer>
        </Card>
      </Row>
      { willReply && <Row><CreateReplyComponent submitReply={handleSubmitReply} onCancel={() => setWillReply(false)} /></Row> }
      <Row>
        <h3>Replies</h3>
        {answers && answers.length > 0 && (
          <Card>
            <Card.Body className="m-0 p-0">
              {answers.map(a => (
                <ReplyComponent key={a.id}
                  data={a}
                  setSelectedAnswer={handleSetAnsweredPost}
                  isSelectedAnswer={isAnswered && a.id === selectedAnswer.id}
                  markSolutionButton={owner && !isAnswered}
                />
              ))}
            </Card.Body>
          </Card>
        )}
        {answers && answers.length === 0 && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="alert alert-secondary w-50 text-center my-3 p-4">
              <Icon className="text-info mb-3" path={mdiCommentQuestion} size={2} />
              <h4 className="alert-heading">No replies found</h4>
              <p>Be the first to answer!</p>
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default PostPage;
