class MenuItemController < ApplicationController
  def show
    @menu_item = MenuItem.find(params[:id])
    @restaurant = @menu_item.menu.restaurant
  end
end
