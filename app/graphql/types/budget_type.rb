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
    field :budget_item_kinds, GraphQL::Types::JSON, null: false

    # @return Hash 予算項目のバリューと翻訳されたテキストのハッシュ
    # eg: { 'fixed' => '固定費', 'variables' => '変動費' }
    def budget_item_kinds
      BudgetItem.kinds_i18n
    end
  end
end
