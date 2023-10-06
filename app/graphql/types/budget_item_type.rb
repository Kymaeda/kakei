# frozen_string_literal: true

module Types
  class BudgetItemType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :kind, String, null: false, method: :kind_i18n
    field :amount, Integer, null: false
    field :bank_account, Types::BankAccountType, null: false
    field :budget, Types::BudgetType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
