# frozen_string_literal: true
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
#  index_bank_sub_accounts_on_bank_account_id           (bank_account_id)
#  index_bank_sub_accounts_on_bank_account_id_and_name  (bank_account_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (bank_account_id => bank_accounts.id)
#
class BankSubAccount < ApplicationRecord
  belongs_to :bank_account

  validates :name, presence: true
end
