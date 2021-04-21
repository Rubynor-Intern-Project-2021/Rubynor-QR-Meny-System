class RestaurantController < ApplicationController
  def show
    if params[:location] != nil && params[:location] != 0
      session[:location] = params[:location]
    end

    @restaurant = Restaurant.find(params[:id])
    @menus = @restaurant.visible_menus
  end
end
