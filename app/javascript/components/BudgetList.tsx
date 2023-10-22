import { gql, useQuery } from "urql";
import type { Budget } from "../types/budget";
import { redirectTo } from "../utils/url";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getYearMonth } from "../services/date";

export const BudgetList = (): JSX.Element => {
  const BudgetsListQuery = gql`
    query {
      budgets {
        id
        startedAt
        amount
      }
    }
  `;

  const [result] = useQuery({
    query: BudgetsListQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const budgets: Budget[] = data.budgets;

  const formatDate = (dateString: string): string => {
    return getYearMonth(new Date(dateString));
  };

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
      <Grid item xs={12} md={12} lg={12}>
        <TableContainer component={Paper} aria-label="simple table">
          <Table>
            <TableHead>
              <SHeaderTableRow>
                <SHeaderTableCell>ID</SHeaderTableCell>
                <SHeaderTableCell>期間</SHeaderTableCell>
                <SHeaderTableCell>予算額</SHeaderTableCell>
                <SHeaderTableCell></SHeaderTableCell>
              </SHeaderTableRow>
            </TableHead>
            <TableBody>
              {budgets.map((budget) => (
                // TODO: Rowクリックで、詳細ページに遷移させる
                <TableRow
                  key={budget.id}
                  hover={true}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    redirectTo(`/budgets/${budget.id}`);
                  }}
                >
                  <TableCell>{budget.id}</TableCell>
                  <TableCell>{formatDate(budget.startedAt)}</TableCell>
                  <TableCell>{budget.amount.toLocaleString()}</TableCell>
                  {/* TODO: ボタンにする */}
                  <TableCell>編集</TableCell>
                </TableRow>
              ))}
              <SHeaderTableRow></SHeaderTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
