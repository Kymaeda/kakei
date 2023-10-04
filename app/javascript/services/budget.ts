export const calcPercentage = (
  budgetAmount: number,
  budgetItemAmount: number,
  floorSize: number = 1
): number => {
  let parts = (budgetItemAmount / budgetAmount) * 100;
  return Math.floor(parts * floorSize * 10) / (floorSize * 10);
};