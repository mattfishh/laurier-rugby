import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://eco-azimuth-275417.ue.r.appspot.com/graphql',
});

export default client;