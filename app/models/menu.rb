class Menu < ApplicationRecord
    has_many :menu_items, dependent: :destroy
    has_many :sub_menus, dependent: :destroy
    belongs_to :restaurant
    has_one_attached :image

=begin
    enum status: {
      "remove" => 0,
      "hide" => 1,
      "visible" => 2
    }
=end

    scope :visible, -> { where(status: 2) }
    scope :ordered, -> { order(:number) }

end
