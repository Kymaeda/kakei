# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_24_031345) do
  create_table "bank_accounts", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bank_sub_accounts", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "bank_account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bank_account_id"], name: "index_bank_sub_accounts_on_bank_account_id"
  end

  create_table "budget_items", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.integer "kind", null: false
    t.integer "amount", null: false
    t.bigint "bank_account_id", null: false
    t.bigint "budget_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bank_account_id"], name: "index_budget_items_on_bank_account_id"
    t.index ["budget_id"], name: "index_budget_items_on_budget_id"
  end

  create_table "budgets", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "started_at", null: false
    t.datetime "finished_at", null: false
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserved_items", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.integer "unit_cost", null: false
    t.integer "annual_counts", null: false
    t.text "note"
    t.bigint "bank_sub_account_id", null: false
    t.bigint "budget_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bank_sub_account_id"], name: "index_reserved_items_on_bank_sub_account_id"
    t.index ["budget_id"], name: "index_reserved_items_on_budget_id"
  end

  add_foreign_key "bank_sub_accounts", "bank_accounts"
  add_foreign_key "budget_items", "bank_accounts"
  add_foreign_key "budget_items", "budgets"
  add_foreign_key "reserved_items", "bank_sub_accounts"
  add_foreign_key "reserved_items", "budgets"
end
