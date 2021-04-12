class AddEmptyToMenuItems < ActiveRecord::Migration[6.0]
  def change
    add_column :menu_items, :empty, :integer, default: 0
  end
end
