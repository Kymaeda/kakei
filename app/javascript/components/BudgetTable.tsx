import { gql, useQuery } from 'urql';
import type { Budget } from "../types/budget";
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

  interface STableRowProps {
    kind: string;
  }
  // TODO: マルチバイトで比較するのってどうなのだろうか。enumの値を渡した方が良い？？
  // TODO: カラーコードを外部ファイルにまとめて、共通利用する
  const backgroundColorForKind = (kind: string): string => {
    switch (kind) {
      case "固定費":
        return "#e6b8af";
      case "変動費":
        return "#d9ead3";
      case "自己投資":
        return "#c9daf8";
      case "貯蓄・投資":
        return "#d9d2e9";
      default:
        return "#ffffff";
    }
  };
  const STableRow = styled(TableRow)<STableRowProps>(({ kind }) => {
    return {
      backgroundColor: backgroundColorForKind(kind),
    };
  });

  return (
    <Grid container spacing={3}>
      {/* Budget Detail Table */}
      <Grid item xs={12} md={8} lg={9}>
        <TableContainer component={Paper} aria-label="simple table">
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
                <STableRow key={budgetItem.id} kind={budgetItem.kind}>
                  <TableCell>{budgetItem.name}</TableCell>
                  <TableCell>{budgetItem.kind}</TableCell>
                  <TableCell>{budgetItem.bankAccount.name}</TableCell>
                  <TableCell>{budgetItem.amount}</TableCell>
                  <TableCell>{budgetItem.percentage}%</TableCell>
                </STableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
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
