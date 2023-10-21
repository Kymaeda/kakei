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
  has_many :budget_items, dependent: :destroy
  has_many :reserved_items, dependent: :destroy

  validates :started_at, presence: true
  validates :finished_at, presence: true
  validates :amount, presence: true

  # @return Budget 複製された予算レコード
  def dup_with_associations(started_at: nil)
    new_budget = dup

    started_at ||= Time.current.beginning_of_month
    new_budget.assign_attributes(started_at:, finished_at: started_at.end_of_month)

    # budget_itemsの複製
    budget_items_attrs = budget_items.map do |item|
      item.attributes.slice('kind', 'name', 'amount', 'bank_account_id')
    end
    new_budget.budget_items.build(budget_items_attrs)

    # TODO: reserved_itemsの複製(まだないので、後で実装する)

    new_budget
  end
end
