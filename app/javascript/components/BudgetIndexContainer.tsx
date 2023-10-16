import { Provider } from "urql";
import { client } from "../services/graphql";
import { Layout } from "./Layout";
import { BudgetList } from "./BudgetList";

export const BudgetIndexContainer = (): JSX.Element => {
  return (
    <Provider value={client}>
      <Layout>
        <BudgetList />
      </Layout>
    </Provider>
  );
};
