class RemoveImageUrlFromMenuItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :menu_items, :image_url
    add_column :menu_items, :status, :integer, default: 1
  end
end
