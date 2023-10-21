class Mutations::DupBudget < Mutations::BaseMutation
  null true
  argument :id, ID, required: true
  # NOTE: 期間を指定する場合は、YYYY-MM-DD形式で指定する
  argument :started_on, String, required: false

  field :budget, Types::BudgetType
  field :errors, [String], null: false

  # NOTE: 日時が指定された場合は、その日時を基準にした月の予算を作成する
  def resolve(id:, started_on: nil)
    original_budget = Budget.find(id)

    started_at = started_on.present? ? Time.zone.parse(started_on) : Time.current.beginning_of_month
    new_budget = original_budget.dup_with_associations(started_at:)
    new_budget.save!

    # Successful creation, return the created object with no errors
    {
      budget: new_budget,
      errors: [],
    }
  rescue ActiveRecord::RecordInvalid => e
    # Failed save, return the errors to the client
    {
      budget: nil,
      errors: new_budget.errors.full_messages
    }
  end
end
