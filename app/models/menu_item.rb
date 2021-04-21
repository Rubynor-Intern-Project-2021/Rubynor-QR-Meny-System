class MenuItem < ApplicationRecord
  has_many :order_items
  has_many :allergen_items
  belongs_to :menu
  belongs_to :sub_menu
  has_one_attached :image

=begin
  enum statuss: {
    remove: 0,
    hide: 1,
    visible: 2
  }
  enum empty: {
    has_ingredients: 0,
    limited: 1,
    empty: 2
  }
=end

  def get_allergen_names_short
    allergens_arr = Array.new
    allergen_items.each do |allergen|
      allergens_arr << allergen.allergen.short_name
    end
    allergens_arr
  end

  def get_allergen_names_long
    allergens_arr = Array.new
    allergen_items.each do |allergen|
      allergens_arr << allergen.allergen.name
    end
    allergens_arr
  end

  private

  def ensure_not_referenced_by_any_line_item
    return if order_items.present?

    errors.add(:base, 'Order item pressent')
    throw :abort
  end
end
