// Hellow Worldと表示する
import React from 'react';
type propType = { name: string }
const HellowWorld = ({ name }: propType): JSX.Element => (
  <h1>{name}, Hellow World</h1>
);
export default HellowWorld;
