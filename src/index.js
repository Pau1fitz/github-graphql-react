import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';

import App from './App'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})
  
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_GITHUBTOKEN}`,
    }
  }
})
  
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );
registerServiceWorker();
