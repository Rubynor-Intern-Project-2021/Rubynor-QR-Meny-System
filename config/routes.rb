Rails.application.routes.draw do
  namespace :admin do
    get 'cool_man/asdf'
    resources :restaurants
    resources :menus
    resources :menu_items
  end
  # Bruker
  resources :menu
  resources :restaurant

  # Admin
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
