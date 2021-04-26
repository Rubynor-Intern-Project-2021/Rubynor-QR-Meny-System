class UpdateSubmenuNil < ActiveRecord::Migration[6.0]

  MenuItem.update_all sub_menu_id: nil
end
