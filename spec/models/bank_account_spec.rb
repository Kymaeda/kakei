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
require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  describe 'Validations' do
    it '名前が設定されている場合、trueを返すこと' do
      expect(build(:bank_account)).to be_valid
    end

    it '名前が設定されていない場合、falseを返すこと' do
      expect(build(:bank_account, name: nil)).to be_invalid
    end
  end
end
