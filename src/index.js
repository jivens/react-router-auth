import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-boost';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/api'
  })
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('TOKEN')
    return {
      headers: {
        ...headers,
        token: token ? `Bearer ${token}` : ''
      }
    }
  })
  
  const wsLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('TOKEN')
    return {
      headers: {
        ...headers,
        token: token ? `Bearer ${token}` : ''
      }
    }
  })
  
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink.concat(httpLink),
    authLink.concat(httpLink)
  )
  
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  })

ReactDOM.render(
    <App client={client} />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
