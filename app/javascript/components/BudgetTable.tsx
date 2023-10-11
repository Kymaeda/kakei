import { gql, useQuery } from 'urql';
import type { Budget } from "../types/budget";
import { colorsForBudgetKind } from '../utils/colors';
import { BudgetPieChart } from "./BudgetPieChart";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { styled } from "@mui/material/styles";

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
          kindText
          amount
          percentage
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

  const SColoredTableCell = styled(TableCell)<{ kind: string }>(({
    kind,
  }) => {
    return {
      backgroundColor: colorsForBudgetKind[kind],
    };
  });

  return (
    <Grid container spacing={3}>
      {/* Budget Detail Table */}
      <Grid item xs={12} md={7} lg={8}>
        <TableContainer component={Paper} aria-label="simple table">
          <Table>
            <TableHead>
              {/* TODO: themeをつけとって適用できないか？ */}
              <TableRow sx={{ bgcolor: "#0b5394" }}>
                <TableCell sx={{ color: "#ffffff" }}>項目</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>種別</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>銀行口座</TableCell>
                <TableCell sx={{ color: "#ffffff" }} align="right">
                  金額
                </TableCell>
                <TableCell sx={{ color: "#ffffff" }} align="right">
                  割合
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budget.budgetItems.map((budgetItem) => (
                <TableRow key={budgetItem.id}>
                  <TableCell>{budgetItem.name}</TableCell>
                  <SColoredTableCell kind={budgetItem.kind}>
                    {budgetItem.kindText}
                  </SColoredTableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell align="right">
                    {budgetItem.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{budgetItem.percentage}%</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "#0b5394" }}>
                <TableCell sx={{ color: "#ffffff" }} colSpan={3}>
                  合計
                </TableCell>
                <TableCell sx={{ color: "#ffffff" }} align="right">
                  {budget.amount.toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: "#ffffff" }} align="right">
                  100%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              種別ごとの割合
            </Typography>
            <Typography variant="body2" color="text.secondary">
              各種別が、25%になるバランスが理想です。
            </Typography>
            <BudgetPieChart budget={budget} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
