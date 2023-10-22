# frozen_string_literal: true
# == Schema Information
#
# Table name: bank_accounts
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_bank_accounts_on_name  (name) UNIQUE
#
FactoryBot.define do
  factory :bank_account do
    sequence(:name) { |n| "銀行口座#{n}" }
  end
end
