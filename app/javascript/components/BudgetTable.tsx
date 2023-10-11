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
  interface SColoredTableCellProps {
    kind: string;
  }
  const SColoredTableCell = styled(TableCell)<SColoredTableCellProps>(({
    kind,
  }) => {
    return {
      backgroundColor: backgroundColorForKind(kind),
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
                    {budgetItem.kind}
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
