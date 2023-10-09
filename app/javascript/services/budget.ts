import type { BudgetItem } from "../types/budget";

export const calcPercentage = (
  budgetAmount: number,
  budgetItemAmount: number,
  floorSize: number = 1
): number => {
  const parts = (budgetItemAmount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};

export const sumAmountByKind = (
  budgetAmount: number,
  budgetItems: BudgetItem[]
): Map<string, number> => {
  const map = new Map<string, number>();
  budgetItems.forEach((item) => {
    const amount = map.get(item.kind) ?? 0;
    map.set(item.kind, amount + item.amount);
  });

  map.forEach((value, key) => {
    map.set(key, calcPercentage(budgetAmount, value));
  });
  return map;
};
