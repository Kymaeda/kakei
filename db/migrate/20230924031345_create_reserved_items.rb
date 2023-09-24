class CreateReservedItems < ActiveRecord::Migration[7.0]
  def change
    create_table :reserved_items do |t|
      t.string :name, null: false
      t.integer :unit_cost, null: false
      t.integer :annual_counts, null: false
      t.text :note
      t.references :bank_sub_account, null: false, foreign_key: true
      t.references :budget, null: false, foreign_key: true

      t.timestamps
    end
  end
end
