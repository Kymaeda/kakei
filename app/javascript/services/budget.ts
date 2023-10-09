import type { BudgetItem } from "../types/budget";

export const calcPercentage = (
  budgetAmount: number,
  budgetItemAmount: number,
  floorSize: number = 1
): number => {
  const parts = (budgetItemAmount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};

type SumByKind = Record<string, number>;
export const sumAmountByKind = (budgetItems: BudgetItem[]): SumByKind => {
  const result = budgetItems.reduce<SumByKind>((sum, item) => {
    sum[item.kind]
      ? (sum[item.kind] += item.amount)
      : (sum[item.kind] = item.amount);
    return sum;
  }, {});
  return result;
}
