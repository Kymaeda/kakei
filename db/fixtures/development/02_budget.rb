Budget.seed(
  :id,
  { id: 1, started_at: Time.current.last_month.all_month.first, finished_at: Time.current.last_month.all_month.last, amount: 400_000 }, # 先月の予算
  { id: 2, started_at: Time.current.all_month.first, finished_at: Time.current.all_month.last, amount: 400_000 }, # 今月の予算
)
