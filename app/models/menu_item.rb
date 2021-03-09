class MenuItem < ApplicationRecord
  has_many :order_items
  has_many :allergen_items
  before_destroy :ensure_not_referenced_by_any_order_item
  belongs_to :menu
  has_one_attached :image

  def get_allergen_names_short 
    allergens_arr = Array.new

    allergen_items.each do |allergen|
      allergens_arr << allergen.allergen.short_name
    end

    return allergens_arr
  end

  def get_allergen_names_long 
    allergens_arr = Array.new

    allergen_items.each do |allergen|
      allergens_arr << allergen.allergen.name
    end

    return allergens_arr
  end

  private

  def ensure_not_referenced_by_any_order_item
    unless order_items.empty?
      errors.add(:base, 'Order Items present')
      throw :abort
    end
  end
end
