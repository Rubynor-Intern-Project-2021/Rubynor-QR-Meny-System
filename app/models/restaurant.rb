class Restaurant < ApplicationRecord
  has_many :menus, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :allergens, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  has_secure_password


  def get_allergen_map 
    arr = Array.new() 

    allergens.each do |allergen|
      arr << allergen.short_name + ' = ' + allergen.name
    end

    return arr;
  end
end
