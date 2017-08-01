require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = localStorage.getItem('id_token');
    req.options.headers.authorization = token ?  token : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
