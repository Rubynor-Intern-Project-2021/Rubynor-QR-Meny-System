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
    resources :allergens
    resources :menu_items
    resources :orders
    controller :menu_items do
      get 'set_item_status' => :set_item_status
      get 'set_item_empty_status' => :set_item_empty_status
    end
    controller :allergens do
      get 'allergen_slett' => :destroy
    end
    controller :menus do
      get 'set_menu_status' => :set_menu_status
    end
  end

  # Bruker
  resources :menu
  resources :restaurant
  resources :menu_item
  controller :orders do
    post 'make_order' => :make_order
    post 'add_to_cart' => :addToCart
    post 'add_one_to_cart' => :addOneToCart
    delete 'remove_one_from_cart' => :removeOneFromCart
    delete 'remove_all_from_cart' => :removeAllFromCart
    delete 'empty_cart' => :emptyCart
    get 'total_price' => :total_price
  end
  get "/selected_menu" => 'menu#selected_menu', as: 'selected_menu'


  namespace :api do
    namespace :v1 do
      controller :api do
        #get 'create_order' => :create_order

        get 'total_price' => :total_price
        get 'total_amount' => :total_amount
        get 'add_to_cart' => :add_to_cart
        get 'add_one_to_cart' => :add_one_to_cart
        get 'remove_one_from_cart' => :remove_one_from_cart
        get 'remove_all_from_cart' => :remove_all_from_cart
        get 'empty_cart' => :empty_cart

        get 'get_orders' => :get_orders
        get 'get_order_items' => :get_order_items
        get 'finish_order' => :finish_order
        get 'finish_order_item' => :finish_order_item

        get 'set_item_status' => :set_item_status

      end
    end
  end

  # Admin
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
