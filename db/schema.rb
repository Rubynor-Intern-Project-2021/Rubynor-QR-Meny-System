# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_26_231532) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "allergen_items", force: :cascade do |t|
    t.integer "allergen_id", null: false
    t.integer "menu_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["allergen_id"], name: "index_allergen_items_on_allergen_id"
    t.index ["menu_item_id"], name: "index_allergen_items_on_menu_item_id"
  end

  create_table "allergens", force: :cascade do |t|
    t.text "name"
    t.text "short_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "restaurant_id", default: 1, null: false
    t.index ["restaurant_id"], name: "index_allergens_on_restaurant_id"
  end

  create_table "menu_items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.decimal "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "menu_id", null: false
    t.string "number"
    t.integer "status", default: 2
    t.integer "empty", default: 0
    t.bigint "sub_menu_id"
    t.index ["menu_id"], name: "index_menu_items_on_menu_id"
    t.index ["sub_menu_id"], name: "index_menu_items_on_sub_menu_id"
  end

  create_table "menus", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "restaurant_id", null: false
    t.integer "status", default: 2
    t.integer "number"
    t.index ["restaurant_id"], name: "index_menus_on_restaurant_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.integer "menu_item_id", null: false
    t.integer "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "quantity", default: 1
    t.integer "order_item_status"
    t.index ["menu_item_id"], name: "index_order_items_on_menu_item_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "order_status"
    t.text "customer_info"
    t.text "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "restaurant_id", null: false
    t.index ["restaurant_id"], name: "index_orders_on_restaurant_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "qr_code"
  end

  create_table "sub_menus", force: :cascade do |t|
    t.string "name"
    t.bigint "menu_id", null: false
    t.integer "status", default: 2
    t.index ["menu_id"], name: "index_sub_menus_on_menu_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "allergen_items", "allergens"
  add_foreign_key "allergen_items", "menu_items"
  add_foreign_key "allergens", "restaurants"
  add_foreign_key "menu_items", "menus"
  add_foreign_key "menu_items", "sub_menus"
  add_foreign_key "menus", "restaurants"
  add_foreign_key "order_items", "menu_items"
  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "restaurants"
  add_foreign_key "sub_menus", "menus"
end
