import { useState } from 'react';
import { gql, useQuery } from 'urql';
import type { Budget, BudgetItem } from "../types/budget";
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
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// TODO: 3回呼ばれている(どこかの箇所で再描画が発火している？memoで対応できないか？)
export const BudgetTable = (): JSX.Element => {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[] | null>(null);

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

  if (!budget) {
    setBudget(data.budget);
  }
  if (!budgetItems) {
    setBudgetItems(data.budget.budgetItems);
  }

  if (!budget || !budgetItems) return <p>no data</p>;

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

  const onChangeName = (event: any, index: number): void => {
    const newBudgetItems = budgetItems.map((item, i) => {
      if (i === index) {
        item.name = event.target.value;
      }
      return item;
    });
    setBudgetItems(newBudgetItems);
  };
  const onChangeAmount = (event: any, index: number): void => {
    const newBudgetItems = budgetItems.map((item, i) => {
      if (i === index) {
        console.log(parseInt(event.target.value));
        item.amount = parseInt(event.target.value);
      }
      return item;
    });
    setBudgetItems(newBudgetItems);
  };

  return (
    <Grid container spacing={2}>
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
              {budgetItems.map((budgetItem, index) => (
                <TableRow key={budgetItem.id}>
                  <TableCell>
                    <TextField
                      required
                      defaultValue={budgetItem.name}
                      variant="outlined"
                      size="small"
                      onChange={(event) => {
                        onChangeName(event, index);
                      }}
                    />
                  </TableCell>
                  <SColoredKindTableCell kind={budgetItem.kind}>
                    {budgetItem.kindText}
                  </SColoredKindTableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell align="right">
                    <TextField
                      required
                      defaultValue={budgetItem.amount}
                      variant="outlined"
                      size="small"
                      onChange={(event) => {
                        onChangeAmount(event, index);
                      }}
                    />
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
            <BudgetPieChart
              budgetAmount={budget.amount}
              budgetItems={budget.budgetItems}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
