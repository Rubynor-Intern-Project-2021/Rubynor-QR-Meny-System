Rails.application.routes.draw do
  resources :order_items
  resources :orders
  controller :sessions do
    get 'login' => :new
    post 'login' => :create
    delete 'logout' => :destroy
  end

  namespace :admin do
    resources :restaurants
    resources :menus
    resources :menu_items
  end
  # Bruker
  resources :menu
  resources :restaurant
  resources :menu_item
  controller :menu_item do
    post 'add_to_cart' => :addToCart
    delete 'remove_one_from_cart' => :removeOneFromCart
    delete 'remove_all_from_cart' => :removeAllFromCart
    delete 'empty_cart' => :emptyCart
  end
  get "/selected_menu" => 'menu#selected_menu', as: 'selected_menu'

  # Admin
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
