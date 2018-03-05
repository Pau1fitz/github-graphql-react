import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = props => {
  console.log(props)
  return (
    <div>
      Test
    </div>
  );
}

export default graphql(gql`
  query user {
    viewer {
      login
    }
  }
`)(App);
