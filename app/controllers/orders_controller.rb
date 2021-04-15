class OrdersController < ApplicationController
  skip_before_action :authorize

  def make_order
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

    session[:cart]=[]
    p "create order 4"
    redirect_to restaurant_path(id)
  end

  # GET /orders/1 or /orders/1.json
  def show
    @restaurant = Restaurant.find(params[:id])
    @location = session[:location]
  end

  def emptyCart
    session[:cart] = []
    p session[:cart]
    redirect_to restaurant_path(session[:restaurant_id])
  end

  helper_method :emptyCart
  helper_method :make_order

  private

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:order_status, :customer_info, :location, :restaurant_id)
    end
end
