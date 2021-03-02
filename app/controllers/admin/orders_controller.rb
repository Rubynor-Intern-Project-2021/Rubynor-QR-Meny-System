class Admin::OrdersController < ApplicationController
  def index 
    @restaurant = Restaurant.find(session[:restaurant_id])
    @orders = @restaurant.orders
  end
end
