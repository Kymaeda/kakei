# frozen_string_literal: true

module Types
  class BudgetItemKindType < Types::BaseEnum
    value "FIXED", value: "fixed"
    value "VARIABLE", value: "variable"
    value "INVESTMENTS", value: "investments"
    value "SAVING", value: "saving"
  end
end
