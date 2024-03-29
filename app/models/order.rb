class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  belongs_to :restaurant

  enum order_status: {
    "Started" => 0,
    "Finished" => 1,
    "Paid" => 2
  }

  def add_menu_item(item_id:, quantity:, order_item_status:)
    p "test add_menu_item"
    current_item = order_items.build(menu_item_id: item_id, quantity: quantity, order_item_status: order_item_status)
    current_item.save!
    p current_item

    current_item
  end

  def total_price
    order_items.to_a.sum{|item|item.total_price}
  end

end
