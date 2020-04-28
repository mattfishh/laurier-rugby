import ApolloClient from 'apollo-boost';

console.log(process.env.REACT_APP_PRODUCTION_GRAPHQL_ENDPOINT)

const client = new ApolloClient({
  uri: process.env.REACT_APP_PRODUCTION_GRAPHQL_ENDPOINT,
});

export default client;