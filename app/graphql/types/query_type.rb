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
      argument :id, ID, required: true
    end

    def budget(id:)
      Budget.find(id)
    end

    field :budget_this_month, Types::BudgetType, null: false, description: "今月の予算を取得する"
    def budget_this_month
      Budget.find_by!(started_at: Time.current.all_month)
    end
  end
end
