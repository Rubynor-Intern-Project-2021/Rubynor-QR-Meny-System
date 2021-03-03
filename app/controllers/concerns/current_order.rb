module CurrentOrder
  private
    def set_order
      @order = Order.find(session[:order_id])
    rescue ActiveRecord::RecordNotFound
      @order = Order.create
      session[:order_id] = @order.id
    end
end