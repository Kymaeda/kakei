# frozen_string_literal: true
# == Schema Information
#
# Table name: reserved_items
#
#  id                  :bigint           not null, primary key
#  annual_counts       :integer          not null
#  name                :string(255)      not null
#  note                :text(65535)
#  unit_cost           :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  bank_sub_account_id :bigint           not null
#  budget_id           :bigint           not null
#
# Indexes
#
#  index_reserved_items_on_bank_sub_account_id  (bank_sub_account_id)
#  index_reserved_items_on_budget_id            (budget_id)
#
# Foreign Keys
#
#  fk_rails_...  (bank_sub_account_id => bank_sub_accounts.id)
#  fk_rails_...  (budget_id => budgets.id)
#
FactoryBot.define do
  factory :reserved_item do
    sequence(:name) { |n| "特別費積立#{n}" }
    unit_cost { 1000 }
    annual_counts { 2 }
    note { "MyText" }

    bank_sub_account factory: %i[bank_sub_account]
    budget factory: %i[budget]
  end
end
