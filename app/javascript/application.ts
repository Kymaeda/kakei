import React from 'react';
import { createRoot } from 'react-dom/client';
import TopContainer from './components/TopContainer';

// TODO: #11 で、ページ別ファイルに定義するように修正する
const container = document.getElementById('root')
const root = createRoot(container);
document.addEventListener('DOMContentLoaded', () => {
  root.render(<TopContainer name="Kyohei"/>)
})
