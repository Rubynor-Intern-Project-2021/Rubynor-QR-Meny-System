class AddNumberToSubMenus < ActiveRecord::Migration[6.0]
  def change
    add_column :sub_menus, :number, :string
  end
end
