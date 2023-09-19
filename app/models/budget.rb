class Budget < ApplicationRecord
  validates :started_at, presence: true
  validates :finished_at, presence: true
  validates :amount, presence: true
end
