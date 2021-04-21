class Admin::OrdersController < ApplicationController

  def show 
    @restaurant = Restaurant.find(params[:id])
    verify_signin(@restaurant.id)
    @orders = @restaurant.orders
  end
end
