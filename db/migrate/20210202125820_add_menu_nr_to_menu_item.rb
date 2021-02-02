class AddMenuNrToMenuItem < ActiveRecord::Migration[6.0]
  def change
    add_column :menu_items, :number, :string
  end
end
