# == Schema Information
#
# Table name: bank_sub_accounts
#
#  id              :bigint           not null, primary key
#  name            :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bank_account_id :bigint           not null
#
# Indexes
#
#  index_bank_sub_accounts_on_bank_account_id  (bank_account_id)
#
# Foreign Keys
#
#  fk_rails_...  (bank_account_id => bank_accounts.id)
#
FactoryBot.define do
  factory :bank_sub_account do
    sequence(:name) { |n| "目的別口座#{n}" }
    association :bank_account, factory: :bank_account
  end
end
