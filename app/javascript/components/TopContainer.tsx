import React from 'react';
import { Layout } from './Layout';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Container,
  Grid,
} from '@mui/material';

type BudgetRow = {
  id: number;
  name: string;
  kind: string;
  account: string;
  amount: number;
};

const budgetAmount = 350000;

// TODO: serviceに切り出す
const calcPercentage = (amount: number, floorSize: number = 1) => {
  let parts = (amount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};

// TODO: サーバからPropsでデータを受け取るように後続コミットで修正予定
const createData = (data: BudgetRow) => {
  return data;
};
const rows = [
  createData({
    id: 1,
    name: '住居費',
    kind: '固定費',
    account: 'みずほ',
    amount: 87000,
  }),
  createData({
    id: 2,
    name: '食費',
    kind: '変動費',
    account: '住信SBI(代表)',
    amount: 30000,
  }),
  createData({
    id: 3,
    name: '交際/趣味',
    kind: '自己投資',
    account: '住信SBI(代表)',
    amount: 10000,
  }),
  createData({
    id: 4,
    name: '特別費積立',
    kind: '貯蓄・投資',
    account: '住信SBI(目的)',
    amount: 63000,
  }),
];

export const TopContainer = () => {
  return (
    <Layout>
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
                  <TableCell>管理口座</TableCell>
                  <TableCell>金額</TableCell>
                  <TableCell>割合</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.kind}</TableCell>
                    <TableCell>{row.account}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{calcPercentage(row.amount)}%</TableCell>
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
    </Layout>
  );
};
