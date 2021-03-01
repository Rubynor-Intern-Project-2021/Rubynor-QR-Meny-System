class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :order_status
      t.text :customer_info
      t.text :location

      t.timestamps
    end
  end
end
