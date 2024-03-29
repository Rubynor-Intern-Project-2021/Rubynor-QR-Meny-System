class MenuController < ApplicationController
  def show
    @menu = Menu.find(params[:id])
    @restaurant = @menu.restaurant
  end

  def selected_menu
    @selected = Menu.find(params[:menu_id])
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
  end
end


