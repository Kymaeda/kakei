import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { BudgetItem } from "../types/budget";
import { sumAmountByKind } from "../services/budget";
import { colorsForBudgetKind } from "../utils/colors";

interface BudgetPieChartProps {
  budgetAmount: number;
  budgetItems: BudgetItem[];
}

export const BudgetPieChart = (props: BudgetPieChartProps): JSX.Element => {
  const { budgetAmount, budgetItems } = props;

  const sumAmount = sumAmountByKind({
    budgetAmount,
    budgetItems,
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
};
