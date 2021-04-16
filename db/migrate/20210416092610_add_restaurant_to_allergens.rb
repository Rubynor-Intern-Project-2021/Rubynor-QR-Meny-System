class AddRestaurantToAllergens < ActiveRecord::Migration[6.0]
  def change
    add_reference :allergens, :restaurant, null: false, foreign_key: true, default: 1
  end
end

