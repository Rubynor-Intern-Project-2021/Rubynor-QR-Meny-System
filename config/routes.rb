Rails.application.routes.draw do
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

  # Admin
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
