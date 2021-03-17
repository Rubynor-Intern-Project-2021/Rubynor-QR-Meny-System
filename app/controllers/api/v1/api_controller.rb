class Api::V1::ApiController < ApplicationController
  def total_price
    totalPrice=0

    session[:cart].each do |item|
      totalPrice+=(MenuItem.find(item["item_id"]).price * item["amount"])
    end
 
    render json: totalPrice 
  end
  
  def total_amount
    totalAmount=0
    if session[:cart]!=nil
      session[:cart].each do |item|
        totalAmount+=(item["amount"])
      end
    end
    render json: totalAmount
  end

  # /api/v1/add_to_cart?menu_item_id=x&amount=y
  def add_to_cart

    session[:cart] ||= []
    id=params[:menu_item_id].to_i
    amount=params[:amount].to_i
    exists=false

    session[:cart].each do |item|
      if item["item_id"]==id
        item["amount"]+=amount
        exists=true
        break
      end
    end
    if !exists
      session[:cart] << { item_id: id, amount: amount }
    end
    p session[:cart]
    
    render json: { message: 'Successfully added to cart.' }, status: 200
  end

  # /api/v1/add_to_cart?menu_item_id=x
  def add_one_to_cart
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
 
    render json: { message: 'Successfully added one to cart.' }, status: 200
  end

  # /api/v1/add_to_cart?menu_item_id=x
  def remove_one_from_cart
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

 
    render json: { message: 'Successfully removed one to cart.' }, status: 200
  end

  # /api/v1/add_to_cart?menu_item_id=x
  def remove_all_from_cart
    id=params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["item_id"]==id
        session[:cart].delete(item)
      end
    end
    p session[:cart]
 
    render json: { message: 'Successfully removed all to cart.' }, status: 200
  end

  def empty_cart
    session[:cart] = []
    p session[:cart]
 
    render json: { message: 'Successfully cleared cart.' }, status: 200
  end


=begin
  def create_order

    p "create order 1"
    id=params[:restaurant_id]
    info=params[:customer_info]
    location=params[:location]

    p "create order 2"
    @order = Order.create(restaurant_id: id, order_status: 0, customer_info: info, location: location)

    p "create order 3"
    session[:cart].each do |item|
      @order_item=@order.add_menu_item(item)
      p item
    end

    p "create order 4"
    render json: { message: 'Successfully created cart.' }, status: 200
  end
=end

  def get_orders
    restaurant = Restaurant.find(params[:id])
    render json: restaurant.orders
  end

  def get_order_items
    order_items = []

    Order.find(params[:id]).order_items.each do |order|
      order_items << order.menu_item 
    end

    render json: order_items 
  end
end
