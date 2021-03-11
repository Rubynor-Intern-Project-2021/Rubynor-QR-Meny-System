class AllergenItem < ApplicationRecord
  belongs_to :allergen
  belongs_to :menu_item
end
