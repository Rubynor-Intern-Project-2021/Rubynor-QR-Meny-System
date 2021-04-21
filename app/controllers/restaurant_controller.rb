class RestaurantController < ApplicationController
  skip_before_action :authorize

  def show
    if params[:location] != nil && params[:location] != 0
      session[:location] = params[:location]
      session[:cart]=[]
    end

    @restaurant = Restaurant.find(params[:id])
    @menus = @restaurant.visible_menus
  end
end
