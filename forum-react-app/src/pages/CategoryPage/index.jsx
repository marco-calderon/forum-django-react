import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container } from './styles';
import {
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import PostComponent from '../../components/PostComponent';
import { Button } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { MaxLinesParagraph } from '../../styles/maxLinesParagraph';

const CATEGORY_BY_ID = gql`
  query ($id: Int!) {
    categoryById(id: $id) {
      id, name, description, posts { id,  title, content, createdDate, upvotes, downvotes }
    }
  }
`;

const CategoryPage = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { data } = useQuery(CATEGORY_BY_ID,
    {
      variables: {
        'id': slug
      }
    }
  );
  if (!data) {
    return <p>Loading...</p>
  }

  const handleAddPost = () => {
    history.push('/create');
  }

  const { name, description, posts } = data.categoryById;
  return (
    <Container className="container">
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/forum">Home</Link></li>
          <li className="breadcrumb-item">{ name }</li>
        </ol>
      </nav>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>{ name }</h3>
          <MaxLinesParagraph lines={5}>{ description }</MaxLinesParagraph>
        </div>
        <Button variant="info" onClick={handleAddPost}>
          <Icon path={mdiPlus} size={1}></Icon>
          Add post
        </Button>
      </div>
      <div className="card">
        <div className="card-body p-0">
          {posts && posts.map(p => <PostComponent key={p.id} data={p} />)}
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
