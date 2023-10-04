import { gql, useQuery } from 'urql';
import { calcPercentage } from '../services/budget';
import { Budget } from '../types/budget';
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

export const BudgetTable = () => {
  // TODO: 取得するBudgetデータの指定を動的にする
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

  // TODO: railsに、enum_help入れて、翻訳された情報を取得する
  const kindName = (kind: string) => {
    switch (kind) {
      case 'FIXED':
        return '固定費';
      case 'VARIABLES':
        return '変動費';
      case 'INVESTMENTS':
        return '自己投資';
      case 'SAVINGS':
        return '貯蓄・投資';
      default:
        return '';
    }
  }

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
                <TableCell>項目</TableCell>
                <TableCell>種別</TableCell>
                <TableCell>銀行口座</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>割合</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budget.budgetItems.map((budgetItem) => (
                <TableRow key={budgetItem.id}>
                  <TableCell>{budgetItem.name}</TableCell>
                  <TableCell>{kindName(budgetItem.kind)}</TableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell>{budgetItem.amount}</TableCell>
                  <TableCell>
                    {calcPercentage(budget.amount, budgetItem.amount)}%
                  </TableCell>
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
