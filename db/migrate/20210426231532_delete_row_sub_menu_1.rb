class DeleteRowSubMenu1 < ActiveRecord::Migration[6.0]
  def up
    SubMenu.find(1).delete

  end
end
