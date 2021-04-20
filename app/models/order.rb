class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  belongs_to :restaurant

  enum order_status: {
    "Startet" => 0,
    "Ferdig" => 1,
    "Betalt" => 2
  }

  def add_menu_item(item_id:, quantity:)
    p "test add_menu_item"
    current_item = order_items.build(menu_item_id: item_id, quantity: quantity)
    # BAD: Silent failure
    #current_item.save # true/false
    # GOOD: Explicit error
    current_item.save! # true or CRAAAAASH
    p current_item

    current_item
  end

  def total_price
    order_items.to_a.sum{|item|item.total_price}
  end

end
