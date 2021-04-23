class ChangeColumnDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :menus, :status, from: 1, to: 2
    change_column_default :sub_menus, :status, from: 1, to: 2
    change_column_default :menu_items, :status, from: 1, to: 2
  end
end
