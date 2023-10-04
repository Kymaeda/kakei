import { Client, cacheExchange, fetchExchange } from 'urql';
import { getToken } from './token';

export const client = new Client({
  url: 'http://localhost:3000/graphql',
  // suspense: true,
  exchanges: [cacheExchange, fetchExchange],
  // HACK: grapql_controllerで、protect_from_forgery with: :null_sessionを設定しているので、不要かもしれない
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
