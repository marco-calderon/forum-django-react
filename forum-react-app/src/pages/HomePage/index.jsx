import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CategoryComponent from '../../components/CategoryComponent';

const ALL_CATEGORIES = gql`
  query {
    allCategories {
      id, name, description, posts { id, title, content, createdDate }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(ALL_CATEGORIES);
  return (
    <div className="container">
      <div className="row">
        <h1>Home</h1>
      </div>
      <div className="row">
        {loading && <p>Loading...</p>}
        {error && <p>There was an error retrieving data.</p>}
        {data && data.allCategories.map(c => <CategoryComponent key={c.id} data={c} />)}
      </div>
    </div>
  );
}

export default HomePage;
