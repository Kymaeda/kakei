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
require 'rails_helper'

RSpec.describe BudgetItem, type: :model do
  describe 'Validations' do
    it '必須カラムに値が設定されている場合、trueを返すこと' do
      item = build(:budget_item, name: 'test', kind: :fixed, amount: 1000)
      expect(item).to be_valid
    end

    it '名前が設定されていない場合、falseを返すこと' do
      item = build(:budget_item, name: nil, kind: nil, amount: nil)
      expect(item).to be_invalid
    end
  end
end
