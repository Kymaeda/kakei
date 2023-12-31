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

  const SColoredKindTableCell = styled(TableCell)<{ kind: string }>(({
    kind,
  }) => {
    return {
      backgroundColor: colorsForBudgetKind[kind],
    };
  });

  const SHeaderTableRow = styled(TableRow)(() => {
    return {
      backgroundColor: "#0b5394",
    };
  });
  const SHeaderTableCell = styled(TableCell)(() => {
    return {
      color: "#ffffff",
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
              <SHeaderTableRow>
                <SHeaderTableCell>項目</SHeaderTableCell>
                <SHeaderTableCell>種別</SHeaderTableCell>
                <SHeaderTableCell>銀行口座</SHeaderTableCell>
                <SHeaderTableCell align="right">金額</SHeaderTableCell>
                <SHeaderTableCell align="right">割合</SHeaderTableCell>
              </SHeaderTableRow>
            </TableHead>
            <TableBody>
              {budget.budgetItems.map((budgetItem) => (
                <TableRow key={budgetItem.id}>
                  <TableCell>{budgetItem.name}</TableCell>
                  <SColoredKindTableCell kind={budgetItem.kind}>
                    {budgetItem.kindText}
                  </SColoredKindTableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell align="right">
                    {budgetItem.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{budgetItem.percentage}%</TableCell>
                </TableRow>
              ))}
              <SHeaderTableRow>
                <SHeaderTableCell colSpan={3}>合計</SHeaderTableCell>
                <SHeaderTableCell align="right">
                  {budget.amount.toLocaleString()}
                </SHeaderTableCell>
                <SHeaderTableCell align="right">100%</SHeaderTableCell>
              </SHeaderTableRow>
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
