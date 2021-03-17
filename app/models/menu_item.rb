class MenuItem < ApplicationRecord
  has_many :order_items
  has_many :allergen_items
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


    private
        def ensure_not_referenced_by_any_line_item
            unless order_items.empty?
                errors.add(:base, 'Order item pressent')
                throw :abort
            end
        end
end
