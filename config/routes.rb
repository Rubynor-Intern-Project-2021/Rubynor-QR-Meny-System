Rails.application.routes.draw do
  resources :restaurant
  resources :restaurants
  resources :menus
  resources :menu_items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
