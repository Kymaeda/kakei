Rails.application.routes.draw do
  root 'top#show'

  resource :top, only: %i(show)
end
