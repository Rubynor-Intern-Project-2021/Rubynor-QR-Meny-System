class RestaurantController < ApplicationController
  def show 
    @restaurant = Restaurant.find(params[:id])
    @menu = Menu.all
    @menu_item = MenuItem.all

  end

  def from_menu
    @selected = MenuItem.where(:menu_id => params[:id])
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
  end
end
