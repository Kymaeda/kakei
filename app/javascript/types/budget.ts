interface Budget {
  id: number;
  startedAt: Date;
  finishedAt: Date;
  amount: number;
  budgetItems: BudgetItem[];
}

interface BudgetItem {
  id: number;
  name: string;
  kind: string;
  account: string;
  amount: number;
  bankAccount: BankAccount;
}

interface BankAccount {
  id: number;
  name: string;
}

export type { Budget, BudgetItem, BankAccount };
