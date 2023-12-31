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
FactoryBot.define do
  factory :budget do
    started_at { Time.current.beginning_of_month }
    finished_at { started_at.end_of_month }
    amount { (100_000..500_000).to_a.sample }
  end

  # @example アイテム数を指定する場合
  #          build(:budget, :with_budget_items, budget_item_count)
  # @example アイテムをオブジェクトで指定する場合
  #          build(:budget, :with_budget_items, budget_items: [item1, item2, item3])
  # NOTE: budget_item_countとbudget_itemsの両方を指定した場合は、budget_itemsが優先される
  trait :with_budget_items do
    transient do
      budget_item_count { 1 }
      budget_items { [build_list(:budget_item, budget_item_count)] }
    end

    after(:build) do |budget, evalutor|
      evalutor.budget_items.each do |item|
        budget.budget_items << item
      end
    end
  end

  # @example アイテム数を指定する場合
  #          build(:budget, :with_reserved_items, reserved_item_count)
  # @example アイテムをオブジェクトで指定する場合
  #          build(:budget, :with_reserved_items, reserved_items: [item1, item2, item3])
  # NOTE: reserved_item_countとreserved_itemsの両方を指定した場合は、reserved_itemsが優先される
  trait :with_reserved_items do
    transient do
      reserved_item_count { 1 }
      reserved_items { [build_list(:reserved_item, reserved_item_count)] }
    end

    after(:build) do |budget, evalutor|
      evalutor.reserved_items.each do |item|
        budget.reserved_items << item
      end
    end
  end
end
