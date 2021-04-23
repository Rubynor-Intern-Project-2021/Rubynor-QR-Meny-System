class AddColumnsToSubMenu < ActiveRecord::Migration[6.0]
  def change
    add_column :sub_menus, :status, :integer, default: 0
  end
end
