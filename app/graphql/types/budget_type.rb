# frozen_string_literal: true

module Types
  class BudgetType < Types::BaseObject
    field :id, ID, null: false
    field :started_at, GraphQL::Types::ISO8601DateTime, null: false
    field :finished_at, GraphQL::Types::ISO8601DateTime, null: false
    field :amount, Integer, null: false
    field :budget_items, [Types::BudgetItemType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
