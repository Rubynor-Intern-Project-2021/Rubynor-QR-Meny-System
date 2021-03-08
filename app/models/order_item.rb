class OrderItem < ApplicationRecord
  belongs_to :menu_item
  belongs_to :order

  def price
    menu_item.price
  end

  def total_price
    menu_item.price * quantity
  end

end
