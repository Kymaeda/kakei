FactoryBot.define do
  factory :budget do
    started_at { Time.current.beginning_of_month }
    finished_at { started_at.end_of_month }
    amount { (100_000..500_000).to_a.sample }
  end
end
