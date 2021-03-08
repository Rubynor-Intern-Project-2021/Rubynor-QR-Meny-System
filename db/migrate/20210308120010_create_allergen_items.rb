class CreateAllergenItems < ActiveRecord::Migration[6.0]
  def change
    create_table :allergen_items do |t|
      t.references :allergen, null: false, foreign_key: true
      t.references :menu_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
