class SubMenu < ApplicationRecord
  has_many :menu_items
  belongs_to :menu

=begin
  enum status: {
    "remove" => 0,
    "hide" => 1,
    "visible" => 2
  }
=end

end
