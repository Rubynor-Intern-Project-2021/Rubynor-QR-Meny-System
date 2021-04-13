class AddNumberToMenus < ActiveRecord::Migration[6.0]
  def change
    add_column :menus, :number, :integer
  end
end
