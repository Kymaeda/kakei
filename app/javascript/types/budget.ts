interface Budget {
  id: number;
  startedAt: string;
  finishedAt: string;
  amount: number;
  budgetItems: BudgetItem[];
}

interface BudgetItem {
  id: number;
  name: string;
  kind: string;
  kindText: string;
  account: string;
  amount: number;
  percentage: number;
  bankAccount: BankAccount;
}

interface BankAccount {
  id: number;
  name: string;
}

export type { Budget, BudgetItem, BankAccount };
