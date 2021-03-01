class OrderItem < ApplicationRecord
  belongs_to :menu_item
  belongs_to :order
end
