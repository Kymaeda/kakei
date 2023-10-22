# frozen_string_literal: true
# == Schema Information
#
# Table name: budgets
#
#  id          :bigint           not null, primary key
#  amount      :integer          not null
#  finished_at :datetime         not null
#  started_at  :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Budget do
  describe 'Validations' do
    it '開始・終了日時と金額に値がある場合、trueを返す' do
      budget = build(:budget, started_at: 1.month.from_now, finished_at: 2.months.from_now, amount: 100_000)
      expect(budget).to be_valid
    end

    it '開始・終了日時と金額に値がない場合、falseを返す' do
      budget = build(:budget, started_at: nil, finished_at: nil, amount: nil)
      expect(budget).not_to be_valid
    end
  end

  describe '#dup_with_associations' do
    let!(:now) { Time.current }
    let!(:budget) do
      create(:budget, amount: 200_000, started_at: now.beginning_of_month, finished_at: now.end_of_month)
    end
    let!(:budget_item_fixed) do
      create(:budget_item, :fixed, name: '家賃', amount: 100_000, bank_account: bank_account_1, budget:)
    end
    let!(:budget_item_variables) do
      create(:budget_item, :variables, name: '食費', amount: 30_000, bank_account: bank_account_2, budget:)
    end
    let!(:budget_item_investments) do
      create(:budget_item, :investments, name: '本', amount: 20_000, bank_account: bank_account_2, budget:)
    end
    let!(:budget_item_savings) do
      create(:budget_item, :savings, name: '投資信託', amount: 50_000, bank_account: bank_account_1, budget:)
    end
    let!(:bank_account_1) { create(:bank_account) }
    let!(:bank_account_2) { create(:bank_account) }

    it 'budgetの金額、開始日時、終了日時が複製されていることを確認する' do
      new_budget = budget.dup_with_associations

      expect(new_budget).to have_attributes(
        amount: budget.amount,
        started_at: budget.started_at,
        finished_at: budget.finished_at
      )
    end

    it 'budget_itemsのkind, name, amount, bank_account_idが複製されていることを確認する' do
      new_budget = budget.dup_with_associations

      expect(new_budget.budget_items.size).to eq 4

      fixed_item = new_budget.budget_items[0]
      expect(fixed_item).to have_attributes(
        name: budget_item_fixed.name,
        amount: budget_item_fixed.amount,
        bank_account_id: budget_item_fixed.bank_account_id
      )
      variables_item = new_budget.budget_items[1]
      expect(variables_item).to have_attributes(
        name: budget_item_variables.name,
        amount: budget_item_variables.amount,
        bank_account_id: budget_item_variables.bank_account_id
      )
      investments_item = new_budget.budget_items[2]
      expect(investments_item).to have_attributes(
        name: budget_item_investments.name,
        amount: budget_item_investments.amount,
        bank_account_id: budget_item_investments.bank_account_id
      )
      savings_item = new_budget.budget_items[3]
      expect(savings_item).to have_attributes(
        name: budget_item_savings.name,
        amount: budget_item_savings.amount,
        bank_account_id: budget_item_savings.bank_account_id
      )
    end
  end
end
