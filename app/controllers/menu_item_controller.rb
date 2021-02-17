class MenuItemController < ApplicationController
  skip_before_action :authorize

  def show
    @menu_item = MenuItem.find(params[:id])
    @restaurant = Restaurant.all
  end
end
