module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, { null: true }], null: true,
                                                     description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :budget, Types::BudgetType, null: false, description: "予算を取得する" do
      argument :id, ID, required: false, description: "予算ID"
    end

    def budget(id: nil)
      if id.present?
        Budget.find(id)
      else
        Budget.find_by!(started_at: Time.current.all_month)
      end
    end

    field :budgets, [Types::BudgetType], null: false, description: "予算一覧を取得する" do
      argument :ids, ID, required: false, description: "予算ID"
    end

    def budgets
      Budget.order(started_at: :desc)
    end
  end
end
