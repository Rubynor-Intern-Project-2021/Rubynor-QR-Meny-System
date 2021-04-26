class Api::V1::ApiController < ApplicationController
  def total_price
    total_prices = session[:cart].map do |item|
      MenuItem.find(item["item_id"]).price * item["amount"]
    end

    render json: total_prices.sum
  end

  def total_amount
    totalAmount = 0
    if session[:cart] != nil
      session[:cart].each do |item|
        totalAmount += (item["amount"])
      end
    end
    render json: totalAmount
  end

  # /api/v1/add_to_cart?menu_item_id=x&amount=y
  def add_to_cart
    session[:cart] ||= []
    id             = params[:menu_item_id].to_i
    amount         = params[:amount].to_i
    exists         = false

    session[:cart].each do |item|
      if item["item_id"] == id
        item["amount"] += amount
        exists         = true
        break
      end
    end
    if !exists
      session[:cart] << { "item_id": id, "amount": amount }
    end

    render json: {
      message: 'Successfully added to cart.',
    }, status:   200
  end

  # /api/v1/add_to_cart?menu_item_id=x
  def add_one_to_cart
    id     = params[:menu_item_id].to_i
    exists = false

    session[:cart].each do |item|
      if item["item_id"] == id
        item["amount"] += 1
        exists         = true
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
    id = params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["amount"] <= 0
        session[:cart].delete(item)
      end

      if item["item_id"] == id
        item["amount"] -= 1
      end
    end

    render json: { message: 'Successfully removed one to cart.' }, status: 200
  end

  # /api/v1/add_to_cart?menu_item_id=x
  def remove_all_from_cart
    id = params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["item_id"] == id
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

  def get_orders
    restaurant = Restaurant.find(params[:id])
    orders     = restaurant.orders.map do |order|
      {
        id:            order.id,
        order_status:  order.order_status,
        customer_info: order.customer_info,
        location:      order.location,
        total_price:   order.total_price,
        created_at:    order.created_at.strftime("%d.%m.%y kl. %H:%M")
      }
    end
    render json: orders
  end
  
  def set_order_finish
    order              = Order.find(params[:id])
    order.order_status = "Finished"
    order.save!

    render json: { message: 'Successfully changed order status to finished.' }, status: 200
  end

  def set_order_paid
    order              = Order.find(params[:id])
    order.order_status = "Paid"
    order.save!

    render json: { message: 'Successfully changed order status to paid.' }, status: 200
  end

  def get_order_items
    order_items = []

    Order.find(params[:id]).order_items.each do |order|
      order_item               = {}
      order_item[:id]          = order.id
      order_item[:number]      = order.menu_item.number
      order_item[:name]        = order.menu_item.name
      order_item[:description] = order.menu_item.description
      order_item[:order_item_status] = order.order_item_status

      if order.menu_item.price
        order_item[:total_price] = order.menu_item.price * order.quantity
      else
        order_item[:total_price] = 0
      end
      order_item[:quantity] = order.quantity
      order_items << order_item
    end

    render json: order_items
  end

  def change_order_item_status
    order_item        = OrderItem.find(params[:id])
    if order_item.order_item_status == "Started"
      order_item.order_item_status = "Finished"
    else
      order_item.order_item_status = "Started"
    end
    order_item.save!

    render json: { message: 'Successfully changed order status.' }, status: 200
  end

  def set_item_status
    item        = MenuItem.find(params[:item_id])
    item.status = params[:status]
    item.save!

    render json: { message: 'Successfully changed item status.' }, status: 200
  end
end
