class Allergen < ApplicationRecord
  has_many :allergen_item, dependent: :destroy
  belongs_to :restaurant
end
