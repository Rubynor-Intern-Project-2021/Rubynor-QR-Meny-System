class MenuItemController < ApplicationController
  skip_before_action :authorize

  def addToCart
    session[:cart] ||= []
    id=params[:menu_item_id].to_i
    exists=false

    session[:cart].each do |item|
      if item["item_id"]==id
        item["amount"]+=1
        exists=true
        break
      end
    end
    if !exists
      session[:cart] << { item_id: id, amount: 1 }
    end
    p session[:cart]
  end

  def removeOneFromCart
    id=params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["amount"]<=0
        session[:cart].delete(item)
      end

      if item["item_id"]==id
        item["amount"]-=1
      end
    end

    p session[:cart]

  end

  def removeAllFromCart
    id=params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["item_id"]==id
        session[:cart].delete(item)
      end
    end
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
