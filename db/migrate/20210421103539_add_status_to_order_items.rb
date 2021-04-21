class AddStatusToOrderItems < ActiveRecord::Migration[6.0]
  def change
    add_column :order_items, :order_item_status, :integer
  end
end
