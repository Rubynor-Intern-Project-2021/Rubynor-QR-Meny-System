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
end
