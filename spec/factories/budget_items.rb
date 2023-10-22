# frozen_string_literal: true
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
FactoryBot.define do
  factory :budget_item do
    sequence(:name) { |n| "予算アイテム#{n}" }
    kind { %i(fixed variables investments savings).sample }
    amount { 1000 }
    bank_account factory: %i[bank_account]
    budget factory: %i[budget]
  end

  trait :fixed do
    kind { :fixed }
  end

  trait :variables do
    kind { :variables }
  end

  trait :investments do
    kind { :investments }
  end

  trait :savings do
    kind { :savings }
  end
end
