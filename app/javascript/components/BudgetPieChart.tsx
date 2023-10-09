import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { Budget } from "../types/budget";
import { sumAmountByKind } from "../services/budget";

export const BudgetPieChart = (props: { budget: Budget }): JSX.Element => {
  const { budget } = props;

  const sumAmount = sumAmountByKind({
    budgetAmount: budget.amount,
    budgetItems: budget.budgetItems,
  });

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [...sumAmount.keys()],
    datasets: [
      {
        label: "%",
        data: [...sumAmount.values()],
        backgroundColor: ["#e6b8af", "#d9ead3", "#c9daf8", "#d9d2e9"],
      },
    ],
  };

  return <Pie data={data} />;
}
