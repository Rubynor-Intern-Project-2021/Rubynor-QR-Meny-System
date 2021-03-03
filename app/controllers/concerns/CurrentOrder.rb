module CurrentOrder
  private
  def set_order
    p "test1"
    @order = Order.find(session[:order_id])
    p "test2"
  rescue ActiveRecord::RecordNotFound
    p "test3"
    @order = Order.create(restaurant_id: 1)
    session[:order_id] = @order.id
    p @order
  end
end
