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
class Budget < ApplicationRecord
  validates :started_at, presence: true
  validates :finished_at, presence: true
  validates :amount, presence: true
end
