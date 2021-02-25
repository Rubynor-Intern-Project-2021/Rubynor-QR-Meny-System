class MenuItemController < ApplicationController
  skip_before_action :authorize

  def show
    @menu_item = MenuItem.find(params[:id])
    @restaurant = @menu_item.menu.restaurant
  end
end
