Rails.application.routes.draw do
  namespace :admin do
    resources :restaurants
    resources :menus
    resources :menu_items
  end
  # Bruker
  resources :menu
  resources :restaurant
  resources :menu_item
  get "/fetch_items" => 'restaurant#from_menu', as: 'fetch_items'
  get "/selected_menu" => 'menu#selected_menu', as: 'selected_menu'

  # Admin
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
