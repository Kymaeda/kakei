import { gql, useQuery } from 'urql';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';

const budgetAmount = 350000;
// TODO: serviceに切り出す
const calcPercentage = (amount: number, floorSize: number = 1) => {
  let parts = (amount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};

// TODO: GraphQLから取得するようにする
type Budget = {
  id: number;
  startedAt: Date;
  finishedAt: Date;
  amount: number;
  budgetItems: BudgetRow[];
};
type BudgetRow = {
  id: number;
  name: string;
  kind: string;
  account: string;
  amount: number;
  bankAccount: BankAccount;
};
type BankAccount = {
  id: number;
  name: string;
}

const sampleData = {
  rows: [
    {
      id: 1,
      name: '住居費',
      kind: '固定費',
      account: 'みずほ',
      amount: 87000,
    },
    {
      id: 2,
      name: '食費',
      kind: '変動費',
      account: '住信SBI(代表)',
      amount: 30000,
    },
    {
      id: 3,
      name: '交際/趣味',
      kind: '自己投資',
      account: '住信SBI(代表)',
      amount: 10000,
    },
    {
      id: 4,
      name: '特別費積立',
      kind: '貯蓄・投資',
      account: '住信SBI(目的)',
      amount: 63000,
    },
  ],
};

const labels = {
  name: '項目',
  kind: '種別',
  account: '管理口座',
  amount: '金額',
  percentage: '割合',
};

export const BudgetTable = () => {
  const BudgetQuery = gql`
    query {
      budget(id: 1) {
        id
        startedAt
        finishedAt
        amount
        budgetItems {
          id
          name
          kind
          amount
          bankAccount {
            id
            name
          }
        }
      }
    }
  `;

  const [result, reexecuteQuery] = useQuery({
    query: BudgetQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const budget: Budget = data.budget;

  return (
    <Grid container spacing={3}>
      {/* Budget Detail Table */}
      <Grid item xs={12} md={8} lg={9}>
        <TableContainer
          component={Paper}
          sx={{ m: 5 }}
          aria-label="simple table"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{labels.name}</TableCell>
                <TableCell>{labels.kind}</TableCell>
                <TableCell>{labels.account}</TableCell>
                <TableCell>{labels.amount}</TableCell>
                <TableCell>{labels.percentage}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budget.budgetItems.map((budgetItem) => (
                <TableRow key={budgetItem.id}>
                  <TableCell>{budgetItem.name}</TableCell>
                  <TableCell>{budgetItem.kind}</TableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell>{budgetItem.amount}</TableCell>
                  <TableCell>{calcPercentage(budgetItem.amount)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        {/* ここに円グラフを入れる予定 */}
      </Grid>
    </Grid>
  );
};
