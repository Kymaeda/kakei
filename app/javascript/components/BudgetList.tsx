import { gql, useQuery, useMutation } from "urql";
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
  Button,
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

  const DuplicateBudgetQuery = gql`
    mutation ($id: ID!) {
      dupBudget(input: { id: $id }) {
        budget {
          id
        }
        errors
      }
    }
  `;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dupResponse, executeMutation] = useMutation(DuplicateBudgetQuery);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const budgets: Budget[] = data.budgets;

  const formatDate = (dateString: string): string => {
    return getYearMonth(new Date(dateString));
  };

  const handleRowClick = (budgetId: number): void => {
    redirectTo(`/budgets/${budgetId}`);
  };
  const handleDupClick = async (
    event: any,
    budgetId: number,
  ): Promise<void> => {
    event.stopPropagation();
    await executeMutation({ id: budgetId }).then((result) => {
      redirectTo(`/budgets/${result.data.dupBudget.budget.id}`);
    });
  };
  const handleEditClick = (event: any, budgetId: number): void => {
    event.stopPropagation();
    redirectTo(`/budgets/${budgetId}/edit`);
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
                <SHeaderTableCell />
              </SHeaderTableRow>
            </TableHead>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow
                  key={budget.id}
                  hover={true}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleRowClick(budget.id);
                  }}
                >
                  <TableCell>{budget.id}</TableCell>
                  <TableCell>{formatDate(budget.startedAt)}</TableCell>
                  <TableCell>{budget.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        handleEditClick(e, budget.id);
                      }}
                    >
                      編集
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleDupClick(e, budget.id);
                      }}
                    >
                      複製
                    </Button>
                  </TableCell>
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
