class CreateAllergens < ActiveRecord::Migration[6.0]
  def change
    create_table :allergens do |t|
      t.text :name
      t.text :short_name

      t.timestamps
    end
  end
end
