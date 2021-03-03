class MenuItem < ApplicationRecord
    belongs_to :menu
    has_one_attached :image
    has_many :order_items

    before_destroy :ensure_not_referenced_by_any_order_item

    private
        def ensure_not_referenced_by_any_line_item
            unless order_items.empty?
                errors.add(:base, 'Order item pressent')
                throw :abort
            end
        end
end
