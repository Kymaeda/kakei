import { gql, useQuery } from 'urql';
import { calcPercentage, sumAmountByKind } from "../services/budget";
import type { Budget } from "../types/budget";
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export const BudgetTable = (): JSX.Element => {
  const BudgetQuery = gql`
    query {
      budget {
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

  const [result] = useQuery({
    query: BudgetQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const budget: Budget = data.budget;

  const sumAmountForChart = sumAmountByKind({
    budgetAmount: budget.amount,
    budgetItems: budget.budgetItems,
  });

  // TODO: コンポーネントに切り出す？
  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartData = {
    labels: [...sumAmountForChart.keys()],
    datasets: [
      {
        label: "%",
        data: [...sumAmountForChart.values()],
        backgroundColor: ["#e6b8af", "#d9ead3", "#c9daf8", "#d9d2e9"],
      },
    ],
  };

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
                  <TableCell>{budgetItem.kind}</TableCell>
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
        <Pie data={chartData} />
      </Grid>
    </Grid>
  );
};
