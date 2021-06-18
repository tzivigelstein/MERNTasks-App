import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://192.168.0.10:4000',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloConfig = {
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
};

const client = new ApolloClient(apolloConfig);

export default client;
