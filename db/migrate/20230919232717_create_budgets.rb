class CreateBudgets < ActiveRecord::Migration[7.0]
  def change
    create_table :budgets do |t|
      t.datetime :started_at, null: false
      t.datetime :finished_at, null: false
      t.integer :amount, null: false

      t.timestamps
    end
  end
end
