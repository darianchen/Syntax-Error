Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resources :questions, only: [:create, :show, :index, :update, :destroy]
    resource  :session, only: [:show, :create, :destroy]
    resources :answers, only: [:create, :show, :index, :destroy, :update]
    resources :votes, only: [:create, :show, :update, :destroy]
    resources :tags, only: [:index]
  end

  get '*path', to: "static_pages#frontend_index"
end