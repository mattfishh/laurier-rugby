import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://0.0.0.0:5433/graphql',
});

export default client;