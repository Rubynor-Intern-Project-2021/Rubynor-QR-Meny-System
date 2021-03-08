class MenuItem < ApplicationRecord
  has_many :order_items
  has_many :allergen_item
  before_destroy :ensure_not_referenced_by_any_order_item
  belongs_to :menu
  has_one_attached :image

  private

  def ensure_not_referenced_by_any_order_item
    unless order_items.empty?
      errors.add(:base, 'Order Items present')
      throw :abort
    end
  end
end
