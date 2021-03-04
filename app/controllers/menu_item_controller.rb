class MenuItemController < ApplicationController
  skip_before_action :authorize

  def addToCart
    session[:cart] ||= []
    session[:cart] << params[:menu_item_id].to_i
    p session[:cart]
    p params[:menu_item_id]
  end
  def removeOneFromCart

  end
  def removeAllFromCart
    session[:cart].delete(params[:menu_item_id].to_i)
    p session[:cart]
  end
  def emptyCart
    session[:cart] = []
    p session[:cart]
  end

  helper_method :addToCart
  helper_method :removeOneFromCart
  helper_method :removeAllFromCart
  helper_method :emptyCart

  def show
    @menu_item = MenuItem.find(params[:id])
    @restaurant = @menu_item.menu.restaurant
  end
end
