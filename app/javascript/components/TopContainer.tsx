import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { Layout } from './Layout';
import { BudgetTable } from './BudgetTable';

export const TopContainer = () => {
  const metaTag = document.querySelector("meta[name='csrf-token']")
  let token: string;

  // TODO: serviceに切り出す
  if (!metaTag) {
    throw new Error('CSRF token not found: ページを再読み込みしてください');
  } else {
    token = metaTag.getAttribute('content') || '';
  }

  const client = new Client({
    url: 'http://localhost:3000/graphql',
    // suspense: true,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      };
    },
  });

  return (
    <Provider value={client}>
      <Layout>
        <BudgetTable />
      </Layout>
    </Provider>
  );
};
