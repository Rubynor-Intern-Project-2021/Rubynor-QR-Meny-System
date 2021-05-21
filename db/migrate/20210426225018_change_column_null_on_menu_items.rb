class ChangeColumnNullOnMenuItems < ActiveRecord::Migration[6.0]
  def change
    change_column_null :menu_items, :sub_menu_id, true

    change_column_default :menu_items, :sub_menu_id, from: 1, to: nil
  end
end
