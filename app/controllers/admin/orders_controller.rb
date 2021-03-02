class Admin::OrdersController < ApplicationController
  def show 
    @restaurant = Restaurant.find(params[:id])
    @orders = @restaurant.orders
  end
end
