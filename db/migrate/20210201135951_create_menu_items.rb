class CreateMenuItems < ActiveRecord::Migration[6.0]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.string :image_url
      t.string :description
      t.decimal :price

      t.timestamps
    end
  end
end
