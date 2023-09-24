class CreateBudgetItems < ActiveRecord::Migration[7.0]
  def change
    create_table :budget_items do |t|
      t.string :name, null: false
      t.integer :kind, null: false
      t.integer :amount, null: false
      t.references :bank_account, null: false, foreign_key: true
      t.references :budget, null: false, foreign_key: true

      t.timestamps
    end
  end
end
