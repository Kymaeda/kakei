Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  root 'top#show'
  resource :top, only: %i(show)
  resources :budgets, only: %i(index show edit update) do
    member do
      resource :duplicate, only: %i(create), controller: 'budgets/duplicate'
    end
  end
end
