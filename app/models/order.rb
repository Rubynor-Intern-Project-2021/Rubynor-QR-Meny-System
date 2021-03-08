class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  belongs_to :restaurant

  enum order_status: {
    "Bestilt" => 0,
    "Ferdig" => 1
  }

  def add_menu_item(menu_item)
    current_item = order_items.find_by(menu_item_id: menu_item.id)
    if current_item
      current_item.quantity += 1
    else
      current_item = order_items.build(menu_item_id: menu_item.id)
    end
    current_item
  end

  def total_price
    order_items.to_a.sum { |item| item.total_price }
  end
end
