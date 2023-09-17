// Hellow Worldと表示する
import React from 'react';
import Button from '@mui/material/Button';

type propType = { name: string }
const HellowWorld = ({ name }: propType): JSX.Element => (
  <>
    <h1>{name}, Hellow World</h1>
    <Button variant="contained">Hello world</Button>
  </>
);
export default HellowWorld;
