class Restaurant < ApplicationRecord
  has_many :menus, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  has_secure_password
end
