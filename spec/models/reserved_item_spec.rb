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
require 'rails_helper'

RSpec.describe ReservedItem do
  describe 'Validations' do
    it '必須カラムに値が設定されている場合、trueを返すこと' do
      item = build(:reserved_item, name: 'test', unit_cost: 1000, annual_counts: 3)
      expect(item).to be_valid
    end

    it '必須カラムに値が設定されていない場合、falseを返すこと' do
      item = build(:reserved_item, name: nil, unit_cost: nil, annual_counts: nil)
      expect(item).not_to be_valid
    end
  end

  describe '#annual_cost' do
    it '単価 * 年間消費回数の結果を返すこと' do
      item = build(:reserved_item, unit_cost: 1000, annual_counts: 3)
      expect(item.annual_cost).to eq 3000
    end
  end

  describe '#reserved_amount' do
    it '年間費用を、積立回数で割った結果を返すこと' do
      item = build(:reserved_item, unit_cost: 1000, annual_counts: 6)
      expect(item.reserved_amount).to eq 500
    end
  end
end
