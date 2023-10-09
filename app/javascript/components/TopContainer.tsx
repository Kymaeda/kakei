import { Provider } from 'urql';
import { client } from '../services/graphql';
import { Layout } from './Layout';
import { BudgetTable } from './BudgetTable';

export const TopContainer = (): JSX.Element => {
  return (
    <Provider value={client}>
      <Layout>
        {/* TODO: Suspenseする */}
        {/* TODO: テーブルとチャートが含まれるコンポーネントなので、名称を変更する */}
        <BudgetTable />
      </Layout>
    </Provider>
  );
};
