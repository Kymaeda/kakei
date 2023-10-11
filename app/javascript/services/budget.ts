import type { BudgetItem } from "../types/budget";

interface SumAmountByKindOption {
  budgetAmount: number;
  budgetItems: BudgetItem[];
}

export const calcPercentage = (
  budgetAmount: number,
  budgetItemAmount: number,
  floorSize: number = 1
): number => {
  const parts = (budgetItemAmount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};

export const sumAmountByKind = (options: SumAmountByKindOption): Map<string, number> => {
  const { budgetItems, budgetAmount } = options;

  const map = new Map<string, number>();
  // 種別ごとに合計金額を算出
  budgetItems.forEach((item) => {
    const amount = map.get(item.kindText) ?? 0;
    map.set(item.kindText, amount + item.amount);
  });

  // 種別ごとの合計金額を、予算金額に対する割合に変換
  map.forEach((value, key) => {
    map.set(key, calcPercentage(budgetAmount, value));
  });
  return map;
};
