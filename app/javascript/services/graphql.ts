import { Client, cacheExchange, fetchExchange } from 'urql';

const metaTag = document.querySelector("meta[name='csrf-token']");
let token: string;

if (!metaTag) {
  throw new Error('CSRF token not found: ページを再読み込みしてください');
} else {
  token = metaTag.getAttribute('content') || '';
}

export const client = new Client({
  url: 'http://localhost:3000/graphql',
  // suspense: true,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
