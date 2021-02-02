class AddNameToRestaurant < ActiveRecord::Migration[6.0]
  def change
    add_column :restaurants, :name, :string
  end
end
