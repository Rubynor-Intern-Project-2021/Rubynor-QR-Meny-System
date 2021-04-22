class AddSubMenuRefToMenuItem < ActiveRecord::Migration[6.0]
  SubMenu.create(id: 1, name: "Temp", menu_id: 1)
  def change
    add_reference :menu_items, :sub_menu, foreign_key: true, null: false, default: 1
  end
end
