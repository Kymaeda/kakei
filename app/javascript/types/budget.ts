type Budget = {
  id: number;
  startedAt: Date;
  finishedAt: Date;
  amount: number;
  budgetItems: BudgetItem[];
};

type BudgetItem = {
  id: number;
  name: string;
  kind: string;
  account: string;
  amount: number;
  bankAccount: BankAccount;
};

type BankAccount = {
  id: number;
  name: string;
};

export type { Budget, BudgetItem, BankAccount };