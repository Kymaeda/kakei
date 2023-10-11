import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { Budget } from "../types/budget";
import { sumAmountByKind } from "../services/budget";
import { colorsForBudgetKind } from "../utils/colors";

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
        backgroundColor: Object.values(colorsForBudgetKind),
      },
    ],
  };

  return <Pie data={data} />;
}
