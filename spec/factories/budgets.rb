# == Schema Information
#
# Table name: budgets
#
#  id          :bigint           not null, primary key
#  amount      :integer          not null
#  finished_at :datetime         not null
#  started_at  :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :budget do
    started_at { Time.current.beginning_of_month }
    finished_at { started_at.end_of_month }
    amount { (100_000..500_000).to_a.sample }
  end
end
