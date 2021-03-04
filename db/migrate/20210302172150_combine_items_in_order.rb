class CombineItemsInOrder < ActiveRecord::Migration[6.0]
  def up
    # replace multiple items for a single product in a cart with a
    # single item
    Order.all.each do |order|
      # count the number of each product in the cart
      sums = order.order_items.group(:menu_item_id).sum(:quantity)
      sums.each do |menu_item_id, quantity|
        if quantity > 1
          # remove individual items
          order.order_items.where(menu_item_id: menu_item_id).delete_all
          # replace with a single item
          item = order.order_items.build(menu_item_id: menu_item_id)
          item.quantity = quantity
          item.save!
        end
      end
    end
  end

  def down
    # split items with quantity>1 into multiple items
    OrderItem.where("quantity>1").each do |order_item|
      # add individual items
      order_item.quantity.times do
        OrderItem.create(
          order_id: order_item.order_id,
          menu_item_id: order_item.menu_item_id,
          quantity: 1
        )
      end
      # remove original item
      order_item.destroy
    end
  end
end
