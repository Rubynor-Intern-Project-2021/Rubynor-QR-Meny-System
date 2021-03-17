class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  belongs_to :restaurant

  enum order_status: {
    "Ferdig" => 0,
    "Betalt" => 1
  }

  def add_menu_item(menu_item)
    p "test add_menu_item"
    current_item = order_items.build(menu_item_id: menu_item["item_id"])
    current_item.quantity = menu_item["amount"]
    current_item.save
    p current_item

    current_item
  end

  def total_price
    order_items.to_a.sum{|item|item.total_price}
  end

end
