import { Provider } from 'urql';
import { client } from '../services/graphql';
import { Layout } from './Layout';
import { BudgetTable } from './BudgetTable';

export const TopContainer = (): JSX.Element => {
  return (
    <Provider value={client}>
      <Layout>
        {/* TODO: Suspenseする */}
        <BudgetTable />
      </Layout>
    </Provider>
  );
};
