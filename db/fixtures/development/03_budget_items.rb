BudgetItem.seed(
  :id,
  # NOTE: 先月の予算
  # -- 固定費
  { id: 1, kind: :fixed, name: '住居費', amount: 70_000, budget_id: 1, bank_account_id: 1 },
  { id: 2, kind: :fixed, name: 'サブスクリプション', amount: 5_000, budget_id: 1, bank_account_id: 1 },
  { id: 3, kind: :fixed, name: 'ローン返済', amount: 10_000, budget_id: 1, bank_account_id: 1 },
  { id: 4, kind: :fixed, name: '通信費', amount: 5_000, budget_id: 1, bank_account_id: 1 },
  { id: 5, kind: :fixed, name: '水道光熱費', amount: 10_000, budget_id: 1, bank_account_id: 1 },
  # -- 必須生活費
  { id: 6, kind: :variables, name: '食費', amount: 30_000, budget_id: 1, bank_account_id: 2 },
  { id: 7, kind: :variables, name: '日用品', amount: 5_000, budget_id: 1, bank_account_id: 2 },
  { id: 8, kind: :variables, name: '交通費', amount: 5_000, budget_id: 1, bank_account_id: 2 },
  # -- 余剰費
  { id: 9, kind: :investments, name: '交際費', amount: 20_000, budget_id: 1, bank_account_id: 2 },
  { id: 10, kind: :investments, name: '書籍費', amount: 10_000, budget_id: 1, bank_account_id: 2 },
  { id: 11, kind: :investments, name: '娯楽費', amount: 20_000, budget_id: 1, bank_account_id: 2 },
  { id: 12, kind: :investments, name: '美容費', amount: 20_000, budget_id: 1, bank_account_id: 2 },
  { id: 13, kind: :investments, name: '医療費', amount: 20_000, budget_id: 1, bank_account_id: 2 },
  # -- 貯蓄・投資
  { id: 14, kind: :savings, name: '特別費積立', amount: 60_000, budget_id: 1, bank_account_id: 3 },
  { id: 15, kind: :savings, name: '株式投資', amount: 30_000, budget_id: 1, bank_account_id: 3 },
  { id: 16, kind: :savings, name: '貯蓄', amount: 80_000, budget_id: 1, bank_account_id: 3 },
  # NOTE: 今月の予算
  # -- 固定費
  { id: 17, kind: :fixed, name: '住居費', amount: 70_000, budget_id: 2, bank_account_id: 1 },
  { id: 18, kind: :fixed, name: 'サブスクリプション', amount: 5_000, budget_id: 2, bank_account_id: 1 },
  { id: 19, kind: :fixed, name: 'ローン返済', amount: 10_000, budget_id: 2, bank_account_id: 1 },
  { id: 20, kind: :fixed, name: '通信費', amount: 5_000, budget_id: 2, bank_account_id: 1 },
  { id: 21, kind: :fixed, name: '水道光熱費', amount: 10_000, budget_id: 2, bank_account_id: 1 },
  # -- 必須生活費
  { id: 22, kind: :variables, name: '食費', amount: 30_000, budget_id: 2, bank_account_id: 2 },
  { id: 23, kind: :variables, name: '日用品', amount: 5_000, budget_id: 2, bank_account_id: 2 },
  { id: 24, kind: :variables, name: '交通費', amount: 5_000, budget_id: 2, bank_account_id: 2 },
  # -- 余剰費
  { id: 25, kind: :investments, name: '交際費', amount: 30_000, budget_id: 2, bank_account_id: 2 },
  { id: 26, kind: :investments, name: '書籍費', amount: 20_000, budget_id: 2, bank_account_id: 2 },
  { id: 27, kind: :investments, name: '娯楽費', amount: 20_000, budget_id: 2, bank_account_id: 2 },
  { id: 28, kind: :investments, name: '美容費', amount: 30_000, budget_id: 2, bank_account_id: 2 },
  { id: 29, kind: :investments, name: '医療費', amount: 20_000, budget_id: 2, bank_account_id: 2 },
  # -- 貯蓄・投資
  { id: 30, kind: :savings, name: '特別費積立', amount: 60_000, budget_id: 2, bank_account_id: 3 },
  { id: 31, kind: :savings, name: '株式投資', amount: 30_000, budget_id: 2, bank_account_id: 3 },
  { id: 32, kind: :savings, name: '貯蓄', amount: 50_000, budget_id: 2, bank_account_id: 3 }
)
