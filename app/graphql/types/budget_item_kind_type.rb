# frozen_string_literal: true

module Types
  class BudgetItemKindType < Types::BaseEnum
    BudgetItem.kinds.each_key do |kind|
      value kind.upcase, value: kind
    end
  end
end
