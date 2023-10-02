# == Schema Information
#
# Table name: budget_items
#
#  id              :bigint           not null, primary key
#  amount          :integer          not null
#  kind            :integer          not null
#  name            :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bank_account_id :bigint           not null
#  budget_id       :bigint           not null
#
# Indexes
#
#  index_budget_items_on_bank_account_id  (bank_account_id)
#  index_budget_items_on_budget_id        (budget_id)
#
# Foreign Keys
#
#  fk_rails_...  (bank_account_id => bank_accounts.id)
#  fk_rails_...  (budget_id => budgets.id)
#
class BudgetItem < ApplicationRecord
  belongs_to :bank_account
  belongs_to :budget

  # NOTE: fixed: 固定費, variables: 変動費, investmets: 自己投資, savings: 貯蓄・投資
  enum :kind, { fixed: 10, variables: 20, investments: 30, savings: 40 }

  with_options presence: true do
    validates :name
    validates :kind
    validates :amount
  end

  delegate :name, to: :bank_account, prefix: true
end
