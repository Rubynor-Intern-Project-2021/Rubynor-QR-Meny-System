class OrderItem < ApplicationRecord
  belongs_to :menu_item
  belongs_to :order

  enum order_item_status: {
    "Started" => 0,
    "Finished" => 1
  }

  def price
    menu_item.price
  end

  def total_price
    menu_item.price * quantity
  end

end
