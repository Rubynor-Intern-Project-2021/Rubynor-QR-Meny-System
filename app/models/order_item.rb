class OrderItem < ApplicationRecord
  belongs_to :menu_item
  belongs_to :order

  enum order_item_status: {
    "Startet" => 0,
    "Ferdig" => 1
  }

  def price
    menu_item.price
  end

  def total_price
    menu_item.price * quantity
  end

end
