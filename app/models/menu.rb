class Menu < ApplicationRecord
    has_many :menu_items, dependent: :destroy
    belongs_to :restaurant
    has_one_attached :image

    scope :visible, -> { where(status: 1) }
    scope :ordered, -> { order(:number) }
end
