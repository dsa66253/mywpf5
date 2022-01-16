import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProfileProvider } from "./Hooks/useProfile";
// Create an http link:

const url = new URL("/graphql", window.location.href);

const port = process.env.PORT || 5000;
// Create an http link:
const httpLink = new HttpLink({
  uri: url.href,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: url.href.replace("http", "ws"),
  options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
