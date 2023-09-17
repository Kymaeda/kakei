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

const rows = [createData({ name: '住居費', kind: '固定費', account: 'みずほ', amount: 87000 })];

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
          <TableRow>
            <TableCell>aaaa</TableCell>
            <TableCell>aaaa</TableCell>
            <TableCell>aaaa</TableCell>
            <TableCell>aaaa</TableCell>
            <TableCell>aaaa</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
