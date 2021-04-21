class CreateSubMenu < ActiveRecord::Migration[6.0]
  def change
    create_table :sub_menus do |t|
      t.string :name
      t.belongs_to :menu, null: false, foreign_key: true
    end
  end
end
