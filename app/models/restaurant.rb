class Restaurant < ApplicationRecord
  has_many :menus, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :allergens, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  has_secure_password

  def get_allergen_map
    allergens.map { |a| a.short_name + ' = ' + a.name }
  end

  def visible_menus
    menus.visible.ordered
  end
end
