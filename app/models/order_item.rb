class OrderItem < ApplicationRecord
  belongs_to :menu_item
  belongs_to :order

  def total_price
    menu_item.price * quantity
  end

end
