// Hellow Worldと表示する
import React from 'react';
import Button from '@mui/material/Button';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

type BudgetRow = {
  name: string;
  kind: string;
  account: string;
  amount: number;
};

const createData = (data: BudgetRow) => {
  return data;
};

// TODO: サーバからPropsでデータを受け取るように後続コミットで修正予定
const rows = [
  createData({
    name: '住居費',
    kind: '固定費',
    account: 'みずほ',
    amount: 87000,
  }),
  createData({
    name: '食費',
    kind: '変動費',
    account: '住信SBI(代表)',
    amount: 30000,
  }),
  createData({
    name: '交際/趣味',
    kind: '自己投資',
    account: '住信SBI(代表)',
    amount: 10000,
  }),
  createData({
    name: '特別費積立',
    kind: '貯蓄・投資',
    account: '住信SBI(目的)',
    amount: 63000,
  }),
];

export const TopContainer = () => (
  <>
    <Button variant="contained">Hello world</Button>
    <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableRow>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.kind}</TableCell>
              <TableCell>{row.account}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>to be implemented</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
