module CurrentOrder
  private
    def set_order
      @order = Order.create(restaurant_id: 2)
    end
end