# frozen_string_literal: true

module Types
  class BudgetItemType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :kind, Integer, null: false
    field :amount, Integer, null: false
    field :bank_account_id, Integer, null: false
    field :budget_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
