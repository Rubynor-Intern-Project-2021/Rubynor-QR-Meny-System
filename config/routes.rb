Rails.application.routes.draw do
  # Bruker
  resources :menu
  resources :restaurant

  # Admin
  resources :restaurants
  resources :admin_menus
  resources :menu_items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
