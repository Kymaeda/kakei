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
  Paper,
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
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

export const TopContainer = () => (
  <>
    {/*
      TODO: 全体のレイアウトに関わる部分は、Layoutコンポーネントのようなものに切り出した方がよさそう
            Material UIで、ヘッダーやサイドメニューをデザインしたいので、Railsでやらずに、reactでやる
    */}
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            {/* TODO: 後でアイコンにする */}
            三
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            KAKEI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <p>
      予算: <span>{budgetAmount}</span>
    </p>
    {/* TODO: MUI-XのDataGridでも良いかも？？ */}
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 970, m: 5 }}
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

    {/*
      TODO: 以下の要素を表示する
            - 種別ごとの割合（テーブル）
            - 種別ごとの割合(円グラフ)
            - 口座ごとの金額
            - 口座ごとの金額をもとに、自動にゅうきん/振り込み/振替の金額表示
    */}
  </>
);
