import { createRoot } from 'react-dom/client';
import { TopContainer } from './components/TopContainer';
import { BudgetIndexContainer } from './components/BudgetIndexContainer';

// TODO: #11 で、ページ別ファイルに定義するように修正する
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  document.addEventListener("DOMContentLoaded", () => {
    root.render(<TopContainer />);
  });
}

const budgetIndexRoot = document.getElementById('budget-index-root');
if (budgetIndexRoot) {
  const root = createRoot(budgetIndexRoot);
  document.addEventListener("DOMContentLoaded", () => {
    root.render(<BudgetIndexContainer />);
  });
}
