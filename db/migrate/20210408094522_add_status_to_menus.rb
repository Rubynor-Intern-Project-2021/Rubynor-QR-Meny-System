class AddStatusToMenus < ActiveRecord::Migration[6.0]
  def change
    add_column :menus, :status, :integer, default: 1
  end
end
