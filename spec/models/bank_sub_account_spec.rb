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
require 'rails_helper'

RSpec.describe BankSubAccount do
  describe 'Validations' do
    it '名前が設定されている場合、trueを返すこと' do
      expect(build(:bank_sub_account)).to be_valid
    end

    it '名前が設定されていない場合、falseを返すこと' do
      expect(build(:bank_sub_account, name: nil)).not_to be_valid
    end
  end
end
